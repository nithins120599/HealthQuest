import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserHome() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v2/allDoctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4"> Doctors</h2>
            <div className="row">
                {doctors.map((doctor, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h1 className="card-title text-center">Dr.{doctor.doctorName.toUpperCase()}</h1>
                                <p className="card-text"><strong>Gender:</strong> {doctor.gender}</p>
                                <p className="card-text"><strong>Mobile:</strong> {doctor.mobile}</p>
                                <p className="card-text"><strong>Email:</strong> {doctor.email}</p>
                                <p className="card-text"><strong>Specialization:</strong> {doctor.specialization}</p>
                                <p className="card-text"><strong>Experience:</strong> {doctor.experience} years</p>
                                <p className="card-text"><strong>Certificate:</strong> {doctor.certificateId}</p>
                                <p className="card-text"><strong>Hospital Name:</strong> {doctor.hospitalName}</p>
                                <p className="card-text"><strong>Location:</strong> {doctor.location}</p>
                                <p className="card-text"><strong>Status:</strong> {doctor.status}</p>
                                <p className="card-text"><strong>Consultation Fee:</strong> ${doctor.consultantFee}</p>
                                <p className="card-text"><strong>Doctor Account:</strong> {doctor.doctorAccount}</p>
                                <br></br>

                                <Link to={`/user/ViewDoctorSchedule/${doctor.doctorId}`} className="btn btn-success schedule-button">
                                    View Schedule
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                .card {
                    border: 1px solid #dddddd;
                    border-radius: 15px;
                    box-shadow: 0 10px 10px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                    position: relative;
                }
                
                .card:hover {
                    transform: scale(1.05);
                }
                
                .card-body {
                    padding: 20px;
                }
                
                .card-title {
                    font-size: 1.25rem;
                    margin-bottom: 50px;
                }
                
                .card-text {
                    margin-bottom: 10px;
                }

                .schedule-button {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                }

                .active-status {
                    background-color: #c4f562;
                  }
                  
                  .inactive-status {
                    background-color: #f589af;
                  }

                `}
            </style>
        </div>
    );
}
