import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaPalette,
  FaIdCard,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser,
  FaPaintBrush
} from "react-icons/fa";

export default function ColourCode() {
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
  } = useMasterNavigation("colour-code", { colourCode: "CC001", colourName: "" });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "CC001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.colourCode;
          if (codeToCheck && codeToCheck.startsWith("CC")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "CC" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.colourCode !== nextCode) {
        setFormData(prev => ({ ...prev, colourCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.colourCode, setFormData]);

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
          <FaPalette /> Colour Code Management
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
              <FaPalette />
            </div>
            <h3>Colour Code Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Colour Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.colourCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Colour Name</label>
              <div className="input-with-icon">
                <FaPaintBrush className="input-icon" />
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
    </div>
  );
}