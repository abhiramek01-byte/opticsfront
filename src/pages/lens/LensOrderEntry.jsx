import "../../styles/LensOrder.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaGlasses, FaSave, FaUser, FaPhone, FaBuilding, FaTag, FaPalette, FaClipboardList, FaUndo } from "react-icons/fa";

export default function LensOrderEntry() {

    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const headers = { "branch-id": localStorage.getItem("branchId") || "" };
        axios.get("http://localhost:3000/vendors", { headers })
            .then(res => setVendors(res.data))
            .catch(err => console.log(err));
    }, []);

    const [form, setForm] = useState({
        customer: "",
        phone: "",
        vendor: "",
        brand: "",
        type: "Single Vision",
        coating: "None",
        right_sph: "",
        right_cyl: "",
        right_axis: "",
        left_sph: "",
        left_cyl: "",
        left_axis: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setForm({
            customer: "", phone: "", vendor: "", brand: "", type: "Single Vision", coating: "None",
            right_sph: "", right_cyl: "", right_axis: "", left_sph: "", left_cyl: "", left_axis: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.customer || !form.vendor) {
            alert("Customer and Vendor are required");
            return;
        }

        // Map frontend state to backend DTO
        const payload = {
            customerName: form.customer,
            phone: form.phone,
            vendor: form.vendor,
            lensBrand: form.brand,
            lensType: form.type,
            coating: form.coating,

            rightSPH: form.right_sph,
            rightCYL: form.right_cyl,
            rightAXIS: form.right_axis,

            leftSPH: form.left_sph,
            leftCYL: form.left_cyl,
            leftAXIS: form.left_axis
        };

        try {
            await axios.post("http://localhost:3000/lens-order", payload, {
                headers: {
                    "branch-id": localStorage.getItem("branchId") || ""
                }
            });
            alert("Lens Order Saved Successfully ✅");
            handleClear();
        } catch (err) {
            console.error("Error saving lens order:", err);
            alert("Failed to save lens order ❌");
        }
    };

    return (
        <div className="lens-page">

            <div className="lens-topbar">
                <h2 className="page-title">
                    <FaGlasses /> Lens Order Entry
                </h2>
                <div className="action-buttons">
                    <button type="button" className="action-btn cancel" onClick={handleClear}>
                        <FaUndo /> Clear
                    </button>
                    <button type="button" className="action-btn save" onClick={handleSubmit}>
                        <FaSave /> Save Order
                    </button>
                </div>
            </div>

            <form className="lens-form" onSubmit={handleSubmit}>

                <div className="glass-panel">
                    <div className="form-grid-2col">

                        {/* LEFT: Customer & Order Details */}
                        <div className="form-column">
                            <div className="panel-header">
                                <FaClipboardList /> Order Details
                            </div>

                            <div className="input-group">
                                <label><FaUser /> Customer Name *</label>
                                <input className="modern-input" name="customer" value={form.customer} onChange={handleChange} placeholder="Enter Customer Name" required />
                            </div>

                            <div className="input-group">
                                <label><FaPhone /> Phone Number</label>
                                <input className="modern-input" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter Phone Number" />
                            </div>

                            <div className="input-group">
                                <label><FaBuilding /> Vendor *</label>
                                <select className="modern-select" name="vendor" value={form.vendor} onChange={handleChange} required>
                                    <option value="">Select Vendor</option>
                                    {vendors.map(v => (
                                        <option key={v.id} value={v.name}>{v.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label><FaTag /> Lens Brand</label>
                                <input className="modern-input" name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Zeiss, Essilor" />
                            </div>

                            <div className="form-grid-2col" style={{ gap: '16px' }}>
                                <div className="input-group">
                                    <label>Lens Type</label>
                                    <select className="modern-select" name="type" value={form.type} onChange={handleChange}>
                                        <option value="Single Vision">Single Vision</option>
                                        <option value="Bifocal">Bifocal</option>
                                        <option value="Progressive">Progressive</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label><FaPalette /> Coating</label>
                                    <select className="modern-select" name="coating" value={form.coating} onChange={handleChange}>
                                        <option value="None">None</option>
                                        <option value="Blue Cut">Blue Cut</option>
                                        <option value="Anti Glare">Anti Glare</option>
                                        <option value="UV">UV</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Eye Power */}
                        <div className="form-column">
                            <div className="panel-header">
                                <FaGlasses /> Eye Power / Prescription
                            </div>

                            <div className="eye-section">
                                <table className="eye-matrix">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>SPH</th>
                                            <th>CYL</th>
                                            <th>AXIS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Right Eye (OD)</td>
                                            <td><input name="right_sph" value={form.right_sph} onChange={handleChange} placeholder="+0.00" /></td>
                                            <td><input name="right_cyl" value={form.right_cyl} onChange={handleChange} placeholder="-0.00" /></td>
                                            <td><input name="right_axis" value={form.right_axis} onChange={handleChange} placeholder="°" /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: '16px' }}>Left Eye (OS)</td>
                                            <td style={{ paddingTop: '16px' }}><input name="left_sph" value={form.left_sph} onChange={handleChange} placeholder="+0.00" /></td>
                                            <td style={{ paddingTop: '16px' }}><input name="left_cyl" value={form.left_cyl} onChange={handleChange} placeholder="-0.00" /></td>
                                            <td style={{ paddingTop: '16px' }}><input name="left_axis" value={form.left_axis} onChange={handleChange} placeholder="°" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </form>

        </div>

    );
}