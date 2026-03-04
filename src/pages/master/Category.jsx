import { useState } from "react";

export default function Category() {
  const [formData, setFormData] = useState({
    code: "CT001",
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
      code: "CT001",
      name: ""
    });
  };

  const handleSave = () => {
    console.log("Category Data:", formData);
    alert("Category Saved Successfully!");
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
          <h3>Category Details</h3>

          <div className="form-grid single-grid">

            <div className="form-field">
              <label>Category Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Category Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}