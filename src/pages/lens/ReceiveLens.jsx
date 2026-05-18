import { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaCheckCircle, FaSync } from "react-icons/fa";
import "../../styles/LensOrder.css";

export default function ReceiveLens() {

    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Load pending orders from backend
    const fetchPendingOrders = () => {
        setLoading(true);
        axios.get("http://localhost:3000/lens-order", {
            headers: {
                "branch-id": localStorage.getItem("branchId") || ""
            }
        })
        .then(res => {
            // Only show NOT received orders
            const pending = res.data.filter(o => o.status !== "Received");

            setDeliveries(pending.map(o => ({
                id: o.id,
                customer: o.customerName,
                lens: o.lensType,
                vendor: o.vendor
            })));
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    // 🔹 Handle Receive Button
    const handleReceive = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/lens-order/receive/${id}`, {}, {
                headers: {
                    "branch-id": localStorage.getItem("branchId") || ""
                }
            });

            alert("Added to stock ✅");

            // Remove from UI (no reload needed)
            setDeliveries(prev => prev.filter(item => item.id !== id));

        } catch (err) {
            console.error(err);
            alert("Failed to receive lens ❌");
        }
    };

    return (
        <div className="lens-page">

            <div className="lens-topbar">
                <h2 className="page-title">
                    <FaBoxOpen /> Receive Lens
                </h2>
                <div className="action-buttons">
                    <button className="action-btn view" onClick={fetchPendingOrders}>
                        <FaSync /> Refresh
                    </button>
                </div>
            </div>

            <div className="lens-table-container">
                {loading ? (
                    <div className="loading-text">Loading pending orders...</div>
                ) : (
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Lens Type</th>
                                <th>Vendor</th>
                                <th style={{ textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        No pending lens deliveries.
                                    </td>
                                </tr>
                            ) : (
                                deliveries.map((d) => (
                                    <tr key={d.id}>
                                        <td style={{ fontWeight: 600, color: '#3b82f6' }}>ORD-{String(d.id).padStart(4, '0')}</td>
                                        <td style={{ fontWeight: 500, color: '#1e293b' }}>{d.customer}</td>
                                        <td>{d.lens}</td>
                                        <td>{d.vendor}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button
                                                className="receive-btn"
                                                onClick={() => handleReceive(d.id)}
                                                style={{ marginLeft: 'auto' }}
                                            >
                                                <FaCheckCircle /> Receive & Add to Stock
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}