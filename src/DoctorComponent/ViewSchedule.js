import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditSchedule from './EditSchedule'; // Assuming you have an EditSchedule component

export default function ViewSchedule() {
    const [doctorId, setDoctorId] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editScheduleId, setEditScheduleId] = useState(null);

    useEffect(() => {
        const doctorData = JSON.parse(sessionStorage.getItem('doctor'));
        const id = doctorData?.doctorId || '';
        setDoctorId(id);

        if (id) {
            fetchSchedulesByDoctorId(id);
        }
    }, []);

    const fetchSchedulesByDoctorId = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v2/getSchedulesByDoctorId/${doctorId}`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setErrorMessage('Failed to fetch schedules. Please try again.');
        }
    };

    const deleteSchedule = async (scheduleId) => {
        try {
            const response = await axios.delete(`http://localhost:8091/api/v2/deleteSchedule/${scheduleId}`);
            if (response.status === 200) {
                setSchedules(schedules.filter(schedule => schedule.scheduleId !== scheduleId));
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setErrorMessage('Failed to delete schedule. Please try again.');
        }
    };

    const handleEditClick = (scheduleId) => {
        setEditScheduleId(scheduleId);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditScheduleId(null);
    };

    const handleUpdate = () => {
        setIsEditing(false);
        setEditScheduleId(null);
        fetchSchedulesByDoctorId(doctorId);
    };

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">View Schedule Page</h3>
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
                            <th>Operations</th>
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
                                    <button className="btn btn-primary" onClick={() => handleEditClick(schedule.scheduleId)}>Edit</button>
                                    <button className="btn btn-danger ms-2" onClick={() => deleteSchedule(schedule.scheduleId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditing && (
                <div className="mt-4">
                    <EditSchedule editScheduleId={editScheduleId} onCancel={handleCancelEdit} onUpdate={handleUpdate} />
                </div>
            )}
            {errorMessage && (
                <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
