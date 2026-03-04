import "../../styles/CashReceipt.css";

export default function CashReceipt() {
    return (
        <div className="cash-page">

            {/* Top Navigation */}
            <div className="cash-topbar">

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
            <div className="cash-form">

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
                    <label>Creditor</label>
                    <input type="text" placeholder="CASH IN HAND" />
                </div>

            </div>


            {/* Table Section */}

            <div className="cash-table-container">

                <table className="cash-table">

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Creditor</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Discount</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input /></td>
                            <td><input /></td>
                            <td><input /></td>
                            <td><input /></td>
                            <td><input /></td>
                        </tr>
                    </tbody>

                </table>

            </div>


            {/* Bottom Section */}

            <div className="cash-bottom">

                <button className="print-btn">Print</button>

                <input className="total-box" placeholder="Total" />

            </div>

        </div>
    );
}