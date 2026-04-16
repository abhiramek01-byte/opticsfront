import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Master.css"; // Reuse the premium master layouts

export default function AdminAddProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState(() => ({
        code: "P" + Math.floor(Math.random() * 100000), 
        barcode: "",
        category: "",
        productName: "",
        brand: "",
        model: "",
        modelCode: "",
        colourCode: "",
        colour: "",
        lensColour: "",
        frameType: "",
        madeBy: "",
        power: "",
        cost: "",
        rate: "",
        taxGroup: "",
        hsnCode: "",
        nonStock: false,
        noOfSticker: "",
        initialStock: "" 
    }));

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClear = () => {
        setProduct({
            ...product,
            barcode: "", category: "", productName: "", brand: "", model: "",
            modelCode: "", colourCode: "",  colour: "", lensColour: "", frameType: "",
            madeBy: "", power: "", cost: "", rate: "", taxGroup: "", hsnCode: "",
            nonStock: false, noOfSticker: "", initialStock: ""
        });
        setImageFile(null);
        setImagePreview("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        // Append all text fields
        Object.keys(product).forEach(key => {
            if (product[key] !== "" && product[key] !== null) {
                formData.append(key, product[key]);
            }
        });
        
        // Append image if present
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await fetch("http://localhost:3000/product", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Product Saved:", data);
                alert("Product Saved Successfully! ✅");
                navigate("/admin/products");
            } else {
                const errData = await res.json();
                alert(`Failed to save product: ${errData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product ❌");
        }
    };

    return (
        <div className="master-container" style={{ paddingBottom: '40px' }}>

            <div className="master-header">
                <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button className="btn-outline" onClick={() => navigate("/admin/products")}>← Back</button>
                    <h2 style={{ margin: 0 }}>Add New Product</h2>
                </div>

                <div className="header-buttons">
                    <button className="btn-outline" onClick={handleClear}>Clear</button>
                    <button className="btn-primary" onClick={handleSubmit}>Save Product</button>
                </div>
            </div>

            <div className="master-wrapper">
                
                {/* Visual Image Banner Section */}
                <div className="master-card" style={{ marginBottom: "20px", display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ flexShrink: 0 }}>
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', border: '3px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
                            />
                        ) : (
                            <div style={{ width: '120px', height: '120px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: '3px dashed #cbd5e1', color: '#94a3b8' }}>
                                <span>No Image</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="form-field" style={{ flex: 1 }}>
                        <label>Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ background: 'white' }}
                        />
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                            Upload a high quality transparent PNG or JPG image. Max 2MB.
                        </p>
                    </div>
                </div>

                {/* Grid Layout for Sections */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
                    
                    {/* SECTION 1: Basic Details */}
                    <div className="master-card" style={{ height: 'fit-content' }}>
                        <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e293b' }}>Basic Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-field">
                                <label>Product Code</label>
                                <input value={product.code} className="visual-readonly" readOnly />
                            </div>
                            
                            <div className="form-field">
                                <label>Product Name <span style={{color: 'red'}}>*</span></label>
                                <input name="productName" value={product.productName} onChange={handleChange} placeholder="Enter full product name" />
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Category</label>
                                    <select name="category" value={product.category} onChange={handleChange}>
                                        <option value="">Select Category</option>
                                        <option>Frames</option>
                                        <option>Sunglasses</option>
                                        <option>Contact Lens</option>
                                    </select>
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Brand</label>
                                    <select name="brand" value={product.brand} onChange={handleChange}>
                                        <option value="">Select Brand</option>
                                        <option>RayBan</option>
                                        <option>Oakley</option>
                                        <option>Prada</option>
                                        <option>Gucci</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-field">
                                <label>Barcode</label>
                                <input name="barcode" value={product.barcode} onChange={handleChange} placeholder="Scan or enter barcode" />
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Model</label>
                                    <input name="model" value={product.model} onChange={handleChange} />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Model Code</label>
                                    <input name="modelCode" value={product.modelCode} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Physical Attributes */}
                    <div className="master-card" style={{ height: 'fit-content' }}>
                        <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e293b' }}>Physical Attributes</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Colour</label>
                                    <input name="colour" value={product.colour} onChange={handleChange} />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Colour Code</label>
                                    <input name="colourCode" value={product.colourCode} onChange={handleChange} />
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Lens Colour</label>
                                    <input name="lensColour" value={product.lensColour} onChange={handleChange} />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Power (Sph/Cyl)</label>
                                    <input name="power" value={product.power} onChange={handleChange} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Frame Type</label>
                                    <input name="frameType" value={product.frameType} onChange={handleChange} />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Made By</label>
                                    <input name="madeBy" value={product.madeBy} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Pricing & Taxes */}
                    <div className="master-card" style={{ height: 'fit-content' }}>
                        <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e293b' }}>Pricing & Taxes</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Cost (Base Price) <span style={{color: 'red'}}>*</span></label>
                                    <input type="number" min="0" step="0.01" name="cost" value={product.cost} onChange={handleChange} placeholder="0.00" />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Selling Rate <span style={{color: 'red'}}>*</span></label>
                                    <input type="number" min="0" step="0.01" name="rate" value={product.rate} onChange={handleChange} placeholder="0.00" />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Tax Group</label>
                                    <input name="taxGroup" value={product.taxGroup} onChange={handleChange} placeholder="e.g. GST 18%" />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>HSN Code</label>
                                    <input name="hsnCode" value={product.hsnCode} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: Inventory & Extras */}
                    <div className="master-card" style={{ height: 'fit-content' }}>
                        <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e293b' }}>Inventory Configuration</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Initial Opening Stock</label>
                                    <input type="number" min="0" name="initialStock" value={product.initialStock} onChange={handleChange} placeholder="0" />
                                </div>
                                <div className="form-field" style={{ flex: 1 }}>
                                    <label>Print Labels (Count)</label>
                                    <input type="number" min="0" name="noOfSticker" value={product.noOfSticker} onChange={handleChange} placeholder="0" />
                                </div>
                            </div>

                            <div className="form-field" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="nonStock"
                                        checked={product.nonStock}
                                        onChange={handleChange}
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                    <span style={{ fontWeight: 600, color: '#334155' }}>
                                        Non Stock / Service Item
                                    </span>
                                </label>
                                <p style={{ margin: '5px 0 0 30px', fontSize: '0.8rem', color: '#64748b' }}>
                                    Check this if the item does not require inventory tracking (e.g., eye testing, repair services).
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
