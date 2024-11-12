import React, { useState } from 'react';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login'; // Import the Login component
// import Resetpw from './components/pages/Resetpw';
import Setting from './components/pages/Setting';
import Sidebar from './components/reuse/Sidebar';
import MyExcerise from './components/pages/MyExcerise';
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
            path="/"
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
                <Navigate to="/" /> // Redirect to Authentication if not authenticated
              )
            }
          /> */}
          {/* ProtectedMy Excerise Routes */}
          <Route
          // path="/myexcersise"
          // element={
          //   isLoginComplete ? (
          //     <>
          //       {/* <SideBar /> */}
          //       <MyExcerise />
          //     </>
          //   ) : (
          //     <Navigate to="/" />
          //   )
          // }
          />

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
                <Navigate to="/" />
              )
            }
          /> */}
          <Route
            path="/sidebar"
            element={
              <>
                <Sidebar />
                {/* <Setting /> */}
              </>
            }
          />
          <Route
            path="/myexcerise"
            element={
              <>
                <MyExcerise />
                {/* <Setting /> */}
              </>
            }
          />
        </Routes>
      </div>
    </Router >
  );
};

export default App;
