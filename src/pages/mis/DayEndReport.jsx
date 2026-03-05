import "../../styles/MIS.css";

export default function DayEndReport() {

    return (

        <div className="mis-container">

            <div className="report-card">

                <h2 className="report-title">SPASH EYE WEAR</h2>

                <p className="report-date">Day End Summary — January 16, 2024</p>

                <div className="report-stats">

                    <div>
                        <h3>₹ 42,850</h3>
                        <p>Total Sales</p>
                    </div>

                    <div>
                        <h3>₹ 38,200</h3>
                        <p>Total Collections</p>
                    </div>

                    <div>
                        <h3>24</h3>
                        <p>New Orders</p>
                    </div>

                </div>


                <div className="report-table">

                    <table>

                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Method</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>#INV-9821</td>
                                <td>John Smith</td>
                                <td>Ray-Ban Wayfarer</td>
                                <td>UPI</td>
                                <td>₹12,400</td>
                            </tr>

                            <tr>
                                <td>#INV-9822</td>
                                <td>Sarah Williams</td>
                                <td>Contact Lens Multi-pack</td>
                                <td>Card</td>
                                <td>₹3,200</td>
                            </tr>

                            <tr>
                                <td>#INV-9823</td>
                                <td>Robert De Niro</td>
                                <td>Oakley Sport</td>
                                <td>Cash</td>
                                <td>₹18,750</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    )

}