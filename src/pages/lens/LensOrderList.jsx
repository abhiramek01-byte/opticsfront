import "../../styles/LensOrder.css";

export default function LensOrderList() {

    const orders = [
        {
            id: 1,
            customer: "Rahul",
            vendor: "Essilor",
            type: "Progressive",
            status: "Ordered"
        },
        {
            id: 2,
            customer: "Anil",
            vendor: "Zeiss",
            type: "Blue Cut",
            status: "Pending"
        }
    ];

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
                            <td>{o.customer}</td>
                            <td>{o.vendor}</td>
                            <td>{o.type}</td>
                            <td>{o.status}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );
}