// PharmacyRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PharmacyRegistration() {
    const [pharmacyName, setPharmacyName] = useState("");
    const [shopRegNo, setShopRegNo] = useState("");
    const [location, setLocation] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pharmacyPic, setPharmacyPic] = useState("");
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

    const addPharmacy = async () => {
        const pharmacyPicFilename = Date.now() + pharmacyPic;

        try {
            const response = await axios.post('http://localhost:8091/api/v2/AddPharmacy', {
                pharmacyId: Date.now(), // Assuming pharmacyId is generated here; adjust as needed
                pharmacyName: pharmacyName,
                shopRegNo: shopRegNo,
                location: location,
                mobile: mobile,
                email: email,
                password: password,
                pharmacyPic: pharmacyPicFilename
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            console.log(response.data);

            if (response.data) {
                await uploadImage(pharmacyPicFilename);

                setPharmacyName("");
                setShopRegNo("");
                setLocation("");
                setMobile("");
                setEmail("");
                setPassword("");
                setPharmacyPic("");
                setFile(null);
                navigate('/pharmacy/login');
                alert('Pharmacy registered successfully.');
            }
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    const onSubmitClick = (e) => {
        e.preventDefault();
        addPharmacy();
    };

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("pharmacyPicPreview");
        output.src = URL.createObjectURL(input.files[0]);
    };

    return (
        <>
            <section style={{ marginTop: '6rem', marginBottom: '1rem' }}>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title mb-4 mt-3 text-center">Pharmacy Registration</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="pharmacyName">Pharmacy Name</label>
                                    <input type="text" className="form-control" id="pharmacyName" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="shopRegNo">Shop Registration Number</label>
                                    <input type="text" className="form-control" id="shopRegNo" value={shopRegNo} onChange={(e) => setShopRegNo(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pharmacyPic">Pharmacy Picture</label>
                                    <input type="file" className="form-control" id="pharmacyPic" onChange={(e) => {
                                        setPharmacyPic(e.target.files[0].name);
                                        setFile(e.target.files[0]);
                                        previewImage(e);
                                    }} />
                                </div>

                                <img 
                                    id="pharmacyPicPreview"
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
