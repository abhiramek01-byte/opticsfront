import "../../styles/Tools.css";

export default function ToolsRegistration() {
    return (
        <div className="tool-page">

            <h2>Customer Registration</h2>

            <div className="registration-grid">

                <div className="form-card">

                    <label>Customer Name</label>
                    <input type="text" placeholder="Full name" />

                    <label>Address</label>
                    <textarea placeholder="Street, City"></textarea>

                    <label>Phone</label>
                    <input type="text" />

                    <label>Date of Birth</label>
                    <input type="date" />

                    <label>Gender</label>
                    <div className="radio-group">
                        <label><input type="radio" /> Male</label>
                        <label><input type="radio" /> Female</label>
                    </div>

                </div>

                <div className="notes-card">

                    <h4>Quick Notes</h4>

                    <textarea placeholder="Add medical history..."></textarea>

                </div>

            </div>

        </div>
    );
}