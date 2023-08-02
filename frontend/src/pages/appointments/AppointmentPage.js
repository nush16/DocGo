import React, { useState } from "react";
import Topbar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/SideBar";
import AppointmentCalendar from "../../components/calendar/Calendar";
import "../../App.css";
import { Box, Toolbar } from "@mui/material";

export default function AppointmentPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        paddingLeft: "20%",
        paddingRight: "10%",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Topbar
          title="Appointment"
          showNotification={true}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "auto",
          marginTop: "64px",
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <AppointmentCalendar />
    </Box>
  );
}
