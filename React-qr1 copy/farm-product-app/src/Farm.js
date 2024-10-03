import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const Farm = () => {
  const [formData, setFormData] = useState({
    farmName: '',
    altitude: '',
    location: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [farms, setFarms] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // To track which farm is being edited

  const districtsOfNepal = [
    'Kathmandu', 'Bhaktapur', 'Lalitpur', 'Pokhara', 'Chitwan',
    'Jhapa', 'Morang', 'Sunsari', 'Makwanpur', 'Kavrepalanchok',
    
  ];

  // Load farms from local storage when the component mounts
  useEffect(() => {
    const savedFarms = localStorage.getItem('farms');
    if (savedFarms) {
      setFarms(JSON.parse(savedFarms));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update the existing farm
      const updatedFarms = farms.map((farm, index) =>
        index === editIndex ? formData : farm
      );
      setFarms(updatedFarms);
      localStorage.setItem('farms', JSON.stringify(updatedFarms));
      setEditIndex(null); // Reset edit index
    } else {
      // Add new farm to the farms list
      const updatedFarms = [...farms, formData];
      setFarms(updatedFarms);
      localStorage.setItem('farms', JSON.stringify(updatedFarms));

      // Save the form data as JSON
      const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
      saveAs(blob, `${formData.farmName}_farm.json`);
    }

    // Reset form
    setFormData({
      farmName: '',
      altitude: '',
      location: ''
    });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(farms[index]);
    setShowForm(true);
    setEditIndex(index); // Set the index of the farm being edited
  };

  const handleDelete = (index) => {
    const updatedFarms = farms.filter((_, i) => i !== index);
    setFarms(updatedFarms);
    localStorage.setItem('farms', JSON.stringify(updatedFarms));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <a href="#" onClick={() => setShowForm(!showForm)} style={styles.addFarmLink}>
          {showForm ? 'Hide Add Farm Form' : 'Add Farm'}
        </a>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Add Farm</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.card}>
              <label style={styles.label}>Farm Name</label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.card}>
              <label style={styles.label}>Altitude (in meters)</label>
              <input
                type="number"
                name="altitude"
                value={formData.altitude}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.card}>
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
              {editIndex !== null ? 'Update Farm' : 'Submit'}
            </button>
          </form>
        </div>
      )}

      {farms.length > 0 && (
        <div style={styles.tableContainer}>
          <h3>Farm List</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Farm Name</th>
                <th style={styles.th}>Altitude (in meters)</th>
                <th style={styles.th}>Location (District)</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {farms.map((farm, index) => (
                <tr key={index}>
                  <td style={styles.td}>{farm.farmName}</td>
                  <td style={styles.td}>{farm.altitude}</td>
                  <td style={styles.td}>{farm.location}</td>
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

// Styles for the component
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
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  addFarmLink: {
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
  formContainer: {
    marginBottom: '40px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
    color: '#037d61',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  icon:{
    padding:"6px",
    cursor:'pointer',
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
    tableLayout: 'auto',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#037d61',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
    minWidth: '150px',

  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
};

export default Farm;
