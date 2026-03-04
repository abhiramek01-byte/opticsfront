import "../../styles/Period.css";

export default function Period() {
    return (
        <div className="period-page">

            {/* Top Navigation */}
            <div className="period-topbar">

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
            <div className="period-card">

                <div className="period-form">

                    <div className="form-group">
                        <label>Code</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>From</label>
                            <input type="date" />
                        </div>

                        <div className="form-group">
                            <label>To</label>
                            <input type="date" />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}