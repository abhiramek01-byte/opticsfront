import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaCube,
  FaIdCard,
  FaTags,
  FaLayerGroup,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function Model() {
  const {
    items,
    currentIndex,
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

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "MD001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.modelCode;
          if (codeToCheck && codeToCheck.startsWith("MD")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "MD" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.modelCode !== nextCode) {
        setFormData(prev => ({ ...prev, modelCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.modelCode, setFormData]);

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
        <h2>
          <FaCube /> Model Management
        </h2>

        <div className="header-buttons">
          <button className="btn-outline" onClick={handlePrevious} disabled={isFirst}>
            <FaChevronLeft /> Prev
          </button>
          <button className="btn-outline" onClick={handleNext} disabled={isLast}>
            Next <FaChevronRight />
          </button>
          <button className="btn-secondary" onClick={handleEdit} disabled={!isViewing}>
            <FaEdit /> Edit
          </button>
          <button className="btn-outline" onClick={handleClear}>
            <FaEraser /> Clear
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={isViewing}>
            {isEditMode ? <><FaSave /> Update</> : <><FaSave /> Save</>}
          </button>
        </div>
      </div>

      <div className="master-wrapper">
        <div className="master-card">
          <div className="card-header">
            <div className="card-icon">
              <FaCube />
            </div>
            <h3>Model Details</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Model Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.modelCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Model Name</label>
              <div className="input-with-icon">
                <FaTags className="input-icon" />
                <input
                  name="modelName"
                  value={formData.modelName || ''}
                  onChange={handleChange}
                  placeholder="Enter model name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Type</label>
              <div className="input-with-icon">
                <FaLayerGroup className="input-icon" />
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