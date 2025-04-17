import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BarChartIcon from "@mui/icons-material/BarChart";

function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: "Customers", icon: <PeopleIcon />, path: "customers" },
    { text: "Training", icon: <FitnessCenterIcon />, path: "trainings" },
    { text: "Calendar", icon: <CalendarTodayIcon />, path: "calendar" },
    { text: "Statistics", icon: <BarChartIcon />, path: "statistics" },
  ];
  

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <AppBar position="static" style={{marginBottom: '20px'}}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <ReorderOutlinedIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Outlet />
    </Container>
  );
}

export default App;
