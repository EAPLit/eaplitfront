"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

type ToastType = "error" | "warn" | "info";

interface ErrorContextType {
    error: string | null;
    showToast: (message: string, type: ToastType) => void;
    showError: (message: string) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const showToast = (message: string, type: ToastType = "error") => {
        const validTypes: ToastType[] = ["error", "warn", "info"];
        if (!validTypes.includes(type as ToastType)) {
            console.warn(`Invalid toast type "${type}". Defaulting to "error" type.`);
            type="error";
        }

        switch (type) {
            case "error":
                toast.error(message);
                break;
            case "warn":
                toast.warn(message);
                break;
            case "info":
                toast.info(message);
                break;
            default:
                toast.error(message);
        }
    };

    const showError = (message: string) => {
        setError(message);
    }

    const clearError = () => {
        setError(null);
    }

    return (
        <ErrorContext.Provider value={{ error, showError, showToast, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};