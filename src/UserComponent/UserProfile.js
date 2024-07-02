import React, { useState, useEffect } from 'react';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = JSON.parse(sessionStorage.getItem('users'));
                if (userData) {
                    setUser(userData);
                    setErrorMessage(""); // Clear any existing error message
                } else {
                    setErrorMessage("No doctor data found.");
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
                setErrorMessage("Failed to fetch doctor profile. Please try again.");
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditProfile = () => {
        // Logic to handle profile editing
        console.log('Edit profile clicked');
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col text-center'>
                    <h1 className='display-4'>User Profile</h1>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-8 mx-auto'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    {user?.profilePic && (
                                        <img
                                            className='img-fluid'
                                            src={`http://localhost:8091/uploads/${user.profilePic}`} // Adjust the API endpoint accordingly
                                            alt='User profile'/>
                                    )}
                                </div>
                                <div className='col-sm-6'>
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                    {user && (
                                        <>
                                            <div>
                                                <label><strong>Name:</strong> {user.name}</label>
                                            </div>
                                            <div>
                                                <label><strong>Email:</strong> {user.email}</label>
                                            </div>
                                            <div>
                                                <label><strong>Gender:</strong> {user.gender}</label>
                                            </div>
                                            <div>
                                                <label><strong>Mobile:</strong> {user.mobile}</label>
                                            </div>
                                            <div>
                                                <label><strong>Password:</strong> {user.password}</label>
                                            </div>
                                            <div>
                                                <label><strong>Address:</strong> {user.address}</label>
                                            </div>
                                            <button 
                                                className='btn btn-primary mt-3' 
                                                onClick={handleEditProfile}>
                                                Edit Profile
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
