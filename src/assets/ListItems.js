import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

const listItems = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
    icon: <DashboardIcon />,
    active: false,
  },
  {
    id: 2,
    title: "Settings",
    link: "/dashboard/settings",
    icon: <SettingsIcon />,
    active: false,
  },
  {
    id: 3,
    title: "Category",
    link: "/dashboard/category",
    icon: <ListIcon />,
    active: false,
  },
  {
    id: 4,
    title: "Menu Items",
    link: "/dashboard/menu-items",
    icon: <DinnerDiningIcon />,
    active: false,
  },
];

export default listItems;
