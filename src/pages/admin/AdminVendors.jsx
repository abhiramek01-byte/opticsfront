import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AdminVendors.css";

export default function Vendors() {

    const [vendors, setVendors] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const fetchVendors = async () => {
        try {
            const res = await axios.get("http://localhost:3000/vendors");
            setVendors(res.data);
        } catch (error) {
            console.error("Failed to fetch vendors", error);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const filtered = vendors.filter(v =>
        v.name?.toLowerCase().includes(search.toLowerCase())
    );

    const deleteVendor = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/vendors/${id}`);
            setVendors(vendors.filter(v => v.id !== id));
        } catch (error) {
            console.error("Error deleting vendor", error);
            alert("Error deleting vendor");
        }
    };

    return (
        <div className="vendor-root">
            {/* HEADER */}
            <div className="vendor-header">
                <div>
                    <h1>Vendor Management</h1>
                    <p>Manage optical product suppliers</p>
                </div>
                <button className="add-vendor" onClick={() => navigate('/admin/vendors/add')}>+ Add Vendor</button>
            </div>

            {/* STATS */}
            <div className="vendor-stats">
                <div className="vendor-stat">
                    <h3>Total Vendors</h3>
                    <p>{vendors.length}</p>
                </div>
                <div className="vendor-stat">
                    <h3>Active Vendors</h3>
                    <p>{vendors.length}</p>
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
                    <span>Contact Info</span>
                    <span>GST Number</span>
                    <span>Credit Limit</span>
                    <span>Actions</span>
                </div>

                {filtered.length === 0 ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No vendors found.</div>
                ) : (
                    filtered.map(v => (
                        <div className="vendor-row" key={v.id}>
                            <span className="vendor-name" style={{ fontWeight: 'bold' }}>{v.name}</span>
                            <span>
                                {v.email && <div>{v.email}</div>}
                                {v.phone && <div>{v.phone}</div>}
                            </span>
                            <span>{v.gstNumber || "-"}</span>
                            <span>₹{v.creditLimit || 0}</span>

                            <span>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteVendor(v.id)}
                                >
                                    Delete
                                </button>
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}