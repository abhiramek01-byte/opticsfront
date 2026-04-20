import "../../styles/CustomerHistory.css";
import { useState, useEffect } from "react";

export default function CustomerHistory() {
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const [salesRes, ordersRes] = await Promise.all([
                    fetch("http://localhost:3000/sales"),
                    fetch("http://localhost:3000/sales-order")
                ]);

                const salesData = await salesRes.json();
                const ordersData = await ordersRes.json();

                const combinedHistory = [];

                // Process Completed Sales
                if (Array.isArray(salesData)) {
                    salesData.forEach(sale => {
                        const custName = sale.customer?.name || "Walk-in";
                        const custPhone = sale.customer?.phone || "N/A";
                        const date = new Date(sale.saleDate).toLocaleDateString();

                        sale.items?.forEach(item => {
                            combinedHistory.push({
                                id: `sale-${sale.id}-${item.id}`,
                                customer: custName,
                                phone: custPhone,
                                product: item.product?.productName || "Unknown",
                                power: "N/A", // Prescription power logic can be joined here later
                                date: date,
                                status: "Delivered",
                                timestamp: new Date(sale.saleDate).getTime()
                            });
                        });
                    });
                }

                // Process Sales Orders (Pending / Processing)
                if (Array.isArray(ordersData)) {
                    ordersData.forEach(order => {
                        const custName = order.customer?.name || "Walk-in";
                        const custPhone = order.customer?.phone || "N/A";
                        const date = new Date(order.orderDate || order.date).toLocaleDateString(); // depending on entity field
                        
                        // we shouldn't duplicate completed orders if they are inherently fetched by sales, but for demonstration:
                        if (order.status !== 'Completed') {
                            order.items?.forEach(item => {
                                combinedHistory.push({
                                    id: `order-${order.id}-${item.id}`,
                                    customer: custName,
                                    phone: custPhone,
                                    product: item.product?.productName || "Unknown",
                                    power: "N/A",
                                    date: date,
                                    status: order.status || "Pending",
                                    timestamp: new Date(order.orderDate || order.date).getTime()
                                });
                            });
                        }
                    });
                }

                // Sort descending by date
                combinedHistory.sort((a, b) => b.timestamp - a.timestamp);
                setHistory(combinedHistory);

            } catch (err) {
                console.error("Failed to fetch customer history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredHistory = history.filter(item =>
        item.phone.includes(search) || item.customer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="history-page">

            <h1>Customer History</h1>

            {/* SEARCH BOX */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by phone number or name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="history-table">

                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Product</th>
                        <th>Power</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Loading records...</td>
                        </tr>
                    ) : filteredHistory.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>No records found.</td>
                        </tr>
                    ) : (
                        filteredHistory.map((item) => (
                            <tr key={item.id}>
                                <td>{item.customer}</td>
                                <td>{item.phone}</td>
                                <td>{item.product}</td>
                                <td>{item.power}</td>
                                <td>{item.date}</td>
                                <td className={`status ${item.status === 'Delivered' ? 'green' : 'orange'}`} style={{ color: item.status === 'Delivered' ? '#4CAF50' : '#FF9800', fontWeight: 'bold' }}>
                                    {item.status}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>

        </div>
    );
}