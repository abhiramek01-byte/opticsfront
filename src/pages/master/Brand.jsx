import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaTags,
  FaIdCard,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function Brand() {
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
  } = useMasterNavigation("brand", { brandCode: "BR001", brandName: "" });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "BR001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.brandCode;
          if (codeToCheck && codeToCheck.startsWith("BR")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "BR" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.brandCode !== nextCode) {
        setFormData(prev => ({ ...prev, brandCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.brandCode, setFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="master-container">
      <div className="master-header">
        <h2>
          <FaTags /> Brand Management
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
              <FaTags />
            </div>
            <h3>Brand Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Brand Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.brandCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Brand Name</label>
              <div className="input-with-icon">
                <FaTags className="input-icon" />
                <input
                  name="brandName"
                  value={formData.brandName || ''}
                  onChange={handleChange}
                  placeholder="Enter brand name"
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