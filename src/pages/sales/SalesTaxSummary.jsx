import { useState, useEffect } from "react";
import "../../styles/SalesTax.css";

export default function SalesTaxSummary() {
    const [slabs, setSlabs] = useState([]);
    const [totals, setTotals] = useState({ taxable: 0, tax: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:3000/sales/report");
                const data = await res.json();
                
                let totalTaxable = 0;
                let totalTax = 0;
                const slabsMap = {};

                if (data.sales && Array.isArray(data.sales)) {
                    data.sales.forEach(sale => {
                        if (sale.items && Array.isArray(sale.items)) {
                            sale.items.forEach(item => {
                                const taxable = Number(item.amount);
                                const tax = Number(item.tax);
                                const gstPercent = taxable > 0 ? Math.round((tax / taxable) * 100) : 0;
                                
                                totalTaxable += taxable;
                                totalTax += tax;

                                if (!slabsMap[gstPercent]) {
                                    slabsMap[gstPercent] = {
                                        percent: gstPercent,
                                        taxable: 0,
                                        tax: 0
                                    };
                                }
                                slabsMap[gstPercent].taxable += taxable;
                                slabsMap[gstPercent].tax += tax;
                            });
                        }
                    });
                }
                
                setTotals({ taxable: totalTaxable, tax: totalTax });
                
                const slabsArray = Object.values(slabsMap).sort((a, b) => a.percent - b.percent);
                setSlabs(slabsArray);

            } catch (err) {
                console.error("Error fetching tax summary:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

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
                    <p>₹{totals.taxable.toFixed(2)}</p>
                </div>

                <div className="tax-card">
                    <h4>Total SGST</h4>
                    <p>₹{(totals.tax / 2).toFixed(2)}</p>
                </div>

                <div className="tax-card">
                    <h4>Total CGST</h4>
                    <p>₹{(totals.tax / 2).toFixed(2)}</p>
                </div>

                <div className="tax-card highlight">
                    <h4>Grand Total Tax</h4>
                    <p>₹{totals.tax.toFixed(2)}</p>
                </div>

            </div>

            {/* Tax Table */}
            <div className="tax-table">
                <h3>Tax Slab Summary</h3>

                {loading ? <p>Loading summary...</p> : (
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
                            {slabs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>No tax data available.</td>
                                </tr>
                            ) : (
                                slabs.map((slab) => (
                                    <tr key={slab.percent}>
                                        <td>{slab.percent}%</td>
                                        <td>₹{slab.taxable.toFixed(2)}</td>
                                        <td>₹{(slab.tax / 2).toFixed(2)}</td>
                                        <td>₹{(slab.tax / 2).toFixed(2)}</td>
                                        <td>₹{slab.tax.toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}