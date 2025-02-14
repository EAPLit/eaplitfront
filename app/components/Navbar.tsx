"use client"

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';

const Navbar = () => {

    const { logout, user } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = async () => {
        try {
             await logout();
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