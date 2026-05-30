import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaUser, FaCalendar, FaCreditCard, 
    FaPlus, FaSave, FaTrash,
    FaFileInvoiceDollar, FaList
} from "react-icons/fa";
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
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(res => res.json())
            .then(data => setCustomers(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

        // Products
        fetch(import.meta.env.VITE_API_URL + "/product")
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));

        // Tax Groups
        fetch(import.meta.env.VITE_API_URL + "/tax-group")
            .then(res => res.json())
            .then(data => setTaxGroups(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, []);

    /* TOTAL */
    const subTotal = items.reduce(
        (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0),
        0
    );
    const taxAmount = (subTotal - Number(discount || 0)) * (Number(taxPercent || 0) / 100);
    const netTotal = subTotal - Number(discount || 0) + taxAmount;

    /* ADD ROW */
    const addItem = () => {
        setItems([
            ...items,
            { barcode: "", productId: "", name: "", qty: 1, rate: 0 }
        ]);
    };

    /* REMOVE ROW */
    const removeRow = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated.length ? updated : [{ barcode: "", productId: "", name: "", qty: 1, rate: 0 }]);
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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/product/barcode/${value}`);

                if (!res.ok) {
                    // Fail silently to allow typing, don't alert on every keystroke
                } else {
                    const data = await res.json();
                    if (data && data.id) {
                        updated[index].productId = data.id;
                        updated[index].name = data.productName;
                        updated[index].rate = data.rate || 0;
                        updated[index].qty = 1;
                    }
                }
            } catch (err) {
                console.error("Barcode fetch error", err);
            }
        }
        setItems(updated);
    };

    /* SAVE */
    const handleSubmit = async () => {
        if (!customerId) {
            alert("Please select a customer ❌");
            return;
        }

        const formattedItems = items
            .filter(item => item.productId && Number(item.qty) > 0)
            .map(item => ({
                productId: Number(item.productId),
                quantity: Number(item.qty),
                rate: Number(item.rate),
                amount: Number(item.qty) * Number(item.rate),
                tax: (Number(item.qty) * Number(item.rate)) * (Number(taxPercent) / 100)
            }));

        if (formattedItems.length === 0) {
            alert("Please add at least one valid item to the sale.");
            return;
        }

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
            const res = await fetch(import.meta.env.VITE_API_URL + "/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "branch-id": localStorage.getItem("branchId") || ""
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error("Failed to save sale");
            }

            const data = await res.json();
            alert("Sale Completed ✅");
            navigate(`/dashboard/billing/${data.id}`);

        } catch (err) {
            console.error(err);
            alert("Error saving sale ❌");
        }
    };

    return (
        <div className="sales-page">

            {/* TOPBAR */}
            <div className="sales-topbar">
                <h1 className="page-title">
                    <FaFileInvoiceDollar />
                    New Sale / Billing
                    <span>{invoiceNo}</span>
                </h1>
                <div className="action-buttons">
                    <button className="action-btn cancel" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button className="action-btn save" onClick={handleSubmit}>
                        <FaSave /> Complete Sale
                    </button>
                </div>
            </div>

            {/* FORM */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaUser /> Invoice Details
                </div>
                <div className="form-grid">
                    <div className="input-group">
                        <label><FaFileInvoiceDollar /> Invoice No</label>
                        <input
                            className="modern-input"
                            value={invoiceNo}
                            onChange={(e) => setInvoiceNo(e.target.value)}
                            placeholder="Invoice No"
                        />
                    </div>
                    <div className="input-group">
                        <label><FaCalendar /> Date</label>
                        <input
                            className="modern-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label><FaUser /> Customer</label>
                        <select className="modern-select" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                            <option value="">Select Customer</option>
                            {(Array.isArray(customers) ? customers : []).map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label><FaCreditCard /> Payment Mode</label>
                        <select className="modern-select" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                            <option>Cash</option>
                            <option>Card</option>
                            <option>UPI</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="glass-panel">
                <div className="panel-header">
                    <FaList /> Sale Items
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
                                            placeholder="Scan/Type"
                                            value={item.barcode}
                                            onChange={(e) => handleBarcode(i, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="modern-select"
                                            style={{ border: 'none', background: 'transparent' }}
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
                                            <option value="">Select Product</option>
                                            {(Array.isArray(products) ? products : []).map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.productName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            className="cell-input"
                                            type="number"
                                            min="1"
                                            value={item.qty}
                                            onChange={(e) => updateItem(i, "qty", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="cell-input"
                                            type="number"
                                            min="0"
                                            value={item.rate}
                                            onChange={(e) => updateItem(i, "rate", e.target.value)}
                                        />
                                    </td>
                                    <td className="amount-text">${((Number(item.qty) || 0) * (Number(item.rate) || 0)).toFixed(2)}</td>
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
                <button className="add-row-btn" onClick={addItem}>
                    <FaPlus /> Add Item Row
                </button>
            </div>

            {/* FOOTER */}
            <div className="summary-grid">
                <div className="glass-panel totals-section">
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span><span className="currency-symbol">$</span>{subTotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Discount</span>
                        <input 
                            type="number" 
                            className="modern-input" 
                            style={{width: '120px', textAlign: 'right'}}
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            min="0"
                        />
                    </div>
                    <div className="total-row">
                        <span>Tax Amount</span>
                        <div style={{display: 'flex', gap: '8px'}}>
                            <select 
                                className="modern-select" 
                                style={{width: '120px'}}
                                value={taxPercent} 
                                onChange={(e) => setTaxPercent(e.target.value)}
                            >
                                <option value="0">0%</option>
                                {taxGroups.map(t => (
                                    <option key={t.id} value={t.taxPercent}>
                                        {t.taxGroupName} ({t.taxPercent}%)
                                    </option>
                                ))}
                            </select>
                            <span style={{minWidth: '60px', textAlign: 'right', display: 'flex', alignItems: 'center'}}>
                                <span className="currency-symbol">$</span>{taxAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="total-row net">
                        <span>Net Total</span>
                        <span><span className="currency-symbol">$</span>{netTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}