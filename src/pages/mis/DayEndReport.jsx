import { useEffect, useState } from "react";
import "../../styles/MIS.css";
import axios from 'axios';

export default function DayEndReport() {
    const todayStr = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [data, setData] = useState({ stats: null, tableData: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDayEndData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/reports/mis/day-end?date=${selectedDate}`);
                setData(response.data);
                setError("");
            } catch (err) {
                console.error("Error fetching day-end report", err);
                setError("Failed to load report data");
            } finally {
                setLoading(false);
            }
        };

        fetchDayEndData();
    }, [selectedDate]);

    const { stats, tableData } = data;

    return (
        <div className="mis-container" style={{ padding: "10px 40px" }}>
            <div className="mis-header">
                <h1>Day End Summary</h1>
                <div className="date-selector">
                    <span style={{ color: "#64748b", fontSize: "14px", fontWeight: "500" }}>Date:</span>
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                    />
                </div>
            </div>

            {loading ? (
                 <div className="mis-loading">
                    <div className="spinner"></div> Generating Summary...
                 </div>
            ) : error ? (
                <div className="mis-loading" style={{ color: '#e11d48' }}>{error}</div>
            ) : (
                <div className="report-card">
                    <div className="report-header">
                        <h2 className="report-title">SPASH EYE WEAR</h2>
                        <p className="report-date">
                            {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <div className="report-stats">
                        <div className="report-stat-box">
                            <h3>₹{Number(stats?.totalSales || 0).toLocaleString()}</h3>
                            <p>Total Sales</p>
                        </div>
                        <div className="report-stat-box">
                            <h3 style={{ color: "#059669" }}>₹{Number(stats?.totalCollections || 0).toLocaleString()}</h3>
                            <p>Total Collections</p>
                        </div>
                        <div className="report-stat-box">
                            <h3 style={{ color: "#3b82f6" }}>{stats?.newOrdersCount || 0}</h3>
                            <p>New Orders</p>
                        </div>
                    </div>

                    <div className="mis-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, i) => (
                                    <tr key={i}>
                                        <td className="invoice">{row.invoice}</td>
                                        <td>{row.customer}</td>
                                        <td>{row.items}</td>
                                        <td>
                                            <span style={{
                                                background: row.method === 'Cash' ? '#dcfce7' : '#e0e7ff', 
                                                color: row.method === 'Cash' ? '#166534' : '#3730a3',
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600'
                                            }}>
                                                {row.method}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: "700" }}>₹{Number(row.amount).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {tableData.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                            No tracking activities for {new Date(selectedDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}