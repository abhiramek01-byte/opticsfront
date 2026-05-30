import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Period.css";

export default function Period() {
    const [periods, setPeriods] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        fromDate: "",
        toDate: "",
        isActive: true
    });

    useEffect(() => {
        fetchPeriods();
    }, []);

    const fetchPeriods = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/period");
            setPeriods(response.data);
            if (response.data.length > 0) {
                setFormData(formatDataForForm(response.data[0]));
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error("Error fetching periods", error);
        }
    };

    const formatDataForForm = (data) => {
        return {
            ...data,
            fromDate: data.fromDate ? data.fromDate.split('T')[0] : "",
            toDate: data.toDate ? data.toDate.split('T')[0] : ""
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = () => {
        if (currentIndex < periods.length - 1) {
            const nextIndex = currentIndex + 1;
            setFormData(formatDataForForm(periods[nextIndex]));
            setCurrentIndex(nextIndex);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setFormData(formatDataForForm(periods[prevIndex]));
            setCurrentIndex(prevIndex);
        }
    };

    const handleClear = () => {
        setFormData({
            id: null,
            code: "",
            name: "",
            fromDate: "",
            toDate: "",
            isActive: true
        });
    };

    const handleSave = async () => {
        try {
            if (formData.id) {
                await axios.patch(`${import.meta.env.VITE_API_URL}/period/${formData.id}`, formData);
                toast.success("Period updated successfully!");
            } else {
                await axios.post(import.meta.env.VITE_API_URL + "/period", formData);
                toast.success("Period saved successfully!");
            }
            fetchPeriods();
        } catch (error) {
            toast.error("Failed to save period.");
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!formData.id) return;
        if (window.confirm("Are you sure you want to delete this period?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/period/${formData.id}`);
                toast.success("Period deleted.");
                fetchPeriods();
            } catch (error) {
                toast.error("Failed to delete period.");
            }
        }
    };

    return (
        <div className="period-page">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Top Navigation */}
            <div className="period-topbar">
                <div className="nav-buttons">
                    <button onClick={handlePrev} disabled={currentIndex === 0 || periods.length === 0}>◀ Previous</button>
                    <button onClick={handleNext} disabled={currentIndex === periods.length - 1 || periods.length === 0}>Next ▶</button>
                    <button className="edit-btn" onClick={handleClear}>+ New</button>
                </div>

                <div className="action-buttons">
                    {formData.id && <button className="cancel" onClick={handleDelete}>Delete</button>}
                    <button className="clear" onClick={handleClear}>Clear</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>

            {/* Form Card */}
            <div className="period-card glass-panel">
                <h2 className="form-title">Financial Period Setup</h2>
                
                <div className="period-form">
                    <div className="form-group">
                        <label>Period Code</label>
                        <input 
                            type="text" 
                            name="code"
                            value={formData.code} 
                            onChange={handleInputChange}
                            placeholder="e.g. FY25-26" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Period Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Financial Year 2025-2026" 
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Valid From</label>
                            <input 
                                type="date" 
                                name="fromDate"
                                value={formData.fromDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Valid To</label>
                            <input 
                                type="date" 
                                name="toDate"
                                value={formData.toDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}