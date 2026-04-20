import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Doctor() {
  const {
    formData,
    setFormData,
    handleNext,
    handlePrevious,
    handleClear,
    handleEdit,
    handleSave,
    isFirst,
    isLast,
    isViewing,
    isEditMode
  } = useMasterNavigation("doctor", {
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

  return (
    <div className="master-container">
      <div className="master-header">
        <div className="header-left">
          <button className="btn-outline" onClick={handlePrevious} disabled={isFirst}>◀ Previous</button>
          <button className="btn-outline" onClick={handleNext} disabled={isLast}>Next ▶</button>
          <button className="btn-secondary" onClick={handleEdit} disabled={!isViewing}>Edit</button>
        </div>

        <div className="header-buttons">
          <button className="btn-outline" onClick={handleClear}>Cancel</button>
          <button className="btn-secondary" onClick={handleClear}>Clear</button>
          <button className="btn-primary" onClick={handleSave} disabled={isViewing}>
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <div className="master-wrapper">
        <div className="master-card">
          <h3>Doctor Details</h3>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Doctor Code</label>
              <input value={formData.code || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Doctor Name</label>
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter doctor name"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field full">
              <label>Address</label>
              <textarea
                rows="4"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Enter address"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Enter phone number"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Mobile No</label>
              <input
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
                placeholder="Enter mobile number"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field full">
              <label>Email</label>
              <input
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter email address"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}