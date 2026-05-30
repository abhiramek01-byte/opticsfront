import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import StatCard from "../StatCard";
import RecentSales from "../RecentSales";
import StockStatus from "../StockStatus";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({
    totals: { sales: 0, revenue: 0, customer: 0, stock: 0 },
    today: { sales: 0, revenue: 0, customer: 0, lowStock: 0 },
    recentSales: [],
    stockCategories: []
  });
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "Manager";
  const branchId = localStorage.getItem("branchId");
  const [branchName, setBranchName] = useState("Loading Branch...");

  const handleLogout = () => {
    localStorage.clear();
    // Use window.location để reset the state completely, matching app-level reload requirement.
    window.location.href = "/login";
  };

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchDashboardData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard?date=${selectedDate}`);
      setData(response.data);

      if (branchId) {
        const branchRes = await axios.get(`${import.meta.env.VITE_API_URL}/admin/branches`);
        const branches = branchRes.data;
        const currentBranch = branches.find(b => b.id === Number(branchId));
        if (currentBranch) {
          setBranchName(currentBranch.name);
        } else {
          setBranchName("Unknown Branch");
        }
      } else {
        setBranchName("All Branches");
      }

    } catch (error) {
      console.error("Failed to fetch dashboard data or branch info:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayDateStr = new Date(selectedDate).toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });

  if (loading) {
    return (
      <div className="loading-screen" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b'}}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* TOP HEADER */}
      <div className="top-bar glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="dash-title">Dashboard Overview</h1>
          <p className="subtitle">Welcome back, {username.charAt(0).toUpperCase() + username.slice(1)}!</p>
        </div>
        
        <div className="user-profile-widget" style={{ position: 'relative' }}>
          <div 
            className="user-profile-btn" 
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px 20px', background: 'rgba(255,255,255,0.9)', borderRadius: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid rgba(226, 232, 240, 0.8)', transition: 'all 0.3s ease' }}
          >
            <FaUserCircle size={32} style={{ color: '#3b82f6' }} />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a', lineHeight: '1.2' }}>{username.charAt(0).toUpperCase() + username.slice(1)}</span>
              <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 500, textTransform: 'capitalize', lineHeight: '1.2', marginTop: '2px' }}>{role} • {branchName}</span>
            </div>
            <FaChevronDown size={14} style={{ color: '#94a3b8', marginLeft: '8px' }} />
          </div>

          {showDropdown && (
            <div 
              className="user-dropdown glass-panel" 
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

      {/* OVERALL STATISTICS ROW */}
      <h2 className="section-title">
        Overall Statistics
      </h2>
      <div className="cards">
        <StatCard title="Total Sales" value={data.totals.sales} type="sales" />
        <StatCard title="Total Revenue" value={data.totals.revenue} type="revenue" format="currency" />
        <StatCard title="Total Customers" value={data.totals.customer} type="customer" />
        <StatCard title="Total Inventory" value={data.totals.stock} type="stock" />
      </div>

      {/* DAILY OVERVIEW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Daily Overview
          <span className="date-badge" style={{ marginLeft: '12px' }}>{displayDateStr}</span>
        </h2>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
          className="dashboard-date-picker"
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569', outline: 'none', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
        />
      </div>

      <div className="cards">
        <StatCard title="Daily Sales" value={data.today.sales} type="calendar" badge="Daily" />
        <StatCard title="Daily Revenue" value={data.today.revenue} type="bank" format="currency" badge="Daily" />
        <StatCard title="New Customers" value={data.today.customer} type="user" badge="Daily" />
        <StatCard 
          title="Items Low in Stock" 
          value={data.today.lowStock} 
          type="alert" 
          badge={data.today.lowStock > 0 ? "Critical" : "Good"} 
        />
      </div>

      {/* BOTTOM SECTION */}
      <div className="bottom-grid">
        <RecentSales sales={data.recentSales} />
        <StockStatus stockCategories={data.stockCategories} />
      </div>
    </div>
  );
}