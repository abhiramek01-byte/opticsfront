import {
  FaChartBar,
  FaMoneyBillWave,
  FaUsers,
  FaShoppingCart,
  FaCalendarAlt,
  FaUniversity,
  FaBoxOpen,
  FaExclamationTriangle
} from "react-icons/fa";

const icons = {
  sales: <FaChartBar />,
  revenue: <FaMoneyBillWave />,
  customer: <FaUsers />,
  stock: <FaShoppingCart />,
  calendar: <FaCalendarAlt />,
  bank: <FaUniversity />,
  user: <FaUsers />,
  box: <FaBoxOpen />,
  alert: <FaExclamationTriangle />
};

export default function StatCard({ title, value, type, badge, format }) {
  // Simple formatter
  const formattedValue = format === 'currency' 
      ? `$${Number(value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
      : Number(value || 0).toLocaleString();

  return (
    <div className="stat-card glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Gradient Blob */}
      <div className="card-blob"></div>

      <div className="card-content">
        <div className="card-header">
          {/* Icon */}
          <div className={`icon-wrap ${type}`}>
            {icons[type] || <FaChartBar />}
          </div>

          {/* Title */}
          <p className="stat-title">{title}</p>
        </div>

        <div className="card-body">
          <h2 className="stat-value">{formattedValue}</h2>
          
          {/* Badge */}
          {badge && (
            <span className={`badge ${type === 'alert' ? 'badge-danger' : 'badge-primary'}`}>
              {badge}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}