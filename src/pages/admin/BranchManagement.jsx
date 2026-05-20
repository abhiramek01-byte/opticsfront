import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/BranchManagement.css";

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

export default function BranchManagement() {
    const [branches, setBranches] = useState([]);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    
    const [form, setForm] = useState({
        branchName: "",
        city: "",
        managerName: "",
        managerEmail: "",
        managerPhone: "",
        managerPassword: ""
    });

    const fetchBranches = async () => {
        try {
            const res = await axios.get("http://localhost:3000/admin/branches");
            setBranches(res.data);
        } catch (error) {
            console.error("Failed to fetch branches", error);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const addBranch = async () => {
        if (!form.branchName || !form.city) {
            alert("Branch Name and City are required");
            return;
        }

        const newBranch = {
            name: form.branchName,
            city: form.city,
            managerName: form.managerName,
            managerEmail: form.managerEmail,
            managerPhone: form.managerPhone,
            managerPassword: form.managerPassword
        };

        try {
            const res = await axios.post("http://localhost:3000/admin/branches", newBranch);
            // Re-fetch branches to get the eager-loaded users
            await fetchBranches();
            setForm({
                branchName: "",
                city: "",
                managerName: "",
                managerEmail: "",
                managerPhone: "",
                managerPassword: ""
            });
            setShowForm(false);
        } catch (error) {
            console.error("Failed to add branch", error);
            alert("Failed to add branch");
        }
    };

    const deleteBranch = async (id) => {
        setDeletingId(id);

        try {
            await axios.delete(`http://localhost:3000/admin/branches/${id}`);
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
                            <p className="bm-eyebrow">Operations & People Dashboard</p>
                            <h1 className="bm-title">Branch & Manager Directory</h1>
                        </div>
                        <div className="bm-stat-badge">
                            <span className="bm-stat-num">{branches.length}</span>
                            <span className="bm-stat-label">Branches</span>
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="bm-controls" style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <input
                        className="bm-search"
                        type="text"
                        placeholder="Search branches or managers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1, minWidth: '250px' }}
                    />
                    <button 
                        style={{ background: '#3b82f6', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cancel Registration" : "+ Register Branch"}
                    </button>
                </div>

                {/* ADD BRANCH & USER FORM */}
                {showForm && (
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1e293b' }}>Register New Branch & Assign Manager</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Branch Name *</label>
                                <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. Downtown Plaza" value={form.branchName} onChange={(e) => setForm({...form, branchName: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>City *</label>
                                <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. New York" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Manager Name (Optional)</label>
                                <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Full Name" value={form.managerName} onChange={(e) => setForm({...form, managerName: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Username/Email (Optional)</label>
                                <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Email address" value={form.managerEmail} onChange={(e) => setForm({...form, managerEmail: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Manager Phone (Optional)</label>
                                <input style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Phone number" value={form.managerPhone} onChange={(e) => setForm({...form, managerPhone: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Manager Password (Optional)</label>
                                <input type="password" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Password" value={form.managerPassword} onChange={(e) => setForm({...form, managerPassword: e.target.value})} />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button style={{ background: '#10b981', color: 'white', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={addBranch}>Save Branch & Manager</button>
                        </div>
                    </div>
                )}

                {/* TABLE */}
                <div className="bm-table">
                    {filteredBranches.length === 0 ? (
                        <div className="bm-empty">No branches found</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {filteredBranches.map((branch) => {
                                const manager = branch.users?.[0]; // Assuming one primary manager per branch for display
                                const [bg, fg] = manager ? getAvatarColor(manager.id) : ["#e2e8f0", "#94a3b8"];
                                const avatar = manager?.name?.substring(0, 2).toUpperCase() || "--";

                                return (
                                    <div
                                        key={branch.id}
                                        className={`bm-row ${deletingId === branch.id ? "deleting" : ""}`}
                                        style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', gap: '20px' }}
                                    >
                                        <div className="bm-id" style={{ fontWeight: 'bold', color: '#64748b', minWidth: '60px' }}>#{String(branch.id).padStart(4, '0')}</div>
                                        
                                        <div style={{ flex: '1.5' }}>
                                            <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '1.1rem' }}>{branch.name}</div>
                                            <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>📍 {branch.city}</div>
                                        </div>

                                        <div style={{ flex: '2', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {avatar}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '600', color: manager ? '#1e293b' : '#94a3b8' }}>
                                                    {manager ? manager.name : 'No Manager Assigned'}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                    {manager ? `${manager.email} • ${manager.phone}` : 'Assign one during registration'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {manager && (
                                                <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', background: manager.status === 'Active' ? '#dcfce7' : '#fee2e2', color: manager.status === 'Active' ? '#166534' : '#991b1b' }}>
                                                    {manager.status}
                                                </span>
                                            )}
                                            <button className="bm-delete" onClick={() => deleteBranch(branch.id)}>
                                                Delete
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