import { useEffect } from "react";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Customer.css";
import {
  FaUserAlt,
  FaIdCard,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegMoneyBillAlt,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEraser,
  FaUsers
} from "react-icons/fa";

export default function Customer() {
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
  } = useMasterNavigation("customers", {
    code: "CU0001",
    name: "",
    type: "Retail",
    openingBalance: "",
    creditLimit: "",
    dueDays: "",
    gst: "",
    pan: "",
    paymentTerms: "",
    phone: "",
    mobile: "",
    email: "",
    place: "",
    address: ""
  });

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "CU0001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.customerCode || item.code;
          if (codeToCheck && codeToCheck.startsWith("CU")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "CU" + nextNum.toString().padStart(4, "0");
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
    <div className="customer-container">
      <div className="customer-header">
        <h2>
          <FaUsers /> Customer Management
        </h2>

        <div className="header-left" style={{ display: 'none' }}>
          {/* Keeping logic but moving actual buttons below if needed */}
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

      <div className="customer-wrapper">
        <div className="customer-card">
          <div className="card-header">
            <div className="card-icon">
              <FaUserAlt />
            </div>
            <h3>Basic Information</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Customer Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input value={formData.code || ''} className="visual-readonly" readOnly />
              </div>
            </div>

            <div className="form-field">
              <label>Customer Name</label>
              <div className="input-with-icon">
                <FaUserAlt className="input-icon" />
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Customer Type</label>
              <div className="input-with-icon">
                <FaUserTie className="input-icon" />
                <select
                  name="type"
                  value={formData.type || 'Retail'}
                  onChange={handleChange}
                  disabled={isViewing}
                >
                  <option>Retail</option>
                  <option>Wholesale</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Opening Balance</label>
              <div className="input-with-icon">
                <FaRegMoneyBillAlt className="input-icon" />
                <input
                  name="openingBalance"
                  value={formData.openingBalance || ''}
                  onChange={handleChange}
                  placeholder="Amount"
                  readOnly={isViewing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="customer-card">
          <div className="card-header">
            <div className="card-icon">
              <FaFileInvoiceDollar />
            </div>
            <h3>Financial Details</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Credit Limit</label>
              <div className="input-with-icon">
                <FaRegMoneyBillAlt className="input-icon" />
                <input
                  name="creditLimit"
                  value={formData.creditLimit || ''}
                  onChange={handleChange}
                  placeholder="Limit"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Due Days</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input
                  name="dueDays"
                  value={formData.dueDays || ''}
                  onChange={handleChange}
                  placeholder="Days"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>GST Number</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input
                  name="gst"
                  value={formData.gst || ''}
                  onChange={handleChange}
                  placeholder="GST no"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>PAN Number</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input
                  name="pan"
                  value={formData.pan || ''}
                  onChange={handleChange}
                  placeholder="PAN no"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Payment Terms</label>
              <div className="input-with-icon">
                <FaFileInvoiceDollar className="input-icon" />
                <input
                  name="paymentTerms"
                  value={formData.paymentTerms || ''}
                  onChange={handleChange}
                  placeholder="Terms"
                  readOnly={isViewing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="customer-card full-width">
          <div className="card-header">
            <div className="card-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Contact Details</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Phone</label>
              <div className="input-with-icon">
                <FaPhoneAlt className="input-icon" />
                <input
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Phone"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Mobile</label>
              <div className="input-with-icon">
                <FaPhoneAlt className="input-icon" />
                <input
                  name="mobile"
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  placeholder="Mobile"
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
                  placeholder="Email address"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Place</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  name="place"
                  value={formData.place || ''}
                  onChange={handleChange}
                  placeholder="City/Region"
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
                placeholder="Full address"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}