import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const confirmationResult = location.state?.confirmationResult;

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      const credential = await signInWithPhoneNumber(
        auth,
        confirmationResult,
        otp
      );
      console.log(credential);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={verifyOtp}>
        <Form.Group controlId="formBasicOtp">
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify OTP
        </Button>
      </Form>
    </div>
  );
};

export default VerifyOtp;
