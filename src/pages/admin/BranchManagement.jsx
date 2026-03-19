import { useState } from "react";
import "../../styles/BranchManagement.css";

export default function BranchManagement() {

    const [branches, setBranches] = useState([
        { id: 1, name: "Downtown HQ", city: "New York" },
        { id: 2, name: "West Coast Office", city: "San Francisco" },
    ]);

    const [branchName, setBranchName] = useState("");
    const [city, setCity] = useState("");
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const addBranch = () => {

        if (!branchName || !city) return;

        const newBranch = {
            id: Date.now(),
            name: branchName,
            city
        };

        setBranches([...branches, newBranch]);

        setBranchName("");
        setCity("");
    };

    const deleteBranch = (id) => {

        setDeletingId(id);

        setTimeout(() => {

            setBranches(branches.filter((b) => b.id !== id));
            setDeletingId(null);

        }, 300);
    };

    const filteredBranches = branches.filter(
        (b) =>
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.city.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="bm-root">

            <div className="bm-card">

                {/* HEADER */}

                <div className="bm-header">

                    <div className="bm-header-top">

                        <div>

                            <p className="bm-eyebrow">Operations Dashboard</p>

                            <h1 className="bm-title">
                                Branch Management
                            </h1>

                        </div>

                        <div className="bm-stat-badge">

                            <span className="bm-stat-num">
                                {branches.length}
                            </span>

                            <span className="bm-stat-label">
                                Branches
                            </span>

                        </div>

                    </div>

                </div>

                {/* ADD BRANCH */}

                <div className="bm-form-row">

                    <input
                        className="bm-input"
                        type="text"
                        placeholder="Branch Name"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                    />

                    <input
                        className="bm-input"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <button
                        className="bm-add-btn"
                        onClick={addBranch}
                    >
                        Add Branch
                    </button>

                </div>

                {/* SEARCH */}

                <div className="bm-search-section">

                    <input
                        className="bm-search"
                        type="text"
                        placeholder="Search branch..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* TABLE */}

                <div className="bm-table">

                    {filteredBranches.length === 0 ? (

                        <div className="bm-empty">
                            No branches found
                        </div>

                    ) : (

                        filteredBranches.map((branch) => (

                            <div
                                key={branch.id}
                                className={`bm-row ${deletingId === branch.id ? "deleting" : ""
                                    }`}
                            >

                                <div className="bm-id">
                                    #{String(branch.id).slice(-4)}
                                </div>

                                <div className="bm-name">
                                    {branch.name}
                                </div>

                                <div className="bm-city">
                                    {branch.city}
                                </div>

                                <button
                                    className="bm-delete"
                                    onClick={() => deleteBranch(branch.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );
}