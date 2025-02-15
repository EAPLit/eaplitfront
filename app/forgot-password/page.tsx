"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import "../styles/register.scss";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const router = useRouter();
    const { sendPasswordChangeRequestEmail } = useAuth();

    const handleDirectToLogin = () => {
        router.push('/login');
    };

    const sendVerificationEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendPasswordChangeRequestEmail(email);
        } catch (error) {
            console.error("Big fat error!");
        }
    };

    return (
        <div className="register-form">

            <form 
                onSubmit={sendVerificationEmail}
                className="form"
                aria-labelledby="reset-password"
            >
                <h1 className="register-heading">Send Request for New Password</h1>
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
                <div className="submit-area">
                    <button className="submit-button" type="submit">Send Request</button>
                </div>
                <div className="form-bottom">
                    <p className="to-login" onClick={handleDirectToLogin}>To login</p>
                </div>
            </form>
            

        </div>
    );
};

export default ForgotPassword;