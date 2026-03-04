import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        // Simulate auth (accept any non-empty credentials)
        setTimeout(() => {
            setLoading(false);
            onLogin();
            navigate("/dashboard/");
        }, 1200);
    };

    return (
        <div className="login-root">
            {/* Background blobs */}
            <div className="login-blob blob-1" />
            <div className="login-blob blob-2" />
            <div className="login-blob blob-3" />

            {/* Back to home */}
            <button className="back-home-btn" onClick={() => navigate("/")}>
                ← Back to Home
            </button>

            <div className="login-card">
                {/* Left panel */}
                <div className="login-left">
                    <div className="login-left-content">
                        <div className="login-logo">
                            <span>👁️</span> OpticsPro
                        </div>
                        <h2>Welcome Back!</h2>
                        <p>
                            Your all-in-one optics business management platform. Manage
                            inventory, sales, customers and more.
                        </p>

                        <div className="login-features">
                            {[
                                "📦 Real-time Inventory Tracking",
                                "💰 Sales & Revenue Analytics",
                                "👥 Customer Management",
                                "🚚 Order Tracking",
                            ].map((f) => (
                                <div className="login-feature-item" key={f}>
                                    <span className="lf-check">✓</span> {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* decorative circles */}
                    <div className="left-circle c1" />
                    <div className="left-circle c2" />
                </div>

                {/* Right panel - form */}
                <div className="login-right">
                    <div className="login-form-wrap">
                        <h2 className="login-title">Sign In</h2>
                        <p className="login-subtitle">Enter your credentials to continue</p>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="lf-group">
                                <label htmlFor="username">Username</label>
                                <div className="lf-input-wrap">
                                    <span className="lf-icon">👤</span>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={form.username}
                                        onChange={handleChange}
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="lf-group">
                                <label htmlFor="password">Password</label>
                                <div className="lf-input-wrap">
                                    <span className="lf-icon">🔒</span>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPass ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="lf-eye"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {error && <div className="lf-error">⚠️ {error}</div>}

                            <div className="lf-remember">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#" className="lf-forgot">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className={`lf-submit ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="lf-spinner" /> Signing in…
                                    </>
                                ) : (
                                    "Sign In →"
                                )}
                            </button>
                        </form>

                        <p className="login-hint">
                            🔐 Use any username &amp; password to demo login
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
