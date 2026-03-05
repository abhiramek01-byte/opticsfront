import "../../styles/SalesTax.css";

export default function SalesTaxReport() {

    return (
        <div className="tax-page">

            <div className="tax-header">
                <h2>Sales Tax Detailed Report</h2>
                <p>Detailed breakdown of GST and taxable amounts.</p>
            </div>

            {/* Filters */}

            <div className="tax-filters">

                <input placeholder="Search invoice..." />

                <input type="date" />

                <input type="date" />

                <button>Filter</button>

            </div>

            {/* Table */}

            <div className="tax-table">

                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice No</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Taxable</th>
                            <th>GST%</th>
                            <th>Tax</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>12 Oct 2023</td>
                            <td>#INV-8901</td>
                            <td>Michael Chen</td>
                            <td>Frames</td>
                            <td>₹1200</td>
                            <td>12%</td>
                            <td>₹144</td>
                            <td>₹1344</td>
                        </tr>

                        <tr>
                            <td>12 Oct 2023</td>
                            <td>#INV-8902</td>
                            <td>Sarah Jenkins</td>
                            <td>Lenses</td>
                            <td>₹450</td>
                            <td>5%</td>
                            <td>₹22.5</td>
                            <td>₹472.5</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}