import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./pages/Dashboard";
import OrderTracking from "./pages/OrderTracking";

import Vendor from "./pages/master/Vendor";
import Customer from "./pages/master/Customer";
import Brand from "./pages/master/Brand";
import Product from "./pages/master/Product";

import "./styles.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <Sidebar />

      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </div>
    </div>
  );
}