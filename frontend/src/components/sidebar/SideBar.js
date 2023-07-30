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
              <ListItemText primary={item.text} />
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
            <ListItemText primary={item.text} />
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
