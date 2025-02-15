import React from "react";

interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    touched: boolean;
    error: string | undefined;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    touched,
    error
}) => {
    return (
        <>
            <div className="input-area">
                <label className="input-label" htmlFor={id}>{label}</label>
                <input 
                    className="input-item"
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            <div className="error-area">
                {touched && error && <p className="error-text">{error}</p>}
            </div>
        </>
    );
};

export default FormField;