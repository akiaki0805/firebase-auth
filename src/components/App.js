import React from "react"
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
//     バージョン６に変わったことでRoutesを利用
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";


function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            {/* 資料ではSwithで囲われているがバージョン６ではRoutesを使う */}
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>

      </div>
    </Container>
  )
}

export default App;
