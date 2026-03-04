import "../../styles/CustomerCenter.css";

export default function CustomerCenter() {
    return (
        <div className="customer-center-page">

            {/* Top Navigation */}

            <div className="cc-topbar">

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


            {/* Main Container */}

            <div className="cc-container">

                {/* LEFT PANEL */}

                <div className="cc-left">

                    <div className="filters">

                        <label>Date</label>
                        <select>
                            <option>All</option>
                        </select>

                        <label>From</label>
                        <input type="date" />

                        <label>To</label>
                        <input type="date" />

                        <label>Report Type</label>
                        <select>
                            <option>Ledger</option>
                        </select>

                        <label>Status</label>
                        <select>
                            <option>(All)</option>
                        </select>

                        <label>Sales Man</label>
                        <select>
                            <option>(All)</option>
                        </select>

                        <label>Search By</label>
                        <select>
                            <option>Name</option>
                        </select>

                        <label>Search Type</label>
                        <select>
                            <option>Starts With</option>
                        </select>

                    </div>


                    {/* Customer List */}

                    <div className="customer-list">

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>CUSTOMERS</td>
                                    <td>-4900.00</td>
                                </tr>

                                <tr>
                                    <td>LOCAL CUSTOMER</td>
                                    <td>-4900.00</td>
                                </tr>
                            </tbody>

                        </table>

                    </div>

                </div>


                {/* RIGHT PANEL */}

                <div className="cc-right">

                    <h3>Customer</h3>

                    <div className="customer-details">

                        <div className="detail-box">
                            <label>Address</label>
                            <textarea></textarea>
                        </div>

                        <div className="detail-box">
                            <label>Debit</label>
                            <input placeholder="Last Debit Details" />
                        </div>

                        <div className="detail-box">
                            <label>Credit</label>
                            <input placeholder="Last Credit Details" />
                        </div>

                        <div className="detail-box">
                            <label>Status</label>
                            <select>
                                <option>Active</option>
                            </select>
                        </div>

                        <button className="update-btn">Update</button>

                    </div>

                </div>

            </div>

        </div>
    );
}