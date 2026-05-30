import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/CashPayment.css";

export default function CashPayment() {
    const [payments, setPayments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [accounts, setAccounts] = useState([]);
    
    // Header Data
    const [formData, setFormData] = useState({
        paymentNo: "",
        refNo: "",
        date: new Date().toISOString().split('T')[0],
        creditorAccountId: ""
    });

    // Items Data
    const [items, setItems] = useState([
        { debtorAccountId: "", description: "", amount: 0 }
    ]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [paymentsRes, accountsRes] = await Promise.all([
                axios.get(import.meta.env.VITE_API_URL + "/cash-payment"),
                axios.get(import.meta.env.VITE_API_URL + "/account")
            ]);
            
            setPayments(paymentsRes.data);
            setAccounts(accountsRes.data);

            if (paymentsRes.data.length > 0) {
                loadPaymentToState(paymentsRes.data[0]);
            }
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Failed to load data.");
        }
    };

    const loadPaymentToState = (payment) => {
        setFormData({
            id: payment.id,
            paymentNo: payment.paymentNo,
            refNo: payment.refNo,
            date: payment.date ? payment.date.split('T')[0] : "",
            creditorAccountId: payment.creditorAccountId
        });
        
        if (payment.items && payment.items.length > 0) {
            setItems(payment.items.map(i => ({
                id: i.id,
                debtorAccountId: i.debtorAccountId,
                description: i.description,
                amount: i.amount
            })));
        } else {
            setItems([{ debtorAccountId: "", description: "", amount: 0 }]);
        }
    };

    const handleHeaderChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...items];
        newItems[index][name] = name === "amount" ? parseFloat(value) || 0 : value;
        setItems(newItems);
    };

    const addItemRow = () => {
        setItems([...items, { debtorAccountId: "", description: "", amount: 0 }]);
    };

    const removeItemRow = (index) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const getTotal = () => {
        return items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    };

    const handleClear = () => {
        setFormData({
            id: null,
            paymentNo: "",
            refNo: "",
            date: new Date().toISOString().split('T')[0],
            creditorAccountId: ""
        });
        setItems([{ debtorAccountId: "", description: "", amount: 0 }]);
    };

    const handleNext = () => {
        if (currentIndex < payments.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            loadPaymentToState(payments[nextIndex]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            loadPaymentToState(payments[prevIndex]);
        }
    };

    const handleSave = async () => {
        const payload = {
            ...formData,
            totalAmount: getTotal(),
            items: items.filter(i => i.debtorAccountId && i.amount > 0)
        };

        if (payload.items.length === 0) {
            toast.warn("Please add at least one valid item line.");
            return;
        }

        try {
            if (formData.id) {
                // For simplicity, we just delete and recreate to update items, or implement thorough update logic in backed
                toast.info("Update logic requires backend item syncing.");
            } else {
                await axios.post(import.meta.env.VITE_API_URL + "/cash-payment", payload);
                toast.success("Cash Payment saved successfully!");
                fetchInitialData();
                handleClear();
            }
        } catch (error) {
            toast.error("Failed to save transaction.");
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!formData.id) return;
        if (window.confirm("Are you sure you want to delete this payment?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/cash-payment/${formData.id}`);
                toast.success("Payment deleted.");
                fetchInitialData();
            } catch (error) {
                toast.error("Failed to delete payment.");
            }
        }
    };

    // Filter accounts for Banks/Cash (Creditor for Payment)
    const bankCashAccounts = accounts.filter(a => a.subGroup === "Bank" || a.subGroup === "Cash" || !a.subGroup);
    
    // Filter accounts for Expenses/Vendors (Debtor for Payment)
    const expenseAccounts = accounts;

    return (
        <div className="cashpay-page">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Top Navigation */}
            <div className="cashpay-topbar">
                <div className="nav-buttons">
                    <button onClick={handlePrev} disabled={currentIndex === 0 || payments.length === 0}>◀ Previous</button>
                    <button onClick={handleNext} disabled={currentIndex === payments.length - 1 || payments.length === 0}>Next ▶</button>
                    <button className="edit-btn" onClick={handleClear}>+ New</button>
                </div>

                <div className="action-buttons">
                    <button className="cancel" onClick={handleDelete} disabled={!formData.id}>Delete</button>
                    <button className="clear" onClick={handleClear}>Clear</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>

            <div className="cashpay-content-wrapper glass-panel">
                <h2 className="form-title">Cash/Bank Payment Entry</h2>

                {/* Header Fields */}
                <div className="cashpay-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Payment No</label>
                            <input type="text" name="paymentNo" value={formData.paymentNo} onChange={handleHeaderChange} placeholder="AUTO/MANUAL" />
                        </div>
                        <div className="form-group">
                            <label>Ref No.</label>
                            <input type="text" name="refNo" value={formData.refNo} onChange={handleHeaderChange} placeholder="Cheque no. etc" />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleHeaderChange} />
                        </div>
                    </div>

                    <div className="form-group full">
                        <label>Creditor (Bank/Cash Account to Pay From)</label>
                        <select name="creditorAccountId" value={formData.creditorAccountId} onChange={handleHeaderChange}>
                            <option value="">-- Select Source Account --</option>
                            {bankCashAccounts.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.name} ({acc.code})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="cashpay-table-container">
                    <table className="cashpay-table">
                        <thead>
                            <tr>
                                <th width="5%">SNo</th>
                                <th width="35%">Debtor Account (Expense/Vendor)</th>
                                <th width="35%">Description / Remarks</th>
                                <th width="15%">Amount</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <select 
                                            name="debtorAccountId" 
                                            value={item.debtorAccountId} 
                                            onChange={(e) => handleItemChange(index, e)}
                                        >
                                            <option value="">-- Select Account --</option>
                                            {expenseAccounts.map(a => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="description" 
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, e)}
                                            placeholder="Details"
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="amount"
                                            value={item.amount}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="amount-input"
                                        />
                                    </td>
                                    <td>
                                        <button className="row-del-btn" onClick={() => removeItemRow(index)}>❌</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-row-btn" onClick={addItemRow}>+ Add Line Item</button>
                </div>

                {/* Bottom Section */}
                <div className="cashpay-bottom">
                    <button className="print-btn">Print Voucher</button>
                    <div className="total-container">
                        <span>Total Amount:</span>
                        <input className="total-box" value={getTotal().toFixed(2)} readOnly />
                    </div>
                </div>
            </div>

        </div>
    );
}