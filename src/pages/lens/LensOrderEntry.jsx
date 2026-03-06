import "../../styles/LensOrder.css";
import { useState } from "react";

export default function LensOrderEntry() {

    const [form, setForm] = useState({
        customer: "",
        phone: "",
        vendor: "",
        brand: "",
        type: "",
        coating: "",
        right_sph: "",
        right_cyl: "",
        right_axis: "",
        left_sph: "",
        left_cyl: "",
        left_axis: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Lens Order Saved:", form);
        alert("Lens Order Saved Successfully");
    };

    return (

        <div className="lens-page">

            <h2>Lens Order Entry</h2>

            <form className="lens-form" onSubmit={handleSubmit}>

                <div className="lens-grid">

                    <label>Customer Name</label>
                    <input name="customer" onChange={handleChange} />

                    <label>Phone</label>
                    <input name="phone" onChange={handleChange} />

                    <label>Vendor</label>
                    <input name="vendor" onChange={handleChange} />

                    <label>Lens Brand</label>
                    <input name="brand" onChange={handleChange} />

                    <label>Lens Type</label>
                    <select name="type" onChange={handleChange}>
                        <option>Single Vision</option>
                        <option>Bifocal</option>
                        <option>Progressive</option>
                    </select>

                    <label>Coating</label>
                    <select name="coating" onChange={handleChange}>
                        <option>None</option>
                        <option>Blue Cut</option>
                        <option>Anti Glare</option>
                        <option>UV</option>
                    </select>

                </div>

                <h3>Eye Power</h3>

                <table className="eye-table">

                    <thead>
                        <tr>
                            <th></th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>AXIS</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Right Eye</td>
                            <td><input name="right_sph" onChange={handleChange} /></td>
                            <td><input name="right_cyl" onChange={handleChange} /></td>
                            <td><input name="right_axis" onChange={handleChange} /></td>
                        </tr>

                        <tr>
                            <td>Left Eye</td>
                            <td><input name="left_sph" onChange={handleChange} /></td>
                            <td><input name="left_cyl" onChange={handleChange} /></td>
                            <td><input name="left_axis" onChange={handleChange} /></td>
                        </tr>

                    </tbody>

                </table>

                <button className="save-btn">Save Order</button>

            </form>

        </div>

    );
}