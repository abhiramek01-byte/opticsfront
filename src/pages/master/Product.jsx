import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMasterNavigation } from "../../hooks/useMasterNavigation";
import "../../styles/Master.css";
import {
  FaBoxOpen,
  FaIdCard,
  FaBarcode,
  FaCube,
  FaLayerGroup,
  FaTag,
  FaTags,
  FaPalette,
  FaPaintBrush,
  FaGlasses,
  FaIndustry,
  FaShapes,
  FaBolt,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaPercent,
  FaReceipt,
  FaStickyNote,
  FaEdit,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaEraser,
  FaImage
} from "react-icons/fa";

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
    items,
    currentIndex,
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

  useEffect(() => {
    if (currentIndex === -1) {
      let nextCode = "PR001";
      if (items && items.length > 0) {
        const maxCodeNum = items.reduce((max, item) => {
          const codeToCheck = item.code;
          if (codeToCheck && codeToCheck.startsWith("PR")) {
            const num = parseInt(codeToCheck.substring(2), 10);
            if (!isNaN(num) && num > max) return num;
          }
          if (item.id && item.id > max) return item.id;
          return max;
        }, 0);
        const nextNum = maxCodeNum + 1;
        nextCode = "PR" + nextNum.toString().padStart(3, "0");
      }
      
      if (formData.code !== nextCode) {
        setFormData(prev => ({ ...prev, code: nextCode }));
      }
    }
  }, [items, currentIndex, formData.code, setFormData]);

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
        ? `${import.meta.env.VITE_API_URL}/product/${formData.id}` 
        : `${import.meta.env.VITE_API_URL}/product`;

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
        <h2>
          <FaBoxOpen /> Product Management
        </h2>

        <div className="header-buttons">
          <button className="btn-outline" onClick={handlePrevious} disabled={isFirst}>
            <FaChevronLeft /> Prev
          </button>
          <button className="btn-outline" onClick={handleNext} disabled={isLast}>
            Next <FaChevronRight />
          </button>
          <button className="btn-secondary" onClick={handleEdit} disabled={!isViewing}>
            <FaEdit /> Edit
          </button>
          <button className="btn-outline" onClick={handleClear}>
            <FaEraser /> Clear
          </button>
          <button className="btn-primary" onClick={customHandleSave} disabled={isViewing}>
            {isEditMode ? <><FaSave /> Update</> : <><FaSave /> Save</>}
          </button>
        </div>
      </div>

      <div className="master-wrapper">
        <div className="master-card" style={{ padding: '30px' }}>
          
          <div className="card-header">
            <div className="card-icon">
              <FaBoxOpen />
            </div>
            <h3>Product Details</h3>
          </div>

          {/* IMAGE UPLOAD SECTION */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', padding: '20px', background: 'rgba(255, 255, 255, 0.6)', borderRadius: '12px', border: '1.5px dashed rgba(255, 255, 255, 0.9)' }}>
            <div className="form-field" style={{ flex: 1 }}>
              <label><FaImage /> Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} disabled={isViewing} style={{ background: 'rgba(255, 255, 255, 0.4)' }} />
            </div>
            
            {formData.image && (
              <div style={{ flexShrink: 0, paddingLeft: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <img
                  src={typeof formData.image === 'string' ? `${import.meta.env.VITE_API_URL}/${formData.image}` : URL.createObjectURL(formData.image)}
                  alt="preview"
                  width="100"
                  style={{ borderRadius: "8px", objectFit: 'cover', height: '100px', border: '2px solid rgba(255, 255, 255, 0.8)' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-field">
                <label>Code</label>
                <div className="input-with-icon">
                  <FaIdCard className="input-icon" />
                  <input value={formData.code || ''} className="visual-readonly" readOnly />
                </div>
              </div>
              <div className="form-field">
                <label>Barcode</label>
                <div className="input-with-icon">
                  <FaBarcode className="input-icon" />
                  <input name="barcode" value={formData.barcode || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter barcode" />
                </div>
              </div>
              <div className="form-field">
                <label>Model</label>
                <div className="input-with-icon">
                  <FaCube className="input-icon" />
                  <input name="model" value={formData.model || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter model" />
                </div>
              </div>
              <div className="form-field">
                <label>Category</label>
                <div className="input-with-icon">
                  <FaLayerGroup className="input-icon" />
                  <input name="category" value={formData.category || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter category" />
                </div>
              </div>
              <div className="form-field">
                <label>Product Name</label>
                <div className="input-with-icon">
                  <FaTag className="input-icon" />
                  <input name="productName" value={formData.productName || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter product name" />
                </div>
              </div>
              <div className="form-field">
                <label>Model Code</label>
                <div className="input-with-icon">
                  <FaIdCard className="input-icon" />
                  <input name="modelCode" value={formData.modelCode || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter model code" />
                </div>
              </div>
              <div className="form-field">
                <label>Brand</label>
                <div className="input-with-icon">
                  <FaTags className="input-icon" />
                  <input name="brand" value={formData.brand || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter brand" />
                </div>
              </div>
              <div className="form-field">
                <label>Colour Code</label>
                <div className="input-with-icon">
                  <FaPalette className="input-icon" />
                  <input name="colourCode" value={formData.colourCode || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter colour code" />
                </div>
              </div>
              <div className="form-field">
                <label>Colour</label>
                <div className="input-with-icon">
                  <FaPaintBrush className="input-icon" />
                  <input name="colour" value={formData.colour || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter colour" />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-field">
                <label>Lens Colour</label>
                <div className="input-with-icon">
                  <FaGlasses className="input-icon" />
                  <input name="lensColour" value={formData.lensColour || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter lens colour" />
                </div>
              </div>
              <div className="form-field">
                <label>Made By</label>
                <div className="input-with-icon">
                  <FaIndustry className="input-icon" />
                  <input name="madeBy" value={formData.madeBy || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter made by" />
                </div>
              </div>
              <div className="form-field">
                <label>Frame Type</label>
                <div className="input-with-icon">
                  <FaShapes className="input-icon" />
                  <input name="frameType" value={formData.frameType || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter frame type" />
                </div>
              </div>
              <div className="form-field">
                <label>Power</label>
                <div className="input-with-icon">
                  <FaBolt className="input-icon" />
                  <input name="power" value={formData.power || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter power" />
                </div>
              </div>
              <div className="form-field">
                <label>Cost</label>
                <div className="input-with-icon">
                  <FaMoneyBillWave className="input-icon" />
                  <input name="cost" type="number" value={formData.cost || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter cost" />
                </div>
              </div>
              <div className="form-field">
                <label>Rate</label>
                <div className="input-with-icon">
                  <FaMoneyCheckAlt className="input-icon" />
                  <input name="rate" type="number" value={formData.rate || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter rate" />
                </div>
              </div>
              <div className="form-field">
                <label>Tax Group</label>
                <div className="input-with-icon">
                  <FaPercent className="input-icon" />
                  <input name="taxGroup" value={formData.taxGroup || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter tax group" />
                </div>
              </div>
              <div className="form-field">
                <label>HSN Code</label>
                <div className="input-with-icon">
                  <FaReceipt className="input-icon" />
                  <input name="hsnCode" value={formData.hsnCode || ''} onChange={handleChange} readOnly={isViewing} placeholder="Enter HSN code" />
                </div>
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
                  <div className="input-with-icon">
                    <FaStickyNote className="input-icon" />
                    <input
                      name="noOfSticker"
                      type="number"
                      value={formData.noOfSticker || ''}
                      onChange={handleChange}
                      readOnly={isViewing}
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <button className="btn-secondary" style={{ padding: '12px 20px', height: '42px' }}>Print</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.5)' }}>
            <button className="btn-secondary" style={{ flex: 1 }}>Purchase Details</button>
            <button className="btn-secondary" style={{ flex: 1 }}>Sales Details</button>
          </div>

        </div>
      </div>
    </div>
  );
}