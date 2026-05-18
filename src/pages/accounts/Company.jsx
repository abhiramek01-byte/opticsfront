import { useEffect } from "react";
import "../../styles/Company.css";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import { 
    FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, 
    FaIdCard, FaSave, FaEraser, FaChevronLeft, FaChevronRight, FaEdit 
} from "react-icons/fa";

export default function Company() {
    const {
        items,
        currentIndex,
        formData,
        setFormData,
        handleNext,
        handlePrevious,
        handleClear,
        handleEdit,
        handleSave,
        isFirst,
        isLast,
        isViewing,
        isEditMode
    } = useMasterNavigation("company", { 
        code: "COMP-001", 
        name: "", 
        address: "", 
        phone: "", 
        email: "", 
        accountId: "" 
    });

    // Auto-generate Company Code on new entry
    useEffect(() => {
        if (currentIndex === -1) {
            let nextCode = "COMP-001";
            if (items && items.length > 0) {
                const maxCodeNum = items.reduce((max, item) => {
                    const codeToCheck = item.code;
                    if (codeToCheck && codeToCheck.startsWith("COMP-")) {
                        const num = parseInt(codeToCheck.substring(5), 10);
                        if (!isNaN(num) && num > max) return num;
                    }
                    if (item.id && item.id > max) return item.id;
                    return max;
                }, 0);
                const nextNum = maxCodeNum + 1;
                nextCode = "COMP-" + nextNum.toString().padStart(3, "0");
            }
            if (formData.code !== nextCode) {
                setFormData(prev => ({ ...prev, code: nextCode }));
            }
        }
    }, [items, currentIndex, formData.code, setFormData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <div className="company-page">
            <div className="company-topbar">
                <h2 className="page-title">
                    <FaBuilding /> Company Management
                </h2>
                <div className="header-buttons">
                    <button className="btn-outline" onClick={handlePrevious} disabled={isFirst}>
                        <FaChevronLeft /> Prev
                    </button>
                    <button className="btn-outline" onClick={handleNext} disabled={isLast}>
                        Next <FaChevronRight />
                    </button>
                    <button className="btn-secondary" onClick={handleEdit} disabled={!isViewing}>
                        <FaEdit /> Edit
                    </button>
                    <button className="btn-outline cancel-btn" onClick={handleClear}>
                        <FaEraser /> Clear
                    </button>
                    <button className="btn-primary save-btn" onClick={handleSave} disabled={isViewing}>
                        {isEditMode ? <><FaSave /> Update</> : <><FaSave /> Save</>}
                    </button>
                </div>
            </div>

            <div className="glass-panel company-card">
                <div className="panel-header">
                    <FaBuilding /> Company Details
                </div>
                
                <div className="form-grid-2col">
                    <div className="form-column">
                        <div className="input-group">
                            <label><FaIdCard /> Company Code</label>
                            <input 
                                className="modern-input" 
                                name="code"
                                value={formData.code || ''}
                                type="text" 
                                placeholder="e.g. COMP-001" 
                                disabled={isViewing} 
                                readOnly
                            />
                        </div>

                        <div className="input-group">
                            <label><FaBuilding /> Company Name</label>
                            <input 
                                className="modern-input" 
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                type="text" 
                                placeholder="Enter Company Name" 
                                disabled={isViewing} 
                            />
                        </div>

                        <div className="input-group">
                            <label><FaMapMarkerAlt /> Address</label>
                            <textarea 
                                className="modern-input" 
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                rows="3" 
                                placeholder="Enter Full Address" 
                                disabled={isViewing}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="input-group">
                            <label><FaPhone /> Phone</label>
                            <input 
                                className="modern-input" 
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                type="text" 
                                placeholder="Contact Number" 
                                disabled={isViewing} 
                            />
                        </div>

                        <div className="input-group">
                            <label><FaEnvelope /> Email</label>
                            <input 
                                className="modern-input" 
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                type="email" 
                                placeholder="Email Address" 
                                disabled={isViewing} 
                            />
                        </div>

                        <div className="input-group">
                            <label>Default Account</label>
                            <select 
                                className="modern-select" 
                                name="accountId"
                                value={formData.accountId || ''}
                                onChange={handleChange}
                                disabled={isViewing}
                            >
                                <option value="">Select Default Account</option>
                                <option value="1">Account 1</option>
                                <option value="2">Account 2</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}