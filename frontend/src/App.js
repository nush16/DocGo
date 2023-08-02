import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import HomePage from "./pages/homepage/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import ForgotPasswordPage from "./pages/forgotpassword/ForgotPasswordPage";
import AppointmentPage from "./pages/appointments/AppointmentPage";
import PatientsPage from "./pages/patients/PatientsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import StaffsPage from "./pages/staff/StaffPage";
import AddPatient from "./pages/patients/AddPatient";
import AddStaff from "./pages/staff/add_staff/AddStaff";

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
          path="/signup"
          element={
            <>
              <TopBar currentPage="signup" />
              <SignUpPage />
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
        <Route
          path="/add-patient"
          element={
            <>
              <AddPatient />
            </>
          }
        />
        <Route
          path="/add-staff"
          element={
            <>
              <AddStaff />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
