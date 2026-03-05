import "../../styles/Report.css";

export default function AccountsReport() {

    return (
        <div className="report-page">

            <h2>Account Ledger Summary</h2>

            <div className="report-table">

                <table>

                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>Opening</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Closing</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>HDFC Account</td>
                            <td>$45000</td>
                            <td className="red">-12450</td>
                            <td className="green">+18200</td>
                            <td>$50750</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}