import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { useState } from "react";
import {
  FaHome,
  FaLayerGroup,
  FaSignOutAlt,
  FaTruck,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { name: "Order Tracking", icon: <FaTruck />, path: "/dashboard/tracking" },

  {
    name: "Master",
    icon: <FaLayerGroup />,
    children: [
      { name: "Vendor", path: "/dashboard/master/vendor" },
      { name: "Customer", path: "/dashboard/master/customer" },
      { name: "Sales Man", path: "/dashboard/master/salesman" },
      { name: "Doctor", path: "/dashboard/master/doctor" },
      { name: "Brand", path: "/dashboard/master/brand" },
      { name: "Model", path: "/dashboard/master/model" },
      { name: "Colour Code", path: "/dashboard/master/colourcode" },
      { name: "Colour", path: "/dashboard/master/colour" },
      { name: "Lens Colour", path: "/dashboard/master/lenscolour" },
      { name: "Size", path: "/dashboard/master/size" },
      { name: "Made By", path: "/dashboard/master/madeby" },
      { name: "Frame Type", path: "/dashboard/master/frametype" },
      { name: "Power", path: "/dashboard/master/power" },
      { name: "Category", path: "/dashboard/master/category" },
      { name: "Product", path: "/dashboard/master/product" },
      { name: "Warehouse", path: "/dashboard/master/warehouse" },
      { name: "Tax Group", path: "/dashboard/master/taxgroup" },

    ],
  },

  {
    name: "Purchase",
    icon: <FaLayerGroup />,
    children: [
      { name: "Purchase", path: "/dashboard/purchase" },
      { name: "Purchase Return", path: "/dashboard/purchase-return" },
      { name: "Vendor Lens Order", path: "/dashboard/purchase/vendor-lens-order" },
    ],
  },
  {
    name: "Stock",
    icon: <FaLayerGroup />,
    children: [
      { name: "Opening Stock", path: "/dashboard/openingstock" },
      { name: "Damage", path: "/dashboard/damage" },
      { name: "Stock Adjustment", path: "/dashboard/stockadjustment" },

    ],
  },
  {
    name: "Registration",
    icon: <FaLayerGroup />,
    children: [
      { name: "Patient Registration", path: "/dashboard/patient-registration" },
      { name: "Eye Testing", path: "/dashboard/eye-testing" }
    ]
  },

  {
    name: "Product",
    icon: <FaLayerGroup />,
    children: [
      { name: "View Product", path: "/dashboard/viewProduct" },
      { name: "Add Product", path: "/dashboard/addProduct" }
    ]
  },

  {
    name: "Report",
    icon: <FaLayerGroup />,
    children: [
      { name: "Purchase", path: "/dashboard/report/purchase" },
      { name: "Sales", path: "/dashboard/report/sales" },
      { name: "Stock", path: "/dashboard/report/stock" },
      { name: "Address list", path: "/dashboard/report/address" },
      { name: "Audit trial", path: "/dashboard/report/audit" },
      { name: "Accounts", path: "/dashboard/report/accounts" },
      { name: "Customer History", path: "/dashboard/customer/history" }
    ]
  },


  {
    name: "MIS",
    icon: <FaChartLine />,
    children: [
      { name: "Bill wise profit", path: "/dashboard/bill-profit" },
      { name: "Day end report", path: "/dashboard/day-end" }
    ]
  },

  {
    name: "Branches",
    icon: <FaLayerGroup />,
    children: [
      { name: "Branch Master", path: "/dashboard/branches" },
      { name: "Branch Inventory", path: "/dashboard/branches/inventory" },
      { name: "Branch Sales", path: "/dashboard/branches/sales" }
    ]
  },

  {
    name: "Lens Management",
    icon: <FaLayerGroup />,
    children: [
      { name: "Lens Order Entry", path: "/dashboard/lens/order" },
      { name: "Lens Orders", path: "/dashboard/lens/list" },
      { name: "Receive Lens", path: "/dashboard/lens/receive" }
    ]
  },


  {
    name: "Sales",
    icon: <FaLayerGroup />,
    children: [
      { name: "Sales Order", path: "/dashboard/salesorder" },
      { name: "Sales", path: "/dashboard/sales" },
      { name: "Sales Return", path: "/dashboard/sales-return" },
      {
        name: "Sales Tax",
        children: [
          { name: "Summary", path: "/dashboard/sales-tax-summary" },
          { name: "Detailed Report", path: "/dashboard/sales-tax-report" }
        ]
      },
      { name: "More Reports", path: "/dashboard/sales-reports" }
    ]
  },
  {
    name: "Tools",
    icon: <FaLayerGroup />,
    children: [
      { name: "Barcode Designer", path: "/dashboard/tools/barcode" },
      { name: "Registration", path: "/dashboard/tools/registration" },
      { name: "Bulk Message", path: "/dashboard/tools/bulkmessage" }

    ]
  },

  {
    name: "Accounts",
    icon: <FaLayerGroup />,
    children: [
      { name: "Company", path: "/dashboard/accounts/company" },
      { name: "Period", path: "/dashboard/accounts/period" },
      { name: "Account", path: "/dashboard/accounts/account" },
      { name: "Cash Receipt", path: "/dashboard/accounts/cashreceipt" },
      { name: "Cash Payment", path: "/dashboard/accounts/cashpayment" },
      { name: "Bill Wise Payment", path: "/dashboard/accounts/billwisepayment" },
      { name: "Journal", path: "/dashboard/accounts/journal" },
      { name: "Expense Distribution", path: "/dashboard/accounts/expensedistribution" },
      { name: "Customer Center", path: "/dashboard/accounts/customercenter" },
      { name: "Vendor Center", path: "/dashboard/accounts/vendorcenter" },

      // BANKING GROUP
      {
        name: "Banking",
        icon: <FaLayerGroup />,
        children: [
          { name: "Cheque Payment", path: "/dashboard/accounts/banking/chequepayment" },
          { name: "Cheque Receipt", path: "/dashboard/accounts/banking/chequereceipt" },
          { name: "Cheque Clearing", path: "/dashboard/accounts/banking/chequeclearing" }
        ]
      }
    ]
  }

];

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  const toggleMenu = (name) => {
    setOpenMain(openMain === name ? null : name);
  };
  const toggleSubMenu = (name) => {
    setOpenSub(openSub === name ? null : name);
  };

  return (
    <aside className="sidebar">
      <div className="logo"> SPASH EYE WEAR</div>

      <div className="sidebar-scroll">
        {menu.map((item, index) => (
          <div key={index}>
            {/* MAIN ITEM */}
            {item.path ? (
              <Link
                to={item.path}
                className={`side-main ${location.pathname === item.path ? "active" : ""
                  }`}
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
              </Link>
            ) : (
              <div
                className={`side-main ${openMain === item.name ? "active" : ""
                  }`}
                onClick={() => toggleMenu(item.name)}
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
                <span className="arrow">
                  {openMain === item.name ? "▲" : "▼"}
                </span>
              </div>
            )}

            {/* SUB MENU */}
            {/* {item.children && openMain === item.name && (
              <div className="submenu">
                {item.children.map((sub, i) => (
                  <Link
                    key={i}
                    to={sub.path}
                    className={`sub-item ${location.pathname === sub.path ? "sub-active" : ""
                      }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )} */}
            {item.children && openMain === item.name && (
              <div className="submenu">
                {item.children.map((sub, i) => (
                  <div key={i}>

                    {sub.path ? (
                      <Link
                        to={sub.path}
                        className={`sub-item ${location.pathname === sub.path ? "sub-active" : ""
                          }`}
                      >
                        {sub.name}
                      </Link>
                    ) : (
                      <div
                        className="sub-item"
                        onClick={() => toggleSubMenu(sub.name)}
                      >
                        {sub.name}
                        <span className="arrow">
                          {openSub === sub.name ? "▲" : "▼"}
                        </span>
                      </div>
                    )}

                    {sub.children && openSub === sub.name && (
                      <div className="subsubmenu">
                        {sub.children.map((child, j) => (
                          <Link
                            key={j}
                            to={child.path}
                            className={`sub-sub-item ${location.pathname === child.path ? "sub-active" : ""
                              }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* LOGOUT */}
        <button className="side-main logout-btn" onClick={handleLogout}>
          <span className="icon">
            <FaSignOutAlt />
          </span>
          <span className="text">Logout</span>
        </button>
      </div>
    </aside>
  );
}