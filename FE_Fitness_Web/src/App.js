import React, { useState } from 'react';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login'; // Import the Login component
// import Resetpw from './components/pages/Resetpw';
import Setting from './components/pages/Setting';
import Sidebar from './components/reuse/Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const App = () => {
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const [isLoginComplete, setIsLoginComplete] = useState(false);
  const completeSignup = () => {
    setIsSignupComplete(true);
  };
  const completeLogin = () => {
    setIsLoginComplete(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route for Sign up */}
          <Route
            path="/signup"
            element={<Signup onComplete={completeSignup} />}
          />
          {/* Route for Log in */}
          <Route
            path="/login"
            element={<Login onComplete={completeLogin} />}
          />
          {/* Protected Dashboard Routes */}
          {/* <Route
            path="/dashboard"
            element={
              isLoginComplete ? (
                <>
                  <SideBar />
                  <Dashboard />
                </>
              ) : (
                <Navigate to="/login" /> // Redirect to Authentication if not authenticated
              )
            }
          /> */}
          {/* ProtectedMy Excerise Routes */}
          {/* <Route 
                        path="/myexcersise" 
                        element={
                            isLoginComplete ? (
                                <>
                                    <SideBar />
                                    <MyExcerise />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        } 
                    /> */}
          {/* Protected Setting Routes */}
          {/* <Route
            path="/setting"
            element={
              isLoginComplete ? (
                <>
                  <Sidebar />
                  <Setting />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
          <Route
            path="/setting"
            element={
              <>
                {/* <Sidebar /> */}
                <Setting />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
