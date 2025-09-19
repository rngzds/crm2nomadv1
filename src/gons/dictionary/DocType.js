import React, { useState } from 'react';

const DocType = ({ onBack, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  
  // Маппинг значений на читаемые имена
  const getDisplayName = (value) => {
    const nameMap = {
      'id_card': 'Удостоверение личности',
      'passport': 'Паспорт',
      'birth_certificate': 'Свидетельство о рождении',
      'residence_permit': 'Вид на жительство иностранца'
    };
    return nameMap[value] || value;
  };
  return (
    <div data-layer="Document type - select" className="DocumentTypeSelect" style={{width: 393, height: 852, paddingBottom: 16, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
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
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип документа</div>
      </div>
      <div data-layer="Progress container" className="ProgressContainer" style={{width: 85, height: 85, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}} />
    </div>
    <div data-layer="List" className="List" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
      <div data-layer="Radio Option" data-state={selectedValue === 'id_card' ? 'pressed' : 'not_pressed'} className="RadioOption" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => setSelectedValue('id_card')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Удостоверение личности</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
            {selectedValue === 'id_card' ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="black"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div data-layer="Radio Option" data-state={selectedValue === 'passport' ? 'pressed' : 'not_pressed'} className="RadioOption" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => setSelectedValue('passport')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Паспорт</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
            {selectedValue === 'passport' ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="black"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div data-layer="Radio Option" data-state={selectedValue === 'birth_certificate' ? 'pressed' : 'not_pressed'} className="RadioOption" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => setSelectedValue('birth_certificate')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Свидетельство о рождении</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
            {selectedValue === 'birth_certificate' ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="black"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div data-layer="Radio Option" data-state={selectedValue === 'residence_permit' ? 'pressed' : 'not_pressed'} className="RadioOption" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => setSelectedValue('residence_permit')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Вид на жительство иностранца</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
            {selectedValue === 'residence_permit' ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="black"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-layer="Button Container" className="ButtonContainer" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, background: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
    <div data-layer="Button" data-state="pressed" className="Button" style={{width: 361, height: 68, background: '#E0E0E0', overflow: 'hidden', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => onSelect && onSelect(getDisplayName(selectedValue))}>
      <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
    </div>
  </div>
    </div>
  );
};

export default DocType;