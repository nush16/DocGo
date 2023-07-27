import React from 'react';
import Topbar from './TopBar';
import Sidebar from './SideBar';
import Calendar from './Calendar';
import '../App.css';
import { Box, Toolbar } from '@mui/material';

export default function AppointmentPage() {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ flexShrink: 0 }}>
          <Topbar title="Appointment" showNotification = {true} showButton={false}>
          </Topbar>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto', marginTop: '64px' }}>
          <Sidebar />
          <Toolbar />      
          <Calendar />
        </Box>
      </Box>
    );
  }
