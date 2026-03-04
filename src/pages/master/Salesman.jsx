import { useState } from "react";

export default function SalesMan() {
    const [formData, setFormData] = useState({
        code: "SM001",
        name: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleClear = () => {
        setFormData({
            ...formData,
            name: ""
        });
    };

    const handleSave = () => {
        console.log("Sales Man Data:", formData);
        alert("Sales Man Saved Successfully!");
    };

    return (
        <div className="vendor-container">

            {/* HEADER */}
            <div className="vendor-header">
                <h2>Sales Man Management</h2>
                <div className="header-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light" onClick={handleClear}>
                        Clear
                    </button>
                    <button className="btn-primary" onClick={handleSave}>
                        Save Sales Man
                    </button>
                </div>
            </div>

            {/* FORM CARD */}
            <div className="salesman-wrapper">
                <div className="card small-card">
                    <h3>Sales Man Details</h3>

                    <div className="form-grid single-grid">
                        <div className="form-field">
                            <label>Sales Man Code</label>
                            <input value={formData.code} readOnly />
                        </div>

                        <div className="form-field">
                            <label>Sales Man Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}