import { useState } from "react";
import "../../styles/Damage.css";

export default function Damage() {
    const [items, setItems] = useState([
        { product: "", reason: "", qty: 0 }
    ]);

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([...items, { product: "", reason: "", qty: 0 }]);
    };

    const totalQty = items.reduce((sum, item) => sum + Number(item.qty), 0);

    return (
        <div className="damage-container">

            <div className="damage-header">
                <h2>Damage Entry</h2>

                <div className="damage-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light">Clear</button>
                    <button className="btn-primary">Save</button>
                </div>
            </div>

            <div className="damage-card">

                <table className="damage-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Reason</th>
                            <th>Qty</th>
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
                                        value={item.reason}
                                        onChange={(e) =>
                                            handleChange(index, "reason", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleChange(index, "qty", e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="add-row-btn" onClick={addRow}>
                    + Add Row
                </button>

            </div>

            <div className="damage-summary">
                Total Damaged Quantity: {totalQty}
            </div>

        </div>
    );
}