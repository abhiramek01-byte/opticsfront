import { useState, useEffect } from "react";
import { FaFilter, FaFileInvoice, FaSearch, FaTable } from "react-icons/fa";
import "../../styles/SalesTax.css";

export default function SalesTaxReport() {
    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        let url = import.meta.env.VITE_API_URL + "/sales/report";
        const queryParams = [];
        if (startDate) queryParams.push(`startDate=${startDate}`);
        if (endDate) queryParams.push(`endDate=${endDate}`);
        if (queryParams.length > 0) {
            url += `?${queryParams.join("&")}`;
        }
        
        try {
            const res = await fetch(url, {
                headers: {
                    "branch-id": localStorage.getItem("branchId") || ""
                }
            });
            if (!res.ok) throw new Error("Failed to fetch report");

            const data = await res.json();
            
            // Flatten sales items into a single array for detailed reporting
            const allItems = [];
            if (data.sales && Array.isArray(data.sales)) {
                data.sales.forEach(sale => {
                    if (sale.items && Array.isArray(sale.items)) {
                        sale.items.forEach(item => {
                            const taxable = Number(item.amount) || 0;
                            const tax = Number(item.tax) || 0;
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
            console.error("Error fetching detailed report:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const filteredData = reportData.filter(row => 
        (row.invoiceNo || "").toLowerCase().includes(search.toLowerCase()) || 
        (row.customer || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="tax-page">

            <div className="tax-header">
                <h2><FaFileInvoice /> Sales Tax Detailed Report</h2>
                <p>Detailed breakdown of GST, taxable amounts, and invoice references for the current branch.</p>
            </div>

            {/* Filters */}
            <div className="tax-filters">
                <div style={{ position: 'relative', flex: 2 }}>
                    <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                        className="modern-input"
                        style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box' }}
                        placeholder="Search invoice or customer..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <input 
                    className="modern-input"
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <span style={{ color: '#94a3b8' }}>to</span>
                <input 
                    className="modern-input"
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                
                <button className="filter-btn" onClick={fetchReport}>
                    <FaFilter /> Filter
                </button>
            </div>

            {/* Table */}
            <div className="tax-table-container">
                <h3><FaTable /> Itemized Tax Records</h3>
                
                {loading ? <div className="loading-text">Loading detailed report data...</div> : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="modern-table">
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
                                        <td colSpan="8" style={{ textAlign: "center", color: "#64748b", padding: "30px" }}>
                                            No records found. Adjust your filters or dates.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((row) => (
                                        <tr key={row.id}>
                                            <td style={{ color: '#64748b' }}>{new Date(row.date).toLocaleDateString()}</td>
                                            <td style={{ fontWeight: 500 }}>{row.invoiceNo}</td>
                                            <td>{row.customer}</td>
                                            <td>{row.product}</td>
                                            <td><span className="currency-symbol">₹</span>{row.taxable.toFixed(2)}</td>
                                            <td><span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>{row.gstPercent}%</span></td>
                                            <td><span className="currency-symbol">₹</span>{row.tax.toFixed(2)}</td>
                                            <td style={{ fontWeight: 600, color: '#0f172a' }}><span className="currency-symbol">₹</span>{row.total.toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}