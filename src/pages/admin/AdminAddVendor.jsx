import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Master.css"; 

export default function AdminAddVendor() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        openingBalance: "",
        balanceType: "Debit",
        contactPerson: "",
        creditLimit: "",
        dueDays: "",
        gstNumber: "",
        tin: "",
        paymentTerms: "",
        address: "",
        place: "",
        phone: "",
        mobile: "",
        email: "",
        website: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleClear = () => {
        setFormData({
            name: "", openingBalance: "", balanceType: "Debit", contactPerson: "",
            creditLimit: "", dueDays: "", gstNumber: "", tin: "", paymentTerms: "",
            address: "", place: "", phone: "", mobile: "", email: "", website: ""
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            alert("Vendor Name is required!");
            return;
        }

        try {
            await axios.post("http://localhost:3000/vendors", formData);
            alert("Vendor Added Successfully! ✅");
            navigate("/admin/vendors");
        } catch (error) {
            console.error("Error saving vendor:", error);
            alert("Error saving vendor ❌");
        }
    };

    return (
        <div className="master-container" style={{ paddingBottom: '40px' }}>
            <div className="master-header">
                <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button className="btn-outline" onClick={() => navigate("/admin/vendors")}>← Back</button>
                    <h2 style={{ margin: 0 }}>Add New Vendor</h2>
                </div>

                <div className="header-buttons">
                    <button className="btn-outline" onClick={handleClear}>Clear</button>
                    <button className="btn-primary" onClick={handleSave}>Save Vendor</button>
                </div>
            </div>

            <div className="master-wrapper">
                <div className="master-card" style={{ marginBottom: "20px" }}>
                    <h3>Basic Information</h3>

                    <div className="form-grid">
                        <div className="form-field">
                            <label>Vendor Code</label>
                            <input placeholder="Auto Generated" className="visual-readonly" disabled />
                        </div>

                        <div className="form-field">
                            <label>Vendor Name <span style={{color: 'red'}}>*</span></label>
                            <input
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Vendor Name"
                            />
                        </div>

                        <div className="form-field">
                            <label>Opening Balance</label>
                            <input
                                name="openingBalance"
                                type="number"
                                value={formData.openingBalance || ''}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="form-field">
                            <label>Balance Type</label>
                            <select
                                name="balanceType"
                                value={formData.balanceType || 'Debit'}
                                onChange={handleChange}
                            >
                                <option>Debit</option>
                                <option>Credit</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="master-card" style={{ marginBottom: "20px" }}>
                    <h3>Financial & Others</h3>

                    <div className="form-grid">
                        <div className="form-field">
                            <label>Contact Person</label>
                            <input
                                name="contactPerson"
                                value={formData.contactPerson || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Credit Limit</label>
                            <input
                                name="creditLimit"
                                type="number"
                                value={formData.creditLimit || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Due Days</label>
                            <input
                                name="dueDays"
                                type="number"
                                value={formData.dueDays || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>GST Number</label>
                            <input
                                name="gstNumber"
                                value={formData.gstNumber || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>TIN</label>
                            <input
                                name="tin"
                                value={formData.tin || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Payment Terms</label>
                            <input
                                name="paymentTerms"
                                value={formData.paymentTerms || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="master-card">
                    <h3>Address Details</h3>

                    <div className="form-grid">
                        <div className="form-field">
                            <label>Place</label>
                            <input
                                name="place"
                                value={formData.place || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Phone</label>
                            <input
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Mobile</label>
                            <input
                                name="mobile"
                                value={formData.mobile || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Email</label>
                            <input
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Website</label>
                            <input
                                name="website"
                                value={formData.website || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                            <label>Address</label>
                            <textarea
                                rows="3"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
