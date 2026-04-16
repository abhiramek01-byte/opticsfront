import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function ColourCode() {
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
  } = useMasterNavigation("colour-code", { colourCode: "CC001", colourName: "" });

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
          <h3>Colour Code Details</h3>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Colour Code</label>
              <input value={formData.colourCode || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Colour Name</label>
              <input
                name="colourName"
                value={formData.colourName || ''}
                onChange={handleChange}
                placeholder="Enter colour name"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}