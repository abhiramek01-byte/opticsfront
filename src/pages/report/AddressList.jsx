import "../../styles/Report.css";

export default function AddressList() {

    return (
        <div className="report-page">

            <h2>Customer Address List</h2>

            <div className="report-table">

                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>John Smith</td>
                            <td>Customer</td>
                            <td>555-123</td>
                            <td>john@email.com</td>
                            <td>Vision Way</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}