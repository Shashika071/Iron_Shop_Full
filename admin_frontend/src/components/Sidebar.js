import './Sidebar.css';

import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import { assets } from '../assest/assest';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));  // Check if screen width is below 'md'
  const [open, setOpen] = useState(false);  // State to manage sidebar open/close

  const toggleDrawer = () => {
    setOpen(!open);  // Toggle sidebar visibility
  };

  return (
    <Box>
      {/* AppBar for small screens */}
      {isMobile && (
        <AppBar position="sticky">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Tour Management</Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#333',  // Sidebar background color
            color: 'white',
            paddingTop: '20px',  // Padding at the top
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Profile Section */}
        <Box sx={{ textAlign: 'center', padding: '10px', marginBottom: '20px' }}>
          <img
            src={assets.profile} // Replace with your profile image
            alt="Profile"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',  // Circle shape
              objectFit: 'cover',
              marginBottom: '10px',
            }}
          />
          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
            John Doe  {/* Replace with dynamic username */}
          </Typography>
        </Box>

        {/* Sidebar Menu */}
        <List>
          {/* Tour Management */}
          <ListItem button component={Link} to="/quotations">
            <ListItemIcon>
              <ListAltIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="All Quotations" />
          </ListItem>
          <Divider />

          {/* Guide Management */}
          <ListItem button component={Link} to="/invoices">
            <ListItemIcon>
              <PersonIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="All Invoices" />
          </ListItem>
          <Divider />

         

          {/* User Management */}
          <ListItem button component={Link} to="/jobs">
            <ListItemIcon>
              <PersonIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Jobs Management" />
          </ListItem>
          
          {/* Payment Management */}
          <ListItem button component={Link} to="/paymentManagement">
            <ListItemIcon>
              <PaymentIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Payment Management" />
          </ListItem>
          <Divider />
           {/* Complaint Management */}
           <ListItem button component={Link} to="/complaintManagement">
            <ListItemIcon>
              <InfoIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Complaint Management" />
          </ListItem>
          <Divider />

        </List>
      </Drawer>

      {/* Main content area */}
      <Box sx={{ marginLeft: isMobile ? 0 : 240, transition: 'margin 0.3s' }}>
        {/* Main content will go here, based on the selected route */}
      </Box>
    </Box>
  );
};

export default Sidebar;
