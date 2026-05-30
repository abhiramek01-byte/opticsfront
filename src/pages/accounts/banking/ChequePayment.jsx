import { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Banking.css";

export default function ChequePayment() {
    const [payments, setPayments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    // Form fields
    const [chequeNo, setChequeNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [refNo, setRefNo] = useState("");
    const [description, setDescription] = useState("");

    const fetchPayments = () => {
        axios.get(import.meta.env.VITE_API_URL + "/banking/cheques?type=Payment", {
            headers: {
                "branch-id": localStorage.getItem("branchId") || ""
            }
        })
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setPayments(list);
                if (list.length > 0) {
                    setCurrentIndex(0);
                    loadPayment(list[0]);
                } else {
                    handleNew();
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const loadPayment = (p) => {
        if (!p) return;
        setChequeNo(p.chequeNo || "");
        setBankName(p.bankName || "");
        setAmount(String(p.amount || ""));
        setDate(p.date ? p.date.split("T")[0] : "");
        setRefNo(p.refNo || "");
        setDescription(p.description || "");
    };

    const handleNew = () => {
        setCurrentIndex(-1);
        setChequeNo("");
        setBankName("");
        setAmount("");
        setDate(new Date().toISOString().split("T")[0]);
        setRefNo(`CP-${Date.now().toString().slice(-6)}`);
        setDescription("");
    };

    const handlePrev = () => {
        if (currentIndex < payments.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            loadPayment(payments[nextIdx]);
        }
    };

    const handleNext = () => {
        if (currentIndex > 0) {
            const nextIdx = currentIndex - 1;
            setCurrentIndex(nextIdx);
            loadPayment(payments[nextIdx]);
        } else if (currentIndex === 0) {
            handleNew();
        }
    };

    const handleSave = async () => {
        if (!chequeNo || !bankName || !amount) {
            alert("Please fill in Cheque No, Bank Name, and Amount.");
            return;
        }

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/banking/cheques", {
                type: "Payment",
                chequeNo,
                bankName,
                amount: Number(amount),
                date,
                refNo,
                description
            }, {
                headers: {
                    "branch-id": localStorage.getItem("branchId") || ""
                }
            });

            alert("Cheque Payment recorded successfully! ✅");
            fetchPayments();
        } catch (err) {
            console.error(err);
            alert("Error saving cheque payment ❌");
        }
    };

    const isViewMode = currentIndex !== -1;

    return (
        <div className="bank-page">

            <div className="bank-topbar">
                <button onClick={handlePrev} disabled={currentIndex >= payments.length - 1}>◀ Previous</button>
                <button onClick={handleNext} disabled={currentIndex === -1}>Next ▶</button>
                <button className="edit" onClick={handleNew}>➕ New Voucher</button>

                <div className="right-btns">
                    <button onClick={handleNew}>Cancel</button>
                    <button onClick={handleNew}>Clear</button>
                    <button className="save" onClick={handleSave} disabled={isViewMode}>
                        {isViewMode ? "Saved" : "Save"}
                    </button>
                </div>
            </div>

            <div className="bank-form" style={{ background: "white", padding: "25px", borderRadius: "8px" }}>
                <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#1e293b" }}>Cheque Payment Voucher</h3>

                <div className="row" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <label style={{ fontSize: "13px", marginBottom: "5px" }}>Reference No</label>
                        <input value={refNo} onChange={(e) => setRefNo(e.target.value)} disabled={isViewMode} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <label style={{ fontSize: "13px", marginBottom: "5px" }}>Voucher Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={isViewMode} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                    </div>
                </div>

                <div className="row" style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
                    <label style={{ fontSize: "13px", marginBottom: "5px" }}>Creditor / Bank Name</label>
                    <input 
                        placeholder="e.g. HDFC Bank, SBI..." 
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)} 
                        disabled={isViewMode} 
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
                    />
                </div>

                <div className="row" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <label style={{ fontSize: "13px", marginBottom: "5px" }}>Cheque Number</label>
                        <input 
                            placeholder="Enter 6-digit Cheque No..." 
                            value={chequeNo} 
                            onChange={(e) => setChequeNo(e.target.value)} 
                            disabled={isViewMode} 
                            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <label style={{ fontSize: "13px", marginBottom: "5px" }}>Amount (INR)</label>
                        <input 
                            type="number"
                            placeholder="₹ 0.00" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            disabled={isViewMode} 
                            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontWeight: "bold" }} 
                        />
                    </div>
                </div>

                <div className="row" style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}>
                    <label style={{ fontSize: "13px", marginBottom: "5px" }}>Description / Memo</label>
                    <input 
                        placeholder="Payment details or remarks..." 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        disabled={isViewMode} 
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
                    />
                </div>

            </div>

        </div>
    );
}