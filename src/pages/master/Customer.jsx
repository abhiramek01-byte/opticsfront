import { useState } from "react";

export default function Customer() {
  const [formData, setFormData] = useState({
    code: "CU0001",
    name: "",
    type: "Retail",
    openingBalance: "",
    creditLimit: "",
    dueDays: "",
    gst: "",
    pan: "",
    paymentTerms: "",
    phone: "",
    mobile: "",
    email: "",
    place: "",
    address: ""
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
      openingBalance: "",
      creditLimit: "",
      dueDays: "",
      gst: "",
      pan: "",
      paymentTerms: "",
      phone: "",
      mobile: "",
      email: "",
      place: "",
      address: ""
    });
  };

  const handleSave = () => {
    console.log("Customer Data:", formData);
    alert("Customer Saved Successfully!");
  };

  return (
    <div className="vendor-container">

      {/* HEADER */}
      <div className="vendor-header">
        <h2>Customer Management</h2>
        <div className="header-buttons">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light" onClick={handleClear}>Clear</button>
          <button className="btn-primary" onClick={handleSave}>
            Save Customer
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="vendor-grid">

        {/* BASIC INFO */}
        <div className="card">
          <h3>Basic Information</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Customer Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Customer Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Customer Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Retail</option>
                <option>Wholesale</option>
              </select>
            </div>

            <div className="form-field">
              <label>Opening Balance</label>
              <input
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* FINANCIAL INFO */}
        <div className="card">
          <h3>Financial Details</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Credit Limit</label>
              <input
                name="creditLimit"
                value={formData.creditLimit}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Due Days</label>
              <input
                name="dueDays"
                value={formData.dueDays}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>GST Number</label>
              <input
                name="gst"
                value={formData.gst}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>PAN Number</label>
              <input
                name="pan"
                value={formData.pan}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Payment Terms</label>
              <input
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="card full-width">
        <h3>Contact Details</h3>

        <div className="form-grid">
          <div className="form-field">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Mobile</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Place</label>
            <input
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </div>

          <div className="form-field full">
            <label>Address</label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

    </div>
  );
}