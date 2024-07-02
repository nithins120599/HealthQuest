import React, { useEffect, useState } from 'react';

export default function DoctorHome() {
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
        // Retrieve doctor information from session storage
        const storedDoctor = sessionStorage.getItem('doctor');
        console.log('Stored Doctor:', storedDoctor); // Log stored doctor object

        if (storedDoctor) {
            try {
                // Parse the stored doctor object
                const doctor = JSON.parse(storedDoctor);
                console.log('Parsed Doctor:', doctor); // Log parsed doctor object

                // Access the doctor's name
                const name = doctor.doctorName; // Corrected to 'doctorName'
                console.log('Doctor Name:', name); // Log doctor's name

                // Update the state with the doctor's name
                setDoctorName(name);
            } catch (error) {
                console.error('Error parsing doctor object:', error);
            }
        } else {
            console.warn('No doctor object found in session storage.');
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to our Online Doctor Website</h1>
                <h2 className="text-gray-600">Doctor.{doctorName}</h2>
                <p className="text-gray-600">
                    Connecting you with experienced medical professionals for convenient and accessible healthcare.
                </p>
                <div className="mt-6">
                    
                </div>
            </div>
        </div>
    );
}
