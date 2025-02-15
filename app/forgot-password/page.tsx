"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import useFormValidation from '../hooks/useFormValidation';
import FormField from '../componentsHTML/FormField';
import "../styles/register.scss";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const router = useRouter();
    const { sendPasswordChangeRequestEmail } = useAuth();
    const { formErrors, isValid } = useFormValidation({email}, "login");
    const [touched, setTouched] = useState({
        email: false
    });

    const handleDirectToLogin = () => {
        router.push('/login');
    };

    const sendVerificationEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure form is valid before sending
        //if (!isValid) return;
        console.log("HA! Sending!");
        try {
            await sendPasswordChangeRequestEmail(email);
        } catch (error) {
            console.error("Big fat error!", error);
        }
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({...prev, [field]: true }));
    }

    return (
        <div className="register-form">

            <form 
                onSubmit={sendVerificationEmail}
                className="form"
                aria-labelledby="reset-password"
            >
                <h1 className="register-heading">Send Request for New Password</h1>
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