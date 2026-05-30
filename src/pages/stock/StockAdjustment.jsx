import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Transaction.css";

export default function StockAdjustment() {

    const [items, setItems] = useState([
        { product: "", adjustment: 0, type: "Increase" }
    ]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/product")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([
            ...items,
            { product: "", adjustment: 0, type: "Increase" }
        ]);
    };
    
    const removeRow = (index) => {
        if (items.length > 1) {
            const updated = items.filter((_, i) => i !== index);
            setItems(updated);
        } else {
            setItems([{ product: "", adjustment: 0, type: "Increase" }]);
        }
    };

    const handleSave = async () => {
        try {
            for (let item of items) {
                if (!item.product) {
                    alert("Please select a product for all rows.");
                    return;
                }
                
                if (item.adjustment <= 0) {
                    alert("Adjustment quantity must be greater than zero.");
                    return;
                }

                await axios.post(import.meta.env.VITE_API_URL + "/stock-adjustment", {
                    product: Number(item.product),
                    quantity: Number(item.adjustment),
                    type: item.type
                });
            }

            alert("Stock updated successfully ✅");
            setItems([{ product: "", adjustment: 0, type: "Increase" }]);

        } catch (err) {
            console.error(err);
            alert("Error updating stock ❌");
        }
    };
    
    const totalIncrease = items.filter(i => i.type === "Increase").reduce((sum, item) => sum + Number(item.adjustment || 0), 0);
    const totalDecrease = items.filter(i => i.type === "Decrease").reduce((sum, item) => sum + Number(item.adjustment || 0), 0);

    return (
        <div className="transaction-container">

            <div className="transaction-header">
                <h2>Stock Adjustment</h2>

                <div className="transaction-buttons">
                    <button
                        className="btn-secondary"
                        onClick={() => setItems([{ product: "", adjustment: 0, type: "Increase" }])}
                    >
                        Clear All
                    </button>

                    <button className="btn-primary" onClick={handleSave}>
                        Save Adjustments
                    </button>
                </div>
            </div>

            <div className="transaction-card">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th style={{ width: '45%' }}>Product</th>
                            <th style={{ width: '25%' }}>Adjustment Qty</th>
                            <th style={{ width: '20%' }}>Type</th>
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
                                        type="number"
                                        min="0"
                                        value={item.adjustment}
                                        onChange={(e) =>
                                            handleChange(index, "adjustment", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <select
                                        value={item.type}
                                        onChange={(e) =>
                                            handleChange(index, "type", e.target.value)
                                        }
                                    >
                                        <option value="Increase">Increase</option>
                                        <option value="Decrease">Decrease</option>
                                    </select>
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
                    <span className="summary-label">Total Increase</span>
                    <span className="summary-value" style={{ color: '#86efac' }}>+{totalIncrease}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Total Decrease</span>
                    <span className="summary-value" style={{ color: '#fca5a5' }}>-{totalDecrease}</span>
                </div>
            </div>
        </div>
    );
}