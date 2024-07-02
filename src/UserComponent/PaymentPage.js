import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PaymentPage() {
    const location = useLocation();
    const { doctorId, scheduleId } = location.state || {};

    const [bankAccount, setBankAccount] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [appointment, setAppointment] = useState({ appDate: '', appTime: '', symptoms: '', age: '', weight: '' });

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        console.log("User ID from session storage:", userId);
        if (!userId) {
            setErrorMessage('User not logged in.');
            return;
        }

        const fetchBankAccount = async () => {
            try {
                console.log(`Fetching bank account details for user ID: ${userId}`);
                const response = await axios.get(`http://localhost:8091/api/v2/accounts/user/${userId}`);
                console.log('Bank account details fetched:', response.data);
                if (response.data.length > 0) {
                    setBankAccount(response.data[0]);
                } else {
                    setErrorMessage('No bank account found for the user.');
                }
            } catch (error) {
                console.error('Error fetching bank account details:', error);
                setErrorMessage('Failed to fetch bank account details. Please try again.');
            }
        };

        const fetchDoctorDetails = async () => {
            try {
                console.log(`Fetching doctor details for doctor ID: ${doctorId}`);
                const response = await axios.get(`http://localhost:8091/api/v2/getDoctorById/${doctorId}`);
                console.log('Doctor details fetched:', response.data);
                setDoctorDetails(response.data);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
                setErrorMessage('Failed to fetch doctor details. Please try again.');
            }
        };

        const fetchScheduleDetails = async () => {
            try {
                console.log(`Fetching schedule details for schedule ID: ${scheduleId}`);
                const response = await axios.get(`http://localhost:8091/api/v2/getSchedule/${scheduleId}`);
                console.log('Schedule details fetched:', response.data);
                setScheduleDetails(response.data);
            } catch (error) {
                console.error('Error fetching schedule details:', error);
                setErrorMessage('Failed to fetch schedule details. Please try again.');
            }
        };

        fetchBankAccount();
        fetchDoctorDetails();
        fetchScheduleDetails();
    }, [doctorId, scheduleId]);

    const handlePayment = async () => {
        try {
            console.log('Starting payment process...');

            if (!doctorDetails || !scheduleDetails || !bankAccount) {
                setErrorMessage('Details not loaded. Please try again.');
                return;
            }

            const doctorFee = doctorDetails.consultantFee;
            const toAccount = doctorDetails.doctorAccount;

            console.log('Doctor fee:', doctorFee);
            console.log('To account:', toAccount);

            const updatedBalance = bankAccount.balanceAmount - doctorFee;
            console.log('Updated balance:', updatedBalance);

            if (updatedBalance >= 0) {
                await axios.put(`http://localhost:8091/api/v2/updateBankAccount/${bankAccount.id}`, {
                    ...bankAccount,
                    balanceAmount: updatedBalance
                });

                console.log('Bank account balance updated.');

                const userId = sessionStorage.getItem('userId');
                const paymentData = {
                    doctorId: doctorId,
                    userId: userId,
                    amount: doctorFee,
                    fromAccount: bankAccount.accountNumber,
                    toAccount: toAccount,
                    paymentDate: new Date().toISOString().split('T')[0]
                };

                console.log('Payment data:', paymentData);

                await axios.post('http://localhost:8091/api/v2/addPayment', paymentData);

                console.log('Payment entry created.');

                const currentDate = new Date().toISOString().split('T')[0];
                const appointmentStatus = appointment.appDate === currentDate ? 'Scheduled' : appointment.appDate > currentDate ? 'Pending' : 'Completed';

                const response = await axios.post('http://localhost:8091/api/v2/addAppointments', {
                    doctorId: doctorId,
                    userId: userId,
                    scheduleId: scheduleId,
                    bookDate: new Date().toISOString().split('T')[0],
                    appDate: appointment.appDate,
                    appTime: appointment.appTime,
                    appStatus: appointmentStatus,
                    symptoms: appointment.symptoms,
                    age: appointment.age,
                    weight: appointment.weight
                });

                if (response.status === 200 || response.status === 201) {
                    console.log('Appointment booked successfully.');
                    setSuccessMessage('Appointment booked successfully.');
                } else {
                    setErrorMessage('Failed to book appointment. Please try again.');
                }
            } else {
                setErrorMessage('Insufficient balance. Please recharge your account.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setErrorMessage('Failed to process payment. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="card-title text-center">Complete Your Payment</h5>
                    {bankAccount && doctorDetails && scheduleDetails ? (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="userId" className="form-label">User ID</label>
                                    <input type="text" className="form-control" id="userId" value={sessionStorage.getItem('userId')} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="accountName" className="form-label">Account Name</label>
                                    <input type="text" className="form-control" id="accountName" value={bankAccount.name} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="accountNumber" className="form-label">Account Number</label>
                                    <input type="text" className="form-control" id="accountNumber" value={bankAccount.accountNumber} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input type="text" className="form-control" id="cardNumber" value={bankAccount.cardNumber} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cardType" className="form-label">Card Type</label>
                                    <input type="text" className="form-control" id="cardType" value={bankAccount.cardType} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input type="text" className="form-control" id="cvv" value={bankAccount.cvv} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                    <input type="text" className="form-control" id="expiryDate" value={bankAccount.expiryDate} readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="doctorFee" className="form-label">Doctor Fee</label>
                                    <input type="text" className="form-control" id="doctorFee" value={`$${doctorDetails.consultantFee}`} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="toAccount" className="form-label">To Account</label>
                                    <input type="text" className="form-control" id="toAccount" value={doctorDetails.doctorAccount} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="appDate" className="form-label">Appointment Date</label>
                                    <input type="date" className="form-control" id="appDate" value={appointment.appDate} onChange={(e) => setAppointment({ ...appointment, appDate: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="appTime" className="form-label">Appointment Time</label>
                                    <input type="time" className="form-control" id="appTime" value={appointment.appTime} onChange={(e) => setAppointment({ ...appointment, appTime: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="symptoms" className="form-label">Symptoms</label>
                                    <input type="text" className="form-control" id="symptoms" value={appointment.symptoms} onChange={(e) => setAppointment({ ...appointment, symptoms: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input type="text" className="form-control" id="age" value={appointment.age} onChange={(e) => setAppointment({ ...appointment, age: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="weight" className="form-label">Weight</label>
                                    <input type="text" className="form-control" id="weight" value={appointment.weight} onChange={(e) => setAppointment({ ...appointment, weight: e.target.value })} />
                                </div>
                                <button className="btn btn-primary" onClick={handlePayment}>Pay Now</button>
                            </div>
                        </div>
                    ) : (
                        <p>Loading bank account, doctor or schedule details...</p>
                    )}
                    {errorMessage && (
                        <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div style={{ marginTop: "20px", color: "green", textAlign: "center" }}>
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
