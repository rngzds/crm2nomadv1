import './App.css';
import React, { useState } from 'react';
import Authorization from './Authorization';
import Statements from './Statements';
import Products from './Products';
import GonsApplication from './senim/application/Application';
import SenimApplication from './pensan/application/Application';
import { clearAllData, generateApplicationId, setCurrentApplicationId, saveApplicationMetadata, loadApplicationMetadata } from './services/storageService';

function App() {
  const [currentView, setCurrentView] = useState('auth');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentApplicationId, setCurrentApplicationIdState] = useState(null);

  const handleLogin = () => {
    setCurrentView('main');
  };

  const handleLogout = () => {
    // Очищаем все данные из localStorage при выходе (хард ресет)
    clearAllData();
    setCurrentView('auth');
    setSelectedProduct(null);
    setCurrentApplicationIdState(null);
  };

  const handleCreateApplication = () => {
    // Генерируем новый ID заявки
    const newApplicationId = generateApplicationId();
    setCurrentApplicationId(newApplicationId);
    setCurrentApplicationIdState(newApplicationId);
    // Сохраняем метаданные новой заявки
    saveApplicationMetadata(newApplicationId, {
      product: null,
      createdAt: new Date().toISOString(),
      policyholderIin: '',
      status: 'Черновик'
    });
    setCurrentView('product');
  };

  const handleSelectProduct = (productName) => {
    setSelectedProduct(productName);
    // Обновляем метаданные заявки с выбранным продуктом
    if (currentApplicationId) {
      const existingMetadata = loadApplicationMetadata(currentApplicationId) || {};
      saveApplicationMetadata(currentApplicationId, {
        ...existingMetadata,
        product: productName
      });
    }
    setCurrentView('application');
  };

  const handleOpenApplication = (applicationId) => {
    if (!applicationId) return;
    
    // Загружаем метаданные заявки
    const metadata = loadApplicationMetadata(applicationId);
    if (metadata) {
      setCurrentApplicationId(applicationId);
      setCurrentApplicationIdState(applicationId);
      setSelectedProduct(metadata.product);
      setCurrentView('application');
    }
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
      return <GonsApplication selectedProduct={selectedProduct} applicationId={currentApplicationId} onBack={handleBackToProduct} />;
    } else if (selectedProduct === 'ГОНС' || selectedProduct === 'Пенсионный Аннуитет') {
      return <SenimApplication selectedProduct={selectedProduct} applicationId={currentApplicationId} onBack={handleBackToProduct} />;
    }
    // Fallback to GonsApplication if product is not recognized
    return <GonsApplication selectedProduct={selectedProduct} applicationId={currentApplicationId} onBack={handleBackToProduct} />;
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
        <Statements onCreateApplication={handleCreateApplication} onLogout={handleLogout} onOpenApplication={handleOpenApplication} />
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
