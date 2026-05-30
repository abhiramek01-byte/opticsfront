import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Tools.css";

export default function BulkMessage() {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    // Active Dispatch Control Center state
    const [dispatchList, setDispatchList] = useState([]);
    const [dispatchedIds, setDispatchedIds] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/customers");
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

    const filteredCustomers = customers.filter(c => {
        const q = searchQuery.toLowerCase();
        return (
            (c.name || "").toLowerCase().includes(q) ||
            (c.mobile || "").toLowerCase().includes(q) ||
            (c.phone || "").toLowerCase().includes(q) ||
            (c.place || "").toLowerCase().includes(q)
        );
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredCustomers.map(c => c.id));
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
        setSearchQuery("");
        setDispatchList([]);
        setDispatchedIds([]);
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
            const res = await axios.post(import.meta.env.VITE_API_URL + "/tools/bulk-message/send", payload);
            
            // Build the dispatch list for actual WhatsApp/SMS execution
            const selectedCustomers = customers.filter(c => selectedIds.includes(c.id));
            setDispatchList(selectedCustomers);
            setDispatchedIds([]);

            alert(`✅ ${res.data.message || 'Broadcast registered in backend logs!'}\n\nNow use the 'Broadcast Dispatch Center' to send the message directly to their contact numbers via WhatsApp or SMS!`);
        } catch (err) {
            console.error(err);
            alert("❌ Failed to register bulk message broadcast. Please try again.");
        } finally {
            setSending(false);
        }
    };

    // Formats and cleans the contact number for WhatsApp click-to-chat
    const getWhatsAppLink = (mobileNumber, text) => {
        if (!mobileNumber) return "";
        let cleaned = mobileNumber.replace(/\D/g, "");
        // If it is a 10-digit Indian mobile number, prefix country code '91'
        if (cleaned.length === 10) {
            cleaned = "91" + cleaned;
        }
        return `https://api.whatsapp.com/send?phone=${cleaned}&text=${encodeURIComponent(text)}`;
    };

    // Formats and cleans the contact number for SMS trigger
    const getSMSLink = (mobileNumber, text) => {
        if (!mobileNumber) return "";
        let cleaned = mobileNumber.replace(/\D/g, "");
        return `sms:${cleaned}?body=${encodeURIComponent(text)}`;
    };

    const handleDispatchClick = (id) => {
        if (!dispatchedIds.includes(id)) {
            setDispatchedIds([...dispatchedIds, id]);
        }
    };

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h2>Bulk Message Delivery Center</h2>
            </div>

            <div className="bulk-layout">
                {/* LEFT COLUMN: Customer Selection */}
                <div className="customer-list" style={{ display: "flex", flexDirection: "column", height: "600px" }}>
                    <div style={{ marginBottom: "15px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                        <h4 style={{ margin: "0 0 10px 0", color: "#475569", textTransform: "uppercase", fontSize: "13px", fontWeight: "700" }}>
                            Select Recipients
                        </h4>
                        
                        {/* Search input */}
                        <input 
                            type="text" 
                            placeholder="🔍 Search name, phone, or place..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: "8px 12px", fontSize: "13px", marginBottom: "10px" }}
                        />

                        {filteredCustomers.length > 0 && (
                            <label style={{ fontSize: "13px", fontWeight: "600", color: "#3b82f6", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", marginTop: "5px" }}>
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.length === filteredCustomers.length && filteredCustomers.length > 0}
                                    onChange={handleSelectAll}
                                /> 
                                Select All Filtered ({filteredCustomers.length})
                            </label>
                        )}
                    </div>
                    
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {loading ? (
                            <div className="loader-text">Loading directory...</div>
                        ) : filteredCustomers.length === 0 ? (
                            <div className="loader-text">No matching customers found</div>
                        ) : (
                            <div>
                                {filteredCustomers.map((c) => (
                                    <label key={c.id} className="customer-item" style={{ display: "flex", padding: "10px 12px", borderBottom: "1px solid #f8fafc" }}>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(c.id)}
                                            onChange={(e) => handleSelectCustomer(e, c.id)}
                                            style={{ marginRight: "12px", width: "16px", height: "16px" }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: "600", color: "#334155", fontSize: "14px" }}>
                                                {c.name || 'Unknown User'} 
                                                {c.place && <span style={{ fontSize: "11px", color: "#94a3b8", marginLeft: "8px", fontWeight: "normal" }}>({c.place})</span>}
                                            </div>
                                            <div style={{ color: "#64748b", fontSize: "12px", display: "flex", gap: "10px" }}>
                                                <span>📱 {c.mobile || 'No Mobile'}</span>
                                                {c.phone && <span>📞 {c.phone}</span>}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Message composition and Dispatcher */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                    
                    {/* Message Box */}
                    <div className="message-box" style={{ flex: "none" }}>
                        <h4 style={{ margin: "0 0 15px 0", color: "#475569", textTransform: "uppercase", fontSize: "13px", fontWeight: "700" }}>
                            Message Composition
                        </h4>
                        
                        <textarea 
                            placeholder="Type your broadcast message here (e.g. 'Dear Customer, your spectacles order is ready for pickup!')..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ minHeight: "150px", fontSize: "14px", lineHeight: "1.5" }}
                        ></textarea>
                        
                        <div className="char-counter">
                            {message.length} characters
                        </div>
    
                        <div className="bulk-buttons">
                            <span style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', fontWeight: '700', color: '#3b82f6', fontSize: '13px' }}>
                                {selectedIds.length} {selectedIds.length === 1 ? 'customer' : 'customers'} selected
                            </span>
                            <button onClick={handleClear} disabled={sending || sending}>Clear</button>
                            <button className="send" onClick={handleSend} disabled={sending || selectedIds.length === 0 || !message.trim()}>
                                {sending ? 'Registering...' : 'Register Broadcast 🚀'}
                            </button>
                        </div>
                    </div>

                    {/* LIVE DISPATCH CONTROL CENTER (Renders after registering broadcast) */}
                    {dispatchList.length > 0 && (
                        <div className="modern-card" style={{ padding: "20px", display: "flex", flexDirection: "column", border: "1px solid #c2e7ff", backgroundColor: "#f0f8ff" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                <h4 style={{ margin: 0, color: "#1a73e8", textTransform: "uppercase", fontSize: "13px", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span>📢</span> Broadcast Dispatch Control Center
                                </h4>
                                <span style={{ fontSize: "12px", color: "#1e3a8a", backgroundColor: "#d0e8ff", padding: "3px 8px", borderRadius: "10px", fontWeight: "700" }}>
                                    {dispatchedIds.length} / {dispatchList.length} Sent
                                </span>
                            </div>

                            <p style={{ margin: "0 0 15px 0", fontSize: "12.5px", color: "#475569", lineHeight: "1.4" }}>
                                Click the buttons below to open the chat window and **instantly dispatch the pre-filled message** to each recipient's actual contact number.
                            </p>

                            <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid #d0e8ff", borderRadius: "10px", backgroundColor: "white" }}>
                                {dispatchList.map((c) => {
                                    const hasMobile = !!c.mobile;
                                    const formattedMobile = c.mobile || "";
                                    const waLink = getWhatsAppLink(formattedMobile, message);
                                    const smsLink = getSMSLink(formattedMobile, message);
                                    const isDispatched = dispatchedIds.includes(c.id);

                                    return (
                                        <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid #f1f5f9", opacity: isDispatched ? 0.7 : 1 }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                                <span style={{ fontSize: "13.5px", fontWeight: "700", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
                                                    {c.name}
                                                    {isDispatched && <span style={{ color: "#059669", fontSize: "11px", backgroundColor: "#d1fae5", padding: "1px 6px", borderRadius: "8px", fontWeight: "600" }}>Dispatched ✓</span>}
                                                </span>
                                                <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                                                    Number: {formattedMobile || "N/A"}
                                                </span>
                                            </div>

                                            <div style={{ display: "flex", gap: "8px" }}>
                                                {hasMobile ? (
                                                    <>
                                                        <a 
                                                            href={waLink} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            onClick={() => handleDispatchClick(c.id)}
                                                            style={{
                                                                textDecoration: "none",
                                                                backgroundColor: "#25d366",
                                                                color: "white",
                                                                fontSize: "12px",
                                                                fontWeight: "700",
                                                                padding: "6px 12px",
                                                                borderRadius: "6px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "5px",
                                                                transition: "all 0.2s"
                                                            }}
                                                            title="Send via WhatsApp Web/App"
                                                            className="dispatch-btn"
                                                        >
                                                            💬 WhatsApp
                                                        </a>
                                                        <a 
                                                            href={smsLink}
                                                            onClick={() => handleDispatchClick(c.id)}
                                                            style={{
                                                                textDecoration: "none",
                                                                backgroundColor: "#3b82f6",
                                                                color: "white",
                                                                fontSize: "12px",
                                                                fontWeight: "700",
                                                                padding: "6px 12px",
                                                                borderRadius: "6px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "5px",
                                                                transition: "all 0.2s"
                                                            }}
                                                            title="Send via Device SMS Protocol"
                                                            className="dispatch-btn"
                                                        >
                                                            📱 SMS
                                                        </a>
                                                    </>
                                                ) : (
                                                    <span style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>No Contact Number</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}