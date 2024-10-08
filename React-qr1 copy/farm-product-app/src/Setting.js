import React, { useState } from 'react';
import { FaSeedling, FaTools, FaPen, FaTrashAlt } from 'react-icons/fa';

const Setting = () => {
  const [productPhases, setProductPhases] = useState([
    {
      methodOfUse: '',
      pesticideType: '',
    },
  ]);

  const [activeCard, setActiveCard] = useState(null); // To track active card
  const [methods, setMethods] = useState([]); // Track list of methods of use
  const [pesticides, setPesticides] = useState([]); // Track list of pesticides
  const [methodInput, setMethodInput] = useState(''); // Input for method of use
  const [pesticideInput, setPesticideInput] = useState(''); // Input for pesticide type
  const [editingMethodIndex, setEditingMethodIndex] = useState(null); // Track which method is being edited
  const [editingPesticideIndex, setEditingPesticideIndex] = useState(null); // Track which pesticide is being edited

  // Toggle active card (show or hide the form based on selected card)
  const handleCardClick = (cardType) => {
    setActiveCard(cardType);
  };

  // Method of Use Handlers
  const handleMethodSubmit = (e) => {
    e.preventDefault();
    if (editingMethodIndex !== null) {
      const updatedMethods = methods.map((method, index) =>
        index === editingMethodIndex ? methodInput : method
      );
      setMethods(updatedMethods);
      setEditingMethodIndex(null);
    } else {
      setMethods([...methods, methodInput]);
    }
    setMethodInput(''); // Clear input field after submit
  };

  const handleEditMethod = (index) => {
    setMethodInput(methods[index]);
    setEditingMethodIndex(index);
  };

  const handleDeleteMethod = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  // Pesticide Type Handlers
  const handlePesticideSubmit = (e) => {
    e.preventDefault();
    if (editingPesticideIndex !== null) {
      const updatedPesticides = pesticides.map((pesticide, index) =>
        index === editingPesticideIndex ? pesticideInput : pesticide
      );
      setPesticides(updatedPesticides);
      setEditingPesticideIndex(null);
    } else {
      setPesticides([...pesticides, pesticideInput]);
    }
    setPesticideInput(''); // Clear input field after submit
  };

  const handleEditPesticide = (index) => {
    setPesticideInput(pesticides[index]);
    setEditingPesticideIndex(index);
  };

  const handleDeletePesticide = (index) => {
    const updatedPesticides = pesticides.filter((_, i) => i !== index);
    setPesticides(updatedPesticides);
  };

  // Render the main card selection screen
  const renderCards = () => {
    return (
      <div style={styles.cardContainer}>
        {/* Method of Use Card */}
        <div style={styles.card} onClick={() => handleCardClick('methodOfUse')}>
          <FaTools size={40} color="#4caf50" />
          <h3>Method of Use</h3>
        </div>

        {/* Pesticide Type Card */}
        <div style={styles.card} onClick={() => handleCardClick('pesticideType')}>
          <FaSeedling size={40} color="#2196F3" />
          <h3>Select Pesticide Type</h3>
        </div>
      </div>
    );
  };

  // Render the method of use form and table
  const renderMethodOfUseForm = () => {
    return (
      <div>
        <h3>Add Method of Use</h3>
        <form onSubmit={handleMethodSubmit} style={styles.form}>
          <input
            type="text"
            value={methodInput}
            onChange={(e) => setMethodInput(e.target.value)}
            placeholder="Enter Method of Use"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {editingMethodIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Display entered methods in a table */}
        {methods.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Method of Use</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((method, index) => (
                <tr key={index}>
                  <td>{method}</td>
                  <td>
                    <FaPen style={styles.icon} onClick={() => handleEditMethod(index)} />
                    <FaTrashAlt style={styles.icon} onClick={() => handleDeleteMethod(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={() => setActiveCard(null)} style={styles.backButton}>
          Back to Settings
        </button>
      </div>
    );
  };

  // Render the pesticide type form and table
  const renderPesticideTypeForm = () => {
    return (
      <div>
        <h3>Select Pesticide Type</h3>
        <form onSubmit={handlePesticideSubmit} style={styles.form}>
          <input
            type="text"
            value={pesticideInput}
            onChange={(e) => setPesticideInput(e.target.value)}
            placeholder="Enter Pesticide Type"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {editingPesticideIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Display entered pesticides in a table */}
        {pesticides.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Pesticide Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pesticides.map((pesticide, index) => (
                <tr key={index}>
                  <td>{pesticide}</td>
                  <td>
                    <FaPen style={styles.icon} onClick={() => handleEditPesticide(index)} />
                    <FaTrashAlt style={styles.icon} onClick={() => handleDeletePesticide(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={() => setActiveCard(null)} style={styles.backButton}>
          Back to Settings
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2>Product Data Entry</h2>

      {/* Conditionally render the cards or the respective form based on activeCard */}
      {activeCard === 'methodOfUse' ? renderMethodOfUseForm() :
       activeCard === 'pesticideType' ? renderPesticideTypeForm() :
       renderCards()}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    flex: '1 1 calc(50% - 20px)',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    boxSizing: 'border-box',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  icon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Setting;
