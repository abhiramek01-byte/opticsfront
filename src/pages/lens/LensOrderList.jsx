import { useEffect, useState } from "react";
import "../../styles/LensOrder.css";

export default function LensOrderList() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/lens-order")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Error:", err));
    }, []);

    return (
        <div className="lens-page">

            <h2>Lens Orders</h2>

            <table className="lens-table">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Vendor</th>
                        <th>Lens Type</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.customerName}</td>
                            <td>{o.vendor}</td>
                            <td>{o.lensType}</td>
                            <td>{o.status || "Pending"}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}