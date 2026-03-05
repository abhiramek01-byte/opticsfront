import "../../styles/ProductCatalog.css";

export default function ViewProduct() {
    return (
        <div className="product-page">

            <div className="product-header">
                <h2>Product Catalog</h2>
                <button className="add-product-btn">+ Add New Product</button>
            </div>

            {/* Stats Cards */}

            <div className="product-stats">

                <div className="stat-card">
                    <h4>Total Products</h4>
                    <p>1,240</p>
                </div>

                <div className="stat-card">
                    <h4>In Stock</h4>
                    <p className="green">1,150</p>
                </div>

                <div className="stat-card">
                    <h4>Out of Stock</h4>
                    <p className="red">45</p>
                </div>

                <div className="stat-card">
                    <h4>Low Stock</h4>
                    <p className="orange">45</p>
                </div>

            </div>

            {/* Filters */}

            <div className="product-filters">

                <input placeholder="Search by name, SKU or model..." />

                <select>
                    <option>Brand: All</option>
                    <option>RayBan</option>
                    <option>Oakley</option>
                </select>

                <select>
                    <option>Category</option>
                    <option>Frames</option>
                    <option>Lenses</option>
                </select>

                <select>
                    <option>Status</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                </select>

            </div>

            {/* Table */}

            <div className="product-table">

                <table>

                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>RayBan</td>
                            <td>Aviator Classic Gold</td>
                            <td>RB3025</td>
                            <td>Sunglasses</td>
                            <td>$161</td>
                            <td>24</td>
                            <td className="status green">In Stock</td>
                        </tr>

                        <tr>
                            <td>Oakley</td>
                            <td>Holbrook Matte</td>
                            <td>OO9102</td>
                            <td>Sunglasses</td>
                            <td>$142</td>
                            <td>0</td>
                            <td className="status red">Out of Stock</td>
                        </tr>

                        <tr>
                            <td>Police</td>
                            <td>Origins Lite</td>
                            <td>SPL967</td>
                            <td>Frames</td>
                            <td>$115</td>
                            <td>4</td>
                            <td className="status orange">Low Stock</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}