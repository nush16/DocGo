import React from "react";
import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Toolbar,
} from "@mui/material";
import LoginForm from "../login/LoginForm";
import Homepage from "../../assets/homepageimage.svg";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Grid
        container
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <img src={Homepage} alt="logo" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center">
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
