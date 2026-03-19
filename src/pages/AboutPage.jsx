import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function AboutPage() {

    const navigate = useNavigate();

    return (
        <div className="about-page">

            <h1 className="about-title">About SPASH Optical Shop</h1>

            {/* SHOP DETAILS */}

            <div className="about-card">

                <h2>🏪 Shop Details</h2>

                <p><strong>Main Branch:</strong> SPASH Opticals</p>

                <p><strong>Location:</strong> SM Street, Kozhikode</p>

                <p><strong>Contact:</strong> +91 98765 43210</p>

                <p><strong>Established:</strong> 2018</p>

                <p className="shop-note">
                    SPASH Opticals is a trusted eyewear destination in Kozhikode,
                    providing premium frames, advanced lenses and professional eye care.
                    Our mission is to deliver quality vision solutions and modern optical services.
                </p>

            </div>


            {/* BRANCH DETAILS */}

            <div className="about-card">

                <h2>🏢 Branch Details (Kozhikode)</h2>

                <ul className="branch-list">

                    <li>
                        <strong>SM Street Branch</strong><br />
                        Location: SM Street, Kozhikode<br />
                        Contact: +91 98765 43210
                    </li>

                    <li>
                        <strong>Mavoor Road Branch</strong><br />
                        Location: Mavoor Road, Kozhikode<br />
                        Contact: +91 98765 43211
                    </li>

                    <li>
                        <strong>Hilite Mall Branch</strong><br />
                        Location: Hilite Mall, Kozhikode<br />
                        Contact: +91 98765 43212
                    </li>

                    <li>
                        <strong>Ramanattukara Branch</strong><br />
                        Location: Ramanattukara, Kozhikode<br />
                        Contact: +91 98765 43213
                    </li>

                </ul>

            </div>


            {/* BACK BUTTON */}

            <button
                className="back-home-btn"
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>

        </div>
    );
}