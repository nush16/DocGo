import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import HomePage from "./pages/homepage/HomePage";
import ForgotPasswordPage from "./pages/forgotpassword/ForgotPasswordPage";
import AppointmentPage from "./pages/appointments/AppointmentPage";
import PatientsPage from "./pages/patients/PatientsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import StaffsPage from "./pages/staff/StaffPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBar currentPage="signin" />
              <HomePage />
            </>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <>
              <TopBar currentPage="forgotpassword" />
              <ForgotPasswordPage />
            </>
          }
        />
        <Route
          path="/appointments"
          element={
            <>
              <TopBar currentPage="appointments" />
              <AppointmentPage />
            </>
          }
        />
        <Route
          path="/patients"
          element={
            <>
              <TopBar currentPage="patients" />
              <PatientsPage />
            </>
          }
        />
        <Route
          path="/staff"
          element={
            <>
              <TopBar currentPage="staff" />
              <StaffsPage />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <TopBar currentPage="profile" />
              <ProfilePage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
