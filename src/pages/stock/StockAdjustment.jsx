import { useState } from "react";

export default function StockAdjustment() {
    const [items, setItems] = useState([
        { product: "", adjustment: 0, type: "Increase" }
    ]);

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

    return (
        <div className="purchase-container">

            <div className="vendor-header">
                <h2>Stock Adjustment</h2>

                <div className="header-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light">Clear</button>
                    <button className="btn-primary">Save</button>
                </div>
            </div>

            <div className="card">
                <table className="purchase-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Adjustment Qty</th>
                            <th>Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        value={item.product}
                                        onChange={(e) =>
                                            handleChange(index, "product", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
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
                                        <option>Increase</option>
                                        <option>Decrease</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="btn-light add-row" onClick={addRow}>
                    + Add Row
                </button>
            </div>
        </div>
    );
}