import { useEffect, useState } from "react";
import axios from "axios";
import { FaUndo, FaSave, FaTimes, FaBuilding, FaFileInvoice, FaCalendarAlt, FaTag, FaPlus, FaBox } from "react-icons/fa";
import "../../styles/Purchase.css"; // Reuse the modern Purchase styles

export default function PurchaseReturn() {

    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        voucherType: "Purchase Return (PR)",
        vendorId: "",
        invoiceNo: "",
        date: ""
    });

    const [items, setItems] = useState([
        { productId: "", qty: 1, rate: 0, amount: 0 }
    ]);

    // 🔹 Load Vendors & Products with branch-id
    useEffect(() => {
        const headers = { "branch-id": localStorage.getItem("branchId") || "" };

        axios.get("http://localhost:3000/vendors", { headers })
            .then(res => setVendors(res.data))
            .catch(err => console.log(err));

        axios.get("http://localhost:3000/product", { headers })
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    // 🔹 Form Change
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 Item Change
    const handleItemChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;

        // Auto rate
        if (field === "productId") {
            const selected = products.find(p => p.id == value);
            updated[index].rate = selected?.rate || 0;
        }

        // Auto amount
        updated[index].amount =
            Number(updated[index].qty) * Number(updated[index].rate);

        setItems(updated);
    };

    // 🔹 Add Row
    const addRow = () => {
        setItems([
            ...items,
            { productId: "", qty: 1, rate: 0, amount: 0 }
        ]);
    };

    // 🔹 Clear
    const handleClear = () => {
        setForm({ voucherType: "Purchase Return (PR)", vendorId: "", invoiceNo: "", date: "" });
        setItems([{ productId: "", qty: 1, rate: 0, amount: 0 }]);
    };

    // 🔹 Total
    const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

    // 🔥 SAVE
    const handleSave = async () => {
        try {
            if (!form.vendorId) {
                alert("Select Vendor ❌");
                return;
            }

            const payload = {
                voucherType: form.voucherType,
                vendorId: Number(form.vendorId),
                invoiceNo: form.invoiceNo,
                date: form.date,
                items: items.map(i => ({
                    product: { id: Number(i.productId) },
                    quantity: Number(i.qty),
                    rate: Number(i.rate),
                    amount: Number(i.amount)
                }))
            };

            await axios.post("http://localhost:3000/purchase-return", payload, {
                headers: { "branch-id": localStorage.getItem("branchId") || "" }
            });

            alert("Purchase Return Saved ✅");
            handleClear();

        } catch (err) {
            console.log(err);
            alert("Error saving ❌");
        }
    };

    return (
        <div className="purchase-container">

            {/* HEADER */}
            <div className="header-bar">
                <h2><FaUndo /> Purchase Return</h2>

                <div className="header-buttons">
                    <button className="btn-outline"><FaTimes /> Cancel</button>
                    <button className="btn-light" onClick={handleClear}><FaUndo /> Clear</button>
                    <button className="btn-primary" onClick={handleSave}><FaSave /> Save Return</button>
                </div>
            </div>

            {/* FORM */}
            <div className="card modern-card">
                <div className="grid-4">

                    <div className="field">
                        <label><FaTag /> Voucher Type</label>
                        <select
                            className="modern-select"
                            name="voucherType"
                            value={form.voucherType}
                            onChange={handleFormChange}
                        >
                            <option value="Purchase Return (PR)">Purchase Return (PR)</option>
                            <option value="Debit Note (DN)">Debit Note (DN)</option>
                        </select>
                    </div>

                    <div className="field">
                        <label><FaBuilding /> Vendor</label>
                        <select
                            className="modern-select"
                            name="vendorId"
                            value={form.vendorId}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Vendor...</option>
                            {vendors.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label><FaFileInvoice /> Return Invoice</label>
                        <input
                            className="modern-input"
                            name="invoiceNo"
                            value={form.invoiceNo}
                            onChange={handleFormChange}
                            placeholder="Auto-generated if left blank"
                        />
                    </div>

                    <div className="field">
                        <label><FaCalendarAlt /> Date</label>
                        <input
                            className="modern-input"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleFormChange}
                        />
                    </div>

                </div>
            </div>

            {/* ITEMS */}
            <div className="card modern-card">

                <table className="modern-table">
                    <thead>
                        <tr>
                            <th><FaBox style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Product</th>
                            <th style={{ width: '15%' }}>Qty</th>
                            <th style={{ width: '20%' }}>Rate (₹)</th>
                            <th style={{ width: '20%' }}>Amount (₹)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>

                                <td>
                                    <select
                                        value={item.productId}
                                        onChange={(e) =>
                                            handleItemChange(index, "productId", e.target.value)
                                        }
                                    >
                                        <option value="">Select Product...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.productName}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleItemChange(index, "qty", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.rate}
                                        onChange={(e) =>
                                            handleItemChange(index, "rate", e.target.value)
                                        }
                                    />
                                </td>

                                <td className="amount-col">
                                    ₹ {item.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="add-btn" onClick={addRow}>
                    <FaPlus /> Add Item
                </button>

            </div>

            {/* TOTAL */}
            <div className="summary-box">
                <h3>Total Return Amount</h3>
                <span>₹ {total.toFixed(2)}</span>
            </div>

        </div>
    );
}