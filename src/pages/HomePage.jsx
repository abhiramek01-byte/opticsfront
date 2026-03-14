import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

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

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth"
        });

    };

    return (

        <div className="home-root">

            {/* NAVBAR */}

            <nav className="home-nav">

                <div className="home-nav-logo">
                    <span className="logo-icon"></span> SPASH
                </div>

                <div className="home-nav-links">

                    <button onClick={() => navigate("/products")}>
                        Products
                    </button>

                    <button onClick={() => scrollToSection("stats")}>
                        Stats
                    </button>

                    <button onClick={() => navigate("/about")}>
                        About
                    </button>

                </div>

                <button
                    className="nav-login-btn"
                    onClick={() => navigate("/login")}
                >
                    Login →
                </button>

            </nav>


            {/* HERO */}

            <section className="hero-section">

                <div className="hero-glow glow-1" />
                <div className="hero-glow glow-2" />
                <div className="hero-glow glow-3" />

                <div className="hero-badge">
                    Optics Business Suite 2025
                </div>

                <h1 className="hero-title">

                    Run Your Optics <br />

                    <span className="hero-gradient">
                        Business Smarter
                    </span>

                </h1>

                <p className="hero-sub">

                    Complete  CRM  for optics shops — inventory, sales,
                    customers, vendors & analytics, all in one stunning dashboard.

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

            </section>


            <section id="features" className="features-section">

                <div className="communication-wrapper">

                    <div className="communication-left">

                        <div className="feature-icon">📩</div>

                        <h3>Customer Communication</h3>

                        <p className="feature-desc">
                            Send SMS or WhatsApp alerts to customers for order pickup,
                            eye testing reminders, and promotional offers.
                        </p>


                        <div className="feature-items">

                            <div className="feature-point">
                                <span>📱</span> Order Ready Notifications
                            </div>

                            <div className="feature-point">
                                <span>⏰</span> Eye Test Appointment Reminders
                            </div>

                            <div className="feature-point">
                                <span>🎁</span> Promotional Offers
                            </div>

                            <div className="feature-point">
                                <span>💬</span> WhatsApp Messaging
                            </div>

                        </div>


                        {/* Demo message box */}

                        <div className="demo-box">

                            <div className="demo-title">
                                Live Notification Preview
                            </div>

                            <div className="demo-message">
                                👋 Hello John!
                                Your eyewear order is ready for pickup at **SPASH Opticals**.
                                Visit us today between **10AM – 8PM**.
                            </div>

                        </div>

                    </div>



                    <div className="communication-right">

                        <img
                            src="https://images.unsplash.com/photo-1581091870622-1e7c7a9e9f7b?auto=format&fit=crop&w=800&q=80"
                            alt="Customer Messaging"
                        />

                    </div>

                </div>

            </section>


            {/* STATS */}

            <section id="stats" className="stats-band" ref={addRef}>

                {stats.map((s) => (

                    <div
                        className="stat-block fade-up"
                        key={s.label}
                        onClick={() =>
                            s.label === "Branches" && navigate("/branches")
                        }
                        style={{
                            cursor:
                                s.label === "Branches"
                                    ? "pointer"
                                    : "default"
                        }}
                    >

                        <h2>{s.value}</h2>
                        <p>{s.label}</p>

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


            {/* PRODUCTS */}

            <section id="products" className="products-section">

                <div className="products-wrapper">

                    <div className="products-left">

                        <div
                            className="section-header fade-up"
                            ref={addRef}
                        >

                            <span className="section-badge">
                                Products
                            </span>

                            <h2>
                                Our Optical Products
                            </h2>

                            <p>
                                Manage all your optical products easily
                            </p>

                        </div>


                        <div className="products-grid">

                            {[
                                {
                                    title: "Frames",
                                    stock: "120 in stock",
                                    size: "Medium / Large",
                                    img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    title: "Sunglasses",
                                    stock: "80 in stock",
                                    size: "Standard",
                                    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    title: "Contact Lens",
                                    stock: "150 boxes",
                                    size: "Daily / Monthly",
                                    img: "https://images.unsplash.com/photo-1588776814546-ec7e61a0c1b3?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    title: "Lens Types",
                                    stock: "200 lenses",
                                    size: "Single Vision / Progressive",
                                    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    title: "Lens Solutions",
                                    stock: "60 bottles",
                                    size: "100ml / 250ml",
                                    img: "https://images.unsplash.com/photo-1606813902755-5d1f7e7d0d7a?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    title: "Accessories",
                                    stock: "90 items",
                                    size: "Universal",
                                    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80"
                                }
                            ].map((p) => (

                                <div
                                    className="product-card"
                                    key={p.title}
                                    onClick={() =>
                                        alert(`${p.title} details page coming soon`)
                                    }
                                >

                                    <img
                                        src={p.img}
                                        alt={p.title}
                                        className="product-img"
                                    />

                                    <div className="product-content">

                                        <h3>{p.title}</h3>

                                        <p className="product-stock">
                                            Stock Available: {p.stock}
                                        </p>

                                        <p className="product-size">
                                            Size Options: {p.size}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


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


            {/* ABOUT */}

            <section id="about" className="about-section">

                <div
                    className="section-header fade-up"
                    ref={addRef}
                >

                    <span className="section-badge">
                        About
                    </span>

                    <h2>
                        About SPASH Optical ERP
                    </h2>

                </div>

                <div
                    className="about-content fade-up"
                    ref={addRef}
                >

                    <p>
                        SPASH is a complete ERP system designed specifically
                        for optical shops. It helps shop owners manage
                        inventory, products, customers, prescriptions,
                        vendors and sales analytics in one platform.
                    </p>

                    <p>
                        Whether you run a single optical store or multiple
                        branches, SPASH simplifies daily operations and
                        helps grow your business with powerful insights
                        and easy management tools.
                    </p>

                </div>

            </section>


            {/* CTA */}

            <section id="cta" className="cta-section fade-up" ref={addRef}>

                <div className="cta-glow" />

                <span className="section-badge">
                    Ready?
                </span>

                <h2>
                    Start Managing Your Optics Store Today
                </h2>

                <p>
                    Join hundreds of shops already using SPASH
                </p>

                <button
                    className="hero-btn-primary"
                    onClick={() => navigate("/login")}
                >
                    Login to Dashboard →
                </button>

            </section>


            {/* FOOTER */}

            <footer className="home-footer">
                <p>© 2025 SPASH · Built for optics businesses</p>
            </footer>

        </div>

    );

}