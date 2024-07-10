const isValidPassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    const missingCriteria: string[] = [];
    if (!hasUppercase) {
        missingCriteria.push('an uppercase letter');
    }
    if (!hasLowercase) {
        missingCriteria.push('a lowercase letter');
    }
    if (!hasNumber) {
        missingCriteria.push('a number');
    }
    if (!hasSpecialChar) {
        missingCriteria.push('a special character');
    }

    return {
        isValid: hasUppercase && hasLowercase && hasNumber && hasSpecialChar && password.length >= 8,
        missingCriteria: missingCriteria
    };
};

export default isValidPassword;