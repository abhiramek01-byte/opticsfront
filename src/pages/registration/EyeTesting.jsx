import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/EyeTesting.css";

export default function EyeTesting() {

    const [patients, setPatients] = useState([]);

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

    // 🔹 Load patients
    useEffect(() => {
        axios.get("http://localhost:3000/patient")
            .then(res => setPatients(res.data))
            .catch(err => console.log(err));
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

        } catch (err) {
            console.log(err);
            alert("Error saving ❌");
        }
    };

    return (
        <div className="eye-page">

            <div className="eye-topbar">
                <div></div>

                <div className="action-buttons">
                    <button className="cancel">Cancel</button>
                    <button className="clear">Clear</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>

            <div className="eye-container">

                {/* LEFT */}
                <div className="eye-left">

                    <label>Patient</label>
                    <select onChange={handlePatientSelect}>
                        <option value="">Select Patient</option>
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <label>Name</label>
                    <input value={form.name} readOnly />

                    <label>Address</label>
                    <textarea value={form.address} readOnly />

                    <label>Phone</label>
                    <input value={form.phone} readOnly />

                    <label>Mobile</label>
                    <input value={form.mobile} readOnly />

                    <label>Email</label>
                    <input value={form.email} readOnly />

                    <label>Doctor</label>
                    <input name="doctor" onChange={handleChange} />

                    <label>Amount</label>
                    <input name="amount" onChange={handleChange} />

                </div>

                {/* RIGHT */}
                <div className="eye-right">

                    <h4>Right Eye</h4>

                    <table className="eye-table">
                        <tbody>
                            <tr>
                                <td>Sphere</td>
                                <td><input name="rightSphere" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Cylinder</td>
                                <td><input name="rightCylinder" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Axis</td>
                                <td><input name="rightAxis" onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>Left Eye</h4>

                    <table className="eye-table">
                        <tbody>
                            <tr>
                                <td>Sphere</td>
                                <td><input name="leftSphere" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Cylinder</td>
                                <td><input name="leftCylinder" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Axis</td>
                                <td><input name="leftAxis" onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label>Remarks</label>
                    <textarea name="remark" onChange={handleChange}></textarea>

                </div>

            </div>

        </div>
    );
}