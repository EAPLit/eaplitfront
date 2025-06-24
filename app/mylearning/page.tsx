"use client"

import MyLearningHead from './components/MyLearningHead';
import ProjectsList from './components/ProjectsList';
import AdminGuide from './components/AdminGuide';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import '../styles/mylearning.scss'

const MyLearning = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [ viewProjectDesign, setViewProjectDesign ] = useState(false);

    // Protect this page by ensuring the user is logged in; if not, redirect to the login page.
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const handleViewProjectDesign = () => {
        setViewProjectDesign(true);
    }

    return (
        <div className="mylearning-page">
            <MyLearningHead handleViewProjectDesign={handleViewProjectDesign} />
            {viewProjectDesign && <div>This is where the project will be designed!</div>}
            <ProjectsList />
            <AdminGuide />
        </div>
    );
};

export default MyLearning;