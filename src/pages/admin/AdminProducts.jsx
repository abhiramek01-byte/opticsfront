import { useState } from "react";
import "../../styles/AdminProducts.css";

const CATEGORY_META = {
    Frame: { color: "#f5b731", icon: "🕶️" },
    Lens: { color: "#4fc3f7", icon: "🔬" },
    Accessories: { color: "#a78bfa", icon: "✨" },
    Solution: { color: "#34d399", icon: "💧" },
};

const INITIAL = [
    { id: 1, name: "RayBan Aviator Frame", category: "Frame", price: 4500, stock: 12 },
    { id: 2, name: "Essilor Crizal Lens", category: "Lens", price: 3200, stock: 8 },
    { id: 3, name: "Oakley Sport Frame", category: "Frame", price: 6800, stock: 5 },
    { id: 4, name: "Zeiss Blue Filter Lens", category: "Lens", price: 4100, stock: 20 },
];

const CATEGORIES = ["Frame", "Lens", "Accessories", "Solution"];

export default function Products() {

    const [products, setProducts] = useState(INITIAL);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", category: "Frame", price: "", stock: "" });

    const addProduct = () => {

        if (!form.name || !form.price) return;

        const newProduct = {
            id: Date.now(),
            name: form.name,
            category: form.category,
            price: Number(form.price),
            stock: Number(form.stock) || 0,
        };

        setProducts([newProduct, ...products]);

        setForm({
            name: "",
            category: "Frame",
            price: "",
            stock: ""
        });

        setShowForm(false);
    };

    const removeProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalValue = products.reduce((s, p) => s + p.price, 0);

    return (

        <div className="pm-root">

            <div className="pm-header">

                <div>
                    <p className="pm-subtitle">Inventory & Catalog</p>
                    <h1 className="pm-title">Product Management</h1>
                </div>

                <button
                    className="pm-add-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    Add Product
                </button>

            </div>

            <div className="pm-stats">

                <div className="pm-stat">
                    <span>{products.length}</span>
                    <p>Products</p>
                </div>

                <div className="pm-stat">
                    <span>₹{totalValue}</span>
                    <p>Total Value</p>
                </div>

            </div>

            {showForm && (

                <div className="pm-form">

                    <input
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    />

                    <button onClick={addProduct}>
                        Save
                    </button>

                </div>

            )}

            <input
                className="pm-search"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="pm-table">

                {filtered.map((p) => {

                    const meta = CATEGORY_META[p.category];

                    return (

                        <div className="pm-row" key={p.id}>

                            <div className="pm-name">
                                {p.name}
                            </div>

                            <div
                                className="pm-category"
                                style={{ color: meta.color }}
                            >
                                {meta.icon} {p.category}
                            </div>

                            <div className="pm-price">
                                ₹{p.price}
                            </div>

                            <div className="pm-stock">
                                {p.stock}
                            </div>

                            <button
                                className="pm-delete"
                                onClick={() => removeProduct(p.id)}
                            >
                                Delete
                            </button>

                        </div>

                    );
                })}

            </div>

        </div>

    );
}