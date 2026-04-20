import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/PurchaseReturn.css";

export default function PurchaseReturn() {

    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        vendorId: "",
        invoiceNo: "",
        date: ""
    });

    const [items, setItems] = useState([
        { productId: "", qty: 1, rate: 0, amount: 0 }
    ]);

    // 🔹 Load Vendors
    useEffect(() => {
        axios.get("http://localhost:3000/vendor/getvendors")
            .then(res => setVendors(res.data))
            .catch(err => console.log(err));
    }, []);

    // 🔹 Load Products
    useEffect(() => {
        axios.get("http://localhost:3000/product")
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
        setForm({ vendorId: "", invoiceNo: "", date: "" });
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

            await axios.post("http://localhost:3000/purchase-return", payload);

            alert("Purchase Return Saved ✅");

            handleClear();

        } catch (err) {
            console.log(err);
            alert("Error saving ❌");
        }
    };

    return (
        <div className="purchase-container modern">

            {/* HEADER */}
            <div className="header-bar">
                <h2>Purchase Return</h2>

                <div className="header-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light" onClick={handleClear}>Clear</button>
                    <button className="btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>

            {/* FORM */}
            <div className="card modern-card">
                <div className="grid-4">

                    <div className="field">
                        <label>Voucher Type</label>
                        <select>
                            <option>Purchase Return</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Vendor</label>
                        <select
                            name="vendorId"
                            value={form.vendorId}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Vendor</option>
                            {vendors.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Return Invoice</label>
                        <input
                            name="invoiceNo"
                            value={form.invoiceNo}
                            onChange={handleFormChange}
                            placeholder="INV-001"
                        />
                    </div>

                    <div className="field">
                        <label>Date</label>
                        <input
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
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
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
                                        <option value="">Select</option>
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
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleItemChange(index, "qty", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) =>
                                            handleItemChange(index, "rate", e.target.value)
                                        }
                                    />
                                </td>

                                <td className="amount">
                                    ₹ {item.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="add-btn" onClick={addRow}>
                    + Add Item
                </button>

            </div>

            {/* TOTAL */}
            <div className="summary-box">
                <h3>Total Return</h3>
                <span>₹ {total}</span>
            </div>

        </div>
    );
}