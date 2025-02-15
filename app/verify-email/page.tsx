// This page is linked to from the verification email to confirm the email verification took place
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "next/navigation"; 

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const [message, setMessage] = useState<string>("Verifying...");
    const [verified, setVerified] = useState<boolean>(true);
    const router = useRouter();
    const { confirmEmailVerification } = useAuth();

    useEffect(() => {
        const oobCode = searchParams.get("oobCode");
        if (oobCode) {
            confirmEmailVerification(oobCode);
        } else {
            setMessage("Invalid verification link. Please try again");
            setVerified(false);
        }
    });

    // If the verification link is not valid, go back to register
    // TODO - find a way to allow the user to send an email confirmation again, but limit the number of times
    // it can be sent.
    const handleToRegister = () => {
        router.push('/register');
    }

    return (
        <div>
            <section>
                <h1>{message}</h1>
            </section>
            <section>
                {
                    !verified ? (
                        <div><p onClick={handleToRegister}>Go back to register</p></div>
                    ) : null
                }
            </section>
        </div>
    );
};

export default VerifyEmail;