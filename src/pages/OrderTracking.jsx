import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderTracking.css";

export default function OrderTracking() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Cash");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/sales-order", {
        headers: {
          "branch-id": localStorage.getItem("branchId") || ""
        }
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "Pending":
        return "pending";
      case "Shipped":
        return "shipped";
      case "Cancelled":
        return "cancelled";
      default:
        return "";
    }
  };

  // Trigger Modal
  const openPaymentModal = (orderId) => {
    setSelectedOrderId(orderId);
    setPaymentMode("Cash");
    setShowModal(true);
  };

  // Convert
  const convertToSale = async () => {
    if (!selectedOrderId) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sales/convert/${selectedOrderId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "branch-id": localStorage.getItem("branchId") || ""
        },
        body: JSON.stringify({ paymentMode })
      });

      if (!res.ok) {
         const errData = await res.json();
         alert(`Conversion Failed: ${errData.message}`);
         return;
      }

      const data = await res.json();
      alert("Converted to Sale Successfully! ✅");
      setShowModal(false);
      navigate(`/dashboard/billing/${data.id || data.saleId || data.sale?.id || data.id}`);

    } catch (err) {
      console.error(err);
      alert("Conversion failed ❌");
    }
  };

  if (loading) {
     return <div className="order-tracking-wrapper"><h2>Loading Orders...</h2></div>;
  }

  return (
    <div className="order-tracking-wrapper">

      <h1>Live Order Dashboard</h1>
      <p className="tracking-subtitle">
        Track customer orders, monitor status, and formally execute sales.
      </p>

      <div className="tracking-card">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Products</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No Tracking Data Available</td></tr>
            ) : orders.map((order) => {
              const customerName = order.customer?.name || "Unknown";
              const productNames = order.items?.map(i => i.product?.productName).join(', ') || "No Products";
              const dateObj = new Date(order.date);
              const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString() : "Invalid Date";

              return (
                <tr key={order.id}>

                  {/* ORDER ID */}
                  <td>#{order.id}</td>

                  {/* CUSTOMER */}
                  <td className="customer-cell">
                    <div className="customer-avatar">
                      {customerName.charAt(0)}
                    </div>
                    <span className="customer-name">
                      {customerName}
                    </span>
                  </td>

                  {/* DATE */}
                  <td>{formattedDate}</td>

                  {/* PRODUCT */}
                  <td className="product-cell">
                    <span className="product-icon">👓</span>
                    {productNames}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      <span className="status-dot"></span>
                      {order.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    {order.status === 'Pending' ? (
                      <button 
                         onClick={() => openPaymentModal(order.id)}
                         style={{
                           padding: "6px 12px",
                           backgroundColor: "#4caf50",
                           color: "white",
                           border: "none",
                           borderRadius: "4px",
                           cursor: "pointer",
                           fontWeight: "bold"
                         }}
                      >
                         💳 Convert to Sale
                      </button>
                    ) : (
                      <span style={{color: '#888', fontStyle: 'italic'}}>Closed</span>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAYMENT MODAL */}
      {showModal && (
        <div style={modalOverlayStyle}>
           <div style={modalContentStyle}>
              <h2>Convert Order #{selectedOrderId}</h2>
              <p>Process payment and finalize this sale to actively deduct stock.</p>
              
              <div style={{margin: "20px 0"}}>
                 <label style={{display: "block", marginBottom: "8px", fontWeight: "bold"}}>Payment Mode:</label>
                 <select 
                    style={{width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                    value={paymentMode} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                 >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                 </select>
              </div>

              <div style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                 <button 
                    onClick={() => setShowModal(false)}
                    style={{padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer"}}
                 >Cancel</button>
                 
                 <button 
                    onClick={convertToSale}
                    style={{padding: "8px 16px", borderRadius: "4px", border: "none", backgroundColor: "#2196F3", color: "white", fontWeight: "bold", cursor: "pointer"}}
                 >Confirm & Generate Bill</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

// Modal Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0, left: 0, width: "100%", height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
};