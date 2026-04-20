import { useEffect, useState } from "react";
import "../../styles/Transaction.css";

export default function ViewProduct() {

    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/product")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:3000/stock/getAll")
            .then((res) => res.json())
            .then((data) => setStock(data.result || []))
            .catch((err) => console.error(err));
    }, []);

    const getQuantity = (productId) => {
        const item = Array.isArray(stock)
            ? stock.find(s => s.product?.id === productId)
            : null;
        return item ? item.quantity : 0;
    };

    const getStatusInfo = (qty, nonStock) => {
        if (nonStock) return { text: "Service", color: "#6366f1", bg: "#e0e7ff" }; // Indigo
        if (!qty || qty <= 0) return { text: "Out of Stock", color: "#ef4444", bg: "#fee2e2" }; // Red
        if (qty < 5) return { text: "Low Stock", color: "#f59e0b", bg: "#fef3c7" }; // Amber/Yellow
        return { text: "In Stock", color: "#10b981", bg: "#d1fae5" }; // Emerald/Green
    };

    return (
        <div className="transaction-container">

            <div className="transaction-header">
                <h2>Product Catalog <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 'normal', marginLeft: '10px' }}>({products.length} Items)</span></h2>
                
                <div className="transaction-buttons">
                    <button className="btn-secondary">Export CSV</button>
                    <button className="btn-primary" onClick={() => window.location.href = '/dashboard/addProduct'}>+ Add New</button>
                </div>
            </div>

            <div className="transaction-card" style={{ padding: '20px' }}>
                <table className="transaction-table" style={{ whiteSpace: 'nowrap' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '80px', textAlign: 'center' }}>Image</th>
                            <th>Code</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th style={{ textAlign: 'right' }}>Price (₹)</th>
                            <th style={{ textAlign: 'center' }}>Qty</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((p) => {
                                const qty = getQuantity(p.id);
                                const status = getStatusInfo(qty, p.nonStock);

                                return (
                                    <tr key={p.id}>
                                        <td style={{ textAlign: 'center', padding: '8px' }}>
                                            {p.image ? (
                                                <img
                                                    src={`http://localhost:3000/${p.image.startsWith('uploads') ? p.image : 'uploads/' + p.image}`}
                                                    alt={p.productName}
                                                    style={{
                                                        width: "48px",
                                                        height: "48px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                        border: "1px solid #e2e8f0"
                                                    }}
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                />
                                            ) : null}
                                            {(!p.image || true) && (
                                                <div className="image-fallback" style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    background: "#f1f5f9",
                                                    display: p.image ? 'none' : "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "8px",
                                                    fontSize: "10px",
                                                    color: "#94a3b8",
                                                    border: "1px dashed #cbd5e1",
                                                    margin: '0 auto'
                                                }}>
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        
                                        <td style={{ fontWeight: 600, color: '#334155' }}>{p.code}</td>
                                        <td style={{ fontWeight: 500 }}>{p.productName}</td>
                                        <td>{p.category || "-"}</td>
                                        <td>{p.brand || "-"}</td>
                                        
                                        <td style={{ textAlign: 'right', fontWeight: 600, color: '#0f172a' }}>
                                            {p.rate ? parseFloat(p.rate).toFixed(2) : "0.00"}
                                        </td>
                                        
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                                                {p.nonStock ? "—" : qty}
                                            </span>
                                        </td>

                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ 
                                                background: status.bg, 
                                                color: status.color, 
                                                padding: '6px 12px', 
                                                borderRadius: '20px', 
                                                fontSize: '0.8rem', 
                                                fontWeight: 'bold',
                                                display: 'inline-block'
                                            }}>
                                                {status.text}
                                            </span>
                                        </td>
                                        
                                        <td style={{ textAlign: 'center' }}>
                                            <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                                    No products found in the catalog.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}