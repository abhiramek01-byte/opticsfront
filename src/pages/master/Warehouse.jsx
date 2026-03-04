import { useState } from "react";

export default function Product() {
  const [formData, setFormData] = useState({
    code: "PR001",
    barcode: "",
    model: "",
    category: "",
    productName: "",
    modelCode: "",
    brand: "",
    colourCode: "",
    colour: "",
    lensColour: "",
    madeBy: "",
    frameType: "",
    power: "",
    cost: "",
    rate: "",
    taxGroup: "",
    hsnCode: "",
    nonStock: false,
    stickerCount: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleClear = () => {
    setFormData({
      code: "PR001",
      barcode: "",
      model: "",
      category: "",
      productName: "",
      modelCode: "",
      brand: "",
      colourCode: "",
      colour: "",
      lensColour: "",
      madeBy: "",
      frameType: "",
      power: "",
      cost: "",
      rate: "",
      taxGroup: "",
      hsnCode: "",
      nonStock: false,
      stickerCount: ""
    });
  };

  const handleSave = () => {
    console.log("Product Data:", formData);
    alert("Product Saved Successfully!");
  };

  return (
    <div className="vendor-container">

      {/* ================= HEADER ================= */}
      <div className="vendor-header">
        <div className="header-left">
          <button className="btn-outline">◀ Previous</button>
          <button className="btn-outline">Next ▶</button>
          <button className="btn-light">Edit</button>
        </div>

        <div className="header-buttons">
          <button className="btn-outline">Cancel</button>
          <button className="btn-light" onClick={handleClear}>Clear</button>
          <button className="btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>

      {/* ================= PRODUCT FORM ================= */}
      <div className="product-wrapper">
        <div className="card product-card">

          <div className="product-grid">

            {/* LEFT COLUMN */}
            <div className="product-column">

              <div className="form-field">
                <label>Code</label>
                <input value={formData.code} readOnly />
              </div>

              <div className="form-field">
                <label>Barcode</label>
                <input name="barcode" value={formData.barcode} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Model</label>
                <input name="model" value={formData.model} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Category</label>
                <input name="category" value={formData.category} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Product Name</label>
                <input name="productName" value={formData.productName} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Model Code</label>
                <input name="modelCode" value={formData.modelCode} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Brand</label>
                <input name="brand" value={formData.brand} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Colour Code</label>
                <input name="colourCode" value={formData.colourCode} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Colour</label>
                <input name="colour" value={formData.colour} onChange={handleChange} />
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="product-column">

              <div className="form-field">
                <label>Lens Colour</label>
                <input name="lensColour" value={formData.lensColour} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Made By</label>
                <input name="madeBy" value={formData.madeBy} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Frame Type</label>
                <input name="frameType" value={formData.frameType} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Power</label>
                <input name="power" value={formData.power} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Cost</label>
                <input name="cost" type="number" value={formData.cost} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Rate</label>
                <input name="rate" type="number" value={formData.rate} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Tax Group</label>
                <input name="taxGroup" value={formData.taxGroup} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>HSN Code</label>
                <input name="hsnCode" value={formData.hsnCode} onChange={handleChange} />
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="nonStock"
                    checked={formData.nonStock}
                    onChange={handleChange}
                  />
                  Non Stock
                </label>
              </div>

              <div className="barcode-box">
                <label>No. of Sticker</label>
                <input
                  name="stickerCount"
                  type="number"
                  value={formData.stickerCount}
                  onChange={handleChange}
                />
                <button className="btn-light">Print</button>
              </div>

            </div>

          </div>

          {/* ================= BOTTOM BUTTONS ================= */}
          <div className="product-bottom-buttons">
            <button className="btn-outline">Purchase Details</button>
            <button className="btn-outline">Sales Details</button>
          </div>

        </div>
      </div>

    </div>
  );
}