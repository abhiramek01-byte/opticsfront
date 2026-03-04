import { useState } from "react";

export default function TaxGroup() {
  const [formData, setFormData] = useState({
    code: "TG001",
    name: "",
    tax: "",
    cess: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClear = () => {
    setFormData({
      code: "TG001",
      name: "",
      tax: "",
      cess: ""
    });
  };

  const handleSave = () => {
    console.log("Tax Group Data:", formData);
    alert("Tax Group Saved Successfully!");
  };

  return (
    <div className="vendor-container">

      {/* ================= HEADER ================= */}
      <div className="vendor-header">
        <div className="header-left">
          <button className="btn-outline">◀ Previous</button>
          <button className="btn-outline">Next ▶</button>
          <button className="btn-light">Edit</button>
        </div>

        <div className="header-buttons">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light" onClick={handleClear}>Clear</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="salesman-wrapper">
        <div className="card medium-card">
          <h3>Tax Group Details</h3>

          <div className="form-grid">

            <div className="form-field">
              <label>Tax Group Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Tax Group Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Tax (%)</label>
              <input
                name="tax"
                type="number"
                value={formData.tax}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>CESS (%)</label>
              <input
                name="cess"
                type="number"
                value={formData.cess}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}