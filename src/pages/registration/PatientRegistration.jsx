import { useState } from "react";
import axios from "axios";
import "../../styles/PatientRegistration.css";

export default function PatientRegistration() {

    const [patient, setPatient] = useState({
        cardNo: "",
        name: "",
        address: "",
        phone: "",
        mobile: "",
        email: "",
        lensType: "",
        doctor: "",
        remark: ""
    });

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    // ✅ SAVE FUNCTION
    const handleSave = async () => {
        try {

            if (!patient.name) {
                alert("Name is required ❌");
                return;
            }

            await axios.post("http://localhost:3000/patient", patient);

            alert("Patient saved successfully ✅");

            // Reset form
            setPatient({
                cardNo: "",
                name: "",
                address: "",
                phone: "",
                mobile: "",
                email: "",
                lensType: "",
                doctor: "",
                remark: ""
            });

        } catch (err) {
            console.log(err);
            alert("Error saving patient ❌");
        }
    };

    // ✅ CLEAR FUNCTION
    const handleClear = () => {
        setPatient({
            cardNo: "",
            name: "",
            address: "",
            phone: "",
            mobile: "",
            email: "",
            lensType: "",
            doctor: "",
            remark: ""
        });
    };

    return (
        <div className="patient-container">

            <div className="form-header">
                <h2>Patient Registration</h2>

                <div className="form-buttons">
                    <button className="btn-outline">Cancel</button>

                    <button className="btn-light" onClick={handleClear}>
                        Clear
                    </button>

                    <button className="btn-primary" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>

            <div className="patient-card">

                <div className="form-grid">

                    <div className="form-left">

                        <label>Card No</label>
                        <input name="cardNo" value={patient.cardNo} onChange={handleChange} />

                        <label>Name</label>
                        <input name="name" value={patient.name} onChange={handleChange} />

                        <label>Address</label>
                        <textarea name="address" value={patient.address} onChange={handleChange}></textarea>

                        <label>Phone</label>
                        <input name="phone" value={patient.phone} onChange={handleChange} />

                        <label>Mobile No</label>
                        <input name="mobile" value={patient.mobile} onChange={handleChange} />

                        <label>Email</label>
                        <input name="email" value={patient.email} onChange={handleChange} />

                        <label>Lens Type</label>
                        <input name="lensType" value={patient.lensType} onChange={handleChange} />

                        <label>Doctor</label>
                        <input name="doctor" value={patient.doctor} onChange={handleChange} />

                        <label>Remark</label>
                        <textarea name="remark" value={patient.remark} onChange={handleChange}></textarea>

                    </div>

                    <div className="form-right">
                        <h3>Documents</h3>

                        <div className="upload-box">
                            <p>Upload Prescription / Files</p>
                            <input type="file" />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}