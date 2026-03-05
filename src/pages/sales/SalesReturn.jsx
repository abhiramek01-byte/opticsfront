import "../../styles/SalesReturn.css";

export default function SalesReturn() {
    return (
        <div className="sales-return-page">

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

            {/* Form */}

            <div className="sales-form">

                <div className="form-grid">

                    <div>
                        <label>Voucher Type</label>
                        <select>
                            <option>SR</option>
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
                        <label>Address</label>
                        <input />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input />
                    </div>

                </div>

            </div>

            {/* Prescription */}

            <div className="prescription">

                <h4>Right Eye</h4>

                <div className="eye-grid">
                    <input placeholder="Sphere" />
                    <input placeholder="Cylinder" />
                    <input placeholder="Axis" />
                    <input placeholder="ADD" />
                    <input placeholder="Prism" />
                    <input placeholder="V/A" />
                    <input placeholder="Lens Power" />
                    <input placeholder="IPD" />
                </div>

                <h4>Left Eye</h4>

                <div className="eye-grid">
                    <input placeholder="Sphere" />
                    <input placeholder="Cylinder" />
                    <input placeholder="Axis" />
                    <input placeholder="ADD" />
                    <input placeholder="Prism" />
                    <input placeholder="V/A" />
                    <input placeholder="Lens Power" />
                    <input placeholder="IPD" />
                </div>

            </div>

            {/* Items Table */}

            <div className="sales-table">

                <table>

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Barcode</th>
                            <th>Product</th>
                            <th>Model</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Gross</th>
                            <th>Discount</th>
                            <th>Tax%</th>
                            <th>Total</th>
                            <th>Remark</th>
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
                                <td></td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Footer */}

            <div className="sales-footer">

                <div className="notes">

                    <label>Doctor</label>
                    <input />

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