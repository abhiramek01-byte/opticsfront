import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaPercent,
  FaIdCard,
  FaMoneyCheckAlt,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function TaxGroup() {
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
  } = useMasterNavigation("tax-group", {
    taxGroupCode: "TG001",
    taxGroupName: "",
    taxPercent: "",
    cessPercent: ""
  });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "TG001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.taxGroupCode;
          if (codeToCheck && codeToCheck.startsWith("TG")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "TG" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.taxGroupCode !== nextCode) {
        setFormData(prev => ({ ...prev, taxGroupCode: nextCode }));
      }
    }
  }, [items, currentIndex, formData.taxGroupCode, setFormData]);

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
          <FaPercent /> Tax Group Management
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
              <FaPercent />
            </div>
            <h3>Tax Group Details</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Tax Group Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.taxGroupCode || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Tax Group Name</label>
              <div className="input-with-icon">
                <FaMoneyCheckAlt className="input-icon" />
                <input
                  name="taxGroupName"
                  value={formData.taxGroupName || ''}
                  onChange={handleChange}
                  placeholder="Enter tax group name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Tax (%)</label>
              <div className="input-with-icon">
                <FaPercent className="input-icon" />
                <input
                  name="taxPercent"
                  type="number"
                  value={formData.taxPercent || ''}
                  onChange={handleChange}
                  placeholder="Enter tax %"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>CESS (%)</label>
              <div className="input-with-icon">
                <FaPercent className="input-icon" />
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
    </div>
  );
}