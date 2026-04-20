import "../../styles/Tools.css";

export default function ToolsRegistration() {
  return (
    <div className="tool-page">

      {/* HEADER */}
      <div className="page-header">
        <h2>Customer Registration</h2>

        <div className="top-actions">
          <button className="btn cancel-btn">Cancel</button>
          <button className="btn clear-btn">Clear</button>
          <button className="btn save-btn">Save</button>
        </div>
      </div>

      {/* CARD */}
      <div className="card">

        <div className="form-grid">

          <div className="form-group">
            <label>Customer Name</label>
            <input placeholder="Full name" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input />
          </div>

          <div className="form-group full">
            <label>Address</label>
            <textarea placeholder="Street, City"></textarea>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label><input type="radio" name="gender" /> Male</label>
            <label><input type="radio" name="gender" /> Female</label>
            </div>
          </div>

          <div className="form-group full">
            <label>Quick Notes</label>
            <textarea placeholder="Add medical history..." />
          </div>

        </div>

      </div>

    </div>
  );
}