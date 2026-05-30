import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ExpenseDistribution.css";

export default function ExpenseDistribution() {
    const [accounts, setAccounts] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1); // -1 means new entry mode

    // Form fields
    const [pNo, setPNo] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [creditorAccountId, setCreditorAccountId] = useState("");
    const [debtorAccountId, setDebtorAccountId] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const fetchAccounts = () => {
        axios.get(import.meta.env.VITE_API_URL + "/account")
            .then(res => setAccounts(res.data))
            .catch(err => console.log(err));
    };

    const fetchExpenses = () => {
        axios.get(import.meta.env.VITE_API_URL + "/expense-distribution", {
            headers: {
                "branch-id": localStorage.getItem("branchId") || ""
            }
        })
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setExpenses(list);
                if (list.length > 0) {
                    setCurrentIndex(0);
                    loadExpense(list[0]);
                } else {
                    handleNew();
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchAccounts();
        fetchExpenses();
    }, []);

    const loadExpense = (exp) => {
        if (!exp) return;
        setPNo(exp.pNo || "");
        setDate(exp.date ? exp.date.split("T")[0] : "");
        setCreditorAccountId(String(exp.creditorAccountId));
        setDebtorAccountId(String(exp.debtorAccountId));
        setDescription(exp.description || "");
        setAmount(String(exp.amount));
    };

    const handleNew = () => {
        setCurrentIndex(-1);
        setPNo(`PV-${Date.now().toString().slice(-6)}`);
        setDate(new Date().toISOString().split("T")[0]);
        
        // Auto-assign "Cash In Hand" if it exists in accounts
        const cashAcc = accounts.find(a => a.name?.toLowerCase().includes("cash"));
        setCreditorAccountId(cashAcc ? String(cashAcc.id) : "");
        setDebtorAccountId("");
        setDescription("");
        setAmount("");
    };

    const handlePrev = () => {
        if (currentIndex < expenses.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            loadExpense(expenses[nextIdx]);
        }
    };

    const handleNext = () => {
        if (currentIndex > 0) {
            const nextIdx = currentIndex - 1;
            setCurrentIndex(nextIdx);
            loadExpense(expenses[nextIdx]);
        } else if (currentIndex === 0) {
            handleNew();
        }
    };

    const handleSave = async () => {
        if (!creditorAccountId || !debtorAccountId) {
            alert("Please select both a Creditor and a Debtor account.");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid, positive amount.");
            return;
        }

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/expense-distribution", {
                pNo,
                date,
                creditorAccountId: Number(creditorAccountId),
                debtorAccountId: Number(debtorAccountId),
                description,
                amount: Number(amount)
            }, {
                headers: {
                    "branch-id": localStorage.getItem("branchId") || ""
                }
            });

            alert("Expense Distribution voucher saved successfully! ✅");
            fetchExpenses();
        } catch (err) {
            console.error(err);
            alert("Error saving Expense Voucher ❌");
        }
    };

    const isViewMode = currentIndex !== -1;

    return (
        <div className="expense-page">

            {/* Top Navigation */}
            <div className="expense-topbar">

                <div className="nav-buttons">
                    <button onClick={handlePrev} disabled={currentIndex >= expenses.length - 1}>◀ Previous</button>
                    <button onClick={handleNext} disabled={currentIndex === -1}>Next ▶</button>
                    <button onClick={handleNew} className="edit-btn">➕ New Voucher</button>
                </div>

                <div className="action-buttons">
                    <button className="cancel" onClick={handleNew}>Cancel</button>
                    <button className="clear" onClick={handleNew}>Clear</button>
                    <button className="save" onClick={handleSave} disabled={isViewMode}>
                        {isViewMode ? "Saved" : "Save"}
                    </button>
                </div>

            </div>

            {/* Main Form */}
            <div className="expense-form">

                <div className="row">

                    <div className="field small">
                        <label>Voucher No</label>
                        <input value={pNo} onChange={(e) => setPNo(e.target.value)} disabled={isViewMode} />
                    </div>

                    <div className="field small">
                        <label>Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={isViewMode} />
                    </div>

                </div>

                <div className="row">
                    <div className="field full">
                        <label>Creditor / Paid From (Asset/Cash/Bank)</label>
                        <select
                            value={creditorAccountId}
                            onChange={(e) => setCreditorAccountId(e.target.value)}
                            disabled={isViewMode}
                            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", outline: "none", width: "100%" }}
                        >
                            <option value="">Select Ledger Account...</option>
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.name} ({acc.code || `ACC-${acc.id}`})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="field full">
                        <label>Debtor / Charged To (Expense/Vendor)</label>
                        <select
                            value={debtorAccountId}
                            onChange={(e) => setDebtorAccountId(e.target.value)}
                            disabled={isViewMode}
                            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", outline: "none", width: "100%" }}
                        >
                            <option value="">Select Ledger Account...</option>
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.name} ({acc.code || `ACC-${acc.id}`})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="field full">
                        <label>Description / Notes</label>
                        <input 
                            placeholder="Enter expense distribution details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isViewMode}
                        />
                    </div>
                </div>

                <div className="row">

                    <div className="field small">
                        <label>Amount (INR)</label>
                        <input 
                            type="number"
                            placeholder="₹ 0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isViewMode}
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                        />
                    </div>

                </div>

            </div>

            {/* Voucher Table (Detailed view for historical reference) */}
            <div className="expense-table-container">

                <table className="expense-table">

                    <thead>
                        <tr>
                            <th style={{ width: "10%", background: "#a5b4fc" }}>SNo</th>
                            <th style={{ width: "45%", background: "#a5b4fc" }}>Voucher Type</th>
                            <th style={{ width: "45%", background: "#a5b4fc", textAlign: "right" }}>Transaction Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center", fontWeight: "bold" }}>1</td>
                            <td style={{ fontWeight: "600" }}>Expense Payment Voucher (PV)</td>
                            <td style={{ fontWeight: "bold", textAlign: "right", color: "#4f46e5" }}>
                                {amount ? `₹ ${Number(amount).toFixed(2)}` : "₹ 0.00"}
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>
    );
}