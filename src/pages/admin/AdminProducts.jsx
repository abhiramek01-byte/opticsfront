import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AdminProducts.css";

const CATEGORY_META = {
    Frames: { color: "#f5b731", icon: "🕶️" },
    Sunglasses: { color: "#4fc3f7", icon: "☀️" },
    "Contact Lens": { color: "#a78bfa", icon: "👁️" },
    Accessories: { color: "#34d399", icon: "✨" },
    Solution: { color: "#fb7185", icon: "💧" },
};

export default function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/product");
            setProducts(res.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const removeProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            await axios.delete(`http://localhost:3000/product/${id}`);
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Error deleting product");
        }
    };

    const filtered = products.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()) || 
        p.code?.toLowerCase().includes(search.toLowerCase())
    );

    const totalValue = products.reduce((s, p) => s + Number(p.rate || 0), 0).toFixed(2);

    return (
        <div className="pm-root">
            <div className="pm-header">
                <div>
                    <p className="pm-subtitle">Inventory & Catalog</p>
                    <h1 className="pm-title">Product Management</h1>
                </div>

                <button
                    className="pm-add-btn"
                    onClick={() => navigate('/admin/products/add')}
                >
                    + Add Product
                </button>
            </div>

            <div className="pm-stats">
                <div className="pm-stat">
                    <span>{products.length}</span>
                    <p>Products</p>
                </div>

                <div className="pm-stat">
                    <span>₹{totalValue}</span>
                    <p>Total Catalog Value</p>
                </div>
            </div>

            <input
                className="pm-search"
                placeholder="Search by product name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="pm-table">
                {filtered.length === 0 ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No products found.</div>
                ) : (
                    filtered.map((p) => {
                        const meta = CATEGORY_META[p.category] || {
                            color: "#8b5cf6",
                            icon: "📦"
                        };

                        return (
                            <div className="pm-row" key={p.id}>
                                <div className="pm-name" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600 }}>{p.productName}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.code} | {p.brand}</span>
                                </div>

                                <div
                                    className="pm-category"
                                    style={{ color: meta.color, fontWeight: 500 }}
                                >
                                    {meta.icon} {p.category || "General"}
                                </div>

                                <div className="pm-price" style={{ fontWeight: 600 }}>
                                    ₹{p.rate ? Number(p.rate).toFixed(2) : "0.00"}
                                </div>

                                <button
                                    className="pm-delete"
                                    onClick={() => removeProduct(p.id)}
                                    style={{ width: '80px', textAlign: 'center' }}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}