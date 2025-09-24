import React, { useState } from 'react';
import Gender from '../dictionary/Gender';
import Country from '../dictionary/Country';
import Citizenship from '../dictionary/Citizenship';
import City from '../dictionary/City';
import IssuedBy from '../dictionary/IssuedBy';
import DocType from '../dictionary/DocType';
import SelectChild from '../dictionary/SelectChild';

const Beneficiary = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');
  
  // Состояние для полей ввода
  const [fieldValues, setFieldValues] = useState({
    parentIin: '',
    parentPhone: '',
    smsCode: '',
    childIin: '',
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    email: '',
    gender: '',
    address: '',
    street: '',
    house: '',
    apartment: '',
    documentNumber: '',
    issueDate: ''
  });
  
  // Состояние для выбранных значений из справочников
  const [dictionaryValues, setDictionaryValues] = useState({
    selectChild: '',
    citizenship: '',
    country: '',
    city: '',
    docType: '',
    issuedBy: ''
  });
  
  // Состояние для отслеживания активного поля
  const [activeField, setActiveField] = useState(null);

  // Состояние для управления видимостью полей
  const [showAllFields, setShowAllFields] = useState(false);

  // Состояние для toggle кнопок
  const [toggleStates, setToggleStates] = useState({
    forOwnChild: false,
    applyParentAddress: false
  });

  // Navigation handlers
  const handleBackToMain = () => setCurrentView('main');
  const handleOpenSelectChild = () => setCurrentView('selectChild');
  const handleOpenGender = () => setCurrentView('gender');
  const handleOpenCitizenship = () => setCurrentView('citizenship');
  const handleOpenCountry = () => setCurrentView('country');
  const handleOpenCity = () => setCurrentView('city');
  const handleOpenDocType = () => setCurrentView('docType');
  const handleOpenIssuedBy = () => setCurrentView('issuedBy');

  // Обработчики для полей ввода
  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFieldBlur = (fieldName) => {
    // Если поле пустое, возвращаем к обычному состоянию
    if (!fieldValues[fieldName]) {
      setActiveField(null);
    }
  };

  // Обработчики для toggle кнопок
  const handleToggleClick = (toggleName) => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  // Обработчики для динамической кнопки
  const handleRequestData = () => {
    setShowAllFields(true);
  };

  const handleSave = () => {
    // Логика сохранения данных
    console.log('Saving data:', { fieldValues, dictionaryValues });
  };

  // Обработчик для сохранения выбранных значений из справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

  // Функция для рендеринга кнопок справочника
  const renderDictionaryButton = (fieldName, label, onClickHandler, hasValue) => {
    if (hasValue) {
      return (
        <div data-layer="InputContainerDictionaryButton" data-state="pressed" className="Inputcontainerdictionarybutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="Input text" className="InputText" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues[fieldName]}</div>
          </div>
          <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onClickHandler}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div data-layer="InputContainerDictionaryButton" data-state="not_pressed" className="Inputcontainerdictionarybutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
          <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onClickHandler}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

  // Функция для рендеринга поля ввода
  const renderInputField = (fieldName, label, isActive, hasValue) => {
    if (isActive || hasValue) {
      return (
        <div data-layer="InputContainerWithoutButton" data-state="pressed" className="Inputcontainerwithoutbutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="%Input text" className="InputText" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
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
                  color: 'black',
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
        <div data-layer="InputContainerWithoutButton" data-state="not_pressed" className="Inputcontainerwithoutbutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => handleFieldClick(fieldName)}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        </div>
      );
    }
  };

  // Conditional rendering for dictionary components
  if (currentView === 'selectChild') {
    return <SelectChild onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('selectChild', value)} />;
  }
  if (currentView === 'gender') {
    return <Gender onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('gender', value)} />;
  }
  if (currentView === 'citizenship') {
    return <Citizenship onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('citizenship', value)} />;
  }
  if (currentView === 'country') {
    return <Country onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('country', value)} />;
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

  return (
    <div data-layer="Main Container" className="MainContainer" style={{width: 393, height: '100vh', minHeight: '100vh', background: 'white', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', display: 'flex', position: 'relative'}}>
      {/* Fixed Header */}
      <div data-layer="Header" data-show-indicator="false" data-type="Main" className="Header" style={{width: 393, height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'flex', position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1000}}>
        <div data-layer="Back button" className="BackButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onBack}>
          <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L7 10.5L15 3" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
        <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Выгодоприобретатель</div>
        </div>
        <div data-layer="Progress container" className="ProgressContainer" style={{width: 85, height: 85, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}} />
      </div>

      {/* Scrollable Content */}
      <div data-layer="Scrollable Content" className="ScrollableContent" style={{width: 393, flex: 1, overflowY: 'auto', paddingTop: 85, paddingBottom: 100, display: 'flex', flexDirection: 'column'}}>
        <div data-layer="Content List" className="ContentList" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
      <div data-layer="InputContainerToggleButton" data-state={toggleStates.forOwnChild ? "pressed" : "not_pressed"} className="Inputcontainertogglebutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => handleToggleClick('forOwnChild')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Скопировать данные страхователя</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill={toggleStates.forOwnChild ? "black" : "#E0E0E0"}/>
            <circle cx={toggleStates.forOwnChild ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      {renderInputField('parentIin', 'ИИН родителя или опекуна', activeField === 'parentIin', !!fieldValues.parentIin)}
      {renderInputField('parentPhone', 'Телефон родителя или опекуна', activeField === 'parentPhone', !!fieldValues.parentPhone)}
      
      {/* Дополнительные поля - показываются только после нажатия "Запросить данные" */}
      {showAllFields && (
        <>
          {renderInputField('smsCode', 'Смс код', activeField === 'smsCode', !!fieldValues.smsCode)}
          {renderDictionaryButton('selectChild', 'Выберите ребенка', handleOpenSelectChild, !!dictionaryValues.selectChild)}
          {renderInputField('childIin', 'ИИН ребенка', activeField === 'childIin', !!fieldValues.childIin)}
          {renderInputField('lastName', 'Фамилия', activeField === 'lastName', !!fieldValues.lastName)}
          {renderInputField('firstName', 'Имя', activeField === 'firstName', !!fieldValues.firstName)}
          {renderInputField('middleName', 'Отчество', activeField === 'middleName', !!fieldValues.middleName)}
          {renderInputField('birthDate', 'Дата рождения', activeField === 'birthDate', !!fieldValues.birthDate)}
          {renderInputField('email', 'Электронная почта', activeField === 'email', !!fieldValues.email)}
          {renderInputField('gender', 'Пол', activeField === 'gender', !!fieldValues.gender)}
          {renderDictionaryButton('citizenship', 'Гражданство', handleOpenCitizenship, !!dictionaryValues.citizenship)}
          <div data-layer="InputContainerToggleButton" data-state={toggleStates.applyParentAddress ? "pressed" : "not_pressed"} className="Inputcontainertogglebutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => handleToggleClick('applyParentAddress')}>
            <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Применить адрес родителя</div>
            </div>
            <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
                <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="16" rx="8" fill={toggleStates.applyParentAddress ? "black" : "#E0E0E0"}/>
                <circle cx={toggleStates.applyParentAddress ? "24" : "8"} cy="8" r="6" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          {renderInputField('address', 'Адрес', activeField === 'address', !!fieldValues.address)}
          {renderDictionaryButton('country', 'Страна', handleOpenCountry, !!dictionaryValues.country)}
          {renderDictionaryButton('city', 'Город', handleOpenCity, !!dictionaryValues.city)}
          {renderInputField('street', 'Улица', activeField === 'street', !!fieldValues.street)}
          {renderInputField('house', 'Дом', activeField === 'house', !!fieldValues.house)}
          {renderInputField('apartment', 'Квартира', activeField === 'apartment', !!fieldValues.apartment)}
          {renderDictionaryButton('docType', 'Вид документа', handleOpenDocType, !!dictionaryValues.docType)}
          {renderInputField('documentNumber', 'Номер документа', activeField === 'documentNumber', !!fieldValues.documentNumber)}
          {renderDictionaryButton('issuedBy', 'Кем выдано', handleOpenIssuedBy, !!dictionaryValues.issuedBy)}
          {renderInputField('issueDate', 'Дата выдачи', activeField === 'issueDate', !!fieldValues.issueDate)}
        </>
      )}
        </div>
      </div>

      {/* Fixed Footer/Button */}
      <div data-layer="Button Container" className="ButtonContainer" style={{width: 393, height: 100, paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16, background: 'white', borderTop: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1000}}>
        <div data-layer="Button" data-state="pressed" className="Button" style={{width: 361, height: 68, background: '#E0E0E0', overflow: 'hidden', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={showAllFields ? handleSave : handleRequestData}>
          <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{showAllFields ? 'Сохранить' : 'Запросить данные'}</div>
        </div>
      </div>
    </div>
  );
};

export default Beneficiary;