import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddSchedule() {
  const [doctor, setDoctor] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [showRow, setShowRow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch doctorId from session object and set it in state
    const doctorData = JSON.parse(sessionStorage.getItem('doctor'));
    setDoctor(doctorData);
  }, []);

  const toggleRow = () => {
    setShowRow(!showRow);
  };

  const handleChange = (index, name, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][name] = value;
    setSchedules(updatedSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: "", startTime: "", endTime: "", status: "" }]);
  };

  const handleDelete = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const submitSchedule = async () => {
    try {
      const formattedSchedules = schedules.map(schedule => ({
        doctorId: doctor.doctorId,
        day: schedule.day,
        timings: `${schedule.startTime} - ${schedule.endTime}`,
        status: schedule.status === 'Active'
      }));

      const response = await axios.post('http://localhost:8091/api/v2/AddSchedule', formattedSchedules, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      alert('Schedules added successfully!');
    } catch (error) {
      console.error("Schedule submission error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        setErrorMessage(`Schedule submission failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error("Error request data:", error.request);
        setErrorMessage("Schedule submission failed: No response from server.");
      } else {
        console.error("Error message:", error.message);
        setErrorMessage(`Schedule submission failed: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitSchedule();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Schedule Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="doctorId" className="form-label">Doctor ID:</label>
          <input type="text" className="form-control" id="doctorId" value={doctor.doctorId} readOnly />
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="text-center" style={{ backgroundColor: "black", color: "white" }}>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>
                  <button type="button" className="btn btn-primary" onClick={() => { toggleRow(); addSchedule(); }}>+</button>
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>
                    <select className="form-select" name="day" value={schedule.day} onChange={(e) => handleChange(index, "day", e.target.value)}>
                      <option>Select Day</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      value={schedule.startTime}
                      onChange={(e) => handleChange(index, "startTime", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      value={schedule.endTime}
                      onChange={(e) => handleChange(index, "endTime", e.target.value)}
                    />
                  </td>
                  <td>
                    <select className="form-select" name="status" value={schedule.status} onChange={(e) => handleChange(index, "status", e.target.value)}>
                      <option>Select Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(index)}>−</button>
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
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
