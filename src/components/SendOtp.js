import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth,app } from "../firebase";



const SendOTP = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const verifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: () => {
        // reCAPTCHA verification successful
        setRecaptchaVerifier(verifier);
      },
      "expired-callback": () => {
        // reCAPTCHA expired
        setRecaptchaVerifier(null);
      },
    });
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credential = await confirmationResult.confirm(otp);
      console.log(credential);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Send OTP</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!otpSent ? (
        <Form onSubmit={handleSendOTP}>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <div id="recaptcha-container" />
          <Button variant="primary" type="submit">
            Send OTP
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleVerifyOTP}>
          <Form.Group controlId="formBasicOTP">
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Verify OTP
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SendOTP;
