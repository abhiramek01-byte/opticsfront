import "../../styles/Report.css";

export default function StockReport() {

    return (
        <div className="report-page">

            <h2>Stock Inventory Report</h2>

            <div className="report-table">
                <table>

                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Reorder</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Aviator Classic</td>
                            <td>RayBan</td>
                            <td>Sunglasses</td>
                            <td>42</td>
                            <td>15</td>
                            <td className="green">In Stock</td>
                        </tr>

                        <tr>
                            <td>Wayfarer</td>
                            <td>RayBan</td>
                            <td>Sunglasses</td>
                            <td>8</td>
                            <td>10</td>
                            <td className="orange">Low Stock</td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </div>
    );
}