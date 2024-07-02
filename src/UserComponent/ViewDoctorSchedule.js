import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewDoctorSchedule() {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (doctorId) {
            fetchSchedulesByDoctorId(doctorId);
        }
    }, [doctorId]);

    const fetchSchedulesByDoctorId = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v2/getSchedulesByDoctorId/${doctorId}`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setErrorMessage('Failed to fetch schedules. Please try again.');
        }
    };

    const handleBookNow = (scheduleId) => {
        navigate('/user/payment', { state: { doctorId, scheduleId } });
    };

    return (
        <div className="container mt-4">
            <div>
                <h5>Doctor ID: {doctorId}</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="purple-bg text-center">
                        <tr>
                            <th>Sl. No.</th>
                            <th>Day</th>
                            <th>Timings</th>
                            <th>Status</th>
                            <th>Book Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={schedule.scheduleId}>
                                <td>{index + 1}</td>
                                <td>{schedule.day}</td>
                                <td>{schedule.timings}</td>
                                <td>{schedule.status}</td>
                                <td className="text-center">
                                    <button className="btn btn-success" onClick={() => handleBookNow(schedule.scheduleId)}>Book</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {errorMessage && (
                <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
