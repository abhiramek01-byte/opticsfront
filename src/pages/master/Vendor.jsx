import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

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
    <div className="master-container">
      <div className="master-header">
        <div className="header-left">
          <button className="btn-outline" onClick={handlePrevious} disabled={isFirst}>◀ Previous</button>
          <button className="btn-outline" onClick={handleNext} disabled={isLast}>Next ▶</button>
          <button className="btn-secondary" onClick={handleEdit} disabled={!isViewing}>Edit</button>
        </div>

        <div className="header-buttons">
          <button className="btn-outline" onClick={handleClear}>Cancel</button>
          <button className="btn-secondary" onClick={handleClear}>Clear</button>
          <button className="btn-primary" onClick={handleSave} disabled={isViewing}>
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <div className="master-wrapper">
        <div className="master-card" style={{ marginBottom: "20px" }}>
          <h3>Basic Information</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Vendor Code</label>
              <input placeholder="Auto Generated" className="visual-readonly" disabled />
            </div>

            <div className="form-field">
              <label>Vendor Name</label>
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Vendor Name"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Opening Balance</label>
              <input
                name="openingBalance"
                type="number"
                value={formData.openingBalance || ''}
                onChange={handleChange}
                placeholder="0.00"
                readOnly={isViewing}
              />
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

        <div className="master-card" style={{ marginBottom: "20px" }}>
          <h3>Financial & Others</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Contact Person</label>
              <input
                name="contactPerson"
                value={formData.contactPerson || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Credit Limit</label>
              <input
                name="creditLimit"
                type="number"
                value={formData.creditLimit || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Due Days</label>
              <input
                name="dueDays"
                type="number"
                value={formData.dueDays || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>GST Number</label>
              <input
                name="gstNumber"
                value={formData.gstNumber || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>TIN</label>
              <input
                name="tin"
                value={formData.tin || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Payment Terms</label>
              <input
                name="paymentTerms"
                value={formData.paymentTerms || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>

        <div className="master-card">
          <h3>Address Details</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Place</label>
              <input
                name="place"
                value={formData.place || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Mobile</label>
              <input
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Website</label>
              <input
                name="website"
                value={formData.website || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>

            <div className="form-field" style={{ gridColumn: '1 / -1' }}>
              <label>Address</label>
              <textarea
                rows="3"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                readOnly={isViewing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}