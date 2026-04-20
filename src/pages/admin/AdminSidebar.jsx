import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaBuilding,
    FaUsers,
    FaBox,
    FaTruck,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { name: "Branches", icon: <FaBuilding />, path: "/admin/branches" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Products", icon: <FaBox />, path: "/admin/products" },
    { name: "Vendors", icon: <FaTruck />, path: "/admin/vendors" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin/reports" }
];

export default function AdminSidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (

        <aside className="admin-sidebar">

            {/* LOGO */}
            <div className="admin-logo">
                Super Admin
            </div>

            {/* MENU */}
            <div className="admin-menu">

                {menu.map((item, index) => (

                    <Link
                        key={index}
                        to={item.path}
                        className={`admin-link ${location.pathname === item.path ? "admin-active" : ""
                            }`}
                    >

                        <span className="icon">{item.icon}</span>
                        <span className="text">{item.name}</span>
                    </Link>
                ))}

                {/* LOGOUT BUTTON PLACED DIRECTLY BELOW REPORTS */}
                <button className="admin-link admin-logout-btn" onClick={handleLogout} style={{ border: 'none', background: 'transparent', textAlign: 'left', width: '100%', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', marginTop: '10px' }}>
                    <span className="icon" style={{ color: '#ef4444' }}><FaSignOutAlt /></span>
                    <span className="text" style={{ color: '#ef4444', fontWeight: '500' }}>Logout</span>
                </button>

            </div>

        </aside>

    );
}