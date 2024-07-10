import React from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

interface InputTextProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    required: boolean;
    type?: string;
    showPasswordToggle?: boolean;
    onTogglePasswordVisibility?: () => void;
    showPassword?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
                                                 placeholder,
                                                 label,
                                                 value,
                                                 onChange,
                                                 id,
                                                 required,
                                                 type = 'text',
                                                 showPasswordToggle = false,
                                                 onTogglePasswordVisibility,
                                                 showPassword = false
                                             }) => (
    <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        <div className="password-wrapper">
            <input
                type={type === 'password' && showPassword ? 'text' : type}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
            {type === 'password' && showPasswordToggle && (
                <span className="icon" onClick={onTogglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </span>
            )}
        </div>
    </div>
);

export default InputText;