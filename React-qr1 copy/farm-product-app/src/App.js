import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Product from './Product';
import Farm from './Farm';
import Farmer from './Farmer';
// import ViewDetail from './ViewDetail';
import Setting from './Setting';

// Error Boundary to handle any rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children; 
  }
}

// Main App component
function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <NavBar />
        <div style={styles.contentContainer}>
          <ErrorBoundary>
            <Routes>
              <Route 
                path="/" 
                element={
                  <div style={styles.textContainer}>
                    <h1>Welcome to RenewMe Farm Product Management App</h1>
                    <p>
                      At RenewMe, we believe in the power of sustainable agriculture to transform lives and landscapes. 
                      Our journey is more than just farming—it's a movement towards creating a harmonious balance 
                      between nature and human endeavor. We connect investors with local farmers, leveraging innovative 
                      technologies and sustainable practices to cultivate not just crops, but also hope and prosperity. 
                      Every project we undertake is a step towards a greener future, a stronger community, and a healthier planet.
                    </p>
                    <p>
                      Join us in this noble quest as we sow seeds of change and harvest a world of possibilities. 
                      With RenewMe, you're not just investing in agriculture; you're cultivating a legacy of impact and empowerment.
                    </p>
                    <p>
                      Welcome to a community where growth is not just measured in yields, but in the smiles it brings to faces 
                      and the difference it makes in lives.
                    </p>
                  </div>
                } 
              />
              <Route path="/product" element={<Product />} />
              <Route path="/farm" element={<Farm />} />
              <Route path="/farmer" element={<Farmer />} />
              {/* <Route path="/viewdetail" element={<ViewDetail />} /> */}
              <Route path="/setting" element={<Setting />}/>
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh', // Full viewport height to match the navbar
  },
  contentContainer: {
    flex: 1, // Take up the remaining space next to the navbar
    padding: '20px',
    overflowY: 'auto', // Ensure the content is scrollable if it overflows
  },
  textContainer: {
    maxWidth: '800px', // Limit the width of the text for better readability
    margin: '0 auto', // Center the text horizontally
    lineHeight: '1.6', // Improve text readability
  } 
  
};

export default App;