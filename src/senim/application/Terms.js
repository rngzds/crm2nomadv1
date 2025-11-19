import React, { useState, useEffect } from 'react';
import InsuranceProduct from '../dictionary/InsuranceProduct';
import FrequencyPayment from '../dictionary/FrequencyPayment';
import { loadGlobalApplicationData, updateGlobalApplicationSection } from '../../services/storageService';

const Terms = ({ onBack, onNext, onPrevious, onSave, applicationId }) => {
  const [currentView, setCurrentView] = useState('main');
  const [dictionaryValues, setDictionaryValues] = useState({
    insuranceProduct: '',
    frequencyPayment: ''
  });
  const [toggleStates, setToggleStates] = useState({
    flightAndAccommodation: false
  });
  
  // Состояние для полей с календарем
  const [dateValues, setDateValues] = useState({
    startDate: '',
    endDate: ''
  });
  
  // Состояние для отслеживания активного поля
  const [activeField, setActiveField] = useState(null);
  
  // Флаг для предотвращения сохранения при начальной загрузке
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Загрузка данных из глобального хранилища при монтировании
  useEffect(() => {
    if (applicationId) {
      const globalData = loadGlobalApplicationData(applicationId);
      if (globalData && globalData.Terms) {
        const savedData = globalData.Terms;
        console.log('📖 [УСЛОВИЯ] Загружено из глобального хранилища:', savedData);
        if (savedData.dictionaryValues) setDictionaryValues(savedData.dictionaryValues);
        if (savedData.toggleStates) setToggleStates(savedData.toggleStates);
        if (savedData.dateValues) setDateValues(savedData.dateValues);
      }
    }
    setIsInitialLoad(false);
  }, [applicationId]);

  // Автоматическое сохранение данных в глобальное хранилище при их изменении
  useEffect(() => {
    if (!isInitialLoad && applicationId) {
      const termsData = {
        dictionaryValues,
        toggleStates,
        dateValues
      };
      console.log('💾 [УСЛОВИЯ] Автосохранение в глобальное хранилище:', termsData);
      updateGlobalApplicationSection('Terms', termsData, applicationId);
    }
  }, [dictionaryValues, toggleStates, dateValues, isInitialLoad, applicationId]);

  const handleBackToMain = () => setCurrentView('main');
  const handleOpenInsuranceProduct = () => setCurrentView('insuranceProduct');
  const handleOpenFrequencyPayment = () => setCurrentView('frequencyPayment');

  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

  const handleToggleClick = (toggleName) => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  // Активация поля при клике
  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleSave = () => {
    const termsData = {
      dictionaryValues,
      toggleStates,
      dateValues
    };
    
    // Сохраняем в глобальное хранилище
    if (applicationId) {
      console.log('💾 [УСЛОВИЯ] Сохранение по кнопке:', termsData);
      updateGlobalApplicationSection('Terms', termsData, applicationId);
    }
    
    if (onSave) {
      onSave({
        ...dictionaryValues,
        ...toggleStates,
        ...dateValues
      });
    }
    if (onBack) {
      onBack();
    }
  };

  const getInsuranceAmount = () => {
    if (!dictionaryValues.insuranceProduct) {
      return null;
    }
    // Извлекаем число из названия программы (например, "«CEHIM» Бизнес 150" → 150)
    const match = dictionaryValues.insuranceProduct.match(/(\d+)/);
    if (match) {
      const amount = parseInt(match[1], 10);
      return `${amount} 000 USD`;
    }
    return null;
  };

  const getTransplantationAmount = () => {
    if (!dictionaryValues.insuranceProduct) {
      return null;
    }
    // Извлекаем число из названия программы (например, "«CEHIM» Бизнес 150" → 150)
    const match = dictionaryValues.insuranceProduct.match(/(\d+)/);
    if (match) {
      const programNumber = parseInt(match[1], 10);
      if (programNumber === 150) {
        return '500 000 USD';
      } else if (programNumber === 200 || programNumber === 250) {
        return '1 000 000 USD';
      }
    }
    return null;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
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
              <g clipPath="url(#clip0_373_4125)">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.33337 0.916992C7.83963 0.916992 8.25004 1.3274 8.25004 1.83366V2.75033H13.75V1.83366C13.75 1.3274 14.1604 0.916992 14.6667 0.916992C15.173 0.916992 15.5834 1.3274 15.5834 1.83366V2.75033H17.4167C18.1461 2.75033 18.8455 3.04006 19.3613 3.55578C19.877 4.07151 20.1667 4.77098 20.1667 5.50033V18.3337C20.1667 19.063 19.877 19.7625 19.3613 20.2782C18.8455 20.7939 18.1461 21.0837 17.4167 21.0837H4.58337C3.85403 21.0837 3.15456 20.7939 2.63883 20.2782C2.12311 19.7625 1.83337 19.063 1.83337 18.3337V5.50033C1.83337 4.77098 2.12311 4.07151 2.63883 3.55578C3.15456 3.04006 3.85403 2.75033 4.58337 2.75033H6.41671V1.83366C6.41671 1.3274 6.82711 0.916992 7.33337 0.916992ZM6.41671 4.58366H4.58337C4.34026 4.58366 4.1071 4.68024 3.93519 4.85214C3.76328 5.02405 3.66671 5.25721 3.66671 5.50033V8.25033H18.3334V5.50033C18.3334 5.25721 18.2368 5.02405 18.0649 4.85214C17.893 4.68024 17.6598 4.58366 17.4167 4.58366H15.5834V5.50033C15.5834 6.00659 15.173 6.41699 14.6667 6.41699C14.1604 6.41699 13.75 6.00659 13.75 5.50033V4.58366H8.25004V5.50033C8.25004 6.00659 7.83963 6.41699 7.33337 6.41699C6.82711 6.41699 6.41671 6.00659 6.41671 5.50033V4.58366ZM18.3334 10.0837H3.66671V18.3337C3.66671 18.5768 3.76328 18.8099 3.93519 18.9818C4.1071 19.1537 4.34026 19.2503 4.58337 19.2503H17.4167C17.6598 19.2503 17.893 19.1537 18.0649 18.9818C18.2368 18.8099 18.3334 18.5768 18.3334 18.3337V10.0837Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0_373_4125">
              <rect width="22" height="22" fill="white"/>
              </clipPath>
              </defs>
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
              <g clipPath="url(#clip0_373_136)">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.33337 0.916992C7.83963 0.916992 8.25004 1.3274 8.25004 1.83366V2.75033H13.75V1.83366C13.75 1.3274 14.1604 0.916992 14.6667 0.916992C15.173 0.916992 15.5834 1.3274 15.5834 1.83366V2.75033H17.4167C18.1461 2.75033 18.8455 3.04006 19.3613 3.55578C19.877 4.07151 20.1667 4.77098 20.1667 5.50033V18.3337C20.1667 19.063 19.877 19.7625 19.3613 20.2782C18.8455 20.7939 18.1461 21.0837 17.4167 21.0837H4.58337C3.85403 21.0837 3.15456 20.7939 2.63883 20.2782C2.12311 19.7625 1.83337 19.063 1.83337 18.3337V5.50033C1.83337 4.77098 2.12311 4.07151 2.63883 3.55578C3.15456 3.04006 3.85403 2.75033 4.58337 2.75033H6.41671V1.83366C6.41671 1.3274 6.82711 0.916992 7.33337 0.916992ZM6.41671 4.58366H4.58337C4.34026 4.58366 4.1071 4.68024 3.93519 4.85214C3.76328 5.02405 3.66671 5.25721 3.66671 5.50033V8.25033H18.3334V5.50033C18.3334 5.25721 18.2368 5.02405 18.0649 4.85214C17.893 4.68024 17.6598 4.58366 17.4167 4.58366H15.5834V5.50033C15.5834 6.00659 15.173 6.41699 14.6667 6.41699C14.1604 6.41699 13.75 6.00659 13.75 5.50033V4.58366H8.25004V5.50033C8.25004 6.00659 7.83963 6.41699 7.33337 6.41699C6.82711 6.41699 6.41671 6.00659 6.41671 5.50033V4.58366ZM18.3334 10.0837H3.66671V18.3337C3.66671 18.5768 3.76328 18.8099 3.93519 18.9818C4.1071 19.1537 4.34026 19.2503 4.58337 19.2503H17.4167C17.6598 19.2503 17.893 19.1537 18.0649 18.9818C18.2368 18.8099 18.3334 18.5768 18.3334 18.3337V10.0837Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0_373_136">
              <rect width="22" height="22" fill="white"/>
              </clipPath>
              </defs>
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

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

  if (currentView === 'insuranceProduct') {
    return <InsuranceProduct onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('insuranceProduct', value)} />;
  }

  if (currentView === 'frequencyPayment') {
    return <FrequencyPayment onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('frequencyPayment', value)} />;
  }

  return (
    <div data-layer="Statements" className="Statements" style={{width: 1512, height: 1067, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Back button" className="BackButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
      <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  </div>
  <div data-layer="Sections Right" className="SectionsRight" style={{width: 1427, alignSelf: 'stretch', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Sections" className="Sections" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Условия</div>
          <div data-layer="Button container" className="ButtonContainer" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Application section transition buttons" className="ApplicationSectionTransitionButtons" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
              <div data-layer="Next Button" className="NextButton" onClick={onNext} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', cursor: 'pointer'}}>
                <div data-svg-wrapper data-layer="Chewron down" className="ChewronDown" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div data-layer="Previous Button" className="PreviousButton" onClick={onPrevious} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
                <div data-svg-wrapper data-layer="Chewron up" className="ChewronUp" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 15.5L11 7.5L18.5 15.5" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
            <div data-layer="Button" data-state="pressed" className="Button" onClick={handleSave} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
              <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="Alert" className="Alert" style={{width: 1427, height: 85, paddingRight: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Info container" className="InfoContainer" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_373_900)">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.916656 11.0003C0.916656 5.43131 5.43098 0.916992 11 0.916992C16.569 0.916992 21.0833 5.43131 21.0833 11.0003C21.0833 16.5693 16.569 21.0837 11 21.0837C5.43098 21.0837 0.916656 16.5693 0.916656 11.0003ZM11 2.75033C6.4435 2.75033 2.74999 6.44384 2.74999 11.0003C2.74999 15.5568 6.4435 19.2503 11 19.2503C15.5565 19.2503 19.25 15.5568 19.25 11.0003C19.25 6.44384 15.5565 2.75033 11 2.75033ZM10.0742 7.33366C10.0742 6.8274 10.4846 6.41699 10.9908 6.41699H11C11.5063 6.41699 11.9167 6.8274 11.9167 7.33366C11.9167 7.83992 11.5063 8.25033 11 8.25033H10.9908C10.4846 8.25033 10.0742 7.83992 10.0742 7.33366ZM11 10.0837C11.5063 10.0837 11.9167 10.4941 11.9167 11.0003V14.667C11.9167 15.1733 11.5063 15.5837 11 15.5837C10.4937 15.5837 10.0833 15.1733 10.0833 14.667V11.0003C10.0833 10.4941 10.4937 10.0837 11 10.0837Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_373_900">
            <rect width="22" height="22" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>
        </div>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Расчет страховой премии будет произведен после заполнения Анкеты</div>
      </div>
      {renderDictionaryButton('insuranceProduct', 'Программа страхования', handleOpenInsuranceProduct, !!dictionaryValues.insuranceProduct)}
      <div data-layer="Input Field" data-state={toggleStates.flightAndAccommodation ? "pressed" : "not_pressed"} className="InputField" onClick={() => handleToggleClick('flightAndAccommodation')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Включите, если будет перелет и проживание для Застрахованного и 1 одного сопровождающего</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill={toggleStates.flightAndAccommodation ? "black" : "#E0E0E0"}/>
            <circle cx={toggleStates.flightAndAccommodation ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      {dictionaryValues.insuranceProduct && (
        <>
          {getInsuranceAmount() ? (
            <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страховая сумма</div>
                <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getInsuranceAmount()}</div>
              </div>
            </div>
          ) : (
            <div data-layer="Input Field" data-state="not_pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, opacity: 0.50, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страховая сумма</div>
              </div>
            </div>
          )}
          {getTransplantationAmount() ? (
            <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страховая сумма по трансплантации</div>
                <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getTransplantationAmount()}</div>
              </div>
            </div>
          ) : (
            <div data-layer="Input Field" data-state="not_pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, opacity: 0.50, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страховая сумма по трансплантации</div>
              </div>
            </div>
          )}
        </>
      )}
      {renderDictionaryButton('frequencyPayment', 'Порядок оплаты', handleOpenFrequencyPayment, !!dictionaryValues.frequencyPayment)}
      <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Период страхования</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>12 месяцев</div>
        </div>
      </div>
      <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата заключения</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getCurrentDate()}</div>
        </div>
      </div>
      {renderCalendarField('startDate', 'Дата начала')}
      {renderCalendarField('endDate', 'Дата окончания')}
    </div>
  </div>
  </div>
  );
};

export default Terms;