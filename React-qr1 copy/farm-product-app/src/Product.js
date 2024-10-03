import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver'; // Importing file-saver

const Product = () => {
  const [formData, setFormData] = useState({
    farmName: '',
    productName: '',
    productPhoto: null,
    productVideoUrl: '',
    productDescription: '',
    harvestingStartTime: '',
    harvestingEndTime: '',
    packagingTime: '',
    labourTime: '',
    labourCost: '',
    productPhases: [
      {
        phaseName: '',
        pesticideName: '',
        pesticideType: '',
        methodOfUse: '',
        quantity: '',
      },
    ],
    productImages: [],
  });

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); 

  // Load products from local storage when the component mounts
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);
  const handleEdit = (index) => {
    setFormData(products[index]);
    setShowForm(true);
    setEditIndex(index); // Set the index of the farm being edited
  };

  const handleDelete = (index) => {
    const updatedFarms = products.filter((_, i) => i !== index);
    setProducts(updatedFarms);
    localStorage.setItem('products', JSON.stringify(updatedFarms));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPhases = formData.productPhases.map((phase, i) =>
      i === index ? { ...phase, [name]: value } : phase
    );
    setFormData({ ...formData, productPhases: updatedPhases });
  };

  const addPhase = () => {
    setFormData({
      ...formData,
      productPhases: [
        ...formData.productPhases,
        { phaseName: '', pesticideName: '', pesticideType: '', methodOfUse: '', quantity: '' },
      ],
    });
  };

  const removePhase = (index) => {
    const updatedPhases = formData.productPhases.filter((_, i) => i !== index);
    setFormData({ ...formData, productPhases: updatedPhases });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productPhoto: file });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, productImages: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = { ...formData };
    newProduct.productPhoto = formData.productPhoto?.name;
    newProduct.productImages = formData.productImages.map((file) => file.name);

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    // Save products to local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    const blob = new Blob([JSON.stringify(newProduct, null, 2)], { type: 'application/json' });
    saveAs(blob, `${formData.productName}_product.json`);

    setFormData({
      farmName: '',
      productName: '',
      productPhoto: null,
      productVideoUrl: '',
      productDescription: '',
      harvestingStartTime: '',
      harvestingEndTime: '',
      packagingTime: '',
      labourTime: '',
      labourCost: '',
      productPhases: [
        {
          phaseName: '',
          pesticideName: '',
          pesticideType: '',
          methodOfUse: '',
          quantity: '',
        },
      ],
      productImages: [],
    });
    setShowForm(false);
    
  };

  return (
    <div style={styles.container}>
      {/* Add Product Button */}
      <div style={styles.addButtonContainer}>
        < a href="#" onClick={() => setShowForm(!showForm)} style={styles.addProductButton}>
          {showForm ? 'Hide Add Product Form' : 'Add Product'}
        </a>
      </div>

      {/* Form for adding a new product */}
      {showForm && (
        <div style={styles.formContainer}>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Farm Name</label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleInputChange}
                required
              />
            </div> 

            <div style={styles.formGroup}>
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Product Photo</label>
              <input
                type="file"
                name="productPhoto"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />
              {formData.productPhoto && <p>Uploaded Product Photo: {formData.productPhoto.name}</p>}
            </div>

            <div style={styles.formGroup}>
              <label>Product Video URL</label>
              <input
                type="url"
                name="productVideoUrl"
                value={formData.productVideoUrl}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Product Description</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Harvesting, Packaging, Labour details */}
            <div style={styles.formGroup}>
              <label>Harvesting Start Time</label>
              <input
                type="date"
                name="harvestingStartTime"
                value={formData.harvestingStartTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Harvesting End Time</label>
              <input
                type="date"
                name="harvestingEndTime"
                value={formData.harvestingEndTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Packaging Time</label>
              <input
                type="date"
                name="packagingTime"
                value={formData.packagingTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Labour Time (in total hours)</label>
              <input
                type="number"
                name="labourTime"
                value={formData.labourTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Labour Cost (in rupees)</label>
              <input
                type="number"
                name="labourCost"
                value={formData.labourCost}
                onChange={handleInputChange}
                required
              />
            </div>

            
            <div style={styles.formGroup}>
              <label>Product Phases</label>
              {formData.productPhases.map((phase, index) => (
                <div key={index} style={styles.phaseCard}>
                  <h4>{`Phase ${index + 1}: ${phase.phaseName || 'Unnamed Phase'}`}</h4>
                  <div style={styles.phaseInputs}>
                    <input
                      type="text"
                      name="phaseName"
                      placeholder="Phase Name"
                      value={phase.phaseName}
                      onChange={(e) => handlePhaseChange(index, e)}
                      required
                    />
                    <input
                      type="text"
                      name="pesticideName"
                      placeholder="Pesticide Name"
                      value={phase.pesticideName}
                      onChange={(e) => handlePhaseChange(index, e)}
                      required
                    />
                    <select
                      name="pesticideType"
                      value={phase.pesticideType}
                      onChange={(e) => handlePhaseChange(index, e)}
                      required
                    >
                      <option value="">Select Pesticide Type</option>
                      <option value="solid">Solid</option>
                      <option value="liquid">Liquid</option>
                      <option value="gas">Gas</option>
                    </select>
                    <select
                      name="methodOfUse"
                      value={phase.methodOfUse}
                      onChange={(e) => handlePhaseChange(index, e)}
                      required
                    >
                      <option value="">Select Method of Use</option>
                      <option value="spray">Spray</option>
                      <option value="dusting">Dusting</option>
                      <option value="others">Others</option>
                    </select>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity (ml)"
                      value={phase.quantity}
                      onChange={(e) => handlePhaseChange(index, e)}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePhase(index)}
                    style={styles.removePhaseButton}
                  >
                    Remove Phase
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPhase}
                style={styles.addPhaseButton}
              >
                Add Phase
              </button>
            </div>

            

            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Display Submitted Products */}
      {products.length > 0 && (
        <div style={styles.productList}>
          <h3>Products</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Farm Name</th>
                <th style={styles.tableHeader}>Product Name</th>
                <th style={styles.tableHeader}>Description</th>
                <th style={styles.tableHeader}>Phases</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={styles.td}>{product.farmName}</td>
                  <td style={styles.td}>{product.productName}</td>
                  <td style={styles.td}>{product.productDescription}</td>
                  <td style={styles.td}>
                    {product.productPhases.map((phase, phaseIndex) => (
                      <div key={phaseIndex} style={styles.phaseDetail}>
                        {phase.phaseName || 'Unnamed Phase'}: {phase.pesticideName}, {phase.pesticideType}, {phase.methodOfUse}, {phase.quantity} ml
                      </div>
                    ))}
                  </td>
                  <td style={styles.td}>
                    <span onClick={() => handleEdit(index)} style={styles.icon}>✏️</span>
                    <span onClick={() => handleDelete(index)} style={styles.icon}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Define your styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  addProductButton: {
    color: '#037d61',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 20px',
    border: '1px solid #037d61',
    borderRadius: '8px',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease',
  },
  addProductButtonHover: {
    backgroundColor: '#16a085',
    transform: 'translateY(-2px)',
  },
  formContainer: {
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
  },
  formGroup: {
    // marginBottom: '25px',
    // display: 'flex',
    // flexDirection: 'column',
    // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0.04, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin:"4px"
  },
  formLabel: {
    fontWeight: '600',
    marginBottom: '10px',
    color: '#444',
    fontSize: '16px',
  },
  inputField: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s ease',
  },
  inputFieldFocus: {
    borderColor: '#16a085',
  },
  textareaField: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#f9f9f9',
    fontSize: '16px',
    height: '100px',
    resize: 'vertical',
  },
  phaseCard: {
    border: '1px solid #d0d0d0',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  phaseInputs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
  },
  removePhaseButton: {
    marginTop: '15px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  addPhaseButton: {
    marginTop: '15px',
    backgroundColor: '#1abc9c',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s',
  },
  addPhaseButtonHover: {
    backgroundColor: '#16a085',
    transform: 'translateY(-2px)',
  },
  submitButton: {
    padding: '15px 35px',
    fontSize: '18px',
    backgroundColor: '#16a085',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  icon:{
    padding:"6px",
    cursor:'pointer',
  },
  submitButtonHover: {
    backgroundColor: '#12876f',
    transform: 'translateY(-2px)',
  },
  productList: {
    marginTop: '40px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#16a085',
    color: '#fff',
    padding: '15px',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '15px',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '14px',
    color: '#444',
  },
  phaseDetail: {
    marginBottom: '10px',
    color: '#555',
  },
};

export default Product;
