import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBuilding, FaSearch, FaTrash, FaUser, FaMapMarkerAlt, FaPlus, FaEnvelope, FaPhone } from "react-icons/fa";
import "../../styles/BranchManagement.css";

const avatarColors = [
    ["#e0f2fe", "#0369a1"], // sky
    ["#f3e8ff", "#6b21a8"], // purple
    ["#dcfce7", "#15803d"], // green
    ["#fee2e2", "#b91c1c"], // red
    ["#fef3c7", "#b45309"], // amber
];

function getAvatarColor(id) {
    return avatarColors[(id - 1) % avatarColors.length] || avatarColors[0];
}

export default function BranchManagement() {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const fetchBranches = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/admin/branches");
            setBranches(res.data);
        } catch (error) {
            console.error("Failed to fetch branches", error);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const deleteBranch = async (id) => {
        if (!window.confirm("Are you sure you want to delete this branch? This action cannot be undone.")) {
            return;
        }
        
        setDeletingId(id);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/admin/branches/${id}`);
            setBranches(branches.filter((b) => b.id !== id));
        } catch (error) {
            console.error("Failed to delete branch", error);
            alert("Failed to delete branch. It may be in use.");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredBranches = branches.filter(
        (b) =>
            b.name?.toLowerCase().includes(search.toLowerCase()) ||
            b.city?.toLowerCase().includes(search.toLowerCase()) ||
            b.users?.some(u => u.name.toLowerCase().includes(search.toLowerCase())) ||
            b.users?.some(u => u.email.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="bm-root">
            <div className="bm-card">
                {/* HEADER */}
                <div className="bm-header">
                    <div className="bm-header-top">
                        <div>
                            <span className="bm-eyebrow">Operations & Administration</span>
                            <h1 className="bm-title">Branch Directory</h1>
                            <p className="bm-subtitle">Manage branch store outlets, details, and assigned retail managers.</p>
                        </div>
                        <div className="bm-stat-badge">
                            <span className="bm-stat-num">{branches.length}</span>
                            <span className="bm-stat-label">Total Branches</span>
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="bm-controls">
                    <div className="bm-search-wrapper">
                        <FaSearch className="bm-search-icon" />
                        <input
                            className="bm-search"
                            type="text"
                            placeholder="Search by branch name, city, or manager..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button 
                        className="bm-register-btn"
                        onClick={() => navigate("/admin/branches/register")}
                    >
                        <FaPlus size={13} />
                        <span>Register Branch</span>
                    </button>
                </div>

                {/* LIST / CARDS */}
                <div className="bm-list">
                    {filteredBranches.length === 0 ? (
                        <div className="bm-empty">
                            <FaBuilding size={48} style={{ opacity: 0.3, marginBottom: '15px' }} />
                            <p>No branches found matches the query</p>
                        </div>
                    ) : (
                        <div className="bm-grid-container">
                            {filteredBranches.map((branch) => {
                                const manager = branch.users?.[0];
                                const [bg, fg] = manager ? getAvatarColor(manager.id) : ["#f1f5f9", "#64748b"];
                                const avatar = manager?.name?.substring(0, 2).toUpperCase() || "--";

                                return (
                                    <div
                                        key={branch.id}
                                        className={`bm-branch-card ${deletingId === branch.id ? "deleting" : ""}`}
                                    >
                                        <div className="bm-card-main">
                                            {/* Branch Details */}
                                            <div className="bm-branch-info">
                                                <div className="bm-branch-meta">
                                                    <span className="bm-branch-id">#{String(branch.id).padStart(4, '0')}</span>
                                                    <span className="bm-location">
                                                        <FaMapMarkerAlt size={12} />
                                                        {branch.city}
                                                    </span>
                                                </div>
                                                <h3 className="bm-branch-name">{branch.name}</h3>
                                            </div>

                                            {/* Manager Details */}
                                            <div className="bm-manager-section">
                                                <div className="bm-manager-avatar" style={{ backgroundColor: bg, color: fg }}>
                                                    {avatar}
                                                </div>
                                                <div className="bm-manager-details">
                                                    <span className="bm-manager-role">Store Manager</span>
                                                    <h4 className="bm-manager-name">{manager ? manager.name : 'Unassigned'}</h4>
                                                    {manager && (
                                                        <div className="bm-manager-contact">
                                                            {manager.email && (
                                                                <span title={manager.email}>
                                                                    <FaEnvelope size={11} /> {manager.email}
                                                                </span>
                                                            )}
                                                            {manager.phone && (
                                                                <span>
                                                                    <FaPhone size={11} /> {manager.phone}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Action Area */}
                                        <div className="bm-card-actions">
                                            <button 
                                                className="bm-delete-btn" 
                                                onClick={() => deleteBranch(branch.id)}
                                                title="Delete Branch"
                                                disabled={deletingId === branch.id}
                                            >
                                                <FaTrash size={14} />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
