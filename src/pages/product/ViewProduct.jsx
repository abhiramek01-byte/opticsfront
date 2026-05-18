import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Transaction.css";
import { FaBoxOpen, FaTags, FaEdit } from "react-icons/fa";

const ImageSlider = ({ imageString, productName }) => {
    const images = (imageString || "").split(",").map(img => img.trim()).filter(Boolean);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    if (images.length === 0) {
        return (
            <div className="card-image-slider" style={{ background: "#f8fafc", color: "#cbd5e1" }}>
                <FaBoxOpen size={48} />
            </div>
        );
    }

    const currentImg = images[currentIndex];
    const src = `http://localhost:3000/${currentImg.startsWith('uploads') ? currentImg : 'uploads/' + currentImg}`;

    const handlePrev = (e) => {
        if(e) e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        if(e) e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Touch handlers for swipe
    const minSwipeDistance = 30;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    return (
        <div 
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            onTouchStart={onTouchStart} 
            onTouchMove={onTouchMove} 
            onTouchEnd={onTouchEnd}
        >
            <div className="card-image-slider">
                <img
                    src={src}
                    alt={productName}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            </div>
            
            {images.length > 1 && (
                <>
                    <button className="slider-btn prev" style={{zIndex: 20}} onClick={handlePrev}>◀</button>
                    <button className="slider-btn next" style={{zIndex: 20}} onClick={handleNext}>▶</button>
                    
                    <div className="slider-dots" style={{zIndex: 20}}>
                        {images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function ViewProduct() {
    const navigate = useNavigate();

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
        if (nonStock) return { text: "Service", color: "#4f46e5", bg: "rgba(224, 231, 255, 0.9)" }; // Indigo
        if (!qty || qty <= 0) return { text: "Out of Stock", color: "#dc2626", bg: "rgba(254, 226, 226, 0.9)" }; // Red
        if (qty < 5) return { text: "Low Stock", color: "#d97706", bg: "rgba(254, 243, 199, 0.9)" }; // Amber/Yellow
        return { text: "In Stock", color: "#059669", bg: "rgba(209, 250, 229, 0.9)" }; // Emerald/Green
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

            {Array.isArray(products) && products.length > 0 ? (
                <div className="product-grid">
                    {products.map((p) => {
                        const qty = getQuantity(p.id);
                        const status = getStatusInfo(qty, p.nonStock);

                        return (
                            <div className="product-card" key={p.id}>
                                
                                <div className="card-image-container">
                                    <div className="card-badges">
                                        <span className="status-badge" style={{ background: status.bg, color: status.color }}>
                                            {status.text}
                                        </span>
                                        <span className="qty-badge">
                                            <FaBoxOpen size={12} color="#64748b" />
                                            {p.nonStock ? "—" : qty}
                                        </span>
                                    </div>
                                    <ImageSlider imageString={p.image} productName={p.productName} />
                                </div>

                                <div className="card-content">
                                    <div className="card-title-row">
                                        <h3 className="card-title">{p.productName}</h3>
                                        <span className="card-code">{p.code}</span>
                                    </div>

                                    <div className="card-tags">
                                        {p.category && <span className="card-tag"><FaTags style={{marginRight: '4px', opacity: 0.6}} />{p.category}</span>}
                                        {p.brand && <span className="card-tag">{p.brand}</span>}
                                    </div>

                                    <div className="card-footer">
                                        <div className="card-price">
                                            <span>₹</span> {p.rate ? parseFloat(p.rate).toFixed(2) : "0.00"}
                                        </div>
                                        <button className="btn-card-edit" onClick={() => navigate('/dashboard/addProduct')}>
                                            <FaEdit style={{marginRight: '4px'}} /> Edit
                                        </button>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="transaction-card" style={{ textAlign: "center", padding: "60px 20px" }}>
                    <div style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '16px' }}><FaBoxOpen /></div>
                    <h3 style={{ color: '#475569', margin: '0 0 8px 0' }}>No products found</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Your catalog is currently empty. Add a new product to get started.</p>
                    <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => window.location.href = '/dashboard/addProduct'}>
                        + Add New Product
                    </button>
                </div>
            )}

        </div>
    );
}