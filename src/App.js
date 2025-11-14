import './App.css';
import React, { useState } from 'react';
import Authorization from './Authorization';
import Statements from './Statements';
import Products from './Products';
import GonsApplication from './senim/application/Application';
import SenimApplication from './pensan/application/Application';
import { clearAllData, setCurrentApplicationId, saveApplicationMetadata, loadApplicationMetadata, getAccessToken } from './services/storageService';

function App() {
  const [currentView, setCurrentView] = useState('auth');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentApplicationId, setCurrentApplicationIdState] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCreatingApplication, setIsCreatingApplication] = useState(false);

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
    // Не создаем ID заранее, он будет получен из API при выборе продукта
    setCurrentView('product');
  };

  const handleSelectProduct = async (product) => {
    if (!product || !product.code) {
      console.error('Продукт не выбран или неверный формат');
      return;
    }

    setIsCreatingApplication(true);
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('Токен авторизации не найден');
      }

      console.log('Создаем заявку для продукта:', product);
      
      // Вызываем API для создания заявки
      const response = await fetch('https://crm-process.onrender.com/api/Statement/start', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productCode: product.code,
          operationType: 'New'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка создания заявки:', response.status, errorText);
        throw new Error(`Ошибка создания заявки: ${response.status}`);
      }

      const result = await response.json();
      console.log('Заявка создана, processId:', result.processId);
      
      if (!result.processId) {
        throw new Error('processId не получен от сервера');
      }

      // Используем processId как applicationId
      const applicationId = result.processId;
      
      // Получаем номер заявки из List API с оптимизацией
      // Используем функцию для повторных попыток с экспоненциальной задержкой
      const getApplicationNumber = async (maxRetries = 3, delay = 500) => {
        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            const listResponse = await fetch('https://crm-arm.onrender.com/api/Statement/List', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                pageNumber: 1,
                pageSize: 100,
                dateFrom: null,
                dateTo: null,
                direction: 'asc',
                folderType: 'Statement'
              }),
            });

            if (listResponse.ok) {
              const listData = await listResponse.json();
              
              if (listData && listData.statements && Array.isArray(listData.statements)) {
                const foundStatement = listData.statements.find(
                  st => st.processInstanceId === applicationId || st.id === applicationId
                );
                
                if (foundStatement && foundStatement.number) {
                  console.log('Найден номер заявки:', foundStatement.number);
                  return foundStatement.number;
                }
              }
            }
            
            // Если не найдено и есть еще попытки, ждем перед следующей попыткой
            if (attempt < maxRetries - 1) {
              const waitTime = delay * Math.pow(2, attempt); // Экспоненциальная задержка: 500ms, 1000ms, 2000ms
              console.log(`Заявка не найдена, повторная попытка через ${waitTime}ms...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
            }
          } catch (error) {
            console.error(`Ошибка при попытке ${attempt + 1}:`, error);
            if (attempt < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
            }
          }
        }
        return null;
      };

      // Получаем номер заявки (не блокируем переход, если номер не найден сразу)
      const applicationNumber = await getApplicationNumber();
      
      setCurrentApplicationId(applicationId);
      setCurrentApplicationIdState(applicationId);
      
      // Определяем название продукта для отображения
      const productName = product.nameRu || product.nameKz || product.code;
      
      // Маппинг кода продукта на название для компонента
      let mappedProductName = productName;
      if (product.code === 'Senim') {
        mappedProductName = 'Сенiм';
      }
      
      setSelectedProduct(mappedProductName);
      
      // Сохраняем метаданные новой заявки с номером
      saveApplicationMetadata(applicationId, {
        applicationId: applicationId,
        product: mappedProductName,
        productCode: product.code,
        createdAt: new Date().toISOString(),
        policyholderIin: '',
        status: 'Черновик',
        processId: result.processId,
        number: applicationNumber // Сохраняем номер заявки
      });
      
      // Переходим к заявлению
      setCurrentView('application');
    } catch (error) {
      console.error('Ошибка при создании заявки:', error);
      alert(`Ошибка создания заявки: ${error.message}`);
    } finally {
      setIsCreatingApplication(false);
    }
  };

  const handleOpenApplication = async (applicationId, applicationData) => {
    if (!applicationId) return;
    
    console.log('Открываем заявку:', applicationId, applicationData);
    
    // Определяем продукт по processName из данных заявки
    let product = null;
    if (applicationData) {
      // Маппинг processName на название продукта
      if (applicationData.processName === 'Сеним') {
        product = 'Сенiм';
      } else if (applicationData.processName === 'ГОНС' || applicationData.processName === 'Пенсионный Аннуитет') {
        product = applicationData.processName;
      } else {
        // Используем processName как есть, если нет точного совпадения
        product = applicationData.processName || 'Сенiм';
      }
      
      // Сохраняем метаданные заявки
      saveApplicationMetadata(applicationId, {
        applicationId: applicationId,
        product: product,
        createdAt: applicationData.createdAt || new Date().toISOString(),
        policyholderIin: applicationData.policyholderIin || '',
        status: applicationData.status || 'Черновик',
        number: applicationData.number,
        processCode: applicationData.processCode,
        processName: applicationData.processName
      });
    } else {
      // Если данных нет, загружаем из localStorage
      const metadata = loadApplicationMetadata(applicationId);
      if (metadata) {
        product = metadata.product;
      }
    }
    
    setCurrentApplicationId(applicationId);
    setCurrentApplicationIdState(applicationId);
    setSelectedProduct(product || 'Сенiм'); // По умолчанию Сенiм
    setCurrentView('application');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedProduct(null);
    setCurrentApplicationIdState(null);
    // Принудительно обновляем список заявлений при возврате
    setRefreshKey(prev => prev + 1);
  };

  const getApplicationComponent = () => {
    if (selectedProduct === 'Сенiм') {
      return <GonsApplication selectedProduct={selectedProduct} applicationId={currentApplicationId} onBack={handleBackToMain} />;
    } else if (selectedProduct === 'ГОНС' || selectedProduct === 'Пенсионный Аннуитет') {
      return <SenimApplication selectedProduct={selectedProduct} applicationId={currentApplicationId} onBack={handleBackToMain} />;
    }
    // Fallback to GonsApplication if product is not recognized
    return <GonsApplication selectedProduct={selectedProduct} applicationId={currentApplicationId} onBack={handleBackToMain} />;
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'white'
  };

  const renderLoadingOverlay = () => (
    <>
      {isCreatingApplication && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            minWidth: '300px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #333',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <div style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '500'
            }}>
              Создание заявки...
            </div>
            <div style={{
              color: '#6B6D80',
              fontSize: 14,
              fontFamily: 'Inter',
              fontWeight: '400',
              textAlign: 'center'
            }}>
              Пожалуйста, подождите
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );

  if (currentView === 'auth') {
    return (
      <>
        <div style={containerStyle}>
          <Authorization onLogin={handleLogin} />
        </div>
        {renderLoadingOverlay()}
      </>
    );
  }

  if (currentView === 'main') {
    return (
      <>
        <div style={containerStyle}>
          <Statements key={refreshKey} onCreateApplication={handleCreateApplication} onLogout={handleLogout} onOpenApplication={handleOpenApplication} />
        </div>
        {renderLoadingOverlay()}
      </>
    );
  }

  if (currentView === 'product') {
    return (
      <>
        <div style={containerStyle}>
          <Products onSelectProduct={handleSelectProduct} onBack={handleBackToMain} />
        </div>
        {renderLoadingOverlay()}
      </>
    );
  }

  if (currentView === 'application') {
    return (
      <>
        <div style={containerStyle}>
          {getApplicationComponent()}
        </div>
        {renderLoadingOverlay()}
      </>
    );
  }

  return (
    <>
      {renderLoadingOverlay()}
    </>
  );
}

export default App;
