import { useState, useEffect } from "react";
import "../../styles/Report.css";

export default function AddressList() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const [customersRes, vendorsRes] = await Promise.all([
                    fetch(import.meta.env.VITE_API_URL + "/customers"),
                    fetch(import.meta.env.VITE_API_URL + "/vendors")
                ]);
                
                const customers = await customersRes.json();
                const vendors = await vendorsRes.json();
                
                const combined = [];
                
                if (Array.isArray(customers)) {
                    customers.forEach(c => {
                        combined.push({
                            id: `cust-${c.id}`,
                            name: c.name,
                            type: "Customer",
                            phone: c.phone || "N/A",
                            email: c.email || "N/A",
                            address: c.address || "N/A"
                        });
                    });
                }
                
                if (Array.isArray(vendors)) {
                    vendors.forEach(v => {
                        combined.push({
                            id: `vend-${v.id}`,
                            name: v.name,
                            type: "Vendor",
                            phone: v.phone || "N/A",
                            email: v.email || "N/A",
                            address: v.address || "N/A"
                        });
                    });
                }
                
                setAddresses(combined);
            } catch (err) {
                console.error("Failed to fetch address records", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <div className="report-page">

            <h2>Customer & Vendor Address List</h2>

            <div className="report-table">

                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>Loading records...</td>
                            </tr>
                        ) : addresses.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No records found.</td>
                            </tr>
                        ) : (
                            addresses.map(record => (
                                <tr key={record.id}>
                                    <td>{record.name}</td>
                                    <td><span className={record.type === "Customer" ? "tag-customer" : "tag-vendor"} style={{ fontWeight: "bold", color: record.type === "Customer" ? "#2196F3" : "#FF9800" }}>{record.type}</span></td>
                                    <td>{record.phone}</td>
                                    <td>{record.email}</td>
                                    <td>{record.address}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}