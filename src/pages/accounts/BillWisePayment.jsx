import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/BillWisePayment.css";

export default function BillWisePayment() {
    const todayStr = new Date().toISOString().split('T')[0];

    const initialFormState = {
        voucherNo: "",
        refNo: "",
        date: todayStr,
        creditorAccount: "CASH IN HAND",
        chequeNo: "",
        chequeDate: "",
        vendorId: "",
        amount: 0,
        advance: 0,
        description: ""
    };

    const [formData, setFormData] = useState(initialFormState);
    const [vendors, setVendors] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [allPurchases, setAllPurchases] = useState([]);
    const [bwpPayments, setBwpPayments] = useState([]);
    
    // View/Create States
    const [currentVoucherIndex, setCurrentVoucherIndex] = useState(-1); // -1 means new voucher
    const [isEditMode, setIsEditMode] = useState(true);
    const [paymentsMap, setPaymentsMap] = useState({}); // invoiceNo -> amountPaid
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Load initial lookup directories
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Vendors
                const vendorsRes = await axios.get(import.meta.env.VITE_API_URL + "/vendors");
                if (Array.isArray(vendorsRes.data)) {
                    setVendors(vendorsRes.data);
                }

                // 2. Fetch Accounts
                const accountsRes = await axios.get(import.meta.env.VITE_API_URL + "/account");
                if (Array.isArray(accountsRes.data)) {
                    setAccounts(accountsRes.data);
                }

                // 3. Fetch Purchases
                const purchasesRes = await axios.get(import.meta.env.VITE_API_URL + "/purchase");
                if (Array.isArray(purchasesRes.data)) {
                    setAllPurchases(purchasesRes.data);
                }

                // 4. Fetch existing BWP Vouchers for navigation
                await fetchBwpVouchers();
            } catch (err) {
                console.error("Error fetching initial BWP datasets", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const fetchBwpVouchers = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/bill-wise-payment");
            if (Array.isArray(res.data)) {
                setBwpPayments(res.data);
            }
        } catch (e) {
            console.error("Error loading BWP history", e);
        }
    };

    // Calculate previous payments for an invoice from all BWP vouchers (except the currently selected one to avoid double counting)
    const getPreviouslyPaid = (invoiceNo, excludeBwpId = null) => {
        let totalPaid = 0;
        bwpPayments.forEach(bwp => {
            if (excludeBwpId && bwp.id === excludeBwpId) return;
            if (bwp.billAllocations) {
                try {
                    const allocations = JSON.parse(bwp.billAllocations);
                    const match = allocations.find(a => a.invoiceNo === invoiceNo);
                    if (match) {
                        totalPaid += Number(match.amountPaid) || 0;
                    }
                } catch (e) {}
            }
        });
        return totalPaid;
    };

    // Filter purchases belonging to the selected vendor
    const activeVendorPurchases = allPurchases.filter(p => {
        if (!formData.vendorId) return false;
        return p.vendor && p.vendor.id === Number(formData.vendorId);
    });

    const handleFormChange = (field, val) => {
        setFormData(prev => ({
            ...prev,
            [field]: val
        }));

        if (field === "vendorId") {
            setPaymentsMap({});
            setFormData(prev => ({ ...prev, amount: 0, advance: 0 }));
        }
    };

    const handleAmountChange = (invoiceNo, val, balance) => {
        let numVal = parseFloat(val) || 0;
        if (numVal < 0) numVal = 0;
        if (numVal > balance) numVal = balance; // Cap at balance amount

        const newMap = {
            ...paymentsMap,
            [invoiceNo]: numVal
        };
        setPaymentsMap(newMap);

        // Auto sum all allocated amounts to fill the main "Amount" field
        const sumAllocated = Object.values(newMap).reduce((s, v) => s + v, 0);
        setFormData(prev => ({
            ...prev,
            amount: sumAllocated
        }));
    };

    const handleClear = () => {
        setFormData(initialFormState);
        setPaymentsMap({});
        setCurrentVoucherIndex(-1);
        setIsEditMode(true);
    };

    const handleCancel = () => {
        if (currentVoucherIndex !== -1) {
            loadVoucher(currentVoucherIndex);
        } else {
            handleClear();
        }
    };

    const handleSave = async () => {
        if (!formData.vendorId) {
            return alert("Please select a Vendor first.");
        }
        if (formData.amount <= 0 && formData.advance <= 0) {
            return alert("Please enter payment allocations or advance amount.");
        }

        setSaving(true);
        try {
            // Package allocations as JSON string
            const allocations = Object.entries(paymentsMap)
                .filter(([_, amt]) => amt > 0)
                .map(([invoiceNo, amt]) => ({ invoiceNo, amountPaid: amt }));

            const payload = {
                ...formData,
                vendorId: Number(formData.vendorId),
                amount: Number(formData.amount),
                advance: Number(formData.advance),
                billAllocations: JSON.stringify(allocations)
            };

            const res = await axios.post(import.meta.env.VITE_API_URL + "/bill-wise-payment", payload);
            alert(`✅ Bill-Wise Payment voucher saved successfully!\nGenerated No: ${res.data.voucherNo}`);
            
            // Reload BWP list and load the newly created voucher in view mode
            const refreshRes = await axios.get(import.meta.env.VITE_API_URL + "/bill-wise-payment");
            if (Array.isArray(refreshRes.data)) {
                setBwpPayments(refreshRes.data);
                
                // Find index of saved voucher
                const newIdx = refreshRes.data.findIndex(v => v.id === res.data.id);
                if (newIdx !== -1) {
                    // Update index and set to view-only mode
                    setCurrentVoucherIndex(newIdx);
                    setIsEditMode(false);
                    
                    // Set detailed form data
                    setFormData({
                        voucherNo: res.data.voucherNo,
                        refNo: res.data.refNo || "",
                        date: res.data.date,
                        creditorAccount: res.data.creditorAccount || "CASH IN HAND",
                        chequeNo: res.data.chequeNo || "",
                        chequeDate: res.data.chequeDate || "",
                        vendorId: res.data.vendor?.id || "",
                        amount: Number(res.data.amount) || 0,
                        advance: Number(res.data.advance) || 0,
                        description: res.data.description || ""
                    });

                    // Build allocations map
                    const savedAllocations = res.data.billAllocations ? JSON.parse(res.data.billAllocations) : [];
                    const map = {};
                    savedAllocations.forEach(a => {
                        map[a.invoiceNo] = Number(a.amountPaid);
                    });
                    setPaymentsMap(map);
                } else {
                    handleClear();
                }
            } else {
                handleClear();
            }
        } catch (err) {
            console.error("Error saving BWP voucher", err);
            alert("❌ Failed to save Bill-Wise Payment. Please check inputs and try again.");
        } finally {
            setSaving(false);
        }
    };

    const loadVoucher = (index) => {
        if (index < 0 || index >= bwpPayments.length) return;
        
        const voucher = bwpPayments[index];
        setCurrentVoucherIndex(index);
        setIsEditMode(false);

        setFormData({
            voucherNo: voucher.voucherNo || "",
            refNo: voucher.refNo || "",
            date: voucher.date,
            creditorAccount: voucher.creditorAccount || "CASH IN HAND",
            chequeNo: voucher.chequeNo || "",
            chequeDate: voucher.chequeDate || "",
            vendorId: voucher.vendor?.id || "",
            amount: Number(voucher.amount) || 0,
            advance: Number(voucher.advance) || 0,
            description: voucher.description || ""
        });

        // Load bill allocations mapping
        const allocations = voucher.billAllocations ? JSON.parse(voucher.billAllocations) : [];
        const map = {};
        allocations.forEach(a => {
            map[a.invoiceNo] = Number(a.amountPaid);
        });
        setPaymentsMap(map);
    };

    const handlePrev = () => {
        if (bwpPayments.length === 0) return;
        const nextIdx = currentVoucherIndex === -1 ? 0 : Math.min(bwpPayments.length - 1, currentVoucherIndex + 1);
        loadVoucher(nextIdx);
    };

    const handleNext = () => {
        if (currentVoucherIndex <= 0) {
            // Go to new blank voucher
            handleClear();
        } else {
            loadVoucher(currentVoucherIndex - 1);
        }
    };

    return (
        <div className="bill-page" style={{ padding: "20px 40px", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
            
            {/* Top Navigation */}
            <div className="bill-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                
                <div className="nav-buttons" style={{ display: "flex", gap: "8px" }}>
                    <button 
                        onClick={handlePrev} 
                        disabled={bwpPayments.length === 0 || currentVoucherIndex === bwpPayments.length - 1}
                        style={{ border: "1px solid #cbd5e1", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: "white" }}
                    >
                        ◀ Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={currentVoucherIndex === -1}
                        style={{ border: "1px solid #cbd5e1", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: "white" }}
                    >
                        Next ▶
                    </button>
                    {currentVoucherIndex !== -1 && !isEditMode && (
                        <button 
                            className="edit-btn" 
                            onClick={() => setIsEditMode(true)}
                            style={{ backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                        >
                            Edit
                        </button>
                    )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {currentVoucherIndex === -1 ? (
                        <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: "700", backgroundColor: "#dbeafe", padding: "4px 10px", borderRadius: "12px" }}>
                            🆕 New Voucher Mode
                        </span>
                    ) : (
                        <span style={{ fontSize: "13px", color: "#059669", fontWeight: "700", backgroundColor: "#d1fae5", padding: "4px 10px", borderRadius: "12px" }}>
                            📖 Viewing Voucher {formData.voucherNo}
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
                        style={{ backgroundColor: "#e2e8f0", color: "#334155", border: "none", borderRadius: "20px", padding: "6px 18px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                    >
                        Clear
                    </button>
                    {isEditMode && (
                        <button 
                            className="save" 
                            onClick={handleSave}
                            disabled={saving}
                            style={{ backgroundColor: "black", color: "white", border: "none", borderRadius: "20px", padding: "6px 20px", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
                        >
                            {saving ? "Saving..." : "Save Voucher 💾"}
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "60px", color: "#64748b", fontWeight: "600" }}>
                    Loading financial ledger directories...
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    
                    {/* Header Form */}
                    <div className="bill-form" style={{ backgroundColor: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" }}>
                        
                        {/* Row 1 */}
                        <div className="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "20px" }}>
                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Voucher No</label>
                                <input 
                                    value={formData.voucherNo} 
                                    disabled={true} 
                                    placeholder="BWP-XXXX (Auto Generated)"
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", backgroundColor: "#f1f5f9" }}
                                />
                            </div>

                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Ref No.</label>
                                <input 
                                    value={formData.refNo} 
                                    onChange={(e) => handleFormChange("refNo", e.target.value)}
                                    disabled={!isEditMode}
                                    placeholder="Enter reference number..."
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
                                />
                            </div>

                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Voucher Date</label>
                                <input 
                                    type="date" 
                                    value={formData.date} 
                                    onChange={(e) => handleFormChange("date", e.target.value)}
                                    disabled={!isEditMode}
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="row" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "24px", marginBottom: "20px" }}>
                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Creditor Ledger Account</label>
                                <select 
                                    value={formData.creditorAccount} 
                                    onChange={(e) => handleFormChange("creditorAccount", e.target.value)}
                                    disabled={!isEditMode}
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}
                                >
                                    <option value="CASH IN HAND">CASH IN HAND</option>
                                    {accounts.map(acc => (
                                        <option key={acc.id} value={acc.name}>{acc.name} ({acc.subGroup || 'Ledger'})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Cheque / Ref No.</label>
                                <input 
                                    value={formData.chequeNo} 
                                    onChange={(e) => handleFormChange("chequeNo", e.target.value)}
                                    disabled={!isEditMode}
                                    placeholder="Enter Cheque/Transaction ID..."
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
                                />
                            </div>

                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Cheque Date</label>
                                <input 
                                    type="date" 
                                    value={formData.chequeDate} 
                                    onChange={(e) => handleFormChange("chequeDate", e.target.value)}
                                    disabled={!isEditMode}
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
                                />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="row" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "24px", marginBottom: "20px" }}>
                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Vendor (Payee)</label>
                                <select 
                                    value={formData.vendorId} 
                                    onChange={(e) => handleFormChange("vendorId", e.target.value)}
                                    disabled={!isEditMode}
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}
                                >
                                    <option value="">-- Choose Vendor from Directory --</option>
                                    {vendors.map(v => (
                                        <option key={v.id} value={v.id}>{v.name} {v.place ? `(${v.place})` : ""}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Voucher Amount (₹)</label>
                                <input 
                                    type="number"
                                    value={formData.amount} 
                                    disabled={true} 
                                    placeholder="0"
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", fontWeight: "700", backgroundColor: "#f8fafc" }}
                                />
                            </div>

                            <div className="field">
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Advance Payment (₹)</label>
                                <input 
                                    type="number"
                                    value={formData.advance} 
                                    onChange={(e) => handleFormChange("advance", parseFloat(e.target.value) || 0)}
                                    disabled={!isEditMode}
                                    placeholder="0"
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", fontWeight: "600" }}
                                />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="row" style={{ display: "flex", gap: "24px" }}>
                            <div className="field" style={{ width: "100%" }}>
                                <label style={{ fontSize: "12.5px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Description / Remarks</label>
                                <input 
                                    value={formData.description} 
                                    onChange={(e) => handleFormChange("description", e.target.value)}
                                    disabled={!isEditMode}
                                    placeholder="Enter payment voucher notes..."
                                    style={{ padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bill-table-container" style={{ backgroundColor: "white", padding: "25px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #e2e8f0" }}>
                        <h4 style={{ margin: "0 0 15px 0", color: "#334155", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Pending Invoice Allocation Details
                        </h4>

                        <table className="bill-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f8fafc" }}>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "left", color: "#475569", fontWeight: "700" }}>Invoice No</th>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "left", color: "#475569", fontWeight: "700" }}>Date</th>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "left", color: "#475569", fontWeight: "700" }}>VType</th>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "right", color: "#475569", fontWeight: "700" }}>Bill Amount</th>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "right", color: "#475569", fontWeight: "700" }}>Paid Amt</th>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "right", color: "#475569", fontWeight: "700" }}>Current Balance</th>
                                    <th style={{ padding: "12px 14px", borderBottom: "2px solid #cbd5e1", textAlign: "center", color: "#475569", fontWeight: "700", width: "180px" }}>Amount to Pay (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeVendorPurchases.map((purchase) => {
                                    // Sum purchase item amounts to get bill grand total
                                    const billTotal = purchase.items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
                                    
                                    // Calculate previously paid allocations excluding the currently viewed voucher to prevent self-subtraction
                                    const excludeId = currentVoucherIndex !== -1 ? bwpPayments[currentVoucherIndex]?.id : null;
                                    const previouslyPaid = getPreviouslyPaid(purchase.invoiceNo, excludeId);
                                    const balance = Math.max(0, billTotal - previouslyPaid);
                                    
                                    // Track payment input value
                                    const toPayValue = paymentsMap[purchase.invoiceNo] || "";

                                    return (
                                        <tr key={purchase.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                            <td style={{ padding: "12px 14px", fontWeight: "700", color: "#1e3a8a" }}>{purchase.invoiceNo}</td>
                                            <td style={{ padding: "12px 14px", color: "#334155" }}>{new Date(purchase.date).toLocaleDateString()}</td>
                                            <td style={{ padding: "12px 14px", color: "#64748b" }}>Purchase</td>
                                            <td style={{ padding: "12px 14px", textAlign: "right", fontWeight: "600", color: "#334155" }}>₹{billTotal.toLocaleString()}</td>
                                            <td style={{ padding: "12px 14px", textAlign: "right", color: "#059669", fontWeight: "600" }}>₹{previouslyPaid.toLocaleString()}</td>
                                            <td style={{ padding: "12px 14px", textAlign: "right", color: balance > 0 ? "#ef4444" : "#64748b", fontWeight: "700" }}>
                                                ₹{balance.toLocaleString()}
                                            </td>
                                            <td style={{ padding: "8px 14px", textAlign: "center" }}>
                                                <input 
                                                    type="number"
                                                    value={toPayValue}
                                                    onChange={(e) => handleAmountChange(purchase.invoiceNo, e.target.value, balance)}
                                                    disabled={!isEditMode || balance === 0}
                                                    placeholder={balance === 0 ? "Fully Settled" : "Enter allocation..."}
                                                    style={{
                                                        width: "100%",
                                                        padding: "6px 10px",
                                                        fontSize: "13.5px",
                                                        textAlign: "right",
                                                        border: "1px solid #cbd5e1",
                                                        borderRadius: "6px",
                                                        backgroundColor: balance === 0 ? "#f1f5f9" : "white",
                                                        fontWeight: "700",
                                                        color: "#0f172a"
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}

                                {activeVendorPurchases.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontStyle: "italic", fontSize: "14px" }}>
                                            {!formData.vendorId 
                                                ? "⚠️ Select a Payee Vendor above to view pending purchase invoices." 
                                                : "🎉 No pending purchase invoices found for this Vendor."
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}
        </div>
    );
}