import { useState } from "react";

export default function Vendor() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="vendor-container">

      {/* HEADER */}
      <div className="vendor-header">
        <h2>Vendor Management</h2>
        <div className="header-buttons">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light">Clear</button>
          <button className="btn-primary">Save Vendor</button>
        </div>
      </div>

      {/* FORM GRID */}
      <div className="vendor-grid">

        {/* BASIC INFO */}
        <div className="card">
          <h3>Basic Information</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Vendor Code</label>
              <input name="code" placeholder="Auto Generated" />
            </div>

            <div className="form-field">
              <label>Vendor Name</label>
              <input name="name" onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>Opening Balance</label>
              <input name="openingBalance" />
            </div>

            <div className="form-field">
              <label>Balance Type</label>
              <select name="balanceType">
                <option>Debit</option>
                <option>Credit</option>
              </select>
            </div>
          </div>
        </div>

        {/* FINANCIAL INFO */}
        <div className="card">
          <h3>Financial & Others</h3>

          <div className="form-grid">
            <div className="form-field">
              <label>Contact Person</label>
              <input name="contactPerson" />
            </div>

            <div className="form-field">
              <label>Credit Limit</label>
              <input name="creditLimit" />
            </div>

            <div className="form-field">
              <label>Due Days</label>
              <input name="dueDays" />
            </div>

            <div className="form-field">
              <label>GST Number</label>
              <input name="gst" />
            </div>

            <div className="form-field">
              <label>TIN</label>
              <input name="tin" />
            </div>

            <div className="form-field">
              <label>Payment Terms</label>
              <input name="paymentTerms" />
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="card full-width">
        <h3>Address Details</h3>

        <div className="form-grid">
          <div className="form-field">
            <label>Address</label>
            <textarea rows="3" name="address" />
          </div>

          <div className="form-field">
            <label>Place</label>
            <input name="place" />
          </div>

          <div className="form-field">
            <label>Phone</label>
            <input name="phone" />
          </div>

          <div className="form-field">
            <label>Mobile</label>
            <input name="mobile" />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input name="email" />
          </div>

          <div className="form-field">
            <label>Website</label>
            <input name="web" />
          </div>
        </div>
      </div>

    </div>
  );
}