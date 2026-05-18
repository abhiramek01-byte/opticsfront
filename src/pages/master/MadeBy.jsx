import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaIndustry,
  FaIdCard,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function MadeBy() {
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
  } = useMasterNavigation("madeby", { madeByCode: "MB001", madeByName: "" });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "MB001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.madeByCode;
          if (codeToCheck && codeToCheck.startsWith("MB")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "MB" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.madeByCode !== nextCode) {
        setFormData(prev => ({ ...prev, madeByCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.madeByCode, setFormData]);

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
          <FaIndustry /> Made By Management
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
              <FaIndustry />
            </div>
            <h3>Made By Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Made By Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.madeByCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Made By Name</label>
              <div className="input-with-icon">
                <FaIndustry className="input-icon" />
                <input
                  name="madeByName"
                  value={formData.madeByName || ''}
                  onChange={handleChange}
                  placeholder="Enter made by name"
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