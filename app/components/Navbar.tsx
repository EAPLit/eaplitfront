"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';

const Navbar = () => {

    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
             await logout();
             router.push('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div>
            <p>Welcome to Eaply</p>
            <p onClick={handleLogout}>Logout</p>
        </div>
    );
};

export default Navbar;