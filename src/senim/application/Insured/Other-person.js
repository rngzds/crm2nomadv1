import React, { useState, useEffect } from 'react';
import Gender from '../../dictionary/Gender';
import SectorCode from '../../dictionary/SectorCode';
import Country from '../../dictionary/Country';
import Region from '../../dictionary/Region';
import SettlementType from '../../dictionary/SettlementType';
import City from '../../dictionary/City';
import DocType from '../../dictionary/DocType';
import IssuedBy from '../../dictionary/IssuedBy';
import ClientType from '../../dictionary/ClientType';
import { getPerson, mapApiDataToForm } from '../../../services/personService';
import { saveInsuredOtherPersonData, loadInsuredOtherPersonData, loadGlobalApplicationData, updateGlobalApplicationSection } from '../../../services/storageService';
import { renderInputField, renderDictionaryButton, renderCalendarField, renderAttachField, renderToggleButton } from './InsuredFormFields';

const OtherPerson = ({ onBack, onSave, applicationId, onOpenTypes }) => {
  const [currentView, setCurrentView] = useState('main');
  const [previousView, setPreviousView] = useState('main');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Состояния для автоматического режима
  const [manualInput, setManualInput] = useState(false);
  const [autoModeState, setAutoModeState] = useState('initial'); // 'initial', 'request_sent', 'response_received', 'data_loaded'
  const [apiResponseData, setApiResponseData] = useState(null);

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
    documentFile: '',
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
    residency: 'Резидент',
    clientType: ''
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
    
    if (globalData && globalData.Insured && globalData.Insured['other-person']) {
      savedData = globalData.Insured['other-person'];
      console.log('📖 [ЗАСТРАХОВАННЫЙ - Иное лицо] Загружено из глобального хранилища:', JSON.parse(JSON.stringify(savedData)));
    } else {
      // Если в глобальном хранилище нет, загружаем из старого хранилища
      savedData = loadInsuredOtherPersonData(applicationId);
      if (savedData) {
        console.log('📖 [ЗАСТРАХОВАННЫЙ - Иное лицо] Загружено из старого хранилища:', JSON.parse(JSON.stringify(savedData)));
      }
    }
    
    if (savedData) {
      let migratedData = null;
      
      // Миграция старых данных в новую структуру
      if (savedData.fieldValues || savedData.dateValues || savedData.dictionaryValues) {
        migratedData = {
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
          documentFile: savedData.fieldValues?.documentFile || savedData.documentFile || '',
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
          residency: savedData.dictionaryValues?.residency || savedData.residency || 'Резидент',
          clientType: savedData.dictionaryValues?.clientType || savedData.clientType || ''
        };
        setInsuredData(migratedData);
      } else if (savedData.iin || savedData.name) {
        // Если данные уже в новом формате
        setInsuredData(prev => ({ ...prev, ...savedData }));
      }
      if (savedData.toggleStates) {
        setToggleStates(savedData.toggleStates);
      }
      if (savedData.manualInput !== undefined) {
        setManualInput(savedData.manualInput);
      }
      
      // Восстанавливаем autoModeState из сохраненных данных
      if (savedData.autoModeState) {
        setAutoModeState(savedData.autoModeState);
      }
      
      // ВАЖНО: Если данные уже загружены через сервис, сразу устанавливаем состояние 'data_loaded'
      // чтобы не показывать форму отправки запроса, а сразу показывать все поля с данными
      // Проверяем наличие данных (включая справочники, так как они тоже являются данными)
      const hasData = migratedData 
        ? (migratedData.name || migratedData.surname || migratedData.iin || migratedData.gender || migratedData.city || migratedData.countryId) 
        : (savedData.name || savedData.surname || savedData.iin || savedData.gender || savedData.city || savedData.countryId || 
           savedData.fieldValues?.firstName || savedData.fieldValues?.lastName || savedData.fieldValues?.iin ||
           savedData.dictionaryValues?.gender || savedData.dictionaryValues?.city || savedData.dictionaryValues?.country);
      
      // Если есть данные и режим не ручной, значит данные были загружены через сервис
      // В этом случае устанавливаем состояние 'data_loaded', чтобы сразу показывать все поля
      if (hasData && savedData.manualInput === false && savedData.autoModeState !== 'data_loaded') {
        setAutoModeState('data_loaded');
      }
      
      // При восстановлении состояния устанавливаем currentView в 'main' (основной вид формы)
      setCurrentView('main');
    }
    // После загрузки данных помечаем, что начальная загрузка завершена
    setIsInitialLoad(false);
  }, [applicationId]);

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
  const handleOpenClientType = () => {
    setPreviousView(currentView);
    setCurrentView('clientType');
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

  // Обработчики для автоматического режима
  const handleToggleManualInput = () => {
    setManualInput(!manualInput);
    if (!manualInput) {
      // Очищаем данные при включении ручного ввода
      setInsuredData({
        iin: '',
        telephone: '',
        name: '',
        surname: '',
        patronymic: '',
        street: '',
        microdistrict: '',
        houseNumber: '',
        apartmentNumber: '',
        docNumber: '',
        documentFile: '',
        birthDate: '',
        issueDate: '',
        expiryDate: '',
        gender: '',
        economSecId: '',
        countryId: '',
        region_id: '',
        settlementType: '',
        city: '',
        vidDocId: '',
        issuedBy: '',
        residency: 'Резидент',
        clientType: ''
      });
      setAutoModeState('initial');
    }
  };

  const handleSendRequest = async () => {
    // Проверяем наличие ИИН и телефона
    if (!insuredData.iin || !insuredData.telephone) {
      alert('Пожалуйста, заполните ИИН и номер телефона');
      return;
    }

    // Переход в состояние request_sent
    setAutoModeState('request_sent');
    
    try {
      // Отправляем запрос на сервер
      const phone = insuredData.telephone.replace(/\D/g, ''); // Убираем все нецифровые символы
      const iin = insuredData.iin.replace(/\D/g, ''); // Убираем все нецифровые символы
      
      const apiData = await getPerson(phone, iin);
      
      // Сохраняем данные из API
      setApiResponseData(apiData);
      
      // Переход в состояние response_received
      setAutoModeState('response_received');
    } catch (error) {
      console.error('Error fetching person data:', error);
      alert('Ошибка при получении данных. Попробуйте еще раз.');
      setAutoModeState('initial');
    }
  };

  const handleUpdate = () => {
    if (!apiResponseData) {
      alert('Нет данных для обновления');
      return;
    }

    // Маппинг данных из API ответа в формат формы
    const mappedData = mapApiDataToForm(apiResponseData);
    
    // Обновляем поля формы, используя данные из API в приоритете
    // Сохраняем только ИИН и телефон, которые были введены пользователем
    setInsuredData(prev => ({
      ...prev,
      iin: prev.iin || mappedData.iin || '',
      telephone: prev.telephone || mappedData.telephone || '',
      name: mappedData.name || prev.name || '',
      surname: mappedData.surname || prev.surname || '',
      patronymic: mappedData.patronymic || prev.patronymic || '',
      street: mappedData.street || prev.street || '',
      houseNumber: mappedData.houseNumber || prev.houseNumber || '',
      apartmentNumber: mappedData.apartmentNumber || prev.apartmentNumber || '',
      docNumber: mappedData.docNumber || prev.docNumber || '',
      birthDate: mappedData.birthDate || prev.birthDate || '',
      issueDate: mappedData.issueDate || prev.issueDate || '',
      expiryDate: mappedData.expiryDate || prev.expiryDate || '',
      gender: mappedData.gender || prev.gender || '',
      countryId: mappedData.countryId || prev.countryId || '',
      region_id: mappedData.region_id || prev.region_id || '',
      city: mappedData.city || prev.city || '',
      issuedBy: mappedData.issuedBy || prev.issuedBy || ''
    }));
    
    setAutoModeState('data_loaded');
  };


  const getHeaderButtonText = () => {
    if (manualInput) return 'Сохранить';
    if (autoModeState === 'initial' || autoModeState === 'request_sent') return 'Отправить запрос';
    if (autoModeState === 'response_received') return 'Обновить';
    if (autoModeState === 'data_loaded') return 'Сохранить';
    return 'Сохранить';
  };

  const handleHeaderButtonClick = () => {
    if (manualInput) {
      // Сохранение данных при ручном вводе
      const dataToSave = {
        ...insuredData,
        toggleStates,
        autoModeState,
        manualInput,
        currentView: 'main'
      };
      console.log('💾 [ЗАСТРАХОВАННЫЙ - Иное лицо] Сохранение по кнопке (ручной ввод):', JSON.parse(JSON.stringify(dataToSave)));
      
      // Сохраняем в глобальное хранилище
      const globalInsuredData = loadGlobalApplicationData(applicationId)?.Insured || {};
      globalInsuredData['type-insured'] = 'other-person';
      globalInsuredData['other-person'] = dataToSave;
      updateGlobalApplicationSection('Insured', globalInsuredData, applicationId);
      
      // Также сохраняем в старое хранилище для обратной совместимости
      const oldFormatData = {
        selectedInsuredType: 'other-person',
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
          documentNumber: insuredData.docNumber,
          documentFile: insuredData.documentFile
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
          residency: insuredData.residency,
          clientType: insuredData.clientType
        },
        toggleStates,
        autoModeState,
        manualInput,
        currentView: 'main'
      };
      saveInsuredOtherPersonData(oldFormatData, applicationId);
      
      if (onSave) {
        onSave({
          selectedInsuredType: 'other-person',
          ...insuredData,
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
        // Сохранение данных при авторежиме
        const dataToSave = {
          ...insuredData,
          toggleStates,
          autoModeState,
          manualInput,
          currentView: 'main'
        };
        console.log('💾 [ЗАСТРАХОВАННЫЙ - Иное лицо] Сохранение по кнопке (авторежим):', JSON.parse(JSON.stringify(dataToSave)));
        
        // Сохраняем в глобальное хранилище
        const globalInsuredData = loadGlobalApplicationData(applicationId)?.Insured || {};
        globalInsuredData['type-insured'] = 'other-person';
        globalInsuredData['other-person'] = dataToSave;
        updateGlobalApplicationSection('Insured', globalInsuredData, applicationId);
        
        // Также сохраняем в старое хранилище для обратной совместимости
        const oldFormatData = {
          selectedInsuredType: 'other-person',
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
            documentNumber: insuredData.docNumber,
            documentFile: insuredData.documentFile
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
            residency: insuredData.residency,
            clientType: insuredData.clientType
          },
          toggleStates,
          autoModeState,
          manualInput,
          currentView: 'main'
        };
        saveInsuredOtherPersonData(oldFormatData, applicationId);
        
        if (onSave) {
          onSave({
            selectedInsuredType: 'other-person',
            ...insuredData,
            ...toggleStates
          });
        }
        if (onBack) onBack();
      }
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
  if (currentView === 'clientType') {
    return <ClientType onBack={() => setCurrentView(previousView)} onSave={(value) => handleDictionaryValueSelect('clientType', value)} />;
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
          <div data-layer="Send request button" data-state="pressed" className="SendRequestButton" onClick={handleHeaderButtonClick} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
            <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getHeaderButtonText()}</div>
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
          {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Иное лицо', onOpenTypes, true)}
          {renderToggleButton('Ручной ввод данных', manualInput, handleToggleManualInput)}
          {!manualInput && (
            <>
              {renderInputField('iin', 'ИИН', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'iin', !!insuredData.iin)}
              {renderInputField('phone', 'Номер телефона', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'phone', !!insuredData.telephone)}
            </>
          )}
          {manualInput && (
            <>
              {renderDictionaryButton('residency', 'Признак резидентства', insuredData.residency, () => {}, !!insuredData.residency)}
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
              {renderAttachField('documentFile', 'Документ подтверждающий личность', insuredData.documentFile)}
              {renderDictionaryButton('docType', 'Тип документа', insuredData.vidDocId, handleOpenDocType, !!insuredData.vidDocId)}
              {renderInputField('documentNumber', 'Номер документа', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, false, !!insuredData.docNumber)}
              {renderDictionaryButton('issuedBy', 'Кем выдано', insuredData.issuedBy, handleOpenIssuedBy, !!insuredData.issuedBy)}
              {renderCalendarField('issueDate', 'Выдан от', insuredData.issueDate)}
              {renderCalendarField('expiryDate', 'Действует до', insuredData.expiryDate)}
              {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
              {renderDictionaryButton('clientType', 'Тип клиента', insuredData.clientType, handleOpenClientType, !!insuredData.clientType)}
            </>
          )}
          {!manualInput && autoModeState === 'data_loaded' && (
            <>
              {renderDictionaryButton('residency', 'Признак резидентства', insuredData.residency, () => {}, !!insuredData.residency)}
              {renderInputField('iin', 'ИИН', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'iin', !!insuredData.iin)}
              {renderInputField('phone', 'Номер телефона', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'phone', !!insuredData.telephone)}
              {renderInputField('lastName', 'Фамилия', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'lastName', !!insuredData.surname)}
              {renderInputField('firstName', 'Имя', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'firstName', !!insuredData.name)}
              {renderInputField('middleName', 'Отчество', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'middleName', !!insuredData.patronymic)}
              {renderCalendarField('birthDate', 'Дата рождения', insuredData.birthDate)}
              {renderDictionaryButton('gender', 'Пол', insuredData.gender, handleOpenGender, !!insuredData.gender)}
              {renderDictionaryButton('sectorCode', 'Код сектора экономики', insuredData.economSecId, handleOpenSectorCode, !!insuredData.economSecId)}
              {renderDictionaryButton('country', 'Страна', insuredData.countryId, handleOpenCountry, !!insuredData.countryId)}
              {renderDictionaryButton('region', 'Область', insuredData.region_id, handleOpenRegion, !!insuredData.region_id)}
              {renderDictionaryButton('settlementType', 'Вид населенного пункта', insuredData.settlementType, handleOpenSettlementType, !!insuredData.settlementType)}
              {renderDictionaryButton('city', 'Город', insuredData.city, handleOpenCity, !!insuredData.city)}
              {renderInputField('street', 'Улица', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'street', !!insuredData.street)}
              {renderInputField('microdistrict', 'Микрорайон', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'microdistrict', !!insuredData.microdistrict)}
              {renderInputField('houseNumber', '№ дома', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'houseNumber', !!insuredData.houseNumber)}
              {renderInputField('apartmentNumber', '№ квартиры', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'apartmentNumber', !!insuredData.apartmentNumber)}
              {renderAttachField('documentFile', 'Документ подтверждающий личность', insuredData.documentFile)}
              {renderDictionaryButton('docType', 'Тип документа', insuredData.vidDocId, handleOpenDocType, !!insuredData.vidDocId)}
              {renderInputField('documentNumber', 'Номер документа', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'documentNumber', !!insuredData.docNumber)}
              {renderDictionaryButton('issuedBy', 'Кем выдано', insuredData.issuedBy, handleOpenIssuedBy, !!insuredData.issuedBy)}
              {renderCalendarField('issueDate', 'Выдан от', insuredData.issueDate)}
              {renderCalendarField('expiryDate', 'Действует до', insuredData.expiryDate)}
              {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
              {renderDictionaryButton('clientType', 'Тип клиента', insuredData.clientType, handleOpenClientType, !!insuredData.clientType)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherPerson;

