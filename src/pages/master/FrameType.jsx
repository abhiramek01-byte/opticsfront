import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaShapes,
  FaIdCard,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function FrameType() {
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
  } = useMasterNavigation("frametype", { frameTypeCode: "FT001", frameTypeName: "" });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "FT001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.frameTypeCode;
          if (codeToCheck && codeToCheck.startsWith("FT")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "FT" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.frameTypeCode !== nextCode) {
        setFormData(prev => ({ ...prev, frameTypeCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.frameTypeCode, setFormData]);

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
          <FaShapes /> Frame Type Management
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
              <FaShapes />
            </div>
            <h3>Frame Type Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Frame Type Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.frameTypeCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Frame Type Name</label>
              <div className="input-with-icon">
                <FaShapes className="input-icon" />
                <input
                  name="frameTypeName"
                  value={formData.frameTypeName || ''}
                  onChange={handleChange}
                  placeholder="Enter frame type name"
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