import React, { useState, useEffect } from 'react';

export default function DoctorProfile() {
    const [doctor, setDoctor] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const doctorData = JSON.parse(sessionStorage.getItem('doctor'));
                if (doctorData) {
                    setDoctor(doctorData);
                } else {
                    setErrorMessage("No doctor data found.");
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
                setErrorMessage("Failed to fetch doctor profile. Please try again.");
            }
        };

        fetchDoctorProfile();
    }, []);

    const handleEditProfile = () => {
        // Logic to handle profile editing
        console.log('Edit profile clicked');
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col text-center'>
                    <h1 className='display-4'>Doctor Profile</h1>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-8 mx-auto'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    {doctor.doctorPic && (
                                        <img
                                            className='img-fluid'
                                            width="350px"
                                            height="650px"
                                            src={`http://localhost:8091/uploads/${doctor.doctorPic}`}
                                            alt='Doctor profile'/>
                                    )}
                                </div>
                                <div className='col-sm-6'>
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                    <div>
                                        <label><strong>Name:</strong> {doctor.doctorName}</label>
                                    </div>
                                    <div>
                                        <label><strong>Gender:</strong> {doctor.gender}</label>
                                    </div>
                                    <div>
                                        <label><strong>Specialization:</strong> {doctor.specialization}</label>
                                    </div>
                                    <div>
                                        <label><strong>Email:</strong> {doctor.email}</label>
                                    </div>
                                    <div>
                                        <label><strong>Mobile:</strong> {doctor.mobile}</label>
                                    </div>
                                    <div>
                                        <label><strong>Certificates:</strong></label>
                                        <p>{doctor.certificateFile}</p>
                                    </div>
                                    <div>
                                        <label><strong>Experience:</strong> {doctor.experience}</label>
                                    </div>
                                    <div>
                                        <label><strong>Status:</strong> {doctor.status}</label>
                                    </div>
                                    <div>
                                        <label><strong>Consultation Fee:</strong> {doctor.consultantFee}</label>
                                    </div>
                                    <div>
                                        <label><strong>Password:</strong> {doctor.password}</label>
                                    </div>
                                    <div>
                                        <label><strong>Doctor Account Number:</strong> {doctor.doctorAccount}</label>
                                    </div>
                                    <button 
                                        className='btn btn-primary mt-3' 
                                        onClick={handleEditProfile}>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
