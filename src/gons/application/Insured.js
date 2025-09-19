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
    lastName: '',
    firstName: '',
    middleName: '',
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
      <div data-layer="InputContainerGBDButton" data-state="not_pressed" className="Inputcontainergbdbutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Номер телефона</div>
        </div>
        <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-layer="Bank" className="Bank" style={{width: 22, height: 22, left: 31, top: 32, position: 'absolute'}}>
            <div data-svg-wrapper data-layer="icon" className="Icon" style={{left: 1.50, top: 1.50, position: 'absolute'}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.70333 3.03249L1.45459 5.68199L1.5262 6.66063L1.59781 7.66315H10.0714H18.545L18.6166 6.66063L18.6883 5.68199L14.6066 3.15184C12.3629 1.74355 10.4056 0.550082 10.2385 0.502343C10.0953 0.430735 8.04253 1.57646 5.70333 3.03249ZM11.1217 3.60536C12.2674 4.77496 11.2649 6.63677 9.68951 6.25486C7.92318 5.80134 8.25735 3.24732 10.0714 3.24732C10.4533 3.24732 10.9069 3.4144 11.1217 3.60536Z" fill="black"/>
              <path d="M3.14941 11.3621V14.2264H4.58157H6.01374V11.3621V8.4978H4.58157H3.14941V11.3621Z" fill="black"/>
              <path d="M8.63916 11.3621V14.2264H10.0713H11.5035V11.3621V8.4978H10.0713H8.63916V11.3621Z" fill="black"/>
              <path d="M14.1294 11.3621V14.2264H15.5616H16.9937V11.3621V8.4978H15.5616H14.1294V11.3621Z" fill="black"/>
              <path d="M1.88442 15.3489C1.78894 15.4205 1.71734 15.8024 1.71734 16.1604C1.71734 16.6617 1.59799 16.8288 1.19221 16.9004C0.714824 16.972 0.643216 17.1391 0.571608 18.2371L0.5 19.4783L10 19.4305L19.5 19.3589V18.1655C19.5 17.1152 19.4284 16.972 18.9749 16.9004C18.593 16.8526 18.4259 16.6378 18.3781 16.065L18.3065 15.3011L10.1671 15.2295C5.70352 15.2057 1.9799 15.2534 1.88442 15.3489Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="InputContainerSmsButton" data-state="not_pressed" className="Inputcontainersmsbutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Смс код</div>
        </div>
        <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-layer="Verifi" className="Verifi" style={{width: 22, height: 22, left: 31, top: 32, position: 'absolute', overflow: 'hidden'}}>
            <div data-svg-wrapper data-layer="icon" className="Icon" style={{left: 3, top: 1.29, position: 'absolute'}}>
              <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.842389 0.355928C0.569158 0.447005 0.36044 0.602594 0.223825 0.811312C-0.0228415 1.17941 -0.00386717 0.515312 0.00372257 10.0746L0.0151072 18.7838L0.113774 18.9963C0.239004 19.2658 0.443927 19.4707 0.713363 19.5959L0.925876 19.6946H6.06792H11.21L11.4225 19.5959C11.6919 19.4707 11.8968 19.2658 12.0221 18.9963L12.1207 18.7838L12.1321 16.8181L12.1435 14.8561H11.5325H10.9254V15.4633V16.0705H6.06792H1.21049V9.39151V2.71254H6.06792H10.9254V3.31972V3.9269H11.5325H12.1435L12.1321 2.56834L12.1207 1.21357L12.0221 1.00106C11.8968 0.73162 11.6919 0.526697 11.4225 0.401466L11.21 0.3028L6.12485 0.29521C1.30916 0.28762 1.02834 0.28762 0.842389 0.355928Z" fill="black"/>
              <path d="M8.12849 5.21393C7.85526 5.30501 7.64654 5.4606 7.50992 5.66552C7.27844 6.01465 7.28223 5.97291 7.28223 8.77352C7.28223 10.5875 7.29361 11.3844 7.32777 11.5096C7.43023 11.9271 7.78315 12.28 8.20059 12.3824C8.30305 12.409 8.66736 12.428 9.04305 12.428H9.71095V13.0883C9.71095 13.8321 9.74131 13.9535 9.95382 14.1167C10.1132 14.2381 10.3029 14.2723 10.4889 14.2116C10.5686 14.185 11.153 13.7752 11.7905 13.297L12.9518 12.428H14.4242C15.4146 12.428 15.9611 12.4128 16.0787 12.3824C16.4962 12.28 16.8491 11.9271 16.9516 11.5096C17.0161 11.2592 17.0161 6.31065 16.9516 6.06019C16.8491 5.64275 16.4962 5.28983 16.0787 5.18737C15.9497 5.15322 14.8606 5.14183 12.1131 5.14183C8.56869 5.14563 8.31443 5.14942 8.12849 5.21393ZM10.6065 8.24983C10.8153 8.3447 10.9329 8.54203 10.9329 8.78491C10.9329 9.02778 10.8153 9.22511 10.6065 9.31998C10.4054 9.41106 10.265 9.41106 10.0753 9.31619C9.85895 9.20993 9.77546 9.07711 9.75649 8.82285C9.74131 8.56101 9.82859 8.38265 10.0373 8.26501C10.2157 8.15875 10.4016 8.15496 10.6065 8.24983ZM14.2496 8.24983C14.4583 8.3447 14.576 8.54203 14.576 8.78491C14.576 9.02778 14.4583 9.22511 14.2496 9.31998C14.0485 9.41106 13.9081 9.41106 13.7183 9.31619C13.5096 9.21373 13.4185 9.07711 13.3996 8.84183C13.3768 8.57998 13.4679 8.39403 13.6728 8.2726C13.8587 8.15875 14.0371 8.15496 14.2496 8.24983Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {renderInputField('lastName', 'Фамилия', activeField === 'lastName', !!fieldValues.lastName)}
      {renderInputField('firstName', 'Имя', activeField === 'firstName', !!fieldValues.firstName)}
      {renderInputField('middleName', 'Отчество', activeField === 'middleName', !!fieldValues.middleName)}
      {renderDictionaryButton('gender', 'Пол', handleOpenGender, !!dictionaryValues.gender)}
      <div data-layer="InputContainerCalendarButton" data-state="not_pressed" className="Inputcontainercalendarbutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата рождения</div>
        </div>
        <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3335 0.916687C7.83976 0.916687 8.25016 1.32709 8.25016 1.83335V2.75002H13.7502V1.83335C13.7502 1.32709 14.1606 0.916687 14.6668 0.916687C15.1731 0.916687 15.5835 1.32709 15.5835 1.83335V2.75002H17.4168C18.1462 2.75002 18.8456 3.03975 19.3614 3.55548C19.8771 4.0712 20.1668 4.77067 20.1668 5.50002V18.3334C20.1668 19.0627 19.8771 19.7622 19.3614 20.2779C18.8456 20.7936 18.1462 21.0834 17.4168 21.0834H4.5835C3.85415 21.0834 3.15468 20.7936 2.63895 20.2779C2.12323 19.7622 1.8335 19.0627 1.8335 18.3334V5.50002C1.8335 4.77067 2.12323 4.0712 2.63895 3.55548C3.15468 3.03975 3.85415 2.75002 4.5835 2.75002H6.41683V1.83335C6.41683 1.32709 6.82724 0.916687 7.3335 0.916687ZM6.41683 4.58335H4.5835C4.34038 4.58335 4.10722 4.67993 3.93531 4.85184C3.76341 5.02375 3.66683 5.2569 3.66683 5.50002V8.25002H18.3335V5.50002C18.3335 5.25691 18.2369 5.02375 18.065 4.85184C17.8931 4.67993 17.6599 4.58335 17.4168 4.58335H15.5835V5.50002C15.5835 6.00628 15.1731 6.41669 14.6668 6.41669C14.1606 6.41669 13.7502 6.00628 13.7502 5.50002V4.58335H8.25016V5.50002C8.25016 6.00628 7.83976 6.41669 7.3335 6.41669C6.82724 6.41669 6.41683 6.00628 6.41683 5.50002V4.58335ZM18.3335 10.0834H3.66683V18.3334C3.66683 18.5765 3.76341 18.8096 3.93531 18.9815C4.10722 19.1534 4.34038 19.25 4.5835 19.25H17.4168C17.6599 19.25 17.8931 19.1534 18.065 18.9815C18.2369 18.8096 18.3335 18.5765 18.3335 18.3334V10.0834Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="InputContainerCalendarButton" data-state="not_pressed" className="Inputcontainercalendarbutton" style={{width: 393, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата выдачи</div>
        </div>
        <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3335 0.916687C7.83976 0.916687 8.25016 1.32709 8.25016 1.83335V2.75002H13.7502V1.83335C13.7502 1.32709 14.1606 0.916687 14.6668 0.916687C15.1731 0.916687 15.5835 1.32709 15.5835 1.83335V2.75002H17.4168C18.1462 2.75002 18.8456 3.03975 19.3614 3.55548C19.8771 4.0712 20.1668 4.77067 20.1668 5.50002V18.3334C20.1668 19.0627 19.8771 19.7622 19.3614 20.2779C18.8456 20.7936 18.1462 21.0834 17.4168 21.0834H4.5835C3.85415 21.0834 3.15468 20.7936 2.63895 20.2779C2.12323 19.7622 1.8335 19.0627 1.8335 18.3334V5.50002C1.8335 4.77067 2.12323 4.0712 2.63895 3.55548C3.15468 3.03975 3.85415 2.75002 4.5835 2.75002H6.41683V1.83335C6.41683 1.32709 6.82724 0.916687 7.3335 0.916687ZM6.41683 4.58335H4.5835C4.34038 4.58335 4.10722 4.67993 3.93531 4.85184C3.76341 5.02375 3.66683 5.2569 3.66683 5.50002V8.25002H18.3335V5.50002C18.3335 5.25691 18.2369 5.02375 18.065 4.85184C17.8931 4.67993 17.6599 4.58335 17.4168 4.58335H15.5835V5.50002C15.5835 6.00628 15.1731 6.41669 14.6668 6.41669C14.1606 6.41669 13.7502 6.00628 13.7502 5.50002V4.58335H8.25016V5.50002C8.25016 6.00628 7.83976 6.41669 7.3335 6.41669C6.82724 6.41669 6.41683 6.00628 6.41683 5.50002V4.58335ZM18.3335 10.0834H3.66683V18.3334C3.66683 18.5765 3.76341 18.8096 3.93531 18.9815C4.10722 19.1534 4.34038 19.25 4.5835 19.25H17.4168C17.6599 19.25 17.8931 19.1534 18.065 18.9815C18.2369 18.8096 18.3335 18.5765 18.3335 18.3334V10.0834Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
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