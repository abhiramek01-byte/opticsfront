import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Size() {
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
  } = useMasterNavigation("size", { sizeCode: "SZ001", sizeName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
          <h3>Size Details</h3>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Size Code</label>
              <input value={formData.sizeCode || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Size Name</label>
              <input
                name="sizeName"
                value={formData.sizeName || ''}
                onChange={handleChange}
                placeholder="Enter size name"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}