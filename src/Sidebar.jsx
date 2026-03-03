import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaLayerGroup,
  FaUserPlus,
  FaShoppingCart,
  FaBoxes,
  FaTags,
  FaUser,
  FaBoxOpen,
  FaFileAlt,
  FaChartBar,
  FaTools,
  FaCog,
  FaSignOutAlt,
  FaTruck
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", icon: <FaHome />, path: "/" },
  { name: "Order Tracking", icon: <FaTruck />, path: "/tracking" },

  {
    name: "Master",
    icon: <FaLayerGroup />,
    children: [
      "Vendor","Customer","Sales Man","Doctor","Brand","Model",
      "Colour Code","Colour","Lens Colour","Size","Made By",
      "Frame Type","Power","Category","Product","Warehouse","Tax Group"
    ]
  },

  { name: "Logout", icon: <FaSignOutAlt />, path: "/" }
];

export default function Sidebar() {
  const [openMain, setOpenMain] = useState(null);

  return (
    <aside className="sidebar">
      <div className="logo">Admin</div>

      <div className="sidebar-scroll">
        {menu.map((item) => (
          <div key={item.name}>

            {/* MAIN MENU */}
            {item.path ? (
              <Link to={item.path} className="side-main">
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
              </Link>
            ) : (
              <div
                className={`side-main ${
                  openMain === item.name ? "active" : ""
                }`}
                onClick={() =>
                  setOpenMain(
                    openMain === item.name ? null : item.name
                  )
                }
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
                <span className="arrow">
                  {openMain === item.name ? "▲" : "▼"}
                </span>
              </div>
            )}

            {/* SUBMENU */}
            {item.children && openMain === item.name && (
              <div className="submenu">
                {item.children.map((sub, index) => (
                  <Link
                    key={index}
                    to={`/${sub.toLowerCase().replace(/\s+/g, "")}`}
                    className="sub-item"
                    onClick={() => setOpenMain(null)}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </aside>
  );
}