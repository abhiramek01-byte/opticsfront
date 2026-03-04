import { useState } from "react";
import "../../styles/OpeningStock.css";

export default function OpeningStock() {
    const [items, setItems] = useState([
        { code: "", product: "", qty: 0, rate: 0 }
    ]);

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([...items, { code: "", product: "", qty: 0, rate: 0 }]);
    };

    const totalQty = items.reduce((sum, item) => sum + Number(item.qty), 0);
    const totalValue = items.reduce(
        (sum, item) => sum + item.qty * item.rate,
        0
    );

    return (
        <div className="opening-container">

            <div className="opening-header">
                <h2>Opening Stock</h2>

                <div className="opening-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light">Clear</button>
                    <button className="btn-primary">Save</button>
                </div>
            </div>

            <div className="opening-card">

                <table className="opening-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        value={item.code}
                                        onChange={(e) =>
                                            handleChange(index, "code", e.target.value)
                                        }
                                    />
                                </td>

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
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleChange(index, "qty", e.target.value)
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) =>
                                            handleChange(index, "rate", e.target.value)
                                        }
                                    />
                                </td>

                                <td>{item.qty * item.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="add-row-btn" onClick={addRow}>
                    + Add Row
                </button>

            </div>

            <div className="opening-summary">
                <div>Total Qty: {totalQty}</div>
                <div>Total Value: {totalValue}</div>
            </div>

        </div>
    );
}