import { useState } from "react";
import "../../styles/AdminVendors.css";

export default function Vendors() {

    const [vendors, setVendors] = useState([
        { id: 1, name: "Vision Optics", email: "vision@mail.com", phone: "9876543210", status: "Active" },
        { id: 2, name: "Clear Lens Co.", email: "clear@mail.com", phone: "9876543211", status: "Active" },
        { id: 3, name: "EyeCare Supplies", email: "eye@mail.com", phone: "9876543212", status: "Inactive" },
    ]);

    const [search, setSearch] = useState("");

    const filtered = vendors.filter(v =>
        v.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleStatus = (id) => {
        setVendors(vendors.map(v =>
            v.id === id
                ? { ...v, status: v.status === "Active" ? "Inactive" : "Active" }
                : v
        ));
    };

    const deleteVendor = (id) => {
        setVendors(vendors.filter(v => v.id !== id));
    };

    const active = vendors.filter(v => v.status === "Active").length;

    return (
        <div className="vendor-root">

            {/* HEADER */}

            <div className="vendor-header">
                <div>
                    <h1>Vendor Management</h1>
                    <p>Manage optical product suppliers</p>
                </div>

                <button className="add-vendor">+ Add Vendor</button>
            </div>

            {/* STATS */}

            <div className="vendor-stats">

                <div className="vendor-stat">
                    <h3>Total Vendors</h3>
                    <p>{vendors.length}</p>
                </div>

                <div className="vendor-stat">
                    <h3>Active Vendors</h3>
                    <p>{active}</p>
                </div>

                <div className="vendor-stat">
                    <h3>Inactive Vendors</h3>
                    <p>{vendors.length - active}</p>
                </div>

            </div>

            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search vendor..."
                className="vendor-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* TABLE */}

            <div className="vendor-table">

                <div className="vendor-row vendor-head">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Phone</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>

                {filtered.map(v => (

                    <div className="vendor-row" key={v.id}>

                        <span className="vendor-name">{v.name}</span>
                        <span>{v.email}</span>
                        <span>{v.phone}</span>

                        <span>
                            <button
                                className={`status ${v.status === "Active" ? "active" : "inactive"}`}
                                onClick={() => toggleStatus(v.id)}
                            >
                                {v.status}
                            </button>
                        </span>

                        <span>
                            <button
                                className="delete-btn"
                                onClick={() => deleteVendor(v.id)}
                            >
                                Delete
                            </button>
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}