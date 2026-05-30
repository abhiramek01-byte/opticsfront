import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaStore, FaUserShield, FaSave, FaCity, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import "../../styles/BranchManagement.css";

export default function BranchRegister() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        branchName: "",
        city: "",
        managerName: "",
        managerEmail: "",
        managerPhone: "",
        managerPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.branchName.trim() || !form.city.trim()) {
            alert("Branch Name and City are required.");
            return;
        }

        // Backend checks data.managerName && data.managerEmail && data.managerPassword to create a manager.
        // If any manager info is entered, let's make sure they enter name, email, and password.
        const hasManagerInfo = form.managerName || form.managerEmail || form.managerPassword || form.managerPhone;
        if (hasManagerInfo && (!form.managerName || !form.managerEmail || !form.managerPassword)) {
            alert("To assign a manager, please fill in Manager Name, Email/Username, and Password.");
            return;
        }

        setLoading(true);
        const newBranch = {
            name: form.branchName,
            city: form.city,
            managerName: form.managerName,
            managerEmail: form.managerEmail,
            managerPhone: form.managerPhone,
            managerPassword: form.managerPassword
        };

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/admin/branches", newBranch);
            navigate("/admin/branches");
        } catch (error) {
            console.error("Failed to add branch", error);
            alert(error.response?.data?.message || "Failed to register branch. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bm-root">
            <div className="br-container">
                {/* Back Link */}
                <button className="br-back-btn" onClick={() => navigate("/admin/branches")}>
                    <FaArrowLeft size={12} />
                    <span>Back to Directory</span>
                </button>

                <div className="br-card">
                    {/* Header */}
                    <div className="br-header">
                        <div className="br-header-icon">
                            <FaStore size={24} />
                        </div>
                        <div>
                            <span className="br-eyebrow">Administration Console</span>
                            <h1 className="br-title">Register New Branch</h1>
                            <p className="br-subtitle">Establish a new retail location and configure its primary store manager.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="br-form">
                        {/* Section 1: Location */}
                        <div className="br-form-section">
                            <div className="br-section-title">
                                <FaCity className="sec-icon" />
                                <h3>Location Details</h3>
                            </div>
                            <div className="br-grid">
                                <div className="br-input-group">
                                    <label>Branch Name <span className="required">*</span></label>
                                    <div className="input-wrapper">
                                        <FaStore className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Downtown Plaza"
                                            value={form.branchName}
                                            onChange={(e) => setForm({ ...form, branchName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="br-input-group">
                                    <label>City <span className="required">*</span></label>
                                    <div className="input-wrapper">
                                        <FaCity className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="e.g. New York"
                                            value={form.city}
                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Manager Credentials */}
                        <div className="br-form-section">
                            <div className="br-section-title">
                                <FaUserShield className="sec-icon" />
                                <h3>Manager Credentials</h3>
                            </div>
                            <p className="section-desc">Create a manager user account associated with this branch. (Optional)</p>
                            <div className="br-grid">
                                <div className="br-input-group">
                                    <label>Manager Full Name</label>
                                    <div className="input-wrapper">
                                        <FaUser className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Manager Name"
                                            value={form.managerName}
                                            onChange={(e) => setForm({ ...form, managerName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="br-input-group">
                                    <label>Username / Email</label>
                                    <div className="input-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <input
                                            type="email"
                                            placeholder="email@example.com"
                                            value={form.managerEmail}
                                            onChange={(e) => setForm({ ...form, managerEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="br-input-group">
                                    <label>Manager Phone</label>
                                    <div className="input-wrapper">
                                        <FaPhone className="input-icon" />
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={form.managerPhone}
                                            onChange={(e) => setForm({ ...form, managerPhone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="br-input-group">
                                    <label>Manager Password</label>
                                    <div className="input-wrapper">
                                        <FaLock className="input-icon" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={form.managerPassword}
                                            onChange={(e) => setForm({ ...form, managerPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="br-actions">
                            <button
                                type="button"
                                className="br-btn-secondary"
                                onClick={() => navigate("/admin/branches")}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="br-btn-primary"
                                disabled={loading}
                            >
                                <FaSave />
                                <span>{loading ? "Registering..." : "Save & Register Branch"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
