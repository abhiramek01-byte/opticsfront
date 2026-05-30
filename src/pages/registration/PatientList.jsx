import { useEffect, useState } from "react";
import axios from "axios";
import { 
    FaUserPlus, FaSearch, FaPhone, FaMapMarkerAlt, FaEnvelope, 
    FaGlasses, FaStethoscope, FaStickyNote, FaCalendarAlt, 
    FaFileCsv, FaEye, FaTimes, FaUser, FaIdCard, FaClipboardList 
} from "react-icons/fa";
import "../../styles/PatientList.css";

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const [eyeTests, setEyeTests] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [search, setSearch] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedLens, setSelectedLens] = useState("");
    
    // Modal
    const [activeModalPatient, setActiveModalPatient] = useState(null);
    const [activeTab, setActiveTab] = useState("general"); // "general" or "prescription"

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const patientsRes = await axios.get(import.meta.env.VITE_API_URL + "/patient");
                setPatients(patientsRes.data || []);
                
                const eyeTestsRes = await axios.get(import.meta.env.VITE_API_URL + "/eye-testing");
                setEyeTests(eyeTestsRes.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter patients
    const filteredPatients = patients.filter(p => {
        const matchesSearch = 
            (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (p.cardNo || "").toLowerCase().includes(search.toLowerCase()) ||
            (p.mobile || "").toLowerCase().includes(search.toLowerCase()) ||
            (p.phone || "").toLowerCase().includes(search.toLowerCase()) ||
            (p.email || "").toLowerCase().includes(search.toLowerCase());
            
        const matchesDoctor = selectedDoctor === "" || p.doctor === selectedDoctor;
        const matchesLens = selectedLens === "" || (p.lensType || "").toLowerCase().includes(selectedLens.toLowerCase());
        
        return matchesSearch && matchesDoctor && matchesLens;
    });

    // Unique doctors & lens types for filters
    const uniqueDoctors = [...new Set(patients.map(p => p.doctor).filter(Boolean))];
    const uniqueLenses = [...new Set(patients.map(p => p.lensType).filter(Boolean))];

    // Export CSV
    const handleExportCSV = () => {
        if (filteredPatients.length === 0) {
            alert("No data available to export.");
            return;
        }

        const headers = ["Card No", "Name", "Mobile", "Phone", "Email", "Assigned Doctor", "Lens Type", "Address", "Remarks"];
        const csvRows = [
            headers.join(","),
            ...filteredPatients.map(p => {
                const formatValue = (val) => {
                    if (val === null || val === undefined) return '""';
                    const str = String(val).replace(/"/g, '""');
                    return `"${str}"`;
                };
                return [
                    formatValue(p.cardNo),
                    formatValue(p.name),
                    formatValue(p.mobile),
                    formatValue(p.phone),
                    formatValue(p.email),
                    formatValue(p.doctor),
                    formatValue(p.lensType),
                    formatValue(p.address),
                    formatValue(p.remark)
                ].join(",");
            })
        ];

        const csvContent = "\uFEFF" + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Patient_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getPatientEyeTests = (patientId) => {
        return eyeTests.filter(t => t.patient?.id === patientId || t.patientId === patientId);
    };

    const openDetailsModal = (patient) => {
        setActiveModalPatient(patient);
        setActiveTab("general");
    };

    const closeDetailsModal = () => {
        setActiveModalPatient(null);
    };

    return (
        <div className="registration-page">
            {/* Header */}
            <div className="registration-topbar">
                <h2 className="page-title">
                    <FaUser /> Registered Patients Directory
                </h2>
                <div className="action-buttons">
                    <button className="action-btn clear" onClick={handleExportCSV}>
                        <FaFileCsv /> Export CSV
                    </button>
                    <button className="action-btn save" onClick={() => window.location.href = '/dashboard/patient-registration'}>
                        <FaUserPlus /> Register Patient
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            <div className="glass-panel filter-panel">
                <div className="filter-grid">
                    <div className="search-box-container">
                        <FaSearch className="search-icon-inside" />
                        <input 
                            type="text" 
                            className="modern-input search-input" 
                            placeholder="Search by Name, Card No, Mobile, Email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <select 
                            className="modern-select"
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                        >
                            <option value="">All Doctors</option>
                            {uniqueDoctors.map((doc, idx) => (
                                <option key={idx} value={doc}>{doc}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select 
                            className="modern-select"
                            value={selectedLens}
                            onChange={(e) => setSelectedLens(e.target.value)}
                        >
                            <option value="">All Lens Types</option>
                            {uniqueLenses.map((lens, idx) => (
                                <option key={idx} value={lens}>{lens}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Patients Table */}
            <div className="glass-panel table-container-panel">
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading patient directory...</p>
                    </div>
                ) : filteredPatients.length > 0 ? (
                    <div className="table-responsive">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Card No</th>
                                    <th>Patient Name</th>
                                    <th>Mobile / Phone</th>
                                    <th>Assigned Doctor</th>
                                    <th>Lens Type</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((p) => {
                                    const patientTests = getPatientEyeTests(p.id);
                                    return (
                                        <tr key={p.id}>
                                            <td className="font-semibold text-slate-700">{p.cardNo || "—"}</td>
                                            <td className="patient-name-cell">
                                                <div className="patient-avatar">
                                                    {p.name ? p.name.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <div>
                                                    <span className="name">{p.name}</span>
                                                    {p.email && <span className="email">{p.email}</span>}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-details">
                                                    <span>{p.mobile || "—"}</span>
                                                    {p.phone && <span className="phone-sub">{p.phone}</span>}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="doctor-badge">
                                                    <FaStethoscope className="icon-mr" />
                                                    {p.doctor || "Unassigned"}
                                                </span>
                                            </td>
                                            <td>
                                                {p.lensType ? (
                                                    <span className="lens-badge">
                                                        <FaGlasses className="icon-mr" />
                                                        {p.lensType}
                                                    </span>
                                                ) : "—"}
                                            </td>
                                            <td className="address-cell" title={p.address}>
                                                {p.address || "—"}
                                            </td>
                                            <td>
                                                <button 
                                                    className="view-btn" 
                                                    onClick={() => openDetailsModal(p)}
                                                >
                                                    <FaEye /> View Data
                                                    {patientTests.length > 0 && (
                                                        <span className="test-count-pill">{patientTests.length}</span>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <FaUser size={48} className="empty-icon" />
                        <h3>No patients found</h3>
                        <p>No records match your filters or the directory is empty.</p>
                        <button className="action-btn save mt-4" onClick={() => window.location.href = '/dashboard/patient-registration'}>
                            Register New Patient
                        </button>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {activeModalPatient && (() => {
                const patientTests = getPatientEyeTests(activeModalPatient.id);
                return (
                    <div className="modal-overlay" onClick={closeDetailsModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-title-wrap">
                                    <div className="patient-avatar large">
                                        {activeModalPatient.name ? activeModalPatient.name.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <div>
                                        <h3>{activeModalPatient.name}</h3>
                                        <span className="card-badge-large">Card No: {activeModalPatient.cardNo || "—"}</span>
                                    </div>
                                </div>
                                <button className="close-modal-btn" onClick={closeDetailsModal}>
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Modal Navigation Tabs */}
                            <div className="modal-tabs">
                                <button 
                                    className={`modal-tab ${activeTab === "general" ? "active" : ""}`}
                                    onClick={() => setActiveTab("general")}
                                >
                                    <FaUser className="icon-mr" /> Personal Details
                                </button>
                                <button 
                                    className={`modal-tab ${activeTab === "prescription" ? "active" : ""}`}
                                    onClick={() => setActiveTab("prescription")}
                                >
                                    <FaClipboardList className="icon-mr" /> Eye Testing & Prescriptions
                                    {patientTests.length > 0 && (
                                        <span className="modal-tab-badge">{patientTests.length}</span>
                                    )}
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body">
                                {activeTab === "general" && (
                                    <div className="general-details-grid">
                                        <div className="detail-item">
                                            <label><FaIdCard /> Card Number</label>
                                            <p>{activeModalPatient.cardNo || "—"}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaUser /> Name</label>
                                            <p>{activeModalPatient.name || "—"}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaMapMarkerAlt /> Address</label>
                                            <p className="address-p">{activeModalPatient.address || "—"}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaPhone /> Contact Information</label>
                                            <p>Mobile: {activeModalPatient.mobile || "—"}</p>
                                            {activeModalPatient.phone && <p>Phone: {activeModalPatient.phone}</p>}
                                        </div>
                                        <div className="detail-item">
                                            <label><FaEnvelope /> Email Address</label>
                                            <p>{activeModalPatient.email || "—"}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaGlasses /> Lens Recommendation</label>
                                            <p>{activeModalPatient.lensType || "—"}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaStethoscope /> Assigned Practitioner</label>
                                            <p>{activeModalPatient.doctor || "—"}</p>
                                        </div>
                                        <div className="detail-item full-width">
                                            <label><FaStickyNote /> Medical & Registration Remarks</label>
                                            <p className="remark-p">{activeModalPatient.remark || "No remarks added."}</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "prescription" && (
                                    <div className="prescription-history-container">
                                        {patientTests.length > 0 ? (
                                            <div className="history-timeline">
                                                {patientTests.map((test, index) => (
                                                    <div className="timeline-item" key={test.id || index}>
                                                        <div className="timeline-meta">
                                                            <span className="test-date">
                                                                <FaCalendarAlt className="icon-mr" />
                                                                {test.date || "Date Unspecified"}
                                                            </span>
                                                            <span className="test-examiner">
                                                                <FaStethoscope className="icon-mr" />
                                                                Dr. {test.doctor || "Unspecified"}
                                                            </span>
                                                        </div>

                                                        <div className="prescription-display-grid">
                                                            {/* Right Eye */}
                                                            <div className="prescription-eye-card right">
                                                                <h5>Right Eye (OD)</h5>
                                                                <div className="prescription-values">
                                                                    <div>
                                                                        <span className="lbl">SPH</span>
                                                                        <span className="val">{test.rightSphere || "—"}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="lbl">CYL</span>
                                                                        <span className="val">{test.rightCylinder || "—"}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="lbl">AXIS</span>
                                                                        <span className="val">{test.rightAxis ? test.rightAxis + "°" : "—"}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Left Eye */}
                                                            <div className="prescription-eye-card left">
                                                                <h5>Left Eye (OS)</h5>
                                                                <div className="prescription-values">
                                                                    <div>
                                                                        <span className="lbl">SPH</span>
                                                                        <span className="val">{test.leftSphere || "—"}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="lbl">CYL</span>
                                                                        <span className="val">{test.leftCylinder || "—"}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="lbl">AXIS</span>
                                                                        <span className="val">{test.leftAxis ? test.leftAxis + "°" : "—"}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {test.remark && (
                                                            <div className="test-remark">
                                                                <FaStickyNote className="icon-mr" />
                                                                <span><strong>Observations:</strong> {test.remark}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="empty-state">
                                                <FaEye size={40} className="empty-icon" />
                                                <h4>No Eye Testing Records</h4>
                                                <p>This patient hasn't undergone eye testing yet.</p>
                                                <button 
                                                    className="action-btn save mt-3"
                                                    onClick={() => window.location.href = `/dashboard/eye-testing?patientId=${activeModalPatient.id}`}
                                                >
                                                    Perform Eye Test Now
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
