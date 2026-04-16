import { useState, useEffect } from "react";
import "../../styles/CashReceipt.css";

export default function CashReceipt() {

    const [customers, setCustomers] = useState([]);

    const [receiptNo, setReceiptNo] = useState("RC001");
    const [refNo, setRefNo] = useState("");
    const [date, setDate] = useState("");

    const [items, setItems] = useState([
        { customerId: "", description: "", amount: 0, discount: 0 }
    ]);

    /* FETCH CUSTOMERS */

    useEffect(() => {
        fetch("http://localhost:3000/customers")
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(err => console.error(err));
    }, []);

    /* CALCULATE TOTAL */

    const total = items.reduce(
        (sum, item) => sum + (item.amount - item.discount),
        0
    );

    /* UPDATE ITEM */

    const updateItem = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    /* ADD ROW */

    const addItem = () => {
        setItems([
            ...items,
            { customerId: "", description: "", amount: 0, discount: 0 }
        ]);
    };

    /* SAVE RECEIPT */

    const handleSubmit = async () => {

        const payload = {
            receiptNo,
            refNo,
            date,
            total,
            items: items.map(item => ({
                customerId: Number(item.customerId),
                description: item.description,
                amount: item.amount,
                discount: item.discount,
                net: item.amount - item.discount
            }))
        };

        try {

            const res = await fetch("http://localhost:3000/cash-receipt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            console.log(data);

            alert("Receipt Saved ✅");

            // reset
            setItems([{ customerId: "", description: "", amount: 0, discount: 0 }]);
            setRefNo("");
            setDate("");

        } catch (err) {
            console.error(err);
            alert("Error ❌");
        }

    };

    return (
        <div className="cash-page">

            {/* Top Navigation */}
            <div className="cash-topbar">

                <div className="nav-buttons">
                    <button>◀ Previous</button>
                    <button>Next ▶</button>
                    <button className="edit-btn">Edit</button>
                </div>

                <div className="action-buttons">
                    <button className="cancel">Cancel</button>
                    <button className="clear">Clear</button>
                    <button className="save" onClick={handleSubmit}>
                        Save
                    </button>
                </div>

            </div>

            {/* Header Fields */}
            <div className="cash-form">

                <div className="form-row">

                    <div className="form-group">
                        <label>No</label>
                        <input
                            value={receiptNo}
                            onChange={(e) => setReceiptNo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ref No.</label>
                        <input
                            value={refNo}
                            onChange={(e) => setRefNo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                </div>

                <div className="form-group full">
                    <label>Creditor</label>
                    <input value="CASH IN HAND" readOnly />
                </div>

            </div>

            {/* Table Section */}
            <div className="cash-table-container">

                <table className="cash-table">

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Customer</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Discount</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        {items.map((item, i) => {

                            const net = item.amount - item.discount;

                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>

                                    <td>
                                        <select
                                            value={item.customerId}
                                            onChange={(e) =>
                                                updateItem(i, "customerId", e.target.value)
                                            }
                                        >
                                            <option>Select Customer</option>
                                            {customers.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td>
                                        <input
                                            value={item.description}
                                            onChange={(e) =>
                                                updateItem(i, "description", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            value={item.amount}
                                            onChange={(e) =>
                                                updateItem(i, "amount", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            value={item.discount}
                                            onChange={(e) =>
                                                updateItem(i, "discount", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td>{net}</td>
                                </tr>
                            );
                        })}

                    </tbody>

                </table>

                <button onClick={addItem}>+ Add Row</button>

            </div>

            {/* Bottom Section */}
            <div className="cash-bottom">

                <button className="print-btn" onClick={() => window.print()}>
                    Print
                </button>

                <input
                    className="total-box"
                    value={total}
                    readOnly
                />

            </div>

        </div>
    );
}