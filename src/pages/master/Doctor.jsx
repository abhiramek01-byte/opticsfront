import { useState } from "react";

export default function Doctor() {
  const [formData, setFormData] = useState({
    code: "DR001",
    name: "",
    address: "",
    phone: "",
    mobile: "",
    email: ""
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
      name: "",
      address: "",
      phone: "",
      mobile: "",
      email: ""
    });
  };

  const handleSave = () => {
    console.log("Doctor Data:", formData);
    alert("Doctor Saved Successfully!");
  };

  return (
    <div className="vendor-container">

      {/* HEADER */}
      <div className="vendor-header">
        <h2>Doctor Management</h2>
        <div className="header-buttons">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light" onClick={handleClear}>
            Clear
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Doctor
          </button>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="doctor-wrapper">
        <div className="card medium-card">
          <h3>Doctor Details</h3>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Doctor Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Doctor Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field full">
              <label>Address</label>
              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Mobile No</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="form-field full">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}