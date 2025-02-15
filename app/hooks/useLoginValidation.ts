/**
 * Unused hook, but kept here for reference!
 */

// import { useState, useEffect } from "react";

// interface LoginValidationErrors {
//     email?: string;
//     password?: string;
// }

// const useLoginValidation = (
//     email: string,
//     password: string
// ) => {
//     const [formErrors, setFormErrors] = useState<LoginValidationErrors>({});
//     const [isValid, setIsValid] = useState<boolean>(false);

//     useEffect(() => {
//         const validateForm = () => {
//             const newErrors: LoginValidationErrors = {};

//             // email validation
//             if (!email) {
//                 newErrors.email = "Email is required";
//             } else if (!/\S+@\S+\.\S+/.test(email)) {
//                 newErrors.email = "Email is invalid.";
//             }

//             // password validation
//             if (!password) {
//                 newErrors.password = "Password is required";
//             } else if (password.length < 6) {
//                 newErrors.password = "Password must be at least 6 characters long.";
//             }

//             setFormErrors(newErrors);
//             setIsValid(Object.keys(newErrors).length === 0);
//         };
//         validateForm();
//     }, [email, password]);

//     return { formErrors, isValid };
// };

// export default useLoginValidation;