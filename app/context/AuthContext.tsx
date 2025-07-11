"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, onIdTokenChanged, getIdToken, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail, confirmPasswordReset, deleteUser, signOut } from "firebase/auth";
//firebase emulators:start --only auth
import { auth } from "../firebase/clientApp";


interface AuthContextProps {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<User>;
    register: (username: string, email: string, password: string) => Promise<void>
    verifyEmail: () => Promise<void>;
    sendPasswordChangeRequestEmail: (email: string) => Promise<void>;
    resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
    deleteUserFromFirebase: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    token: null,
    login: async () => {
        throw new Error("Login function not implemented");
    },
    register: async () => {},
    verifyEmail: async () => {},
    sendPasswordChangeRequestEmail: async () => {},
    resetPassword: async () => {},
    deleteUserFromFirebase: async () => {},
    logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<User> => {
        console.log("I am now logging in.")
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await getIdToken(userCredential.user);
            setUser(userCredential.user);
            setToken(token);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const register = async (username:string, email: string, password: string) => {
        // Do not set any tokens here.
        console.log("I am now registering");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            });
            setUser(userCredential.user);
            console.log("Everything is set for the user:", userCredential.user);
        } catch (error: unknown) {
            throw error;
        }
    }

    const verifyEmail = async () => {
        if (auth.currentUser) {
            try {
                const actionCodeSettings = {
                    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth`,
                    handleCodeInApp: true,
                }
                await sendEmailVerification(auth.currentUser, actionCodeSettings);
                console.log("I have just sent an email regarding: ", actionCodeSettings);
            } catch (error: unknown) {
                throw error;
            }
        } else {
            console.log("It seems the email verification was not sent. I wonder why!");
        }
    }

    const sendPasswordChangeRequestEmail = async (email: string) => {
        try {
            const actionCodeSettings = {
                url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth`,
                handleCodeInApp: true
            }
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
        } catch (error: unknown) {
            throw error;
        }
    }

    const resetPassword = async (oobCode: string, newPassword: string) => {
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
        } catch (error: unknown) {
            throw error;
        }
        
    }

    const deleteUserFromFirebase = async () => {
        if (auth.currentUser) {
            try {
                await deleteUser(auth.currentUser); // delete's the firebase user
                await signOut(auth); // ensure the user is logged out
            } catch (deleteError: unknown) {
                throw deleteError;
            }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setToken(null);
        } catch (error) {
            throw error;
        }
        
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
        <AuthContext.Provider value={{ user, loading, token, login, register, verifyEmail, sendPasswordChangeRequestEmail, resetPassword, deleteUserFromFirebase, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);