import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const features = [
    {
        icon: "📦",
        title: "Inventory Management",
        desc: "Track stock levels, set low-stock alerts, and manage your entire product catalog in real-time.",
    },
    {
        icon: "💰",
        title: "Sales & Revenue",
        desc: "Monitor daily sales, revenue trends, and generate insightful reports at a glance.",
    },
    {
        icon: "🚚",
        title: "Order Tracking",
        desc: "Follow every order from placement to delivery with live status updates and history.",
    },
    {
        icon: "👥",
        title: "Customer Management",
        desc: "Maintain a complete customer database with purchase history and contact details.",
    },
    {
        icon: "🏭",
        title: "Vendor Control",
        desc: "Manage supplier relationships, pricing, and procurement all in one place.",
    },
    {
        icon: "📊",
        title: "Analytics Dashboard",
        desc: "Visual charts and KPIs to make data-driven decisions with confidence.",
    },
];

const stats = [
    { value: "10K+", label: "Products Managed" },
    { value: "500+", label: "Happy Clients" },
    { value: "15+", label: "Branches", link: "/branches" },
    { value: "24/7", label: "Support Available" },
];

export default function HomePage() {
    const navigate = useNavigate();
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.15 }
        );

        sectionsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const addRef = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="home-root">
            {/* ── NAVBAR ── */}
            <nav className="home-nav">
                <div className="home-nav-logo">
                    <span className="logo-icon"></span> OCRM
                </div>
                <div className="home-nav-links">
                    <button onClick={() => scrollToSection("products")}>Products</button>
                    <button onClick={() => scrollToSection("stats")}>Stats</button>
                    <button onClick={() => scrollToSection("cta")}>About</button>
                </div>
                <button className="nav-login-btn" onClick={() => navigate("/login")}>
                    Login →
                </button>
            </nav>

            {/* ── HERO ── */}
            <section className="hero-section">
                <div className="hero-glow glow-1" />
                <div className="hero-glow glow-2" />
                <div className="hero-glow glow-3" />

                <div className="hero-badge"> Optics Business Suite 2025</div>
                <h1 className="hero-title">
                    Run Your Optics <br />
                    <span className="hero-gradient">Business Smarter</span>
                </h1>
                <p className="hero-sub">
                    Complete ERP for optics shops — inventory, sales, customers, vendors
                    &amp; analytics, all in one stunning dashboard.
                </p>
                <div className="hero-actions">
                    <button
                        className="hero-btn-primary"
                        onClick={() => navigate("/login")}
                    >
                        Get Started Free
                    </button>
                    <button
                        className="hero-btn-ghost"
                        onClick={() => scrollToSection("features")}
                    >
                        Explore Features ↓
                    </button>
                </div>

                {/* floating cards */}

            </section>

            {/* ── STATS BAND ── */}
            <section id="stats" className="stats-band" ref={addRef}>
                {stats.map((s) => (
                    <div
                        className="stat-block fade-up"
                        key={s.label}
                        onClick={() => s.label === "Branches" && navigate("/branches")}
                        style={{ cursor: s.label === "Branches" ? "pointer" : "default" }}
                    >
                        <h2>{s.value}</h2>
                        <p>{s.label}</p>

                        {/* Branch Images */}
                        {s.label === "Branches" && (
                            <div className="branch-images">
                                <img src="/branch1.jpg" alt="Branch 1" />
                                <img src="/branch2.jpg" alt="Branch 2" />
                                <img src="/branch3.jpg" alt="Branch 3" />
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* ── FEATURES ── */}
            <section id="products" className="products-section">

                <div className="products-wrapper">

                    {/* LEFT SIDE - PRODUCTS */}
                    <div className="products-left">
                        <div className="section-header fade-up" ref={addRef}>
                            <span className="section-badge">Products</span>
                            <h2>Our Optical Products</h2>
                            <p>Explore our best eyewear collections</p>
                        </div>

                        <div className="products-grid">
                            {[
                                "Eyeglasses",
                                "Sunglasses",
                                "Contact Lens",
                                "Lens Solutions",
                                "Frames",
                                "Accessories"
                            ].map((p) => (
                                <div className="product-card" key={p}>
                                    <h3>{p}</h3>
                                    <p>High quality optical product</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE - TOP SELLING */}
                    <div className="top-selling">

                        <h3>🔥 Top Selling Products</h3>

                        <ul>
                            <li>RayBan Classic Frame</li>
                            <li>Blue Cut Computer Lens</li>
                            <li>Premium Sunglasses</li>
                            <li>Daily Contact Lens</li>
                            <li>Anti Glare Lens</li>
                        </ul>

                    </div>

                </div>

            </section>
            {/* ── HOW IT WORKS ── */}
            <section className="how-section">
                <div className="section-header fade-up" ref={addRef}>
                    <span className="section-badge">Branch</span>
                    <h2>Get Started in 3 Simple Steps</h2>
                </div>
                <div className="steps-row">
                    {[
                        {
                            n: "01",
                            title: "Login Securely",
                            desc: "Branch 1",
                        },
                        {
                            n: "02",
                            title: "Set Up Your Store",
                            desc: "Branch 2",
                        },
                        {
                            n: "03",
                            title: "Track & Grow",
                            desc: "Branch 3",
                        },
                    ].map((step) => (
                        <div className="step-card fade-up" ref={addRef} key={step.n}>
                            <div className="step-num">{step.n}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section id="cta" className="cta-section fade-up" ref={addRef}>
                <div className="cta-glow" />
                <span className="section-badge">Ready?</span>
                <h2>Start Managing Your Optics Store Today</h2>
                <p>Join hundreds of shops already using OCRM</p>
                <button className="hero-btn-primary" onClick={() => navigate("/login")}>
                    Login to Dashboard →
                </button>
            </section>

            {/* ── FOOTER ── */}
            <footer className="home-footer">
                <p>© 2025 OCRM · Built for optics businesses</p>
            </footer>
        </div>
    );
}
