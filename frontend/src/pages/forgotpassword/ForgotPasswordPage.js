import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TopBar from "../../components/topbar/TopBar";
import ForgotPassword from "./ForgotPassword";
import { styled } from "@mui/system";

// Define a styled Grid container to center the ForgotPasswordForm
const StyledGrid = styled(Grid)({
  height: "calc(100vh - 64px)", // 64px is assumed height of AppBar, adjust if needed
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ForgotPasswordPage = () => {
  return (
    <Box>
      <TopBar
        buttonLabel="Log in"
        link="/"
        hideMenuButton={true}
        alwaysShowLogo={true}
      />
      <StyledGrid container>
        <Grid item xs={12} sm={6}>
          <ForgotPassword />
        </Grid>
      </StyledGrid>
    </Box>
  );
};

export default ForgotPasswordPage;
