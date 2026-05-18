import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaWarehouse,
  FaIdCard,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function Warehouse() {
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
  } = useMasterNavigation("warehouse", {
    warehouseCode: "WH001",
    warehouseName: "",
    location: ""
  });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "WH001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.warehouseCode;
          if (codeToCheck && codeToCheck.startsWith("WH")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "WH" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.warehouseCode !== nextCode) {
        setFormData(prev => ({ ...prev, warehouseCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.warehouseCode, setFormData]);

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
        <h2>
          <FaWarehouse /> Warehouse Management
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

      <div className="master-wrapper centered">
        <div className="master-card small-card">
          <div className="card-header">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <h3>Warehouse Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Warehouse Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.warehouseCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Warehouse Name</label>
              <div className="input-with-icon">
                <FaWarehouse className="input-icon" />
                <input
                  name="warehouseName"
                  value={formData.warehouseName || ''}
                  onChange={handleChange}
                  placeholder="Enter warehouse name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field full-width">
              <label>Location</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
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
    </div>
  );
}