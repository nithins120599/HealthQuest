import React,{useEffect,useState}  from 'react'
import axios from 'axios';

export default function ViewAllDoctors() {
    const [data,setData] =useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8091/api/v2/allDoctors');
                const responseData = response.data;
                console.log(responseData);
                setData(responseData);
            } catch (error) {
                console.log("Error fetching data:", error);
                // Handle error
            }
        };
    
        fetchData();
    }, []);

    const updateStatus = async (doctorId, currentStatus) => {
        let newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle status
        console.log('Updating Status......');
        try {
            const response = await axios.put(`http://localhost:8091/api/v2/updateStatus/${doctorId}/${newStatus}`);
            console.log(response);
            
            if (response.status === 200) {
                setData(data.map((record) => {
                    if (record.doctorId === doctorId) {
                        return { ...record, status: newStatus }; // Update status in the data array
                    }
                    return record;
                }));
            } else {
                return;
            }
        } catch (error) {
            console.log("Error:", error);
            // Handle error
        }
    };
    
    

  return (
    <div>
       <div className="container">
        <h3 className="text-primary">Doctor Details</h3>
        <div class="table-responsive">
            <table className="table table-sm table-striped table-bordered">
                <thead>
                    <tr>
            <td>Doctor Id</td>
            <td>Doctor Name</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Gender</td>
            <td>Certificate ID</td>
            <td>Certificate File</td>
            <td>Doctor Picture</td>
            <td>Hospital Number</td>
            <td>Hospital Name</td>
            <td>Hospital Picture</td>
            <td>Specialization</td>
            <td>Experience</td>
            <td>Location</td>
            <td>Status</td>
            <td>Consulate Fee</td>
            <td>Password</td>
            <td>Doctor Account Number</td>
            <td>Operations</td>
           

                    </tr>
                </thead>
                <tbody>
    {data.map((doctor) => {
        return (
            <tr key={doctor.doctorId}>
                <td>{doctor.doctorId}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.email}</td>
                <td>{doctor.mobile}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.certificateId}</td>
                <td>{doctor.certificateFile}</td>
                <td>
                {doctor.doctorPic && (
                                            <img 
                                                src={`http://localhost:8091/uploads/${doctor.doctorPic}`} 
                                                alt='Profile' 
                                                width="50" 
                                                height="100" 
                                            />
                                        )}
                </td>
                
                <td>{doctor.hospitalNo}</td>
                <td>{doctor.hospitalName}</td>
                <td>{doctor.hospitalPic}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.location}</td>
                <td>{doctor.status}</td>
                <td>{doctor.consultantFee}</td>
                <td>{doctor.password}</td>
                <td>{doctor.doctorAccount}</td>
                <td>
                <button className={`btn ${doctor.status === 'Active' ? 'btn-success' : 'btn-danger'}`} onClick={() => updateStatus(doctor.doctorId, doctor.status)}>
                 {doctor.status === 'Active' ? 'Inactive' : 'Active'}
                </button>

  
                </td>
            </tr>
        );
    })}
</tbody>
            </table>

        </div>
    </div>
    </div>
  )
}
