import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function SalesReport() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSales = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:3000/sales/report");
                const data = await res.json();
                
                if (data.sales && Array.isArray(data.sales)) {
                    setSales(data.sales);
                }
            } catch (err) {
                console.error("Failed to fetch sales records", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    return (
        <div className="report-page">

            <h2>Sales Performance Report</h2>

            <div className="report-table">
                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Branch</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>Loading records...</td>
                            </tr>
                        ) : sales.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No sales records found.</td>
                            </tr>
                        ) : (
                            sales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                    <td>{sale.invoiceNo}</td>
                                    <td>{sale.customer?.name || "Walk-in"}</td>
                                    <td>Central {/* Assuming Central unless Branch logic exists */}</td>
                                    <td style={{ fontWeight: "bold" }}>₹{Number(sale.netTotal || sale.total).toFixed(2)}</td>
                                    <td className="green">Paid</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}