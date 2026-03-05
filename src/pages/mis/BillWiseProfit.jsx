import "../../styles/MIS.css";

export default function BillWiseProfit() {

    const bills = [
        {
            invoice: "#INV-2023-001",
            date: "Oct 24, 2023",
            customer: "Michael Anderson",
            sales: 1250,
            cost: 850,
            profit: 400,
            percent: "32%"
        },
        {
            invoice: "#INV-2023-002",
            date: "Oct 24, 2023",
            customer: "Sarah Jenkins",
            sales: 450,
            cost: 310,
            profit: 140,
            percent: "31%"
        },
        {
            invoice: "#INV-2023-003",
            date: "Oct 23, 2023",
            customer: "Robert Fox",
            sales: 2100,
            cost: 1450,
            profit: 650,
            percent: "30.9%"
        },
        {
            invoice: "#INV-2023-004",
            date: "Oct 23, 2023",
            customer: "Esther Howard",
            sales: 890,
            cost: 720,
            profit: 170,
            percent: "19.1%"
        },
        {
            invoice: "#INV-2023-005",
            date: "Oct 22, 2023",
            customer: "Cameron Williamson",
            sales: 3500,
            cost: 1900,
            profit: 1600,
            percent: "45.7%"
        }
    ];

    return (

        <div className="mis-container">

            {/* Top Stats */}

            <div className="mis-cards">

                <div className="mis-card">
                    <h4>Total Revenue</h4>
                    <h2>$124,500.00</h2>
                    <p>↑ 12% from last month</p>
                </div>

                <div className="mis-card">
                    <h4>Total Cost</h4>
                    <h2>$78,240.00</h2>
                    <p>Fixed & Variable costs</p>
                </div>

                <div className="mis-card">
                    <h4>Gross Profit</h4>
                    <h2>$46,260.00</h2>
                    <p>↑ 8.4% increase</p>
                </div>

                <div className="mis-card">
                    <h4>Avg. Profit Margin</h4>
                    <h2>37.15%</h2>
                    <p>Healthy target reached</p>
                </div>

            </div>


            {/* Table */}

            <div className="mis-table">

                <table>

                    <thead>

                        <tr>
                            <th>Invoice No</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Total Sales</th>
                            <th>Purchase Cost</th>
                            <th>Profit Amt</th>
                            <th>Profit %</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {bills.map((b, i) => (
                            <tr key={i}>

                                <td className="invoice">{b.invoice}</td>
                                <td>{b.date}</td>
                                <td>{b.customer}</td>
                                <td>${b.sales}</td>
                                <td>${b.cost}</td>
                                <td className="profit">${b.profit}</td>
                                <td><span className="percent">{b.percent}</span></td>
                                <td>✔</td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}