import React, { useState } from 'react';
import Gender from '../dictionary/Gender';
import SectorCode from '../dictionary/SectorCode';
import Country from '../dictionary/Country';
import Region from '../dictionary/Region';
import SettlementType from '../dictionary/SettlementType';
import City from '../dictionary/City';
import DocType from '../dictionary/DocType';
import IssuedBy from '../dictionary/IssuedBy';
import ClientType from '../dictionary/ClientType';

const Policyholder = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');

  // Состояние для выбранных значений из справочников
  const [dictionaryValues, setDictionaryValues] = useState({
    gender: '',
    sectorCode: '',
    country: '',
    region: '',
    settlementType: '',
    city: '',
    docType: '',
    issuedBy: '',
    clientType: ''
  });

  // Обработчик для сохранения выбранных значений из справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

  const handleBackToMain = () => setCurrentView('main');
  const handleOpenGender = () => setCurrentView('gender');
  const handleOpenSectorCode = () => setCurrentView('sectorCode');
  const handleOpenCountry = () => setCurrentView('country');
  const handleOpenRegion = () => setCurrentView('region');
  const handleOpenSettlementType = () => setCurrentView('settlementType');
  const handleOpenCity = () => setCurrentView('city');
  const handleOpenDocType = () => setCurrentView('docType');
  const handleOpenIssuedBy = () => setCurrentView('issuedBy');
  const handleOpenClientType = () => setCurrentView('clientType');

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

  if (currentView === 'clientType') {
    return <ClientType onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('clientType', value)} />;
  }

  return (
    <div data-layer="Policyholder data page" className="PolicyholderDataPage" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, alignSelf: 'stretch', background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Back button" className="BackButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
      <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L7 10.5L15 3" stroke="black" stroke-width="2"/>
        </svg>
      </div>
    </div>
    <div data-layer="OpenDocument button" className="OpendocumentButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
      <div data-layer="File" className="File" style={{width: 22, height: 22, left: 31, top: 32, position: 'absolute'}}>
        <div data-svg-wrapper data-layer="Frame 1321316875" className="Frame1321316875" style={{left: 3, top: 1, position: 'absolute'}}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0L16.001 6V18.001C16.0009 19.1008 15.1008 20.0008 14.001 20.001H1.99023C0.890252 20.001 0.000107007 19.1009 0 18.001L0.00976562 2C0.00980161 0.900011 0.900014 4.85053e-05 2 0H10ZM2.00293 2V18.001H14.0039V7H9.00293V2H2.00293Z" fill="black"/>
          <line x1="4.00049" y1="11.2505" x2="12.0008" y2="11.2505" stroke="black" stroke-width="1.5"/>
          <line x1="4.00049" y1="15.2508" x2="10.0008" y2="15.2508" stroke="black" stroke-width="1.5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div data-layer="Policyholder data" className="PolicyholderData" style={{width: 1427, overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страхователь</div>
        <div data-layer="Button container" className="ButtonContainer" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
          <div data-layer="Application section transition buttons" className="ApplicationSectionTransitionButtons" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Next Button" className="NextButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderRight: '1px #F8E8E8 solid'}}>
              <div data-svg-wrapper data-layer="Chewron down" className="ChewronDown" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" stroke-width="2"/>
                </svg>
              </div>
            </div>
            <div data-layer="Previous Button" className="PreviousButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
              <div data-svg-wrapper data-layer="Chewron up" className="ChewronUp" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 15.5L11 7.5L18.5 15.5" stroke="black" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
          <div data-layer="Save button" data-state="pressed" className="SaveButton" style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex'}}>
            <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="Filds list" className="FildsList" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div data-layer="ManualToggleButton" data-state="not_pressed" className="Manualtogglebutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Ручной ввод данных</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill="#E0E0E0"/>
            <circle cx="8" cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'ИИН'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ИИН</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>940 218 300 972</div>
        </div>
      </div>
      <div data-layer="Input 'Номер телефона'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Номер телефона</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>+7 707 759 10 10</div>
        </div>
      </div>
      <div data-layer="Input 'Фамилия'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Фамилия</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Иванов</div>
        </div>
      </div>
      <div data-layer="Input 'Имя'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Имя</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Иван</div>
        </div>
      </div>
      <div data-layer="Input 'Отчество'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Отчество</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Иванович</div>
        </div>
      </div>
      <div data-layer="Input 'Дата рождения'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата рождения</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>12.02.2000</div>
        </div>
        <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3335 0.916626C7.83976 0.916626 8.25016 1.32703 8.25016 1.83329V2.74996H13.7502V1.83329C13.7502 1.32703 14.1606 0.916626 14.6668 0.916626C15.1731 0.916626 15.5835 1.32703 15.5835 1.83329V2.74996H17.4168C18.1462 2.74996 18.8456 3.03969 19.3614 3.55542C19.8771 4.07114 20.1668 4.77061 20.1668 5.49996V18.3333C20.1668 19.0626 19.8771 19.7621 19.3614 20.2778C18.8456 20.7936 18.1462 21.0833 17.4168 21.0833H4.5835C3.85415 21.0833 3.15468 20.7936 2.63895 20.2778C2.12323 19.7621 1.8335 19.0626 1.8335 18.3333V5.49996C1.8335 4.77061 2.12323 4.07114 2.63895 3.55542C3.15468 3.03969 3.85415 2.74996 4.5835 2.74996H6.41683V1.83329C6.41683 1.32703 6.82724 0.916626 7.3335 0.916626ZM6.41683 4.58329H4.5835C4.34038 4.58329 4.10722 4.67987 3.93531 4.85178C3.76341 5.02369 3.66683 5.25684 3.66683 5.49996V8.24996H18.3335V5.49996C18.3335 5.25684 18.2369 5.02369 18.065 4.85178C17.8931 4.67987 17.6599 4.58329 17.4168 4.58329H15.5835V5.49996C15.5835 6.00622 15.1731 6.41663 14.6668 6.41663C14.1606 6.41663 13.7502 6.00622 13.7502 5.49996V4.58329H8.25016V5.49996C8.25016 6.00622 7.83976 6.41663 7.3335 6.41663C6.82724 6.41663 6.41683 6.00622 6.41683 5.49996V4.58329ZM18.3335 10.0833H3.66683V18.3333C3.66683 18.5764 3.76341 18.8096 3.93531 18.9815C4.10722 19.1534 4.34038 19.25 4.5835 19.25H17.4168C17.6599 19.25 17.8931 19.1534 18.065 18.9815C18.2369 18.8096 18.3335 18.5764 18.3335 18.3333V10.0833Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Пол'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Пол</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.gender || 'Мужской'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenGender} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Код сектора экономики'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Код сектора экономики</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.sectorCode || 'Не выбран'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenSectorCode} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Страна'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страна</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.country || 'Казахстан'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenCountry} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Область'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Область</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.region || 'Алматинская область'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenRegion} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Вид населенного пункта'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Вид населенного пункта</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.settlementType || 'Город'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenSettlementType} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Город'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Город</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.city || 'Алматы'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenCity} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Улица'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Улица</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Абая</div>
        </div>
      </div>
      <div data-layer="Input 'Микрорайон'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#99A3B3', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 20, letterSpacing: 0.25, wordWrap: 'break-word'}}>Микрорайон</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>-</div>
        </div>
      </div>
      <div data-layer="Input '№ дома'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#99A3B3', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 20, letterSpacing: 0.25, wordWrap: 'break-word'}}>№ дома</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>№17</div>
        </div>
      </div>
      <div data-layer="Input '№ квартиры'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#99A3B3', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 20, letterSpacing: 0.25, wordWrap: 'break-word'}}>№ квартиры</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>№17</div>
        </div>
      </div>
      <div data-layer="Input 'Тип документа'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип документа</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.docType || 'Уд. личности'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenDocType} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Номер документа'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#99A3B3', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 20, letterSpacing: 0.25, wordWrap: 'break-word'}}>Номер документа</div>
          <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>01002003</div>
        </div>
      </div>
      <div data-layer="Input 'Кем выдано'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Кем выдано</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.issuedBy || 'МВД РК'}</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenIssuedBy} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Выдан от'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Выдан от</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>01.01.2016</div>
        </div>
        <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3335 0.916748C7.83976 0.916748 8.25016 1.32715 8.25016 1.83341V2.75008H13.7502V1.83341C13.7502 1.32715 14.1606 0.916748 14.6668 0.916748C15.1731 0.916748 15.5835 1.32715 15.5835 1.83341V2.75008H17.4168C18.1462 2.75008 18.8456 3.03981 19.3614 3.55554C19.8771 4.07126 20.1668 4.77074 20.1668 5.50008V18.3334C20.1668 19.0628 19.8771 19.7622 19.3614 20.278C18.8456 20.7937 18.1462 21.0834 17.4168 21.0834H4.5835C3.85415 21.0834 3.15468 20.7937 2.63895 20.278C2.12323 19.7622 1.8335 19.0628 1.8335 18.3334V5.50008C1.8335 4.77074 2.12323 4.07126 2.63895 3.55554C3.15468 3.03981 3.85415 2.75008 4.5835 2.75008H6.41683V1.83341C6.41683 1.32715 6.82724 0.916748 7.3335 0.916748ZM6.41683 4.58341H4.5835C4.34038 4.58341 4.10722 4.67999 3.93531 4.8519C3.76341 5.02381 3.66683 5.25697 3.66683 5.50008V8.25008H18.3335V5.50008C18.3335 5.25697 18.2369 5.02381 18.065 4.8519C17.8931 4.67999 17.6599 4.58341 17.4168 4.58341H15.5835V5.50008C15.5835 6.00634 15.1731 6.41675 14.6668 6.41675C14.1606 6.41675 13.7502 6.00634 13.7502 5.50008V4.58341H8.25016V5.50008C8.25016 6.00634 7.83976 6.41675 7.3335 6.41675C6.82724 6.41675 6.41683 6.00634 6.41683 5.50008V4.58341ZM18.3335 10.0834H3.66683V18.3334C3.66683 18.5765 3.76341 18.8097 3.93531 18.9816C4.10722 19.1535 4.34038 19.2501 4.5835 19.2501H17.4168C17.6599 19.2501 17.8931 19.1535 18.065 18.9816C18.2369 18.8097 18.3335 18.5765 18.3335 18.3334V10.0834Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Input 'Действует до'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Действует до</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>01.01.2016</div>
        </div>
        <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.3335 0.916748C7.83976 0.916748 8.25016 1.32715 8.25016 1.83341V2.75008H13.7502V1.83341C13.7502 1.32715 14.1606 0.916748 14.6668 0.916748C15.1731 0.916748 15.5835 1.32715 15.5835 1.83341V2.75008H17.4168C18.1462 2.75008 18.8456 3.03981 19.3614 3.55554C19.8771 4.07126 20.1668 4.77074 20.1668 5.50008V18.3334C20.1668 19.0628 19.8771 19.7622 19.3614 20.278C18.8456 20.7937 18.1462 21.0834 17.4168 21.0834H4.5835C3.85415 21.0834 3.15468 20.7937 2.63895 20.278C2.12323 19.7622 1.8335 19.0628 1.8335 18.3334V5.50008C1.8335 4.77074 2.12323 4.07126 2.63895 3.55554C3.15468 3.03981 3.85415 2.75008 4.5835 2.75008H6.41683V1.83341C6.41683 1.32715 6.82724 0.916748 7.3335 0.916748ZM6.41683 4.58341H4.5835C4.34038 4.58341 4.10722 4.67999 3.93531 4.8519C3.76341 5.02381 3.66683 5.25697 3.66683 5.50008V8.25008H18.3335V5.50008C18.3335 5.25697 18.2369 5.02381 18.065 4.8519C17.8931 4.67999 17.6599 4.58341 17.4168 4.58341H15.5835V5.50008C15.5835 6.00634 15.1731 6.41675 14.6668 6.41675C14.1606 6.41675 13.7502 6.00634 13.7502 5.50008V4.58341H8.25016V5.50008C8.25016 6.00634 7.83976 6.41675 7.3335 6.41675C6.82724 6.41675 6.41683 6.00634 6.41683 5.50008V4.58341ZM18.3335 10.0834H3.66683V18.3334C3.66683 18.5765 3.76341 18.8097 3.93531 18.9816C4.10722 19.1535 4.34038 19.2501 4.5835 19.2501H17.4168C17.6599 19.2501 17.8931 19.1535 18.065 18.9816C18.2369 18.8097 18.3335 18.5765 18.3335 18.3334V10.0834Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="ПризнакПДЛ ToggleButton" data-state="not_pressed" className="Togglebutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Признак ПДЛ</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill="#E0E0E0"/>
            <circle cx="8" cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="Client type selection" data-state="not_pressed" className="ClientTypeSelection" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип клиента</div>
        </div>
        <div data-layer="Open button" className="OpenButton" onClick={handleOpenClientType} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L15 11.5L7 19" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
      {dictionaryValues.clientType && (
        <div data-layer="Input 'Тип клиента'" data-state="pressed" className="Input" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип клиента</div>
            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues.clientType}</div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default Policyholder;