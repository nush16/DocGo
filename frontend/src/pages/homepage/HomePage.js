import React from "react";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Toolbar,
} from "@mui/material";
// import TopBar from "../../components/topbar/TopBar";
import LoginForm from "../login/LoginForm";
import Homepage from "../../assets/homepageimage.svg";

const HomePage = () => {
  // useTheme provides the default MUI theme
  const theme = useTheme();
  // useMediaQuery is a CSS media query hook that listens for matches to a CSS media query
  // It returns true if the document matches the query, and false if not
  // theme.breakpoints.down('sm') corresponds to a max-width media feature of 600px (tablet)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <TopBar
        buttonLabel="Create Business"
        link="/signup"
        hideMenuButton={true}
        alwaysShowLogo={true}
      /> */}
      <Toolbar />
      {/* Grid container to arrange items, justify content for horizontal alignment & align items for vertical alignment */}
      <Grid
        container
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems="center"
        // style={{ padding: "10% 0" }}
      >
        <Grid item xs={12} sm={6}>
          {/* <Typography variant={isMobile ? "h4" : "h2"} align="center">
            Welcome Words
          </Typography> */}

          <img src={Homepage} alt="logo" />
        </Grid>
        {/* Grid item for LoginForm component */}
        <Grid item xs={6} sm={6}>
          {/* Box to apply additional CSS to LoginForm, in this case, center alignment */}
          <Box display="flex" justifyContent="center">
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
