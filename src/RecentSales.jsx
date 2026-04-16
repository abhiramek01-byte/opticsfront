import React from 'react';

export default function RecentSales({ sales = [] }) {

  const getStatusClass = (status) => {
    if (!status) return "";
    switch (status.toLowerCase()) {
      case "completed":
        return "completed";
      case "shipped":
        return "shipped";
      case "pending":
        return "pending";
      default:
        return "";
    }
  };

  return (
    <div className="panel recent-sales-panel glass-panel">

      <div className="panel-head">
        <h3>Recent Sales</h3>
        <span className="view-all">View All</span>
      </div>

      <div className="table-responsive">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sales.length > 0 ? sales.map((sale, index) => (
              <tr key={index}>
                <td className="font-semibold text-primary">{sale.id}</td>
                <td>{sale.customer}</td>
                <td>{sale.product}</td>
                <td className="font-semibold">{sale.amount}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(sale.status)}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  No recent sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}