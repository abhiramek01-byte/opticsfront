import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Vendor.css";
import {
  FaBuilding,
  FaIdCard,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
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
  FaStore
} from "react-icons/fa";

export default function Vendor() {
  const {
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
  } = useMasterNavigation("vendors", {
    name: "",
    openingBalance: "",
    balanceType: "Debit",
    contactPerson: "",
    creditLimit: "",
    dueDays: "",
    gstNumber: "",
    tin: "",
    paymentTerms: "",
    address: "",
    place: "",
    phone: "",
    mobile: "",
    email: "",
    website: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="vendor-container">
      <div className="vendor-header">
        <h2>
          <FaStore /> Vendor Management
        </h2>

        <div className="header-left" style={{ display: 'none' }}>
          {/* Keeping logic but moving actual buttons below if needed, or redesigning them into the top bar */}
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

      <div className="vendor-wrapper">
        <div className="vendor-card">
          <div className="card-header">
            <div className="card-icon">
              <FaBuilding />
            </div>
            <h3>Basic Information</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Vendor Code</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input placeholder="Auto Generated" className="visual-readonly" disabled />
              </div>
            </div>

            <div className="form-field">
              <label>Vendor Name</label>
              <div className="input-with-icon">
                <FaBuilding className="input-icon" />
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="Enter Vendor Name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Opening Balance</label>
              <div className="input-with-icon">
                <FaRegMoneyBillAlt className="input-icon" />
                <input
                  name="openingBalance"
                  type="number"
                  value={formData.openingBalance || ''}
                  onChange={handleChange}
                  placeholder="0.00"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Balance Type</label>
              <select
                name="balanceType"
                value={formData.balanceType || 'Debit'}
                onChange={handleChange}
                disabled={isViewing}
              >
                <option>Debit</option>
                <option>Credit</option>
              </select>
            </div>
          </div>
        </div>

        <div className="vendor-card">
          <div className="card-header">
            <div className="card-icon">
              <FaFileInvoiceDollar />
            </div>
            <h3>Financial & Others</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Contact Person</label>
              <div className="input-with-icon">
                <FaUserTie className="input-icon" />
                <input
                  name="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={handleChange}
                  placeholder="Contact Person Name"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Credit Limit</label>
              <div className="input-with-icon">
                <FaRegMoneyBillAlt className="input-icon" />
                <input
                  name="creditLimit"
                  type="number"
                  value={formData.creditLimit || ''}
                  onChange={handleChange}
                  placeholder="Limit Amount"
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
                  type="number"
                  value={formData.dueDays || ''}
                  onChange={handleChange}
                  placeholder="Number of Days"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>GST Number</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input
                  name="gstNumber"
                  value={formData.gstNumber || ''}
                  onChange={handleChange}
                  placeholder="GSTIN"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>TIN</label>
              <div className="input-with-icon">
                <FaIdCard className="input-icon" />
                <input
                  name="tin"
                  value={formData.tin || ''}
                  onChange={handleChange}
                  placeholder="TIN Number"
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
                  placeholder="E.g., Net 30"
                  readOnly={isViewing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="vendor-card full-width">
          <div className="card-header">
            <div className="card-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Address Details</h3>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Place / City</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  name="place"
                  value={formData.place || ''}
                  onChange={handleChange}
                  placeholder="City Name"
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
                  placeholder="Landline Number"
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
                  placeholder="Mobile Number"
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
                  placeholder="Email Address"
                  readOnly={isViewing}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Website</label>
              <div className="input-with-icon">
                <FaGlobe className="input-icon" />
                <input
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  placeholder="Website URL"
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
                placeholder="Full Registered Address"
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}