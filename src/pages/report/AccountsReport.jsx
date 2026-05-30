import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function AccountsReport() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const res = await fetch(import.meta.env.VITE_API_URL + "/account", {
                    headers: {
                        "branch-id": localStorage.getItem("branchId") || ""
                    }
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAccounts(data);
                }
            } catch (err) {
                console.error("Failed to fetch ledger accounts", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
        }).format(amount);
    };

    return (
        <div className="report-page">

            <h2>Account Ledger Summary</h2>

            <div className="report-table">

                <table>

                    <thead>
                        <tr>
                            <th>Account Code</th>
                            <th>Account Name</th>
                            <th>Group / Category</th>
                            <th>Opening Balance</th>
                            <th>Type</th>
                            <th>Closing Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>Loading records...</td>
                            </tr>
                        ) : accounts.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No account records found.</td>
                            </tr>
                        ) : (
                            accounts.map(acc => {
                                const closing = acc.openingBalance; // Can be further updated once transactions are linked
                                return (
                                    <tr key={acc.id}>
                                        <td style={{ fontFamily: "monospace", fontWeight: "600" }}>{acc.code || `ACC-${acc.id}`}</td>
                                        <td style={{ fontWeight: "600", color: "#1e293b" }}>{acc.name}</td>
                                        <td>{acc.subGroup || acc.under || "General"}</td>
                                        <td style={{ fontWeight: "600" }}>{formatCurrency(acc.openingBalance)}</td>
                                        <td>
                                            <span style={{
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                background: acc.obType === "Debit" ? "#e0f2fe" : "#fef3c7",
                                                color: acc.obType === "Debit" ? "#0369a1" : "#b45309"
                                            }}>
                                                {acc.obType || "Debit"}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: "700", color: "#0f172a" }}>{formatCurrency(closing)}</td>
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