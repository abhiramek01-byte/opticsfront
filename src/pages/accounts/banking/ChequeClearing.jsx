import { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Banking.css";

export default function ChequeClearing() {
    const [cheques, setCheques] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("Pending");

    const fetchCheques = () => {
        setLoading(true);
        axios.get(import.meta.env.VITE_API_URL + "/banking/cheques", {
            headers: {
                "branch-id": localStorage.getItem("branchId") || ""
            }
        })
            .then(res => {
                setCheques(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCheques();
    }, []);

    const handleClearCheque = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/banking/cheques/${id}/status`, {
                status: "Cleared"
            });
            alert("Cheque cleared successfully! ✅");
            fetchCheques();
        } catch (err) {
            console.error(err);
            alert("Error clearing cheque ❌");
        }
    };

    const handleBounceCheque = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/banking/cheques/${id}/status`, {
                status: "Dishonoured"
            });
            alert("Cheque marked as Dishonoured! ❌");
            fetchCheques();
        } catch (err) {
            console.error(err);
            alert("Error bouncing cheque ❌");
        }
    };

    const filteredCheques = cheques.filter(c => {
        if (statusFilter === "(All)") return true;
        return c.status === statusFilter;
    });

    return (
        <div className="bank-page">

            <div className="bank-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, color: "#1e293b" }}>Cheque Clearing Center</h2>
                <div>
                    <button onClick={fetchCheques} style={{ padding: "6px 16px", borderRadius: "20px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer", fontWeight: "600" }}>
                        🔄 Refresh List
                    </button>
                </div>
            </div>

            <div className="bank-filter" style={{ display: "flex", gap: "15px", alignItems: "center", background: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                <label style={{ fontWeight: "600", color: "#475569" }}>Status Filter:</label>
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
                >
                    <option value="Pending">Pending Clearance</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Dishonoured">Dishonoured</option>
                    <option value="(All)">(All Cheques)</option>
                </select>
            </div>

            <div className="bank-table" style={{ background: "white", padding: "20px", borderRadius: "8px" }}>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                            <th style={{ padding: "12px", textAlign: "left" }}>Cheque No</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Bank Name</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Transaction Type</th>
                            <th style={{ padding: "12px", textAlign: "right" }}>Amount</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Cheque Date</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>Loading cheques...</td>
                            </tr>
                        ) : filteredCheques.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                    No cheques found matching "{statusFilter}".
                                </td>
                            </tr>
                        ) : (
                            filteredCheques.map((c) => (
                                <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "12px", fontWeight: "bold", fontFamily: "monospace" }}>{c.chequeNo}</td>
                                    <td style={{ padding: "12px", color: "#475569" }}>{c.bankName}</td>
                                    <td style={{ padding: "12px" }}>
                                        <span style={{
                                            padding: "2px 8px",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            background: c.type === "Receipt" ? "#dcfce7" : "#fee2e2",
                                            color: c.type === "Receipt" ? "#15803d" : "#b91c1c"
                                        }}>{c.type === "Receipt" ? "Incoming (Receipt)" : "Outgoing (Payment)"}</span>
                                    </td>
                                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>
                                        ₹ {Number(c.amount).toFixed(2)}
                                    </td>
                                    <td style={{ padding: "12px", textAlign: "center", color: "#64748b" }}>
                                        {new Date(c.date).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>
                                        <span style={{
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            background: c.status === "Cleared" ? "#dcfce7" : c.status === "Pending" ? "#fef3c7" : "#fee2e2",
                                            color: c.status === "Cleared" ? "#166534" : c.status === "Pending" ? "#b45309" : "#991b1b"
                                        }}>{c.status}</span>
                                    </td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>
                                        {c.status === "Pending" ? (
                                            <div style={{ display: "inline-flex", gap: "8px" }}>
                                                <button 
                                                    onClick={() => handleClearCheque(c.id)}
                                                    style={{ padding: "4px 10px", fontSize: "0.8rem", background: "#10b981", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                                                >
                                                    ✔ Clear
                                                </button>
                                                <button 
                                                    onClick={() => handleBounceCheque(c.id)}
                                                    style={{ padding: "4px 10px", fontSize: "0.8rem", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                                                >
                                                    Bounced
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontStyle: "italic" }}>Processed</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

        </div>
    );
}