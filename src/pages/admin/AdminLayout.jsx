import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "../../styles/AdminLayout.css";

export default function AdminLayout() {

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">
                <Outlet />
            </div>

        </div>

    );
}