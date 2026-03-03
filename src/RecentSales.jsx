export default function RecentSales() {
  const salesData = [
    {
      id: "#OPT-1001",
      customer: "Ravi Kumar",
      product: "Ray-Ban Frame",
      amount: "$220.00",
      status: "Completed"
    },
    {
      id: "#OPT-1002",
      customer: "Anita Sharma",
      product: "Progressive Lenses",
      amount: "$180.00",
      status: "Shipped"
    },
    {
      id: "#OPT-1003",
      customer: "Vikram Singh",
      product: "Contact Lens (Monthly)",
      amount: "$60.00",
      status: "Pending"
    }
  ];

  const getStatusClass = (status) => {
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
    <div className="panel">

      <div className="panel-head">
        <h3>Recent Sales</h3>
        <span className="view-all">View All</span>
      </div>

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
          {salesData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.id}</td>
              <td>{sale.customer}</td>
              <td>{sale.product}</td>
              <td>{sale.amount}</td>
              <td>
                <span className={`status ${getStatusClass(sale.status)}`}>
                  {sale.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}