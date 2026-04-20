import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/LensOrder.css";

export default function ReceiveLens() {

    const [deliveries, setDeliveries] = useState([]);

    // 🔹 Load pending orders from backend
    useEffect(() => {
        axios.get("http://localhost:3000/lens-order")
            .then(res => {
                // Only show NOT received orders
                const pending = res.data.filter(o => o.status !== "Received");

                setDeliveries(pending.map(o => ({
                    id: o.id,
                    customer: o.customerName,
                    lens: o.lensType,
                    vendor: o.vendor
                })));
            })
            .catch(err => console.log(err));
    }, []);

    // 🔹 Handle Receive Button
    const handleReceive = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/lens-order/receive/${id}`);

            alert("Added to stock ✅");

            // Remove from UI (no reload needed)
            setDeliveries(prev => prev.filter(item => item.id !== id));

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="lens-page">

            <h2>Receive Lens</h2>

            <table className="lens-table">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Lens</th>
                        <th>Vendor</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {deliveries.map((d) => (
                        <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.customer}</td>
                            <td>{d.lens}</td>
                            <td>{d.vendor}</td>
                            <td>
                                <button
                                    className="receive-btn"
                                    onClick={() => handleReceive(d.id)}
                                >
                                    Receive & Add to Stock
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}