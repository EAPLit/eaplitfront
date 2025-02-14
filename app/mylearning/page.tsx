import MyLearningHead from '../components/MyLearningHead';
import ProjectsList from '../components/ProjectsList';
import AdminGuide from '../components/AdminGuide';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const MyLearning = () => {
    const { user, loading, token } = useAuth();
    const router = useRouter();

    // Protect this page by ensuring the user is logged in; if not, redirect to the login page.
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    return (
        <div>
            <MyLearningHead />
            <ProjectsList />
            <AdminGuide />
        </div>
    );
};

export default MyLearning;