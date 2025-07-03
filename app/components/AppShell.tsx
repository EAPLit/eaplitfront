"use client"

import { useAuth } from "@/app/context/AuthContext";
import Navbar from "./Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const  { user } = useAuth();

    return (
        <div className="main-container">
            {user && (
                <>
                    <div className="left-nav"><Navbar /></div>
                    <div className="vertical-divider"></div>
                </>
            )}
            <div className="central-content">{children}</div>
        </div>
    );
}