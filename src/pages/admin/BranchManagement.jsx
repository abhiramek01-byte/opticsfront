import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/BranchManagement.css";

export default function BranchManagement() {

    const [branches, setBranches] = useState([]);
    const [branchName, setBranchName] = useState("");
    const [city, setCity] = useState("");
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);

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
        if (!branchName || !city) return;

        const newBranch = { name: branchName, city };

        try {
            const res = await axios.post("http://localhost:3000/admin/branches", newBranch);
            setBranches([...branches, res.data]);
            setBranchName("");
            setCity("");
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
            b.city?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bm-root">
            <div className="bm-card">
                {/* HEADER */}
                <div className="bm-header">
                    <div className="bm-header-top">
                        <div>
                            <p className="bm-eyebrow">Operations Dashboard</p>
                            <h1 className="bm-title">Branch Management</h1>
                        </div>
                        <div className="bm-stat-badge">
                            <span className="bm-stat-num">{branches.length}</span>
                            <span className="bm-stat-label">Branches</span>
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
                    <button className="bm-add-btn" onClick={addBranch}>
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
                        <div className="bm-empty">No branches found</div>
                    ) : (
                        filteredBranches.map((branch) => (
                            <div
                                key={branch.id}
                                className={`bm-row ${deletingId === branch.id ? "deleting" : ""}`}
                            >
                                <div className="bm-id">#{String(branch.id).padStart(4, '0')}</div>
                                <div className="bm-name">{branch.name}</div>
                                <div className="bm-city">{branch.city}</div>
                                <button className="bm-delete" onClick={() => deleteBranch(branch.id)}>
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