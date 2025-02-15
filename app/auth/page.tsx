"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import FormField from '../componentsHTML/FormField';
import useFormValidation from '../hooks/useFormValidation';
import { useError } from '../context/ErrorContext';
import { useErrorHandler } from '../hooks/useErrorHandler';
import "../styles/register.scss";

const AuthAndVerifications = () => {

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const { resetPassword } = useAuth();

    const { formErrors, isValid } = useFormValidation({password, confirmPassword}, "resetPassword");
    const { error: globalContextError, clearError } = useError();
    const handleError = useErrorHandler();

    // Track if the user touches the input fields
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    });

    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");
    //const mode = "resetPassword";

    const handleToLogin = () => {
        router.push('/login');
    }

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        if (!oobCode) {
            handleError(new Error("Missing oobCode in password reset process."), "There was a fatal error. Re-routing..." )
            setTimeout(() => router.push("/forgot-password"), 1000);
            return;
        }

        // Prevent submitting the form if it is not valid.
        if (!isValid) return;

        try {
            await resetPassword(oobCode, password);
            setTimeout(() => router.push("/login"), 1000); // redirect to login
        } catch (error) {
            handleError(error, "There was an error resetting your password. Please try again.");
            setTimeout(() => router.push("/forgot-password"), 1000);
        }
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({...prev, [field]: true }));
    }

    // Redirects to the login page after 2 seconds.
    const handleReRoute = () => {
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    }

    if (mode === "verifyEmail") {
        return (
            <div>
                <p>Congratulation! Your email is confirmed</p>
                <p onClick={handleToLogin}>Go back to login</p>
            </div>
        )
    }

    if (mode === "resetPassword") {
        return (
            <div className='register-form'>
                <form 
                    className="form" 
                    aria-labelledby="register-heading"
                    onSubmit={handlePasswordReset}
                >
                    <h1 className="register-heading" id="register-heading">Reset your password</h1>
                    <section aria-label="Register Panel">
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
                            <button className="submit-button" type="submit">Reset</button>
                        </div>
                    </section>
                </form>
                {
                    globalContextError ? (
                        <div><p>{globalContextError}</p></div>
                    ) : null
                }
            </div>
        );
    }

    if(!mode) {
        handleReRoute();
        return (
            <div><p>It is not clear what happened here. Redirecting to the login page. Have a nice day...</p></div>
        );
    }
};

export default function AuthAndVerificationsPage() {
    return (
        <Suspense fallback={<div>Loading ... </div>}>
            <AuthAndVerifications />
        </Suspense>
    );
};