import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h5">
          Sign In
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Sign In
        </Button>
        <Typography>
          Forgot Password?
        </Typography>
      </Box>
    </form>
  );
};

export default LoginForm;