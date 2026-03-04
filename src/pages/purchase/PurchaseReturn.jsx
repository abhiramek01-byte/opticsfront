import { useState } from "react";

export default function PurchaseReturn() {
    const [items, setItems] = useState([
        { product: "", qty: 1, rate: 0, amount: 0 }
    ]);

    const handleItemChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;

        if (field === "qty" || field === "rate") {
            updated[index].amount =
                updated[index].qty * updated[index].rate;
        }

        setItems(updated);
    };

    const addRow = () => {
        setItems([...items, { product: "", qty: 1, rate: 0, amount: 0 }]);
    };

    const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <div className="purchase-container">

            <div className="vendor-header">
                <h2>Purchase Return</h2>

                <div className="header-buttons">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-light">Clear</button>
                    <button className="btn-primary">Save</button>
                </div>
            </div>

            <div className="card purchase-card">
                <div className="purchase-top-grid">

                    <div className="form-field">
                        <label>Voucher Type</label>
                        <select>
                            <option>Purchase Return</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Vendor</label>
                        <input />
                    </div>

                    <div className="form-field">
                        <label>Return Invoice No</label>
                        <input />
                    </div>

                    <div className="form-field">
                        <label>Date</label>
                        <input type="date" />
                    </div>

                </div>
            </div>

            <div className="card">
                <table className="purchase-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        value={item.product}
                                        onChange={(e) =>
                                            handleItemChange(index, "product", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) =>
                                            handleItemChange(index, "qty", e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) =>
                                            handleItemChange(index, "rate", e.target.value)
                                        }
                                    />
                                </td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="btn-light add-row" onClick={addRow}>
                    + Add Item
                </button>
            </div>

            <div className="purchase-summary">
                <h3>Total Return: ₹ {total}</h3>
            </div>

        </div>
    );
}