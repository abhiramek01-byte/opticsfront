import "../../styles/AdminReports.css";

export default function AdminReports() {

    const stats = [
        { title: "Total Sales", value: "₹1,25,000" },
        { title: "Total Orders", value: "320" },
        { title: "Products Sold", value: "540" },
        { title: "Active Vendors", value: "12" },
    ];

    const topProducts = [
        { name: "RayBan Frame", sold: 120 },
        { name: "Blue Cut Lens", sold: 95 },
        { name: "Reading Glass", sold: 80 },
    ];

    const vendors = [
        { name: "Vision Optics", revenue: "₹45,000" },
        { name: "Clear Lens Co.", revenue: "₹30,000" },
        { name: "EyeCare Supplies", revenue: "₹22,000" },
    ];

    return (
        <div className="report-root">

            <h1 className="report-title">Business Reports</h1>
            <p className="report-subtitle">Analyse sales and performance</p>

            {/* STATISTICS */}

            <div className="report-stats">

                {stats.map((s, index) => (
                    <div className="report-card" key={index}>
                        <h3>{s.title}</h3>
                        <p>{s.value}</p>
                    </div>
                ))}

            </div>

            {/* SECOND SECTION */}

            <div className="report-grid">

                <div className="report-box">
                    <h2>Top Selling Products</h2>

                    <ul>
                        {topProducts.map((p, i) => (
                            <li key={i}>
                                {p.name}
                                <span>{p.sold} sold</span>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="report-box">
                    <h2>Top Vendors</h2>

                    <ul>
                        {vendors.map((v, i) => (
                            <li key={i}>
                                {v.name}
                                <span>{v.revenue}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
}