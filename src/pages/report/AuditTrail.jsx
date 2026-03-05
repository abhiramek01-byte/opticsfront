import "../../styles/Report.css";

export default function AuditTrail() {

    return (
        <div className="report-page">

            <h2>System Audit Logs</h2>

            <div className="report-table">

                <table>

                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Module</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>2023-11-20</td>
                            <td>John Doe</td>
                            <td>Edit Order</td>
                            <td>Sales</td>
                            <td>Changed frame model</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}