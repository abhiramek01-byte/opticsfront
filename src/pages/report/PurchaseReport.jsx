import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function PurchaseReport() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPurchases = async () => {
            setLoading(true);
            try {
                const res = await fetch(import.meta.env.VITE_API_URL + "/purchase");
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setPurchases(data);
                }
            } catch (err) {
                console.error("Failed to fetch purchase records", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div className="report-page">

            <h2>Purchase History Report</h2>

            <div className="report-table">
                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice No</th>
                            <th>Vendor</th>
                            <th>Items</th>
                            <th>Total Quantity</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>Loading records...</td>
                            </tr>
                        ) : purchases.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No purchase records found.</td>
                            </tr>
                        ) : (
                            purchases.map(purchase => {
                                const totalQty = purchase.items?.reduce((sum, item) => sum + Number(item.quantity), 0) || 0;
                                const itemNames = purchase.items?.map(i => i.product?.productName).join(', ') || "No Items";
                                const netTotal = purchase.items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

                                return (
                                    <tr key={purchase.id}>
                                        <td>{purchase.date ? new Date(purchase.date).toLocaleDateString() : "N/A"}</td>
                                        <td>{purchase.invoiceNo}</td>
                                        <td>{purchase.vendor?.name || "Unknown Vendor"}</td>
                                        <td>{itemNames}</td>
                                        <td>{totalQty}</td>
                                        <td style={{ fontWeight: "bold" }}>₹{netTotal.toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}