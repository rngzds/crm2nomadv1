import React, { useState } from 'react';

const AnswerSelection = ({ onBack, onSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Маппинг значений на читаемые имена
  const getDisplayName = (value) => {
    const nameMap = {
      'yes': 'Да',
      'no': 'Нет'
    };
    return nameMap[value] || value;
  };
  return (
    <div data-layer="Answer Selection - select" className="AnswerSelectionSelect" style={{width: 393, height: '100vh', minHeight: '100vh', background: 'white', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', display: 'flex', position: 'relative'}}>
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
          <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Анкета</div>
        </div>
        <div data-layer="Progress container" className="ProgressContainer" style={{width: 85, height: 85, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}} />
      </div>

      {/* Scrollable Content */}
      <div data-layer="Scrollable Content" className="ScrollableContent" style={{width: 393, flex: 1, overflowY: 'auto', paddingTop: 85, paddingBottom: 100, display: 'flex', flexDirection: 'column'}}>
        <div data-layer="Content List" className="ContentList" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
      <div data-layer="Message Container" className="MessageContainer" style={{width: 393, height: 85, paddingLeft: 20, paddingRight: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>У вас есть инвалидность или потеря трудоспособности (КЭКЖ) без установления группы инвалидности?</div>
      </div>
      <div data-layer="Radio Option" data-state="not_pressed" className="RadioOption" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => setSelectedAnswer('yes')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Да</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          {selectedAnswer === 'yes' ? (
            <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="black" fill="black"/>
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
      <div data-layer="Radio Option" data-state="not_pressed" className="RadioOption" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => setSelectedAnswer('no')}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нет</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          {selectedAnswer === 'no' ? (
            <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="black" fill="black"/>
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

    {/* Fixed Footer/Button */}
    <div data-layer="Button Container" className="ButtonContainer" style={{width: 393, height: 100, paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16, background: 'white', borderTop: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1000}}>
      <div data-layer="Button" data-state="pressed" className="Button" style={{width: 361, height: 68, background: '#E0E0E0', overflow: 'hidden', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={() => onSelect && onSelect(getDisplayName(selectedAnswer))}>
        <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
      </div>
    </div>
  </div>
  );
};

export default AnswerSelection;