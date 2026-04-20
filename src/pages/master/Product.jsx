import { useNavigate } from "react-router-dom";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";

export default function Product() {
  const navigate = useNavigate();
  
  const initialState = {
    code: "PR002",
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
    noOfSticker: "",
    image: null
  };

  const {
    formData,
    setFormData,
    handleNext,
    handlePrevious,
    handleClear,
    handleEdit,
    isFirst,
    isLast,
    isViewing,
    isEditMode
  } = useMasterNavigation("product", initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const customHandleSave = async () => {
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (key !== "image" && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.image && typeof formData.image !== 'string') {
        formDataToSend.append("image", formData.image);
      }

      const method = isEditMode ? "PUT" : "POST";
      const url = isEditMode 
        ? `http://localhost:3000/product/${formData.id}` 
        : `http://localhost:3000/product`;

      const res = await fetch(url, {
        method,
        body: formDataToSend
      });

      const data = await res.json();
      console.log("Saved:", data);

      if (res.ok) {
        alert(`Product ${isEditMode ? 'Updated' : 'Saved'} Successfully!`);
        handleClear();
        navigate("/dashboard/viewProduct");
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'save'} product: ` + (data.message || "Unknown error"));
      }

    } catch (error) {
      console.error(error);
      alert("Error saving product");
    }
  };

  return (
    <div className="master-container" style={{ paddingBottom: '30px' }}>
      <div className="master-header">
        <div className="header-left">
          <button className="btn-outline" onClick={handlePrevious} disabled={isFirst}>◀ Previous</button>
          <button className="btn-outline" onClick={handleNext} disabled={isLast}>Next ▶</button>
          <button className="btn-secondary" onClick={handleEdit} disabled={!isViewing}>Edit</button>
        </div>

        <div className="header-buttons">
          <button className="btn-outline" onClick={handleClear}>Cancel</button>
          <button className="btn-secondary" onClick={handleClear}>Clear</button>
          <button className="btn-primary" onClick={customHandleSave} disabled={isViewing}>
            {isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <div className="master-wrapper" style={{ marginTop: '20px' }}>
        <div className="master-card" style={{ padding: '30px' }}>
          
          {/* IMAGE UPLOAD SECTION */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
            <div className="form-field" style={{ flex: 1 }}>
              <label>Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} disabled={isViewing} style={{ background: 'white' }} />
            </div>
            
            {formData.image && (
              <div style={{ flexShrink: 0, paddingLeft: '20px', borderLeft: '1px solid #e2e8f0' }}>
                <img
                  src={typeof formData.image === 'string' ? `http://localhost:3000/${formData.image}` : URL.createObjectURL(formData.image)}
                  alt="preview"
                  width="100"
                  style={{ borderRadius: "8px", objectFit: 'cover', height: '100px', border: '2px solid #e2e8f0' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-field">
                <label>Code</label>
                <input value={formData.code || ''} className="visual-readonly" readOnly />
              </div>
              <div className="form-field">
                <label>Barcode</label>
                <input name="barcode" value={formData.barcode || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Model</label>
                <input name="model" value={formData.model || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Category</label>
                <input name="category" value={formData.category || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Product Name</label>
                <input name="productName" value={formData.productName || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Model Code</label>
                <input name="modelCode" value={formData.modelCode || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Brand</label>
                <input name="brand" value={formData.brand || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Colour Code</label>
                <input name="colourCode" value={formData.colourCode || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Colour</label>
                <input name="colour" value={formData.colour || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-field">
                <label>Lens Colour</label>
                <input name="lensColour" value={formData.lensColour || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Made By</label>
                <input name="madeBy" value={formData.madeBy || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Frame Type</label>
                <input name="frameType" value={formData.frameType || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Power</label>
                <input name="power" value={formData.power || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Cost</label>
                <input name="cost" type="number" value={formData.cost || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Rate</label>
                <input name="rate" type="number" value={formData.rate || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>Tax Group</label>
                <input name="taxGroup" value={formData.taxGroup || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              <div className="form-field">
                <label>HSN Code</label>
                <input name="hsnCode" value={formData.hsnCode || ''} onChange={handleChange} readOnly={isViewing} />
              </div>
              
              <div className="checkbox-group" style={{ margin: '10px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    name="nonStock"
                    checked={formData.nonStock || false}
                    onChange={handleChange}
                    disabled={isViewing}
                  />
                  <span style={{ fontWeight: 600, color: '#64748b' }}>Non Stock Product</span>
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                <div className="form-field" style={{ flex: 1, marginBottom: 0 }}>
                  <label>No. of Sticker</label>
                  <input
                    name="noOfSticker"
                    type="number"
                    value={formData.noOfSticker || ''}
                    onChange={handleChange}
                    readOnly={isViewing}
                  />
                </div>
                <button className="btn-secondary" style={{ padding: '12px 20px', height: '42px' }}>Print</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <button className="btn-secondary" style={{ flex: 1 }}>Purchase Details</button>
            <button className="btn-secondary" style={{ flex: 1 }}>Sales Details</button>
          </div>

        </div>
      </div>
    </div>
  );
}