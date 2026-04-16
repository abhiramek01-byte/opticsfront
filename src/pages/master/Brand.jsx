import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Brand() {
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
  } = useMasterNavigation("brand", { code: "BR001", name: "" });

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
          <h3>Brand Details</h3>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Brand Code</label>
              <input value={formData.code || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Brand Name</label>
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter brand name"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}