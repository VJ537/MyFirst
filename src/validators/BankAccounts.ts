export const isValidBankAccountNumber = (accountNumber: string): boolean => {
    const regex = /^\d{1,12}$/;
    return regex.test(accountNumber);
};