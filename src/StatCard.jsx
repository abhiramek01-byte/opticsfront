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
  // Indian currency and standard number formatting
  const formattedValue = format === 'currency' 
      ? `₹${Number(value || 0).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
      : Number(value || 0).toLocaleString('en-IN');

  return (
    <div className={`stat-card glass-panel card-glow-${type}`} style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Gradient Blob */}
      <div className="card-blob"></div>

      {/* Absolute Positioned Top-Right Badge */}
      {badge && (
        <span className={`badge-top badge-${type}`}>
          {badge}
        </span>
      )}

      <div className="card-content-wrap">
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
        </div>
      </div>

    </div>
  );
}