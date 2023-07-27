import React, { useState } from 'react';
import Topbar from './TopBar';
import Sidebar from './SideBar';
import Calendar from './Calendar';
import '../App.css';
import { Box, Toolbar } from '@mui/material';


export default function AppointmentPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexShrink: 0 }}>
        <Topbar title="Appointment" showNotification={true} handleDrawerToggle={handleDrawerToggle} />
      </Box>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto', marginTop: '64px' }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box 
          sx={{ 
            marginLeft: { md: `125px`, xs: mobileOpen ? `125px` : '0px' },
            transition: 'margin .3s'
          }}
        >
          <Calendar />
        </Box>
      </Box>
    </Box>
  );
}