import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Model() {
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
  } = useMasterNavigation("model", {
    modelCode: "MD001",
    modelName: "",
    type: "Lens",
    expiry: false,
    nonStockItem: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
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
          <h3>Model Details</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Model Code</label>
              <input value={formData.modelCode || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Model Name</label>
              <input
                name="modelName"
                value={formData.modelName || ''}
                onChange={handleChange}
                placeholder="Enter model name"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Type</label>
              <select
                name="type"
                value={formData.type || 'Lens'}
                onChange={handleChange}
                disabled={isViewing}
              >
                <option value="Lens">Lens</option>
                <option value="Frame">Frame</option>
                <option value="Accessory">Accessory</option>
              </select>
            </div>

            <div className="checkbox-group" style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '25px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="expiry"
                  checked={formData.expiry || false}
                  onChange={handleChange}
                  disabled={isViewing}
                />
                <span style={{ fontWeight: 600, color: '#64748b' }}>Expiry</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="nonStockItem"
                  checked={formData.nonStockItem || false}
                  onChange={handleChange}
                  disabled={isViewing}
                />
                <span style={{ fontWeight: 600, color: '#64748b' }}>Non Stock Item</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}