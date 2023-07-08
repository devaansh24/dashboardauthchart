import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import "./Signup.css";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    location.state?.phoneNumber || ""
  );
  const [error, setError] = useState("");

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        "defaultPassword"
      );

      const user = userCredential.user;

      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        await setDoc(userDocRef, {
          name,
          email,
          phoneNumber,
        });

        navigate("/send-otp"); 
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="p-4 box">
          <h2 className="heading">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleProfileSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
                defaultCountry="IN"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Enter your phone number"
              />
            </Form.Group>
            <div className="button-center">
              <Link to="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button variant="primary" type="submit">
                Save Profile
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Profile;
