import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaUser, FaCalendar, FaUndo, 
    FaPlus, FaSave, FaTrash,
    FaFileInvoiceDollar, FaList, FaTag
} from "react-icons/fa";
import "../../styles/SalesReturn.css";

export default function SalesReturn() {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    
    const [customerId, setCustomerId] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [voucherType, setVoucherType] = useState("SR");
    const [returnNo, setReturnNo] = useState(`SR-${Date.now().toString().slice(-6)}`);
    
    const [items, setItems] = useState([
        { barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }
    ]);
    
    const fetchReturnNo = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/sales-return/generate-no", {
                headers: { "branch-id": localStorage.getItem("branchId") || "" }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.returnNo) setReturnNo(data.returnNo);
            }
        } catch (err) {
            console.error("Error fetching return no", err);
        }
    };

    useEffect(() => {
        // Fetch Customers
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(res => res.json())
            .then(data => setCustomers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

        // Fetch Products
        fetch(import.meta.env.VITE_API_URL + "/product")
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

        // Fetch Generated Return No
        fetchReturnNo();
    }, []);

    const handleItemChange = async (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        
        if (field === "barcode" && value) {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/product/barcode/${value}`);
                if (res.ok) {
                   const data = await res.json();
                   if (data && data.id) {
                       newItems[index].productId = data.id;
                       newItems[index].product = data.productName;
                       newItems[index].rate = data.rate || 0;
                       newItems[index].qty = 1;
                       newItems[index].amount = data.rate || 0;
                   }
                }
            } catch (e) {
                console.error("Error fetching barcode", e);
            }
        }
        
        if (field === "qty" || field === "rate") {
             const qty = Number(newItems[index].qty) || 0;
             const rate = Number(newItems[index].rate) || 0;
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
        newItems[index].amount = (Number(newItems[index].qty) || 1) * (product?.rate || 0);

        setItems(newItems);
    };

    const addRow = () => {
         setItems([...items, { barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }]);
    };

    const removeRow = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated.length ? updated : [{ barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }]);
    };

    const total = items.reduce((sum, item) => sum + Number(item.amount), 0);
    
    const handleSave = async () => {
         if (!customerId) return alert("Select customer ❌");
         
         const payload = {
             customerId: Number(customerId),
             date: date || new Date().toISOString().split('T')[0],
             reason,
             total,
             returnNo,
             voucherType,
             items: items.filter(i => i.productId).map(i => ({
                 productId: Number(i.productId),
                 quantity: Number(i.qty),
                 rate: Number(i.rate),
                 amount: Number(i.amount)
             }))
         };
         
         if (payload.items.length === 0) {
             return alert("Please add at least one valid item to return. ❌");
         }
         
         try {
             const res = await fetch(import.meta.env.VITE_API_URL + "/sales-return", {
                 method: "POST",
                 headers: { 
                    "Content-Type": "application/json",
                    "branch-id": localStorage.getItem("branchId") || ""
                 },
                 body: JSON.stringify(payload)
             });
             
             if (res.ok) {
                 alert("Sales Return Saved ✅");
                 setItems([{ barcode: "", productId: "", product: "", qty: 1, rate: 0, amount: 0 }]);
                 setCustomerId("");
                 setReason("");
                 setVoucherType("SR");
                 fetchReturnNo(); // Refresh the return no
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
        <div className="sales-page">

            {/* TOPBAR */}
            <div className="sales-topbar">
                <h1 className="page-title">
                    <FaUndo />
                    Sales Return
                    <span>{returnNo}</span>
                </h1>
                <div className="action-buttons">
                    <button className="action-btn cancel" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button className="action-btn save" onClick={handleSave}>
                        <FaSave /> Save Return
                    </button>
                </div>
            </div>

            {/* FORM */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaFileInvoiceDollar /> Return Details
                </div>
                <div className="form-grid">
                    <div className="input-group">
                        <label><FaTag /> Voucher Type</label>
                        <select className="modern-select" value={voucherType} onChange={(e) => setVoucherType(e.target.value)}>
                            <option value="SR">Sales Return (SR)</option>
                            <option value="CN">Credit Note (CN)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label><FaFileInvoiceDollar /> Return No</label>
                        <input className="modern-input" value={returnNo} readOnly />
                    </div>

                    <div className="input-group">
                        <label><FaCalendar /> Date</label>
                        <input className="modern-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label><FaUser /> Customer</label>
                        <select className="modern-select" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                            <option value="">Select Customer</option>
                            {(Array.isArray(customers) ? customers : []).map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* ITEMS TABLE */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaList /> Return Items
                </div>
                <div className="sales-table-container">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th style={{width: '60px'}}>#</th>
                                <th>Barcode</th>
                                <th>Product Name</th>
                                <th style={{width: '120px'}}>Qty</th>
                                <th style={{width: '150px'}}>Rate</th>
                                <th style={{width: '150px'}}>Total</th>
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
                                            value={item.barcode} 
                                            onChange={(e) => handleItemChange(i, "barcode", e.target.value)} 
                                            placeholder="Scan/Type" 
                                        />
                                    </td>
                                    <td>
                                        <select 
                                            className="modern-select"
                                            style={{ border: 'none', background: 'transparent' }}
                                            value={item.productId} 
                                            onChange={(e) => handleProductSelect(i, e.target.value)}
                                        >
                                            <option value="">Select Product...</option>
                                            {(Array.isArray(products) ? products : []).map(p => (
                                                <option key={p.id} value={p.id}>{p.productName}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            className="cell-input"
                                            type="number" 
                                            min="1"
                                            value={item.qty} 
                                            onChange={(e) => handleItemChange(i, "qty", e.target.value)} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            className="cell-input"
                                            type="number" 
                                            min="0"
                                            value={item.rate} 
                                            onChange={(e) => handleItemChange(i, "rate", e.target.value)} 
                                        />
                                    </td>
                                    <td className="amount-text"><span className="currency-symbol">₹</span>{Number(item.amount).toFixed(2)}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => removeRow(i)} title="Remove Item">
                                            <FaTrash />
                                        </button>
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

            {/* FOOTER */}
            <div className="summary-grid">
                <div className="glass-panel notes-section" style={{marginBottom: 0}}>
                    <div className="panel-header">
                        Reason for Return
                    </div>
                    <textarea 
                        className="modern-input"
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)} 
                        placeholder="Add reason for return, condition of items, etc..." 
                    />
                </div>

                <div className="glass-panel totals-section" style={{marginBottom: 0, justifyContent: 'flex-end'}}>
                    <div className="total-row net">
                        <span>Net Refund Total</span>
                        <span><span className="currency-symbol">₹</span>{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}