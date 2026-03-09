import { useState } from "react";
import "../../styles/VendorLensOrder.css";

export default function VendorLensOrder() {

    const [orders, setOrders] = useState([]);

    const [form, setForm] = useState({
        vendor: "",
        customer: "",
        lensType: "",
        power: "",
        coating: "",
        brand: "",
        qty: "",
        status: "Ordered"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setOrders([...orders, form]);

        setForm({
            vendor: "",
            customer: "",
            lensType: "",
            power: "",
            coating: "",
            brand: "",
            qty: "",
            status: "Ordered"
        });
    };

    return (

        <div className="lens-order-page">

            <h1>Vendor Lens Order</h1>

            <div className="lens-order-form">

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Vendor</label>
                            <input
                                name="vendor"
                                value={form.vendor}
                                onChange={handleChange}
                                placeholder="Select Vendor"
                            />
                        </div>

                        <div className="form-group">
                            <label>Customer</label>
                            <input
                                name="customer"
                                value={form.customer}
                                onChange={handleChange}
                                placeholder="Customer Name"
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Lens Type</label>
                            <select name="lensType" value={form.lensType} onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Single Vision</option>
                                <option>Bifocal</option>
                                <option>Progressive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Power</label>
                            <input
                                name="power"
                                value={form.power}
                                onChange={handleChange}
                                placeholder="-1.25"
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Coating</label>
                            <select name="coating" value={form.coating} onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Anti Reflective</option>
                                <option>Blue Cut</option>
                                <option>UV Protection</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="Lens Brand"
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                name="qty"
                                value={form.qty}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>Ordered</option>
                                <option>Received</option>
                                <option>Completed</option>
                            </select>
                        </div>

                    </div>

                    <button className="order-btn">Create Order</button>

                </form>

            </div>

            {/* TABLE */}

            <div className="order-table">

                <table>

                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Customer</th>
                            <th>Lens</th>
                            <th>Power</th>
                            <th>Coating</th>
                            <th>Brand</th>
                            <th>Qty</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.map((order, index) => (

                            <tr key={index}>

                                <td>{order.vendor}</td>
                                <td>{order.customer}</td>
                                <td>{order.lensType}</td>
                                <td>{order.power}</td>
                                <td>{order.coating}</td>
                                <td>{order.brand}</td>
                                <td>{order.qty}</td>
                                <td className="status">{order.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}