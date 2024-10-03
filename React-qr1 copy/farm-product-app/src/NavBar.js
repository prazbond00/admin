import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <nav style={styles.navbar}>
      {/* Company Logo and Name */}
      <div style={styles.logoContainer}>
        
        <img 
          src="./renewme.png" 
          alt="Company Logo" 
          style={styles.logo}
        />
        <span style={styles.companyName}>RENEWME</span>
      </div>


      {/* Navigation links */}
      <ul style={styles.navList}>
        <li>
          <Link 
            to="/" 
            style={location.pathname === '/' ? styles.navItemSelected : styles.navItem} 
            onMouseEnter={() => setHoveredButton('home')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <i className="fas fa-home" style={styles.icon}></i> Home
          </Link>
        </li>
        <li>
          <Link 
            to="/product" 
            style={location.pathname === '/product' ? styles.navItemSelected : styles.navItem} 
            onMouseEnter={() => setHoveredButton('product')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <i className="fas fa-cube" style={styles.icon}></i> Product
          </Link>
        </li>
        <li>
          <Link 
            to="/farm" 
            style={location.pathname === '/farm' ? styles.navItemSelected : styles.navItem} 
            onMouseEnter={() => setHoveredButton('farm')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <i className="fas fa-leaf" style={styles.icon}></i> Farm
          </Link>
        </li>
        <li>
          <Link 
            to="/farmer" 
            style={location.pathname === '/farmer' ? styles.navItemSelected : styles.navItem} 
            onMouseEnter={() => setHoveredButton('farmer')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <i className="fas fa-user" style={styles.icon}></i> Farmer
          </Link>
        </li>
        <li>
          <Link 
            to="/setting" 
            style={location.pathname === '/setting' ? styles.navItemSelected : styles.navItem} 
            onMouseEnter={() => setHoveredButton('setting')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <i className="fas fa-cogs" style={styles.icon}></i> Setting
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(180deg, #037d61 0%, #025e4d 100%)', // Gradient background
    width: '250px',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '4px 0px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow to give depth
    zIndex: '1000',
  },
  logoContainer: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60px',
    height: 'auto',
    marginRight: '10px',
    borderRadius: '20%', // Rounded logo for a softer look
  },
  companyName: {
    fontSize: '1.6rem',
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: '1px', // Slight letter spacing for elegance
  },
  navList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    textAlign: 'center',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 0',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: '500',
    transition: 'all 0.3s ease', // Smooth transition for hover and active states
    borderRadius: '5px',
    margin: '5px 0',
  },
  navItemSelected: {
    backgroundColor: '#028E5A', // Slightly different green for selected
    color: '#ffffff',
    fontWeight: 'bold',
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)', // Box shadow for active item
    transition: 'all 0.3s ease',
    borderRadius: '5px',
  },
  icon: {
    marginRight: '10px', // Space between icon and text
    fontSize: '1.5rem', // Icon size
    transition: 'transform 0.3s ease',
  },
  navItemHover: {
    backgroundColor: '#025e4d',
  },
  customButton: {
    backgroundColor: '#f05454',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
  },
  customButtonHover: {
    backgroundColor: '#d04343',
  },
  '@media (max-width: 1024px)': {
    logo: {
      width: '40px',
    },
    companyName: {
      fontSize: '1.3rem',
    },
    navbar: {
      width: '200px',
    },
    navItem: {
      fontSize: '1.1rem',
    },
  },
  '@media (max-width: 768px)': {
    logo: {
      width: '35px',
    },
    companyName: {
      fontSize: '1.1rem',
    },
    navbar: {
      width: '180px',
    },
    navItem: {
      fontSize: '1rem',
    },
  },
  '@media (max-width: 480px)': {
    logo: {
      width: '30px',
    },
    companyName: {
      fontSize: '0.9rem',
    },
    navbar: {
      width: '150px',
    },
    navItem: {
      fontSize: '0.9rem',
    },
  },
};

export default NavBar;
