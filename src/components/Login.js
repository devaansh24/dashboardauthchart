import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="outer-container">
        <div className="login-container">
          <h1 className="login-heading">Welcome to Dashboard !</h1>
          <Link to="/phonesignup" className="d-grid">
            <Button variant="success" type="submit" className="login-button">
              Sign in with Phone
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
