import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Customer() {
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
              <label>Customer Code</label>
              <input value={formData.code || ''} className="visual-readonly" readOnly />
            </div>

            <div className="form-field">
              <label>Customer Name</label>
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter customer name"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Customer Type</label>
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

            <div className="form-field">
              <label>Opening Balance</label>
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

        <div className="master-card" style={{ marginBottom: "20px" }}>
          <h3>Financial Details</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Credit Limit</label>
              <input
                name="creditLimit"
                value={formData.creditLimit || ''}
                onChange={handleChange}
                placeholder="Limit"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Due Days</label>
              <input
                name="dueDays"
                value={formData.dueDays || ''}
                onChange={handleChange}
                placeholder="Days"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>GST Number</label>
              <input
                name="gst"
                value={formData.gst || ''}
                onChange={handleChange}
                placeholder="GST no"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>PAN Number</label>
              <input
                name="pan"
                value={formData.pan || ''}
                onChange={handleChange}
                placeholder="PAN no"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Payment Terms</label>
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

        <div className="master-card">
          <h3>Contact Details</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Phone"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Mobile</label>
              <input
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
                placeholder="Mobile"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Email address"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field">
              <label>Place</label>
              <input
                name="place"
                value={formData.place || ''}
                onChange={handleChange}
                placeholder="City/Region"
                readOnly={isViewing}
              />
            </div>

            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
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