import { useEffect, useState } from "react";
import axios from "axios";
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

    // 🔹 Load products
    useEffect(() => {
        axios.get("http://localhost:3000/product")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    // 🔹 Load vendors
    useEffect(() => {
        axios.get("http://localhost:3000/vendor/getvendors")
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
                paymentMode: form.paymentMode,
                items: items.map(i => ({
                    product: { id: Number(i.productId) },
                    quantity: Number(i.quantity),
                    rate: Number(i.rate),
                    amount: Number(i.quantity) * Number(i.rate)
                }))
            };

            await axios.post("http://localhost:3000/purchase", payload);

            alert("Purchase saved ✅");

            // 🔄 Reset form
            setForm({
                vendorId: "",
                invoiceNo: "",
                date: "",
                paymentMode: "Cash"
            });

            setItems([{ productId: "", quantity: 1, rate: 0 }]);

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

            <h2>Purchase Entry</h2>

            {/* HEADER */}
            <div className="purchase-header">

                {/* ✅ Vendor Dropdown */}
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

                <input
                    name="invoiceNo"
                    placeholder="Invoice No"
                    value={form.invoiceNo}
                    onChange={handleFormChange}
                />

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                />

                <select
                    name="paymentMode"
                    value={form.paymentMode}
                    onChange={handleFormChange}
                >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>
                </select>

            </div>

            {/* TABLE */}
            <table className="purchase-table">
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

                            {/* PRODUCT DROPDOWN */}
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
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(index, "quantity", e.target.value)
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

                            <td>
                                {item.quantity * item.rate}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={addRow}>+ Add Item</button>

            <h3>Total: ₹ {total}</h3>

            <button onClick={handleSave}>Save Purchase</button>

        </div>
    );
}