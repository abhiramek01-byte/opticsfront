import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Transaction.css";

export default function Damage() {

    const [items, setItems] = useState([
        { product: "", reason: "", qty: 0 }
    ]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/product")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
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

                await axios.post("http://localhost:3000/damage", {
                    product: Number(item.product),
                    reason: item.reason,
                    quantity: Number(item.qty)
                });
            }

            alert("Damage saved successfully ✅");
            setItems([{ product: "", reason: "", qty: 0 }]);

        } catch (err) {
            console.error(err);
            alert("Error saving damage ❌");
        }
    };

    const totalQty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);

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

        </div>
    );
}