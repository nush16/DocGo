import React, { useState } from 'react';
import Topbar from './TopBar';
import Sidebar from './SideBar';
import Calendar from './Calendar';
import '../App.css';
import { Box, Toolbar } from '@mui/material';

export default function PatientsPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ flexShrink: 0 }}>
          <Topbar title="Patients" showNotification={true} handleDrawerToggle={handleDrawerToggle} />
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto', marginTop: '64px' }}>
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <Toolbar />      
        
        </Box>
      </Box>
    );
  }
