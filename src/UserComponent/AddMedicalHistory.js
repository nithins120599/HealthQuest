import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddMedicalHistory() {
    const [formData, setFormData] = useState({
        allergy: '',
        medicalHistory: '',
        userId: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve userId from session storage when component mounts
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            setFormData((prevData) => ({
                ...prevData,
                userId: userId,
            }));
        } else {
            console.error('User ID not found in session storage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8091/api/v2/addMedicalHistory', formData);

            // Updated to handle different successful status codes
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('Medical history added successfully!');
                setFormData({
                    allergy: '',
                    medicalHistory: '',
                    userId: formData.userId,
                });
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                // Throw an error if the status is not as expected
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code outside of the range of 2xx
                setErrorMessage(`Error adding medical history: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('Error adding medical history: No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage(`Error adding medical history: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            {successMessage && (
                <div className="alert alert-success" role="alert" aria-live="polite">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert" aria-live="polite">
                    {errorMessage}
                </div>
            )}
            <h2 className="card-title text-center mb-4"><b>Medical History Form</b></h2>
            <div className="card mx-auto" style={{ maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label"><b>User Id</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="allergy" className="form-label"><b>Allergy</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="allergy"
                                name="allergy"
                                value={formData.allergy}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="medicalHistory" className="form-label"><b>Medical History</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="medicalHistory"
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Submitting...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
