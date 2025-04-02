import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Customers from "./components/customers"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Outlet, Link } from "react-router-dom"
import Drawer from "@mui/material/Drawer"
import { useState } from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';


function App() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleDrawerItemClick = (text: string) => {
    
  }

  const DrawerList = (
      <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
        <List>
        {['Customers', 'Traning', 'Calendar'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Box>

  
  );




  return (
    <Container maxWidth='lg'>
      <AppBar position="static">
      
      <Outlet />
        <Toolbar>
          <IconButton color='inherit'>
            <ReorderOutlinedIcon onClick={toggleDrawer(true)} />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography variant="h6">Personal trainer</Typography> 
        </Toolbar>
      </AppBar>
      <Customers />
      <CssBaseline />
    </Container>
  )
}

export default App
