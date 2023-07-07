import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Link to="/phonesignup">
        <div className="d-grid gap-2 mt-3">
          <Button variant="success" type="submit">
            Sign in with Phone
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Login;
