import { useState, useEffect } from "react";
import "../../styles/SalesReturn.css";

export default function SalesReturn() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [returnNo, setReturnNo] = useState(`SR-${Date.now().toString().slice(-6)}`);
    
    const [items, setItems] = useState([
        { barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }
    ]);
    
    useEffect(() => {
        // Fetch Customers
        fetch("http://localhost:3000/customers")
            .then(res => res.json())
            .then(data => setCustomers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

        // Fetch Products
        fetch("http://localhost:3000/product")
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, []);

    const handleItemChange = async (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        
        if (field === "barcode" && value) {
            try {
                const res = await fetch(`http://localhost:3000/product/barcode/${value}`);
                if (res.ok) {
                   const data = await res.json();
                   if (data) {
                       newItems[index].productId = data.id;
                       newItems[index].product = data.productName;
                       newItems[index].rate = data.rate || 0;
                       newItems[index].qty = 1;
                       newItems[index].amount = data.rate || 0;
                   }
                }
            } catch (e) {
                console.error(e);
            }
        }
        
        if (field === "qty" || field === "rate") {
             const qty = Number(newItems[index].qty);
             const rate = Number(newItems[index].rate);
             newItems[index].amount = qty * rate;
        }

        setItems(newItems);
    };

    const handleProductSelect = (index, selectedId) => {
        const product = products.find(p => p.id === Number(selectedId));
        const newItems = [...items];
        
        newItems[index].productId = selectedId;
        newItems[index].product = product?.productName || "";
        newItems[index].rate = product?.rate || 0;
        newItems[index].amount = (newItems[index].qty || 1) * (product?.rate || 0);

        setItems(newItems);
    };

    const addRow = () => {
         setItems([...items, { barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }]);
    };

    const total = items.reduce((sum, item) => sum + Number(item.amount), 0);
    
    const handleSave = async () => {
         if (!customerId) return alert("Select customer");
         
         const payload = {
             customerId: Number(customerId),
             date: date || new Date().toISOString().split('T')[0],
             reason,
             total,
             returnNo,
             items: items.filter(i => i.productId).map(i => ({
                 productId: Number(i.productId),
                 quantity: Number(i.qty),
                 rate: Number(i.rate),
                 amount: Number(i.amount)
             }))
         };
         
         try {
             const res = await fetch("http://localhost:3000/sales-return", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(payload)
             });
             
             if (res.ok) {
                 alert("Sales Return Saved ✅");
                 setItems([{ barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }]);
                 setCustomerId("");
                 setReason("");
                 setReturnNo(`SR-${Date.now().toString().slice(-6)}`);
             } else {
                 const errData = await res.json();
                 alert(`Error saving return ❌: ${errData.message || 'Unknown'}`);
             }
         } catch(e) {
             console.error(e);
             alert("Error saving return ❌");
         }
    };

    return (
        <div className="sales-return-page">

            {/* Topbar */}
            <div className="sales-topbar">
                <div className="left-actions">
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                    <button>Edit</button>
                </div>

                <div className="right-actions">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save" onClick={handleSave}>Save Return</button>
                </div>
            </div>

            {/* Form */}
            <div className="sales-form">
                <div className="form-grid">
                    <div>
                        <label>Voucher Type</label>
                        <select>
                            <option>SR</option>
                        </select>
                    </div>

                    <div>
                        <label>Return No</label>
                        <input value={returnNo} readOnly />
                    </div>

                    <div>
                        <label>Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div>
                        <label>Customer</label>
                        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                            <option value="">Select Customer</option>
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Reason</label>
                        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for return" />
                    </div>
                </div>
            </div>

            {/* Items Table */}
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
                                <td>
                                    <input 
                                        value={item.barcode} 
                                        onChange={(e) => handleItemChange(i, "barcode", e.target.value)} 
                                        placeholder="Scan code" 
                                    />
                                </td>
                                <td>
                                    <select 
                                        value={item.productId} 
                                        onChange={(e) => handleProductSelect(i, e.target.value)}
                                    >
                                        <option value="">Select Product...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>{p.productName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={item.qty} 
                                        onChange={(e) => handleItemChange(i, "qty", e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={item.rate} 
                                        onChange={(e) => handleItemChange(i, "rate", e.target.value)} 
                                    />
                                </td>
                                <td>{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={addRow}>+ Add Row</button>
            </div>

            {/* Footer */}
            <div className="sales-footer">
                <div className="totals" style={{ marginLeft: "auto", textAlign: "right", marginTop: "15px" }}>
                    <div className="net-total" style={{ borderTop: "2px solid #ddd", paddingTop: "10px" }}>
                        Net Refund Total : <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}