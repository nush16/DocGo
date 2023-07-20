import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import ForgotPassword from './components/ForgotPasswordPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><TopBar currentPage="signin"/><HomePage /></>} />
        <Route path="/signup" element={<><TopBar currentPage="signup"/><SignUpPage /></>} />
        <Route path="/forgotpassword" element={<><TopBar currentPage="signup"/><ForgotPasswordPage /></>} />
      </Routes>
    </Router>
  );
}

export default App;
