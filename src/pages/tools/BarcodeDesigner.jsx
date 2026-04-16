import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Tools.css";

export default function BarcodeDesigner() {

    const emptyRow = {
        startCharacter: "",
        description: "",
        type: "",
        encode: "",
        endCharacter: ""
    };

    const emptyForm = {
        name: "",
        encodedFormat: "",
        printer: "",
        fontSize: ""
    };

    const [savedBarcodes, setSavedBarcodes] = useState([]);
    const [selectedBarcodeId, setSelectedBarcodeId] = useState("");

    const [form, setForm] = useState({ ...emptyForm });
    const [rows, setRows] = useState([{ ...emptyRow }]);

    // Fetch existing barcodes
    const fetchBarcodes = async () => {
        try {
            const res = await axios.get("http://localhost:3000/barcode");
            setSavedBarcodes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBarcodes();
    }, []);

    // Handle existing selection load
    const handleSelectBarcode = async (e) => {
        const id = e.target.value;
        setSelectedBarcodeId(id);
        if (!id) {
            handleClear();
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3000/barcode/${id}`);
            const data = res.data;
            setForm({
                name: data.name || "",
                encodedFormat: data.encodedFormat || "",
                printer: data.printer || "",
                fontSize: data.fontSize || ""
            });
            if (data.rows && data.rows.length > 0) {
                setRows(data.rows);
            } else {
                setRows([{ ...emptyRow }]);
            }
        } catch (err) {
            console.error("Error loading barcode", err);
        }
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRowChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const addRow = () => {
        setRows([...rows, { ...emptyRow }]);
    };
    
    const removeRow = (index) => {
        if(rows.length > 1) {
            const updated = rows.filter((_, i) => i !== index);
            setRows(updated);
        }
    }

    const handleClear = () => {
        setForm({ ...emptyForm });
        setRows([{ ...emptyRow }]);
        setSelectedBarcodeId("");
    };

    const handleSave = async () => {
        if (!form.name) return alert("Please enter a name for the barcode format.");
        
        try {
            const payload = { ...form, rows };
            
            if (selectedBarcodeId) {
                await axios.put(`http://localhost:3000/barcode/${selectedBarcodeId}`, payload);
                alert("Barcode Format Updated ✅");
            } else {
                await axios.post("http://localhost:3000/barcode", payload);
                alert("New Barcode Format Saved ✅");
            }
            fetchBarcodes();
        } catch (err) {
            console.log(err);
            alert("Error saving ❌");
        }
    };

    const handleDelete = async () => {
        if (!selectedBarcodeId) return;
        if (window.confirm("Delete this barcode format?")) {
            try {
                await axios.delete(`http://localhost:3000/barcode/${selectedBarcodeId}`);
                alert("Barcode Format Deleted 🗑️");
                handleClear();
                fetchBarcodes();
            } catch (err) {
                console.error(err);
                alert("Error deleting barcode format");
            }
        }
    };

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h2>Barcode Designer</h2>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <label className="form-label" style={{ margin: 0 }}>Saved Layouts:</label>
                    <select 
                        style={{ width: "250px" }} 
                        value={selectedBarcodeId} 
                        onChange={handleSelectBarcode}
                    >
                        <option value="">-- Create New --</option>
                        {savedBarcodes.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="modern-card">
                <div className="form-grid">
                    <div className="input-group">
                        <label>Name / Identifier</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            placeholder="e.g. Standard Item Label"
                        />
                    </div>
                    <div className="input-group">
                        <label>Encoded Format</label>
                        <input
                            name="encodedFormat"
                            value={form.encodedFormat}
                            onChange={handleFormChange}
                            placeholder="e.g. Code128, EAN13"
                        />
                    </div>
                    <div className="input-group">
                        <label>Printer Name</label>
                        <input
                            name="printer"
                            value={form.printer}
                            onChange={handleFormChange}
                            placeholder="Network/Local Printer name"
                        />
                    </div>
                    <div className="input-group">
                        <label>Font Size</label>
                        <input
                            type="number"
                            name="fontSize"
                            value={form.fontSize}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fontSize: e.target.value === "" ? "" : Number(e.target.value)
                                })
                            }
                        />
                    </div>
                </div>

                <div className="barcode-table">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Start Char</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Encode Value</th>
                                <th>End Char</th>
                                <th style={{ width: '50px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            placeholder="e.g. ^"
                                            value={row.startCharacter}
                                            onChange={(e) => handleRowChange(index, "startCharacter", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            placeholder="Item details..."
                                            value={row.description}
                                            onChange={(e) => handleRowChange(index, "description", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            placeholder="Text/Barcode"
                                            value={row.type}
                                            onChange={(e) => handleRowChange(index, "type", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            placeholder="1234567..."
                                            value={row.encode}
                                            onChange={(e) => handleRowChange(index, "encode", e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            placeholder="e.g. $"
                                            value={row.endCharacter}
                                            onChange={(e) => handleRowChange(index, "endCharacter", e.target.value)}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {rows.length > 1 && (
                                            <button 
                                                className="delete" 
                                                style={{ padding: "6px 10px", fontSize: "16px", color: "#ef4444" }} 
                                                onClick={() => removeRow(index)}
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-row-btn" onClick={addRow}>
                        + Add Formatter Row
                    </button>
                </div>

                <div className="tool-buttons">
                    <button onClick={handleClear}>Clear / Reset</button>
                    {selectedBarcodeId && (
                        <button className="delete" onClick={handleDelete}>Delete Format</button>
                    )}
                    <button className="save" onClick={handleSave}>
                        {selectedBarcodeId ? 'Update Format' : 'Save Barcode'}
                    </button>
                </div>
            </div>
        </div>
    );
}