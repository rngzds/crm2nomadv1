import React, { useState } from 'react';
import AnswerSelection from '../dictionary/AnswerSelection';

const Questionary = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');
  
  // Состояние для выбранных значений из справочников
  const [dictionaryValues, setDictionaryValues] = useState({
    answerSelection1: '',
    answerSelection2: '',
    answerSelection3: ''
  });
  
  // Состояние для toggle кнопок
  const [toggleStates, setToggleStates] = useState({
    answerEverywhereNo: false
  });

  // Navigation handlers
  const handleBackToMain = () => setCurrentView('main');
  const handleOpenAnswerSelection1 = () => setCurrentView('answerSelection1');
  const handleOpenAnswerSelection2 = () => setCurrentView('answerSelection2');
  const handleOpenAnswerSelection3 = () => setCurrentView('answerSelection3');

  // Обработчик для сохранения выбранных значений из справочников
  const handleDictionaryValueSelect = (fieldName, value) => {
    setDictionaryValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setCurrentView('main');
  };

  // Обработчик для toggle кнопок
  const handleToggleClick = (toggleName) => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
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

  // Conditional rendering for dictionary components
  if (currentView === 'answerSelection1') {
    return <AnswerSelection onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('answerSelection1', value)} />;
  }
  if (currentView === 'answerSelection2') {
    return <AnswerSelection onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('answerSelection2', value)} />;
  }
  if (currentView === 'answerSelection3') {
    return <AnswerSelection onBack={handleBackToMain} onSelect={(value) => handleDictionaryValueSelect('answerSelection3', value)} />;
  }

  return (
    <div data-layer="Questionary" className="Questionary" style={{width: 393, height: 852, paddingBottom: 16, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
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
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Анкета</div>
      </div>
      <div data-layer="Progress container" className="ProgressContainer" style={{width: 85, height: 85, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}} />
    </div>
    <div data-layer="List" className="List" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
      <div 
        data-layer="InputContainerToggleButton" 
        data-state={toggleStates.answerEverywhereNo ? "pressed" : "not_pressed"} 
        className="Inputcontainertogglebutton" 
        style={{
          width: 393, 
          height: 85, 
          paddingLeft: 20, 
          background: 'white', 
          borderBottom: '1px #F8E8E8 solid', 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          display: 'inline-flex',
          cursor: 'pointer'
        }} 
        onClick={() => handleToggleClick('answerEverywhereNo')}
      >
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', height: 19, paddingTop: 20, paddingBottom: 20, paddingRight: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
            Ответить везде нет
          </div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="16" rx="8" fill={toggleStates.answerEverywhereNo ? "black" : "#E0E0E0"}/>
              <circle cx={toggleStates.answerEverywhereNo ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="MessageContainer" className="Messagecontainer" style={{width: 393, height: 85, paddingLeft: 20, paddingRight: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>У вас есть инвалидность или потеря трудоспособности (КЭКЖ) без установления группы инвалидности?</div>
      </div>
      {renderDictionaryButton('answerSelection1', 'Ответ', handleOpenAnswerSelection1, !!dictionaryValues.answerSelection1)}
      <div data-layer="MessageContainer" className="Messagecontainer" style={{width: 393, height: 85, paddingLeft: 20, paddingRight: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Укажите имеющиеся у вас заболевания, вы можете указать несколько симптомов</div>
      </div>
      {renderDictionaryButton('answerSelection2', 'Ответ', handleOpenAnswerSelection2, !!dictionaryValues.answerSelection2)}
      <div data-layer="MessageContainer" className="Messagecontainer" style={{width: 393, height: 85, paddingLeft: 20, paddingRight: 20, background: 'white', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Связана ли ваша профессия с трудовой деятельностью, которую можно назвать опасной?</div>
      </div>
      {renderDictionaryButton('answerSelection3', 'Ответ', handleOpenAnswerSelection3, !!dictionaryValues.answerSelection3)}
    </div>
  </div>
  <div data-layer="Button Container" className="ButtonContainer" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
    <div data-layer="Button" data-state="pressed" className="Button" style={{width: 361, height: 68, background: '#E0E0E0', overflow: 'hidden', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
    </div>
  </div>
    </div>
  );
};

export default Questionary;