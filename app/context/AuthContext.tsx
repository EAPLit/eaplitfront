"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, onIdTokenChanged, getIdToken, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { connectAuthEmulator } from "firebase/auth";
//firebase emulators:start --only auth
import { auth } from "../firebase/clientApp";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    token: null,
    login: async () => {},
    register: async () => {},
    handleLogout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await getIdToken(userCredential.user);
        setUser(userCredential.user);
        setToken(token);
    };

    const register = async (username:string, email: string, password: string) => {
        // Do not set any tokens here.
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            });
            setUser(userCredential.user);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error during registration ${errorCode} : ${errorMessage}`);
            throw new Error("Registration failed.");
        }
    }

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                const token = await getIdToken(user);
                setToken(token);
            } else {
                setToken(null);
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, token, login, register, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);