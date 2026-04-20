import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Sales.css";

export default function Sales() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [customerId, setCustomerId] = useState("");
    const [invoiceNo, setInvoiceNo] = useState(`INV-${Date.now().toString().slice(-6)}`);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [date, setDate] = useState("");

    const [items, setItems] = useState([
        { barcode: "", productId: "", name: "", qty: 1, rate: 0 }
    ]);

    const [discount, setDiscount] = useState(0);
    const [taxPercent, setTaxPercent] = useState(0);
    const [taxGroups, setTaxGroups] = useState([]);

    /* FETCH DATA */
    useEffect(() => {

        // Customers
        fetch("http://localhost:3000/customers")
            .then(res => res.json())
            .then(data => setCustomers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

        // Products
        fetch("http://localhost:3000/product")
            .then(res => res.json())
            .then(data => {
                console.log("Products:", data);
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error(err));

        // Tax Groups
        fetch("http://localhost:3000/tax-group")
            .then(res => res.json())
            .then(data => setTaxGroups(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

    }, []);

    /* TOTAL */
    const subTotal = items.reduce(
        (sum, item) => sum + item.qty * item.rate,
        0
    );
    const taxAmount = (subTotal - discount) * (taxPercent / 100);
    const netTotal = subTotal - discount + taxAmount;

    /* ADD ROW */
    const addItem = () => {
        setItems([
            ...items,
            { barcode: "", productId: "", name: "", qty: 1, rate: 0 }
        ]);
    };

    /* UPDATE ITEM */
    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    /* BARCODE FETCH */
    const handleBarcode = async (index, value) => {

        const updated = [...items];
        updated[index].barcode = value;

        if (value) {
            try {
                const res = await fetch(`http://localhost:3000/product/barcode/${value}`);

                if (!res.ok) {
                    alert("Barcode not found ❌");
                    return;
                }

                const data = await res.json();

                console.log("Barcode result:", data);

                if (data) {
                    updated[index].productId = data.id;
                    updated[index].name = data.productName;
                    updated[index].rate = data.rate || 0;
                    updated[index].qty = 1;
                }

            } catch (err) {
                console.error(err);
            }
        }

        setItems(updated);
    };

    /* SAVE */
    const handleSubmit = async () => {

        if (!customerId) {
            alert("Select customer");
            return;
        }

        const formattedItems = items
            .filter(item => item.productId && item.qty > 0)
            .map(item => ({
                productId: Number(item.productId),
                quantity: item.qty,
                rate: item.rate,
                amount: item.qty * item.rate,
                tax: (item.qty * item.rate) * (taxPercent / 100)
            }));

        const payload = {
            customerId: Number(customerId),
            invoiceNo,
            paymentMode,
            date,
            total: subTotal,
            discount: Number(discount),
            netTotal: Number(netTotal),
            items: formattedItems
        };

        try {

            const res = await fetch("http://localhost:3000/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log(data);

            alert("Sale Completed ✅");
            navigate(`/dashboard/billing/${data.id}`);

        } catch (err) {
            console.error(err);
            alert("Error ❌");
        }
    };

    return (
        <div className="sales-page">

            {/* TOPBAR */}
            <div className="sales-topbar">
                <div>
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                    <button>Edit</button>
                </div>

                <div className="right-actions">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>

            {/* FORM */}
            <div className="sales-form">
                <div className="form-grid">

                    <input
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        placeholder="Invoice No"
                    />

                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <select onChange={(e) => setCustomerId(e.target.value)}>
                        <option>Select Customer</option>
                        {(Array.isArray(customers) ? customers : []).map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={(e) => setPaymentMode(e.target.value)}>
                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                    </select>

                </div>
            </div>

            {/* TABLE */}
            <div className="sales-table">
                <table>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Barcode</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>

                                {/* BARCODE */}
                                <td>
                                    <input
                                        value={item.barcode}
                                        onChange={(e) =>
                                            handleBarcode(i, e.target.value)
                                        }
                                    />
                                </td>

                                {/* PRODUCT */}
                                <td>
                                    <select
                                        value={item.productId}
                                        onChange={(e) => {
                                            const selectedId = Number(e.target.value);
                                            const product = products.find(p => p.id === selectedId);

                                            const updated = [...items];
                                            updated[i].productId = selectedId;
                                            updated[i].name = product?.productName || "";
                                            updated[i].rate = product?.rate || 0;

                                            setItems(updated);
                                        }}
                                    >
                                        <option>Select</option>
                                        {(Array.isArray(products) ? products : []).map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.productName}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                {/* QTY */}
                                <td>
                                    <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) =>
                                            updateItem(i, "qty", Number(e.target.value))
                                        }
                                    />
                                </td>

                                {/* RATE */}
                                <td>
                                    <input
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) =>
                                            updateItem(i, "rate", Number(e.target.value))
                                        }
                                    />
                                </td>

                                {/* TOTAL */}
                                <td>{item.qty * item.rate}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={addItem}>+ Add Item</button>
            </div>

            {/* FOOTER */}
            <div className="sales-footer">
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <label>Discount: ₹
                        <input type="number" style={{width: '80px', marginLeft: '5px'}} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                    </label>
                    <label>Tax:
                        <select style={{marginLeft: '5px', borderRadius: '4px', border: '1px solid #ccc', padding: '4px'}} value={taxPercent} onChange={(e) => setTaxPercent(Number(e.target.value))}>
                            <option value="0">0%</option>
                            {taxGroups.map(t => (
                                <option key={t.id} value={t.taxPercent}>
                                    {t.taxGroupName} ({t.taxPercent}%)
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <h3>Subtotal: ₹{subTotal.toFixed(2)}</h3>
                <h2>Net Total: ₹{netTotal.toFixed(2)}</h2>
            </div>

        </div>
    );
}