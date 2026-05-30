import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function AuditTrail() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/audit");
            const data = await res.json();
            if (Array.isArray(data)) {
                setLogs(data);
            }
        } catch (err) {
            console.error("Failed to fetch system audit logs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log => {
        const user = (log.user || "").toLowerCase();
        const action = (log.action || "").toLowerCase();
        const module = (log.module || "").toLowerCase();
        const desc = (log.description || "").toLowerCase();
        const search = searchTerm.toLowerCase();

        return user.includes(search) || action.includes(search) || module.includes(search) || desc.includes(search);
    });

    const formatDateTime = (dateStr) => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="report-page">

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "20px" }}>
                <h2 style={{ margin: 0 }}>System Audit Logs</h2>
                <input
                    type="text"
                    placeholder="🔍 Search logs by user, action, module..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.95rem",
                        maxWidth: "350px",
                        outline: "none",
                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)"
                    }}
                />
            </div>

            <div className="report-table">

                <table>

                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Timestamp</th>
                            <th style={{ width: "15%" }}>User</th>
                            <th style={{ width: "20%" }}>Action</th>
                            <th style={{ width: "15%" }}>Module</th>
                            <th style={{ width: "30%" }}>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>Loading audit records...</td>
                            </tr>
                        ) : filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No matching log records found.</td>
                            </tr>
                        ) : (
                            filteredLogs.map(log => (
                                <tr key={log.id}>
                                    <td style={{ color: "#64748b", fontSize: "0.9rem" }}>{formatDateTime(log.timestamp)}</td>
                                    <td style={{ fontWeight: "600", color: "#0f172a" }}>{log.user}</td>
                                    <td style={{ fontWeight: "600", color: "#2563eb" }}>{log.action}</td>
                                    <td>
                                        <span style={{
                                            padding: "2px 8px",
                                            borderRadius: "6px",
                                            background: "#f1f5f9",
                                            fontSize: "12px",
                                            color: "#475569",
                                            fontWeight: "500"
                                        }}>{log.module}</span>
                                    </td>
                                    <td style={{ color: "#475569" }}>{log.description}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}