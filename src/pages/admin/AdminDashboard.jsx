import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {

    const stats = [
        { title: "Total Users", value: 120 },
        { title: "Total Products", value: 340 },
        { title: "Vendors", value: 15 },
        { title: "Orders Today", value: 28 }
    ];

    const recentOrders = [
        { id: "#1001", customer: "Rahul", amount: "₹2500" },
        { id: "#1002", customer: "Anjali", amount: "₹1800" },
        { id: "#1003", customer: "Rohit", amount: "₹3200" },
    ];

    const lowStock = [
        { product: "Blue Cut Lens", stock: 5 },
        { product: "RayBan Frame", stock: 3 },
        { product: "Reading Glass", stock: 7 }
    ];

    const topVendors = [
        { name: "Vision Optics", sales: "₹45,000" },
        { name: "Clear Lens Co.", sales: "₹32,000" },
        { name: "EyeCare Supplies", sales: "₹22,000" }
    ];

    return (
        <div className="admin-dashboard">

            <h1 className="admin-title">Admin Dashboard</h1>

            {/* KPI CARDS */}

            <div className="admin-stats">

                {stats.map((s, i) => (
                    <div className="admin-card" key={i}>
                        <h3>{s.title}</h3>
                        <p>{s.value}</p>
                    </div>
                ))}

            </div>

            {/* SECOND ROW */}

            <div className="admin-grid">

                <div className="admin-box">
                    <h2>Recent Orders</h2>
                    <ul>
                        {recentOrders.map((o, i) => (
                            <li key={i}>
                                {o.id} - {o.customer}
                                <span>{o.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="admin-box">
                    <h2>Low Stock Alert</h2>
                    <ul>
                        {lowStock.map((p, i) => (
                            <li key={i}>
                                {p.product}
                                <span>{p.stock} left</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="admin-box">
                    <h2>Top Vendors</h2>
                    <ul>
                        {topVendors.map((v, i) => (
                            <li key={i}>
                                {v.name}
                                <span>{v.sales}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
}