import React, { useState } from 'react';

const Setting = ({ updateProductPhases }) => {
  const [productPhases, setProductPhases] = useState([
    {
      pesticideName: '',
      // pesticideType: '',
      // methodOfUse: '',
    },
  ]);

  const handlePhaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPhases = productPhases.map((phase, i) =>
      i === index ? { ...phase, [name]: value } : phase
    );
    setProductPhases(updatedPhases);
  };

  const addPhase = () => {
    setProductPhases([
      ...productPhases,
      { pesticideName: '' },
    ]);
  };

  const removePhase = (index) => {
    const updatedPhases = productPhases.filter((_, i) => i !== index);
    setProductPhases(updatedPhases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store productPhases in local storage
    localStorage.setItem('pesticides', JSON.stringify(productPhases));

    // Optionally, update the product phases in the state
    setProductPhases(productPhases);
    
    // Log the productPhases for debugging
    console.log(productPhases);
};


  // Inline style definitions
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', // Align content to the top
      alignItems: 'center',
      height: '100vh', // Full viewport height
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px', // Space between heading and table
    },
    formContainer: {
      width: '100%',
      maxWidth: '600px', // Set a maximum width for the form
      padding: '20px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    formTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px', // Space between table and form actions
    },
    tableCell: {
      padding: '10px',
      textAlign: 'left',
    },
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
  };

  return (
    <div style={style.container}>
      <h2 style={style.heading}>Add Data</h2>
      <form onSubmit={handleSubmit} style={style.formContainer}>
        <table style={style.formTable}>
          <thead>
            <tr>
              <th>Pesticide Name</th>
              {/* <th>Pesticide Type</th>
              <th>Method of Use</th> */}
              
            </tr>
          </thead>
          <tbody>
            {productPhases.map((phase, index) => (
              <tr key={index}>
                <td style={style.tableCell}>
                  <input
                    type="text"
                    name="pesticideName"
                    placeholder="Pesticide Name"
                    value={phase.pesticideName}
                    onChange={(e) => handlePhaseChange(index, e)}
                    required
                  />
                </td>
                {/* <td style={style.tableCell}>
                  <input
                    type="text"
                    name="pesticideType"
                    placeholder="Pesticide Type"
                    value={phase.pesticideType}
                    onChange={(e) => handlePhaseChange(index, e)}
                    required
                  />
                </td>
                <td style={style.tableCell}>
                  <input
                    type="text"
                    name="methodOfUse"
                    placeholder="Method of Use"
                    value={phase.methodOfUse}
                    onChange={(e) => handlePhaseChange(index, e)}
                    required
                  />
                </td> */}
                <td style={style.tableCell}>
                  {productPhases.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhase(index)}
                      style={{ ...style.button, ...style.buttonHover }}
                    >
                      Remove
                    </button>
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <div style={style.formActions}>
          <button
            type="button"
            onClick={addPhase}
            style={{ ...style.button, ...style.buttonHover }}
          >
            Add Phase
          </button>
          <button
            type="submit"
            style={{ ...style.button, ...style.buttonHover }}
          >
            Save Phases
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
