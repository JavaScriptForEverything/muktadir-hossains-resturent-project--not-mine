"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
// My imports::
import Image from "next/image";
import Link from "next/link";
import listItems from "@/assets/ListItems";
import Colors from "@/assets/Colors";
import { Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [list, setList] = React.useState(listItems);

  const handelDrawerToggle = () => {
    setOpen(!open);
  };

  // Log Out Handler::
  const handelLogOut = async () => {
    try {
      const res = await axios.get(`/api/users/logout`);
      res.status === 200 && router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: Colors.primary }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handelDrawerToggle}
            edge="start"
          >
            {open ? <MenuIcon /> : <ChevronRightIcon />}
          </IconButton>

          <Typography className="font-mono" variant="h6" noWrap component="div">
          Restaurant Management System
          </Typography>

          <Button
            style={{
              color: Colors.white,
              fontWeight: 600,
              backgroundColor: "#6D28D9",
              fontSize: 12
            }}
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={handelLogOut}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Image
            src="/next.svg"
            width={50}
            height={100}
            alt="Picture of the author"
          />
        </DrawerHeader>
        <Divider />
        <List>
          {open && (
            <Typography className="font-mono text-violet-600" ml={3} component={"p"}>
              Dashboard
            </Typography>
          )}
          {list.map((El, Idx) => (
            <ListItem key={Idx} disablePadding sx={{ display: "block" }}>
              <Link href={El.link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    fontWeight: 700,
                    backgroundColor: El.link === pathname && Colors.primary,
                    "&:hover": {
                      backgroundColor: El.link === pathname && Colors.primary,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: El.link === pathname && Colors.white,
                    }}
                  >
                    {El.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={El.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: El.link === pathname && Colors.white,
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
                
        <Typography paragraph>Dashboard Area</Typography>
      
      </Box> */}
    </Box>
  );
}
