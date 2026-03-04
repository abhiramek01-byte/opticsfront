import "../../styles/CashPayment.css";

export default function CashPayment() {
    return (
        <div className="cashpay-page">

            {/* Top Navigation */}
            <div className="cashpay-topbar">

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

            {/* Header Fields */}

            <div className="cashpay-form">

                <div className="form-row">

                    <div className="form-group">
                        <label>No</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Ref No.</label>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" />
                    </div>

                </div>

                <div className="form-group full">
                    <label>Debtor</label>
                    <input type="text" placeholder="CASH IN HAND" />
                </div>

            </div>

            {/* Table */}

            <div className="cashpay-table-container">

                <table className="cashpay-table">

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Debtor</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input /></td>
                            <td><input /></td>
                            <td><input /></td>
                        </tr>
                    </tbody>

                </table>

            </div>

            {/* Bottom Section */}

            <div className="cashpay-bottom">

                <button className="print-btn">Print</button>

                <input className="total-box" placeholder="Total" />

            </div>

        </div>
    );
}