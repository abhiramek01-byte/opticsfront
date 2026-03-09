import { useState } from "react";
import "../styles/OrderTracking.css";

export default function OrderTracking() {

  const [orders, setOrders] = useState([
    {
      id: "ORD101",
      customer: "John",
      product: "RayBan Frame",
      status: "Delivered"
    },
    {
      id: "ORD102",
      customer: "Ana",
      product: "Power Lens",
      status: "In Progress"
    }
  ]);

  const statuses = [
    "Order Received",
    "In Progress",
    "Shipped",
    "Delivered",
    "Cancelled"
  ];

  const updateStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "completed";
      case "In Progress":
        return "pending";
      case "Shipped":
        return "shipped";
      case "Cancelled":
        return "cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="order-tracking-wrapper">

      <h1>Order Tracking</h1>
      <p className="tracking-subtitle">
        Track customer orders and delivery status
      </p>

      <div className="tracking-card">

        <table className="tracking-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order, index) => (

              <tr key={index}>

                {/* ORDER ID */}
                <td>{order.id}</td>

                {/* CUSTOMER */}
                <td className="customer-cell">
                  <div className="customer-avatar">
                    {order.customer.charAt(0)}
                  </div>
                  <span className="customer-name">
                    {order.customer}
                  </span>
                </td>

                {/* PRODUCT */}
                <td className="product-cell">
                  <span className="product-icon">👓</span>
                  {order.product}
                </td>

                {/* STATUS */}
                <td>

                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    <span className="status-dot"></span>
                    {order.status}
                  </span>

                  <select
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0"
                    }}
                    value={order.status}
                    onChange={(e) => updateStatus(index, e.target.value)}
                  >
                    {statuses.map((status, i) => (
                      <option key={i} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}