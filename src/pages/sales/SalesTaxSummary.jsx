import { useState, useEffect } from "react";
import { FaChartPie, FaMoneyBillWave, FaPercentage, FaReceipt, FaTable } from "react-icons/fa";
import "../../styles/SalesTax.css";

export default function SalesTaxSummary() {
    const [slabs, setSlabs] = useState([]);
    const [totals, setTotals] = useState({ taxable: 0, tax: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const res = await fetch(import.meta.env.VITE_API_URL + "/sales/report", {
                    headers: {
                        "branch-id": localStorage.getItem("branchId") || ""
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch report");
                
                const data = await res.json();
                
                let totalTaxable = 0;
                let totalTax = 0;
                const slabsMap = {};

                if (data.sales && Array.isArray(data.sales)) {
                    data.sales.forEach(sale => {
                        if (sale.items && Array.isArray(sale.items)) {
                            sale.items.forEach(item => {
                                const taxable = Number(item.amount) || 0;
                                const tax = Number(item.tax) || 0;
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
                <h2><FaChartPie /> Sales Tax Summary Report</h2>
                <p>Overview of taxable sales and tax collection by category for the current branch.</p>
            </div>

            {/* Cards */}
            <div className="tax-cards">

                <div className="tax-card">
                    <h4><FaReceipt /> Total Taxable Amount</h4>
                    <p><span className="currency-symbol">₹</span>{totals.taxable.toFixed(2)}</p>
                </div>

                <div className="tax-card">
                    <h4><FaPercentage /> Total SGST</h4>
                    <p><span className="currency-symbol">₹</span>{(totals.tax / 2).toFixed(2)}</p>
                </div>

                <div className="tax-card">
                    <h4><FaPercentage /> Total CGST</h4>
                    <p><span className="currency-symbol">₹</span>{(totals.tax / 2).toFixed(2)}</p>
                </div>

                <div className="tax-card highlight">
                    <h4><FaMoneyBillWave /> Grand Total Tax</h4>
                    <p><span className="currency-symbol">₹</span>{totals.tax.toFixed(2)}</p>
                </div>

            </div>

            {/* Tax Table */}
            <div className="tax-table-container">
                <h3><FaTable /> Tax Slab Summary</h3>

                {loading ? <div className="loading-text">Loading summary data...</div> : (
                    <table className="modern-table">
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
                                    <td colSpan="5" style={{ textAlign: "center", color: "#64748b", padding: "30px" }}>
                                        No tax data available for this branch.
                                    </td>
                                </tr>
                            ) : (
                                slabs.map((slab) => (
                                    <tr key={slab.percent}>
                                        <td style={{ fontWeight: 600 }}>{slab.percent}%</td>
                                        <td><span className="currency-symbol">₹</span>{slab.taxable.toFixed(2)}</td>
                                        <td><span className="currency-symbol">₹</span>{(slab.tax / 2).toFixed(2)}</td>
                                        <td><span className="currency-symbol">₹</span>{(slab.tax / 2).toFixed(2)}</td>
                                        <td style={{ fontWeight: 600, color: '#0f172a' }}>
                                            <span className="currency-symbol">₹</span>{slab.tax.toFixed(2)}
                                        </td>
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