import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext.js";
import { signInWithPhoneNumber } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase.js";
import "./Signup.css";

const Signup = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null); 
  const { setUpRecaptcha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
      toast.success("OTP sent successfully!");
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === "" || otp === null) return;
    try {
      const credential = await confirmObj.confirm(otp); 
      console.log(credential);
     
     navigate("/home")
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <div className="p-4 box">
          <h2 className="heading ">Hey User !</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter phone number"
              />
              <div id="recaptcha-container" />
            </Form.Group>
            <div className="button-center">
              <Link to="/">
                <Button variant="secondary">Cancel</Button>
              </Link>

              <Button variant="primary" type="submit">
                Send OTP
              </Button>
            </div>
          </Form>
          <Form
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Control
                type="otp"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div className="button-center">
              <Link to="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <div className="spacer" />
              <Button variant="primary" type="submit">
                Verify OTP
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
