import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionError, setPrescriptionError] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setErrorMessage(''); // Clear any previous error message
        const response = await axios.get(`http://localhost:8091/api/v2/appointments/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          setErrorMessage(error.response.data.message || 'An error occurred while fetching booked appointments.');
        } else {
          setErrorMessage('An error occurred while fetching booked appointments.');
        }
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleViewPrescription = async (appointmentId) => {
    try {
      setPrescriptionError('');
      const response = await fetch(`http://localhost:8091/api/v2/prescriptions/appointments/${appointmentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch prescriptions');
      }
      const data = await response.json();
      setPrescriptions(data);
      setSelectedAppointment(appointmentId);
      setIsPrescriptionModalOpen(true); // Show the prescription modal
    } catch (error) {
      setPrescriptionError(error.message);
    }
  };

  const handleClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Booked Appointments</h2>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <div className="row">
        {appointments.map((appointment) => (
          <div className="col-md-6 mb-4" key={appointment.appId}>
            <div className="card">
              <div className="card-header" style={{ backgroundColor: '#276f7d' }}>
                <h5 className="card-title" style={{ color: 'white' }}>Appointment Details</h5>
              </div>
              <div className="card-body" style={{ backgroundColor: '#dff2e9' }}>
                <p className="card-text"><strong>Doctor ID:</strong> {appointment.doctorId}</p>
                <p className="card-text"><strong>Status:</strong> {appointment.appStatus}</p>
                <p className="card-text"><strong>Date:</strong> {appointment.appDate}</p>
                <p className="card-text"><strong>Time:</strong> {appointment.appTime}</p>
                <p className="card-text"><strong>Booked Date:</strong> {appointment.bookDate}</p>
                <p className="card-text"><strong>Symptoms:</strong> {appointment.symptoms}</p>
                <p className="card-text"><strong>Weight:</strong> {appointment.weight} kg</p>
                <div className="d-flex justify-content-between">
                  <p className="card-text"><strong>Age:</strong> {appointment.age} years</p>
                  <button className="btn btn-primary" onClick={() => handleViewPrescription(appointment.appId)}>
                    View Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {isPrescriptionModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Prescriptions</h3>
                <button type="button" className="btn-close" onClick={handleClosePrescriptionModal}></button>
              </div>
              <div className="modal-body">
                {prescriptionError ? (
                  <div className="alert alert-danger" role="alert">
                    {prescriptionError}
                  </div>
                ) : (
                  <ul>
                    {prescriptions.map((prescription) => (
                      <li key={prescription.prescriptionId}>{prescription.prescription}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={handleClosePrescriptionModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .modal-header {
            background-color: #276f7d;
          }

          .modal-title {
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default BookedAppointments;
