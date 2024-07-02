import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewDoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setErrorMessage('');
      const doctorId = sessionStorage.getItem('doctorId');
      console.log("Retrieved doctorId:", doctorId);

      if (!doctorId) {
        setErrorMessage('Doctor ID is not available.');
        return;
      }

      const url = `http://localhost:8091/api/v2/appointments/doctor/${doctorId}`;
      const response = await axios.get(url);
      const appointmentsWithUserDetails = await Promise.all(
        response.data.map(async (appointment) => {
          const userResponse = await axios.get(`http://localhost:8091/api/v2/getUser/${appointment.userId}`);
          return { ...appointment, user: userResponse.data };
        })
      );
      setAppointments(appointmentsWithUserDetails);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while fetching appointments.");
    }
  };

  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const deleteAppointment = async (appId) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/v2/deleteAppointment/${appId}`);
      if (response.status === 200) {
        setSuccessMessage('Appointment deleted successfully');
        setAppointments(appointments.filter(appointment => appointment.appId !== appId));
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setErrorMessage('Failed to delete appointment. Please try again.');
    }
  };
  const addPrescription = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.appId === appointmentId
          ? { ...appointment, prescriptionAdded: true }
          : appointment
      )
    );
  };
  const filteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayDate = new Date(today);

    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appDate);
      const appointmentStatus = appointment.appStatus.toLowerCase();

      // Check if appointment date is in the future
      if (appointmentDate > todayDate) {
        if (appointmentStatus !== 'completed' && appointmentStatus !== 'onprogress') {
          appointment.appStatus = 'pending';
        }
      } else if (appointmentDate.toDateString() === todayDate.toDateString()) {
        if (appointmentStatus === 'scheduled') {
          appointment.appStatus = 'active';
        }
      } else {
        if (appointmentStatus === 'scheduled' || appointmentStatus === 'pending') {
          appointment.appStatus = 'completed';
        }
      }

      console.log(`Appointment ID: ${appointment.appId}, Date: ${appointment.appDate}, Status: ${appointment.appStatus}`);

      // Filter appointments based on the activeTab state
      switch (activeTab) {
        case 'active':
          return appointment.appStatus === 'active';
        case 'future':
          return appointment.appStatus === 'pending';
        case 'history':
          return appointment.appStatus === 'completed' || appointment.appStatus === 'onprogress';
        default:
          return false;
      }
    });
  };


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointments</h2>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
      <div className="row mb-3">
        <div className="col-md-12 text-center">
          <div className="btn-group" role="group">
            <button type="button" className={`btn btn-outline-success ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
              Active Appointments
            </button>
            <button type="button" className={`btn btn-outline-warning ${activeTab === 'future' ? 'active' : ''}`} onClick={() => setActiveTab('future')}>
              Future Appointments
            </button>
            <button type="button" className={`btn btn-outline-danger ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              History
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredAppointments().map(appointment => (
          <div className="col-md-4 mb-4" key={appointment.appId}>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title">Appointment ID: {appointment.appId}</h5>
                {activeTab === 'active' && (
                  <Link
                    to={`/AddPrescription/${appointment.appId}`}
                    className="btn btn-warning"
                    onClick={() => addPrescription(appointment.appId)} // Call addPrescription when clicking the link
                  >
                    {appointment.prescriptionAdded ? 'Prescription Added' : 'Add Prescription'}
                  </Link>
                )}

              </div>
              <div className="card-body">
                <p className="card-text"><strong>User ID:</strong> {appointment.userId}</p>
                <p className="card-text"><strong>Date:</strong> {appointment.appDate}</p>
                <p className="card-text"><strong>Time:</strong> {appointment.appTime}</p>
                <p className="card-text"><strong>Status:</strong> {appointment.appStatus}</p>
                <div className="d-flex justify-content-between">
                  {activeTab !== 'active' && activeTab !== 'future' && (
                    <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.appId)}>Delete</button>
                  )}
                  {activeTab === 'active' && appointment.user?.mobile && (
                    <button className="btn btn-info" onClick={() => handlePhoneCall(appointment.user.mobile)}>Call</button>
                  )}
                  {activeTab !== 'future' && activeTab !== 'history' && (
                    <Link to={`/UserComponent/ViewMedicalHistory/${appointment.userId}`} className="btn btn-success">
                      View Medical History
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
