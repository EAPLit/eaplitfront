"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import "../styles/register.scss";

const PasswordReset = () => {

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const { resetPassword } = useAuth();

    const oobCode = searchParams.get("oobCode");


    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!oobCode) {
            console.error("Big error with oobCode again!");
            return;
        }

        try {
            await resetPassword(oobCode, password);
            setTimeout(() => router.push("/login"), 1000); // redirect to login
        } catch (error) {
            console.error("There was another great big fat error again!:", error);
        }
    };

    // TODO Add password validation

    return (
        <div className='register-form'>
            <form 
                className="form" 
                aria-labelledby="register-heading"
                onSubmit={handlePasswordReset}
            >
                <h1 className="register-heading" id="register-heading">Reset your password</h1>
                <section aria-label="Register Panel">
                    <div className="input-area">
                        <label className="input-label" htmlFor="password">New Password</label>
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
                        <label className="input-label" htmlFor="confirm-password">Confirm new password</label>
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
                        <button className="submit-button" type="submit">Reset</button>
                    </div>
                </section>
            </form>
        </div>
    );
};

export default PasswordReset;