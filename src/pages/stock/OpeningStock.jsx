import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Transaction.css";

export default function OpeningStock() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/stock/getAll")
            .then(res => {
                const openingStockData = (res.data.result || []).filter(item => item.vendor === 'Opening Stock');
                setItems(openingStockData);
                console.log("fetched:", openingStockData);
            })
            .catch(err => console.log(err));
    }, []);

    const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalValue = items.reduce(
        (sum, item) => sum + (item.quantity || 0) * (item.product?.rate || 0),
        0
    );

    return (
        <div className="transaction-container">

            <div className="transaction-header">
                <h2>Opening Stock Report</h2>

                <div className="transaction-buttons">
                    <button className="btn-secondary" onClick={() => window.print()}>
                        Print Report
                    </button>
                    <button className="btn-primary" onClick={() => alert("Exported to Excel")}>
                        Export Data
                    </button>
                </div>
            </div>

            <div className="transaction-card">

                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Product / Lens</th>
                            <th style={{ width: '30%' }}>Vendor</th>
                            <th style={{ width: '15%', textAlign: 'right' }}>Rate (₹)</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Qty</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                    No opening stock found.
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 500 }}>{item.product?.productName || "-"}</td>
                                    <td>{item.vendor || "-"}</td>
                                    <td style={{ textAlign: 'right', color: '#0f172a' }}>
                                        {item.product?.rate ? item.product.rate.toFixed(2) : "0.00"}
                                    </td>
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        <span style={{ 
                                            background: '#f1f5f9', 
                                            padding: '4px 12px', 
                                            borderRadius: '20px',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            {item.quantity}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

            <div className="transaction-summary">
                <div className="summary-item">
                    <span className="summary-label">Total Qty</span>
                    <span className="summary-value" style={{ color: '#bae6fd' }}>{totalQty}</span>
                </div>
                <div className="summary-item" style={{ paddingLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
                    <span className="summary-label">Total Value</span>
                    <span className="summary-value">₹ {totalValue.toFixed(2)}</span>
                </div>
            </div>

        </div>
    );
}