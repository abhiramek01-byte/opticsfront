import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginPage({ onLogin }) {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

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
            setError("Please fill all fields");
            return;
        }

        setLoading(true);

        setTimeout(() => {

            setLoading(false);

            let role = "";

            /* ROLE LOGIN */

            if (form.username === "admin" && form.password === "admin") {
                role = "admin";
            }
            else if (form.username === "spash" && form.password === "spash") {
                role = "manager";
            }
            else if (form.username === "staff" && form.password === "staff") {
                role = "staff";
            }
            else {
                setError("Invalid username or password");
                return;
            }

            /* SAVE LOGIN DATA */

            localStorage.setItem("role", role);
            localStorage.setItem("isLoggedIn", "true");

            onLogin();

            /* REDIRECT BASED ON ROLE */

            if (role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }

        }, 800);
    };

    return (
        <div className="login-root">

            <button
                className="back-home-btn"
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>

            <div className="login-card single">

                <div className="login-right">

                    <div className="login-form-wrap">

                        <h1 className="company-name">
                            SPASH EYE WEAR
                        </h1>

                        <h2 className="login-title">
                            Sign In
                        </h2>

                        <p className="login-subtitle">
                            Enter your credentials to continue
                        </p>

                        <form onSubmit={handleSubmit} className="login-form">

                            {/* USERNAME */}

                            <div className="lf-group">

                                <label>Username</label>

                                <div className="lf-input-wrap">

                                    <span className="lf-icon">👤</span>

                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={form.username}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}

                            <div className="lf-group">

                                <label>Password</label>

                                <div className="lf-input-wrap">

                                    <span className="lf-icon">🔒</span>

                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
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

                            {error && (
                                <div className="lf-error">
                                    {error}
                                </div>
                            )}

                            {/* REMEMBER */}

                            <div className="lf-remember">

                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>

                                <a href="#" className="lf-forgot">
                                    Forgot password?
                                </a>

                            </div>

                            {/* LOGIN BUTTON */}

                            <button
                                type="submit"
                                className="lf-submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In →"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}