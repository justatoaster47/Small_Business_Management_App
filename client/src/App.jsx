import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Records from './pages/Records';
import CreateTicket from './pages/CreateTicket';

// Helper function to check authentication
const isAuthenticated = () => {
  const token = localStorage.getItem("jwt");
  
  if (!token) return false; // No token, not authenticated
  
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decodedToken.exp > currentTime; // Check if the token's expiration time is still valid
  } catch (error) {
    console.error('Invalid token:', error);
    return false; // Return false if the token is invalid or can't be decoded
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/records"
          element={
            <PrivateRoute>
              <Records />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-ticket"
          element={
            <PrivateRoute>
              <CreateTicket />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default App;


