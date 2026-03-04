import { useState } from "react";

export default function FrameType() {
  const [formData, setFormData] = useState({
    code: "FT001",
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
      code: "FT001",
      name: ""
    });
  };

  const handleSave = () => {
    console.log("Frame Type Data:", formData);
    alert("Frame Type Saved Successfully!");
  };

  return (
    <div className="vendor-container">

      {/* HEADER */}
      <div className="vendor-header">
        <div className="header-left">
          <button className="btn-outline">◀ Previous</button>
          <button className="btn-outline">Next ▶</button>
          <button className="btn-light">Edit</button>
        </div>

        <div className="header-buttons">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light" onClick={handleClear}>
            Clear
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="salesman-wrapper">
        <div className="card small-card">
          <h3>Frame Type Details</h3>

          <div className="form-grid single-grid">

            <div className="form-field">
              <label>Frame Type Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Frame Type Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter frame type name"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}