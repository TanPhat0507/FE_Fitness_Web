import React, { useState } from 'react';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login'; // Import the Login component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  const completeSignup = () => {
    setIsSignupComplete(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/signup" replace />} 
          />
          <Route 
            path="/signup" 
            element={<Signup onComplete={completeSignup} />} 
          />
          <Route 
            path="/login" 
            element={<Login />} // Add the route for Login
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
