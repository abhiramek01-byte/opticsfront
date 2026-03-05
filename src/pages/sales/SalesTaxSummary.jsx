import "../../styles/SalesTax.css";

export default function SalesTaxSummary() {
    return (
        <div className="tax-page">

            <div className="tax-header">
                <h2>Sales Tax Summary Report</h2>
                <p>Overview of taxable sales and tax collection by category.</p>
            </div>

            {/* Cards */}

            <div className="tax-cards">

                <div className="tax-card">
                    <h4>Total Taxable Amount</h4>
                    <p>₹12,45,280.00</p>
                </div>

                <div className="tax-card">
                    <h4>Total SGST</h4>
                    <p>₹74,716.80</p>
                </div>

                <div className="tax-card">
                    <h4>Total CGST</h4>
                    <p>₹74,716.80</p>
                </div>

                <div className="tax-card highlight">
                    <h4>Grand Total Tax</h4>
                    <p>₹1,49,433.60</p>
                </div>

            </div>

            {/* Tax Table */}

            <div className="tax-table">

                <h3>Tax Slab Summary</h3>

                <table>

                    <thead>
                        <tr>
                            <th>Tax Slab</th>
                            <th>Taxable Amount</th>
                            <th>SGST</th>
                            <th>CGST</th>
                            <th>Total Tax</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>5% (Frames)</td>
                            <td>₹4,20,000</td>
                            <td>₹10,500</td>
                            <td>₹10,500</td>
                            <td>₹21,000</td>
                        </tr>

                        <tr>
                            <td>12% (Lenses)</td>
                            <td>₹6,85,280</td>
                            <td>₹41,116</td>
                            <td>₹41,116</td>
                            <td>₹82,232</td>
                        </tr>

                        <tr>
                            <td>18% (Accessories)</td>
                            <td>₹1,40,000</td>
                            <td>₹12,600</td>
                            <td>₹12,600</td>
                            <td>₹25,200</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}