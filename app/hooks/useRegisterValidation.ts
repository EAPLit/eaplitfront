import { useState, useEffect} from "react";

interface ValidationErrors {
    name?: string;
    username?: string;
    email?: string;
    confirmEmail?: string;
    password?: string;
    confirmPassword?: string;
}

const useRegisterValidation = (
    name: string,
    username: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string
) => {
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            const newErrors: ValidationErrors = {};

            // Name validation
            if (!name) newErrors.name = "Name is required";

            // Username validation
            if (!username) newErrors.username = "Username is required";

            // Email validation
            if (!email) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                newErrors.email = "Email is invalid.";
            }

            // confirm email validation
            if (email !== confirmEmail) {
                newErrors.confirmEmail = "Confirmation email must match email."
            }

            // Password valudation
            if (!password) {
                newErrors.password = "Password is required";
            } else if (password.length < 6) {
                newErrors.password = "Password must be at least 6 characters long.";
            }

            // Confirm password validation
            if (password !== confirmPassword) {
                newErrors.confirmPassword = "Password do not match.";
            }

            setFormErrors(newErrors);
            setIsValid(Object.keys(newErrors).length === 0); // Is true if no errors, i.e., length is 0.
        };
        validateForm();
    }, [name, username, email, confirmEmail, password, confirmPassword]);

    return { formErrors, isValid };
};

export default useRegisterValidation;