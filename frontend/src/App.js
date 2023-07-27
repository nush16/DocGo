import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AppointmentPage from './components/AppointmentPage';
import PatientsPage from './components/PatientsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><TopBar currentPage="signin"/><HomePage /></>} />
        <Route path="/signup" element={<><TopBar currentPage="signup"/><SignUpPage /></>} />
        <Route path="/forgotpassword" element={<><TopBar currentPage="forgotpassword"/><ForgotPasswordPage /></>} />
        <Route path="/appointments" element={<><TopBar currentPage="appointments"/><AppointmentPage /></>} />
        <Route path="/patients" element={<><TopBar currentPage="patients"/><PatientsPage /></>} />
      </Routes>
    </Router>
  );
}

export default App;
