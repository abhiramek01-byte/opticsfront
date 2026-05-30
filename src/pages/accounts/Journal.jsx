import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Journal.css";

export default function Journal() {
    const [accounts, setAccounts] = useState([]);
    const [journals, setJournals] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1); // -1 means new entry mode

    // Form fields
    const [entryNo, setEntryNo] = useState("");
    const [refNo, setRefNo] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [rows, setRows] = useState([
        { accountId: "", description: "", debit: 0, credit: 0 }
    ]);

    const fetchAccounts = () => {
        axios.get(import.meta.env.VITE_API_URL + "/account")
            .then(res => setAccounts(res.data))
            .catch(err => console.log(err));
    };

    const fetchJournals = () => {
        axios.get(import.meta.env.VITE_API_URL + "/journal")
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setJournals(list);
                if (list.length > 0) {
                    setCurrentIndex(0); // Show most recent saved entry
                    loadJournal(list[0]);
                } else {
                    handleNew();
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchAccounts();
        fetchJournals();
    }, []);

    const loadJournal = (journal) => {
        if (!journal) return;
        setEntryNo(journal.entryNo || "");
        setRefNo(journal.reference || "");
        setDate(journal.date ? journal.date.split("T")[0] : "");
        setDescription(journal.description || "");
        
        if (Array.isArray(journal.items) && journal.items.length > 0) {
            setRows(journal.items.map(item => ({
                accountId: String(item.accountId),
                description: item.description || "",
                debit: Number(item.debit),
                credit: Number(item.credit)
            })));
        } else {
            setRows([{ accountId: "", description: "", debit: 0, credit: 0 }]);
        }
    };

    const handleNew = () => {
        setCurrentIndex(-1);
        setEntryNo(`JV-${Date.now().toString().slice(-6)}`);
        setRefNo("");
        setDate(new Date().toISOString().split("T")[0]);
        setDescription("");
        setRows([{ accountId: "", description: "", debit: 0, credit: 0 }]);
    };

    const handlePrev = () => {
        if (currentIndex < journals.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            loadJournal(journals[nextIdx]);
        }
    };

    const handleNext = () => {
        if (currentIndex > 0) {
            const nextIdx = currentIndex - 1;
            setCurrentIndex(nextIdx);
            loadJournal(journals[nextIdx]);
        } else if (currentIndex === 0) {
            // Transition from first record to "New" mode
            handleNew();
        }
    };

    const handleRowChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const addRow = () => {
        setRows([...rows, { accountId: "", description: "", debit: 0, credit: 0 }]);
    };

    const removeRow = (index) => {
        if (rows.length > 1) {
            setRows(rows.filter((_, i) => i !== index));
        } else {
            setRows([{ accountId: "", description: "", debit: 0, credit: 0 }]);
        }
    };

    const handleSave = async () => {
        // Validate
        if (rows.some(r => !r.accountId)) {
            alert("Please select a valid account for all rows.");
            return;
        }

        const totalDebit = rows.reduce((sum, r) => sum + Number(r.debit || 0), 0);
        const totalCredit = rows.reduce((sum, r) => sum + Number(r.credit || 0), 0);

        if (totalDebit !== totalCredit) {
            alert(`Journal is out of balance! Debits (${totalDebit}) must equal Credits (${totalCredit}).`);
            return;
        }

        if (totalDebit <= 0) {
            alert("Transaction amount must be greater than zero.");
            return;
        }

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/journal", {
                entryNo,
                date,
                reference: refNo,
                description,
                items: rows.map(r => ({
                    accountId: Number(r.accountId),
                    debit: Number(r.debit || 0),
                    credit: Number(r.credit || 0),
                    description: r.description
                }))
            });

            alert("Journal Voucher saved successfully! ✅");
            fetchJournals();
        } catch (err) {
            console.error(err);
            alert("Error saving Journal Voucher ❌");
        }
    };

    const isViewMode = currentIndex !== -1;

    return (
        <div className="journal-page">

            {/* Top Navigation */}
            <div className="journal-topbar">

                <div className="nav-buttons">
                    <button onClick={handlePrev} disabled={currentIndex >= journals.length - 1}>◀ Previous</button>
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

            {/* Header Form */}
            <div className="journal-form">

                <div className="row">

                    <div className="field">
                        <label>Voucher No</label>
                        <input value={entryNo} onChange={(e) => setEntryNo(e.target.value)} disabled={isViewMode} />
                    </div>

                    <div className="field">
                        <label>Ref No</label>
                        <input value={refNo} onChange={(e) => setRefNo(e.target.value)} disabled={isViewMode} />
                    </div>

                    <div className="field">
                        <label>Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={isViewMode} />
                    </div>

                </div>

                <div className="row">

                    <div className="field full">
                        <label>Description / Notes</label>
                        <input 
                            placeholder="Enter general journal entry notes..." 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isViewMode}
                        />
                    </div>

                </div>

            </div>

            {/* Table */}
            <div className="journal-table-container">

                <table className="journal-table">

                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>SNo</th>
                            <th style={{ width: "35%", color: "white" }}>Account</th>
                            <th style={{ width: "30%", color: "white" }}>Description</th>
                            <th style={{ width: "12%", color: "white" }}>Debit (Dr)</th>
                            <th style={{ width: "12%", color: "white" }}>Credit (Cr)</th>
                            <th style={{ width: "6%", color: "white", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>{index + 1}</td>
                                <td>
                                    <select
                                        value={row.accountId}
                                        onChange={(e) => handleRowChange(index, "accountId", e.target.value)}
                                        disabled={isViewMode}
                                        style={{ width: "100%", padding: "6px", border: "none", outline: "none", background: "transparent" }}
                                    >
                                        <option value="">Select Ledger Account...</option>
                                        {accounts.map(acc => (
                                            <option key={acc.id} value={acc.id}>
                                                {acc.name} ({acc.code || `ACC-${acc.id}`})
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input 
                                        value={row.description} 
                                        onChange={(e) => handleRowChange(index, "description", e.target.value)}
                                        placeholder="Row description..."
                                        disabled={isViewMode}
                                        style={{ width: "100%", padding: "6px", border: "none", background: "transparent" }}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number"
                                        value={row.debit} 
                                        onChange={(e) => handleRowChange(index, "debit", e.target.value)}
                                        disabled={isViewMode}
                                        style={{ width: "100%", padding: "6px", border: "none", background: "transparent", fontWeight: "bold", textAlign: "right" }}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number"
                                        value={row.credit} 
                                        onChange={(e) => handleRowChange(index, "credit", e.target.value)}
                                        disabled={isViewMode}
                                        style={{ width: "100%", padding: "6px", border: "none", background: "transparent", fontWeight: "bold", textAlign: "right" }}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        onClick={() => removeRow(index)}
                                        disabled={isViewMode}
                                        style={{
                                            background: "#fee2e2",
                                            color: "#ef4444",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            padding: "4px 8px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {!isViewMode && (
                    <button 
                        onClick={addRow}
                        style={{
                            marginTop: "12px",
                            padding: "6px 16px",
                            borderRadius: "6px",
                            border: "1px dashed #3b82f6",
                            color: "#3b82f6",
                            background: "rgba(59, 130, 246, 0.05)",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        + Add Transaction Row
                    </button>
                )}

            </div>

            {/* Bottom */}
            <div className="journal-bottom">
                <button className="print-btn" onClick={() => window.print()}>🖨 Print Voucher</button>
            </div>

        </div>
    );
}