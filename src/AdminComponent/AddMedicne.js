import React, { useState } from 'react';
import axios from 'axios';

export default function AddMedicine() {
    const [medicineName, setMedicineName] = useState("");

    const addMedicine = async () => {
        try {
            const response = await axios.post('http://localhost:8091/api/v2/AddMedicine', {
                medicineName: medicineName,
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            console.log(response.data);

            alert('Medicine Added Successfully..');
        } catch (error) {
            console.log("error = " + error.message);
        }

        // Making fields empty
        setMedicineName("");
    };

    const onSubmitClick = (e) => {
        e.preventDefault();
        addMedicine();
    }

    return (
        <div>
            <form name='f1' method='post' action=''>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-6 mx-auto'>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <h1 className='text-primary'>Add Medicine</h1>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-12'>
                                    <label>Medicine Name</label>
                                    <input type="text" onChange={(e) => { setMedicineName(e.target.value) }} className='form-control' value={medicineName}></input>
                                </div>
                            </div>

                            <div className='row mt-5'>
                                <div className='col-sm-6 text-center'>
                                    <input type="submit" className='btn btn-danger' onClick={onSubmitClick}
                                        style={{ width: "150px" }} value="Add Medicine" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
