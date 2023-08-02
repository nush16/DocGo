import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import { Hidden } from "@mui/material";
import Logo from "../../assets/logo-doc.svg";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const LogoContainer = styled("div")({
  height: "1rem",
  width: "1rem",
  display: "flex",
  alignItems: "center",
});

const StyledTypography = styled(Typography)({
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
});

const StyledButton = styled(Button)({
  float: "right",
  marginRight: "0px",
});

const TopBar = ({
  title,
  buttonLabel,
  link,
  showNotification = false,
  handleDrawerToggle,
  hideMenuButton = false,
  alwaysShowLogo = false,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <StyledToolbar>
        <Hidden mdUp>
          {!hideMenuButton && (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Hidden>
        {alwaysShowLogo || (
          <Hidden mdDown>
            <LogoContainer>
              <img src={Logo} alt="logo" />
            </LogoContainer>
          </Hidden>
        )}
        {alwaysShowLogo && (
          <LogoContainer>
            <img src={Logo} alt="logo" />
          </LogoContainer>
        )}
        <div>
          <StyledTypography variant="h6">{title}</StyledTypography>
        </div>
        {showNotification && (
          <IconButton color="inherit">
            {" "}
            {/* Set color to "inherit" */}
            <NotificationsNoneIcon />
          </IconButton>
        )}
        {buttonLabel && (
          <StyledButton color="inherit" component={Link} to={link}>
            {buttonLabel}
          </StyledButton>
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default TopBar;
