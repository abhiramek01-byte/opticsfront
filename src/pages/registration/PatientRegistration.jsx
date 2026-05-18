import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus, FaSave, FaTimes, FaUndo, FaIdCard, FaUser, FaMapMarkerAlt, FaPhone, FaMobileAlt, FaEnvelope, FaGlasses, FaStethoscope, FaStickyNote, FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";
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

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/doctor", {
            headers: { "branch-id": localStorage.getItem("branchId") || "" }
        })
        .then(res => setDoctors(res.data))
        .catch(err => console.error(err));
    }, []);

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
            handleClear();
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
        <div className="registration-page">

            <div className="registration-topbar">
                <h2 className="page-title">
                    <FaUserPlus /> Patient Registration
                </h2>

                <div className="action-buttons">
                    <button className="action-btn cancel">
                        <FaTimes /> Cancel
                    </button>
                    <button className="action-btn clear" onClick={handleClear}>
                        <FaUndo /> Clear
                    </button>
                    <button className="action-btn save" onClick={handleSave}>
                        <FaSave /> Save Patient
                    </button>
                </div>
            </div>

            <div className="glass-panel">
                <div className="panel-header">
                    <FaFileAlt /> Registration Form
                </div>

                <div className="form-grid-2col">
                    {/* LEFT COLUMN */}
                    <div className="form-column">
                        <div className="input-group">
                            <label><FaIdCard /> Card No</label>
                            <input className="modern-input" name="cardNo" value={patient.cardNo} onChange={handleChange} placeholder="Enter Card No" />
                        </div>

                        <div className="input-group">
                            <label><FaUser /> Patient Name *</label>
                            <input className="modern-input" name="name" value={patient.name} onChange={handleChange} placeholder="Full Name" />
                        </div>

                        <div className="input-group">
                            <label><FaMapMarkerAlt /> Address</label>
                            <textarea className="modern-textarea" name="address" value={patient.address} onChange={handleChange} placeholder="Full Address"></textarea>
                        </div>

                        <div className="form-grid-2col" style={{ gap: '16px' }}>
                            <div className="input-group">
                                <label><FaPhone /> Phone</label>
                                <input className="modern-input" name="phone" value={patient.phone} onChange={handleChange} placeholder="Landline" />
                            </div>
                            <div className="input-group">
                                <label><FaMobileAlt /> Mobile No</label>
                                <input className="modern-input" name="mobile" value={patient.mobile} onChange={handleChange} placeholder="Mobile Number" />
                            </div>
                        </div>

                        <div className="input-group">
                            <label><FaEnvelope /> Email</label>
                            <input className="modern-input" type="email" name="email" value={patient.email} onChange={handleChange} placeholder="Email Address" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="form-column">
                        <div className="input-group">
                            <label><FaGlasses /> Lens Type</label>
                            <input className="modern-input" name="lensType" value={patient.lensType} onChange={handleChange} placeholder="e.g. Bifocal, Progressive" />
                        </div>

                        <div className="input-group">
                            <label><FaStethoscope /> Assigned Doctor</label>
                            <select className="modern-select" name="doctor" value={patient.doctor} onChange={handleChange}>
                                <option value="">Select Doctor...</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label><FaStickyNote /> Remarks</label>
                            <textarea className="modern-textarea" name="remark" value={patient.remark} onChange={handleChange} placeholder="Additional medical notes..."></textarea>
                        </div>

                        <div className="input-group" style={{ marginTop: '10px' }}>
                            <label>Documents</label>
                            <label className="upload-box">
                                <FaCloudUploadAlt size={32} />
                                <span>Upload Prescription / Files</span>
                                <input type="file" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}