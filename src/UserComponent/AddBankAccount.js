import React, { useState } from 'react';
import axios from 'axios';

export default function AddBankAccount() {
    const [formData, setFormData] = useState({
        userId: sessionStorage.getItem('userId') || '', // Ensure userId is fetched correctly
        accountNumber: '',
        balanceAmount: '',
        cardNumber: '',
        cardType: '',
        name: '',
        cvv: '',
        expiryDate: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:8091/api/v2/addBankAccounts', formData);

            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('Bank account added successfully!');
                setFormData({
                    userId: sessionStorage.getItem('userId') || '',
                    accountNumber: '',
                    balanceAmount: '',
                    cardNumber: '',
                    cardType: '',
                    name: '',
                    cvv: '',
                    expiryDate: '',
                });
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                console.error('Error adding bank account:', response.statusText);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(`Error adding bank account: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                setErrorMessage('Error adding bank account: No response received from server');
            } else {
                setErrorMessage(`Error adding bank account: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mt-5">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <h2 className="card-title text-center mb-4"><b>Bank Account Form</b></h2>
            <div className="card mx-auto" style={{ maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="userId" value={formData.userId} /> {/* Add userId as hidden input */}
                        <div className="mb-3">
                            <label htmlFor="accountNumber" className="form-label"><b>Account Number</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="accountNumber"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="balanceAmount" className="form-label"><b>Balance Amount</b></label>
                            <input
                                type="number"
                                className="form-control"
                                id="balanceAmount"
                                name="balanceAmount"
                                value={formData.balanceAmount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label"><b>Card Number</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardType" className="form-label"><b>Card Type</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardType"
                                name="cardType"
                                value={formData.cardType}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><b>Name</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvv" className="form-label"><b>CVV Number</b></label>
                            <input
                                type="number"
                                className="form-control"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expiryDate" className="form-label"><b>Expiry Date</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                placeholder="MM/YY"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Add Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
