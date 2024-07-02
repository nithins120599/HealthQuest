import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddPrescription = () => {
  const { appId } = useParams();
  const [prescriptions, setPrescriptions] = useState([{ medicineName: "", dosage: [], days: "" }]);
  const [medicineNames, setMedicineNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const fetchMedicineNames = async () => {
        try {
          const response = await axios.get(`http://localhost:8091/api/v2/allMedecines?search=${searchTerm}`);
          setMedicineNames(response.data);
        } catch (error) {
          console.error("Error fetching medicine names:", error);
          setErrorMessage('Failed to fetch medicine names. Please try again.');
        }
      };

      fetchMedicineNames();
    } else {
      setMedicineNames([]);
    }
  }, [searchTerm]);

  const handleMedicineSearch = (index, value) => {
    handleChange(index, 'medicineName', value);
    setSearchTerm(value);
  };

  const handleChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const handleDosageChange = (index, option) => {
    const updatedPrescriptions = [...prescriptions];
    const dosageIndex = updatedPrescriptions[index].dosage.indexOf(option);
    if (dosageIndex === -1) {
      updatedPrescriptions[index].dosage.push(option);
    } else {
      updatedPrescriptions[index].dosage.splice(dosageIndex, 1);
    }
    setPrescriptions(updatedPrescriptions);
  };

  const handleAddMedicine = () => {
    setPrescriptions([...prescriptions, { medicineName: "", dosage: [], days: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const formattedPrescriptions = prescriptions.map(prescription => ({
        prescriptionDate: currentDate,
        appId: appId,
        prescription: `${prescription.medicineName}(${prescription.dosage.join(', ')}, ${prescription.days})`,
      }));

      const response = await axios.post('http://localhost:8091/api/v2/addPrescriptions', formattedPrescriptions, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      alert('Prescriptions added successfully!');
    } catch (error) {
      console.error("Prescription submission error:", error);
      setErrorMessage(`Prescription submission failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Add Prescription</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {prescriptions.map((prescription, index) => (
                  <div className="mb-3" key={index}>
                    <label className="form-label">Medicine Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={prescription.medicineName}
                      onChange={(e) => handleMedicineSearch(index, e.target.value)}
                      list={`medicine-options-${index}`}
                    />
                    <datalist id={`medicine-options-${index}`}>
                      {medicineNames.map((medicine, medIndex) => (
                        <option key={medIndex} value={medicine.medicineName} />
                      ))}
                    </datalist>

                    {/* Dosage checkboxes */}
                    <div className="form-check">
                      {['Morning', 'Afternoon', 'Evening', 'Before breakfast', 'After breakfast', 'Before meals', 'After meals', 'Before dinner', 'After dinner'].map((dosage, dosageIndex) => (
                        <div key={dosageIndex} className="form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={dosage}
                            checked={prescription.dosage.includes(dosage)}
                            onChange={() => handleDosageChange(index, dosage)}
                          />
                          <label className="form-check-label">{dosage}</label>
                        </div>
                      ))}
                    </div>
                    <label className="form-label">Days:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={prescription.days}
                      onChange={(e) => handleChange(index, 'days', e.target.value)}
                    />
                  </div>
                ))}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="mb-3">
                  <button type="button" className="btn btn-primary me-2" onClick={handleAddMedicine}>Add Medicine</button>
                  <button type="submit" className="btn btn-primary">Submit Prescription</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;
