"use client";

import React from "react";
import { useError } from "../context/ErrorContext";
import "./errormessage.scss";

const ErrorMessage: React.FC = () => {
    const  { error } = useError();

    if (!error) return null;

    return (
        <div className="error-message">
            <p>{error}</p>
        </div>
    );
};

export default ErrorMessage;