import { useState, useEffect } from "react";
import axios from "axios";
import { 
    FaUserCircle, 
    FaSignOutAlt, 
    FaChevronDown, 
    FaUsers, 
    FaBoxOpen, 
    FaTruck, 
    FaShoppingCart, 
    FaExclamationTriangle, 
    FaAward, 
    FaStore,
    FaCalendarCheck
} from "react-icons/fa";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        users: 0,
        products: 0,
        vendors: 0,
        orders: 0,
        recentOrders: [],
        lowStock: [],
        topVendors: []
    });
    const [showDropdown, setShowDropdown] = useState(false);

    const username = localStorage.getItem("username") || "Admin";
    const role = localStorage.getItem("role") || "Admin";

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/admin/dashboard")
            .then(res => setCounts(res.data))
            .catch(err => console.error("Failed to fetch dashboard stats", err));
    }, []);

    const stats = [
        { 
            title: "Total Users", 
            value: counts.users, 
            icon: <FaUsers size={24} />, 
            desc: "Registered system accounts",
            colorClass: "users" 
        },
        { 
            title: "Total Products", 
            value: counts.products, 
            icon: <FaBoxOpen size={24} />, 
            desc: "Active items in catalog",
            colorClass: "products"
        },
        { 
            title: "Vendors", 
            value: counts.vendors, 
            icon: <FaTruck size={24} />, 
            desc: "Supplier partnerships",
            colorClass: "vendors"
        },
        { 
            title: "Sales Orders", 
            value: counts.orders, 
            icon: <FaShoppingCart size={24} />, 
            desc: "Completed checkout orders",
            colorClass: "orders"
        }
    ];

    const recentOrders = counts.recentOrders || [];
    const lowStock = counts.lowStock || [];
    const topVendors = counts.topVendors || [];

    return (
        <div className="admin-dashboard">
            {/* TOP HEADER */}
            <div className="dashboard-header-container">
                <div>
                    <h1 className="admin-title" style={{ margin: 0, padding: 0 }}>Admin Dashboard</h1>
                </div>
                
                <div className="user-profile-widget" style={{ position: 'relative' }}>
                    <div 
                        className="user-profile-btn" 
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px 20px', background: 'white', borderRadius: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid rgba(226, 232, 240, 0.8)', transition: 'all 0.3s ease' }}
                    >
                        <FaUserCircle size={32} style={{ color: '#2d5a3d' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px', color: '#1c1a16', lineHeight: '1.2' }}>{username.charAt(0).toUpperCase() + username.slice(1)}</span>
                            <span style={{ fontSize: '13px', color: '#8c8070', textTransform: 'capitalize', lineHeight: '1.2' }}>{role}</span>
                        </div>
                        <FaChevronDown size={14} style={{ color: '#b8ae9e', marginLeft: '8px' }} />
                    </div>

                    {showDropdown && (
                        <div 
                            className="user-dropdown" 
                            style={{ position: 'absolute', top: '120%', right: '0', background: 'white', padding: '8px', minWidth: '200px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 1000, border: '1px solid #f1f5f9' }}
                        >
                            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                                <span style={{ display: 'block', fontSize: '12px', color: '#8c8070' }}>Logged in as</span>
                                <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1c1a16', textOverflow: 'ellipsis', overflow: 'hidden' }}>{username}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#b84040', fontWeight: 500, fontSize: '14px', transition: 'all 0.2s' }}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="admin-stats">
                {stats.map((s, i) => (
                    <div className={`admin-card card-${s.colorClass}`} key={i}>
                        <div className="admin-card-header">
                            <h3>{s.title}</h3>
                            <div className="admin-card-icon">
                                {s.icon}
                            </div>
                        </div>
                        <p>{s.value}</p>
                        <span className="admin-card-desc">{s.desc}</span>
                    </div>
                ))}
            </div>

            {/* MAIN SECTIONS GRID */}
            <div className="admin-grid">
                {/* Recent Sales Orders */}
                <div className="admin-box box-orders">
                    <h2>Recent Orders</h2>
                    <div className="box-content-scroll">
                        {recentOrders.length === 0 ? (
                            <div className="admin-empty-state">No recent sales orders.</div>
                        ) : (
                            <ul>
                                {recentOrders.map((o, i) => (
                                    <li key={i} className="list-item-sales">
                                        <div className="item-left">
                                            <div className="item-icon-wrapper sales-color">
                                                <FaShoppingCart size={13} />
                                            </div>
                                            <div className="item-details">
                                                <span className="item-main-title">{o.id}</span>
                                                <span className="item-subtitle">Customer: {o.customer}</span>
                                            </div>
                                        </div>
                                        <span className="amount-badge">{o.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="admin-box box-stock">
                    <h2>Low Stock Alert</h2>
                    <div className="box-content-scroll">
                        {lowStock.length === 0 ? (
                            <div className="admin-empty-state">All product stocks are healthy.</div>
                        ) : (
                            <ul>
                                {lowStock.map((p, i) => (
                                    <li key={i} className="list-item-stock">
                                        <div className="item-left">
                                            <div className="item-icon-wrapper stock-color">
                                                <FaExclamationTriangle size={13} />
                                            </div>
                                            <div className="item-details">
                                                <span className="item-main-title" title={p.product}>{p.product}</span>
                                                <span className="item-subtitle">Requires replenishment</span>
                                            </div>
                                        </div>
                                        <span className="stock-badge">{p.stock} left</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Top Vendor Partners */}
                <div className="admin-box box-vendors">
                    <h2>Top Vendors</h2>
                    <div className="box-content-scroll">
                        {topVendors.length === 0 ? (
                            <div className="admin-empty-state">No vendors configured.</div>
                        ) : (
                            <ul>
                                {topVendors.map((v, i) => (
                                    <li key={i} className="list-item-vendor">
                                        <div className="item-left">
                                            <div className="item-icon-wrapper vendor-color">
                                                <FaAward size={13} />
                                            </div>
                                            <div className="item-details">
                                                <span className="item-main-title">{v.name}</span>
                                                <span className="item-subtitle">Optics Distributor</span>
                                            </div>
                                        </div>
                                        <span className="vendor-badge">{v.sales}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}