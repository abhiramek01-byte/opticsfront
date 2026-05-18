import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Doctor.css";
import {
  FaUserMd,
  FaIdCard,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser,
  FaMobileAlt
} from "react-icons/fa";

export default function Doctor() {
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
  } = useMasterNavigation("doctor", {
    code: "DR001",
    name: "",
    address: "",
    phone: "",
    mobile: "",
    email: ""
  });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "DR001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.code;
          if (codeToCheck && codeToCheck.startsWith("DR")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "DR" + nextNum.toString().padStart(3, "0");
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
    <div className="doctor-container">
      <div className="doctor-header">
        <h2>
          <FaUserMd /> Doctor Management
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

      <div className="doctor-wrapper">
        <div className="doctor-card">
          <div className="card-header">
            <div className="card-icon">
              <FaUserMd />
            </div>
            <h3>Doctor Details</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Doctor Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.code || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Doctor Name</label>
              <div className="input-with-icon">
                <FaUserMd className="input-icon" />
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="Enter doctor name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Phone</label>
              <div className="input-with-icon">
                <FaPhoneAlt className="input-icon" />
                <input
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Mobile No</label>
              <div className="input-with-icon">
                <FaMobileAlt className="input-icon" />
                <input
                  name="mobile"
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field full-width">
              <label>Address</label>
              <textarea
                rows="3"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Enter address"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}