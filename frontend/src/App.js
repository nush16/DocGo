import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><TopBar currentPage="login"/><HomePage /></>} />
        <Route path="/signup" element={<><TopBar currentPage="signup"/><SignUpPage /></>} />
      </Routes>
    </Router>
  );
}

export default App;
