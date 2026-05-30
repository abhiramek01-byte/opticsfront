import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/VendorCenter.css";

export default function VendorCenter() {
    const [vendors, setVendors] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        contactPerson: "",
        mobile: "",
        phone: "",
        email: "",
        place: "",
        address: "",
        gstNumber: "",
        tin: "",
        website: "",
        paymentTerms: "",
        creditLimit: 0,
        dueDays: 0,
        openingBalance: 0,
        balanceType: "Debit"
    });

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        setLoading(true);
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/vendors");
            if (Array.isArray(res.data)) {
                setVendors(res.data);
                if (res.data.length > 0) {
                    selectVendor(res.data[0], 0);
                }
            }
        } catch (err) {
            console.error("Error loading vendors", err);
            toast.error("Failed to load vendor directory.");
        } finally {
            setLoading(false);
        }
    };

    const selectVendor = (vend, idx) => {
        setSelectedIdx(idx);
        setIsEditMode(false);
        setFormData({
            id: vend.id,
            name: vend.name || "",
            contactPerson: vend.contactPerson || "",
            mobile: vend.mobile || "",
            phone: vend.phone || "",
            email: vend.email || "",
            place: vend.place || "",
            address: vend.address || "",
            gstNumber: vend.gstNumber || "",
            tin: vend.tin || "",
            website: vend.website || "",
            paymentTerms: vend.paymentTerms || "",
            creditLimit: Number(vend.creditLimit) || 0,
            dueDays: Number(vend.dueDays) || 0,
            openingBalance: Number(vend.openingBalance) || 0,
            balanceType: vend.balanceType || "Debit"
        });
    };

    // Filter vendor list
    const filteredVendors = vendors.filter(v => 
        (v.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.place || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.contactPerson || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePrev = () => {
        if (selectedIdx > 0) {
            const prevIdx = selectedIdx - 1;
            selectVendor(filteredVendors[prevIdx], prevIdx);
        }
    };

    const handleNext = () => {
        if (selectedIdx < filteredVendors.length - 1) {
            const nextIdx = selectedIdx + 1;
            selectVendor(filteredVendors[nextIdx], nextIdx);
        }
    };

    const handleClear = () => {
        setFormData({
            id: null,
            name: "",
            contactPerson: "",
            mobile: "",
            phone: "",
            email: "",
            place: "",
            address: "",
            gstNumber: "",
            tin: "",
            website: "",
            paymentTerms: "",
            creditLimit: 20000,
            dueDays: 30,
            openingBalance: 0,
            balanceType: "Debit"
        });
        setSelectedIdx(-1);
        setIsEditMode(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "creditLimit" || name === "openingBalance" || name === "dueDays" ? Number(value) || 0 : value
        }));
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            return toast.warn("Vendor Name is required.");
        }

        setSaving(true);
        try {
            if (formData.id) {
                // UPDATE
                await axios.patch(`${import.meta.env.VITE_API_URL}/vendors/${formData.id}`, formData);
                toast.success("Vendor profile updated successfully! 💾");
            } else {
                // CREATE
                await axios.post(import.meta.env.VITE_API_URL + "/vendors", formData);
                toast.success("New Vendor profile saved successfully! 🎉");
            }

            // Reload data
            const refreshRes = await axios.get(import.meta.env.VITE_API_URL + "/vendors");
            if (Array.isArray(refreshRes.data)) {
                setVendors(refreshRes.data);
                // Keep selected or select first
                const matchedIdx = refreshRes.data.findIndex(v => v.name === formData.name);
                if (matchedIdx !== -1) {
                    selectVendor(refreshRes.data[matchedIdx], matchedIdx);
                } else {
                    selectVendor(refreshRes.data[0], 0);
                }
            }
            setIsEditMode(false);
        } catch (e) {
            console.error("Error saving vendor profile", e);
            toast.error("Failed to save vendor profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (selectedIdx !== -1) {
            selectVendor(filteredVendors[selectedIdx], selectedIdx);
        } else {
            handleClear();
        }
    };

    return (
        <div className="vendor-center-page" style={{ padding: "20px 40px", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
            <ToastContainer position="top-right" autoClose={3000} />
            
            {/* Top Navigation */}
            <div className="vc-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div className="nav-buttons" style={{ display: "flex", gap: "8px" }}>
                    <button 
                        onClick={handlePrev} 
                        disabled={selectedIdx <= 0 || filteredVendors.length <= 1}
                        style={{ border: "1px solid #cbd5e1", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: "white" }}
                    >
                        &lt; Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={selectedIdx >= filteredVendors.length - 1 || filteredVendors.length <= 1}
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
                            🆕 New Vendor Setup
                        </span>
                    ) : (
                        <span style={{ fontSize: "13px", color: "#059669", fontWeight: "700", backgroundColor: "#d1fae5", padding: "4px 10px", borderRadius: "12px" }}>
                            📖 Viewing Profile {formData.name}
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
            <div className="vc-container" style={{ display: "flex", gap: "25px" }}>
                
                {/* LEFT PANEL: Directory Search */}
                <div className="vc-left" style={{ width: "350px", backgroundColor: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#475569", textTransform: "uppercase", fontSize: "13px", fontWeight: "700" }}>
                        Directory Filters
                    </h4>
                    
                    <div className="filters" style={{ marginBottom: "15px" }}>
                        <input 
                            type="text" 
                            placeholder="🔍 Search name, place, contact..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
                        />
                    </div>

                    <div className="vendor-list" style={{ height: "480px", overflowY: "auto", border: "1px solid #cbd5e1", borderRadius: "10px", margin: 0 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f8fafc" }}>
                                    <th style={{ backgroundColor: "#0284c7", color: "white", padding: "10px", fontSize: "12px", textAlign: "left" }}>Vendor Name</th>
                                    <th style={{ backgroundColor: "#0284c7", color: "white", padding: "10px", fontSize: "12px", textAlign: "left" }}>City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="2" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>Loading list...</td>
                                    </tr>
                                ) : filteredVendors.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>No records found</td>
                                    </tr>
                                ) : (
                                    filteredVendors.map((vend, idx) => (
                                        <tr 
                                            key={vend.id} 
                                            onClick={() => selectVendor(vend, idx)}
                                            style={{ 
                                                cursor: "pointer", 
                                                backgroundColor: selectedIdx === idx ? "#f0f9ff" : "white",
                                                borderBottom: "1px solid #f1f5f9"
                                            }}
                                        >
                                            <td style={{ padding: "10px", fontSize: "13px", fontWeight: "700", color: "#0369a1" }}>{vend.name}</td>
                                            <td style={{ padding: "10px", fontSize: "13px", color: "#475569" }}>
                                                {vend.place || "N/A"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT PANEL: Details Panel */}
                <div className="vc-right" style={{ flex: 1, backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "18px", fontWeight: "800", borderBottom: "2px solid #0284c7", paddingBottom: "10px" }}>
                        🏢 Vendor Profile Card
                    </h3>

                    <div className="vendor-details" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Vendor Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="Enter company name..."
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Contact Person</label>
                            <input 
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="e.g. Sales Manager Name..."
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
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
                                placeholder="e.g. 0471-244444"
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
                                placeholder="vendor@domain.com"
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
                                placeholder="e.g. Cochin"
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
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>GST Number</label>
                            <input 
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="32AAAAA0000A1Z0"
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            />
                        </div>

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>TIN Number</label>
                            <input 
                                type="text"
                                name="tin"
                                value={formData.tin}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                placeholder="Enter TIN number..."
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
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
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Due Days limit</label>
                            <input 
                                type="number"
                                name="dueDays"
                                value={formData.dueDays}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
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

                        <div className="detail-box">
                            <label style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "5px" }}>Balance Flow</label>
                            <select 
                                name="balanceType"
                                value={formData.balanceType}
                                onChange={handleFormChange}
                                disabled={!isEditMode}
                                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13.5px" }}
                            >
                                <option value="Debit">Debit (Dr)</option>
                                <option value="Credit">Credit (Cr)</option>
                            </select>
                        </div>
                    </div>

                    {isEditMode && (
                        <div style={{ marginTop: "25px", display: "flex", justifyContent: "flex-end" }}>
                            <button 
                                className="update-btn"
                                onClick={handleSave}
                                disabled={saving}
                                style={{
                                    backgroundColor: "#0284c7",
                                    color: "white",
                                    padding: "10px 30px",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 10px rgba(2, 132, 199, 0.2)"
                                }}
                            >
                                {saving ? "Saving..." : "Update Vendor Record"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}