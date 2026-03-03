import {
  FaChartBar,
  FaMoneyBillWave,
  FaUsers,
  FaShoppingCart,
  FaCalendarAlt,
  FaUniversity,
  FaBoxOpen
} from "react-icons/fa";

const icons = {
  sales: <FaChartBar />,
  revenue: <FaMoneyBillWave />,
  customer: <FaUsers />,
  stock: <FaShoppingCart />,
  calendar: <FaCalendarAlt />,
  bank: <FaUniversity />,
  user: <FaUsers />,
  box: <FaBoxOpen />
};

export default function StatCard({ title, type, badge }) {
  return (
    <div className="stat-card">

      {/* Icon */}
      <div className={`icon-wrap ${type}`}>
        {icons[type] || <FaChartBar />} {/* fallback */}
      </div>

      {/* Badge */}
      {badge && (
        <span className="badge">
          {badge}
        </span>
      )}

      {/* Title */}
      <p className="stat-title">{title}</p>

    </div>
  );
}