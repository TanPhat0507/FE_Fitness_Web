import React, { useState } from 'react';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Resetpw from './components/pages/Resetpw';
import Setting from './components/pages/Setting';
import Sidebar from './components/reuse/Sidebar';
import Dashboard from './components/pages/Dashboard';
import MyExercise from './components/pages/MyExcerise'; // Thêm import MyExercise
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { DateProvider } from './components/pages/DateContext';
const App = () => {
  // Hàm kiểm tra trạng thái đăng nhập bằng cách kiểm tra token trong localStorage
  const isAuthenticated = () => !!localStorage.getItem('token');

  const completeSignup = () => {
    console.log('Signup complete');
  };

  const completeLogin = (token) => {
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  // Middleware bảo vệ route
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route cho Login */}
          <Route path="/login" element={<Login onComplete={completeLogin} />} />
          <Route path="/" element={<Login onComplete={completeLogin} />} />

          {/* Route cho Sign up */}
          <Route path="/signup" element={<Signup onComplete={completeSignup} />} />

          {/* Route cho Reset Password */}
          <Route path="/reset-password" element={<Resetpw />} />

          {/* Protected Route cho Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Sidebar onLogout={handleLogout} />
                    <DateProvider>
                      <Dashboard />
                    </DateProvider>
                  </>
                }
              />
            }
          />

          {/* Protected Route cho Setting */}
          <Route
            path="/setting"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Sidebar onLogout={handleLogout} />
                    <Setting />
                  </>
                }
              />
            }
          />

          {/* Protected Route cho MyExercise */}
          <Route
            path="/myexercise"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Sidebar onLogout={handleLogout} />
                    <DateProvider>
                      <MyExercise />
                    </DateProvider>
                  </>
                }
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
