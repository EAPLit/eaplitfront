"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "../api/useFetch";
import { useError } from "../context/ErrorContext";
import useFormValidation from "../hooks/useFormValidation";
import FormField from "../componentsHTML/FormField";
import { useErrorHandler } from "../hooks/useErrorHandler";
import ErrorMessage from "../componentsHTML/ErrorMessage";
import '../styles/login.scss';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();
    const { login, loading: firebaseLoading, user } = useAuth();
    const { loading: useFetchLoading, success, error: errorFromFetch, sendRequest } = useFetch(
        '/auth/login'
    );
    const { clearError } = useError();

    const { formErrors, isValid } = useFormValidation({email, password}, "login");

    const handleError = useErrorHandler();

    // Track if a field has been touched by the user
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    useEffect(() => {
        if (!firebaseLoading && !useFetchLoading && user) {
            router.push('/mylearning');
        }
    }, [user, firebaseLoading, useFetchLoading, router]);

    // This useEffect listen to see if there is any change in
    // errorFromFetch and handles the error accordingly
    useEffect(() => {
        if (errorFromFetch) {
            handleError(errorFromFetch, "Error fetching details from our database.");
        }
    }, [errorFromFetch, handleError]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        console.log("Login button clicked with email:", email, "and password:", password);

        // Check that the form is valid here and do nothing if not valid.
        if (!isValid) return;

        // First login with firebase
        try {
            const firebaseUser = await login(email, password);
            // Then get details from my database
            if (firebaseUser?.uid) {
                await sendRequest(
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ uid: user?.uid })
                    }
                );
            } else {
                console.warn("User UID not found. Skipping DB fetch.");
            }
        } catch (err) {
            console.log("Error logging in with Firebase: ", err);
            handleError(err, "Error logging in! Please try again.");
            return;
        }

        
        
    }

    const handleForgotPassword = () => {
        router.push("/forgot-password");
    }

    const handleToRegistration = () => {
        router.push("/register");
    }

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    }

    return (
        <div className="login-form">
            <form className="form" aria-labelledby="login-heading" onSubmit={handleLogin}>
                <h1 className="login-heading" id="login-heading">Login</h1>
                <section aria-label="Login Panel">
                    <FormField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur("email")}
                        touched={touched.email}
                        error={formErrors.email}
                    />
                    <FormField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur("password")}
                        touched={touched.password}
                        error={formErrors.password}
                    />
                    <div className="submit-area">
                        <button className="submit-button" type="submit">Login</button>
                    </div>
                    <div className="form-bottom">
                        <p className="to-registration" onClick={handleToRegistration}>To registration</p>
                        <p className="forgot-password-link" onClick={handleForgotPassword}>Forgot password</p>
                    </div>
                </section>
            </form>
            {
                firebaseLoading || useFetchLoading ? (
                    <div><p>Logging in...</p></div>
                ) : null
            }
            {
                success === false ? (
                    <div><p>There was an error logging in. Please try again.</p></div>
                ) : null
            }
            <ErrorMessage />
        </div>
    );
};

export default Login;