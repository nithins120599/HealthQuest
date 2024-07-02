import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserLogin(Props) {
    let [mobile, setMobile] = useState("");
    let [password, setPassword] = useState("");
    let { loginState, setLoginState } = Props;
    const navigate = useNavigate();

    const loginValidation = async (mobile, password) => {
        try {
            const response = await axios.post('http://localhost:8091/api/v2/userValidation', {
                mobile: mobile,
                password: password
            });

            console.log(response.data);

            if (response.data) {
                const user = response.data;
                setLoginState("User");
                sessionStorage.setItem("users", JSON.stringify(user));
                sessionStorage.setItem("userId", user.userId); // Store userId separately
                console.log("Users from session obj = " + sessionStorage.getItem("users"));
                navigate('/user/userhome');
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
                <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                                Sign in to your account
                            </h2>
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mobile
                            </label>
                            <div className="mt-1">
                                <input type='text' id="mobile" onChange={(e) => setMobile(e.target.value)} className='form-control' required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input type='password' id="password" onChange={(e) => setPassword(e.target.value)} className='form-control' required />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800 dark:focus:ring-indigo-400"
                                    type="checkbox"
                                    name="remember-me"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    to="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-800"
                            >
                                Sign in
                            </button>
                            <Link className="nav-link" to="/user/userregistration">New Registration? Click Here</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
