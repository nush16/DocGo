import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/SideBar";
import Calendar from "../../components/calendar/Calendar";
import "../../App.css";
import StaffProfile from "./StaffProfile";
import { Box, Toolbar } from "@mui/material";

export default function ProfilePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flexShrink: 0 }}>
        <TopBar
          title="Profile"
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
        <StaffProfile />
        <Toolbar />
      </Box>
    </Box>
  );
}
