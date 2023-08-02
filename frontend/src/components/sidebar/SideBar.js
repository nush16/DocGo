import React, { useContext, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Hidden,
  Box,
  AppBar,
  Toolbar,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

// Declare drawerWidth
const drawerWidth = 240; // adjust to your needs

// Create a context for the mobile open state
export const MobileOpenContext = React.createContext();

// Custom styled component for the drawer
const DrawerContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: "#f5fbff",
}));

const LinksContainer = styled("div")({
  flex: 1,
});

export default function SideBar({ mobileOpen, handleDrawerToggle }) {
  const theme = useTheme();

  const drawer = (
    <DrawerContainer>
      <Toolbar /> {/* This line was added to aviod overlap*/}
      <LinksContainer>
        <List>
          {[
            { text: "Appointments", path: "/appointments" },
            { text: "Patients", path: "/patients" },
            { text: "Staff", path: "/staff" },
          ].map((item, index) => (
            <ListItem
              button
              key={item.text}
              component={NavLink}
              to={item.path}
              activeClassName="active-link"
            >
              {/* Add the CalendarMonthIcon here */}
              {item.text === "Appointments" && (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CalendarMonthIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary={item.text} />
                </Box>
              )}
              {/* Add the CalendarMonthIcon here */}
              {item.text === "Patients" && (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PersonIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary={item.text} />
                </Box>
              )}
              {/* Add the CalendarMonthIcon here */}
              {item.text === "Staff" && (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <MedicationLiquidIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary={item.text} />
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </LinksContainer>
      <Divider />
      <List>
        {[
          { text: "Profile", path: "/profile" },
          { text: "Log Out", path: "/" },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            activeClassName="active-link"
          >
            {item.text === "Profile" && (
              <Box
                component="span"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AccountBoxIcon sx={{ marginRight: 1 }} />
                <ListItemText primary={item.text} />
              </Box>
            )}
            {item.text === "Log Out" && (
              <Box
                component="span"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LogoutIcon sx={{ marginRight: 1 }} />
                <ListItemText primary={item.text} />
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}
