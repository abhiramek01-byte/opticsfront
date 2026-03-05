import "../../styles/Sales.css";

export default function Sales() {
    return (
        <div className="sales-page">

            {/* Topbar */}
            <div className="sales-topbar">
                <div>
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                    <button>Edit</button>
                </div>

                <div className="right-actions">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save">Save</button>
                </div>
            </div>

            {/* Sales Form */}

            <div className="sales-form">

                <div className="form-grid">

                    <div>
                        <label>Voucher Type</label>
                        <select>
                            <option>CR</option>
                        </select>
                    </div>

                    <div>
                        <label>No</label>
                        <input defaultValue="1" />
                    </div>

                    <div>
                        <label>Date</label>
                        <input type="date" />
                    </div>

                    <div>
                        <label>Customer</label>
                        <input placeholder="Local Customer" />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input />
                    </div>

                    <div>
                        <label>Payment Mode</label>
                        <select>
                            <option>Cash</option>
                            <option>Card</option>
                            <option>UPI</option>
                        </select>
                    </div>

                </div>

            </div>

            {/* Item Table */}

            <div className="sales-table">

                <table>

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Barcode</th>
                            <th>Code</th>
                            <th>Particulars</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Gross</th>
                            <th>Discount</th>
                            <th>Tax%</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>

                        {[...Array(10)].map((_, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>0</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0.00</td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Footer */}

            <div className="sales-footer">

                <div className="notes">

                    <label>Notes</label>
                    <textarea rows="3"></textarea>

                </div>

                <div className="totals">

                    <div>
                        <label>Total</label>
                        <input value="0.00" readOnly />
                    </div>

                    <div>
                        <label>Discount</label>
                        <input value="0.00" readOnly />
                    </div>

                    <div>
                        <label>Round Off</label>
                        <input value="0.00" readOnly />
                    </div>

                    <div className="net-total">
                        Net Total : <span>0.00</span>
                    </div>

                </div>

            </div>

        </div>
    );
}