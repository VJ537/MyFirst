export const formatAadharNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, ''); // Remove all non-digit characters
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
        return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
};

export const isValidAadharNumber = (aadharNumber: string): boolean => {
    return /^\d{4}-\d{4}-\d{4}$/.test(aadharNumber);
};