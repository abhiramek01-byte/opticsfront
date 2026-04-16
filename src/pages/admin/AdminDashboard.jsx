import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        users: 0,
        products: 0,
        vendors: 0,
        orders: 0
    });
    const [showDropdown, setShowDropdown] = useState(false);

    const username = localStorage.getItem("username") || "Admin";
    const role = localStorage.getItem("role") || "Admin";

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    useEffect(() => {
        axios.get("http://localhost:3000/admin/dashboard")
            .then(res => setCounts(res.data))
            .catch(err => console.error("Failed to fetch dashboard stats", err));
    }, []);

    const stats = [
        { title: "Total Users", value: counts.users },
        { title: "Total Products", value: counts.products },
        { title: "Vendors", value: counts.vendors },
        { title: "Sales Orders", value: counts.orders }
    ];

    const recentOrders = [
        { id: "#1001", customer: "Rahul", amount: "₹2500" },
        { id: "#1002", customer: "Anjali", amount: "₹1800" },
        { id: "#1003", customer: "Rohit", amount: "₹3200" },
    ];

    const lowStock = [
        { product: "Blue Cut Lens", stock: 5 },
        { product: "RayBan Frame", stock: 3 },
        { product: "Reading Glass", stock: 7 }
    ];

    const topVendors = [
        { name: "Vision Optics", sales: "₹45,000" },
        { name: "Clear Lens Co.", sales: "₹32,000" },
        { name: "EyeCare Supplies", sales: "₹22,000" }
    ];

    return (
        <div className="admin-dashboard">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h1 className="admin-title" style={{ margin: 0 }}>Admin Dashboard</h1>
                
                <div className="user-profile-widget" style={{ position: 'relative' }}>
                    <div 
                        className="user-profile-btn" 
                        onClick={() => setShowDropdown(!showDropdown)}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px 20px', background: 'white', borderRadius: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid rgba(226, 232, 240, 0.8)', transition: 'all 0.3s ease' }}
                    >
                        <FaUserCircle size={32} style={{ color: '#3b82f6' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a', lineHeight: '1.2' }}>{username.charAt(0).toUpperCase() + username.slice(1)}</span>
                            <span style={{ fontSize: '13px', color: '#64748b', textTransform: 'capitalize', lineHeight: '1.2' }}>{role}</span>
                        </div>
                        <FaChevronDown size={14} style={{ color: '#94a3b8', marginLeft: '8px' }} />
                    </div>

                    {showDropdown && (
                        <div 
                            className="user-dropdown" 
                            style={{ position: 'absolute', top: '120%', right: '0', background: 'white', padding: '8px', minWidth: '200px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 1000, border: '1px solid #f1f5f9', animation: 'fadeIn 0.2s ease' }}
                        >
                            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                                <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>Logged in as</span>
                                <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0f172a', textOverflow: 'ellipsis', overflow: 'hidden' }}>{username}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#ef4444', fontWeight: 500, fontSize: '14px', transition: 'all 0.2s' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
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
                    <div className="admin-card" key={i}>
                        <h3>{s.title}</h3>
                        <p>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* SECOND ROW */}
            <div className="admin-grid">

                <div className="admin-box">
                    <h2>Recent Orders</h2>
                    <ul>
                        {recentOrders.map((o, i) => (
                            <li key={i}>
                                {o.id} - {o.customer}
                                <span>{o.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="admin-box">
                    <h2>Low Stock Alert</h2>
                    <ul>
                        {lowStock.map((p, i) => (
                            <li key={i}>
                                {p.product}
                                <span>{p.stock} left</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="admin-box">
                    <h2>Top Vendors</h2>
                    <ul>
                        {topVendors.map((v, i) => (
                            <li key={i}>
                                {v.name}
                                <span>{v.sales}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}