"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';
import { useError } from '../context/ErrorContext';
import { useErrorHandler } from '../hooks/useErrorHandler';
import '../styles/navbar.scss';

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

    const handleClickDashboard = () => {
        clearError();
        try {
            router.push('/mylearning');
        } catch (error) {
            handleError(error, "There was an error navigating to the dashboard.");
        }
    }

    return (
        <nav className="navbar">
            <h1 className="webname">EAPLY</h1>
            <ul className="links-panel">
                <li><p className="a-link" onClick={handleClickDashboard}>Dashboard</p></li>
                <li><p className="a-link">Profile</p></li>
                <li><p className="a-link">Settings</p></li>
                <li><p className="a-link logout" onClick={handleLogout}>Logout</p></li>
            </ul>
        </nav>
    );
};

export default Navbar;