import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


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
  {
    id: 5,
    title: "Table",
    link: "/dashboard/table",
    icon: <TableRestaurantIcon />,
    active: false,
  },
  {
    id: 6,
    title: "Order",
    link: "/dashboard/order",
    icon: <SoupKitchenIcon />,
    active: false,
  },
  {
    id: 6,
    title: "Reports",
    link: "/dashboard/reports",
    icon: <TextSnippetIcon />,
    active: false,
  },
];

export default listItems;
