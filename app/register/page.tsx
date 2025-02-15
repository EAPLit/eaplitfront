"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "../api/useFetch";
import useRegisterValidation from "../hooks/useRegisterValidation";
import FormField from "../componentsHTML/FormField";
import "../styles/register.scss";

const Register: React.FC = () => {

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const router = useRouter();
    const { register, user, loading: firebaseLoading, verifyEmail, deleteUserFromFirebase } = useAuth();
    const { loading: useFetchLoading, success, error, sendRequest} = useFetch<void>(
        '/auth/register',
    );

    const { formErrors, isValid } = useRegisterValidation(name, username, email, confirmEmail, password, confirmPassword);

    // Track if a field has been touched by the user
    const [touched, setTouched] = useState({
        name: false,
        username: false,
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false
    });

    // Listens to see if the user is registered and re-routes if so.
    // Sends a verification email if the user is registered.
    useEffect(() => {

        const verifyUserEmail = async () => {
            try {
                await verifyEmail();
            } catch (error) {
                console.error("Error verifying email:", error);
            }
        };
        verifyUserEmail();

        if (!firebaseLoading && !useFetchLoading && user) {
            router.push('/verify-notify');
        }
    }, [user, firebaseLoading, useFetchLoading, router, verifyEmail]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // useRegisterValidation to ensure the form is valid
        if (!isValid) return;

        // First register with firebase
        try {
            await register(username, email, password);
        } catch (error) {
            console.error("Registration failed with firebase:", error);
        }

        // Then register with me
        // If registration fails, then delete the user from firebase
        try {
            await sendRequest(
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ uid: user?.uid, name: name, username: username, email: email }),
                }
            );
        } catch (error) {
            deleteUserFromFirebase();
            console.error("Registration failed with my database", error);
        }
    }

    const handleDirectToLogin = () => {
        router.push('/login');
    }

    const handleBlur = (field: string) => {
        setTouched((prev) => ({...prev, [field]: true }));
    }

    return (
        <div className='register-form'>
            <form 
                className="form" 
                aria-labelledby="register-heading"
                onSubmit={handleRegister}
            >
                <h1 className="register-heading" id="register-heading">Register</h1>
                <section aria-label="Register Panel">
                    <FormField 
                        id="your-name"
                        label="Name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => handleBlur("name")}
                        touched={touched.name}
                        error={formErrors.name}
                    />
                    <FormField 
                        id="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => handleBlur("username")}
                        touched={touched.username}
                        error={formErrors.username}
                    />
                    <FormField 
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur("email")}
                        touched={touched.email}
                        error={formErrors.email}
                    />
                    <FormField 
                        id="confirmEmail"
                        label="Confirm email"
                        type="email"
                        placeholder="Confirm email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        onBlur={() => handleBlur("confirmEmail")}
                        touched={touched.confirmEmail}
                        error={formErrors.confirmEmail}
                    />
                    <FormField 
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur("password")}
                        touched={touched.password}
                        error={formErrors.password}
                    />
                    <FormField 
                        id="confirm-password"
                        label="Confirm password"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => handleBlur("confirmPassword")}
                        touched={touched.confirmPassword}
                        error={formErrors.confirmPassword}
                    />
                    <div className="submit-area">
                        <button className="submit-button" type="submit">Register</button>
                    </div>
                    <div className="form-bottom">
                        <p className="to-login" onClick={handleDirectToLogin}>To login</p>
                    </div>
                </section>
            </form>
            {
                firebaseLoading || useFetchLoading ? (
                    <div><p>Registering...</p></div>
                ) : null
            }
            {
                success === false ? (
                    <div><p>There was an error registering you. Please try again</p></div>
                ): null
            }
            {
                error ? (
                    <div><p>{error}</p></div>
                ) : null
            }
        </div>
    );
};

export default Register;