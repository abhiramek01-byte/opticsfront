import "../../styles/BranchSales.css";

export default function BranchSales() {

    const sales = [
        { branch: "Kochi", sales: "₹120000" },
        { branch: "Calicut", sales: "₹85000" },
        { branch: "Thrissur", sales: "₹65000" }
    ]

    return (

        <div className="branch-page">

            <h2>Branch Sales</h2>

            <table className="branch-table">

                <thead>
                    <tr>
                        <th>Branch</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>

                <tbody>

                    {sales.map((s, i) => (
                        <tr key={i}>
                            <td>{s.branch}</td>
                            <td>{s.sales}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    )
}