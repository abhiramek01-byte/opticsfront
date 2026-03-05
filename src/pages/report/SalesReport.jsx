import "../../styles/Report.css";

export default function SalesReport() {

    return (
        <div className="report-page">

            <h2>Sales Performance Report</h2>

            <div className="report-table">
                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Branch</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Oct 24 2023</td>
                            <td>#INV-9021</td>
                            <td>Robert Chen</td>
                            <td>Central</td>
                            <td>$342</td>
                            <td className="green">Paid</td>
                        </tr>

                        <tr>
                            <td>Oct 23 2023</td>
                            <td>#INV-9018</td>
                            <td>Sarah Jenkins</td>
                            <td>North Valley</td>
                            <td>$1250</td>
                            <td className="orange">Partial</td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </div>
    );
}