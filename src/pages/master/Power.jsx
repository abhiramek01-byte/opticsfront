import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaBolt,
  FaIdCard,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function Power() {
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
  } = useMasterNavigation("power", { powerCode: "PW001", powerName: "" });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "PW001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.powerCode;
          if (codeToCheck && codeToCheck.startsWith("PW")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "PW" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.powerCode !== nextCode) {
        setFormData(prev => ({ ...prev, powerCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.powerCode, setFormData]);

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
          <FaBolt /> Power Management
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
              <FaBolt />
            </div>
            <h3>Power Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Power Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.powerCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Power Name</label>
              <div className="input-with-icon">
                <FaBolt className="input-icon" />
                <input
                  name="powerName"
                  value={formData.powerName || ''}
                  onChange={handleChange}
                  placeholder="Enter power value"
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