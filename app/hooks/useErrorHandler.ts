import { FirebaseError } from "firebase/app";
import { useError } from "../context/ErrorContext";

type ToastType = "error" | "warn" | "info";

export const useErrorHandler = () => {
    const { showError, showToast } = useError();

    return (error: unknown, defaultMessage = "An error occurred.", defaultType: ToastType = "error") => {
        const stackTrace = new Error().stack; // capture the current stack trace

        console.error("🔴 useErrorHandler received:", error);
        console.error(`Stack Trace:\n${stackTrace}`);

        if (error instanceof FirebaseError) {
            console.error(`Firebase Error [${error.code}]: ${error.message}\nStack Trace:\n${stackTrace}`);
            showError(defaultMessage);
            showToast(defaultMessage, defaultType);
        } else {
            console.error(`Unexpected error:, ${error}\nStack Trace:\n${stackTrace}`);
            // Check if someone accidentally JSON.parses this later
            console.error("⚠️ Non-Firebase error, type:", typeof error);
            if (typeof error === "string" && error === "undefined") {
                console.error("💥 error is the string 'undefined' — likely the cause of the JSON error");
            }
            showError(defaultMessage);
            showToast(defaultMessage, defaultType);
        }
    };
};