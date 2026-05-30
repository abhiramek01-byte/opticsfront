import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaUser, FaCalendar, FaPhone, FaMapMarkerAlt, 
    FaPlus, FaSave, FaArrowLeft, FaEye, FaTrash,
    FaFileInvoiceDollar, FaNotesMedical, FaList
} from "react-icons/fa";
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
        fetch(import.meta.env.VITE_API_URL + "/customers")
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

    // 🔹 EYE PRESCRIPTION CHANGE
    const handleEyeChange = (e) => {
        setEye({ ...eye, [e.target.name]: e.target.value });
    };

    // 🔹 ITEM CHANGE
    const handleItemChange = (index, e) => {
        const { name, value } = e.target;

        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = { ...newItems[index], [name]: value };

            if (name !== "barcode") {
                const qty = Number(newItems[index].qty) || 0;
                const rate = Number(newItems[index].rate) || 0;
                const discount = Number(newItems[index].discount) || 0;
                newItems[index].total = (qty * rate) - discount;
            }
            
            // We still want to recalculate global totals. It's safe to call here with newItems.
            calculateTotals(newItems, order.discount);
            return newItems;
        });

        // 🔥 BARCODE FETCH (Non-blocking)
        if (name === "barcode" && value) {
            fetch(`${import.meta.env.VITE_API_URL}/product/barcode/${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.id) {
                        setItems(prevItems => {
                            const newItems = [...prevItems];
                            newItems[index] = {
                                ...newItems[index],
                                productId: data.id,
                                product: data.productName,
                                model: data.modelCode,
                                rate: data.rate || 0,
                                qty: 1,
                                total: data.rate || 0
                            };
                            calculateTotals(newItems, order.discount);
                            return newItems;
                        });
                    }
                })
                .catch(err => console.error("Error fetching product by barcode:", err));
        }
    };

    const addRow = () => {
        setItems([...items, { barcode: "", productId: "", product: "", model: "", qty: 1, rate: 0, discount: 0, total: 0 }]);
    };

    const removeRow = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        calculateTotals(newItems, order.discount);
    };

    // 🔹 TOTAL
    const calculateTotals = (itemsList, globalDiscount) => {
        const total = itemsList.reduce((sum, item) => sum + Number(item.total), 0);
        
        setOrder(prev => ({
            ...prev,
            total,
            discount: globalDiscount,
            netTotal: total - Number(globalDiscount || 0)
        }));
    };

    const handleGlobalDiscountChange = (e) => {
        const discount = e.target.value;
        setOrder(prev => ({ ...prev, discount }));
        calculateTotals(items, discount);
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

            const res = await fetch(import.meta.env.VITE_API_URL + "/sales-order", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "branch-id": localStorage.getItem("branchId") || ""
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            // 🔥 SAVE REAL ORDER ID
            setOrder(prev => ({
                ...prev,
                id: data.order?.id || data.id
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
                <h1 className="page-title">
                    <FaFileInvoiceDollar />
                    New Sales Order
                    <span>{order.orderNo}</span>
                </h1>
                <div className="action-buttons">
                    <button className="action-btn view" type="button" onClick={() => navigate("/dashboard/tracking")}>
                        <FaList /> View Orders
                    </button>
                    <button className="action-btn save" onClick={handleSave}>
                        <FaSave /> Save Order
                    </button>
                </div>
            </div>

            {/* FORM */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaUser /> Customer Details
                </div>
                <div className="form-grid">
                    <div className="input-group">
                        <label><FaUser /> Customer</label>
                        <select className="modern-select" name="customerId" value={order.customerId} onChange={handleOrderChange}>
                            <option value="">Select Customer</option>
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label><FaPhone /> Phone</label>
                        <input
                            className="modern-input"
                            name="phone"
                            placeholder="Phone Number"
                            value={order.phone}
                            onChange={handleOrderChange}
                        />
                    </div>
                    <div className="input-group">
                        <label><FaCalendar /> Date</label>
                        <input 
                            className="modern-input" 
                            type="date" 
                            name="date" 
                            value={order.date}
                            onChange={handleOrderChange} 
                        />
                    </div>
                    <div className="input-group">
                        <label><FaMapMarkerAlt /> Address</label>
                        <input
                            className="modern-input"
                            name="address"
                            placeholder="Address"
                            value={order.address || ""}
                            onChange={handleOrderChange}
                        />
                    </div>
                </div>
            </div>

            {/* EYE PRESCRIPTION */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaEye /> Eye Prescription
                </div>
                <div className="eye-grid">
                    <div className="eye-section right-eye">
                        <div className="eye-title">Right Eye (OD)</div>
                        <div className="prescription-row">
                            <div className="input-group">
                                <label>Sphere</label>
                                <input className="modern-input" name="rightSphere" value={eye.rightSphere} onChange={handleEyeChange} placeholder="+0.00" />
                            </div>
                            <div className="input-group">
                                <label>Cylinder</label>
                                <input className="modern-input" name="rightCylinder" value={eye.rightCylinder} onChange={handleEyeChange} placeholder="-0.00" />
                            </div>
                        </div>
                    </div>
                    <div className="eye-section left-eye">
                        <div className="eye-title">Left Eye (OS)</div>
                        <div className="prescription-row">
                            <div className="input-group">
                                <label>Sphere</label>
                                <input className="modern-input" name="leftSphere" value={eye.leftSphere} onChange={handleEyeChange} placeholder="+0.00" />
                            </div>
                            <div className="input-group">
                                <label>Cylinder</label>
                                <input className="modern-input" name="leftCylinder" value={eye.leftCylinder} onChange={handleEyeChange} placeholder="-0.00" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaList /> Order Items
                </div>
                <div className="sales-table-container">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th style={{width: '60px'}}>#</th>
                                <th>Barcode</th>
                                <th>Product Name</th>
                                <th>Model</th>
                                <th style={{width: '100px'}}>Qty</th>
                                <th style={{width: '120px'}}>Rate</th>
                                <th style={{width: '120px'}}>Discount</th>
                                <th style={{width: '120px'}}>Total</th>
                                <th style={{width: '60px'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td style={{textAlign: 'center', color: '#64748b', fontWeight: '500'}}>{i + 1}</td>
                                    <td>
                                        <input
                                            className="cell-input"
                                            name="barcode"
                                            placeholder="Scan/Type"
                                            value={item.barcode}
                                            onChange={(e) => handleItemChange(i, e)}
                                        />
                                    </td>
                                    <td><input className="cell-input" value={item.product} readOnly placeholder="Auto-filled" /></td>
                                    <td><input className="cell-input" value={item.model} readOnly placeholder="-" /></td>
                                    <td>
                                        <input
                                            className="cell-input"
                                            name="qty"
                                            type="number"
                                            min="1"
                                            value={item.qty}
                                            onChange={(e) => handleItemChange(i, e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="cell-input"
                                            name="rate"
                                            type="number"
                                            min="0"
                                            value={item.rate}
                                            onChange={(e) => handleItemChange(i, e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="cell-input"
                                            name="discount"
                                            type="number"
                                            min="0"
                                            value={item.discount}
                                            onChange={(e) => handleItemChange(i, e)}
                                        />
                                    </td>
                                    <td className="amount-text">${Number(item.total).toFixed(2)}</td>
                                    <td>
                                        {items.length > 1 && (
                                            <button className="delete-btn" onClick={() => removeRow(i)} title="Remove Item">
                                                <FaTrash />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="add-row-btn" onClick={addRow}>
                    <FaPlus /> Add Item Row
                </button>
            </div>

            {/* SUMMARY */}
            <div className="summary-grid">
                <div className="glass-panel notes-section" style={{marginBottom: 0}}>
                    <div className="panel-header">
                        <FaNotesMedical /> Order Notes
                    </div>
                    <textarea 
                        className="modern-input" 
                        name="notes"
                        placeholder="Add any special instructions, delivery notes, or customer preferences here..."
                        value={order.notes}
                        onChange={handleOrderChange}
                    />
                </div>

                <div className="glass-panel totals-section" style={{marginBottom: 0}}>
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span><span className="currency-symbol">$</span>{Number(order.total).toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Global Discount</span>
                        <input 
                            type="number" 
                            className="modern-input" 
                            style={{width: '100px', textAlign: 'right'}}
                            value={order.discount}
                            onChange={handleGlobalDiscountChange}
                            min="0"
                        />
                    </div>
                    <div className="total-row net">
                        <span>Net Total</span>
                        <span><span className="currency-symbol">$</span>{Number(order.netTotal).toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}