import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const TopBar = ({ title, buttonLabel, link }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          {title}
        </Typography>
        <Button color="inherit" component={Link} to={link}>
          {buttonLabel}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
