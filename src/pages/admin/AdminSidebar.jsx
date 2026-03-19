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

            </div>

            {/* LOGOUT */}
            <button className="admin-logout" onClick={handleLogout}>

                <FaSignOutAlt />
                <span>Logout</span>

            </button>

        </aside>

    );
}