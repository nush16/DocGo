import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const LoginFormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 600,
  height: 400,
  padding: 24,
  boxSizing: 'border-box',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // add box shadow here
  borderRadius: '4px', // optional, if you want rounded corners
  backgroundColor: '#ffffff', // optional, if you want a specific background color
});

const StyledTextField = styled(TextField)({
  margin: '10px 0',
});

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <LoginFormContainer>
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <StyledTextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button href="/appointments" variant="contained" type="submit" style={{ marginTop: '20px' }}>
          Sign In
        </Button>
        <Typography style={{ marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}>
          <Link to="/forgotpassword" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            Forgot Password?
          </Link>
        </Typography>
      </form>
    </LoginFormContainer>
  );
};

export default LoginForm;
