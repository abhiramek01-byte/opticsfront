import { useState } from "react";

export default function Brand() {
  const [formData, setFormData] = useState({
    code: "BR001",
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
    console.log("Brand Data:", formData);
    alert("Brand Saved Successfully!");
  };

  return (
    <div className="page-container">

      {/* ================= HEADER ================= */}
      <div className="page-header">

        <div className="header-left">
          <button className="btn-outline">◀ Previous</button>
          <button className="btn-outline">Next ▶</button>
          <button className="btn-edit">Edit</button>
        </div>

        <div className="header-right">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light" onClick={handleClear}>
            Clear
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>

      </div>

      {/* ================= FORM ================= */}
      <div className="form-wrapper">
        <div className="card small-card">

          <h3>Brand Details</h3>

          <div className="form-grid single-grid">

            <div className="form-field">
              <label>Brand Code</label>
              <input
                value={formData.code}
                readOnly
              />
            </div>

            <div className="form-field">
              <label>Brand Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter brand name"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}