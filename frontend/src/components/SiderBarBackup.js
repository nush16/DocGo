import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, Toolbar } from '@mui/material';

export default function Sidebar() {
  const mainListItems = [
    {text: 'Appointments', path: '/appointments'},
    {text: 'Patients', path: '/patients'},
    {text: 'Staff', path: '/staff'}
  ];

  const bottomListItems = [
    {text: 'My Profile', path: '/profile'},
    {text: 'Log Out', path: '/logout'}
  ];

  const renderList = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItem 
          button 
          key={item.text} 
          component={NavLink} 
          to={item.path}
          style={{ backgroundColor: (item.text === 'My Profile' || item.text === 'Log Out') ? 'darkgrey' : 'white' }}
          activeClassName="Mui-selected"
          exact
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <Toolbar/>
      <Drawer variant="permanent">
        <Box display="flex" flexDirection="column" height="100%">
          {renderList(mainListItems)}
          <Box mt="auto">
            {renderList(bottomListItems)}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
