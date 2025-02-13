"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, onIdTokenChanged, getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    token: null,
    login: async () => {},
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
        <AuthContext.Provider value={{ user, loading, token, login, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);