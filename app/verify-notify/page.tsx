// This page is used to notify the user to verify their email after registering
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useAuth } from "../context/AuthContext";

const Verify = () => {
    const { logout } = useAuth();
    const router = useRouter();
    const handleToLogin = () => {
        router.push("/login");
    }

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout();
            } catch (error) {
                console.error("There was an error logging back out: ", error);
            }
        }
        handleLogout();

    }, []);

    return (
        <div>
            <section>
                <p>Congratulations, you have registered</p>
                <p>Please check your email and click the link to verify your email then go to login.</p>
            </section>
            <section>
                <p onClick={handleToLogin}>Back to login</p>
            </section>
        </div>
    )
};

export default Verify;