import { FirebaseError } from "firebase/app";
import { useError } from "../context/ErrorContext";

type ToastType = "error" | "warn" | "info";

export const useErrorHandler = () => {
    const { showError, showToast } = useError();

    return (error: unknown, defaultMessage = "An error occurred.", defaultType: ToastType = "error") => {
        const stackTrace = new Error().stack; // capture the current stack trace

        if (error instanceof FirebaseError) {
            console.error(`Firebase Error [${error.code}]: ${error.message}\nStack Trace:\n${stackTrace}`);
            showError(defaultMessage);
            showToast(defaultMessage, defaultType);
        } else {
            console.error(`Unexpected error:, ${error}\nStack Trace:\n${stackTrace}`);
            showError(defaultMessage);
            showToast(defaultMessage, defaultType);
        }
    };
};