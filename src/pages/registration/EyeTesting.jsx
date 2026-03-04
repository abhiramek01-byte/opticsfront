import "../../styles/EyeTesting.css";

export default function EyeTesting() {
    return (
        <div className="eye-page">

            {/* HEADER BUTTONS */}
            <div className="eye-topbar">
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

            <div className="eye-container">

                {/* LEFT FORM */}
                <div className="eye-left">

                    <label>Voucher Type</label>
                    <select>
                        <option>ET</option>
                    </select>

                    <label>No</label>
                    <input />

                    <label>Date</label>
                    <input type="date" />

                    <label>Card No</label>
                    <input />

                    <label>Name</label>
                    <input />

                    <label>Address</label>
                    <textarea></textarea>

                    <label>Phone</label>
                    <input />

                    <label>Mobile No</label>
                    <input />

                    <label>Email</label>
                    <input />

                    <label>Amount</label>
                    <input />

                    <label>Doctor</label>
                    <input />

                    <label>Colour Vision</label>
                    <input />

                </div>

                {/* RIGHT SIDE PRESCRIPTION */}
                <div className="eye-right">

                    <h4>Right Eye</h4>

                    <table className="eye-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>ADD</th>
                                <th>Prism</th>
                                <th>V/A</th>
                                <th>Contact Lens Power</th>
                                <th>IPD</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Distance</td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>

                            <tr>
                                <td>Near</td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                        </tbody>
                    </table>


                    <h4>Left Eye</h4>

                    <table className="eye-table">
                        <tbody>
                            <tr>
                                <td>Distance</td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>

                            <tr>
                                <td>Near</td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                            </tr>
                        </tbody>
                    </table>


                    <label>Remarks</label>
                    <textarea className="remarks"></textarea>

                </div>

            </div>

            {/* BOTTOM SECTION */}
            <div className="eye-bottom">

                <div>
                    Print File
                    <select>
                        <option>EyeTesting</option>
                    </select>

                    <label className="preview">
                        <input type="checkbox" /> Preview
                    </label>
                </div>

                <div className="bottom-buttons">
                    <button>Save</button>
                    <button>Clear</button>
                    <button>Cancel</button>
                </div>

            </div>

        </div>
    );
}