import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Tools.css";

export default function BulkMessage() {
    const [customers, setCustomers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:3000/customers");
                if (Array.isArray(res.data)) {
                    setCustomers(res.data);
                }
            } catch (err) {
                console.error("Error fetching customers", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(customers.map(c => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectCustomer = (e, id) => {
        if (e.target.checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        }
    };

    const handleClear = () => {
        setMessage("");
        setSelectedIds([]);
    };

    const handleSend = async () => {
        if (selectedIds.length === 0) {
            return alert("Please select at least one customer to message.");
        }
        if (!message.trim()) {
            return alert("Please type a message before sending.");
        }

        setSending(true);
        try {
            const payload = {
                customerIds: selectedIds,
                message: message
            };
            const res = await axios.post("http://localhost:3000/tools/bulk-message/send", payload);
            
            alert(`✅ ${res.data.message || 'Messages dispatched successfully!'}`);
            handleClear();
        } catch (err) {
            console.error(err);
            alert("❌ Failed to send bulk messages. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h2>Bulk Message Delivery</h2>
            </div>

            <div className="bulk-layout">
                <div className="customer-list">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                        <h4 style={{ margin: 0, color: "#475569", textTransform: "uppercase", fontSize: "14px" }}>
                            Select Recipients
                        </h4>
                        {customers.length > 0 && (
                            <label style={{ fontSize: "13px", fontWeight: "600", color: "#3b82f6", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.length === customers.length && customers.length > 0}
                                    onChange={handleSelectAll}
                                /> 
                                Select All
                            </label>
                        )}
                    </div>
                    
                    {loading ? (
                        <div className="loader-text">Loading directory...</div>
                    ) : customers.length === 0 ? (
                        <div className="loader-text">No customers found</div>
                    ) : (
                        <div>
                            {customers.map((c) => (
                                <label key={c.id} className="customer-item">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.includes(c.id)}
                                        onChange={(e) => handleSelectCustomer(e, c.id)}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: "600", color: "#334155", fontSize: "15px" }}>{c.name || 'Unknown User'}</div>
                                        <div style={{ color: "#64748b", fontSize: "13px" }}>{c.contactNumber || c.mobile || 'No Number provided'}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="message-box">
                    <h4 style={{ margin: "0 0 15px 0", color: "#475569", textTransform: "uppercase", fontSize: "14px" }}>
                        Message Composition
                    </h4>
                    
                    <textarea 
                        placeholder="Type your broadcast message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ flex: 1, minHeight: "200px" }}
                    ></textarea>
                    
                    <div className="char-counter">
                        {message.length} characters
                    </div>

                    <div className="bulk-buttons">
                        <span style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#3b82f6' }}>
                            {selectedIds.length} {selectedIds.length === 1 ? 'customer' : 'customers'} selected
                        </span>
                        <button onClick={handleClear} disabled={sending}>Clear</button>
                        <button className="send" onClick={handleSend} disabled={sending}>
                            {sending ? 'Sending...' : 'Send Broadcast'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}