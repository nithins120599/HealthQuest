import React, { useState } from 'react'

import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function AdminLogin(Props) {
  let [userName,setUserName] =useState("");
  let [password,setPassword] =useState("");
  let {loginState,setLoginState} =Props;
  const navigate =useNavigate();

  const loginValidation = async (userName,password) =>{

      const response =await axios.post('http://localhost:8091/api/v2/adminValidation',{
          userName:userName,
          password:password
      });

      console.log(response.data);

      if(response.data === true){
          setLoginState("Admin");
          navigate('/admin/adminhome');

      }else{
        alert('Invalid username or password.'); // Display invalid username/password message

      }
    
  };

  const login= (e) =>{
      e.preventDefault();
      loginValidation(userName,password);
  }
  return (
    <div>
        <form name='f1' method='post'>
      <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access the admin dashboard.</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="userName"
              >
                Username
              </label>
              <input type='text' onChange={(e) =>setUserName(e.target.value)} className='form-control' />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input type='text' onChange={(e) =>setPassword(e.target.value)} className='form-control' />
            </div>
          </div>
          <div className="flex items-center p-6">
          <button type='submit' className='btn btn-primary form-control' 
                        onClick={login} style={{width:"200px"}}>Login</button>
          </div>
        </div>
      </div>
    </div>
    </form>
    </div>
  )
}
