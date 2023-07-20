import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '&.MuiToolbar-root': {
    // Override styles for root class here if needed
  },
  '&.MuiToolbar-gutters': {

  },
  '&.MuiToolbar-regular': {
    // Override styles for regular class here if needed
  },
  justifyContent: 'space-between',
}));

const StyledTypography = styled(Typography)({
  paddingLeft: '0px',
});

const StyledButton = styled(Button)({
  float: 'right',
  marginRight: '0px'
});

const TopBar = ({ title, buttonLabel, link, children }) => {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <div>
          <StyledTypography variant="h6">
            {title}
          </StyledTypography>
          {children}
        </div>
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