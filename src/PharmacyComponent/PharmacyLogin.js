import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PharmacyLogin(Props) {
    let [mobile, setMobile] = useState("");
    let [password, setPassword] = useState("");
    let { loginState, setLoginState } = Props;
    const navigate = useNavigate();

    const loginValidation = async (mobile, password) => {
        try {
            const response = await axios.post('http://localhost:8091/api/v2/pharmacyValidation', {
                mobile: mobile,
                password: password
            });

            console.log(response.data);

            if (response.data) {
                const pharmacy = response.data;
                setLoginState("Pharmacy");
                sessionStorage.setItem("pharmacy", JSON.stringify(pharmacy));
                sessionStorage.setItem("pharmacyId", pharmacy.pharmacyId); // Store pharmacyId separately
                console.log("Pharmacy from session obj = " + sessionStorage.getItem("pharmacy"));
                navigate('/pharmacy/PharmacyHome');
            } else {
                alert('Invalid mobile or password.');
            }
        } catch (error) {
            console.error("There was an error logging in:", error);
            alert('An error occurred. Please try again.');
        }
    };

    const login = (e) => {
        e.preventDefault();
        loginValidation(mobile, password);
    };

    return (
        <div>
            <form name='f1' method='post' onSubmit={login}>
                <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
                    <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">Pharmacy Login</h1>
                            <p className="text-gray-500 dark:text-gray-400">Enter your mobile number and password to sign in.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="mobile">
                                    Mobile Number
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="mobile"
                                    placeholder="Enter your mobile number"
                                    type="tel"
                                    required
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                type="submit"
                            >
                                Log In
                            </button>
                            <Link className="nav-link" to="/pharmacy/pharmacyregistration">New Registration? Click Here</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
