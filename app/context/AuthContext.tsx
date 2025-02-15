"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, onIdTokenChanged, getIdToken, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, deleteUser, signOut } from "firebase/auth";
//firebase emulators:start --only auth
import { auth } from "../firebase/clientApp";
import { FirebaseError } from "firebase/app";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>
    verifyEmail: () => Promise<void>;
    deleteUserFromFirebase: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    token: null,
    login: async () => {},
    register: async () => {},
    verifyEmail: async () => {},
    deleteUserFromFirebase: async () => {},
    logout: async () => {}
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
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error during registration ${errorCode} : ${errorMessage}`);
                throw new Error("Registration failed.");
            } else {
                console.error("An unknown error occurred during registration");
                throw new Error("Registration failed.");
            }
        }
    }

    const verifyEmail = async () => {
        if (auth.currentUser) {
            try {
                await sendEmailVerification(auth.currentUser);
            } catch (error: unknown) {
                if (error instanceof FirebaseError) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(`Error sending email verification ${errorCode} : ${errorMessage}`);
                    throw new Error("Send email verification link failed.");
                } else {
                    console.error(`Error sending an email verification link during registration`);
                    throw new Error("Send email verification link failed.");
                }
                
            }
        }
    }

    const deleteUserFromFirebase = async () => {
        if (auth.currentUser) {
            try {
                await deleteUser(auth.currentUser); // delete's the firebase user
                await signOut(auth); // ensure the user is logged out
            } catch (deleteError) {
                console.error("Failed to delete the firebase user: ", deleteError);
            }
        }
    }

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            console.log("Auth state changed. User:", user); // 🔍 Debug
            if (user) {
                setUser(user);
                const token = await getIdToken(user);
                setToken(token);
            } else {
                setUser(null);
                setToken(null);
                console.log("No user, token set to null");
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, token, login, register, verifyEmail, deleteUserFromFirebase, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);