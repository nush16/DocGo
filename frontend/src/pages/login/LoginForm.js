import React, { useState, useContext } from "react";
import { AuthContext } from '../../AuthContext';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import axios from 'axios';

const backendURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URL_DEV : process.env.REACT_APP_BACKEND_URL_PROD;
console.log(backendURL);

const LoginFormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 600,
  height: 400,
  padding: 24,
  boxSizing: "border-box",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
  borderRadius: "4px", 
  backgroundColor: "#ffffff",
});

const StyledTextField = styled(TextField)({
  margin: "10px 0",
});

const LoginForm = () => {
  // Retrieve the setToken function from the AuthContext
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (email === "" || password === "") {
      setLoginError("Please fill out all fields.");
      return;
    }

    axios.post(`${backendURL}/login`, { email, password })
      .then(response => {
        console.log(response.data);
        // Update to match your server response
        if (response.status === 200) {
          const token = response.data.token;
          const userId = response.data.userId;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          setToken(token);
          window.location.href = '/appointments';
        } else if (response.status === 400) {
          setLoginError("This email and/or password is not correct.");
        } else {
          setLoginError("An error occurred. Please try again.");
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setLoginError("This email and/or password is not correct.");
        } else {
          setLoginError("An error occurr. Please try again.");
        }
      });
  };

  return (
    <LoginFormContainer style={{ backgroundColor: "#f5fbff" }}>
      <Typography variant="h4" gutterBottom>
        Welcome
      </Typography>
      {loginError && <Typography color="error">{loginError}</Typography>}
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledTextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Sign In
        </Button>
        <Typography
          style={{
            marginTop: "20px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          <Link
            to="/forgotpassword"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Forgot Password?
          </Link>
        </Typography>
      </form>
    </LoginFormContainer>
  );
};

export default LoginForm;
