import Header, { DrawerHeader } from "@/components/Header & NavBars/Header";
import { Box, Typography } from "@mui/material";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Box className="bg-slate-100" sx={{ display: "flex" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* ==  Main Area Starts == */}
          {children}
          {/* ==  Main Area Ends == */}
          <footer className="bg-slate-100 font-mono w-full">
            <hr />
            <p className="copyRightText text-left">
              Copyright © {new Date().getFullYear()} | Developed & Maintained By{" "}
              <a className="text-violet-500 underline" href="https://rajit.net" target="_blank">
                rajIT Solutions Ltd
              </a>
              .
            </p>
          </footer>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
