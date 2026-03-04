import { useState } from "react";
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

    return (
        <div className="patient-container">

            <div className="form-header">
                <h2>Patient Registration</h2>

                <div className="form-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light">Clear</button>
                    <button className="btn-primary">Save</button>
                </div>
            </div>

            <div className="patient-card">

                <div className="form-grid">

                    <div className="form-left">

                        <label>Card No</label>
                        <input name="cardNo" onChange={handleChange} />

                        <label>Name</label>
                        <input name="name" onChange={handleChange} />

                        <label>Address</label>
                        <textarea name="address" onChange={handleChange}></textarea>

                        <label>Phone</label>
                        <input name="phone" onChange={handleChange} />

                        <label>Mobile No</label>
                        <input name="mobile" onChange={handleChange} />

                        <label>Email</label>
                        <input name="email" onChange={handleChange} />

                        <label>Lens Type</label>
                        <input name="lensType" onChange={handleChange} />

                        <label>Doctor</label>
                        <input name="doctor" onChange={handleChange} />

                        <label>Remark</label>
                        <textarea name="remark" onChange={handleChange}></textarea>

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