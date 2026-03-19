import "../../styles/BranchInventory.css";

export default function BranchInventory() {

    const data = [
        { product: "RayBan Frame", branch: "Kochi", qty: 12 },
        { product: "Blue Cut Lens", branch: "Calicut", qty: 7 },
    ];

    return (
        <div className="branch-page">

            <h2>Branch Inventory</h2>

            <table className="branch-table">

                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Branch</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.product}</td>
                            <td>{d.branch}</td>
                            <td>{d.qty}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}