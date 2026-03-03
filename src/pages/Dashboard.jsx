import StatCard from "../StatCard";
import RecentSales from "../RecentSales";
import StockStatus from "../StockStatus";

export default function Dashboard() {
  return (
    <>
      {/* TOP HEADER */}
      <div className="top-bar">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Overview and real-time statistics</p>
        </div>

        <button className="support-btn">🎧 Support</button>
      </div>

      {/* FIRST ROW */}
      <div className="cards">
        <StatCard title="Today Sales" type="sales" />
        <StatCard title="Today Revenue" type="revenue" />
        <StatCard title="Today Customer" type="customer" />
        <StatCard title="Total Stock" type="stock" />
      </div>

      {/* TODAY OVERVIEW */}
      <h2 className="section-title">
        Today Overview
        <span className="date">May 23, 2025</span>
      </h2>

      <div className="cards">
        <StatCard title="Today Sales" type="calendar" />
        <StatCard title="Today Revenue" type="bank" />
        <StatCard title="Today Customer" type="user" />
        <StatCard title="Total Stock" type="box" badge="Low Stock" />
      </div>

      {/* BOTTOM SECTION */}
      <div className="bottom">
        <RecentSales />
        <StockStatus />
      </div>
    </>
  );
}