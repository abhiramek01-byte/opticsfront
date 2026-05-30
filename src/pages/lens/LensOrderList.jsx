import { useEffect, useState } from "react";
import axios from "axios";
import { FaListAlt, FaSync } from "react-icons/fa";
import "../../styles/LensOrder.css";

export default function LensOrderList() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = () => {
        setLoading(true);
        axios.get(import.meta.env.VITE_API_URL + "/lens-order", {
            headers: {
                "branch-id": localStorage.getItem("branchId") || ""
            }
        })
        .then(res => setOrders(res.data))
        .catch(err => console.error("Error fetching orders:", err))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="lens-page">

            <div className="lens-topbar">
                <h2 className="page-title">
                    <FaListAlt /> Lens Orders
                </h2>
                <div className="action-buttons">
                    <button className="action-btn view" onClick={fetchOrders}>
                        <FaSync /> Refresh
                    </button>
                </div>
            </div>

            <div className="lens-table-container">
                {loading ? (
                    <div className="loading-text">Loading orders...</div>
                ) : (
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Vendor</th>
                                <th>Lens Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                        No lens orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((o) => (
                                    <tr key={o.id}>
                                        <td style={{ fontWeight: 600, color: '#3b82f6' }}>ORD-{String(o.id).padStart(4, '0')}</td>
                                        <td style={{ fontWeight: 500, color: '#1e293b' }}>{o.customerName}</td>
                                        <td>{o.vendor}</td>
                                        <td>{o.lensType}</td>
                                        <td>
                                            <span className={`status-badge ${o.status === 'Received' ? 'received' : 'pending'}`}>
                                                {o.status || "Pending"}
                                            </span>
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