import "../../styles/Company.css";

export default function Company() {
    return (
        <div className="company-page">

            {/* Top Navigation */}
            <div className="company-topbar">

                <div className="nav-buttons">
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                    <button className="edit-btn">Edit</button>
                </div>

                <div className="action-buttons">
                    <button className="cancel">Cancel</button>
                    <button className="clear">Clear</button>
                    <button className="save">Save</button>
                </div>

            </div>

            {/* Form Container */}
            <div className="company-card">

                <div className="company-form">

                    <div className="form-group">
                        <label>Code</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" />
                    </div>

                    <div className="form-group address-group">
                        <label>Address</label>
                        <textarea rows="3"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Account</label>
                        <select>
                            <option>(none)</option>
                            <option>Account 1</option>
                            <option>Account 2</option>
                        </select>
                    </div>

                </div>

            </div>

        </div>
    );
}