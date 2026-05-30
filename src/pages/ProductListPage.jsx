import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductListPage.css";

export default function ProductListPage() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/product")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setFilteredProducts(products);
            return;
        }
        const lower = search.toLowerCase();
        const filtered = products.filter(p => 
            p.productName?.toLowerCase().includes(lower) ||
            p.brand?.toLowerCase().includes(lower) ||
            p.category?.toLowerCase().includes(lower)
        );
        setFilteredProducts(filtered);
    }, [search, products]);

    const totalBrands = new Set(products.map(p => p.brand).filter(Boolean)).size;

    return (
        <div className="product-page-root">
            
            {/* HEADER */}
            <div className="product-page-header glass-panel">
                <div className="pph-left">
                    <h2>Store Products</h2>
                    <p>Explore our entire collection of premium eyewear</p>
                </div>
                <div className="pph-right">
                    <button className="back-btn" onClick={() => navigate("/")}>
                        ← Back Home
                    </button>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="product-page-controls glass-panel">
                <div className="ppc-stats">
                    <div className="stat">
                        <span className="stat-val">{products.length}</span>
                        <span className="stat-label">Total Items</span>
                    </div>
                    <div className="stat">
                        <span className="stat-val">{totalBrands}</span>
                        <span className="stat-label">Brands</span>
                    </div>
                </div>

                <div className="ppc-search">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search products, brands, or categories..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* GRID */}
            <div className="product-page-grid">
                {loading ? (
                    <div className="loading-state glass-panel">
                        <div className="spinner"></div>
                        <p>Loading products...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => {
                        const imageSrc = p.image 
                            ? `${import.meta.env.VITE_API_URL}/uploads/${p.image.split(',')[0]}` 
                            : "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80";
                        
                        return (
                            <div className="store-product-card glass-panel" key={p.id}>
                                <div className="spc-img-wrap">
                                    <img src={imageSrc} alt={p.productName} />
                                    {p.brand && <span className="spc-brand">{p.brand}</span>}
                                </div>
                                <div className="spc-content">
                                    <h3 className="spc-title">{p.productName}</h3>
                                    <div className="spc-meta">
                                        <span className="spc-category">{p.category || "General"}</span>
                                        <span className="spc-price">₹{p.rate || "0"}</span>
                                    </div>
                                    <div className="spc-footer">
                                        <div className="spc-stock">
                                            📦 {p.stock?.length ? p.stock.reduce((sum, s) => sum + Number(s.quantity), 0) : 0} in stock
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state glass-panel">
                        <h2>No products found</h2>
                        <p>Try adjusting your search criteria.</p>
                    </div>
                )}
            </div>

        </div>
    );
}