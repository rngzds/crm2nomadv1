import React, { useState } from 'react';
import Gender from '../dictionary/Gender';
import SectorCode from '../dictionary/SectorCode';
import Country from '../dictionary/Country';
import Region from '../dictionary/Region';
import SettlementType from '../dictionary/SettlementType';
import City from '../dictionary/City';
import DocType from '../dictionary/DocType';
import IssuedBy from '../dictionary/IssuedBy';
import ClientType from '../dictionary/ClientType';

const Policyholder = ({ onBack, onSave }) => {
  const [currentView, setCurrentView] = useState('main');

  // Состояние для выбранных значений из справочников
  const [dictionaryValues, setDictionaryValues] = useState({
    gender: '',
    sectorCode: '',
    country: '',
    region: '',
    settlementType: '',
    city: '',
    docType: '',
    issuedBy: '',
    clientType: ''
  });

  // Состояние для полей ввода без кнопок
  const [fieldValues, setFieldValues] = useState({
    iin: '',
    phone: '',
    lastName: '',
    firstName: '',
    middleName: '',
    street: '',
    microdistrict: '',
    houseNumber: '',
    apartmentNumber: '',
    documentNumber: ''
  });

  // Состояние для полей с календарем
  const [dateValues, setDateValues] = useState({
    birthDate: '',
    issueDate: '',
    expiryDate: ''
  });

  // Состояние для отслеживания активного поля
  const [activeField, setActiveField] = useState(null);

  // Состояние для toggle кнопок
  const [toggleStates, setToggleStates] = useState({
    manualInput: false,
    pdl: false
  });

  // Состояние для автоматического режима
  const [autoModeState, setAutoModeState] = useState('initial'); // 'initial' | 'request_sent' | 'response_received' | 'data_loaded'

  // Обработчик для сохранения выбранных значений из справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

  const handleBackToMain = () => setCurrentView('main');
  const handleOpenGender = () => setCurrentView('gender');
  const handleOpenSectorCode = () => setCurrentView('sectorCode');
  const handleOpenCountry = () => setCurrentView('country');
  const handleOpenRegion = () => setCurrentView('region');
  const handleOpenSettlementType = () => setCurrentView('settlementType');
  const handleOpenCity = () => setCurrentView('city');
  const handleOpenDocType = () => setCurrentView('docType');
  const handleOpenIssuedBy = () => setCurrentView('issuedBy');
  const handleOpenClientType = () => setCurrentView('clientType');

  // Активация поля при клике
  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  // Обновление значения поля
  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Возврат к обычному состоянию при потере фокуса
  const handleFieldBlur = (fieldName) => {
    if (!fieldValues[fieldName]) {
      setActiveField(null);
    }
  };

  // Обработчик для переключения состояния toggle кнопок
  const handleToggleClick = (toggleName) => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
    // При включении ручного ввода сбрасываем состояние автоматического режима
    if (toggleName === 'manualInput' && !toggleStates.manualInput) {
      setAutoModeState('initial');
    }
  };

  // Обработчик для отправки запроса
  const handleSendRequest = () => {
    // TODO: Отправить запрос на сервер
    // Пример: await sendRequestToServer(fieldValues.iin, fieldValues.phone);
    
    // Переход в состояние request_sent
    setAutoModeState('request_sent');
    
    // Симуляция получения ответа от сервера через 2 секунды
    setTimeout(() => {
      setAutoModeState('response_received');
    }, 2000);
  };

  // Обработчик для обновления данных
  const handleUpdate = () => {
    // Симуляция загрузки данных с сервера
    setFieldValues(prev => ({
      ...prev,
      iin: prev.iin || '940 218 300 972', // Сохраняем уже введенное или устанавливаем дефолтное
      phone: prev.phone || '+7 707 759 10 10', // Сохраняем уже введенное или устанавливаем дефолтное
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      street: 'Абая',
      microdistrict: '-',
      houseNumber: '№17',
      apartmentNumber: '№17',
      documentNumber: '01002003'
    }));
    
    setDateValues(prev => ({
      ...prev,
      birthDate: '12.02.2000',
      issueDate: '01.01.2016',
      expiryDate: '01.01.2016'
    }));
    
    setDictionaryValues(prev => ({
      ...prev,
      gender: 'Мужской',
      sectorCode: 'Не выбран',
      country: 'Казахстан',
      region: 'Алматинская область',
      settlementType: 'Город',
      city: 'Алматы',
      docType: 'Уд. личности',
      issuedBy: 'МВД РК',
      clientType: ''
    }));
    
    setToggleStates(prev => ({
      ...prev,
      pdl: false
    }));
    
    // Переход в состояние data_loaded
    setAutoModeState('data_loaded');
  };

  // Определение текста кнопки в заголовке
  const getHeaderButtonText = () => {
    // Если ручной ввод включен - кнопка всегда "Сохранить"
    if (toggleStates.manualInput) {
      return 'Сохранить';
    }
    
    // Если ручной ввод выключен - кнопка зависит от состояния автоматического режима
    if (autoModeState === 'initial' || autoModeState === 'request_sent') {
      return 'Отправить запрос';
    }
    
    if (autoModeState === 'response_received') {
      return 'Обновить';
    }
    
    if (autoModeState === 'data_loaded') {
      return 'Сохранить';
    }
    
    return 'Сохранить';
  };

  // Определение действия кнопки в заголовке
  const handleHeaderButtonClick = () => {
    // Если ручной ввод включен - сохраняем данные
    if (toggleStates.manualInput) {
      if (onSave) {
        onSave({
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates
        });
      }
      if (onBack) {
        onBack();
      }
      return;
    }
    
    // Если ручной ввод выключен - действия зависят от состояния автоматического режима
    if (autoModeState === 'initial' || autoModeState === 'request_sent') {
      handleSendRequest();
      return;
    }
    
    if (autoModeState === 'response_received') {
      handleUpdate();
      return;
    }
    
    if (autoModeState === 'data_loaded') {
      // Сохранение данных
      if (onSave) {
        onSave({
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates
        });
      }
      if (onBack) {
        onBack();
      }
      return;
    }
  };

  // Функция для рендеринга кнопок справочника
  const renderDictionaryButton = (fieldName, label, onClickHandler, hasValue) => {
    if (hasValue) {
      return (
        <div data-layer={`Input '${label}'`} data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="Input text" className="InputText" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues[fieldName]}</div>
          </div>
          <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onClickHandler}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div data-layer={`Input '${label}'`} data-state="not_pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
          <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onClickHandler}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

  // Функция рендеринга поля с календарем
  const renderCalendarField = (fieldName, label) => {
    const isActive = activeField === fieldName;
    const hasValue = !!dateValues[fieldName];

    if (isActive || hasValue) {
      // Активное состояние - с полем ввода
      return (
        <div data-layer={`Input '${label}'`} data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
              <input
                type="text"
                value={dateValues[fieldName] || ''}
                onChange={(e) => {
                  setDateValues(prev => ({
                    ...prev,
                    [fieldName]: e.target.value
                  }));
                }}
                onBlur={() => {
                  if (!dateValues[fieldName]) {
                    setActiveField(null);
                  }
                }}
                autoFocus={isActive}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  color: '#071222',
                  paddingLeft: 0,
                  marginLeft: 0
                }}
              />
            </div>
          </div>
          <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={() => handleFieldClick(fieldName)}>
            <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.3335 0.916626C7.83976 0.916626 8.25016 1.32703 8.25016 1.83329V2.74996H13.7502V1.83329C13.7502 1.32703 14.1606 0.916626 14.6668 0.916626C15.1731 0.916626 15.5835 1.32703 15.5835 1.83329V2.74996H17.4168C18.1462 2.74996 18.8456 3.03969 19.3614 3.55542C19.8771 4.07114 20.1668 4.77061 20.1668 5.49996V18.3333C20.1668 19.0626 19.8771 19.7621 19.3614 20.2778C18.8456 20.7936 18.1462 21.0833 17.4168 21.0833H4.5835C3.85415 21.0833 3.15468 20.7936 2.63895 20.2778C2.12323 19.7621 1.8335 19.0626 1.8335 18.3333V5.49996C1.8335 4.77061 2.12323 4.07114 2.63895 3.55542C3.15468 3.03969 3.85415 2.74996 4.5835 2.74996H6.41683V1.83329C6.41683 1.32703 6.82724 0.916626 7.3335 0.916626ZM6.41683 4.58329H4.5835C4.34038 4.58329 4.10722 4.67987 3.93531 4.85178C3.76341 5.02369 3.66683 5.25684 3.66683 5.49996V8.24996H18.3335V5.49996C18.3335 5.25684 18.2369 5.02369 18.065 4.85178C17.8931 4.67987 17.6599 4.58329 17.4168 4.58329H15.5835V5.49996C15.5835 6.00622 15.1731 6.41663 14.6668 6.41663C14.1606 6.41663 13.7502 6.00622 13.7502 5.49996V4.58329H8.25016V5.49996C8.25016 6.00622 7.83976 6.41663 7.3335 6.41663C6.82724 6.41663 6.41683 6.00622 6.41683 5.49996V4.58329ZM18.3335 10.0833H3.66683V18.3333C3.66683 18.5764 3.76341 18.8096 3.93531 18.9815C4.10722 19.1534 4.34038 19.25 4.5835 19.25H17.4168C17.6599 19.25 17.8931 19.1534 18.065 18.9815C18.2369 18.8096 18.3335 18.5764 18.3335 18.3333V10.0833Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      );
    } else {
      // Обычное состояние - только название
      return (
        <div data-layer={`Input '${label}'`} data-state="not_pressed" className="Input" onClick={() => handleFieldClick(fieldName)} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
          <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={(e) => { e.stopPropagation(); handleFieldClick(fieldName); }}>
            <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.3335 0.916626C7.83976 0.916626 8.25016 1.32703 8.25016 1.83329V2.74996H13.7502V1.83329C13.7502 1.32703 14.1606 0.916626 14.6668 0.916626C15.1731 0.916626 15.5835 1.32703 15.5835 1.83329V2.74996H17.4168C18.1462 2.74996 18.8456 3.03969 19.3614 3.55542C19.8771 4.07114 20.1668 4.77061 20.1668 5.49996V18.3333C20.1668 19.0626 19.8771 19.7621 19.3614 20.2778C18.8456 20.7936 18.1462 21.0833 17.4168 21.0833H4.5835C3.85415 21.0833 3.15468 20.7936 2.63895 20.2778C2.12323 19.7621 1.8335 19.0626 1.8335 18.3333V5.49996C1.8335 4.77061 2.12323 4.07114 2.63895 3.55542C3.15468 3.03969 3.85415 2.74996 4.5835 2.74996H6.41683V1.83329C6.41683 1.32703 6.82724 0.916626 7.3335 0.916626ZM6.41683 4.58329H4.5835C4.34038 4.58329 4.10722 4.67987 3.93531 4.85178C3.76341 5.02369 3.66683 5.25684 3.66683 5.49996V8.24996H18.3335V5.49996C18.3335 5.25684 18.2369 5.02369 18.065 4.85178C17.8931 4.67987 17.6599 4.58329 17.4168 4.58329H15.5835V5.49996C15.5835 6.00622 15.1731 6.41663 14.6668 6.41663C14.1606 6.41663 13.7502 6.00622 13.7502 5.49996V4.58329H8.25016V5.49996C8.25016 6.00622 7.83976 6.41663 7.3335 6.41663C6.82724 6.41663 6.41683 6.00622 6.41683 5.49996V4.58329ZM18.3335 10.0833H3.66683V18.3333C3.66683 18.5764 3.76341 18.8096 3.93531 18.9815C4.10722 19.1534 4.34038 19.25 4.5835 19.25H17.4168C17.6599 19.25 17.8931 19.1534 18.065 18.9815C18.2369 18.8096 18.3335 18.5764 18.3335 18.3333V10.0833Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

  // Функция рендеринга поля без кнопки
  const renderInputField = (fieldName, label, defaultValue = '') => {
    const isActive = activeField === fieldName;
    const hasValue = !!fieldValues[fieldName];

    if (isActive || hasValue) {
      // Активное состояние - с полем ввода
      return (
        <div data-layer="InputContainerWithoutButton" data-state="pressed" className="Inputcontainerwithoutbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
              <input
                type="text"
                value={fieldValues[fieldName] || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                onBlur={() => handleFieldBlur(fieldName)}
                autoFocus={isActive}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  color: '#071222',
                  paddingLeft: 0,
                  marginLeft: 0
                }}
              />
            </div>
          </div>
        </div>
      );
    } else {
      // Обычное состояние - только название
      return (
        <div data-layer="InputContainerWithoutButton" data-state="not_pressed" className="Inputcontainerwithoutbutton" onClick={() => handleFieldClick(fieldName)} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        </div>
      );
    }
  };

  if (currentView === 'gender') {
    return <Gender onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('gender', value)} />;
  }

  if (currentView === 'sectorCode') {
    return <SectorCode onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('sectorCode', value)} />;
  }

  if (currentView === 'country') {
    return <Country onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('country', value)} />;
  }

  if (currentView === 'region') {
    return <Region onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('region', value)} />;
  }

  if (currentView === 'settlementType') {
    return <SettlementType onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('settlementType', value)} />;
  }

  if (currentView === 'city') {
    return <City onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('city', value)} />;
  }

  if (currentView === 'docType') {
    return <DocType onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('docType', value)} />;
  }

  if (currentView === 'issuedBy') {
    return <IssuedBy onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('issuedBy', value)} />;
  }

  if (currentView === 'clientType') {
    return <ClientType onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('clientType', value)} />;
  }

  return (
    <div data-layer="Policyholder data page" className="PolicyholderDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, alignSelf: 'stretch', background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Back button" className="BackButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
      <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
        </svg>
      </div>
    </div>
    <div data-layer="OpenDocument button" className="OpendocumentButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
      <div data-layer="File" className="File" style={{width: 22, height: 22, left: 31, top: 32, position: 'absolute'}}>
        <div data-svg-wrapper data-layer="Frame 1321316875" className="Frame1321316875" style={{left: 3, top: 1, position: 'absolute'}}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0L16.001 6V18.001C16.0009 19.1008 15.1008 20.0008 14.001 20.001H1.99023C0.890252 20.001 0.000107007 19.1009 0 18.001L0.00976562 2C0.00980161 0.900011 0.900014 4.85053e-05 2 0H10ZM2.00293 2V18.001H14.0039V7H9.00293V2H2.00293Z" fill="black"/>
          <line x1="4.00049" y1="11.2505" x2="12.0008" y2="11.2505" stroke="black" strokeWidth="1.5"/>
          <line x1="4.00049" y1="15.2508" x2="10.0008" y2="15.2508" stroke="black" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div data-layer="Policyholder data" className="PolicyholderData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страхователь</div>
        <div data-layer="Button container" className="ButtonContainer" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
          <div data-layer="Application section transition buttons" className="ApplicationSectionTransitionButtons" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Next Button" className="NextButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderRight: '1px #F8E8E8 solid'}}>
              <div data-svg-wrapper data-layer="Chewron down" className="ChewronDown" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div data-layer="Previous Button" className="PreviousButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
              <div data-svg-wrapper data-layer="Chewron up" className="ChewronUp" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 15.5L11 7.5L18.5 15.5" stroke="black" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          <div data-layer="Save button" data-state="pressed" className="SaveButton" onClick={handleHeaderButtonClick} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
            <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getHeaderButtonText()}</div>
          </div>
        </div>
      </div>
    </div>
    {/* Alert для уведомлений */}
    {!toggleStates.manualInput && (autoModeState === 'request_sent' || autoModeState === 'response_received') && (
      <div data-layer="Alert" className="Alert" style={{alignSelf: 'stretch', height: 85, paddingRight: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Info container" className="InfoContainer" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_491_9703)">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.916748 10.9998C0.916748 5.43083 5.43107 0.916504 11.0001 0.916504C16.5691 0.916504 21.0834 5.43083 21.0834 10.9998C21.0834 16.5688 16.5691 21.0832 11.0001 21.0832C5.43107 21.0832 0.916748 16.5688 0.916748 10.9998ZM11.0001 2.74984C6.44359 2.74984 2.75008 6.44335 2.75008 10.9998C2.75008 15.5563 6.44359 19.2498 11.0001 19.2498C15.5566 19.2498 19.2501 15.5563 19.2501 10.9998C19.2501 6.44335 15.5566 2.74984 11.0001 2.74984ZM10.0742 7.33317C10.0742 6.82691 10.4847 6.4165 10.9909 6.4165H11.0001C11.5063 6.4165 11.9167 6.82691 11.9167 7.33317C11.9167 7.83943 11.5063 8.24984 11.0001 8.24984H10.9909C10.4847 8.24984 10.0742 7.83943 10.0742 7.33317ZM11.0001 10.0832C11.5063 10.0832 11.9167 10.4936 11.9167 10.9998V14.6665C11.9167 15.1728 11.5063 15.5832 11.0001 15.5832C10.4938 15.5832 10.0834 15.1728 10.0834 14.6665V10.9998C10.0834 10.4936 10.4938 10.0832 11.0001 10.0832Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_491_9703">
            <rect width="22" height="22" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>
        </div>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
          {autoModeState === 'request_sent' 
            ? 'На номер будет отправлено СМС для получения согласия, клиенту необходимо ответить 511'
            : 'Нажмите на обновить, чтобы получить данные детей клиента'}
        </div>
      </div>
    )}
    <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div data-layer="ManualToggleButton" data-state={toggleStates.manualInput ? "pressed" : "not_pressed"} className="Manualtogglebutton" onClick={() => handleToggleClick('manualInput')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Ручной ввод данных</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill={toggleStates.manualInput ? "black" : "#E0E0E0"}/>
            <circle cx={toggleStates.manualInput ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      {/* Условный рендеринг полей в зависимости от режима */}
      {toggleStates.manualInput ? (
        // Ручной ввод включен - показываем все поля
        <>
          {renderInputField('iin', 'ИИН')}
          {renderInputField('phone', 'Номер телефона')}
          {renderInputField('lastName', 'Фамилия')}
          {renderInputField('firstName', 'Имя')}
          {renderInputField('middleName', 'Отчество')}
          {renderCalendarField('birthDate', 'Дата рождения')}
          {renderDictionaryButton('gender', 'Пол', handleOpenGender, !!dictionaryValues.gender)}
          {renderDictionaryButton('sectorCode', 'Код сектора экономики', handleOpenSectorCode, !!dictionaryValues.sectorCode)}
          {renderDictionaryButton('country', 'Страна', handleOpenCountry, !!dictionaryValues.country)}
          {renderDictionaryButton('region', 'Область', handleOpenRegion, !!dictionaryValues.region)}
          {renderDictionaryButton('settlementType', 'Вид населенного пункта', handleOpenSettlementType, !!dictionaryValues.settlementType)}
          {renderDictionaryButton('city', 'Город', handleOpenCity, !!dictionaryValues.city)}
          {renderInputField('street', 'Улица')}
          {renderInputField('microdistrict', 'Микрорайон')}
          {renderInputField('houseNumber', '№ дома')}
          {renderInputField('apartmentNumber', '№ квартиры')}
          {renderDictionaryButton('docType', 'Тип документа', handleOpenDocType, !!dictionaryValues.docType)}
          {renderInputField('documentNumber', 'Номер документа')}
          {renderDictionaryButton('issuedBy', 'Кем выдано', handleOpenIssuedBy, !!dictionaryValues.issuedBy)}
          {renderCalendarField('issueDate', 'Выдан от')}
          {renderCalendarField('expiryDate', 'Действует до')}
          <div data-layer="ПризнакПДЛ ToggleButton" data-state={toggleStates.pdl ? "pressed" : "not_pressed"} className="Togglebutton" onClick={() => handleToggleClick('pdl')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
            <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Признак ПДЛ</div>
            </div>
            <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
                <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="16" rx="8" fill={toggleStates.pdl ? "black" : "#E0E0E0"}/>
                <circle cx={toggleStates.pdl ? "24" : "8"} cy="8" r="6" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          {renderDictionaryButton('clientType', 'Тип клиента', handleOpenClientType, !!dictionaryValues.clientType)}
        </>
      ) : (
        // Ручной ввод выключен - показываем поля в зависимости от состояния
        <>
          {renderInputField('iin', 'ИИН')}
          {renderInputField('phone', 'Номер телефона')}
          {/* В состоянии data_loaded показываем все остальные поля */}
          {autoModeState === 'data_loaded' && (
            <>
              {renderInputField('lastName', 'Фамилия')}
              {renderInputField('firstName', 'Имя')}
              {renderInputField('middleName', 'Отчество')}
              {renderCalendarField('birthDate', 'Дата рождения')}
              {renderDictionaryButton('gender', 'Пол', handleOpenGender, !!dictionaryValues.gender)}
              {renderDictionaryButton('sectorCode', 'Код сектора экономики', handleOpenSectorCode, !!dictionaryValues.sectorCode)}
              {renderDictionaryButton('country', 'Страна', handleOpenCountry, !!dictionaryValues.country)}
              {renderDictionaryButton('region', 'Область', handleOpenRegion, !!dictionaryValues.region)}
              {renderDictionaryButton('settlementType', 'Вид населенного пункта', handleOpenSettlementType, !!dictionaryValues.settlementType)}
              {renderDictionaryButton('city', 'Город', handleOpenCity, !!dictionaryValues.city)}
              {renderInputField('street', 'Улица')}
              {renderInputField('microdistrict', 'Микрорайон')}
              {renderInputField('houseNumber', '№ дома')}
              {renderInputField('apartmentNumber', '№ квартиры')}
              {renderDictionaryButton('docType', 'Тип документа', handleOpenDocType, !!dictionaryValues.docType)}
              {renderInputField('documentNumber', 'Номер документа')}
              {renderDictionaryButton('issuedBy', 'Кем выдано', handleOpenIssuedBy, !!dictionaryValues.issuedBy)}
              {renderCalendarField('issueDate', 'Выдан от')}
              {renderCalendarField('expiryDate', 'Действует до')}
              <div data-layer="ПризнакПДЛ ToggleButton" data-state={toggleStates.pdl ? "pressed" : "not_pressed"} className="Togglebutton" onClick={() => handleToggleClick('pdl')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
                <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                  <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Признак ПДЛ</div>
                </div>
                <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
                  <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="16" rx="8" fill={toggleStates.pdl ? "black" : "#E0E0E0"}/>
                    <circle cx={toggleStates.pdl ? "24" : "8"} cy="8" r="6" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              {renderDictionaryButton('clientType', 'Тип клиента', handleOpenClientType, !!dictionaryValues.clientType)}
            </>
          )}
        </>
      )}
    </div>
  </div>
</div>
  );
};

export default Policyholder;