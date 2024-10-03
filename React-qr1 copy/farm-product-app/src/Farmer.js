import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const Farmer = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    farmerPhoto: null,
    debutYear: '',
    yearsOfExperience: 0,
    contactNumber: '',
    location: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const [editableCell, setEditableCell] = useState({ rowIndex: null, columnKey: null });
  const [filter, setFilter] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);  // NEW: Index of the farmer being edited

  const districtsOfNepal = [ 'Kathmandu', 'Bhaktapur', 'Lalitpur', 'Pokhara', 'Chitwan',
  'Jhapa', 'Morang', 'Sunsari', 'Makwanpur', 'Kavrepalanchok',
  'Sindhupalchok', 'Nuwakot', 'Dolakha', 'Ramechhap', 'Okhaldhunga',
  'Khotang', 'Solukhumbu', 'Udayapur', 'Sarlahi', 'Rautahat',
  'Parsa', 'Bara', 'Dang', 'Banke', 'Bardiya', 'Kailali', 'Kanchanpur',
  'Doti', 'Dadeldhura', 'Baitadi', 'Darchula', 'Achham', 'Sankhuwasabha',
  'Bhojpur', 'Dhankuta', 'Terhathum', 'Taplejung', 'Panchthar', 'Ilam',
  'Gorkha', 'Lamjung', 'Tanahun', 'Syangja', 'Kaski', 'Manang', 'Mustang',
  'Myagdi', 'Parbat', 'Baglung', 'Palpa', 'Gulmi', 'Arghakhanchi', 'Kapilvastu',
  'Nawalparasi', 'Rupandehi', 'Rolpa', 'Rukum', 'Salyan', 'Dolpa', 'Jumla',
  'Kalikot', 'Mugu', 'Humla', 'Bajura', 'Bajhang'];

  useEffect(() => {
    const storedFarmers = JSON.parse(localStorage.getItem('farmers')) || [];
    setFarmers(storedFarmers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, farmerPhoto: file });
  };

  const handleDebutYearChange = (e) => {
    const debutYear = e.target.value;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - debutYear;
    setFormData({ ...formData, debutYear, yearsOfExperience });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contactNumber.length !== 10) {
      alert("Contact number must be 10 digits.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedFarmerData = { ...formData, farmerPhoto: reader.result };

      // If editingIndex is null, it means we are adding a new farmer, otherwise we're updating an existing one
      let updatedFarmers;
      if (editingIndex !== null) {
        updatedFarmers = farmers.map((farmer, index) =>
          index === editingIndex ? updatedFarmerData : farmer
        );
      } else {
        updatedFarmers = [...farmers, updatedFarmerData];
      }

      setFarmers(updatedFarmers);
      localStorage.setItem('farmers', JSON.stringify(updatedFarmers));

      const blob = new Blob([JSON.stringify(updatedFarmerData, null, 2)], { type: 'application/json' });
      saveAs(blob, `${formData.farmerName}_farmer.json`);

      setFormData({
        farmerName: '',
        farmerPhoto: null,
        debutYear: '',
        yearsOfExperience: 0,
        contactNumber: '',
        location: ''
      });

      setShowForm(false);
      setEditingIndex(null);  // Reset after editing
    };

    if (formData.farmerPhoto) {
      reader.readAsDataURL(formData.farmerPhoto);
    } else {
      const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
      saveAs(blob, `${formData.farmerName}_farmer.json`);
    }
  };

  const handleEditFarmer = (index) => {
    setShowForm(true);
    const farmerToEdit = farmers[index];
    setFormData({ ...farmerToEdit });
    setEditingIndex(index);  // Set the index of the farmer being edited
  };

  const handleDeleteFarmer = (index) => {
    const updatedFarmers = farmers.filter((_, i) => i !== index);
    setFarmers(updatedFarmers);
    localStorage.setItem('farmers', JSON.stringify(updatedFarmers));
  };

  const filteredFarmers = farmers.filter(farmer => {
    return farmer.farmerName.toLowerCase().includes(filter.toLowerCase()) || farmer.location.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div style={styles.container}>
      
      
    
      {/* Add Farmer Link */}
      <div style={styles.header}>
         <a href="#" onClick={() => setShowForm(!showForm)} style={styles.addFarmerLink}>
          {showForm ? 'Hide Add Farm Form' : 'Add Farm'}
         </a>
      </div>

      {showForm && (
        <div>
          <h2 style={styles.title}>{editingIndex !== null ? 'Edit Farmer' : 'Add Farmer'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Farmer Name</label>
              <input 
                type="text" 
                name="farmerName" 
                value={formData.farmerName} 
                onChange={handleInputChange}
                style={styles.input}
                required 
              />
            </div>

            <div style={styles.card}>
              <label style={styles.label}>Farmer Photo</label>
              <input 
                type="file" 
                name="farmerPhoto" 
                accept="image/*" 
                onChange={handlePhotoChange}
                style={styles.input}
              />
            </div>

            <div style={styles.card}>
              <label style={styles.label}>Debut Year</label>
              <input 
                type="number" 
                name="debutYear" 
                value={formData.debutYear} 
                onChange={handleDebutYearChange}
                style={styles.input}
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Years of Experience</label>
              <input 
                type="number" 
                name="yearsOfExperience" 
                value={formData.yearsOfExperience} 
                readOnly 
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Number</label>
              <input 
                type="text" 
                name="contactNumber" 
                value={formData.contactNumber} 
                onChange={handleInputChange}
                style={styles.input}
                required
                pattern="\d{10}"
                title="Contact number must be 10 digits."
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Location (District)</label>
              <select 
                name="location" 
                value={formData.location} 
                onChange={handleInputChange}
                style={styles.input}
                required
              >
                <option value="">Select District</option>
                {districtsOfNepal.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <button type="submit" style={styles.submitButton}>
              {editingIndex !== null ? 'Update Farmer' : 'Add Farmer'}
            </button>
          </form>
        </div>
      )}
{/* displaying the farmer data */}
      {farmers.length > 0 && (
        <div style={styles.tableContainer}>
          <h3>Farmer List</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Farmer Name</th>
                <th style={styles.th}>Farmer Photo</th>
                <th style={styles.th}>Debut Year</th>
                <th style={styles.th}>Years of Experience</th>
                <th style={styles.th}>Contact Number</th>
                <th style={styles.th}>Location (District)</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((farmer, rowIndex) => (
                <tr key={rowIndex}>
                  {['farmerName', 'farmerPhoto', 'debutYear', 'yearsOfExperience', 'contactNumber', 'location'].map((columnKey) => (
                    <td key={columnKey} style={styles.td}>
                      {columnKey === 'farmerPhoto' && farmer[columnKey] ? (
                        <img src={farmer[columnKey]} alt="Farmer" style={styles.image} />
                      ) : (
                        farmer[columnKey]
                      )}
                    </td>
                  ))}
                  <td style={styles.td}>
                    <button onClick={() => handleEditFarmer(rowIndex)} style={styles.iconButton}>
                      ✏️
                    </button>
                    <button onClick={() => handleDeleteFarmer(rowIndex)} style={styles.iconButton}>
                      🗑️
                    </button>
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
  addFarmerLink: {
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
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  toggleFormLink: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    outline: 'none',
    transition: 'border 0.2s ease-in-out',
  },
  submitButton: {
    backgroundColor: '#037d61',  
    color: '#fff',
    border: 'none',
    padding: '12px 0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
  tableContainer: {
    marginTop: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'auto', // Allows table to adjust column widths based on content
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#037d61',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
    minWidth: '150px', // Ensures enough space for content
  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    marginRight: '5px',
  },
};

export default Farmer;
