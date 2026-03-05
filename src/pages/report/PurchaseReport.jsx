import "../../styles/Report.css";

export default function PurchaseReport() {
    return (
        <div className="report-page">

            <h2>Purchase History Report</h2>

            <div className="report-table">
                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice No</th>
                            <th>Vendor</th>
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>2023-10-24</td>
                            <td>PUR-2023-001</td>
                            <td>Vision Global Optics</td>
                            <td>Ray-Ban Aviator</td>
                            <td>24</td>
                            <td>$3450</td>
                        </tr>

                        <tr>
                            <td>2023-10-22</td>
                            <td>PUR-2023-002</td>
                            <td>LensCraft</td>
                            <td>Blue-Light Lenses</td>
                            <td>100</td>
                            <td>$1200</td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </div>
    );
}