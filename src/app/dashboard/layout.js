import Header, { DrawerHeader } from "@/components/Header";
import { Box, Typography } from "@mui/material";


const DashboardLayout = ({ children }) => {

  return (
    <Box sx={{ display: "flex" }}>
      <Header/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* ==  Main Area Starts == */}
        {children}
        {/* ==  Main Area Ends == */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
