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
        <nav>
            <h1>Eaply</h1>
            <ul>
                <li><p>Dashboard</p></li>
                <li><p>Profile</p></li>
                <li><p>Settings</p></li>
                <p onClick={handleLogout}>Logout</p>
            </ul>
        </nav>
    );
};

export default Navbar;