import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/CashReceipt.css";
import { 
    FaFileInvoiceDollar, FaPlus, FaSave, FaPrint, FaTrash, 
    FaCalendarAlt, FaUserTie, FaMoneyBillWave 
} from "react-icons/fa";

export default function CashReceipt() {

    const [customers, setCustomers] = useState([]);
    const [receiptNo, setReceiptNo] = useState("RC-0001");
    const [refNo, setRefNo] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [items, setItems] = useState([
        { customerId: "", description: "", amount: 0, discount: 0 }
    ]);

    const branchId = localStorage.getItem("branchId") || "";

    /* INITIAL FETCH: Customers & Latest Receipt No */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Customers
                const custRes = await axios.get(import.meta.env.VITE_API_URL + "/customers", {
                    headers: { "branch-id": branchId }
                });
                setCustomers(custRes.data);

                // Fetch Receipts to calculate next receipt number
                const receiptRes = await axios.get(import.meta.env.VITE_API_URL + "/cash-receipt", {
                    headers: { "branch-id": branchId }
                });
                
                const existingReceipts = receiptRes.data;
                let nextCode = "RC-0001";
                
                if (existingReceipts && existingReceipts.length > 0) {
                    const maxCodeNum = existingReceipts.reduce((max, r) => {
                        if (r.receiptNo && r.receiptNo.startsWith("RC-")) {
                            const num = parseInt(r.receiptNo.substring(3), 10);
                            if (!isNaN(num) && num > max) return num;
                        }
                        if (r.id && r.id > max) return r.id;
                        return max;
                    }, 0);
                    nextCode = "RC-" + String(maxCodeNum + 1).padStart(4, "0");
                }
                setReceiptNo(nextCode);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [branchId]);

    /* CALCULATE TOTAL */
    const total = items.reduce(
        (sum, item) => sum + (Number(item.amount) - Number(item.discount)),
        0
    );

    /* UPDATE ITEM */
    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    /* ADD & REMOVE ROW */
    const addItem = () => {
        setItems([
            ...items,
            { customerId: "", description: "", amount: 0, discount: 0 }
        ]);
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            const updated = items.filter((_, i) => i !== index);
            setItems(updated);
        }
    };

    /* SAVE RECEIPT */
    const handleSubmit = async () => {
        if (items.length === 0 || !items[0].customerId) {
            alert("Please add at least one item with a valid customer.");
            return;
        }

        const payload = {
            receiptNo,
            refNo,
            date,
            total,
            items: items.map(item => ({
                customerId: Number(item.customerId),
                description: item.description,
                amount: Number(item.amount),
                discount: Number(item.discount),
                net: Number(item.amount) - Number(item.discount)
            }))
        };

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/cash-receipt", payload, {
                headers: { "branch-id": branchId }
            });

            alert("Receipt Saved ✅");

            // Reset and increment receipt number
            setItems([{ customerId: "", description: "", amount: 0, discount: 0 }]);
            setRefNo("");
            setDate(new Date().toISOString().split('T')[0]);
            
            const currentNum = parseInt(receiptNo.substring(3), 10);
            setReceiptNo("RC-" + String(currentNum + 1).padStart(4, "0"));

        } catch (err) {
            console.error(err);
            alert("Error saving receipt ❌");
        }
    };

    const handleClear = () => {
        setItems([{ customerId: "", description: "", amount: 0, discount: 0 }]);
        setRefNo("");
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className="cash-page">
            <div className="cash-topbar print-hide">
                <h2 className="page-title">
                    <FaFileInvoiceDollar /> Cash Receipt
                </h2>
                <div className="header-buttons">
                    <button className="btn-outline print-btn" onClick={() => window.print()}>
                        <FaPrint /> Print
                    </button>
                    <button className="btn-outline cancel-btn" onClick={handleClear}>
                        Clear
                    </button>
                    <button className="btn-primary save-btn" onClick={handleSubmit}>
                        <FaSave /> Save Receipt
                    </button>
                </div>
            </div>

            <div className="glass-panel cash-header-card">
                <div className="form-grid-3col">
                    <div className="input-group">
                        <label>Receipt No.</label>
                        <input
                            className="modern-input visual-readonly font-bold"
                            value={receiptNo}
                            onChange={(e) => setReceiptNo(e.target.value)}
                            readOnly
                        />
                    </div>

                    <div className="input-group">
                        <label>Ref No. (Optional)</label>
                        <input
                            className="modern-input"
                            placeholder="Enter reference..."
                            value={refNo}
                            onChange={(e) => setRefNo(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label><FaCalendarAlt /> Date</label>
                        <input
                            className="modern-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row mt-3">
                    <div className="input-group full-width">
                        <label><FaUserTie /> Creditor Account</label>
                        <input className="modern-input visual-readonly" value="CASH IN HAND" readOnly disabled />
                    </div>
                </div>
            </div>

            <div className="glass-panel cash-table-card">
                <div className="table-responsive">
                    <table className="modern-table cash-table">
                        <thead>
                            <tr>
                                <th width="5%">SNo</th>
                                <th width="25%">Customer</th>
                                <th width="30%">Description</th>
                                <th width="15%">Amount</th>
                                <th width="10%">Discount</th>
                                <th width="10%">Net</th>
                                <th width="5%" className="print-hide"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => {
                                const net = (Number(item.amount) - Number(item.discount)).toFixed(2);
                                return (
                                    <tr key={i}>
                                        <td className="text-center">{i + 1}</td>
                                        <td>
                                            <select
                                                className="modern-select no-border"
                                                value={item.customerId}
                                                onChange={(e) => updateItem(i, "customerId", e.target.value)}
                                            >
                                                <option value="">Select Customer</option>
                                                {customers.map(c => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                className="modern-input no-border"
                                                placeholder="Enter description"
                                                value={item.description}
                                                onChange={(e) => updateItem(i, "description", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="modern-input no-border text-right"
                                                type="number"
                                                min="0"
                                                value={item.amount || ''}
                                                onChange={(e) => updateItem(i, "amount", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="modern-input no-border text-right"
                                                type="number"
                                                min="0"
                                                value={item.discount || ''}
                                                onChange={(e) => updateItem(i, "discount", e.target.value)}
                                            />
                                        </td>
                                        <td className="text-right font-bold text-primary">₹ {net}</td>
                                        <td className="text-center print-hide">
                                            <button className="icon-btn delete-btn" onClick={() => removeItem(i)} disabled={items.length === 1}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="cash-footer">
                    <button className="btn-outline add-row-btn print-hide" onClick={addItem}>
                        <FaPlus /> Add Line Item
                    </button>

                    <div className="total-display">
                        <span className="total-label">Grand Total:</span>
                        <span className="total-value">
                            <FaMoneyBillWave className="mr-2" /> ₹ {total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}