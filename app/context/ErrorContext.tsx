import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ErrorContextType {
    error: string | null;
    showError: (message: string, useToast?: boolean) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string, useToast = false) => {
        if (useToast) {
            toast.error(message);
        } else {
            setError(message);
        }
    };

    const clearError = () => {
        setError(null);
    }

    return (
        <ErrorContext.Provider value={{ error, showError, clearError }}>
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