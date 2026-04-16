import { useState, useEffect } from "react";
import "../../styles/SalesTax.css";

export default function SalesTaxReport() {
    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        let url = "http://localhost:3000/sales/report";
        if (startDate && endDate) {
            url += `?startDate=${startDate}&endDate=${endDate}`;
        }
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            // Flatten sales items into a single array for detailed reporting
            const allItems = [];
            if (data.sales && Array.isArray(data.sales)) {
                data.sales.forEach(sale => {
                    if (sale.items && Array.isArray(sale.items)) {
                        sale.items.forEach(item => {
                            const taxable = Number(item.amount);
                            const tax = Number(item.tax);
                            const gstPercent = taxable > 0 ? Math.round((tax / taxable) * 100) : 0;
                            
                            allItems.push({
                                id: `${sale.id}-${item.id}`,
                                date: sale.saleDate,
                                invoiceNo: sale.invoiceNo,
                                customer: sale.customer ? sale.customer.name : "Walk-in",
                                product: item.product ? item.product.productName : "Unknown",
                                taxable,
                                gstPercent,
                                tax,
                                total: taxable + tax
                            });
                        });
                    }
                });
            }
            setReportData(allItems);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const filteredData = reportData.filter(row => 
        row.invoiceNo.toLowerCase().includes(search.toLowerCase()) || 
        row.customer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="tax-page">

            <div className="tax-header">
                <h2>Sales Tax Detailed Report</h2>
                <p>Detailed breakdown of GST and taxable amounts.</p>
            </div>

            {/* Filters */}
            <div className="tax-filters">
                <input 
                    placeholder="Search invoice or customer..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={fetchReport}>Filter</button>
            </div>

            {/* Table */}
            <div className="tax-table">
                {loading ? <p>Loading report data...</p> : (
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
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>No records found.</td>
                                </tr>
                            ) : (
                                filteredData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{new Date(row.date).toLocaleDateString()}</td>
                                        <td>{row.invoiceNo}</td>
                                        <td>{row.customer}</td>
                                        <td>{row.product}</td>
                                        <td>₹{row.taxable.toFixed(2)}</td>
                                        <td>{row.gstPercent}%</td>
                                        <td>₹{row.tax.toFixed(2)}</td>
                                        <td>₹{row.total.toFixed(2)}</td>
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