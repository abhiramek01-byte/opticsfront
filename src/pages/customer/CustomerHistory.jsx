import "../../styles/CustomerHistory.css";
import { useState } from "react";

export default function CustomerHistory() {

    const [search, setSearch] = useState("");

    const [history] = useState([
        {
            customer: "John",
            phone: "9876543210",
            product: "RayBan Frame",
            power: "-1.25",
            date: "12-03-2026",
            status: "Delivered"
        },
        {
            customer: "John",
            phone: "9876543210",
            product: "Blue Cut Lens",
            power: "-1.50",
            date: "20-04-2026",
            status: "Ordered"
        },
        {
            customer: "Ana",
            phone: "9123456780",
            product: "Power Lens",
            power: "-2.00",
            date: "18-02-2026",
            status: "Delivered"
        }
    ]);

    const filteredHistory = history.filter(item =>
        item.phone.includes(search)
    );

    return (

        <div className="history-page">

            <h1>Customer History</h1>

            {/* SEARCH BOX */}

            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search by phone number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <table className="history-table">

                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Product</th>
                        <th>Power</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredHistory.map((item, index) => (
                        <tr key={index}>

                            <td>{item.customer}</td>
                            <td>{item.phone}</td>
                            <td>{item.product}</td>
                            <td>{item.power}</td>
                            <td>{item.date}</td>
                            <td className="status">{item.status}</td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );
}