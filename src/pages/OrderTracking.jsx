export default function OrderTracking() {
  return (
    <div>
      <h1>Order Tracking</h1>

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
          <tr>
            <td>ORD101</td>
            <td>John</td>
            <td>RayBan Frame</td>
            <td className="completed">Delivered</td>
          </tr>
          <tr>
            <td>ORD102</td>
            <td>Ana</td>
            <td>Power Lens</td>
            <td className="pending">In Progress</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}