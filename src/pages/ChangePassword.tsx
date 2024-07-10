import React, {useState} from 'react';
import '../styles/Layout.scss';
import isValidPassword from "../validators/PasswordValidation";
import InputText from "../Components/InputText";

interface ChangePasswordModalProps {
    onClose: () => void;
    onSubmit: (oldPassword: string, newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({onClose}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const storedPassword = localStorage.getItem('password');
        if (oldPassword !== storedPassword) {
            setError('Current password is incorrect.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }
        const validation = isValidPassword(newPassword);
        if (!validation.isValid) {
            setError(`New password does not meet the criteria. Missing: ${validation.missingCriteria.join(', ')}`);
            return;
        }
        localStorage.setItem('password', newPassword);
        setError('');
        onClose();
        alert('Password changed successfully.');
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <InputText
                        type="password"
                        placeholder="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <InputText
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        showPasswordToggle
                        showPassword={showNewPassword}
                        onTogglePasswordVisibility={toggleNewPasswordVisibility}
                    />
                    <InputText
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        showPasswordToggle
                        showPassword={showNewPassword}
                        onTogglePasswordVisibility={toggleNewPasswordVisibility}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Change Password</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;