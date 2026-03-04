import { useState } from "react";

export default function Power() {
  const [formData, setFormData] = useState({
    code: "PW001",
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
      code: "PW001",
      name: ""
    });
  };

  const handleSave = () => {
    console.log("Power Data:", formData);
    alert("Power Saved Successfully!");
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
          <h3>Power Details</h3>

          <div className="form-grid single-grid">

            <div className="form-field">
              <label>Power Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Power Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter power value"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}