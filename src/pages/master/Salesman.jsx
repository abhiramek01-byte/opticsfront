import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Salesman.css";
import {
  FaUserTie,
  FaIdCard,
  FaUserAlt,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser
} from "react-icons/fa";

export default function Salesman() {
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
  } = useMasterNavigation("salesman", { code: "SM0001", name: "" });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "SM0001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.salesmanCode || item.code;
          if (codeToCheck && codeToCheck.startsWith("SM")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "SM" + nextNum.toString().padStart(4, "0");
      }
      
      if (formData.code !== nextCode) {
        setFormData(prev => ({ ...prev, code: nextCode }));
      }
    }
  }, [items, currentIndex, formData.code, setFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="salesman-container">
      <div className="salesman-header">
        <h2>
          <FaUserTie /> Salesman Management
        </h2>

        <div className="header-left" style={{ display: 'none' }}>
          {/* Kept logic but moved buttons to header-buttons */}
        </div>

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

      <div className="salesman-wrapper">
        <div className="salesman-card">
          <div className="card-header">
            <div className="card-icon">
              <FaUserAlt />
            </div>
            <h3>Salesman Details</h3>
          </div>

          <div className="form-grid single-grid">
            <div className="form-field">
              <label>Salesman Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input 
                  value={formData.code || ''} 
                  className="visual-readonly" 
                  readOnly 
                />
              </div>
            </div>

            <div className="form-field">
              <label>Salesman Name</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="Enter salesman name"
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