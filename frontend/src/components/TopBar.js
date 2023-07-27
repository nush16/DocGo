import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
}));

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const StyledTypography = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
});

const StyledButton = styled(Button)({
  float: 'right',
  marginRight: '0px'
});

const TopBar = ({ title, buttonLabel, link, children, showNotification = false }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <StyledToolbar>
      <LogoContainer>
          <img src="../assets/logo.svg" alt="logo" /> {/* logo image */}
        </LogoContainer>        
        <div>
          <StyledTypography variant="h6">
            {title}
          </StyledTypography>
        </div>
        {showNotification && (
            <IconButton color = "#3c3c3c" >
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