import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function TaxGroup() {
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
  } = useMasterNavigation("tax-group", {
    taxGroupCode: "TG001",
    taxGroupName: "",
    taxPercent: "",
    cessPercent: ""
  });

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
          <h3>Tax Group Details</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Tax Group Code</label>
              <input value={formData.taxGroupCode || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Tax Group Name</label>
              <input
                name="taxGroupName"
                value={formData.taxGroupName || ''}
                onChange={handleChange}
                placeholder="Enter tax group name"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Tax (%)</label>
              <input
                name="taxPercent"
                type="number"
                value={formData.taxPercent || ''}
                onChange={handleChange}
                placeholder="Enter tax %"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>CESS (%)</label>
              <input
                name="cessPercent"
                type="number"
                value={formData.cessPercent || ''}
                onChange={handleChange}
                placeholder="Enter CESS %"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}