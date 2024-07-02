import React,{useEffect,useState}  from 'react'
import axios from 'axios';

export default function ViewAllUsers() {
    const [data,setData] =useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8091/api/v2/allUsers');
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

  return (
    <div>
       <div className="container">
                <h3 className="text-primary">User Details</h3>
                <div className="table-responsive">
                    <table className="table table-sm table-striped table-bordered">
                    <thead class="table-dark">
                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Mobile</td>
                                <td>Gender</td>
                                <td>Address</td>
                                <td>Profile Picture</td>
                                <td>Password</td>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        {user.profilePic && (
                                            <img 
                                                src={`http://localhost:8091/uploads/${user.profilePic}`} 
                                                alt='Profile' 
                                                width="50" 
                                                height="50" 
                                            />
                                        )}
                                    </td>
                                    <td>{user.password}</td>
                                
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  )
}
