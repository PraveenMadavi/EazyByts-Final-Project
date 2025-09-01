import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  CardBody,
  CardTitle,
  Alert,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";

function SignUp() {
  const BaseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (message && message.type === "danger") setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const { username, email, password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        setMessage({ type: "danger", text: "Passwords do not match!" });
        return;
      }

      if (password.length < 6) {
        setMessage({
          type: "danger",
          text: "Password must be at least 6 characters long!",
        });
        return;
      }

      // Build payload from the latest state values
      const userData = { username, email, password };

      const res = await axios.post(`${BaseURL}/user/register`, userData);
      console.log("Sign Up response:", res?.data);

      setMessage({ type: "success", text: "Account created successfully!" });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      // Try to surface server-provided error if available
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Registration failed. Please try again.";
      setMessage({ type: "danger", text: serverMsg });
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInRedirect = () => navigate("/");

  return (
    <div className="signup-container">
      <Container className="signup-wrapper">
        <Card className="signup-card my-2">
          <CardBody className="signup-card-body">
            <div className="brand-section">
              <div className="brand-logo">
                EazyByts<span className="brand-accent">News</span>
              </div>
              <p className="brand-tagline">
                Your trusted source for latest updates
              </p>
            </div>

            <CardTitle tag="h4" className="signup-title">
              Create Your Account
            </CardTitle>

            {message && (
              <Alert color={message.type} className="mb-3">
                {message.text}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <Label htmlFor="username" className="form-label">
                  Username
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="custom-input"
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Label htmlFor="email" className="form-label">
                  Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="custom-input"
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Label htmlFor="password" className="form-label">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="custom-input"
                />
                <small className="password-hint">
                  Password must be at least 6 characters long
                </small>
              </FormGroup>

              <FormGroup className="mb-4">
                <Label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="custom-input"
                />
              </FormGroup>

              <Button
                color="primary"
                size="lg"
                block
                type="submit"
                disabled={isLoading}
                className="signup-button"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>

            <div className="signin-section">
              <hr className="signin-divider" />
              <p className="signin-text">Already have an account?</p>
              <Button
                color="outline-secondary"
                size="lg"
                block
                onClick={handleSignInRedirect}
                className="signin-redirect-button"
              >
                Sign In Here
              </Button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default SignUp;
