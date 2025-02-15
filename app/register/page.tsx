"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "../api/useFetch";
import "../styles/register.scss";

const Register: React.FC = () => {

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const router = useRouter();
    const { register, user, loading: firebaseLoading, verifyEmail, deleteUserFromFirebase } = useAuth();
    const { loading: useFetchLoading, success, error, sendRequest} = useFetch<void>(
        '/auth/register',
    );

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

        // Add verification here

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

    return (
        <div className='register-form'>
            <form 
                className="form" 
                aria-labelledby="register-heading"
                onSubmit={handleRegister}
            >
                <h1 className="register-heading" id="register-heading">Register</h1>
                <section aria-label="Register Panel">
                    <div className="input-area">
                        <label className="input-label" htmlFor="your-name">Name</label>
                        <input 
                            className="input-item" 
                            id="your-name" 
                            type="text" 
                            placeholder="Your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="username">Username</label>
                        <input 
                            className="input-item" 
                            id="username" 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="email">Email</label>
                        <input 
                            className="input-item" 
                            id="email" 
                            type="email" 
                            placeholder="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input 
                            className="input-item" 
                            id="password" 
                            type="password" 
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="confirm-password">Confirm password</label>
                        <input 
                            className="input-item" 
                            id="confirm-password" 
                            type="password" 
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
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