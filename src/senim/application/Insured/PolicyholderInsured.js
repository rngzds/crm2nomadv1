import React, { useState, useEffect } from 'react';
import Gender from '../../dictionary/Gender';
import SectorCode from '../../dictionary/SectorCode';
import Country from '../../dictionary/Country';
import Region from '../../dictionary/Region';
import SettlementType from '../../dictionary/SettlementType';
import City from '../../dictionary/City';
import DocType from '../../dictionary/DocType';
import IssuedBy from '../../dictionary/IssuedBy';
import { saveInsuredPolicyholderData, loadInsuredPolicyholderData, loadGlobalApplicationData, updateGlobalApplicationSection } from '../../../services/storageService';
import { renderInputField, renderDictionaryButton, renderCalendarField, renderToggleButton } from './InsuredFormFields';

const PolicyholderInsured = ({ onBack, policyholderData, onSave, applicationId, onOpenTypes }) => {
  const [currentView, setCurrentView] = useState('main');
  const [previousView, setPreviousView] = useState('main');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Единый объект состояния с правильными названиями полей
  const [insuredData, setInsuredData] = useState({
    // Основные поля
    iin: '',
    telephone: '',
    name: '',
    surname: '',
    patronymic: '',
    // Адрес (отдельные поля)
    street: '',
    microdistrict: '',
    houseNumber: '',
    apartmentNumber: '',
    // Документ
    docNumber: '',
    // Даты
    birthDate: '',
    issueDate: '',
    expiryDate: '',
    // Справочники (как строки)
    gender: '',
    economSecId: '',
    countryId: '',
    region_id: '',
    settlementType: '',
    city: '',
    vidDocId: '',
    issuedBy: '',
    residency: 'Резидент'
  });

  // Toggle состояния
  const [toggleStates, setToggleStates] = useState({
    pdl: false
  });

  // Активное поле
  const [activeField, setActiveField] = useState(null);

  // Маппинг старых названий полей справочников на новые
  const getDictionaryFieldName = (oldName) => {
    const mapping = {
      'sectorCode': 'economSecId',
      'country': 'countryId',
      'region': 'region_id',
      'docType': 'vidDocId'
    };
    return mapping[oldName] || oldName;
  };

  // Маппинг старых названий полей на новые
  const getFieldName = (oldName) => {
    const mapping = {
      'phone': 'telephone',
      'firstName': 'name',
      'lastName': 'surname',
      'middleName': 'patronymic',
      'documentNumber': 'docNumber'
    };
    return mapping[oldName] || oldName;
  };

  // Загрузка данных из глобального хранилища или localStorage при монтировании
  useEffect(() => {
    // Сначала проверяем глобальное хранилище
    const globalData = loadGlobalApplicationData(applicationId);
    let savedData = null;
    
    if (globalData && globalData.Insured && globalData.Insured['policyholder-insured']) {
      savedData = globalData.Insured['policyholder-insured'];
      console.log('📖 [ЗАСТРАХОВАННЫЙ - Страхователь является застрахованным] Загружено из глобального хранилища:', JSON.parse(JSON.stringify(savedData)));
    } else {
      // Если в глобальном хранилище нет, загружаем из старого хранилища
      savedData = loadInsuredPolicyholderData(applicationId);
      if (savedData) {
        console.log('📖 [ЗАСТРАХОВАННЫЙ - Страхователь является застрахованным] Загружено из старого хранилища:', JSON.parse(JSON.stringify(savedData)));
      }
    }
    
    if (savedData) {
      // Миграция старых данных в новую структуру
      if (savedData.fieldValues || savedData.dateValues || savedData.dictionaryValues) {
        const migratedData = {
          // Миграция основных полей
          iin: savedData.fieldValues?.iin || savedData.iin || '',
          telephone: savedData.fieldValues?.phone || savedData.telephone || '',
          name: savedData.fieldValues?.firstName || savedData.name || '',
          surname: savedData.fieldValues?.lastName || savedData.surname || '',
          patronymic: savedData.fieldValues?.middleName || savedData.patronymic || '',
          // Миграция адреса
          street: savedData.fieldValues?.street || savedData.street || '',
          microdistrict: savedData.fieldValues?.microdistrict || savedData.microdistrict || '',
          houseNumber: savedData.fieldValues?.houseNumber || savedData.houseNumber || '',
          apartmentNumber: savedData.fieldValues?.apartmentNumber || savedData.apartmentNumber || '',
          // Миграция документа
          docNumber: savedData.fieldValues?.documentNumber || savedData.docNumber || '',
          // Миграция дат
          birthDate: savedData.dateValues?.birthDate || savedData.birthDate || '',
          issueDate: savedData.dateValues?.issueDate || savedData.issueDate || '',
          expiryDate: savedData.dateValues?.expiryDate || savedData.expiryDate || '',
          // Миграция справочников
          gender: savedData.dictionaryValues?.gender || savedData.gender || '',
          economSecId: savedData.dictionaryValues?.sectorCode || savedData.economSecId || '',
          countryId: savedData.dictionaryValues?.country || savedData.countryId || '',
          region_id: savedData.dictionaryValues?.region || savedData.region_id || '',
          settlementType: savedData.dictionaryValues?.settlementType || savedData.settlementType || '',
          city: savedData.dictionaryValues?.city || savedData.city || '',
          vidDocId: savedData.dictionaryValues?.docType || savedData.vidDocId || '',
          issuedBy: savedData.dictionaryValues?.issuedBy || savedData.issuedBy || '',
          residency: savedData.dictionaryValues?.residency || savedData.residency || 'Резидент'
        };
        setInsuredData(migratedData);
      } else if (savedData.iin || savedData.name) {
        // Если данные уже в новом формате
        setInsuredData(prev => ({ ...prev, ...savedData }));
      }
      if (savedData.toggleStates) {
        setToggleStates(savedData.toggleStates);
      }
      // При восстановлении состояния устанавливаем currentView в 'main' (основной вид формы)
      setCurrentView('main');
    }
    // После загрузки данных помечаем, что начальная загрузка завершена
    setIsInitialLoad(false);
  }, [applicationId]);

  // Загружаем данные из policyholderData
  useEffect(() => {
    if (policyholderData) {
      setInsuredData(prev => ({
        ...prev,
        iin: policyholderData.iin || prev.iin,
        telephone: policyholderData.telephone || prev.telephone,
        name: policyholderData.name || prev.name,
        surname: policyholderData.surname || prev.surname,
        patronymic: policyholderData.patronymic || prev.patronymic,
        street: policyholderData.street || prev.street,
        microdistrict: policyholderData.microdistrict || prev.microdistrict,
        houseNumber: policyholderData.houseNumber || prev.houseNumber,
        apartmentNumber: policyholderData.apartmentNumber || prev.apartmentNumber,
        docNumber: policyholderData.docNumber || prev.docNumber,
        birthDate: policyholderData.birthDate || prev.birthDate,
        issueDate: policyholderData.issueDate || prev.issueDate,
        expiryDate: policyholderData.expiryDate || prev.expiryDate,
        gender: policyholderData.gender || prev.gender,
        economSecId: policyholderData.economSecId || prev.economSecId,
        countryId: policyholderData.countryId || prev.countryId,
        region_id: policyholderData.region_id || prev.region_id,
        settlementType: policyholderData.settlementType || prev.settlementType,
        city: policyholderData.city || prev.city,
        vidDocId: policyholderData.vidDocId || prev.vidDocId,
        issuedBy: policyholderData.issuedBy || prev.issuedBy
      }));
    }
  }, [policyholderData]);

  // Обработчик для сохранения выбранных значений из справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    const newFieldName = getDictionaryFieldName(fieldName);
    console.log('🔵 [DICTIONARY SELECT] Поле:', fieldName, '→', newFieldName, 'Значение:', value);
    setInsuredData(prev => {
      const updated = {
        ...prev,
        [newFieldName]: value
      };
      console.log('🔵 [DICTIONARY SELECT] Обновленные данные:', updated);
      return updated;
    });
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

  // Обработчики полей
  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleFieldChange = (fieldName, value) => {
    const newFieldName = getFieldName(fieldName);
    setInsuredData(prev => ({
      ...prev,
      [newFieldName]: value
    }));
  };

  const handleFieldBlur = (fieldName) => {
    const newFieldName = getFieldName(fieldName);
    if (!insuredData[newFieldName]) {
      setActiveField(null);
    }
  };

  const handleTogglePDL = () => {
    setToggleStates(prev => ({
      ...prev,
      pdl: !prev.pdl
    }));
  };

  const handleSave = () => {
    // Сохраняем данные для "страхователь является застрахованным"
    const dataToSave = {
      ...insuredData,
      toggleStates,
      currentView: 'policyholder-insured'
    };
    console.log('💾 [ЗАСТРАХОВАННЫЙ - Страхователь является застрахованным] Сохранение по кнопке:', JSON.parse(JSON.stringify(dataToSave)));
    
    // Сохраняем в глобальное хранилище
    const globalInsuredData = loadGlobalApplicationData(applicationId)?.Insured || {};
    globalInsuredData['type-insured'] = 'policyholder';
    globalInsuredData['policyholder-insured'] = dataToSave;
    updateGlobalApplicationSection('Insured', globalInsuredData, applicationId);
    
    // Также сохраняем в старое хранилище для обратной совместимости
    const oldFormatData = {
      selectedInsuredType: 'policyholder',
      fieldValues: {
        iin: insuredData.iin,
        phone: insuredData.telephone,
        lastName: insuredData.surname,
        firstName: insuredData.name,
        middleName: insuredData.patronymic,
        street: insuredData.street,
        microdistrict: insuredData.microdistrict,
        houseNumber: insuredData.houseNumber,
        apartmentNumber: insuredData.apartmentNumber,
        documentNumber: insuredData.docNumber
      },
      dateValues: {
        birthDate: insuredData.birthDate,
        issueDate: insuredData.issueDate,
        expiryDate: insuredData.expiryDate
      },
      dictionaryValues: {
        gender: insuredData.gender,
        sectorCode: insuredData.economSecId,
        country: insuredData.countryId,
        region: insuredData.region_id,
        settlementType: insuredData.settlementType,
        city: insuredData.city,
        docType: insuredData.vidDocId,
        issuedBy: insuredData.issuedBy,
        residency: insuredData.residency
      },
      toggleStates,
      currentView: 'policyholder-insured'
    };
    saveInsuredPolicyholderData(oldFormatData, applicationId);
    
    if (onSave) {
      onSave({
        selectedInsuredType: 'policyholder',
        ...insuredData,
        ...toggleStates
      });
    }
    if (onBack) onBack();
  };

  // Рендеринг справочников
  if (currentView === 'gender') {
    return <Gender onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('gender', value)} />;
  }
  if (currentView === 'sectorCode') {
    return <SectorCode onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('sectorCode', value)} />;
  }
  if (currentView === 'country') {
    return <Country onBack={() => setCurrentView(previousView)} onSave={(value) => handleDictionaryValueSelect('country', value)} />;
  }
  if (currentView === 'region') {
    return <Region onBack={() => setCurrentView(previousView)} onSave={(value) => handleDictionaryValueSelect('region', value)} />;
  }
  if (currentView === 'settlementType') {
    return <SettlementType onBack={() => setCurrentView(previousView)} onSave={(value) => handleDictionaryValueSelect('settlementType', value)} />;
  }
  if (currentView === 'city') {
    return <City onBack={() => setCurrentView(previousView)} onSave={(value) => handleDictionaryValueSelect('city', value)} />;
  }
  if (currentView === 'docType') {
    return <DocType onBack={() => setCurrentView(previousView)} onSave={(value) => handleDictionaryValueSelect('docType', value)} />;
  }
  if (currentView === 'issuedBy') {
    return <IssuedBy onBack={() => setCurrentView(previousView)} onSelect={(value) => handleDictionaryValueSelect('issuedBy', value)} />;
  }

  // Рендеринг меню
  const renderMenu = () => (
    <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div data-layer="Back button" className="BackButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
        <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
          </svg>
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
          <div data-layer="Send request button" data-state="pressed" className="SendRequestButton" onClick={handleSave} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
            <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      {renderMenu()}
      <div data-layer="Insured data" className="InsuredData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderSubHeader('Застрахованный')}
        <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Страхователь является Застрахованным', onOpenTypes, true)}
          {renderDictionaryButton('residency', 'Признак резидентства', insuredData.residency, () => {}, true)}
          {renderInputField('iin', 'ИИН', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.iin)}
          {renderInputField('phone', 'Номер телефона', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.telephone)}
          {renderInputField('lastName', 'Фамилия', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.surname)}
          {renderInputField('firstName', 'Имя', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.name)}
          {renderInputField('middleName', 'Отчество', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.patronymic)}
          {renderCalendarField('birthDate', 'Дата рождения', insuredData.birthDate)}
          {renderDictionaryButton('gender', 'Пол', insuredData.gender, handleOpenGender, !!insuredData.gender)}
          {renderDictionaryButton('sectorCode', 'Код сектора экономики', insuredData.economSecId, handleOpenSectorCode, !!insuredData.economSecId)}
          {renderDictionaryButton('country', 'Страна', insuredData.countryId, handleOpenCountry, !!insuredData.countryId)}
          {renderDictionaryButton('region', 'Область', insuredData.region_id, handleOpenRegion, !!insuredData.region_id)}
          {renderDictionaryButton('settlementType', 'Вид населенного пункта', insuredData.settlementType, handleOpenSettlementType, !!insuredData.settlementType)}
          {renderDictionaryButton('city', 'Город', insuredData.city, handleOpenCity, !!insuredData.city)}
          {renderInputField('street', 'Улица', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.street)}
          {renderInputField('microdistrict', 'Микрорайон', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.microdistrict)}
          {renderInputField('houseNumber', '№ дома', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.houseNumber)}
          {renderInputField('apartmentNumber', '№ квартиры', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.apartmentNumber)}
          {renderDictionaryButton('docType', 'Тип документа', insuredData.vidDocId, handleOpenDocType, !!insuredData.vidDocId)}
          {renderInputField('documentNumber', 'Номер документа', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.docNumber)}
          {renderDictionaryButton('issuedBy', 'Кем выдано', insuredData.issuedBy, handleOpenIssuedBy, !!insuredData.issuedBy)}
          {renderCalendarField('issueDate', 'Выдан от', insuredData.issueDate)}
          {renderCalendarField('expiryDate', 'Действует до', insuredData.expiryDate)}
          {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
        </div>
      </div>
    </div>
  );
};

export default PolicyholderInsured;
