import { useState, useEffect} from "react";

interface ValidationErrors {
    name?: string;
    username?: string;
    email?: string;
    confirmEmail?: string;
    password?: string;
    confirmPassword?: string;
}

type ValidationType = "login" | "register";

const useFormValidation = (
    formValues: Record<string, string>,
    formType: ValidationType
) => {
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const validateForm = () => {
            const newErrors: ValidationErrors = {};

            switch (formType) {
                case "register":
                // Name validation
                    if (!formValues.name) newErrors.name = "Name is required";

                    // Username validation
                    if (!formValues.username) newErrors.username = "Username is required";

                    // Email validation
                    if (!formValues.email) {
                        newErrors.email = "Email is required";
                    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
                        newErrors.email = "Email is invalid.";
                    }

                    // confirm email validation
                    if (formValues.email !== formValues.confirmEmail) {
                        newErrors.confirmEmail = "Confirmation email must match email."
                    }

                    // Password validation
                    if (!formValues.password) {
                        newErrors.password = "Password is required";
                    } else if (formValues.password.length < 6) {
                        newErrors.password = "Password must be at least 6 characters long.";
                    }

                    // Confirm password validation
                    if (formValues.password !== formValues.confirmPassword) {
                        newErrors.confirmPassword = "Password do not match.";
                    }
                    break;
                case "login":
                    // Email validation
                    if (!formValues.email) {
                        newErrors.email = "Email is required";
                    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
                        newErrors.email = "Email is invalid.";
                    }

                    // Password validation
                    if (!formValues.password) {
                        newErrors.password = "Password is required";
                    } else if (formValues.password.length < 6) {
                        newErrors.password = "Password must be at least 6 characters long.";
                    }
                    break;
            }

            // Only update state if errors actually change to avoid unnecessary re-renders.
            setFormErrors((prevErrors) => {
                if (JSON.stringify(prevErrors) !== JSON.stringify(newErrors)) {
                    return newErrors;
                }
                return prevErrors;
            });
            setIsValid(Object.keys(newErrors).length === 0); // Is true if no errors, i.e., length is 0.
        };
        validateForm();
    }, [formValues, formType]);

    return { formErrors, isValid };
};

export default useFormValidation;