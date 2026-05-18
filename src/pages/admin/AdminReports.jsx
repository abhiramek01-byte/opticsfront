import { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaRupeeSign, FaStore, FaChartLine, FaShoppingCart } from "react-icons/fa";
import "../../styles/AdminReports.css";

export default function AdminReports() {
  const [reportData, setReportData] = useState({
    totalCompanyRevenue: 0,
    branches: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/dashboard/reports");
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return <div className="report-root loading">Loading Reports...</div>;
  }

  return (
    <div className="report-root">
      
      {/* Overview Section */}
      <div className="report-header">
        <div>
          <h1 className="report-title">Company Overview</h1>
          <p className="report-subtitle">Multi-branch revenue analysis & performance</p>
        </div>
      </div>

      {/* Global Revenue Card */}
      <div className="glass-panel global-revenue-card">
        <div className="revenue-content">
          <div className="revenue-icon">
            <FaChartLine />
          </div>
          <div className="revenue-details">
            <p>Total Company Revenue (All Branches)</p>
            <h2>₹ {reportData.totalCompanyRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>
      </div>

      <h2 className="section-title">Branch Performance</h2>

      {/* Branch Grid */}
      <div className="branch-grid">
        {reportData.branches.map(branch => (
          <div key={branch.id} className="glass-panel branch-card">
            
            <div className="branch-card-header">
              <div className="branch-title">
                <FaStore className="branch-icon" />
                <h3>{branch.name}</h3>
              </div>
              <span className="branch-badge">Active</span>
            </div>

            <div className="branch-stats">
              <div className="stat-item">
                <span>Revenue</span>
                <p className="text-primary">
                  <FaRupeeSign /> {branch.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="stat-item">
                <span>Total Orders</span>
                <p>
                  <FaShoppingCart /> {branch.orders}
                </p>
              </div>
            </div>

            <div className="chart-container">
              <h4>Sales (Last 7 Days)</h4>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={branch.salesGraph} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`colorRevenue-${branch.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      tickFormatter={(value) => value >= 1000 ? `₹${(value/1000).toFixed(1)}k` : `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹ ${Number(value).toFixed(2)}`, 'Revenue']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill={`url(#colorRevenue-${branch.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        ))}

        {reportData.branches.length === 0 && (
          <div className="no-branches">No branch data available.</div>
        )}
      </div>

    </div>
  );
}