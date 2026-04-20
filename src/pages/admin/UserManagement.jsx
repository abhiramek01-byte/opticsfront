import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/UserManagement.css";

const avatarColors = [
    ["#f5b731", "#000"],
    ["#4fc3f7", "#000"],
    ["#a78bfa", "#000"],
    ["#34d399", "#000"],
    ["#fb7185", "#000"],
];

function getAvatarColor(id) {
    return avatarColors[(id - 1) % avatarColors.length] || avatarColors[0];
}

export default function UserManagement() {

    const [managers, setManagers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [removingId, setRemovingId] = useState(null);

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", branchId: "", password: "", role: "staff" });

    const fetchData = async () => {
        try {
            const [usersRes, branchRes] = await Promise.all([
                axios.get("http://localhost:3000/admin/users"),
                axios.get("http://localhost:3000/admin/branches")
            ]);
            setManagers(usersRes.data);
            setBranches(branchRes.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:3000/admin/users/${id}/toggle`);
            setManagers((prev) =>
                prev.map((m) =>
                    m.id === id ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" } : m
                )
            );
        } catch (error) {
            console.error("Error toggling status", error);
        }
    };

    const removeManager = async (id) => {
        setRemovingId(id);
        try {
            await axios.delete(`http://localhost:3000/admin/users/${id}`);
            setManagers((prev) => prev.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Error removing manager", error);
            alert("Error removing user");
        } finally {
            setRemovingId(null);
        }
    };

    const handleAddUser = async () => {
        if (!form.name || !form.email || !form.branchId) {
            alert("Name, Email, and Branch are required!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/admin/users", {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: form.role,
                branchId: Number(form.branchId)
            });
            setManagers([...managers, res.data]);
            setForm({ name: "", email: "", phone: "", password: "", role: "staff", branchId: "" });
            setShowForm(false);
        } catch (error) {
            console.error("Failed to save user", error);
            alert("Failed to save user");
        }
    };

    const filtered = managers.filter((m) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
            (m.name || "").toLowerCase().includes(searchLower) ||
            (m.email || "").toLowerCase().includes(searchLower) ||
            String(m.phone || "").toLowerCase().includes(searchLower);

        const matchesFilter = filter === "All" || m.status === filter;

        return matchesSearch && matchesFilter;
    });

    const activeCount = managers.filter((m) => m.status === "Active").length;
    const inactiveCount = managers.filter((m) => m.status === "Inactive").length;

    return (
        <div className="um-root">
            <div className="um-card">
                {/* HEADER */}
                <div className="um-header">
                    <div className="um-header-top">
                        <div>
                            <p className="um-eyebrow">People & Access</p>
                            <h1 className="um-title">Manager Directory</h1>
                        </div>
                        <div className="um-stats">
                            <div className="um-stat total">
                                <span className="um-stat-num">{managers.length}</span>
                                <span className="um-stat-label">Total</span>
                            </div>
                            <div className="um-stat active">
                                <span className="um-stat-num">{activeCount}</span>
                                <span className="um-stat-label">Active</span>
                            </div>
                            <div className="um-stat inactive">
                                <span className="um-stat-num">{inactiveCount}</span>
                                <span className="um-stat-label">Inactive</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEARCH + FILTER */}
                <div className="um-controls">
                    <input
                        className="um-search"
                        type="text"
                        placeholder="Search manager..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                    <div className="um-filters">
                        {["All", "Active", "Inactive"].map((f) => (
                            <button
                                key={f}
                                className={`um-filter-btn ${filter === f ? "active" : ""}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                        <button 
                            style={{ marginLeft: '20px', background: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => setShowForm(!showForm)}
                        >
                            + Add Manager
                        </button>
                    </div>
                </div>

                {/* ADD USER FORM */}
                {showForm && (
                    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }} placeholder="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                        <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }} placeholder="Email (Unique)" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                        <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }} placeholder="Phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                        <input type="password" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }} placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                        <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }} value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1 }} value={form.branchId} onChange={(e) => setForm({...form, branchId: e.target.value})}>
                            <option value="">Select Branch...</option>
                            {branches.map(b => (
                                <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
                            ))}
                        </select>
                        <button style={{ background: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleAddUser}>Save User</button>
                    </div>
                )}

                {/* TABLE */}
                <div className="um-table">
                    {filtered.length === 0 ? (
                        <div className="um-empty">No managers found</div>
                    ) : (
                        filtered.map((m) => {
                            const [bg, fg] = getAvatarColor(m.id || 1);
                            const avatar = m.name?.substring(0, 2).toUpperCase() || "XX";

                            return (
                                <div key={m.id} className={`um-row ${removingId === m.id ? "removing" : ""}`}>
                                    <div className="um-name-cell">
                                        <div className="um-avatar" style={{ background: bg, color: fg }}>{avatar}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span className="um-name">{m.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.branch?.name || "No Branch"}</span>
                                        </div>
                                    </div>
                                    <div className="um-email">{m.email}</div>
                                    <div className="um-phone">{m.phone}</div>
                                    <button className={`um-status ${m.status === "Active" ? "active" : "inactive"}`} onClick={() => toggleStatus(m.id)}>
                                        {m.status}
                                    </button>
                                    <button className="um-delete" onClick={() => removeManager(m.id)}>Delete</button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}