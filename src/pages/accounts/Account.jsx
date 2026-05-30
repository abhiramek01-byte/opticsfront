import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Account.css";

export default function Account() {
    const [accounts, setAccounts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        subGroup: "",
        under: "",
        openingBalance: 0,
        obType: ""
    });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/account");
            setAccounts(response.data);
            if (response.data.length > 0) {
                setFormData(response.data[0]);
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error("Error fetching accounts", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = () => {
        if (currentIndex < accounts.length - 1) {
            const nextIndex = currentIndex + 1;
            setFormData(accounts[nextIndex]);
            setCurrentIndex(nextIndex);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setFormData(accounts[prevIndex]);
            setCurrentIndex(prevIndex);
        }
    };

    const handleClear = () => {
        setFormData({
            id: null,
            code: "",
            name: "",
            subGroup: "",
            under: "",
            openingBalance: 0,
            obType: ""
        });
    };

    const handleSave = async () => {
        try {
            if (formData.id) {
                await axios.patch(`${import.meta.env.VITE_API_URL}/account/${formData.id}`, formData);
                toast.success("Account updated successfully!");
            } else {
                await axios.post(import.meta.env.VITE_API_URL + "/account", formData);
                toast.success("Account saved successfully!");
            }
            fetchAccounts();
        } catch (error) {
            toast.error("Failed to save account.");
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!formData.id) return;
        if (window.confirm("Are you sure you want to delete this account?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/account/${formData.id}`);
                toast.success("Account deleted.");
                fetchAccounts();
            } catch (error) {
                toast.error("Failed to delete account.");
            }
        }
    };

    return (
        <div className="account-page">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Top Navigation */}
            <div className="account-topbar">
                <div className="nav-buttons">
                    <button onClick={handlePrev} disabled={currentIndex === 0 || accounts.length === 0}>◀ Previous</button>
                    <button onClick={handleNext} disabled={currentIndex === accounts.length - 1 || accounts.length === 0}>Next ▶</button>
                    <button className="edit-btn" onClick={handleClear}>+ New</button>
                </div>

                <div className="action-buttons">
                    {formData.id && <button className="cancel" onClick={handleDelete}>Delete</button>}
                    <button className="clear" onClick={handleClear}>Clear</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>

            {/* Form Card */}
            <div className="account-card glass-panel">
                <h2 className="form-title">Chart of Accounts - Setup</h2>

                <div className="account-form">
                    <div className="form-group">
                        <label>Account Code</label>
                        <input 
                            type="text" 
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="e.g. VD0000089" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Cash in Hand"
                        />
                    </div>

                    <div className="form-group">
                        <label>Sub Group</label>
                        <select name="subGroup" value={formData.subGroup} onChange={handleInputChange}>
                            <option value="">Select Sub Group</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Customer">Customer</option>
                            <option value="Bank">Bank Account</option>
                            <option value="Cash">Cash Account</option>
                            <option value="Direct Expense">Direct Expense</option>
                            <option value="Indirect Expense">Indirect Expense</option>
                            <option value="Direct Income">Direct Income</option>
                            <option value="Indirect Income">Indirect Income</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Under Group</label>
                        <input 
                            type="text" 
                            name="under"
                            value={formData.under}
                            onChange={handleInputChange}
                            placeholder="Parent Account (Optional)"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Opening Balance Amount</label>
                            <input 
                                type="number" 
                                name="openingBalance"
                                value={formData.openingBalance}
                                onChange={handleInputChange}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="form-group">
                            <label>OB Flow</label>
                            <select name="obType" value={formData.obType} onChange={handleInputChange}>
                                <option value="">Select Flow</option>
                                <option value="Debit">Debit (Dr)</option>
                                <option value="Credit">Credit (Cr)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account List Dashboard Area */}
            <div className="account-list-container glass-panel">
                <h3 className="list-title">Chart of Accounts Dashboard</h3>
                <div className="table-responsive">
                    <table className="account-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Sub Group</th>
                                <th>Under</th>
                                <th>Opening Balance</th>
                                <th>OB Flow</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.length > 0 ? (
                                accounts.map((acc, index) => (
                                    <tr 
                                        key={acc.id || index} 
                                        className={currentIndex === index ? "active-row" : ""}
                                        onClick={() => {
                                            setFormData(acc);
                                            setCurrentIndex(index);
                                        }}
                                    >
                                        <td>{acc.code}</td>
                                        <td>{acc.name}</td>
                                        <td>{acc.subGroup}</td>
                                        <td>{acc.under || '-'}</td>
                                        <td>{acc.openingBalance}</td>
                                        <td>{acc.obType}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No accounts found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}