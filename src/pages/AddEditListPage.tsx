import React, {useState, useEffect, useRef} from 'react';
import '../styles/listPage.scss';
import {formatAadharNumber, isValidAadharNumber} from "../validators/AadharNumber";
import {isValidBankAccountNumber} from "../validators/BankAccounts";
import InputText from "../Components/InputText";

interface Item {
    id: number;
    name: string;
    bankName: string;
    bankAccountNumber: string;
    aadharNumber: string;
    descriptions: string;
}

interface CreateEditPageProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (item: Item) => void;
    item?: Item | null;
}

const AddEditListPage: React.FC<CreateEditPageProps> = ({show, onHide, onSubmit, item}) => {
    const [name, setName] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const modalRef = useRef<HTMLDivElement>(undefined!);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setBankName(item.bankName);
            setBankAccountNumber(item.bankAccountNumber);
            setAadharNumber(item.aadharNumber);
            setDescriptions(item.descriptions);
        } else {
            setName('');
            setBankName('');
            setBankAccountNumber('');
            setAadharNumber('');
            setDescriptions('');
        }
    }, [item]);

    const handleAadharNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatAadharNumber(event.target.value);
        setAadharNumber(formattedValue);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!isValidBankAccountNumber(bankAccountNumber)) {
            alert("Bank account number must be numeric and up to 12 digits long.");
            return;
        }

        if (!isValidAadharNumber(aadharNumber)) {
            alert("Aadhar number must be in the format 0000-0000-0000 and up to 12 digits long.");
            return;
        }

        const newItem: Item = {
            id: item ? item.id : Date.now(),
            name,
            bankName,
            bankAccountNumber,
            aadharNumber,
            descriptions,
        };
        onSubmit(newItem);
        setName('');
        setBankName('');
        setBankAccountNumber('');
        setAadharNumber('');
        setDescriptions('');
        onHide();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onHide();
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <h2>{item ? 'Edit' : 'Add'} List Page</h2>
                <form onSubmit={handleSubmit}>
                    <InputText
                        label="Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputText
                        label="Bank Name"
                        id="bankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                    />
                    <InputText
                        label="Bank Account Number"
                        id="bankAccountNumber"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        required
                    />
                    <InputText
                        label="Aadhar Number"
                        id="aadharNumber"
                        value={aadharNumber}
                        onChange={handleAadharNumberChange}
                        required
                    />
                    <div className="form-group">
                        <label htmlFor="descriptions">Descriptions:</label>
                        <textarea
                            id="descriptions"
                            value={descriptions}
                            onChange={(e) => setDescriptions(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddEditListPage;