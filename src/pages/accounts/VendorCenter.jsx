import "../../styles/VendorCenter.css";

export default function VendorCenter() {
    return (
        <div className="vendor-center-page">

            {/* Top Navigation */}

            <div className="vc-topbar">

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

            <div className="vc-container">

                {/* LEFT PANEL */}

                <div className="vc-left">

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

                        <label>Search By</label>
                        <select>
                            <option>Name</option>
                        </select>

                        <label>Search Type</label>
                        <select>
                            <option>Starts With</option>
                        </select>

                    </div>


                    {/* Vendor List */}

                    <div className="vendor-list">

                        <table>

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>VENDORS</td>
                                    <td>VD</td>
                                    <td>885,215.00</td>
                                </tr>

                                <tr>
                                    <td>LOCAL VENDOR</td>
                                    <td>OV0001</td>
                                    <td>417,590.00</td>
                                </tr>

                                <tr>
                                    <td>ZERADO</td>
                                    <td>OV0002</td>
                                    <td>28,551.00</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* RIGHT PANEL */}

                <div className="vc-right">

                    <h3>Vendor</h3>

                    <div className="vendor-details">

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