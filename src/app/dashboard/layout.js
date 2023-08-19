import Header, { DrawerHeader } from "@/components/Header";
import { Box, Typography } from "@mui/material";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ display: "flex"}}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* ==  Main Area Starts == */}
          {children}
          {/* ==  Main Area Ends == */}
          <footer className="copyRightSection font-mono w-full">
            <hr />
            <p>
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
