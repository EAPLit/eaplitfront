"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import useFetch from "../api/useFetch";
import '../styles/login.scss';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();
    const { login, loading: firebaseLoading, user } = useAuth();
    const { loading: useFetchLoading, success, error, sendRequest } = useFetch(
        '/auth/login'
    );

    useEffect(() => {
        if (!firebaseLoading && !useFetchLoading && user) {
            router.push('/mylearning');
        }
    }, [user, firebaseLoading, useFetchLoading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Add verification here

        // First login with firebase
        try {
            await login(email, password);
        } catch (error) {
            console.error("Login with firebase failed: ", error);
        }

        // Then get details from my database
        try {
            await sendRequest(
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ uid: user?.uid })
                }
            )
        } catch (error) {
            console.error("Login with my database failed: ", error);
        }
    }

    const handleToRegistration = () => {
        router.push("/register");
    }

    return (
        <div className="login-form">
            <form className="form" aria-labelledby="login-heading" onSubmit={handleLogin}>
                <h1 className="login-heading" id="login-heading">Login</h1>
                <section aria-label="Login Panel">
                    <div className="input-area">
                        <label className="input-label" htmlFor="email">Email</label>
                        <input
                            className="input-item" 
                            id="email"
                            type="email" 
                            placeholder="Your email" 
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
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submit-area">
                        <button className="submit-button" type="submit">Login</button>
                    </div>
                    <div className="form-bottom">
                        <p className="to-registration" onClick={handleToRegistration}>To registration</p>
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
            {
                error ? (
                    <div><p>{error}</p></div>
                ) : null
            }
        </div>
    );
};

export default Login;