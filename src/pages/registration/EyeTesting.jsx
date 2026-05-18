import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaSave, FaTimes, FaUndo, FaUser, FaMapMarkerAlt, FaPhone, FaMobileAlt, FaEnvelope, FaStethoscope, FaMoneyBillWave, FaStickyNote, FaClipboardList } from "react-icons/fa";
import "../../styles/EyeTesting.css";

export default function EyeTesting() {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [form, setForm] = useState({
        patientId: "",
        name: "",
        address: "",
        phone: "",
        mobile: "",
        email: "",
        doctor: "",
        amount: "",
        remark: "",

        rightSphere: "",
        rightCylinder: "",
        rightAxis: "",

        leftSphere: "",
        leftCylinder: "",
        leftAxis: ""
    });

    // 🔹 Load patients and doctors
    useEffect(() => {
        axios.get("http://localhost:3000/patient")
            .then(res => setPatients(res.data))
            .catch(err => console.log(err));
            
        axios.get("http://localhost:3000/doctor", {
            headers: { "branch-id": localStorage.getItem("branchId") || "" }
        })
        .then(res => setDoctors(res.data))
        .catch(err => console.error(err));
    }, []);

    // 🔹 Handle change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 When selecting patient → autofill
    const handlePatientSelect = (e) => {
        const id = e.target.value;
        const selected = patients.find(p => p.id == id);

        setForm({
            ...form,
            patientId: id,
            name: selected?.name || "",
            address: selected?.address || "",
            phone: selected?.phone || "",
            mobile: selected?.mobile || "",
            email: selected?.email || ""
        });
    };

    // 🔹 SAVE
    const handleSave = async () => {
        try {
            if (!form.patientId) {
                alert("Select patient ❌");
                return;
            }

            await axios.post("http://localhost:3000/eye-testing", {
                patientId: Number(form.patientId),
                doctor: form.doctor,
                amount: Number(form.amount),

                rightSphere: form.rightSphere,
                rightCylinder: form.rightCylinder,
                rightAxis: form.rightAxis,

                leftSphere: form.leftSphere,
                leftCylinder: form.leftCylinder,
                leftAxis: form.leftAxis,

                remark: form.remark
            });

            alert("Eye test saved ✅");

            // Reset form
            setForm({
                patientId: "", name: "", address: "", phone: "", mobile: "", email: "", doctor: "", amount: "", remark: "",
                rightSphere: "", rightCylinder: "", rightAxis: "",
                leftSphere: "", leftCylinder: "", leftAxis: ""
            });

        } catch (err) {
            console.log(err);
            alert("Error saving ❌");
        }
    };

    // 🔹 CLEAR
    const handleClear = () => {
        setForm({
            patientId: "", name: "", address: "", phone: "", mobile: "", email: "", doctor: "", amount: "", remark: "",
            rightSphere: "", rightCylinder: "", rightAxis: "",
            leftSphere: "", leftCylinder: "", leftAxis: ""
        });
    };

    return (
        <div className="registration-page">

            <div className="registration-topbar">
                <h2 className="page-title">
                    <FaEye /> Eye Testing
                </h2>

                <div className="action-buttons">
                    <button className="action-btn cancel">
                        <FaTimes /> Cancel
                    </button>
                    <button className="action-btn clear" onClick={handleClear}>
                        <FaUndo /> Clear
                    </button>
                    <button className="action-btn save" onClick={handleSave}>
                        <FaSave /> Save Test
                    </button>
                </div>
            </div>

            <div className="glass-panel">
                <div className="form-grid-2col">

                    {/* LEFT COLUMN: Patient Info */}
                    <div className="form-column">
                        <div className="panel-header">
                            <FaUser /> Patient Details
                        </div>

                        <div className="input-group">
                            <label>Select Patient</label>
                            <select className="modern-select" value={form.patientId} onChange={handlePatientSelect}>
                                <option value="">Select Patient...</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label><FaUser /> Name</label>
                            <input className="modern-input" value={form.name} readOnly placeholder="Autofilled" />
                        </div>

                        <div className="input-group">
                            <label><FaMapMarkerAlt /> Address</label>
                            <textarea className="modern-textarea" style={{minHeight: '60px'}} value={form.address} readOnly placeholder="Autofilled"></textarea>
                        </div>

                        <div className="input-group">
                            <label><FaPhone /> Phone</label>
                            <input className="modern-input" value={form.phone} readOnly placeholder="Autofilled" />
                        </div>

                        <div className="input-group">
                            <label><FaMobileAlt /> Mobile</label>
                            <input className="modern-input" value={form.mobile} readOnly placeholder="Autofilled" />
                        </div>

                        <div className="input-group">
                            <label><FaEnvelope /> Email</label>
                            <input className="modern-input" value={form.email} readOnly placeholder="Autofilled" />
                        </div>

                        <div className="input-group">
                            <label><FaStethoscope /> Examiner / Doctor</label>
                            <select className="modern-select" name="doctor" value={form.doctor} onChange={handleChange}>
                                <option value="">Select Doctor...</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label><FaMoneyBillWave /> Consultation Amount</label>
                            <input className="modern-input" name="amount" value={form.amount} onChange={handleChange} placeholder="₹ 0.00" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Eye Prescription */}
                    <div className="form-column">
                        <div className="panel-header">
                            <FaClipboardList /> Eye Prescription
                        </div>

                        {/* RIGHT EYE */}
                        <div className="eye-section">
                            <h4>Right Eye (OD)</h4>
                            <table className="eye-table">
                                <tbody>
                                    <tr>
                                        <td>Sphere</td>
                                        <td><input name="rightSphere" value={form.rightSphere} onChange={handleChange} placeholder="+0.00" /></td>
                                    </tr>
                                    <tr>
                                        <td>Cylinder</td>
                                        <td><input name="rightCylinder" value={form.rightCylinder} onChange={handleChange} placeholder="-0.00" /></td>
                                    </tr>
                                    <tr>
                                        <td>Axis</td>
                                        <td><input name="rightAxis" value={form.rightAxis} onChange={handleChange} placeholder="°" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* LEFT EYE */}
                        <div className="eye-section">
                            <h4>Left Eye (OS)</h4>
                            <table className="eye-table">
                                <tbody>
                                    <tr>
                                        <td>Sphere</td>
                                        <td><input name="leftSphere" value={form.leftSphere} onChange={handleChange} placeholder="+0.00" /></td>
                                    </tr>
                                    <tr>
                                        <td>Cylinder</td>
                                        <td><input name="leftCylinder" value={form.leftCylinder} onChange={handleChange} placeholder="-0.00" /></td>
                                    </tr>
                                    <tr>
                                        <td>Axis</td>
                                        <td><input name="leftAxis" value={form.leftAxis} onChange={handleChange} placeholder="°" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="input-group">
                            <label><FaStickyNote /> Remarks</label>
                            <textarea className="modern-textarea" name="remark" value={form.remark} onChange={handleChange} placeholder="Additional observations..."></textarea>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}