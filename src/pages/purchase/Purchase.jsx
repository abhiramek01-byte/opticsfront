import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaSave, FaTimes, FaUndo, FaBuilding, FaFileInvoice, FaCalendarAlt, FaMoneyBillWave, FaPlus, FaBox } from "react-icons/fa";
import "../../styles/Purchase.css";

export default function Purchase() {

    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);

    const [form, setForm] = useState({
        vendorId: "",
        invoiceNo: "",
        date: "",
        paymentMode: "Cash"
    });

    const [items, setItems] = useState([
        { productId: "", quantity: 1, rate: 0 }
    ]);

    // 🔹 Load products & vendors with branch-id header
    useEffect(() => {
        const headers = { "branch-id": localStorage.getItem("branchId") || "" };

        axios.get("http://localhost:3000/product", { headers })
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));

        axios.get("http://localhost:3000/vendors", { headers })
            .then(res => setVendors(res.data))
            .catch(err => console.log(err));
    }, []);

    // 🔹 Handle form change
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔹 Handle item change
    const handleItemChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;

        // ✅ Auto rate when product selected
        if (field === "productId") {
            const selectedProduct = products.find(p => p.id == value);
            updated[index].rate = selectedProduct?.rate || 0;
        }

        setItems(updated);
    };

    // 🔹 Add row
    const addRow = () => {
        setItems([...items, { productId: "", quantity: 1, rate: 0 }]);
    };

    // 🔹 Clear form
    const handleClear = () => {
        setForm({
            vendorId: "",
            invoiceNo: "",
            date: "",
            paymentMode: "Cash"
        });
        setItems([{ productId: "", quantity: 1, rate: 0 }]);
    };

    //  SAVE
    const handleSave = async () => {
        try {
            if (!form.vendorId) {
                alert("Select Vendor ❌");
                return;
            }

            const payload = {
                vendorId: Number(form.vendorId),
                invoiceNo: form.invoiceNo,
                date: form.date,
                paymentMode: form.paymentMode,
                items: items.map(i => ({
                    product: { id: Number(i.productId) },
                    quantity: Number(i.quantity),
                    rate: Number(i.rate),
                    amount: Number(i.quantity) * Number(i.rate)
                }))
            };

            await axios.post("http://localhost:3000/purchase", payload, {
                headers: { "branch-id": localStorage.getItem("branchId") || "" }
            });

            alert("Purchase saved ✅");
            handleClear();

        } catch (err) {
            console.log(err);
            alert("Error saving purchase ❌");
        }
    };

    // 🔹 Total
    const total = items.reduce(
        (sum, i) => sum + (i.quantity * i.rate || 0),
        0
    );

    return (
        <div className="purchase-container">

            <div className="header-bar">
                <h2><FaShoppingCart /> Purchase Entry</h2>

                <div className="header-buttons">
                    <button className="btn-outline"><FaTimes /> Cancel</button>
                    <button className="btn-light" onClick={handleClear}><FaUndo /> Clear</button>
                    <button className="btn-primary" onClick={handleSave}><FaSave /> Save Purchase</button>
                </div>
            </div>

            {/* HEADER FORM */}
            <div className="card modern-card">
                <div className="grid-4">

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
                        <label><FaFileInvoice /> Invoice No</label>
                        <input
                            className="modern-input"
                            name="invoiceNo"
                            placeholder="Auto-generated if left blank"
                            value={form.invoiceNo}
                            onChange={handleFormChange}
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

                    <div className="field">
                        <label><FaMoneyBillWave /> Payment Mode</label>
                        <select
                            className="modern-select"
                            name="paymentMode"
                            value={form.paymentMode}
                            onChange={handleFormChange}
                        >
                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Card</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* TABLE */}
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
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleItemChange(index, "quantity", e.target.value)
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
                                    ₹ {(item.quantity * item.rate).toFixed(2)}
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
                <h3>Total Purchase Amount</h3>
                <span>₹ {total.toFixed(2)}</span>
            </div>

        </div>
    );
}