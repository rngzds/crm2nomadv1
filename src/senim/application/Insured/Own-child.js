import React, { useState, useEffect } from 'react';
import SelectChild from '../../dictionary/SelectChild';
import Gender from '../../dictionary/Gender';
import SectorCode from '../../dictionary/SectorCode';
import Country from '../../dictionary/Country';
import Region from '../../dictionary/Region';
import SettlementType from '../../dictionary/SettlementType';
import City from '../../dictionary/City';
import DocType from '../../dictionary/DocType';
import IssuedBy from '../../dictionary/IssuedBy';
import { saveInsuredOwnChildData, loadInsuredOwnChildData, loadGlobalApplicationData, updateGlobalApplicationSection } from '../../../services/storageService';
import { getChildFullName, formatDate as formatChildDate } from '../../../services/childService';
import { renderInputField, renderDictionaryButton, renderCalendarField, renderToggleButton } from './InsuredFormFields';

const OwnChild = ({ onBack, onSave, applicationId, onOpenTypes, policyholderData }) => {
  const [currentView, setCurrentView] = useState('own-child');
  const [previousView, setPreviousView] = useState('own-child');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [selectedChild, setSelectedChild] = useState(null);
  const [isAddingNewChild, setIsAddingNewChild] = useState(false);
  const [manualInputChild, setManualInputChild] = useState(false);

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
    
    if (globalData && globalData.Insured && globalData.Insured['own-child']) {
      savedData = globalData.Insured['own-child'];
      console.log('📖 [ЗАСТРАХОВАННЫЙ - Свой ребенок] Загружено из глобального хранилища:', JSON.parse(JSON.stringify(savedData)));
    } else {
      // Если в глобальном хранилище нет, загружаем из старого хранилища
      savedData = loadInsuredOwnChildData(applicationId);
      if (savedData) {
        console.log('📖 [ЗАСТРАХОВАННЫЙ - Свой ребенок] Загружено из старого хранилища:', JSON.parse(JSON.stringify(savedData)));
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
      if (savedData.selectedChild !== undefined) {
        setSelectedChild(savedData.selectedChild);
      }
      if (savedData.isAddingNewChild !== undefined) {
        setIsAddingNewChild(savedData.isAddingNewChild);
      }
      if (savedData.manualInputChild !== undefined) {
        setManualInputChild(savedData.manualInputChild);
      }
      // При восстановлении состояния устанавливаем currentView в 'own-child' (основной вид формы)
      setCurrentView('own-child');
    }
    // После загрузки данных помечаем, что начальная загрузка завершена
    setIsInitialLoad(false);
  }, [applicationId]);

  // Загружаем данные ребенка при переходе на child-date
  useEffect(() => {
    if (currentView === 'child-date') {
      // Сначала пытаемся загрузить сохраненные данные
      const savedChildData = loadInsuredOwnChildData(applicationId);
      
      // Если есть сохраненные данные ребенка, загружаем их
      if (savedChildData && (savedChildData.fieldValues || savedChildData.iin) && 
          (savedChildData.currentView === 'child-date' || 
           savedChildData.currentView === 'own-child')) {
        // Миграция старых данных в новую структуру
        if (savedChildData.fieldValues || savedChildData.dateValues || savedChildData.dictionaryValues) {
          const migratedData = {
            iin: savedChildData.fieldValues?.iin || savedChildData.iin || '',
            telephone: savedChildData.fieldValues?.phone || savedChildData.telephone || '',
            name: savedChildData.fieldValues?.firstName || savedChildData.name || '',
            surname: savedChildData.fieldValues?.lastName || savedChildData.surname || '',
            patronymic: savedChildData.fieldValues?.middleName || savedChildData.patronymic || '',
            street: savedChildData.fieldValues?.street || savedChildData.street || '',
            microdistrict: savedChildData.fieldValues?.microdistrict || savedChildData.microdistrict || '',
            houseNumber: savedChildData.fieldValues?.houseNumber || savedChildData.houseNumber || '',
            apartmentNumber: savedChildData.fieldValues?.apartmentNumber || savedChildData.apartmentNumber || '',
            docNumber: savedChildData.fieldValues?.documentNumber || savedChildData.docNumber || '',
            birthDate: savedChildData.dateValues?.birthDate || savedChildData.birthDate || '',
            issueDate: savedChildData.dateValues?.issueDate || savedChildData.issueDate || '',
            expiryDate: savedChildData.dateValues?.expiryDate || savedChildData.expiryDate || '',
            gender: savedChildData.dictionaryValues?.gender || savedChildData.gender || '',
            economSecId: savedChildData.dictionaryValues?.sectorCode || savedChildData.economSecId || '',
            countryId: savedChildData.dictionaryValues?.country || savedChildData.countryId || '',
            region_id: savedChildData.dictionaryValues?.region || savedChildData.region_id || '',
            settlementType: savedChildData.dictionaryValues?.settlementType || savedChildData.settlementType || '',
            city: savedChildData.dictionaryValues?.city || savedChildData.city || '',
            vidDocId: savedChildData.dictionaryValues?.docType || savedChildData.vidDocId || '',
            issuedBy: savedChildData.dictionaryValues?.issuedBy || savedChildData.issuedBy || '',
            residency: savedChildData.dictionaryValues?.residency || savedChildData.residency || 'Резидент'
          };
          setInsuredData(migratedData);
        } else if (savedChildData.iin || savedChildData.name) {
          setInsuredData(prev => ({ ...prev, ...savedChildData }));
        }
        if (savedChildData.toggleStates) setToggleStates(savedChildData.toggleStates);
        if (savedChildData.manualInputChild !== undefined) setManualInputChild(savedChildData.manualInputChild);
      } else if (selectedChild && !isAddingNewChild && typeof selectedChild === 'object') {
        // Загружаем данные выбранного ребенка из API ответа
        setInsuredData({
          iin: selectedChild.child_iin || '',
          telephone: '',
          name: selectedChild.child_name || '',
          surname: selectedChild.child_surname || '',
          patronymic: selectedChild.child_patronymic || '',
          street: '',
          microdistrict: '',
          houseNumber: '',
          apartmentNumber: '',
          docNumber: '',
          birthDate: formatChildDate(selectedChild.child_birth_date) || '',
          issueDate: formatChildDate(selectedChild.act_date) || '',
          expiryDate: '',
          gender: '',
          economSecId: '',
          countryId: '',
          region_id: '',
          settlementType: '',
          city: '',
          vidDocId: '',
          issuedBy: selectedChild.zags_name_ru || '',
          residency: 'Резидент'
        });
      } else if (isAddingNewChild || selectedChild === 'Добавить ребенка') {
        // Очищаем данные для нового ребенка
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
          residency: 'Резидент'
        });
      }
    }
  }, [currentView, selectedChild, isAddingNewChild, applicationId]);

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

  // Обработчики для childs (выбор ребенка)
  const handleOpenChilds = () => {
    setPreviousView(currentView);
    setCurrentView('childs');
  };

  const handleChildSelect = (value) => {
    if (value === 'Добавить ребенка') {
      setIsAddingNewChild(true);
      setSelectedChild('Добавить ребенка');
      setManualInputChild(true); // Автоматически включаем ручной ввод
    } else if (value && typeof value === 'object') {
      // Выбран ребенок из API
      setIsAddingNewChild(false);
      setSelectedChild(value);
      setManualInputChild(false); // Выключаем ручной ввод при выборе существующего ребенка
    } else {
      // Fallback для старого формата (строка)
      setIsAddingNewChild(false);
      setSelectedChild(value);
      setManualInputChild(false);
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
    if (isAddingNewChild || selectedChild === 'Добавить ребенка') {
      const fullName = [insuredData.surname, insuredData.name, insuredData.patronymic]
        .filter(Boolean)
        .join(' ');
      setSelectedChild(fullName || 'Добавить ребенка');
    }
    // Если выбран ребенок из API, selectedChild уже содержит объект, ничего не меняем
    
    // Сохраняем данные ребенка
    const dataToSave = {
      ...insuredData,
      toggleStates,
      selectedChild,
      isAddingNewChild,
      manualInputChild,
      currentView: 'own-child' // После сохранения возвращаемся на own-child
    };
    console.log('💾 [ЗАСТРАХОВАННЫЙ - Свой ребенок] Сохранение данных ребенка:', JSON.parse(JSON.stringify(dataToSave)));
    
    // Сохраняем в глобальное хранилище
    const globalInsuredData = loadGlobalApplicationData(applicationId)?.Insured || {};
    globalInsuredData['type-insured'] = 'own-child';
    globalInsuredData['own-child'] = dataToSave;
    updateGlobalApplicationSection('Insured', globalInsuredData, applicationId);
    
    // Также сохраняем в старое хранилище для обратной совместимости
    const oldFormatData = {
      selectedInsuredType: 'own-child',
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
      selectedChild,
      isAddingNewChild,
      manualInputChild,
      currentView: 'own-child'
    };
    saveInsuredOwnChildData(oldFormatData, applicationId);
    
    // После сохранения данных ребенка, возвращаемся на страницу own-child
    setCurrentView('own-child');
  };


  const handleSave = () => {
    // Сохраняем финальные данные для "свой ребенок"
    const dataToSave = {
      ...insuredData,
      toggleStates,
      selectedChild,
      isAddingNewChild,
      manualInputChild,
      currentView: 'own-child'
    };
    console.log('💾 [ЗАСТРАХОВАННЫЙ - Свой ребенок] Сохранение по кнопке:', JSON.parse(JSON.stringify(dataToSave)));
    
    // Сохраняем в глобальное хранилище
    const globalInsuredData = loadGlobalApplicationData(applicationId)?.Insured || {};
    globalInsuredData['type-insured'] = 'own-child';
    globalInsuredData['own-child'] = dataToSave;
    updateGlobalApplicationSection('Insured', globalInsuredData, applicationId);
    
    // Также сохраняем в старое хранилище для обратной совместимости
    const oldFormatData = {
      selectedInsuredType: 'own-child',
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
      selectedChild,
      isAddingNewChild,
      manualInputChild,
      currentView: 'own-child'
    };
    saveInsuredOwnChildData(oldFormatData, applicationId);
    
    if (onSave) {
      onSave({
        selectedInsuredType: 'own-child',
        selectedChild: selectedChild, // Может быть объектом или строкой
        ...insuredData,
        ...toggleStates
      });
    }
    if (onBack) onBack();
  };

  // Получение отображаемого имени выбранного ребенка
  const getSelectedChildDisplay = () => {
    if (isAddingNewChild || selectedChild === 'Добавить ребенка') {
      return 'Добавить ребенка';
    }
    if (selectedChild && typeof selectedChild === 'object') {
      return getChildFullName(selectedChild);
    }
    if (selectedChild && typeof selectedChild === 'string') {
      return selectedChild;
    }
    return '';
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
  if (currentView === 'childs') {
    // Для своего ребенка - используем данные страхователя
    let childIin = '';
    let childPhone = '';
    if (policyholderData) {
      childIin = policyholderData.iin || '';
      childPhone = policyholderData.telephone || '';
    }
    return <SelectChild onBack={() => setCurrentView('own-child')} onSelect={handleChildSelect} iin={childIin} phone={childPhone} />;
  }

  // Рендеринг меню
  const renderMenu = () => (
    <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div data-layer="Back button" className="BackButton" onClick={currentView === 'own-child' ? onBack : () => setCurrentView('own-child')} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
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
          {currentView === 'own-child' ? (
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
          ) : null}
          <div data-layer="Save button" data-state="pressed" className="SaveButton" onClick={currentView === 'child-date' ? handleSaveChildDate : handleSave} style={{width: currentView === 'own-child' ? 390 : 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
            <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{currentView === 'child-date' ? 'Сохранить' : 'Сохранить'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Страница: Для своего ребенка
  if (currentView === 'own-child') {
    return (
      <div data-layer="Insured data page" className="InsuredDataPage" style={{width: 1512, height: 982, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        {renderMenu()}
        <div data-layer="Insured data" className="InsuredData" style={{width: 1427, height: 982, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          {renderSubHeader('Застрахованный')}
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('insuredType', 'Тип Застрахованного', 'Для своего ребенка', onOpenTypes, true)}
            {renderDictionaryButton('selectChild', 'Выбрать ребенка', getSelectedChildDisplay(), handleOpenChilds, !!(selectedChild || isAddingNewChild))}
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
                <div data-layer="Save button" data-state="pressed" className="SaveButton" onClick={handleSaveChildDate} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
                  <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
                </div>
              </div>
            </div>
          </div>
          <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {renderDictionaryButton('selectChild', 'Выбрать ребенка', getSelectedChildDisplay(), handleOpenChilds, !!(selectedChild || isAddingNewChild))}
            {renderToggleButton('Ручной ввод данных', manualInputChild, handleToggleManualInputChild)}
            {renderInputField('iin', 'ИИН', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'iin', !!insuredData.iin)}
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
            {renderDictionaryButton('docType', 'Тип документа', insuredData.vidDocId, handleOpenDocType, !!insuredData.vidDocId)}
            {renderInputField('documentNumber', 'Номер документа', insuredData, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, activeField === 'documentNumber', !!insuredData.docNumber)}
            {renderDictionaryButton('issuedBy', 'Кем выдано', insuredData.issuedBy, handleOpenIssuedBy, !!insuredData.issuedBy)}
            {renderCalendarField('issueDate', 'Выдан от', insuredData.issueDate)}
            {renderCalendarField('expiryDate', 'Действует до', insuredData.expiryDate)}
            {renderToggleButton('Признак ПДЛ', toggleStates.pdl, handleTogglePDL)}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default OwnChild;

