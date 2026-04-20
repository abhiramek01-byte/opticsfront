import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Billing.css";

const Billing = () => {
    const { id } = useParams(); // ✅ get ID from URL
    const navigate = useNavigate();

    const [sale, setSale] = useState(null);
    const [salesList, setSalesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        if (id) {
            axios
                .get(`http://localhost:3000/sales/${id}`)
                .then((res) => {
                    setSale(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to fetch sale details.");
                    setLoading(false);
                });
        } else {
            axios
                .get(`http://localhost:3000/sales`)
                .then((res) => {
                    setSalesList(Array.isArray(res.data) ? res.data : []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to fetch sales list.");
                    setLoading(false);
                });
        }
    }, [id]);

    const handlePrint = () => window.print();

    const goBack = () => {
        if (id) {
            navigate("/dashboard/billing");
        } else {
            navigate("/dashboard/sales");
        }
    };

    if (loading) return <div className="billing-message">Loading...</div>;

    if (error) {
        return (
            <div className="billing-message error">
                <p>{error}</p>
                <button onClick={() => navigate("/dashboard/sales")}>Go Back</button>
            </div>
        );
    }

    // LIST MODE (No ID)
    if (!id) {
        return (
            <div className="invoice-container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2>All Invoices</h2>
                    <button onClick={() => navigate("/dashboard/sales")}>+ New Sale</button>
                </div>
                
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Payment</th>
                            <th>Net Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesList.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No invoices found.</td>
                            </tr>
                        ) : (
                            salesList.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.invoiceNo}</td>
                                    <td>{new Date(s.saleDate).toLocaleDateString()}</td>
                                    <td>{s.customer ? s.customer.name : "Walk-in"}</td>
                                    <td>{s.paymentMode}</td>
                                    <td>₹{Number(s.netTotal || s.total).toFixed(2)}</td>
                                    <td>
                                        <button 
                                            onClick={() => navigate(`/dashboard/billing/${s.id}`)}
                                            style={{ padding: "5px 10px", background: "#4CAF50", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                                        >
                                            View Bill
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    // INVOICE MODE
    if (!sale) return <div className="billing-message">No Data Found</div>;

    return (
        <div className="invoice-container">

            {/* ACTIONS */}
            <div className="no-print" style={{ marginBottom: "10px" }}>
                <button onClick={goBack}>⬅ Back</button>
                <button onClick={handlePrint}>🖨️ Print</button>
            </div>

            {/* INVOICE */}
            <div className="invoice-paper">

                {/* HEADER */}
                <div className="invoice-header">
                    <div>
                        <h2>SPLASH EYE WEAR</h2>
                        <p>Optical Store</p>
                    </div>

                    <div>
                        <h3>INVOICE</h3>
                        <p>#{sale.invoiceNo}</p>
                    </div>
                </div>

                {/* CUSTOMER */}
                <div className="invoice-meta">
                    <div>
                        <h4>Customer</h4>
                        {sale.customer ? (
                            <>
                                <p>{sale.customer.name}</p>
                                <p>{sale.customer.phone}</p>
                                <p>{sale.customer.address}</p>
                            </>
                        ) : (
                            <p>Walk-in</p>
                        )}
                    </div>

                    <div>
                        <p><strong>Date:</strong> {new Date(sale.saleDate).toLocaleDateString()}</p>
                        <p><strong>Payment:</strong> {sale.paymentMode}</p>
                    </div>
                </div>

                {/* TABLE */}
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Rate</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sale.items?.map((item) => (
                            <tr key={item.id}>

                                {/* IMAGE */}
                                <td>
                                    {item.product?.image ? (
                                        <img
                                            src={`http://localhost:3000/uploads/${item.product.image}`}
                                            width="50"
                                            alt="Product"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>

                                <td>{item.product?.productName}</td>
                                <td>₹{item.rate}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.amount}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* TOTAL */}
                <div style={{ textAlign: "right", marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                    <p><strong>Subtotal:</strong> ₹{Number(sale.total).toFixed(2)}</p>
                    <p><strong>Discount:</strong> ₹{Number(sale.discount || 0).toFixed(2)}</p>
                    <p><strong>Tax:</strong> ₹{(Number(sale.netTotal || sale.total) - Number(sale.total) + Number(sale.discount || 0)).toFixed(2)}</p>
                    <h3 style={{ marginTop: "10px" }}>Net Total: ₹{Number(sale.netTotal || sale.total).toFixed(2)}</h3>
                </div>

                {/* FOOTER */}
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <p>Thank you for your purchase!</p>
                </div>

            </div>
        </div>
    );
};

export default Billing;