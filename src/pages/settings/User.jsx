import "../../styles/Form.css";

export default function User() {
    return (
        <div className="page-container">

            <div className="page-actions">
                <button>◀ Previous</button>
                <button>Next ▶</button>
                <button className="edit">Edit</button>

                <div className="right-actions">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save">Save</button>
                </div>
            </div>

            <div className="form-card">
                <h2>User Configuration</h2>

                <div className="form-grid">

                    <input placeholder="User Name" />
                    <input placeholder="Email" />

                    <input placeholder="Phone Number" />
                    <input type="password" placeholder="Password" />

                    <input type="password" placeholder="Confirm Password" />

                    <select>
                        <option>Superadmin</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Sales Staff</option>
                    </select>

                    <select>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                </div>

                <textarea placeholder="Description"></textarea>

            </div>
        </div>
    );
}