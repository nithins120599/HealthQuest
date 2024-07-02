import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegistration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const uploadImage = async (filename) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("filename", filename);

            try {
                const response = await axios.post("http://localhost:8091/api/files/upload", formData);

                if (response.status === 200) {
                    console.log(`Image ${filename} uploaded successfully.`);
                } else {
                    throw new Error(`Failed to upload image ${filename}`);
                }
            } catch (error) {
                console.log(`Error uploading image ${filename}:`, error);
            }
        } else {
            console.log("No image selected...");
        }
    };

    const addUser = async () => {
        const profilePicFilename = Date.now() + profilePic;

        try {
            const response = await axios.post('http://localhost:8091/api/v2/AddUsers', {
                userId: Date.now(), // Assuming userId is generated here; adjust as needed
                name: name,
                email: email,
                mobile: mobile,
                gender: gender,
                address: address,
                password: password,
                profilePic: profilePicFilename
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            console.log(response.data);

            if (response.data) {
                await uploadImage(profilePicFilename);

                setName("");
                setEmail("");
                setMobile("");
                setGender("");
                setAddress("");
                setPassword("");
                setProfilePic("");
                setFile(null);
                navigate('/user/login');
                alert('User registered successfully.');
            }
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    const onSubmitClick = (e) => {
        e.preventDefault();
        addUser();
    };

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("profilePicPreview");
        output.src = URL.createObjectURL(input.files[0]);
    };

    return (
        <>
            <section style={{ marginTop: '6rem', marginBottom: '1rem' }}>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title mb-4 mt-3 text-center">User Registration</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
                                        <label className="form-check-label" htmlFor="male">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
                                        <label className="form-check-label" htmlFor="female">
                                            Female
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="other" value="other" checked={gender === "other"} onChange={() => setGender("other")} />
                                        <label className="form-check-label" htmlFor="other">
                                            Other
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="profilePic">Profile Picture</label>
                                    <input type="file" className="form-control" id="profilePic" onChange={(e) => {
                                        setProfilePic(e.target.files[0].name);
                                        setFile(e.target.files[0]);
                                        previewImage(e);
                                    }} />
                                </div>

                                <img 
                                    id="profilePicPreview"
                                    className='img-fluid rounded-circle'
                                    width="130px"
                                    height="200px"
                                    alt="Preview"
                                />

                                <center>
                                    <button type="submit" className="btn btn-primary mt-5 mb-4" onClick={onSubmitClick}>Submit</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
