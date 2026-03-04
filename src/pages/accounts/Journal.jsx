import "../../styles/Journal.css";

export default function Journal() {
    return (
        <div className="journal-page">

            {/* Top Navigation */}
            <div className="journal-topbar">

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

            <div className="journal-form">

                <div className="row">

                    <div className="field">
                        <label>No</label>
                        <input defaultValue="1" />
                    </div>

                    <div className="field">
                        <label>Ref No</label>
                        <input defaultValue="1" />
                    </div>

                    <div className="field">
                        <label>Date</label>
                        <input type="date" />
                    </div>

                </div>

                <div className="row">

                    <div className="field full">
                        <label>DI</label>
                        <input placeholder="Enter Debit/Credit indicator" />
                    </div>

                </div>

            </div>


            {/* Table */}

            <div className="journal-table-container">

                <table className="journal-table">

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Account</th>
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


            {/* Bottom */}

            <div className="journal-bottom">
                <button className="print-btn">Print</button>
            </div>

        </div>
    );
}