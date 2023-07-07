import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { Container, Row, Col } from 'react-bootstrap'
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"
import { UserAuthContextProvider } from './context/UserAuthContext'
import Home from './components/Home'
import data from "./filedata/jsondata"
import Charts from './components/Charts'
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
                    <Home data={data} />
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
    // <Charts />
  );
}

export default App