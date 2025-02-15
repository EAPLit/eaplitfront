// This page is linked to from the verification email to confirm the email verification took place
"use client";
import { useRouter } from "next/navigation"; 

const VerifyEmail = () => {
    const router = useRouter();

    const handleToLogin = () => {
        router.push('/login');
    }

    return (
        <div>
            <p>Congratulation! Your email is confirmed</p>
            <p onClick={handleToLogin}>Go back to login</p>
        </div>
    );
};

export default VerifyEmail;