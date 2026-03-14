import { useState } from "react";
import "../../styles/UserManagement.css";

const INITIAL_MANAGERS = [
    { id: 1, name: "Sarah Mitchell", email: "sarah@opticorp.com", phone: "555-1001", status: "Active", avatar: "SM" },
    { id: 2, name: "James Thornton", email: "james@opticorp.com", phone: "555-1042", status: "Active", avatar: "JT" },
    { id: 3, name: "Priya Nair", email: "priya@opticorp.com", phone: "555-1087", status: "Inactive", avatar: "PN" },
];

const avatarColors = [
    ["#f5b731", "#000"],
    ["#4fc3f7", "#000"],
    ["#a78bfa", "#000"],
    ["#34d399", "#000"],
    ["#fb7185", "#000"],
];

function getAvatarColor(id) {
    return avatarColors[(id - 1) % avatarColors.length];
}

export default function UserManagement() {

    const [managers, setManagers] = useState(INITIAL_MANAGERS);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [removingId, setRemovingId] = useState(null);

    const toggleStatus = (id) => {
        setManagers((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" } : m
            )
        );
    };

    const removeManager = (id) => {
        setRemovingId(id);

        setTimeout(() => {
            setManagers((prev) => prev.filter((m) => m.id !== id));
            setRemovingId(null);
        }, 300);
    };

    const filtered = managers.filter((m) => {
        const matchesSearch =
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.email.toLowerCase().includes(search.toLowerCase()) ||
            m.phone.includes(search);

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
                    </div>

                </div>

                {/* TABLE */}

                <div className="um-table">

                    {filtered.length === 0 ? (

                        <div className="um-empty">
                            No managers found
                        </div>

                    ) : (

                        filtered.map((m) => {

                            const [bg, fg] = getAvatarColor(m.id);

                            return (

                                <div
                                    key={m.id}
                                    className={`um-row ${removingId === m.id ? "removing" : ""}`}
                                >

                                    <div className="um-name-cell">

                                        <div
                                            className="um-avatar"
                                            style={{ background: bg, color: fg }}
                                        >
                                            {m.avatar}
                                        </div>

                                        <span className="um-name">{m.name}</span>

                                    </div>

                                    <div className="um-email">{m.email}</div>

                                    <div className="um-phone">{m.phone}</div>

                                    <button
                                        className={`um-status ${m.status === "Active" ? "active" : "inactive"}`}
                                        onClick={() => toggleStatus(m.id)}
                                    >
                                        {m.status}
                                    </button>

                                    <button
                                        className="um-delete"
                                        onClick={() => removeManager(m.id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            );
                        })

                    )}

                </div>

            </div>

        </div>
    );
}