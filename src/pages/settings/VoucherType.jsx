import "../../styles/settings.css";

export default function VoucherType() {
    return (
        <div className="settings-page">

            {/* Top actions */}
            <div className="settings-topbar">
                <div className="left-actions">
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                    <button className="edit-btn">Edit</button>
                </div>

                <div className="right-actions">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save-btn">Save</button>
                </div>
            </div>

            {/* Card */}
            <div className="settings-card">
                <h2>Voucher Type Configuration</h2>

                <div className="form-grid">

                    <div>
                        <label>Type</label>
                        <select>
                            <option>Purchase</option>
                            <option>Sales</option>
                            <option>Expense</option>
                        </select>
                    </div>

                    <div>
                        <label>Code</label>
                        <input type="text" placeholder="Enter code..." />
                    </div>

                    <div>
                        <label>Prefix</label>
                        <input type="text" placeholder="e.g. PUR-" />
                    </div>

                    <div>
                        <label>Name</label>
                        <input type="text" placeholder="Enter voucher name..." />
                    </div>

                    <div>
                        <label>Start No</label>
                        <input type="number" defaultValue="1" />
                    </div>

                    <div>
                        <label>Account Type</label>
                        <select>
                            <option>(None)</option>
                            <option>Cash</option>
                            <option>Bank</option>
                        </select>
                    </div>

                </div>

                <div className="description">
                    <label>Description</label>
                    <textarea placeholder="Optional notes about this voucher type..."></textarea>
                </div>

            </div>
        </div>
    );
}