"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';
import { useError } from '../context/ErrorContext';
import { useErrorHandler } from '../hooks/useErrorHandler';

const Navbar = () => {

    const { logout } = useAuth();
    const router = useRouter();
    const handleError = useErrorHandler();
    const { clearError } = useError();

    const handleLogout = async () => {
        clearError();
        try {
             await logout();
             router.push('/');
        } catch (error) {
            handleError(error, "There was an error logging you out.")
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