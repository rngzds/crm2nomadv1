import './App.css';
import React, { useState } from 'react';
import Authorization from './Authorization';
import Statements from './Statements';
import Products from './Products';
import GonsApplication from './senim/application/Application';
import SenimApplication from './pensan/application/Application';

function App() {
  const [currentView, setCurrentView] = useState('auth');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogin = () => {
    setCurrentView('main');
  };

  const handleLogout = () => {
    setCurrentView('auth');
    setSelectedProduct(null);
  };

  const handleCreateApplication = () => {
    setCurrentView('product');
  };

  const handleSelectProduct = (productName) => {
    setSelectedProduct(productName);
    setCurrentView('application');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedProduct(null);
  };

  const handleBackToProduct = () => {
    setCurrentView('product');
  };

  const getApplicationComponent = () => {
    if (selectedProduct === 'Сенiм') {
      return <GonsApplication selectedProduct={selectedProduct} onBack={handleBackToProduct} />;
    } else if (selectedProduct === 'ГОНС' || selectedProduct === 'Пенсионный Аннуитет') {
      return <SenimApplication selectedProduct={selectedProduct} onBack={handleBackToProduct} />;
    }
    // Fallback to GonsApplication if product is not recognized
    return <GonsApplication selectedProduct={selectedProduct} onBack={handleBackToProduct} />;
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'white'
  };

  if (currentView === 'auth') {
    return (
      <div style={containerStyle}>
        <Authorization onLogin={handleLogin} />
      </div>
    );
  }

  if (currentView === 'main') {
    return (
      <div style={containerStyle}>
        <Statements onCreateApplication={handleCreateApplication} onLogout={handleLogout} />
      </div>
    );
  }

  if (currentView === 'product') {
    return (
      <div style={containerStyle}>
        <Products onSelectProduct={handleSelectProduct} onBack={handleBackToMain} />
      </div>
    );
  }

  if (currentView === 'application') {
    return (
      <div style={containerStyle}>
        {getApplicationComponent()}
      </div>
    );
  }

  return null;
}

export default App;
