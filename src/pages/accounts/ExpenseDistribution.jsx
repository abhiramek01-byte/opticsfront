import "../../styles/ExpenseDistribution.css";

export default function ExpenseDistribution() {
    return (
        <div className="expense-page">

            {/* Top Navigation */}

            <div className="expense-topbar">

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


            {/* Main Form */}

            <div className="expense-form">

                <div className="row">

                    <div className="field small">
                        <label>No</label>
                        <input defaultValue="1" />
                    </div>

                    <div className="field small">
                        <label>Date</label>
                        <input type="date" />
                    </div>

                </div>


                <div className="row">
                    <div className="field full">
                        <label>Creditor</label>
                        <input defaultValue="CASH IN HAND" />
                    </div>
                </div>


                <div className="row">
                    <div className="field full">
                        <label>Debtor</label>
                        <input />
                    </div>
                </div>


                <div className="row">
                    <div className="field full">
                        <label>Description</label>
                        <input />
                    </div>
                </div>


                <div className="row">

                    <div className="field small">
                        <label>Amount</label>
                        <input />
                    </div>

                </div>

            </div>


            {/* Table */}

            <div className="expense-table-container">

                <table className="expense-table">

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Vtype</th>
                            <th>PNo</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input /></td>
                            <td><input /></td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>
    );
}