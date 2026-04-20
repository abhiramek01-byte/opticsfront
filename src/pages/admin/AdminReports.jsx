import "../../styles/AdminReports.css";

import { FaRupeeSign, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";

export default function Reports() {
  return (
    <div className="report-root">

      <h1 className="report-title">Business Reports</h1>
      <p className="report-subtitle">Analyse sales and performance</p>

      <div className="report-stats">

        <div className="report-card sales">
          <div className="report-icon"><FaRupeeSign /></div>
          <h3>Total Sales</h3>
          <p>₹1,25,000</p>
        </div>

        <div className="report-card orders">
          <div className="report-icon"><FaShoppingCart /></div>
          <h3>Total Orders</h3>
          <p>320</p>
        </div>

        <div className="report-card products">
          <div className="report-icon"><FaBox /></div>
          <h3>Products Sold</h3>
          <p>540</p>
        </div>

        <div className="report-card vendors">
          <div className="report-icon"><FaUsers /></div>
          <h3>Active Vendors</h3>
          <p>12</p>
        </div>

      </div>

      <div className="report-grid">

        <div className="report-box">
          <h2>Top Selling Products</h2>

          <ul>
            <li>
              <div className="list-row">
                <span>RayBan Frame</span>
                <span className="value">120</span>
              </div>
              <div className="progress"><div className="green" style={{width:"100%"}}></div></div>
            </li>

            <li>
              <div className="list-row">
                <span>Blue Cut Lens</span>
                <span className="value">95</span>
              </div>
              <div className="progress"><div className="blue" style={{width:"80%"}}></div></div>
            </li>

            <li>
              <div className="list-row">
                <span>Reading Glass</span>
                <span className="value">80</span>
              </div>
              <div className="progress"><div className="purple" style={{width:"65%"}}></div></div>
            </li>
          </ul>
        </div>

        <div className="report-box">
          <h2>Top Vendors</h2>

          <ul>
            <li>
              <div className="list-row">
                <span>Vision Optics</span>
                <span className="value">₹45,000</span>
              </div>
              <div className="progress"><div className="green" style={{width:"100%"}}></div></div>
            </li>

            <li>
              <div className="list-row">
                <span>Clear Lens Co.</span>
                <span className="value">₹30,000</span>
              </div>
              <div className="progress"><div className="blue" style={{width:"70%"}}></div></div>
            </li>

            <li>
              <div className="list-row">
                <span>EyeCare Supplies</span>
                <span className="value">₹22,000</span>
              </div>
              <div className="progress"><div className="orange" style={{width:"50%"}}></div></div>
            </li>
          </ul>

        </div>

      </div>

    </div>
  );
}