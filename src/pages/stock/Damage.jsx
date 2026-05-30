import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Transaction.css";

export default function Damage() {

    const [items, setItems] = useState([
        { product: "", reason: "", qty: 0 }
    ]);

    const [products, setProducts] = useState([]);
    const [damageList, setDamageList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDamageList = () => {
        axios.get(import.meta.env.VITE_API_URL + "/damage")
            .then(res => {
                setDamageList(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/product")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));

        fetchDamageList();
    }, []);

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([...items, { product: "", reason: "", qty: 0 }]);
    };
    
    const removeRow = (index) => {
        if (items.length > 1) {
            const updated = items.filter((_, i) => i !== index);
            setItems(updated);
        } else {
            setItems([{ product: "", reason: "", qty: 0 }]);
        }
    };

    const handleSave = async () => {
        try {
            for (let item of items) {
                if (!item.product) {
                    alert("Please select a product for all rows.");
                    return;
                }
                
                if (item.qty <= 0) {
                    alert("Quantity must be greater than zero.");
                    return;
                }

                await axios.post(import.meta.env.VITE_API_URL + "/damage", {
                    product: Number(item.product),
                    reason: item.reason,
                    quantity: Number(item.qty)
                });
            }

            alert("Damage saved successfully ✅");
            setItems([{ product: "", reason: "", qty: 0 }]);
            fetchDamageList();

        } catch (err) {
            console.error(err);
            alert("Error saving damage ❌");
        }
    };

    const getProductName = (productId) => {
        const prod = products.find(p => p.id === Number(productId));
        return prod ? prod.productName : `Product #${productId}`;
    };

    const filteredDamages = damageList.filter(damage => {
        const prodName = getProductName(damage.product).toLowerCase();
        const reason = (damage.reason || "").toLowerCase();
        const search = searchTerm.toLowerCase();
        return prodName.includes(search) || reason.includes(search) || String(damage.id).includes(search);
    });

    const totalQty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
    const totalHistoricalQty = damageList.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const uniqueProductsDamaged = new Set(damageList.map(item => item.product)).size;

    return (
        <div className="transaction-container">

            <div className="transaction-header">
                <h2>Damage Entry</h2>

                <div className="transaction-buttons">
                    <button 
                        className="btn-secondary"
                        onClick={() => setItems([{ product: "", reason: "", qty: 0 }])}
                    >
                        Clear All
                    </button>

                    <button className="btn-primary" onClick={handleSave}>
                        Save Damage Batch
                    </button>
                </div>
            </div>

            <div className="transaction-card">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Product</th>
                            <th style={{ width: '35%' }}>Reason</th>
                            <th style={{ width: '15%' }}>Qty</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <select
                                        value={item.product}
                                        onChange={(e) =>
                                            handleChange(index, "product", e.target.value)
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
                                        placeholder="e.g. Broken in transit"
                                        value={item.reason}
                                        onChange={(e) =>
                                            handleChange(index, "reason", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleChange(index, "qty", e.target.value)
                                        }
                                    />
                                </td>
                                
                                <td style={{ textAlign: 'center' }}>
                                    <button 
                                        className="btn-danger" 
                                        onClick={() => removeRow(index)}
                                    >
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="btn-add-row" onClick={addRow}>
                    <span style={{ fontSize: '18px' }}>+</span> Add Row
                </button>
            </div>

            <div className="transaction-summary">
                <div className="summary-item">
                    <span className="summary-label">Total Damaged Qty</span>
                    <span className="summary-value">{totalQty} Units</span>
                </div>
            </div>

            {/* --- DAMAGE HISTORY LIST --- */}
            <div className="transaction-card" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '20px', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                        Damage History & Items List
                    </h3>
                    <input
                        type="text"
                        placeholder="🔍 Search history by product or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            maxWidth: '350px',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.95rem',
                            outline: 'none',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                            background: '#ffffff'
                        }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '15px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.5)' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Total Historical Damages</span>
                        <h4 style={{ fontSize: '1.8rem', margin: '5px 0 0 0', color: '#e11d48', fontWeight: '700' }}>{totalHistoricalQty} Units</h4>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.7)', padding: '15px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.5)' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Unique Items Affected</span>
                        <h4 style={{ fontSize: '1.8rem', margin: '5px 0 0 0', color: '#3b82f6', fontWeight: '700' }}>{uniqueProductsDamaged} Products</h4>
                    </div>
                </div>

                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>Damage ID</th>
                            <th style={{ width: '40%' }}>Product Name</th>
                            <th style={{ width: '30%' }}>Reason</th>
                            <th style={{ width: '15%' }}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDamages.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                                    No recorded damage entries found.
                                </td>
                            </tr>
                        ) : (
                            filteredDamages.map((damage) => (
                                <tr key={damage.id}>
                                    <td style={{ fontWeight: '600', color: '#475569' }}>#{damage.id}</td>
                                    <td style={{ fontWeight: '500', color: '#0f172a' }}>
                                        {getProductName(damage.product)}
                                    </td>
                                    <td style={{ color: '#475569' }}>
                                        {damage.reason || <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>No reason provided</span>}
                                    </td>
                                    <td style={{ fontWeight: '600', color: '#e11d48' }}>
                                        {damage.quantity} Units
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}