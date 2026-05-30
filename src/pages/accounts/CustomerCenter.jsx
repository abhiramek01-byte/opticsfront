import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/CustomerCenter.css";

export default function CustomerCenter() {
    const [customers, setCustomers] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: null,
        customerCode: "",
        name: "",
        mobile: "",
        phone: "",
        email: "",
        place: "",
        address: "",
        creditLimit: 0,
        openingBalance: 0,
        type: "Retail"
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/customers");
            if (Array.isArray(res.data)) {
                setCustomers(res.data);
                if (res.data.length > 0) {
                    selectCustomer(res.data[0], 0);
                }
            }
        } catch (err) {
            console.error("Error loading customers", err);
            toast.error("Failed to load customer directory.");
        } finally {
            setLoading(false);
        }
    };

    const selectCustomer = (cust, idx) => {
        setSelectedIdx(idx);
        setIsEditMode(false);
        setFormData({
            id: cust.id,
            customerCode: cust.customerCode || "",
            name: cust.name || "",
            mobile: cust.mobile || "",
            phone: cust.phone || "",
            email: cust.email || "",
            place: cust.place || "",
            address: cust.address || "",
            creditLimit: Number(cust.creditLimit) || 0,
            openingBalance: Number(cust.openingBalance) || 0,
            type: cust.type || "Retail"
        });
    };

    // Filter customer list
    const filteredCustomers = customers.filter(c => 
        (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.customerCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.place || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePrev = () => {
        if (selectedIdx > 0) {
            const prevIdx = selectedIdx - 1;
            selectCustomer(filteredCustomers[prevIdx], prevIdx);
        }
    };

    const handleNext = () => {
        if (selectedIdx < filteredCustomers.length - 1) {
            const nextIdx = selectedIdx + 1;
            selectCustomer(filteredCustomers[nextIdx], nextIdx);
        }
    };

    const handleClear = () => {
        setFormData({
            id: null,
            customerCode: "(Auto Generated)",
            name: "",
            mobile: "",
            phone: "",
            email: "",
            place: "",
            address: "",
            creditLimit: 5000,
            openingBalance: 0,
            type: "Retail"
        });
        setSelectedIdx(-1);
        setIsEditMode(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "creditLimit" || name === "openingBalance" ? Number(value) || 0 : value
        }));
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            return toast.warn("Customer Name is required.");
        }

        setSaving(true);
        try {
            if (formData.id) {
                // UPDATE
                await axios.patch(`${import.meta.env.VITE_API_URL}/customers/${formData.id}`, formData);
                toast.success("Customer profile updated successfully! 💾");
            } else {
                // CREATE
                const res = await axios.post(import.meta.env.VITE_API_URL + "/customers", formData);
                toast.success("New Customer profile saved successfully! 🎉");
            }

            // Reload data
            const refreshRes = await axios.get(import.meta.env.VITE_API_URL + "/customers");
            if (Array.isArray(refreshRes.data)) {
                setCustomers(refreshRes.data);
                // Keep selected or select first
                const matchedIdx = refreshRes.data.findIndex(c => c.name === formData.name);
                if (matchedIdx !== -1) {
                    selectCustomer(refreshRes.data[matchedIdx], matchedIdx);
                } else {
                    selectCustomer(refreshRes.data[0], 0);
                }
            }
            setIsEditMode(false);
        } catch (e) {
            console.error("Error saving customer profile", e);
            toast.error("Failed to save customer profiles.");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (selectedIdx !== -1) {
            selectCustomer(filteredCustomers[selectedIdx], selectedIdx);
        } else {
            handleClear();
        }
    };

    return (
        <div className="customer-center-page" style={{ padding: "20px 40px", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
            <ToastContainer position="top-right" autoClose={3000} />
            
            {/* Top Navigation */}
            <div className="cc-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div className="nav-buttons" style={{ display: "flex", gap: "8px" }}>
                    <button 
                        onClick={handlePrev} 
                        disabled={selectedIdx <= 0 || filteredCustomers.length <= 1}
                        style={{ border: "1px solid #cbd5e1", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: "white" }}
                    >
                        &lt; Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={selectedIdx >= filteredCustomers.length - 1 || filteredCustomers.length <= 1}
                        style={{ border: "1px solid #cbd5e1", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: "white" }}
                    >
                        Next &gt;
                    </button>
                    {selectedIdx !== -1 && !isEditMode && (
                        <button 
                            className="edit-btn" 
                            onClick={() => setIsEditMode(true)}
                            style={{ backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <div>
                    {selectedIdx === -1 ? (
                        <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: "700", backgroundColor: "#dbeafe", padding: "4px 10px", borderRadius: "12px" }}>
                            🆕 New Customer Setup
                        </span>
                    ) : (
                        <span style={{ fontSize: "13px", color: "#059669", fontWeight: "700", backgroundColor: "#d1fae5", padding: "4px 10px", borderRadius: "12px" }}>
                            📖 Viewing Profile {formData.customerCode}
                        </span>
                    )}
                </div>

                <div className="action-buttons" style={{ display: "flex", gap: "8px" }}>
                    <button 
                        className="cancel" 
                        onClick={handleCancel}
                        style={{ border: "1px solid #cbd5e1", borderRadius: "20px", padding: "6px 18px", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: "white" }}
                    >
                        Cancel
                    </button>
                    <button 
                        className="clear" 
                        onClick={handleClear}
                        style={{ backgroundColor: "#cbd5e1", color: "#334155", border: "none", borderRadius: "20px", padding: "6px 18px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                    >
                        + New
                    </button>
                    {isEditMode && (
                        <button 
                            className="save" 
                            onClick={handleSave}
                            disabled={saving}
                            style={{ backgroundColor: "black", color: "white", border: "none", borderRadius: "20px", padding: "6px 20px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
                        >
                            {saving ? "Saving..." : "Save Profile"}
                        </button>
                    )}
                </div>
            </div>

            {/* Main Container */}
            <div className="cc-container" style={{ display: "flex", gap: "25px" }}>
                
                {/* LEFT PANEL: Directory Search */}
                <div className="cc-left" style={{ width: "350px", backgroundColor: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#475569", textTransform: "uppercase", fontSize: "13px", fontWeight: "700" }}>
                        Directory Filters
                    </h4>
                    
                    <div className="filters" style={{ marginBottom: "15px" }}>
                        <input 
                            type="text" 
                            placeholder="🔍 Search name, place, code..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
                        />
                    </div>

                    <div className="customer-list" style={{ height: "450px", overflowY: "auto", border: "1px solid #cbd5e1", borderRadius: "10px", margin: 0 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f8fafc" }}>
                                    <th style={{ backgroundColor: "#3b82f6", color: "white", padding: "10px", fontSize: "12px", textAlign: "left" }}>Code</th>
                                    <th style={{ backgroundColor: "#3b82f6", color: "white", padding: "10px", fontSize: "12px", textAlign: "left" }}>Customer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="2" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>Loading list...</td>
                                    </tr>
                                ) : filteredCustomers.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>No records found</td>
                                    </tr>
                                ) : (
                                    filteredCustomers.map((cust, idx) => (
                                        <tr 
                                            key={cust.id} 
                                            onClick={() => selectCustomer(cust, idx)}
                                            style={{ 
                                                cursor: "pointer", 
                                                backgroundColor: selectedIdx === idx ? "#eff6ff" : "white",
                                                borderBottom: "1px solid #f1f5f9"
                                            }}
                                        >
                                            <td style={{ padding: "10px", fontSize: "13px", fontWeight: "700", color: "#1e3a8a" }}>{cust.customerCode}</td>
                                            <td style={{ padding: "10px", fontSize: "13px", color: "#334155" }}>
                                                {cust.name}
                                                {cust.place && <span style={{ fontSize: "11px", color: "#94a3b8", marginLeft: "6px" }}>({cust.place})</span>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT PANEL: Details Panel */}
                <div className="cc-right" style={{ flex: 1, backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "18px", fontWeight: "800", borderBottom: "2px solid #3b82f6", paddingBottom: "10px" }}>
                        👤 Customer Profile Ledger Card
                    </h3>

                    <div className="customer-details" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Customer Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="Enter full name..."
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Customer Code</label>
                            <input 
                                type="text"
                                name="customerCode"
                                value={formData.customerCode}
                                disabled={true}
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px", backgroundColor: "#f1f5f9", fontWeight: "700" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Mobile Number</label>
                            <input 
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="e.g. 9876543210"
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Alternate Phone</label>
                            <input 
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="e.g. 0471-255555"
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Email Address</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="customer@domain.com"
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>City / Place</label>
                            <input 
                                type="text"
                                name="place"
                                value={formData.place}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="e.g. Trivandrum"
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box" style={{ gridColumn: "span 2" }}>
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Full Street Address</label>
                            <textarea 
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="Enter street, block, door details..."
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px", height: "80px", fontFamily: "inherit" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Credit Limit (₹)</label>
                            <input 
                                type="number"
                                name="creditLimit"
                                value={formData.creditLimit}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px", fontWeight: "700" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Opening Balance (₹)</label>
                            <input 
                                type="number"
                                name="openingBalance"
                                value={formData.openingBalance}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px", fontWeight: "700" }}
                            />
                        </div>
                    </div>

                    {isEditMode && (
                        <div style={{ marginTop: "25px", display: "flex", justifyContent: "flex-end" }}>
                            <button 
                                className="update-btn"
                                onClick={handleSave}
                                disabled={saving}
                                style={{
                                    backgroundColor: "#2563eb",
                                    color: "white",
                                    padding: "10px 30px",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 10px rgba(37, 99, 235, 0.2)"
                                }}
                            >
                                {saving ? "Saving..." : "Update Customer Record"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}