import React, { useState } from 'react';
import Gender from '../dictionary/Gender';
import IssuedBy from '../dictionary/IssuedBy';
import Citizenship from '../dictionary/Citizenship';
import Country from '../dictionary/Country';
import City from '../dictionary/City';

const Policyholder = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');
  
  // Состояние для полей ввода
  const [fieldValues, setFieldValues] = useState({
    iin: '',
    phone: '',
    smsCode: '',
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

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const handleOpenGender = () => {
    setCurrentView('gender');
  };

  const handleOpenIssuedBy = () => {
    setCurrentView('issuedBy');
  };

  const handleOpenCitizenship = () => {
    setCurrentView('citizenship');
  };

  const handleOpenCountry = () => {
    setCurrentView('country');
  };

  const handleOpenCity = () => {
    setCurrentView('city');
  };

  // Обработчики для сохранения выбранных значений из справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

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

  if (currentView === 'gender') {
    return <Gender onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('gender', value)} />;
  }

  if (currentView === 'issuedBy') {
    return <IssuedBy onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('issuedBy', value)} />;
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

  return (
    <div data-layer="Policyholder Data Received" className="PolicyholderDataReceived" style={{width: 393, height: 2004, paddingBottom: 16, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
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
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страхователь</div>
      </div>
      <div data-layer="Progress container" className="ProgressContainer" style={{width: 85, height: 85, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}} />
    </div>
    <div data-layer="List" className="List" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
      <div data-layer="Alert" className="Alert" style={{width: 393, height: 85, paddingRight: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Info container" className="InfoContainer" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4974_2015)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.916504 11C0.916504 5.43099 5.43083 0.916672 10.9998 0.916672C16.5688 0.916672 21.0832 5.43099 21.0832 11C21.0832 16.569 16.5688 21.0833 10.9998 21.0833C5.43083 21.0833 0.916504 16.569 0.916504 11ZM10.9998 2.75001C6.44335 2.75001 2.74984 6.44352 2.74984 11C2.74984 15.5565 6.44335 19.25 10.9998 19.25C15.5563 19.25 19.2498 15.5565 19.2498 11C19.2498 6.44352 15.5563 2.75001 10.9998 2.75001ZM10.074 7.33334C10.074 6.82708 10.4844 6.41667 10.9907 6.41667H10.9998C11.5061 6.41667 11.9165 6.82708 11.9165 7.33334C11.9165 7.8396 11.5061 8.25001 10.9998 8.25001H10.9907C10.4844 8.25001 10.074 7.8396 10.074 7.33334ZM10.9998 10.0833C11.5061 10.0833 11.9165 10.4937 11.9165 11V14.6667C11.9165 15.1729 11.5061 15.5833 10.9998 15.5833C10.4936 15.5833 10.0832 15.1729 10.0832 14.6667V11C10.0832 10.4937 10.4936 10.0833 10.9998 10.0833Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_4974_2015">
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
      {renderInputField('smsCode', 'Смс код', activeField === 'smsCode', !!fieldValues.smsCode)}
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

export default Policyholder;