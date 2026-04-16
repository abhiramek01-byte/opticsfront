import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SalesOrder.css";

export default function SalesOrder() {

    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);

    const [order, setOrder] = useState({
        id: null, // 🔥 store DB id
        voucherType: "SL",
        orderNo: `ORD-${Date.now().toString().slice(-6)}`,
        date: "",
        customerId: "",
        address: "",
        phone: "",
        email: "",
        notes: "",
        total: 0,
        discount: 0,
        netTotal: 0
    });

    const [eye, setEye] = useState({
        rightSphere: "",
        rightCylinder: "",
        leftSphere: "",
        leftCylinder: ""
    });

    const [items, setItems] = useState([
        { barcode: "", productId: "", product: "", model: "", qty: 1, rate: 0, discount: 0, total: 0 }
    ]);

    // 🔹 FETCH CUSTOMERS
    useEffect(() => {
        fetch("http://localhost:3000/customers")
            .then(res => res.json())
            .then(data => setCustomers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, []);

    // 🔹 ORDER CHANGE
    const handleOrderChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "customerId") value = Number(value);
        setOrder({ ...order, [e.target.name]: value });
    };

    // 🔹 ITEM CHANGE
    const handleItemChange = async (index, e) => {
        const newItems = [...items];
        const { name, value } = e.target;

        newItems[index][name] = value;

        // 🔥 BARCODE FETCH
        if (name === "barcode" && value) {
            try {
                const res = await fetch(`http://localhost:3000/product/barcode/${value}`);
                const data = await res.json();

                if (data) {
                    newItems[index].productId = data.id;
                    newItems[index].product = data.productName;
                    newItems[index].model = data.modelCode;
                    newItems[index].rate = data.rate || 0;
                    newItems[index].qty = 1;
                    newItems[index].total = data.rate || 0;
                } else {
                    alert("Product not found ❌");
                }
            } catch {
                alert("Error fetching product");
            }
        }

        // CALCULATION
        const qty = Number(newItems[index].qty);
        const rate = Number(newItems[index].rate);
        const discount = Number(newItems[index].discount);

        newItems[index].total = qty * rate - discount;

        setItems(newItems);
        calculateTotals(newItems);
    };

    const addRow = () => {
        setItems([...items, { barcode: "", productId: "", product: "", model: "", qty: 1, rate: 0, discount: 0, total: 0 }]);
    };

    // 🔹 TOTAL
    const calculateTotals = (itemsList) => {
        const total = itemsList.reduce((sum, item) => sum + Number(item.total), 0);

        setOrder(prev => ({
            ...prev,
            total,
            netTotal: total - Number(prev.discount)
        }));
    };

    // 🔹 SAVE ORDER
    const handleSave = async () => {
        if (!order.customerId) {
            alert("Please select a customer ❌");
            return;
        }

        try {
            const formattedItems = items.filter(i => i.productId).map(i => ({
                productId: Number(i.productId),
                quantity: Number(i.qty),
                rate: Number(i.rate),
                amount: Number(i.total)
            }));

            const payload = { order, eye, items: formattedItems };

            const res = await fetch("http://localhost:3000/sales-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            // 🔥 SAVE REAL ORDER ID
            setOrder(prev => ({
                ...prev,
                id: data.id
            }));

            alert("Order Saved ✅");
            navigate("/dashboard/tracking");

        } catch (err) {
            console.error(err);
            alert("Error saving order ❌");
        }
    };

    return (
        <div className="sales-page">

            {/* TOPBAR */}
            <div className="sales-topbar">
                <div className="left-actions">
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                </div>

                <div className="right-actions">
                    <button type="button" onClick={() => navigate("/dashboard/tracking")}>View Orders</button>
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save" onClick={handleSave}>Save Order</button>
                </div>
            </div>

            {/* FORM */}
            <div className="sales-form">
                <select name="customerId" value={order.customerId} onChange={handleOrderChange}>
                    <option value="">Select Customer</option>
                    {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input
                    name="phone"
                    placeholder="Phone"
                    value={order.phone}
                    onChange={handleOrderChange}
                />
                <input type="date" name="date" onChange={handleOrderChange} />
            </div>

            {/* TABLE */}
            <table>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Barcode</th>
                        <th>Product</th>
                        <th>Model</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>

                            <td>
                                <input
                                    name="barcode"
                                    value={item.barcode}
                                    onChange={(e) => handleItemChange(i, e)}
                                />
                            </td>

                            <td><input value={item.product} readOnly /></td>
                            <td><input value={item.model} readOnly /></td>

                            <td>
                                <input
                                    name="qty"
                                    type="number"
                                    value={item.qty}
                                    onChange={(e) => handleItemChange(i, e)}
                                />
                            </td>

                            <td>
                                <input
                                    name="rate"
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => handleItemChange(i, e)}
                                />
                            </td>

                            <td>
                                <input
                                    name="discount"
                                    type="number"
                                    value={item.discount}
                                    onChange={(e) => handleItemChange(i, e)}
                                />
                            </td>

                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={addRow}>+ Add Row</button>

            {/* TOTAL */}
            <div className="sales-footer">
                <h3>Total: {order.total}</h3>
                <h2>Net Total: {order.netTotal}</h2>
            </div>

        </div>
    );
}