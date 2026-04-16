import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Warehouse() {
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
  } = useMasterNavigation("warehouse", {
    warehouseCode: "WH001",
    warehouseName: "",
    location: ""
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
          <h3>Warehouse Details</h3>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Warehouse Code</label>
              <input value={formData.warehouseCode || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Warehouse Name</label>
              <input
                name="warehouseName"
                value={formData.warehouseName || ''}
                onChange={handleChange}
                placeholder="Enter warehouse name"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field full">
              <label>Location</label>
              <input
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="Enter location"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}