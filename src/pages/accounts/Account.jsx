import "../../styles/Account.css";

export default function Account() {
    return (
        <div className="account-page">

            {/* Top Navigation */}
            <div className="account-topbar">

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

            {/* Form Card */}
            <div className="account-card">

                <div className="account-form">

                    <div className="form-group">
                        <label>Code</label>
                        <input type="text" placeholder="VD0000089" />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Sub Group</label>
                        <select>
                            <option>Select Sub Group</option>
                            <option>Vendor</option>
                            <option>Customer</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Under</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>OB</label>
                        <select>
                            <option>Select</option>
                            <option>Debit</option>
                            <option>Credit</option>
                        </select>
                    </div>

                </div>

            </div>

        </div>
    );
}