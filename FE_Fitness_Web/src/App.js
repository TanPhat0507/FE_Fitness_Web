import React, { useState } from 'react';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Setting from './components/pages/Setting';
import Sidebar from './components/reuse/Sidebar';

import Dashboard from './components/pages/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MyExcerise from './components/pages/MyExcerise';

const App = () => {
  const [isLoginComplete, setIsLoginComplete] = useState(!!localStorage.getItem('token'));

  const completeSignup = () => {
    console.log('Signup complete');
  };

  const completeLogin = (token) => {
    localStorage.setItem('token', token); // Lưu token vào localStorage
    setIsLoginComplete(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khi logout
    setIsLoginComplete(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route cho Login */}
          <Route
            path="/login"
            element={<Login onComplete={completeLogin} />}
          />
          <Route
            path="/"
            element={<Login onComplete={completeLogin} />}
          />
          {/* Route cho Sign up */}
          <Route
            path="/signup"
            element={<Signup onComplete={completeSignup} />}
          />
          {/* Protected Route cho Dashboard */}
          <Route
            path="/dashboard"
            element={
              isLoginComplete ? (
                <>
                  <Sidebar onLogout={handleLogout} />
                  <Dashboard />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Protected Route cho My Excerise */}
          <Route
            path="/myexercise"
            element={
              isLoginComplete ? (
                <>
                  <Sidebar onLogout={handleLogout} />
                  <MyExcerise />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Protected Route cho Setting */}
          <Route
            path="/setting"
            element={
              isLoginComplete ? (
                <>
                  <Sidebar onLogout={handleLogout} />
                  <Setting />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;