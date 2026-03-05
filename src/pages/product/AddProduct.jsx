import { useState } from "react";
import "../../styles/AddProduct.css";

export default function AddProduct() {

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Saved:", product);
        alert("Product Saved Successfully!");
    };

    return (
        <div className="add-product-page">

            {/* Top Bar */}
            <div className="product-topbar">
                <button>◀ Previous</button>
                <button>Next ▶</button>
                <button className="edit">Edit</button>

                <div className="right-btns">
                    <button>Cancel</button>
                    <button>Clear</button>
                    <button className="save">Save</button>
                </div>
            </div>

            <h2>Add New Product</h2>

            {/* Product Form */}
            <form className="add-product-form" onSubmit={handleSubmit}>

                <div className="form-row">
                    <label>Product Name</label>
                    <input
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                </div>

                <div className="form-row">
                    <label>Brand</label>
                    <select name="brand" value={product.brand} onChange={handleChange}>
                        <option value="">Select Brand</option>
                        <option>RayBan</option>
                        <option>Oakley</option>
                        <option>Prada</option>
                        <option>Gucci</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Category</label>
                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option>Frames</option>
                        <option>Sunglasses</option>
                        <option>Contact Lens</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Initial Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>

                <button className="save-product-btn">
                    Save Product
                </button>

            </form>

        </div>
    );
}