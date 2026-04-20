import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function StockReport() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStock = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:3000/stock");
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setStocks(data);
                }
            } catch (err) {
                console.error("Failed to fetch stock records", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStock();
    }, []);

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
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>Loading records...</td>
                            </tr>
                        ) : stocks.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No stock records found.</td>
                            </tr>
                        ) : (
                            stocks.map(item => {
                                const status = getStatus(item.quantity);
                                return (
                                    <tr key={item.id}>
                                        <td>{item.product?.productName || "Unknown Product"}</td>
                                        <td>{/* Real backend doesn't have Brand on Product entity explicitly yet, using placeholder or map if added later */} N/A</td>
                                        <td>{item.product?.categoryId || "N/A"}</td>
                                        <td style={{ fontWeight: "bold" }}>{item.quantity}</td>
                                        <td className={status.class}>{status.label}</td>
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