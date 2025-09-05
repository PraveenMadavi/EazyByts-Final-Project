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
import "../styles/SignIn.css";
import { useNews } from "./NewsContext";


function SignIn() {
    const BaseURL = import.meta.env.VITE_API_BASE_URL;
    const { setUserEmail, setUser_Name } = useNews();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginData = {
        email: email,
        password: password,
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Call API for validation
            if (email && password) {
                const res = await axios.post(`${BaseURL}/user/login`, loginData, {
                    withCredentials: true,
                });
                console.log("Login successful!", res.data);
                setUserEmail(res.data.email)
                setUser_Name(res.data.username)
                // After successful login
                navigate("/news");
            } else {
                setError("Please enter valid credentials!");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUpRedirect = () => {
        navigate("/signup");
    };

    return (
        <div className="signin-container">

            {/* Fixed Brand Header */}
            <div className="brand-section fixed-brand">
                <div className="brand-logo">
                    EazyByts<span className="brand-accent">News</span>
                </div>
                <p className="brand-tagline mx-5" style={{
                    color: "#061958",
                    fontSize: "17px",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 300,
                    lineHeight: "1.5",
                }}>
                    EazyBytsNews brings together the latest stories from trusted sources
                    worldwide, giving you one place to explore, compare, and stay informed.
                </p>
            </div>

            <Container className="signin-wrapper">
                <Card className="signin-card my-2">
                    <CardBody className="signin-card-body">
                        {/* Website Logo/Brand */}
                        <div className="brand-section">
                            <div className="brand-logo">
                                EazyByts<span className="brand-accent">News</span>
                            </div>
                            <p className="brand-tagline">
                                Your trusted source for latest updates
                            </p>
                        </div>

                        <CardTitle tag="h4" className="signin-title">
                            Welcome Back!
                        </CardTitle>

                        {error && (
                            <Alert color="danger" className="mb-3">
                                {error}
                            </Alert>
                        )}

                        <Form onSubmit={handleSignIn}>
                            <FormGroup className="mb-3">
                                <Label for="email" className="form-label">
                                    Email Address
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="custom-input"
                                />
                            </FormGroup>

                            <FormGroup className="mb-4">
                                <Label for="password" className="form-label">
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                className="signin-button"
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner size="sm" className="me-2" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </Form>

                        {/* Forgot Password Link */}
                        <div className="forgot-password-section">
                            <a href="#forgot-password" className="forgot-password-link">
                                Forgot your password?
                            </a>
                        </div>

                        {/* Sign Up Section */}
                        <div className="signup-section">
                            <hr className="signup-divider" />
                            <p className="signup-text">
                                Don't have an account?
                            </p>
                            <Button
                                color="outline-secondary"
                                size="lg"
                                block
                                onClick={handleSignUpRedirect}
                                className="register-button"
                            >
                                Register Here
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default SignIn;