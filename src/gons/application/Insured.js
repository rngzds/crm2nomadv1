import React, { useState, useEffect } from 'react';
import SelectChild from '../dictionary/SelectChild';
import Gender from '../dictionary/Gender';
import SectorCode from '../dictionary/SectorCode';
import Country from '../dictionary/Country';
import Region from '../dictionary/Region';
import SettlementType from '../dictionary/SettlementType';
import City from '../dictionary/City';
import DocType from '../dictionary/DocType';
import IssuedBy from '../dictionary/IssuedBy';
import ClientType from '../dictionary/ClientType';

const Insured = ({ onBack, policyholderData, onSave }) => {
  // Навигация
  const [currentView, setCurrentView] = useState('main'); // 'main', 'types', 'policyholder-insured', 'other-person', 'other-child', 'own-child', 'person-date', 'childs', 'child-date', 'other-child-final'
  const [selectedInsuredType, setSelectedInsuredType] = useState(''); // 'policyholder', 'other-person', 'other-child', 'own-child'
  
  // Состояния для разных типов
  const [manualInput, setManualInput] = useState(false); // для other-person и person-date
  const [manualInputChild, setManualInputChild] = useState(false); // для child-date
  const [autoModeState, setAutoModeState] = useState('initial'); // 'initial', 'request_sent', 'response_received', 'data_loaded'
  const [autoModeStatePerson, setAutoModeStatePerson] = useState('initial'); // для person-date
  const [selectedChild, setSelectedChild] = useState('');
  const [isAddingNewChild, setIsAddingNewChild] = useState(false);
  
  // Данные для родителя/опекуна (для other-child)
  const [parentData, setParentData] = useState({
    iin: '',
    phone: ''
  });
  
  // Данные для застрахованного
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
    documentNumber: '',
    documentFile: ''
  });

  // Даты
  const [dateValues, setDateValues] = useState({
    birthDate: '',
    issueDate: '',
    expiryDate: ''
  });

  // Справочники
  const [dictionaryValues, setDictionaryValues] = useState({
    gender: '',
    sectorCode: '',
    country: '',
    region: '',
    settlementType: '',
    city: '',
    docType: '',
    issuedBy: '',
    residency: 'Резидент',
    clientType: ''
  });

  // Toggle состояния
  const [toggleStates, setToggleStates] = useState({
    pdl: false
  });

  // Активное поле
  const [activeField, setActiveField] = useState(null);

  // Загружаем данные из policyholderData при выборе типа "Страхователь является застрахованным"
  useEffect(() => {
    if (currentView === 'policyholder-insured' && policyholderData) {
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
        issuedBy: policyholderData.issuedBy || prev.issuedBy,
        residency: policyholderData.residency || 'Резидент'
      }));
    }
  }, [currentView, policyholderData]);

  // Загружаем данные ребенка при переходе на child-date
  useEffect(() => {
    if (currentView === 'child-date') {
      if (selectedChild && !isAddingNewChild) {
        // Симуляция загрузки данных выбранного ребенка
        setFieldValues({
          iin: '940 218 300 972',
          phone: '',
          lastName: 'Иванов',
          firstName: 'Петр',
          middleName: 'Иванович',
          street: 'Абая',
          microdistrict: '-',
          houseNumber: '17',
          apartmentNumber: '12',
          documentNumber: '01002003'
        });
        setDateValues({
          birthDate: '12.02.2000',
          issueDate: '01.01.2016',
          expiryDate: '01.01.2026'
        });
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
      } else if (isAddingNewChild) {
        // Очищаем данные для нового ребенка
        setFieldValues({
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
        setDateValues({
          birthDate: '',
          issueDate: '',
          expiryDate: ''
        });
        setDictionaryValues(prev => ({
          ...prev,
          gender: '',
          sectorCode: '',
          country: '',
          region: '',
          settlementType: '',
          city: '',
          docType: '',
          issuedBy: ''
        }));
      }
    }
  }, [currentView, selectedChild, isAddingNewChild]);

  // Обработчики навигации
  const handleBackToMain = () => {
    if (currentView === 'types') {
      setCurrentView('main');
    } else if (currentView === 'person-date') {
      if (selectedInsuredType === 'other-child') {
        setCurrentView('other-child');
      }
    } else if (currentView === 'childs') {
      if (selectedInsuredType === 'other-child') {
        setCurrentView('other-child');
      } else if (selectedInsuredType === 'own-child') {
        setCurrentView('own-child');
      }
    } else if (currentView === 'child-date') {
      setCurrentView('childs');
    } else {
      setCurrentView('main');
    }
  };

  const handleOpenTypes = () => {
    setPreviousView(currentView);
    setCurrentView('types');
  };
  
  const handleTypeSelect = (type) => {
    setSelectedInsuredType(type);
    setCurrentView('types');
  };
  
  const handleTypeSave = () => {
    if (selectedInsuredType === 'policyholder') {
      setCurrentView('policyholder-insured');
    } else if (selectedInsuredType === 'other-person') {
      setCurrentView('other-person');
    } else if (selectedInsuredType === 'other-child') {
      setCurrentView('other-child');
    } else if (selectedInsuredType === 'own-child') {
      setCurrentView('own-child');
    }
  };

  // Обработчик выбора типа из списка
  const handleInsuredTypeSelect = (type) => {
    setSelectedInsuredType(type);
  };

  // Обработчики для other-person
  const handleToggleManualInput = () => {
    setManualInput(!manualInput);
    if (!manualInput) {
      // Очищаем данные при включении ручного ввода
      setFieldValues({
        iin: '',
        phone: '',
        lastName: '',
        firstName: '',
        middleName: '',
        street: '',
        microdistrict: '',
        houseNumber: '',
        apartmentNumber: '',
        documentNumber: '',
        documentFile: ''
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
        issuedBy: '',
        residency: 'Резидент',
        clientType: ''
      });
      setAutoModeState('initial');
    }
  };

  const handleSendRequest = () => {
    setAutoModeState('request_sent');
    setTimeout(() => {
      setAutoModeState('response_received');
    }, 2000);
  };

  const handleUpdate = () => {
    // Симуляция загрузки данных
    setFieldValues({
      iin: '940 218 300 972',
      phone: '+7 707 759 10 10',
        lastName: 'Иванов',
        firstName: 'Иван',
        middleName: 'Иванович',
        street: 'Абая',
        microdistrict: '-',
      houseNumber: '17',
      apartmentNumber: '12',
        documentNumber: '01002003'
    });
    setDateValues({
        birthDate: '12.02.2000',
        issueDate: '01.01.2016',
      expiryDate: '01.01.2026'
    });
    setDictionaryValues({
        gender: 'Мужской',
        sectorCode: 'Не выбран',
        country: 'Казахстан',
        region: 'Алматинская область',
        settlementType: 'Город',
        city: 'Алматы',
        docType: 'Уд. личности',
      issuedBy: 'МВД РК',
      residency: 'Резидент'
    });
    setAutoModeState('data_loaded');
  };

  // Обработчики для person-date (данные родителя/опекуна)
  const handleToggleManualInputPerson = () => {
    setManualInputPerson(!manualInputPerson);
    if (!manualInputPerson) {
      setParentData({ iin: '', phone: '' });
      setAutoModeStatePerson('initial');
    }
  };

  const [manualInputPerson, setManualInputPerson] = useState(false);

  const handleSendRequestPerson = () => {
    setAutoModeStatePerson('request_sent');
    setTimeout(() => {
      setAutoModeStatePerson('response_received');
    }, 2000);
  };

  const handleUpdatePerson = () => {
    setParentData({
      iin: '940 218 300 972',
      phone: '+7 707 759 10 10'
    });
    setAutoModeStatePerson('data_loaded');
  };

  const handleSavePersonDate = () => {
    setCurrentView('other-child');
  };

  // Обработчики для childs (выбор ребенка)
  const handleOpenChilds = () => {
    setPreviousView(currentView);
    setCurrentView('childs');
  };
  const handleOpenPersonDate = () => {
    setPreviousView(currentView);
    setCurrentView('person-date');
  };

  const handleChildSelect = (value) => {
    if (value === 'Добавить ребенка') {
      setIsAddingNewChild(true);
      setSelectedChild('');
      setManualInputChild(true); // Автоматически включаем ручной ввод
    } else {
      setIsAddingNewChild(false);
      setSelectedChild(value);
      setManualInputChild(false); // Выключаем ручной ввод при выборе существующего ребенка
    }
    // Переходим на страницу данных ребенка
    setCurrentView('child-date');
  };

  // Обработчики для child-date
  const handleToggleManualInputChild = () => {
    setManualInputChild(!manualInputChild);
  };

  const handleSaveChildDate = () => {
    // Если добавляется новый ребенок, сохраняем только ФИО
    if (isAddingNewChild) {
      const fullName = [fieldValues.lastName, fieldValues.firstName, fieldValues.middleName]
        .filter(Boolean)
        .join(' ');
      setSelectedChild(fullName || '');
    }
    
    if (selectedInsuredType === 'other-child') {
      setCurrentView('other-child-final');
    } else if (selectedInsuredType === 'own-child') {
      // После сохранения данных ребенка для своего ребенка, возвращаемся на страницу own-child
      setCurrentView('own-child');
    }
  };

  // Состояние для отслеживания предыдущего экрана перед открытием справочника
  const [previousView, setPreviousView] = useState('main');

  // Обработчики для справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView(previousView);
  };

  const handleOpenGender = () => {
    setPreviousView(currentView);
    setCurrentView('gender');
  };
  const handleOpenSectorCode = () => {
    setPreviousView(currentView);
    setCurrentView('sectorCode');
  };
  const handleOpenCountry = () => {
    setPreviousView(currentView);
    setCurrentView('country');
  };
  const handleOpenRegion = () => {
    setPreviousView(currentView);
    setCurrentView('region');
  };
  const handleOpenSettlementType = () => {
    setPreviousView(currentView);
    setCurrentView('settlementType');
  };
  const handleOpenCity = () => {
    setPreviousView(currentView);
    setCurrentView('city');
  };
  const handleOpenDocType = () => {
    setPreviousView(currentView);
    setCurrentView('docType');
  };
  const handleOpenIssuedBy = () => {
    setPreviousView(currentView);
    setCurrentView('issuedBy');
  };
  const handleOpenClientType = () => {
    setPreviousView(currentView);
    setCurrentView('clientType');
  };

  // Обработчики полей
  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleParentFieldChange = (fieldName, value) => {
    setParentData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFieldBlur = (fieldName) => {
    if (!fieldValues[fieldName] && !parentData[fieldName]) {
      setActiveField(null);
    }
  };

  const handleTogglePDL = () => {
    setToggleStates(prev => ({
      ...prev,
      pdl: !prev.pdl
    }));
  };

  // Функции рендеринга
  const renderInputField = (fieldName, label, isActive = null, hasValue = null, value = null, onChange = null) => {
    const fieldValue = value !== null ? value : fieldValues[fieldName];
    const handleChange = onChange || ((e) => handleFieldChange(fieldName, e.target.value));
    
    // Если isActive и hasValue не переданы, определяем их сами (как в Policyholder)
    const isFieldActive = isActive !== null ? isActive : (activeField === fieldName);
    const hasFieldValue = hasValue !== null ? hasValue : !!fieldValue;
    
    if (isFieldActive || hasFieldValue) {
      return (
        <div data-layer="InputContainerWithoutButton" data-state="pressed" className="Inputcontainerwithoutbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="%Input text" className="InputText" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
              <input
                type="text"
                value={fieldValue}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleFieldBlur(fieldName)}
                autoFocus={isFieldActive}
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
        <div data-layer="InputContainerWithoutButton" data-state="not_pressed" className="Inputcontainerwithoutbutton" onClick={() => handleFieldClick(fieldName)} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        </div>
      );
    }
  };

  const renderDictionaryButton = (fieldName, label, value, onClick, showValue = true) => {
    const hasValue = !!value && showValue;
    const dataState = hasValue ? "pressed" : "not_pressed";
    
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

  const renderCalendarField = (fieldName, label, value) => {
    const hasValue = !!value;
    const dataState = hasValue ? "pressed" : "not_pressed";
    
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

  const renderAttachField = (fieldName, label, value) => {
    const hasValue = !!value;
    const dataState = hasValue ? "pressed" : "not_pressed";
    
    return (
      <div data-layer="InputContainerAttachButton" data-state={dataState} className="Inputcontainerattachbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
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
          <div data-svg-wrapper data-layer="Attach" className="Attach" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.4648 2.1888C13.7349 2.1888 13.0349 2.47875 12.5188 2.99486L4.09463 11.419C3.23451 12.2791 2.7513 13.4457 2.7513 14.6621C2.7513 15.8785 3.23451 17.045 4.09463 17.9052C4.95474 18.7653 6.12131 19.2485 7.33769 19.2485C8.55408 19.2485 9.72065 18.7653 10.5808 17.9052L19.0049 9.48099C19.3629 9.12301 19.9433 9.12301 20.3013 9.48099C20.6593 9.83897 20.6593 10.4194 20.3013 10.7774L11.8771 19.2015C10.6732 20.4055 9.04031 21.0818 7.33769 21.0818C5.63508 21.0818 4.00219 20.4055 2.79826 19.2015C1.59433 17.9976 0.917969 16.3647 0.917969 14.6621C0.917969 12.9595 1.59433 11.3266 2.79826 10.1227L11.2224 1.69849C12.0824 0.838569 13.2487 0.355469 14.4648 0.355469C15.6809 0.355469 16.8472 0.838569 17.7071 1.69849C18.5671 2.55842 19.0501 3.72472 19.0501 4.94084C19.0501 6.15696 18.5671 7.32327 17.7071 8.18319L9.27379 16.6074C8.75788 17.1233 8.05814 17.4131 7.32853 17.4131C6.59891 17.4131 5.89918 17.1233 5.38326 16.6074C4.86735 16.0914 4.57751 15.3917 4.57751 14.6621C4.57751 13.9325 4.86735 13.2327 5.38326 12.7168L13.1661 4.94311C13.5243 4.58534 14.1047 4.58568 14.4625 4.94388C14.8203 5.30207 14.8199 5.88247 14.4617 6.24024L6.67963 14.0132C6.50776 14.1853 6.41084 14.4189 6.41084 14.6621C6.41084 14.9055 6.50753 15.1389 6.67963 15.311C6.85173 15.4831 7.08514 15.5798 7.32853 15.5798C7.57191 15.5798 7.80533 15.4831 7.97743 15.311L16.4108 6.88683C16.9266 6.37075 17.2168 5.67056 17.2168 4.94084C17.2168 4.21095 16.9269 3.51096 16.4108 2.99486C15.8947 2.47875 15.1947 2.1888 14.4648 2.1888Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    );
  };

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

  // Получение текста для типа застрахованного
  const getInsuredTypeDisplay = () => {
    if (selectedInsuredType === 'policyholder') return 'Страхователь является Застрахованным';
    if (selectedInsuredType === 'other-person') return 'Иное лицо';
    if (selectedInsuredType === 'other-child') return 'Для иного ребенка';
    if (selectedInsuredType === 'own-child') return 'Для своего ребенка';
    return '';
  };

  // Получение текста кнопки в заголовке
  const getHeaderButtonText = () => {
    if (currentView === 'main') return 'Сохранить';
    if (currentView === 'types') return 'Сохранить';
    if (currentView === 'policyholder-insured') return 'Сохранить';
    if (currentView === 'other-person') {
      if (manualInput) return 'Сохранить';
      if (autoModeState === 'initial' || autoModeState === 'request_sent') return 'Отправить запрос';
      if (autoModeState === 'response_received') return 'Обновить';
      if (autoModeState === 'data_loaded') return 'Сохранить';
    }
    if (currentView === 'person-date') {
      if (manualInputPerson) return 'Сохранить';
      if (autoModeStatePerson === 'initial' || autoModeStatePerson === 'request_sent') return 'Отправить запрос';
      if (autoModeStatePerson === 'response_received') return 'Обновить';
      if (autoModeStatePerson === 'data_loaded') return 'Сохранить';
    }
    if (currentView === 'child-date') return 'Сохранить';
    if (currentView === 'other-child-final') return 'Сохранить';
    return 'Сохранить';
  };

  // Обработчик кнопки в заголовке
  const handleHeaderButtonClick = () => {
    if (currentView === 'main') {
      if (selectedInsuredType) {
        handleTypeSave();
      } else {
      if (onSave) {
        onSave({
            selectedInsuredType,
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
            ...toggleStates
          });
        }
        if (onBack) onBack();
      }
    } else if (currentView === 'types') {
      handleTypeSave();
    } else if (currentView === 'policyholder-insured') {
      if (onSave) {
        onSave({
          selectedInsuredType: 'policyholder',
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates
        });
      }
      if (onBack) onBack();
    } else if (currentView === 'other-person') {
      if (manualInput) {
      if (onSave) {
        onSave({
            selectedInsuredType: 'other-person',
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
            ...toggleStates
          });
        }
        if (onBack) onBack();
      } else {
    if (autoModeState === 'initial' || autoModeState === 'request_sent') {
      handleSendRequest();
        } else if (autoModeState === 'response_received') {
      handleUpdate();
        } else if (autoModeState === 'data_loaded') {
      if (onSave) {
        onSave({
              selectedInsuredType: 'other-person',
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
              ...toggleStates
            });
          }
          if (onBack) onBack();
        }
      }
    } else if (currentView === 'person-date') {
      if (manualInputPerson) {
        handleSavePersonDate();
      } else {
        if (autoModeStatePerson === 'initial' || autoModeStatePerson === 'request_sent') {
          handleSendRequestPerson();
        } else if (autoModeStatePerson === 'response_received') {
          handleUpdatePerson();
        } else if (autoModeStatePerson === 'data_loaded') {
          handleSavePersonDate();
        }
      }
    } else if (currentView === 'child-date') {
      handleSaveChildDate();
    } else if (currentView === 'other-child-final') {
      if (onSave) {
        onSave({
          selectedInsuredType: 'other-child',
          parentData,
          selectedChild: selectedChild || (isAddingNewChild ? 'Добавить ребенка' : ''),
          ...fieldValues,
          ...dateValues,
          ...dictionaryValues,
          ...toggleStates
        });
      }
      if (onBack) onBack();
    }
  };

  // Рендеринг справочников
  if (currentView === 'gender') {
    return <Gender onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('gender', value)} />;
  }
  if (currentView === 'sectorCode') {
    return <SectorCode onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('sectorCode', value)} />;
  }
  if (currentView === 'country') {
    return <Country onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('country', value)} />;
  }
  if (currentView === 'region') {
    return <Region onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('region', value)} />;
  }
  if (currentView === 'settlementType') {
    return <SettlementType onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('settlementType', value)} />;
  }
  if (currentView === 'city') {
    return <City onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('city', value)} />;
  }
  if (currentView === 'docType') {
    return <DocType onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('docType', value)} />;
  }
  if (currentView === 'issuedBy') {
    return <IssuedBy onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('issuedBy', value)} />;
  }
  if (currentView === 'childs') {
    return <SelectChild onBack={handleBackToMain} onSelect={handleChildSelect} />;
  }
  if (currentView === 'clientType') {
    return <ClientType onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('clientType', value)} />;
  }

  // Рендеринг основных страниц
  const renderMenu = () => (
      <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div data-layer="Back button" className="BackButton" onClick={currentView === 'main' ? onBack : handleBackToMain} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
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
            <line x1="4.00024" y1="11.2505" x2="12.0006" y2="11.2505" stroke="black" strokeWidth="1.5"/>
            <line x1="4.00024" y1="15.2505" x2="10.0005" y2="15.2505" stroke="black" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
  );

  const renderSubHeader = (title) => (
        <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{title}</div>
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
          <div data-layer="Send request button" data-state="pressed" className="SendRequestButton" onClick={handleHeaderButtonClick} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
                <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getHeaderButtonText()}</div>
              </div>
            </div>
          </div>
        </div>
  );

  // Начальная страница (main)
  if (currentView === 'main') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, height: 982, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, height: 982, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', getInsuredTypeDisplay(), handleOpenTypes, !!selectedInsuredType)}
          </div>
        </div>
      </div>
    );
  }

  // Страница выбора типа (types)
  if (currentView === 'types') {
    return (
      <div data-layer="List variants" className="ListVariants" style={{width: 1512, height: 982, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div data-layer="Menu" data-property-1="Menu three" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div data-layer="Menu button" className="MenuButton" onClick={handleBackToMain} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
            <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 31, top: 32, position: 'absolute'}}>
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
                <line x1="4.00024" y1="11.2505" x2="12.0006" y2="11.2505" stroke="black" strokeWidth="1.5"/>
                <line x1="4.00024" y1="15.2508" x2="10.0005" y2="15.2508" stroke="black" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="List variants" className="ListVariants" style={{flex: '1 1 0', height: 982, background: 'white', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div data-layer="SubHeader" data-type="Creating an order" className="Subheader" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
            <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип Застрахованного</div>
              <div data-layer="ActionButtonWithoutRounding" data-state="pressed" className="Actionbuttonwithoutrounding" onClick={handleHeaderButtonClick} style={{width: 388, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
                <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
              </div>
            </div>
          </div>
          <div data-layer="Fields List" className="FieldsList" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div data-layer="InputContainerRadioButton" data-state={selectedInsuredType === 'own-child' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleInsuredTypeSelect('own-child')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
              <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Для своего ребенка</div>
              </div>
              <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
                {selectedInsuredType === 'own-child' ? (
                  <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
                    </svg>
                  </div>
                ) : (
                  <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="black"/>
                    </svg>
          </div>
        )}
              </div>
            </div>
            <div data-layer="InputContainerRadioButton" data-state={selectedInsuredType === 'other-child' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleInsuredTypeSelect('other-child')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
              <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Для иного ребенка</div>
              </div>
              <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
                {selectedInsuredType === 'other-child' ? (
                  <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
                    </svg>
                  </div>
                ) : (
                  <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="black"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div data-layer="InputContainerRadioButton" data-state={selectedInsuredType === 'policyholder' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleInsuredTypeSelect('policyholder')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
              <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страхователь является Застрахованным</div>
              </div>
              <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
                {selectedInsuredType === 'policyholder' ? (
                  <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
                    </svg>
                  </div>
                ) : (
                  <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="black"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div data-layer="InputContainerRadioButton" data-state={selectedInsuredType === 'other-person' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleInsuredTypeSelect('other-person')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
              <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Иное лицо</div>
              </div>
              <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
                {selectedInsuredType === 'other-person' ? (
                  <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
                    </svg>
                  </div>
                ) : (
                  <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6.5" stroke="black"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Страница: Страхователь является застрахованным
  if (currentView === 'policyholder-insured') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Страхователь является Застрахованным', handleOpenTypes, true)}
            {renderDictionaryButton('residency', 'Признак резидентства', dictionaryValues.residency, () => {}, true)}
            {renderInputField('iin', 'ИИН', false, !!fieldValues.iin)}
            {renderInputField('phone', 'Номер телефона', false, !!fieldValues.phone)}
            {renderInputField('lastName', 'Фамилия', false, !!fieldValues.lastName)}
            {renderInputField('firstName', 'Имя', false, !!fieldValues.firstName)}
            {renderInputField('middleName', 'Отчество', false, !!fieldValues.middleName)}
            {renderCalendarField('birthDate', 'Дата рождения', dateValues.birthDate)}
            {renderDictionaryButton('gender', 'Пол', dictionaryValues.gender, handleOpenGender, true)}
            {renderDictionaryButton('sectorCode', 'Код сектора экономики', dictionaryValues.sectorCode, handleOpenSectorCode, true)}
            {renderDictionaryButton('country', 'Страна', dictionaryValues.country, handleOpenCountry, true)}
            {renderDictionaryButton('region', 'Область', dictionaryValues.region, handleOpenRegion, true)}
            {renderDictionaryButton('settlementType', 'Вид населенного пункта', dictionaryValues.settlementType, handleOpenSettlementType, true)}
            {renderDictionaryButton('city', 'Город', dictionaryValues.city, handleOpenCity, true)}
            {renderInputField('street', 'Улица', false, !!fieldValues.street)}
            {renderInputField('microdistrict', 'Микрорайон', false, !!fieldValues.microdistrict)}
            {renderInputField('houseNumber', '№ дома', false, !!fieldValues.houseNumber)}
            {renderInputField('apartmentNumber', '№ квартиры', false, !!fieldValues.apartmentNumber)}
            {renderDictionaryButton('docType', 'Тип документа', dictionaryValues.docType, handleOpenDocType, true)}
            {renderInputField('documentNumber', 'Номер документа', false, !!fieldValues.documentNumber)}
            {renderDictionaryButton('issuedBy', 'Кем выдано', dictionaryValues.issuedBy, handleOpenIssuedBy, true)}
            {renderCalendarField('issueDate', 'Выдан от', dateValues.issueDate)}
            {renderCalendarField('expiryDate', 'Действует до', dateValues.expiryDate)}
            {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
        </div>
      </div>
    </div>
  );
  }

  // Страница: Иное лицо
  if (currentView === 'other-person') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, height: 982, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, height: 982, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          {/* Alert для уведомлений */}
          {!manualInput && (autoModeState === 'request_sent' || autoModeState === 'response_received') && (
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
                  : 'Нажмите на обновить, чтобы получить данные'}
              </div>
            </div>
          )}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Иное лицо', handleOpenTypes, true)}
            {renderToggleButton('Ручной ввод данных', manualInput, handleToggleManualInput)}
            {!manualInput && (
              <>
                {renderInputField('iin', 'ИИН', activeField === 'iin', !!fieldValues.iin)}
                {renderInputField('phone', 'Номер телефона', activeField === 'phone', !!fieldValues.phone)}
              </>
            )}
            {manualInput && (
              <>
                {renderDictionaryButton('residency', 'Признак резидентства', dictionaryValues.residency, () => {}, true)}
                {renderInputField('iin', 'ИИН')}
                {renderInputField('phone', 'Номер телефона')}
                {renderInputField('lastName', 'Фамилия')}
                {renderInputField('firstName', 'Имя')}
                {renderInputField('middleName', 'Отчество')}
                {renderCalendarField('birthDate', 'Дата рождения', dateValues.birthDate)}
                {renderDictionaryButton('gender', 'Пол', dictionaryValues.gender, handleOpenGender)}
                {renderDictionaryButton('sectorCode', 'Код сектора экономики', dictionaryValues.sectorCode, handleOpenSectorCode)}
                {renderDictionaryButton('country', 'Страна', dictionaryValues.country, handleOpenCountry)}
                {renderDictionaryButton('region', 'Область', dictionaryValues.region, handleOpenRegion)}
                {renderDictionaryButton('settlementType', 'Вид населенного пункта', dictionaryValues.settlementType, handleOpenSettlementType)}
                {renderDictionaryButton('city', 'Город', dictionaryValues.city, handleOpenCity)}
                {renderInputField('street', 'Улица')}
                {renderInputField('microdistrict', 'Микрорайон')}
                {renderInputField('houseNumber', '№ дома')}
                {renderInputField('apartmentNumber', '№ квартиры')}
                {renderAttachField('documentFile', 'Документ подтверждающий личность', fieldValues.documentFile)}
                {renderDictionaryButton('docType', 'Тип документа', dictionaryValues.docType, handleOpenDocType)}
                {renderInputField('documentNumber', 'Номер документа')}
                {renderDictionaryButton('issuedBy', 'Кем выдано', dictionaryValues.issuedBy, handleOpenIssuedBy)}
                {renderCalendarField('issueDate', 'Выдан от', dateValues.issueDate)}
                {renderCalendarField('expiryDate', 'Действует до', dateValues.expiryDate)}
                {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
                {renderDictionaryButton('clientType', 'Тип клиента', dictionaryValues.clientType, handleOpenClientType)}
              </>
            )}
            {!manualInput && autoModeState === 'data_loaded' && (
              <>
                {renderInputField('lastName', 'Фамилия', activeField === 'lastName', !!fieldValues.lastName)}
                {renderInputField('firstName', 'Имя', activeField === 'firstName', !!fieldValues.firstName)}
                {renderInputField('middleName', 'Отчество', activeField === 'middleName', !!fieldValues.middleName)}
                {renderCalendarField('birthDate', 'Дата рождения', dateValues.birthDate)}
                {renderDictionaryButton('gender', 'Пол', dictionaryValues.gender, handleOpenGender)}
                {renderDictionaryButton('sectorCode', 'Код сектора экономики', dictionaryValues.sectorCode, handleOpenSectorCode)}
                {renderDictionaryButton('country', 'Страна', dictionaryValues.country, handleOpenCountry)}
                {renderDictionaryButton('region', 'Область', dictionaryValues.region, handleOpenRegion)}
                {renderDictionaryButton('settlementType', 'Вид населенного пункта', dictionaryValues.settlementType, handleOpenSettlementType)}
                {renderDictionaryButton('city', 'Город', dictionaryValues.city, handleOpenCity)}
                {renderInputField('street', 'Улица', activeField === 'street', !!fieldValues.street)}
                {renderInputField('microdistrict', 'Микрорайон', activeField === 'microdistrict', !!fieldValues.microdistrict)}
                {renderInputField('houseNumber', '№ дома', activeField === 'houseNumber', !!fieldValues.houseNumber)}
                {renderInputField('apartmentNumber', '№ квартиры', activeField === 'apartmentNumber', !!fieldValues.apartmentNumber)}
                {renderDictionaryButton('docType', 'Тип документа', dictionaryValues.docType, handleOpenDocType)}
                {renderInputField('documentNumber', 'Номер документа', activeField === 'documentNumber', !!fieldValues.documentNumber)}
                {renderDictionaryButton('issuedBy', 'Кем выдано', dictionaryValues.issuedBy, handleOpenIssuedBy)}
                {renderCalendarField('issueDate', 'Выдан от', dateValues.issueDate)}
                {renderCalendarField('expiryDate', 'Действует до', dateValues.expiryDate)}
                {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Страница: Для иного ребенка (начальная)
  if (currentView === 'other-child') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, height: 982, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, height: 982, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Для иного ребенка', handleOpenTypes, true)}
            {renderDictionaryButton('parentData', 'Данные родителя или опекуна ребенка', parentData.iin && parentData.phone ? `${parentData.iin} / ${parentData.phone}` : '', handleOpenPersonDate, !!(parentData.iin && parentData.phone))}
            {parentData.iin && parentData.phone && renderDictionaryButton('selectChild', 'Выбрать ребенка', selectedChild || (isAddingNewChild ? 'Добавить ребенка' : ''), handleOpenChilds, !!(selectedChild || isAddingNewChild))}
          </div>
        </div>
      </div>
    );
  }

  // Страница: Для своего ребенка
  if (currentView === 'own-child') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, height: 982, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, height: 982, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Для своего ребенка', handleOpenTypes, true)}
            {renderDictionaryButton('selectChild', 'Выбрать ребенка', selectedChild || (isAddingNewChild ? 'Добавить ребенка' : ''), handleOpenChilds, !!(selectedChild || isAddingNewChild))}
          </div>
        </div>
      </div>
    );
  }

  // Страница: Данные родителя или опекуна ребенка
  if (currentView === 'person-date') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
            <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Данные родителя или опекуна ребенка</div>
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
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderToggleButton('Ручной ввод данных', manualInputPerson, handleToggleManualInputPerson)}
            {renderInputField('parentIin', 'ИИН', activeField === 'parentIin', !!parentData.iin, parentData.iin, (e) => handleParentFieldChange('iin', e.target.value))}
            {renderInputField('parentPhone', 'Номер телефона', activeField === 'parentPhone', !!parentData.phone, parentData.phone, (e) => handleParentFieldChange('phone', e.target.value))}
          </div>
        </div>
      </div>
    );
  }

  // Страница: Данные ребенка
  if (currentView === 'child-date') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
            <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Данные ребенка</div>
              <div data-layer="Button container" className="ButtonContainer" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
                <div data-layer="Save button" data-state="pressed" className="SaveButton" onClick={handleHeaderButtonClick} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
                  <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
                </div>
              </div>
            </div>
          </div>
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('selectChild', 'Выбрать ребенка', selectedChild || (isAddingNewChild ? 'Добавить ребенка' : ''), handleOpenChilds, !!(selectedChild || isAddingNewChild))}
            {renderToggleButton('Ручной ввод данных', manualInputChild, handleToggleManualInputChild)}
            {renderInputField('iin', 'ИИН', activeField === 'iin', !!fieldValues.iin)}
            {renderInputField('lastName', 'Фамилия', activeField === 'lastName', !!fieldValues.lastName)}
            {renderInputField('firstName', 'Имя', activeField === 'firstName', !!fieldValues.firstName)}
            {renderInputField('middleName', 'Отчество', activeField === 'middleName', !!fieldValues.middleName)}
            {renderCalendarField('birthDate', 'Дата рождения', dateValues.birthDate)}
            {renderDictionaryButton('gender', 'Пол', dictionaryValues.gender, handleOpenGender)}
            {renderDictionaryButton('sectorCode', 'Код сектора экономики', dictionaryValues.sectorCode, handleOpenSectorCode)}
            {renderDictionaryButton('country', 'Страна', dictionaryValues.country, handleOpenCountry)}
            {renderDictionaryButton('region', 'Область', dictionaryValues.region, handleOpenRegion)}
            {renderDictionaryButton('settlementType', 'Вид населенного пункта', dictionaryValues.settlementType, handleOpenSettlementType)}
            {renderDictionaryButton('city', 'Город', dictionaryValues.city, handleOpenCity)}
            {renderInputField('street', 'Улица', activeField === 'street', !!fieldValues.street)}
            {renderInputField('microdistrict', 'Микрорайон', activeField === 'microdistrict', !!fieldValues.microdistrict)}
            {renderInputField('houseNumber', '№ дома', activeField === 'houseNumber', !!fieldValues.houseNumber)}
            {renderInputField('apartmentNumber', '№ квартиры', activeField === 'apartmentNumber', !!fieldValues.apartmentNumber)}
            {renderDictionaryButton('docType', 'Тип документа', dictionaryValues.docType, handleOpenDocType)}
            {renderInputField('documentNumber', 'Номер документа', activeField === 'documentNumber', !!fieldValues.documentNumber)}
            {renderDictionaryButton('issuedBy', 'Кем выдано', dictionaryValues.issuedBy, handleOpenIssuedBy)}
            {renderCalendarField('issueDate', 'Выдан от', dateValues.issueDate)}
            {renderCalendarField('expiryDate', 'Действует до', dateValues.expiryDate)}
            {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
          </div>
        </div>
      </div>
    );
  }

  // Страница: Для иного ребенка (финальная)
  if (currentView === 'other-child-final') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, height: 982, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, height: 982, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Для иного ребенка', handleOpenTypes, true)}
            {renderDictionaryButton('parentData', 'Данные родителя или опекуна ребенка', parentData.iin && parentData.phone ? `Иванов Иван Иванович` : '', handleOpenPersonDate, !!(parentData.iin && parentData.phone))}
            {renderDictionaryButton('selectChild', 'Выбрать ребенка', selectedChild || (isAddingNewChild ? 'Добавить ребенка' : ''), handleOpenChilds, !!(selectedChild || isAddingNewChild))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Insured;
