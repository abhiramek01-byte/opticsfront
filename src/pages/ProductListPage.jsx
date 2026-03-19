import { useNavigate } from "react-router-dom";
import "../styles/ProductListPage.css";

export default function ProductListPage() {

    const navigate = useNavigate();

    const products = [

        {
            img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100",
            model: "Wayfarer Classic",
            brand: "Ray-Ban",
            category: "Sunglasses",
            stock: 45,
            size: "Medium"
        },

        {
            img: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=100",
            model: "Aviator Metal",
            brand: "Ray-Ban",
            category: "Sunglasses",
            stock: 32,
            size: "Large"
        },

        {
            img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=100",
            model: "Holbrook Sport",
            brand: "Oakley",
            category: "Sport",
            stock: 12,
            size: "Medium"
        },

        {
            img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100",
            model: "Full Rim Tech",
            brand: "Prada",
            category: "Eyeglasses",
            stock: 5,
            size: "Standard"
        }

    ];

    return (

        <div className="product-page">

            {/* HEADER */}

            <div className="product-header">

                <h2>Master Product List</h2>

                <p>
                    Efficiently manage and track your store's entire optical collection
                </p>

                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Back Home
                </button>

            </div>


            {/* STATS */}

            <div className="product-stats">

                <div className="stat-card">
                    <h3>Total Brands</h3>
                    <p>15</p>
                </div>

                <div className="stat-card">
                    <h3>Total Items</h3>
                    <p>450</p>
                </div>

            </div>


            {/* PRODUCT TABLE */}

            <table className="product-table">

                <thead>

                    <tr>
                        <th>Image</th>
                        <th>Model Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Stock</th>
                    </tr>

                </thead>

                <tbody>

                    {products.map((p, i) => (

                        <tr key={i}>

                            <td>
                                <img src={p.img} className="product-img" />
                            </td>

                            <td>{p.model}</td>

                            <td>
                                <span className="brand-tag">
                                    {p.brand}
                                </span>
                            </td>

                            <td>
                                <span className="category-tag">
                                    {p.category}
                                </span>
                            </td>

                            <td>{p.size}</td>

                            <td className="stock">
                                {p.stock}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}