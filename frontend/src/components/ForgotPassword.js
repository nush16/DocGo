import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const ForgotPasswordContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 600,
  height: 300,
  padding: 24,
  boxSizing: 'border-box',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  borderRadius: '4px', 
  backgroundColor: '#ffffff',
});

const StyledTextField = styled(TextField)({
  margin: '10px 0',
});

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <ForgotPasswordContainer>
      <Typography variant="h5" gutterBottom>
        Forgot Password
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
        <Button variant="contained" type="submit" style={{ marginTop: '20px' }}>
          Reset Password
        </Button>
      </form>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
