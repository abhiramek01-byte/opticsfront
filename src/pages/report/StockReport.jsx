import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function StockReport() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editQuantity, setEditQuantity] = useState("");

    const fetchStock = async () => {
        setLoading(true);
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/stock/getAll", {
                headers: {
                    "branch-id": localStorage.getItem("branchId") || ""
                }
            });
            const data = await res.json();
            
            if (data && Array.isArray(data.result)) {
                setStocks(data.result);
            }
        } catch (err) {
            console.error("Failed to fetch stock records", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStock();
    }, []);

    const handleStartEdit = (id, currentQty) => {
        setEditingId(id);
        setEditQuantity(String(currentQty));
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditQuantity("");
    };

    const handleSaveEdit = async (id) => {
        if (editQuantity === "" || isNaN(Number(editQuantity)) || Number(editQuantity) < 0) {
            alert("Please enter a valid, non-negative quantity.");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/stock/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "branch-id": localStorage.getItem("branchId") || ""
                },
                body: JSON.stringify({ quantity: Number(editQuantity) })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to update stock quantity.");
            }

            alert("Stock quantity updated successfully! ✅");
            setEditingId(null);
            setEditQuantity("");
            fetchStock();
        } catch (err) {
            console.error(err);
            alert(`Error updating stock quantity: ${err.message || err} ❌`);
        }
    };

    const getStatus = (quantity) => {
        if (quantity <= 0) return { label: "Out of Stock", class: "red" };
        if (quantity <= 10) return { label: "Low Stock", class: "orange" }; // Arbitrary threshold
        return { label: "In Stock", class: "green" };
    };

    return (
        <div className="report-page">

            <h2>Stock Inventory Report</h2>

            <div className="report-table">
                <table>

                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Stock Quantity</th>
                            <th>Status</th>
                            <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>Loading records...</td>
                            </tr>
                        ) : stocks.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No stock records found.</td>
                            </tr>
                        ) : (
                            stocks.map(item => {
                                const status = getStatus(item.quantity);
                                const isEditing = editingId === item.id;
                                return (
                                    <tr key={item.id}>
                                        <td>{item.product?.productName || "Unknown Product"}</td>
                                        <td>{item.product?.brand || "N/A"}</td>
                                        <td>{item.product?.category || "N/A"}</td>
                                        
                                        <td>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editQuantity}
                                                    onChange={(e) => setEditQuantity(e.target.value)}
                                                    style={{
                                                        width: "90px",
                                                        padding: "6px 10px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #cbd5e1",
                                                        outline: "none",
                                                        fontWeight: "bold",
                                                        color: "#1e293b",
                                                        textAlign: "center"
                                                    }}
                                                />
                                            ) : (
                                                <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                                            )}
                                        </td>
                                        
                                        <td className={status.class}>{status.label}</td>
                                        
                                        <td style={{ textAlign: "center" }}>
                                            {isEditing ? (
                                                <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'center' }}>
                                                    <button
                                                        onClick={() => handleSaveEdit(item.id)}
                                                        style={{
                                                            padding: "6px 12px",
                                                            fontSize: "0.85rem",
                                                            background: "#10b981",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        style={{
                                                            padding: "6px 12px",
                                                            fontSize: "0.85rem",
                                                            border: "1px solid #cbd5e1",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            fontWeight: "600",
                                                            background: "white",
                                                            color: "#64748b"
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleStartEdit(item.id, item.quantity)}
                                                    style={{
                                                        padding: "6px 12px",
                                                        fontSize: "0.85rem",
                                                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                                                        color: "#3b82f6",
                                                        border: "1px solid rgba(59, 130, 246, 0.2)",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontWeight: "600",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                >
                                                    ✏️ Edit Qty
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}