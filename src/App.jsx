import React from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import HomeScreen from "./pages/home/index";
import LoginScreen from "./pages/login/index";
import SignUpScreen from "./pages/signup/index";
import ForgotPasssword from "./pages/forgotPassword/index";

const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUpScreen /></PublicRoute>} />
        <Route path="/forgotpassword" element={<PublicRoute><ForgotPasssword /></PublicRoute>} />
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// Taha Tahir




