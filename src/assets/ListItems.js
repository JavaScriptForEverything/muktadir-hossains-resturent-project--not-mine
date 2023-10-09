import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QueryStatsIcon from '@mui/icons-material/QueryStats';


const listItems = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
    exact:"/home",
    icon: <DashboardIcon />,
    active: false,
  },
  {
    id: 2,
    title: "Settings",
    link: "/dashboard/settings",
    exact:"/settings",
    icon: <SettingsIcon />,
    active: false,
  },
  {
    id: 3,
    title: "Category",
    link: "/dashboard/category",
    exact:"/category",
    icon: <ListIcon />,
    active: false,
  },
  {
    id: 4,
    title: "Menu Items",
    link: "/dashboard/menu-items",
    exact: "/menu-items",
    icon: <DinnerDiningIcon />,
    active: false,
  },
  {
    id: 5,
    title: "Table",
    link: "/dashboard/table",
    exact: "/table",
    icon: <TableRestaurantIcon />,
    active: false,
  },
  {
    id: 6,
    title: "Order",
    link: "/dashboard/order",
    exact: "/order",
    icon: <SoupKitchenIcon />,
    active: false,
  },
  {
    id: 6,
    title: "Reports",
    link: "/dashboard/reports",
    exact: "/reports",
    icon: <QueryStatsIcon />,
    active: false,
  },
];

export default listItems;
