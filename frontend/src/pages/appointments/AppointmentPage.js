import React, { useState } from "react";
import Topbar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/SideBar";
import DayViewSubdivided from "./Calendar";
import "../../App.css";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";

export default function AppointmentPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        height: "70vh",
        paddingLeft: isMobile ? "10px" : "250px",
        paddingRight: "10px",
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
          marginTop: "80px",
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <DayViewSubdivided />
    </Box>
  );
}