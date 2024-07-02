import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditSchedule({ editScheduleId, onCancel, onUpdate }) {
    const [schedule, setSchedule] = useState({
        scheduleId: 0,
        doctorId: '',
        day: '',
        timings: '',
        status: ''
    });

    const statusOptions = ['Active', 'Inactive'];
    const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        // Fetch doctorId from session object and set it in the state
        const doctorData = JSON.parse(sessionStorage.getItem('doctor')); // Make sure the key is correct
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            doctorId: doctorData?.doctorId || ''
        }));

        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`http://localhost:8091/api/v2/getSchedule/${editScheduleId}`);
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchSchedule();
    }, [editScheduleId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8091/api/v2/updateSchedule/${editScheduleId}`, schedule);
            onUpdate();
            console.log('Schedule updated successfully:', response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server Error:', error.response.data);
                console.error('Status Code:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Request Error:', error.message);
            }
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h3 className="text-primary">Edit your Schedule</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <input type="hidden" name="scheduleId" value={schedule.scheduleId} className="form-control" readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <input type="hidden" name="doctorId" value={schedule.doctorId} className="form-control" readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <label><b>Day</b></label>
                        <select name="day" value={schedule.day} onChange={handleChange} className="form-control">
                            {dayOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <label><b>Timings</b></label>
                        <input type="text" name="timings" value={schedule.timings} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <label><b>Status</b></label>
                        <select name="status" value={schedule.status} onChange={handleChange} className="form-control">
                            {statusOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className="row mt-1">
                    <div className="col-sm-6 text-center">
                        <button type="submit" className="btn btn-success" style={{ width: '150px' }}>Update Schedule</button>
                    </div>
                    <div className="col-sm-6 text-center">
                        <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ width: '150px' }}>Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
