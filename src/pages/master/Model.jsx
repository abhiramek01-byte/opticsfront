import { useState } from "react";

export default function Model() {
  const [formData, setFormData] = useState({
    code: "MD001",
    name: "",
    type: "Lens",
    expiry: false,
    nonStock: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleClear = () => {
    setFormData({
      code: "MD001",
      name: "",
      type: "Lens",
      expiry: false,
      nonStock: false
    });
  };

  const handleSave = () => {
    console.log(formData);
    alert("Model Saved Successfully!");
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
        <div className="card medium-card">
          <h3>Model Details</h3>

          <div className="form-grid">

            <div className="form-field">
              <label>Model Code</label>
              <input value={formData.code} readOnly />
            </div>

            <div className="form-field">
              <label>Model Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Lens</option>
                <option>Frame</option>
                <option>Accessory</option>
              </select>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="expiry"
                  checked={formData.expiry}
                  onChange={handleChange}
                />
                Expiry
              </label>

              <label>
                <input
                  type="checkbox"
                  name="nonStock"
                  checked={formData.nonStock}
                  onChange={handleChange}
                />
                Non Stock Item
              </label>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}