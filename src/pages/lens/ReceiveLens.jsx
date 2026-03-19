import "../../styles/LensOrder.css";

export default function ReceiveLens() {

    const deliveries = [
        {
            id: 1,
            customer: "Rahul",
            lens: "Progressive",
            vendor: "Essilor"
        }
    ];

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
                                <button className="receive-btn">
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