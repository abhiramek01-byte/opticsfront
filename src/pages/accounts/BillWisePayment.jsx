import "../../styles/BillWisePayment.css";

export default function BillWisePayment() {
    return (
        <div className="bill-page">

            {/* Top Navigation */}
            <div className="bill-topbar">

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


            {/* Header Form */}

            <div className="bill-form">

                <div className="row">

                    <div className="field">
                        <label>No</label>
                        <input />
                    </div>

                    <div className="field">
                        <label>Ref No.</label>
                        <input />
                    </div>

                    <div className="field">
                        <label>Date</label>
                        <input type="date" />
                    </div>

                </div>


                <div className="row">

                    <div className="field large">
                        <label>Creditor</label>
                        <input placeholder="CASH IN HAND" />
                    </div>

                    <div className="field">
                        <label>Cheque No</label>
                        <input />
                    </div>

                    <div className="field">
                        <label>Date</label>
                        <input type="date" />
                    </div>

                </div>


                <div className="row">

                    <div className="field large">
                        <label>Vendor</label>
                        <select>
                            <option>Select Vendor</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Amount</label>
                        <input />
                    </div>

                    <div className="field">
                        <label>Advance</label>
                        <input />
                    </div>

                </div>


                <div className="row">

                    <div className="field full">
                        <label>Description</label>
                        <input placeholder="Enter payment description..." />
                    </div>

                </div>

            </div>


            {/* Table */}

            <div className="bill-table-container">

                <table className="bill-table">

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>VType</th>
                            <th>No</th>
                            <th>SNo</th>
                            <th>Account</th>
                            <th>Description</th>
                            <th>DDate</th>
                            <th>Age</th>
                            <th>BAmount</th>
                            <th>BOD</th>
                            <th>PPaid</th>
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Discount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan="15" className="empty-row"></td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>
    );
}