import { useEffect, useState } from "react";
import "../../styles/MIS.css";
import axios from 'axios';

export default function BillWiseProfit() {
    const [data, setData] = useState({ stats: null, bills: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfitData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/reports/mis/bill-wise-profit');
                setData(response.data);
            } catch (err) {
                console.error("Error fetching bill-wise profit", err);
                setError("Failed to load profit data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfitData();
    }, []);

    if (loading) {
        return (
            <div className="mis-loading">
                <div className="spinner"></div> Loading Profit Analysis...
            </div>
        );
    }

    if (error) {
        return <div className="mis-loading" style={{ color: '#e11d48' }}>{error}</div>;
    }

    const { stats, bills } = data;

    return (
        <div className="mis-container">
            <div className="mis-header">
                <h1>Bill-Wise Profit Analysis</h1>
            </div>

            {/* Top Stats */}
            <div className="mis-cards">
                <div className="mis-card">
                    <h4>Total Revenue</h4>
                    <h2>₹{Number(stats?.totalRevenue || 0).toLocaleString()}</h2>
                    <p>Total sales generated</p>
                </div>
                <div className="mis-card">
                    <h4>Total Cost</h4>
                    <h2>₹{Number(stats?.totalCost || 0).toLocaleString()}</h2>
                    <p style={{ color: '#64748b' }}>Inventory item costs</p>
                </div>
                <div className="mis-card">
                    <h4>Gross Profit</h4>
                    <h2>₹{Number(stats?.grossProfit || 0).toLocaleString()}</h2>
                    <p className={stats?.grossProfit >= 0 ? '' : 'loss'}>
                        {stats?.grossProfit >= 0 ? '↑ Positive Margin' : '↓ Negative Margin'}
                    </p>
                </div>
                <div className="mis-card">
                    <h4>Avg. Profit Margin</h4>
                    <h2>{stats?.avgProfitMargin}</h2>
                    <p>Healthy target reached</p>
                </div>
            </div>

            {/* Table */}
            <div className="mis-table">
                <table>
                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Total Sales</th>
                            <th>Purchase Cost</th>
                            <th>Profit Amt</th>
                            <th>Profit %</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((b, i) => (
                            <tr key={i}>
                                <td className="invoice">{b.invoice}</td>
                                <td>{new Date(b.date).toLocaleDateString()}</td>
                                <td>{b.customer}</td>
                                <td>₹{Number(b.sales).toLocaleString()}</td>
                                <td>₹{Number(b.cost).toLocaleString()}</td>
                                <td className={b.profit >= 0 ? "profit" : "loss"}>
                                    ₹{Number(b.profit).toLocaleString()}
                                </td>
                                <td>
                                    <span className={parseFloat(b.percent) >= 0 ? "percent" : "percent-loss"}>
                                        {b.percent}
                                    </span>
                                </td>
                                <td>{b.status}</td>
                            </tr>
                        ))}
                        {bills.length === 0 && (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                    No sales data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}