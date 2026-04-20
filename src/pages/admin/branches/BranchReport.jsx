import { useState } from "react";
import "../../../styles/BranchManagement.css";

export default function BranchReport() {

  const [filter, setFilter] = useState("today");

  return (
    <div className="report-root">

      {/* HEADER */}
      <div className="report-header">
        <div>
          <p className="report-eyebrow">Operations Dashboard</p>
          <h1 className="report-title">Branch Report</h1>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="report-filters">

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="today">Today</option>
          <option value="range">Date Range</option>
        </select>

        <select>
          <option>All Branches</option>
          <option>Kochi</option>
          <option>Calicut</option>
        </select>

        {filter === "range" && (
          <>
            <input type="date" />
            <input type="date" />
          </>
        )}

      </div>

      {/* SALES TABLE */}
      <div className="report-card">

        <h3>Branch Sales</h3>

        <table>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Total Sales</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Kochi</td>
              <td>₹120000</td>
            </tr>
            <tr>
              <td>Calicut</td>
              <td>₹85000</td>
            </tr>
            <tr>
              <td>Thrissur</td>
              <td>₹65000</td>
            </tr>
          </tbody>
        </table>

      </div>

      {/* INVENTORY TABLE */}
      <div className="report-card">

        <h3>Branch Inventory</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Branch</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>RayBan Frame</td>
              <td>Kochi</td>
              <td>12</td>
            </tr>
            <tr>
              <td>Blue Cut Lens</td>
              <td>Calicut</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}