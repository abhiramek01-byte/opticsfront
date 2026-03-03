export default function PageLayout({ title, children }) {
  return (
    <div className="page-container">

      {/* Top Action Bar */}
      <div className="page-header">
        <div className="page-nav">
          <button className="nav-btn">◀ Previous</button>
          <button className="nav-btn">Next ▶</button>
          <button className="edit-btn">✎ Edit</button>
        </div>

        <div className="page-actions">
          <button className="btn cancel">Cancel</button>
          <button className="btn clear">Clear</button>
          <button className="btn save">Save</button>
        </div>
      </div>

      <div className="form-wrapper">
        {children}
      </div>

    </div>
  );
}