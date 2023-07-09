import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import { Container, Row, Col } from "react-bootstrap";
import ProtectedRoute from "./components/ProtectedRoute.js";
import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext.js";
import Home from "./components/Home.js";


const App = () => {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/phonesignup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
   
  );
};

export default App;
