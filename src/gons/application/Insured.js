import React, { useState } from 'react';
import Gender from '../dictionary/Gender';
import Country from '../dictionary/Country';
import Citizenship from '../dictionary/Citizenship';
import City from '../dictionary/City';
import IssuedBy from '../dictionary/IssuedBy';

const Insured = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');
  
  // Состояние для полей ввода
  const [fieldValues, setFieldValues] = useState({
    iin: '',
    phone: '',
    smsCode: '',
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    issueDate: '',
    documentNumber: '',
    street: '',
    house: '',
    apartment: '',
    profession: '',
    workplace: '',
    position: ''
  });
  
  // Состояние для выбранных значений из справочников
  const [dictionaryValues, setDictionaryValues] = useState({
    gender: '',
    issuedBy: '',
    citizenship: '',
    country: '',
    city: ''
  });
  
  // Состояние для отслеживания активного поля
  const [activeField, setActiveField] = useState(null);

  // Navigation handlers
  const handleBackToMain = () => setCurrentView('main');
  const handleOpenGender = () => setCurrentView('gender');
  const handleOpenCountry = () => setCurrentView('country');
  const handleOpenCitizenship = () => setCurrentView('citizenship');
  const handleOpenCity = () => setCurrentView('city');
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
  if (currentView === 'gender') {
    return <Gender onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('gender', value)} />;
  }
  if (currentView === 'country') {
    return <Country onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('country', value)} />;
  }
  if (currentView === 'citizenship') {
    return <Citizenship onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('citizenship', value)} />;
  }
  if (currentView === 'city') {
    return <City onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('city', value)} />;
  }
  if (currentView === 'issuedBy') {
    return <IssuedBy onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('issuedBy', value)} />;
  }

  return (
    <div data-layer="Insured Data Received" className="InsuredDataReceived" style={{width: 393, height: 2004, paddingBottom: 16, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
  <div data-layer="Sections" className="Sections" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
    <div data-layer="Header" data-show-indicator="false" data-type="Main" className="Header" style={{width: 393, height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div data-layer="Back button" className="BackButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onBack}>
        <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L7 10.5L15 3" stroke="black" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Застрахованный</div>
      </div>
      <div data-layer="Progress container" className="ProgressContainer" style={{width: 85, height: 85, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}} />
    </div>
    <div data-layer="List" className="List" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
      <div data-layer="Alert" className="Alert" style={{width: 393, height: 85, paddingRight: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Info container" className="InfoContainer" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4974_224)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.916504 11C0.916504 5.43099 5.43083 0.916672 10.9998 0.916672C16.5688 0.916672 21.0832 5.43099 21.0832 11C21.0832 16.569 16.5688 21.0833 10.9998 21.0833C5.43083 21.0833 0.916504 16.569 0.916504 11ZM10.9998 2.75001C6.44335 2.75001 2.74984 6.44352 2.74984 11C2.74984 15.5565 6.44335 19.25 10.9998 19.25C15.5563 19.25 19.2498 15.5565 19.2498 11C19.2498 6.44352 15.5563 2.75001 10.9998 2.75001ZM10.074 7.33334C10.074 6.82708 10.4844 6.41667 10.9907 6.41667H10.9998C11.5061 6.41667 11.9165 6.82708 11.9165 7.33334C11.9165 7.8396 11.5061 8.25001 10.9998 8.25001H10.9907C10.4844 8.25001 10.074 7.8396 10.074 7.33334ZM10.9998 10.0833C11.5061 10.0833 11.9165 10.4937 11.9165 11V14.6667C11.9165 15.1729 11.5061 15.5833 10.9998 15.5833C10.4936 15.5833 10.0832 15.1729 10.0832 14.6667V11C10.0832 10.4937 10.4936 10.0833 10.9998 10.0833Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_4974_224">
            <rect width="22" height="22" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>
        </div>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нажмите на обновить, чтобы получить персональные данные клиента</div>
      </div>
      {renderInputField('iin', 'ИИН', activeField === 'iin', !!fieldValues.iin)}
      {renderInputField('phone', 'Номер телефона', activeField === 'phone', !!fieldValues.phone)}
      {renderInputField('smsCode', 'Смс код', activeField === 'smsCode', !!fieldValues.smsCode)}
      {renderInputField('lastName', 'Фамилия', activeField === 'lastName', !!fieldValues.lastName)}
      {renderInputField('firstName', 'Имя', activeField === 'firstName', !!fieldValues.firstName)}
      {renderInputField('middleName', 'Отчество', activeField === 'middleName', !!fieldValues.middleName)}
      {renderDictionaryButton('gender', 'Пол', handleOpenGender, !!dictionaryValues.gender)}
      {renderInputField('birthDate', 'Дата рождения', activeField === 'birthDate', !!fieldValues.birthDate)}
      {renderInputField('issueDate', 'Дата выдачи', activeField === 'issueDate', !!fieldValues.issueDate)}
      {renderDictionaryButton('issuedBy', 'Кем выдано', handleOpenIssuedBy, !!dictionaryValues.issuedBy)}
      {renderInputField('documentNumber', 'Номер документа', activeField === 'documentNumber', !!fieldValues.documentNumber)}
      {renderDictionaryButton('citizenship', 'Гражданство', handleOpenCitizenship, !!dictionaryValues.citizenship)}
      {renderDictionaryButton('country', 'Страна', handleOpenCountry, !!dictionaryValues.country)}
      {renderDictionaryButton('city', 'Город', handleOpenCity, !!dictionaryValues.city)}
      {renderInputField('street', 'Улица', activeField === 'street', !!fieldValues.street)}
      {renderInputField('house', 'Дом', activeField === 'house', !!fieldValues.house)}
      {renderInputField('apartment', 'Квартира', activeField === 'apartment', !!fieldValues.apartment)}
      {renderInputField('profession', 'Профессия', activeField === 'profession', !!fieldValues.profession)}
      {renderInputField('workplace', 'Место работы', activeField === 'workplace', !!fieldValues.workplace)}
      {renderInputField('position', 'Занимаемая должность', activeField === 'position', !!fieldValues.position)}
    </div>
  </div>
  <div data-layer="Button Container" className="ButtonContainer" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
    <div data-layer="Button" data-state="pressed" className="Button" style={{width: 361, height: 68, background: '#E0E0E0', overflow: 'hidden', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Обновить</div>
    </div>
  </div>
    </div>
  );
};

export default Insured;