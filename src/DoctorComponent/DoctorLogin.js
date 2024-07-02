import React, { useState } from 'react';
import doctorlogin from '../HomeComponent/images/doctors.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DoctorLogin({ setLoginState }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginValidation = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8091/api/v2/doctorValidation', {
                email: email,
                password: password
            });

            if (response.data && response.data.status === 'Active') {
                const doctor = response.data;
                setLoginState("Doctor");
                sessionStorage.setItem("doctor", JSON.stringify(doctor));
                sessionStorage.setItem("doctorId", doctor.doctorId); // Store doctorId in session storage
                console.log("Stored doctorId:", doctor.doctorId); // Debug log
                navigate('/doctor/doctorhome');
            } else {
                alert('Invalid email or password, or Account is inactive.');
            }
        } catch (error) {
            console.error("There was an error logging in:", error);
            alert('An error occurred. Please try again.');
        }
    };

    const login = (e) => {
        e.preventDefault();
        loginValidation(email, password);
    };

    return (
        <div>
            <form name='f1' method='post' onSubmit={login}>
                <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
                    <div className="hidden bg-gray-100 lg:block">
                        <img
                            src={doctorlogin}
                            alt="Medical Setting"
                            className="h-full w-full object-cover"
                            width="1200"
                            height="800"
                            style={{ aspectRatio: "1200 / 800", objectFit: "cover" }}
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 lg:p-10">
                        <div className="mx-auto w-full max-w-md space-y-6">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold">Doctor Login</h1>
                                <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input type='email' onChange={(e) => setEmail(e.target.value)} className='form-control' required />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <Link className="text-sm font-medium underline" to="#">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <input type='password' onChange={(e) => setPassword(e.target.value)} className='form-control' required />
                                </div>
                                <button type='submit' className='btn btn-primary form-control' style={{ width: "200px" }}>Login</button>
                                <Link className="nav-link" to="/doctor/newregistration">New Registration? Click Here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
