import React, { useState, useEffect } from 'react';
import FamilyTies from '../dictionary/FamilyTies';
import SelectChild from '../dictionary/SelectChild';
import Gender from '../dictionary/Gender';
import SectorCode from '../dictionary/SectorCode';
import Country from '../dictionary/Country';
import Region from '../dictionary/Region';
import SettlementType from '../dictionary/SettlementType';
import City from '../dictionary/City';
import DocType from '../dictionary/DocType';
import IssuedBy from '../dictionary/IssuedBy';

const Insured = ({ onBack, policyholderData, onSave }) => {
  const [currentView, setCurrentView] = useState('main');

  // Основные состояния
  const [manualInput, setManualInput] = useState(false);
  const [isPolicyholderInsured, setIsPolicyholderInsured] = useState(false);
  const [familyTies, setFamilyTies] = useState(''); // '' | 'no' | 'own' | 'other'
  const [autoModeState, setAutoModeState] = useState('initial'); // 'initial' | 'request_sent' | 'response_received' | 'data_loaded'
  const [selectedChild, setSelectedChild] = useState('');

  // Состояние для полей ввода
  const [fieldValues, setFieldValues] = useState({
    iin: '',
    phone: '',
    parentIin: '',
    parentPhone: '',
    lastName: '',
    firstName: '',
    middleName: '',
    street: '',
    microdistrict: '',
    houseNumber: '',
    apartmentNumber: '',
    documentNumber: ''
  });

  // Состояние для дат
  const [dateValues, setDateValues] = useState({
    birthDate: '',
    issueDate: '',
    expiryDate: ''
  });

  // Состояние для справочников
  const [dictionaryValues, setDictionaryValues] = useState({
    gender: '',
    sectorCode: '',
    country: '',
    region: '',
    settlementType: '',
    city: '',
    docType: '',
    issuedBy: ''
  });

  // Состояние для toggle кнопок
  const [toggleStates, setToggleStates] = useState({
    pdl: false
  });

  // Состояние для активного поля
  const [activeField, setActiveField] = useState(null);

  // Используем useEffect для предотвращения предупреждения о неиспользуемом импорте
  useEffect(() => {
    // Заглушка для предотвращения предупреждения ESLint
  }, []);

  // Обработчик переключения manualInput
  const handleToggleManualInput = () => {
    const newValue = !manualInput;
    setManualInput(newValue);
    
    // При переключении с false на true - очищаем данные
    if (newValue) {
      setFieldValues({
        iin: '',
        phone: '',
        parentIin: '',
        parentPhone: '',
        lastName: '',
        firstName: '',
        middleName: '',
        street: '',
        microdistrict: '',
        houseNumber: '',
        apartmentNumber: '',
        documentNumber: ''
      });
      setDateValues({
        birthDate: '',
        issueDate: '',
        expiryDate: ''
      });
      setDictionaryValues({
        gender: '',
        sectorCode: '',
        country: '',
        region: '',
        settlementType: '',
        city: '',
        docType: '',
        issuedBy: ''
      });
      setAutoModeState('initial');
      // selectedChild не очищаем, если он уже выбран
    } else {
      // При переключении с true на false - сбрасываем autoModeState
      setAutoModeState('initial');
    }
  };

  // Обработчик переключения isPolicyholderInsured
  const handleTogglePolicyholderInsured = () => {
    const newValue = !isPolicyholderInsured;
    setIsPolicyholderInsured(newValue);
    
    // Если переключаем в true, копируем данные из Policyholder
    if (newValue && policyholderData) {
      setFieldValues(prev => ({
        ...prev,
        iin: policyholderData.iin || prev.iin,
        phone: policyholderData.phone || prev.phone,
        lastName: policyholderData.lastName || prev.lastName,
        firstName: policyholderData.firstName || prev.firstName,
        middleName: policyholderData.middleName || prev.middleName,
        street: policyholderData.street || prev.street,
        microdistrict: policyholderData.microdistrict || prev.microdistrict,
        houseNumber: policyholderData.houseNumber || prev.houseNumber,
        apartmentNumber: policyholderData.apartmentNumber || prev.apartmentNumber,
        documentNumber: policyholderData.documentNumber || prev.documentNumber
      }));
      setDateValues(prev => ({
        ...prev,
        birthDate: policyholderData.birthDate || prev.birthDate,
        issueDate: policyholderData.issueDate || prev.issueDate,
        expiryDate: policyholderData.expiryDate || prev.expiryDate
      }));
      setDictionaryValues(prev => ({
        ...prev,
        gender: policyholderData.gender || prev.gender,
        sectorCode: policyholderData.sectorCode || prev.sectorCode,
        country: policyholderData.country || prev.country,
        region: policyholderData.region || prev.region,
        settlementType: policyholderData.settlementType || prev.settlementType,
        city: policyholderData.city || prev.city,
        docType: policyholderData.docType || prev.docType,
        issuedBy: policyholderData.issuedBy || prev.issuedBy
      }));
    }
  };

  // Обработчик изменения familyTies
  const handleFamilyTiesChange = (value) => {
    // Определяем значение из отображаемого текста
    let newFamilyTies = 'no';
    if (value === 'Для своего ребёнка') {
      newFamilyTies = 'own';
    } else if (value === 'Для иного ребёнка') {
      newFamilyTies = 'other';
    }
    
    setFamilyTies(newFamilyTies);
    setAutoModeState('initial');
    setSelectedChild('');
    
    // Если "Для своего ребёнка" и manualInput=false, автоматически отправляем запрос
    if (newFamilyTies === 'own' && !manualInput) {
      handleSendRequestForOwnChild();
    }
  };

  // Отправка запроса для "Для своего ребёнка"
  const handleSendRequestForOwnChild = () => {
    // TODO: Отправить запрос на сервер для получения детей
    // Симуляция: через 2 секунды получаем ответ
    setTimeout(() => {
      setAutoModeState('data_loaded');
      // В реальности здесь будет загрузка данных детей
    }, 2000);
  };

  // Отправка запроса (для "Нет" и "Для иного ребёнка")
  const handleSendRequest = () => {
    setAutoModeState('request_sent');
    
    // Симуляция получения ответа через 2 секунды
    setTimeout(() => {
      setAutoModeState('response_received');
    }, 2000);
  };

  // Обновление данных (для "Нет" и "Для иного ребёнка")
  const handleUpdate = () => {
    // Симуляция загрузки данных с сервера
    if (familyTies === 'no') {
      // Для "Нет" - заполняем данные застрахованного
      setFieldValues(prev => ({
        ...prev,
        iin: prev.iin || '940 218 300 972',
        phone: prev.phone || '+7 707 759 10 10',
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
        issuedBy: 'МВД РК'
      }));
    } else if (familyTies === 'other') {
      // Для "Для иного ребёнка" - заполняем данные родителя/опекуна
      setFieldValues(prev => ({
        ...prev,
        parentIin: prev.parentIin || '940 218 300 972',
        parentPhone: prev.parentPhone || '+7 707 759 10 10'
      }));
      // После обновления данных родителя, нужно будет выбрать ребёнка
    }
    
    setAutoModeState('data_loaded');
  };

  // Обработчики для справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

  const handleBackToMain = () => setCurrentView('main');
  const handleOpenFamilyTies = () => setCurrentView('familyTies');
  const handleOpenSelectChild = () => setCurrentView('selectChild');
  const handleOpenGender = () => setCurrentView('gender');
  const handleOpenSectorCode = () => setCurrentView('sectorCode');
  const handleOpenCountry = () => setCurrentView('country');
  const handleOpenRegion = () => setCurrentView('region');
  const handleOpenSettlementType = () => setCurrentView('settlementType');
  const handleOpenCity = () => setCurrentView('city');
  const handleOpenDocType = () => setCurrentView('docType');
  const handleOpenIssuedBy = () => setCurrentView('issuedBy');

  // Обработчик выбора ребёнка
  const handleChildSelect = (value) => {
    setSelectedChild(value);
    setCurrentView('main');
    
    // Если выбрали ребёнка, загружаем его данные
    if (value) {
      setFieldValues(prev => ({
        ...prev,
        iin: '940 218 300 972',
        lastName: 'Иванов',
        firstName: 'Петр',
        middleName: 'Иванович',
        street: 'Абая',
        microdistrict: '-',
        houseNumber: '17',
        apartmentNumber: '12',
        documentNumber: '01002003'
      }));
      setDateValues(prev => ({
        ...prev,
        birthDate: '12.02.2000',
        issueDate: '01.01.2016',
        expiryDate: '01.01.2026'
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
        issuedBy: 'МВД РК'
      }));
    }
  };

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

  // Обработчик toggle ПДЛ
  const handleTogglePDL = () => {
    setToggleStates(prev => ({
      ...prev,
      pdl: !prev.pdl
    }));
  };

  // Функция для рендеринга поля ввода
  const renderInputField = (fieldName, label, isActive, hasValue, forceNotPressed = false) => {
    // Если isPolicyholderInsured=true, все поля должны быть pressed с данными (как в Insured-main-p=i.js)
    if (isPolicyholderInsured && hasValue) {
      return (
        <div data-layer="InputContainerWithoutButton" data-state="pressed" className="Inputcontainerwithoutbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{fieldValues[fieldName]}</div>
          </div>
        </div>
      );
    }
    
    if (isActive || hasValue) {
      return (
        <div data-layer="InputContainerWithoutButton" data-state="pressed" className="Inputcontainerwithoutbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
              <input
                type="text"
                value={fieldValues[fieldName]}
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
      return (
        <div data-layer="InputContainerWithoutButton" data-state="not_pressed" className="Inputcontainerwithoutbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}} onClick={() => handleFieldClick(fieldName)}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        </div>
      );
    }
  };

  // Функция для рендеринга кнопки справочника
  const renderDictionaryButton = (fieldName, label, value, onClick) => {
    const hasValue = !!value;
    // Если isPolicyholderInsured=true, все справочники с данными должны быть pressed (как в Insured-main-p=i.js)
    const dataState = isPolicyholderInsured && hasValue ? "pressed" : (hasValue ? "pressed" : "not_pressed");
    
    return (
      <div data-layer="InputContainerDictionaryButton" data-state={dataState} className="Inputcontainerdictionarybutton" onClick={onClick} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
        {hasValue ? (
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{value}</div>
          </div>
        ) : (
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        )}
        <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Функция для рендеринга календаря
  const renderCalendarField = (fieldName, label, value) => {
    const hasValue = !!value;
    // Если isPolicyholderInsured=true, все поля с данными должны быть pressed (как в Insured-main-p=i.js)
    const dataState = isPolicyholderInsured && hasValue ? "pressed" : (hasValue ? "pressed" : "not_pressed");
    
    return (
      <div data-layer="InputContainerCalendarButton" data-state={dataState} className="Inputcontainercalendarbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        {hasValue ? (
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{value}</div>
          </div>
        ) : (
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        )}
        <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.33301 0.916992C7.83927 0.916992 8.24967 1.3274 8.24967 1.83366V2.75033H13.7497V1.83366C13.7497 1.3274 14.1601 0.916992 14.6663 0.916992C15.1726 0.916992 15.583 1.3274 15.583 1.83366V2.75033H17.4163C18.1457 2.75033 18.8452 3.04006 19.3609 3.55578C19.8766 4.07151 20.1663 4.77098 20.1663 5.50033V18.3337C20.1663 19.063 19.8766 19.7625 19.3609 20.2782C18.8452 20.7939 18.1457 21.0837 17.4163 21.0837H4.58301C3.85366 21.0837 3.15419 20.7939 2.63846 20.2782C2.12274 19.7625 1.83301 19.063 1.83301 18.3337V5.50033C1.83301 4.77098 2.12274 4.07151 2.63846 3.55578C3.15419 3.04006 3.85366 2.75033 4.58301 2.75033H6.41634V1.83366C6.41634 1.3274 6.82675 0.916992 7.33301 0.916992ZM6.41634 4.58366H4.58301C4.33989 4.58366 4.10673 4.68024 3.93483 4.85214C3.76292 5.02405 3.66634 5.25721 3.66634 5.50033V8.25033H18.333V5.50033C18.333 5.25721 18.2364 5.02405 18.0645 4.85214C17.8926 4.68024 17.6595 4.58366 17.4163 4.58366H15.583V5.50033C15.583 6.00659 15.1726 6.41699 14.6663 6.41699C14.1601 6.41699 13.7497 6.00659 13.7497 5.50033V4.58366H8.24967V5.50033C8.24967 6.00659 7.83927 6.41699 7.33301 6.41699C6.82675 6.41699 6.41634 6.00659 6.41634 5.50033V4.58366ZM18.333 10.0837H3.66634V18.3337C3.66634 18.5768 3.76292 18.8099 3.93483 18.9818C4.10673 19.1537 4.33989 19.2503 4.58301 19.2503H17.4163C17.6595 19.2503 17.8926 19.1537 18.0645 18.9818C18.2364 18.8099 18.333 18.5768 18.333 18.3337V10.0837Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Функция для рендеринга toggle кнопки
  const renderToggleButton = (label, isPressed, onClick) => {
    return (
      <div data-layer="InputContainerToggleButton" data-state={isPressed ? "pressed" : "not_pressed"} className="Inputcontainertogglebutton" onClick={onClick} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill={isPressed ? "black" : "#E0E0E0"}/>
            <circle cx={isPressed ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Определение текста кнопки в заголовке
  const getHeaderButtonText = () => {
    // Если familyTies не выбран - кнопка "Сохранить"
    if (!familyTies || familyTies === '') {
      return 'Сохранить';
    }
    
    if (manualInput) {
      return 'Сохранить';
    }
    
    if (familyTies === 'own') {
      return 'Сохранить';
    }
    
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
    // Если familyTies не выбран - просто сохраняем текущее состояние (или ничего не делаем?)
    if (!familyTies || familyTies === '') {
      // Можно сохранить или просто ничего не делать
      // Пока оставляем возможность сохранить, но возможно нужно будет отключить кнопку
      if (onSave) {
        onSave({
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates,
          familyTies,
          selectedChild,
          isPolicyholderInsured
        });
      }
      if (onBack) {
        onBack();
      }
      return;
    }
    
    if (manualInput) {
      // Сохранение данных
      if (onSave) {
        onSave({
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates,
          familyTies,
          selectedChild,
          isPolicyholderInsured
        });
      }
      if (onBack) {
        onBack();
      }
      return;
    }
    
    if (familyTies === 'own') {
      // Сохранение для "Для своего ребёнка"
      if (onSave) {
        onSave({
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates,
          familyTies,
          selectedChild,
          isPolicyholderInsured
        });
      }
      if (onBack) {
        onBack();
      }
      return;
    }
    
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
          ...toggleStates,
          familyTies,
          selectedChild,
          isPolicyholderInsured
        });
      }
      if (onBack) {
        onBack();
      }
    }
  };

  // Определение видимости полей
  const shouldShowField = (fieldName) => {
    // Если "Страхователь является Застрахованным" включен - показываем все поля (как в Insured-main-p=i.js)
    if (isPolicyholderInsured) {
      return true;
    }
    
    // Если familyTies не выбран - не показываем никакие поля (только toggle и справочник)
    if (!familyTies || familyTies === '') {
      return false;
    }
    
    // Если "Страхователь является Застрахованным" включен - показываем все поля (в ручном режиме все not_pressed)
    if (isPolicyholderInsured && manualInput) {
      return true;
    }
    
    // Если ручной ввод включен - показываем все поля
    if (manualInput) {
      return true;
    }
    
    // Для "Нет"
    if (familyTies === 'no') {
      if (autoModeState === 'initial' || autoModeState === 'request_sent' || autoModeState === 'response_received') {
        // Показываем только ИИН и телефон
        return fieldName === 'iin' || fieldName === 'phone';
      }
      // В data_loaded показываем все поля
      if (autoModeState === 'data_loaded') {
        return true;
      }
      return false;
    }
    
    // Для "Для иного ребёнка"
    if (familyTies === 'other') {
      // ИИН и телефон родителя показываем всегда (уже обрабатывается отдельно)
      // Основные поля показываем только после выбора ребёнка
      if (fieldName === 'parentIin' || fieldName === 'parentPhone') {
        return false; // Обрабатывается отдельно
      }
      if (autoModeState === 'data_loaded' && selectedChild) {
        return true;
      }
      return false;
    }
    
    // Для "Для своего ребёнка"
    if (familyTies === 'own') {
      // Показываем все поля только если выбран ребёнок
      return selectedChild ? true : false;
    }
    
    return false;
  };

  // Определение текста Alert
  const getAlertText = () => {
    // Если familyTies не выбран - не показываем Alert
    if (!familyTies || familyTies === '') {
      return null;
    }
    
    if (manualInput) {
      return null;
    }
    
    if (autoModeState === 'request_sent') {
      return 'На номер будет отправлено СМС для получения согласия, клиенту необходимо ответить 511';
    }
    
    if (autoModeState === 'response_received') {
      if (familyTies === 'other') {
        return 'Нажмите на обновить, чтобы получить данные детей клиента';
      }
      return 'Нажмите на обновить, чтобы получить данные';
    }
    
    if (autoModeState === 'data_loaded' && familyTies === 'other' && !selectedChild) {
      return 'Данные детей получены. Выберите ребёнка';
    }
    
    return null;
  };

  // Маппинг familyTies для отображения
  const getFamilyTiesDisplay = () => {
    if (familyTies === 'own') return 'Для своего ребёнка';
    if (familyTies === 'other') return 'Для иного ребёнка';
    if (familyTies === 'no') return 'Нет';
    return ''; // Пустая строка для not_pressed состояния
  };

  // Определение, должны ли показываться все поля (для показа "Признак ПДЛ")
  const shouldShowAllFields = () => {
    // Если "Страхователь является Застрахованным" включен - все поля показываются
    if (isPolicyholderInsured) {
      return true;
    }
    
    // Если ручной ввод включен - все поля показываются
    if (manualInput) {
      return true;
    }
    
    // Если familyTies не выбран - поля не показываются
    if (!familyTies || familyTies === '') {
      return false;
    }
    
    // Для "Нет" - все поля показываются только когда данные загружены
    if (familyTies === 'no') {
      return autoModeState === 'data_loaded';
    }
    
    // Для "Для своего ребёнка" - все поля показываются только когда выбран ребёнок
    if (familyTies === 'own') {
      return !!selectedChild;
    }
    
    // Для "Для иного ребёнка" - все поля показываются только когда данные загружены и выбран ребёнок
    if (familyTies === 'other') {
      return autoModeState === 'data_loaded' && !!selectedChild;
    }
    
    return false;
  };

  // Рендеринг под-компонентов справочников
  if (currentView === 'familyTies') {
    return <FamilyTies onBack={handleBackToMain} onSelect={handleFamilyTiesChange} />;
  }

  if (currentView === 'selectChild') {
    return <SelectChild onBack={handleBackToMain} onSelect={handleChildSelect} />;
  }

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

  // Основной рендер
  return (
    <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
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
              <line x1="4" y1="11.251" x2="12.0004" y2="11.251" stroke="black" strokeWidth="1.5"/>
              <line x1="4" y1="15.251" x2="10.0003" y2="15.251" stroke="black" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="Insured data" className="InsuredData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Застрахованный</div>
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
        
        {/* Alert */}
        {getAlertText() && (
          <div data-layer="Alert" className="Alert" style={{alignSelf: 'stretch', height: 85, paddingRight: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div data-layer="Info container" className="InfoContainer" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_491_13427)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.916504 10.9993C0.916504 5.43034 5.43083 0.916016 10.9998 0.916016C16.5688 0.916016 21.0832 5.43034 21.0832 10.9993C21.0832 16.5684 16.5688 21.0827 10.9998 21.0827C5.43083 21.0827 0.916504 16.5684 0.916504 10.9993ZM10.9998 2.74935C6.44335 2.74935 2.74984 6.44286 2.74984 10.9993C2.74984 15.5558 6.44335 19.2494 10.9998 19.2494C15.5563 19.2494 19.2498 15.5558 19.2498 10.9993C19.2498 6.44286 15.5563 2.74935 10.9998 2.74935ZM10.074 7.33268C10.074 6.82642 10.4844 6.41602 10.9907 6.41602H10.9998C11.5061 6.41602 11.9165 6.82642 11.9165 7.33268C11.9165 7.83894 11.5061 8.24935 10.9998 8.24935H10.9907C10.4844 8.24935 10.074 7.83894 10.074 7.33268ZM10.9998 10.0827C11.5061 10.0827 11.9165 10.4931 11.9165 10.9993V14.666C11.9165 15.1723 11.5061 15.5827 10.9998 15.5827C10.4936 15.5827 10.0832 15.1723 10.0832 14.666V10.9993C10.0832 10.4931 10.4936 10.0827 10.9998 10.0827Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_491_13427">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>
            </div>
            <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getAlertText()}</div>
          </div>
        )}

        <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          {/* Toggle: Ручной ввод данных - НЕ показываем если isPolicyholderInsured = true */}
          {!isPolicyholderInsured && renderToggleButton('Ручной ввод данных', manualInput, handleToggleManualInput)}
          
          {/* Toggle: Страхователь является Застрахованным */}
          {renderToggleButton('Страхователь является Застрахованным', isPolicyholderInsured, handleTogglePolicyholderInsured)}
          
          {/* Справочник: Ребёнок является Застрахованным - НЕ показываем если isPolicyholderInsured = true */}
          {!isPolicyholderInsured && renderDictionaryButton('familyTies', 'Ребёнок является Застрахованным', getFamilyTiesDisplay(), handleOpenFamilyTies)}
          
          {/* Для "Для иного ребёнка": ИИН родителя и телефон родителя (НЕ показываем если isPolicyholderInsured = true) */}
          {!isPolicyholderInsured && familyTies === 'other' && (autoModeState === 'initial' || autoModeState === 'request_sent' || autoModeState === 'response_received' || autoModeState === 'data_loaded') && (
            <>
              {renderInputField('parentIin', 'ИИН родителя или опекуна', activeField === 'parentIin', !!fieldValues.parentIin)}
              {renderInputField('parentPhone', 'Номер телефона родителя или опекуна', activeField === 'parentPhone', !!fieldValues.parentPhone)}
            </>
          )}
          
          {/* Для "Для иного ребёнка": Кнопка выбора ребёнка (показываем только если автоматический режим, data_loaded, но НЕ если isPolicyholderInsured = true или manualInput = true) */}
          {!isPolicyholderInsured && !manualInput && familyTies === 'other' && autoModeState === 'data_loaded' && (
            renderDictionaryButton('selectChild', 'Выбрать ребёнка', selectedChild, handleOpenSelectChild)
          )}
          
          {/* Для "Для своего ребёнка": Кнопка выбора ребёнка (показываем только если автоматический режим, но НЕ если isPolicyholderInsured = true или manualInput = true) */}
          {!isPolicyholderInsured && !manualInput && familyTies === 'own' && (
            renderDictionaryButton('selectChild', 'Выбрать ребёнка', selectedChild, handleOpenSelectChild)
          )}
          
          {/* Основные поля (показываются в зависимости от состояния) */}
          {shouldShowField('iin') && renderInputField('iin', 'ИИН', activeField === 'iin', !!fieldValues.iin)}
          {shouldShowField('phone') && renderInputField('phone', 'Номер телефона', activeField === 'phone', !!fieldValues.phone)}
          {shouldShowField('lastName') && renderInputField('lastName', 'Фамилия', activeField === 'lastName', !!fieldValues.lastName)}
          {shouldShowField('firstName') && renderInputField('firstName', 'Имя', activeField === 'firstName', !!fieldValues.firstName)}
          {shouldShowField('middleName') && renderInputField('middleName', 'Отчество', activeField === 'middleName', !!fieldValues.middleName)}
          
          {/* Календарь: Дата рождения */}
          {shouldShowField('birthDate') && renderCalendarField('birthDate', 'Дата рождения', dateValues.birthDate)}
          
          {/* Справочники */}
          {shouldShowField('gender') && renderDictionaryButton('gender', 'Пол', dictionaryValues.gender, handleOpenGender)}
          {shouldShowField('sectorCode') && renderDictionaryButton('sectorCode', 'Код сектора экономики', dictionaryValues.sectorCode, handleOpenSectorCode)}
          {shouldShowField('country') && renderDictionaryButton('country', 'Страна', dictionaryValues.country, handleOpenCountry)}
          {shouldShowField('region') && renderDictionaryButton('region', 'Область', dictionaryValues.region, handleOpenRegion)}
          {shouldShowField('settlementType') && renderDictionaryButton('settlementType', 'Вид населенного пункта', dictionaryValues.settlementType, handleOpenSettlementType)}
          {shouldShowField('city') && renderDictionaryButton('city', 'Город', dictionaryValues.city, handleOpenCity)}
          
          {/* Поля адреса */}
          {shouldShowField('street') && renderInputField('street', 'Улица', activeField === 'street', !!fieldValues.street)}
          {shouldShowField('microdistrict') && renderInputField('microdistrict', 'Микрорайон', activeField === 'microdistrict', !!fieldValues.microdistrict)}
          {shouldShowField('houseNumber') && renderInputField('houseNumber', '№ дома', activeField === 'houseNumber', !!fieldValues.houseNumber)}
          {shouldShowField('apartmentNumber') && renderInputField('apartmentNumber', '№ квартиры', activeField === 'apartmentNumber', !!fieldValues.apartmentNumber)}
          
          {/* Документ */}
          {shouldShowField('docType') && renderDictionaryButton('docType', 'Тип документа', dictionaryValues.docType, handleOpenDocType)}
          {shouldShowField('documentNumber') && renderInputField('documentNumber', 'Номер документа', activeField === 'documentNumber', !!fieldValues.documentNumber)}
          {shouldShowField('issuedBy') && renderDictionaryButton('issuedBy', 'Кем выдано', dictionaryValues.issuedBy, handleOpenIssuedBy)}
          
          {/* Календари: Выдан от, Действует до */}
          {shouldShowField('issueDate') && renderCalendarField('issueDate', 'Выдан от', dateValues.issueDate)}
          {shouldShowField('expiryDate') && renderCalendarField('expiryDate', 'Действует до', dateValues.expiryDate)}
          
          {/* Toggle: Признак ПДЛ - показываем только когда все поля уже отображаются */}
          {shouldShowAllFields() && renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
        </div>
      </div>
    </div>
  );
};

export default Insured;
