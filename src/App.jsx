import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Dashboard layout (existing)
import Sidebar from "./Sidebar";
import Dashboard from "./pages/Dashboard";
import OrderTracking from "./pages/OrderTracking";
import Vendor from "./pages/master/Vendor";
import Customer from "./pages/master/Customer";
import Brand from "./pages/master/Brand";
import Product from "./pages/master/Product";
import SalesMan from "./pages/master/Salesman";
import Doctor from "./pages/master/Doctor";
import Model from "./pages/master/Model";
import ColourCode from "./pages/master/ColourCode";
import Colour from "./pages/master/Colour";
import LensColour from "./pages/master/LensColour";
import Size from "./pages/master/Size";
import MadeBy from "./pages/master/MadeBy";
import FrameType from "./pages/master/FrameType";
import Power from "./pages/master/Power";
import Category from "./pages/master/Category";
import Warehouse from "./pages/master/Warehouse";
import TaxGroup from "./pages/master/TaxGroup";

import Purchase from "./pages/purchase/Purchase";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";
import VendorLensOrder from "./pages/purchase/VendorLensOrder";


import OpeningStock from "./pages/stock/OpeningStock";
import Damage from "./pages/stock/Damage";
import StockAdjustment from "./pages/stock/StockAdjustment";

import PatientRegistration from "./pages/registration/PatientRegistration";
import EyeTesting from "./pages/registration/EyeTesting";

import Company from "./pages/accounts/Company";
import Period from "./pages/accounts/Period";
import Account from "./pages/accounts/Account";
import CashReceipt from "./pages/accounts/CashReceipt";
import CashPayment from "./pages/accounts/CashPayment";
import BillWisePayment from "./pages/accounts/BillWisePayment";
import Journal from "./pages/accounts/Journal";
import ExpenseDistribution from "./pages/accounts/ExpenseDistribution";
import CustomerCenter from "./pages/accounts/CustomerCenter";
import VendorCenter from "./pages/accounts/VendorCenter";



import ChequeReceipt from "./pages/accounts/banking/ChequeReceipt";
import ChequePayment from "./pages/accounts/banking/ChequePayment";
import ChequeClearing from "./pages/accounts/banking/ChequeClearing";

import SalesOrder from "./pages/sales/SalesOrder";
import Sales from "./pages/sales/Sales";
import SalesReturn from "./pages/sales/SalesReturn";
import SalesTaxSummary from "./pages/sales/SalesTaxSummary";
import SalesTaxReport from "./pages/sales/SalesTaxReport";

import ViewProduct from "./pages/product/ViewProduct";
import AddProduct from "./pages/product/AddProduct";


import PurchaseReport from "./pages/report/PurchaseReport";
import SalesReport from "./pages/report/SalesReport";
import StockReport from "./pages/report/StockReport";
import AddressList from "./pages/report/AddressList";
import AuditTrail from "./pages/report/AuditTrail";
import AccountsReport from "./pages/report/AccountsReport";



import BillWiseProfit from "./pages/mis/BillWiseProfit";
import DayEndReport from "./pages/mis/DayEndReport";


import BarcodeDesigner from "./pages/tools/BarcodeDesigner";
import ToolsRegistration from "./pages/tools/ToolsRegistration";
import BulkMessage from "./pages/tools/BulkMessage";


import BranchMaster from "./pages/branch/BranchMaster";
import BranchInventory from "./pages/branch/BranchInventory";
import BranchSales from "./pages/branch/BranchSales";


import LensOrderEntry from "./pages/lens/LensOrderEntry";
import LensOrderList from "./pages/lens/LensOrderList";
import ReceiveLens from "./pages/lens/ReceiveLens";

import CustomerHistory from "./pages/customer/CustomerHistory";














// Styles
import "./styles.css";
import "./styles/Customer.css";
import "./styles/Vendor.css";
import "./styles/Sidebar.css";
import "./styles/SidebarMenu.css";
import "./styles/MainContent.css";
import "./styles/TopBar.css";
import "./styles/Salesman.css";
import "./styles/Doctor.css";
import "./styles/Brand.css";
import "./styles/Model.css";
import "./styles/Product.css";
import "./styles/Purchase.css";
import "./styles/OpeningStock.css";
import "./styles/Damage.css";
import "./styles/StockAdjustment.css";
import "./styles/PatientRegistration.css";
import "./styles/EyeTesting.css";
import "./styles/Company.css";
import "./styles/Period.css";
import "./styles/Account.css";
import "./styles/CashReceipt.css";
import "./styles/CashPayment.css";
import "./styles/BillWisePayment.css";
import "./styles/Journal.css";
import "./styles/ExpenseDistribution.css";
import "./styles/CustomerCenter.css";
import "./styles/VendorCenter.css";
import "./styles/Banking.css";
import "./styles/OrderTracking.css";
import "./styles/Sales.css";
import "./styles/SalesReturn.css";
import "./styles/SalesOrder.css";
import "./styles/SalesTax.css";
import "./styles/ProductCatalog.css";
import "./styles/AddProduct.css";
import "./styles/Report.css";
import "./styles/MIS.css";
import "./styles/Tools.css";
import "./styles/BranchInventory.css";
import "./styles/BranchMaster.css";
import "./styles/BranchSales.css";
import "./styles/LensOrder.css";
import "./styles/VendorLensOrder.css"
import "./styles/CustomerHistory.css"














/* ── Protected wrapper: blocks dashboard if not logged in ── */
function ProtectedLayout({ isLoggedIn, onLogout }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="app-wrapper">
      <Sidebar onLogout={onLogout} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/master/vendor" element={<Vendor />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/master/customer" element={<Customer />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/product" element={<Product />} />
          <Route path="/master/salesman" element={<SalesMan />} />
          <Route path="/master/doctor" element={<Doctor />} />
          <Route path="/master/model" element={<Model />} />
          <Route path="/master/colourcode" element={<ColourCode />} />
          <Route path="/master/colour" element={<Colour />} />
          <Route path="/master/lenscolour" element={<LensColour />} />
          <Route path="/master/size" element={<Size />} />
          <Route path="/master/madeby" element={<MadeBy />} />
          <Route path="/master/frametype" element={<FrameType />} />
          <Route path="/master/power" element={<Power />} />
          <Route path="/master/category" element={<Category />} />
          <Route path="/master/product" element={<Product />} />
          <Route path="/master/warehouse" element={<Warehouse />} />
          <Route path="/master/taxgroup" element={<TaxGroup />} />
          <Route path="/purchase" element={<Purchase />} />

          <Route path="/purchase-return" element={<PurchaseReturn />} />
          <Route path="/purchase/vendor-lens-order" element={<VendorLensOrder />} />

          <Route path="/openingstock" element={<OpeningStock />} />
          <Route path="/damage" element={<Damage />} />
          <Route path="/stockadjustment" element={<StockAdjustment />} />

          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/eye-testing" element={<EyeTesting />} />


          <Route path="/accounts/company" element={<Company />} />
          <Route path="/accounts/period" element={<Period />} />
          <Route path="/accounts/account" element={<Account />} />
          <Route path="/accounts/cashreceipt" element={<CashReceipt />} />
          <Route path="/accounts/cashpayment" element={<CashPayment />} />
          <Route path="/accounts/billwise" element={<BillWisePayment />} />
          <Route path="/accounts/journal" element={<Journal />} />
          <Route path="/accounts/expensedistribution" element={<ExpenseDistribution />} />
          <Route path="/accounts/customercenter" element={<CustomerCenter />} />
          <Route path="/accounts/vendorcenter" element={<VendorCenter />} />
          {/* <Route path="/accounts/cheque-receipt" element={<ChequeReceipt />} />
          <Route path="/accounts/cheque-payment" element={<ChequePayment />} />
          <Route path="/accounts/cheque-clearing" element={<ChequeClearing />} /> */}
          <Route path="/accounts/banking/chequereceipt" element={<ChequeReceipt />} />
          <Route path="/accounts/banking/chequepayment" element={<ChequePayment />} />
          <Route path="/accounts/banking/chequeclearing" element={<ChequeClearing />} />

          <Route path="/salesorder" element={<SalesOrder />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales-return" element={<SalesReturn />} />
          <Route path="/sales-tax-summary" element={<SalesTaxSummary />} />
          <Route path="/sales-tax-report" element={<SalesTaxReport />} />

          <Route path="/viewProduct" element={<ViewProduct />} />
          <Route path="/addProduct" element={<AddProduct />} />


          <Route path="/report/purchase" element={<PurchaseReport />} />
          <Route path="/report/sales" element={<SalesReport />} />
          <Route path="/report/stock" element={<StockReport />} />
          <Route path="/report/address" element={<AddressList />} />
          <Route path="/report/audit" element={<AuditTrail />} />
          <Route path="/report/accounts" element={<AccountsReport />} />


          <Route path="/bill-profit" element={<BillWiseProfit />} />
          <Route path="/day-end" element={<DayEndReport />} />

          <Route path="/tools/barcode" element={<BarcodeDesigner />} />
          <Route path="/tools/registration" element={<ToolsRegistration />} />
          <Route path="/tools/bulkmessage" element={<BulkMessage />} />


          <Route path="/branches" element={<BranchMaster />} />
          <Route path="/branches/inventory" element={<BranchInventory />} />
          <Route path="/branches/sales" element={<BranchSales />} />

          <Route path="/lens/order" element={<LensOrderEntry />} />
          <Route path="/lens/list" element={<LensOrderList />} />
          <Route path="/lens/receive" element={<ReceiveLens />} />

          <Route path="/customer/history" element={<CustomerHistory />} />





        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}