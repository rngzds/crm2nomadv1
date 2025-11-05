import React, { useState } from 'react';
import QuestionaryAnswer from '../dictionary/QuestionaryAnswer';

const Questionary = ({ onBack, onSave }) => {
  const [currentView, setCurrentView] = useState('main');
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Состояние для выбранных значений из справочников (ответы на вопросы)
  const [dictionaryValues, setDictionaryValues] = useState({
    q1: '', // Я не подвергаюсь опасности при выполнении своих профессиональных обязанностей
    q2: '', // Я не употребляю и никогда не употреблял наркотики
    q3: '', // Я не употребляю алкоголь в количестве более 20 мл в день
    q4: '', // Я не выкуриваю ежедневно более 20 сигарет
    q5: '', // Я не страдаю заболеваниями, вызванными СПИДом
    q6: '', // Я не находился на больничном более 14 дней подряд
    q7: '', // Я не подвергался хирургическому вмешательству или госпитализации в течение последних 12 месяцев
    q8: '', // У меня нет результатов анализов или онкологических заключений
    q9: '', // Я не страдаю в настоящее время и не страдал в течение последних 10 лет онкологическими заболеваниями
    q10: '', // Я не страдаю заболеваниями крови и иммунной системы
    q11: '', // Я не подвергался хирургическому вмешательству и госпитализации для трансплантации костного мозга
    q12: '', // Я не страдаю в настоящее время и не страдал в течение последних 10 лет сердечно-сосудистыми заболеваниями
    q13: '', // У меня не было пересадки сердца
    q14: '', // Я не страдаю в настоящее время и не страдал в течение последних 10 лет заболеваниями нервной системы и мозга
    q15: '', // Я не страдаю в настоящее время и не страдал в течение последних 10 лет сердечно-сосудистыми заболеваниями (второй раз)
    q16: '', // Я не подвергался хирургическому вмешательству и госпитализации для трансплантации органов
    q17: '', // Я не страдаю заболеваниями печени, желчного пузыря и желчных протоков
    q18: '', // Я не страдаю заболеваниями почек и мочевыделительной системы
    q19: '', // Я не страдаю лёгочными и системными заболеваниями
    q20: '', // Я не страдаю в настоящее время и не страдал в течение последних 10 лет сердечно-сосудистыми заболеваниями (третий раз)
    q21: '' // У меня нет сахарного диабета
  });

  // Состояние для полей ввода без кнопок
  const [fieldValues, setFieldValues] = useState({
    height: '',
    weight: ''
  });

  // Состояние для отслеживания активного поля
  const [activeField, setActiveField] = useState(null);

  // Состояние для toggle кнопок
  const [toggleStates, setToggleStates] = useState({
    fillWithoutManager: false,
    answerAllNo: false
  });

  const handleBackToMain = () => setCurrentView('main');

  // Обработчики для открытия справочника для каждого вопроса
  const handleOpenQuestionaryAnswer = (questionKey) => {
    setActiveQuestion(questionKey);
    setCurrentView('questionaryAnswer');
  };

  // Обработчик для сохранения выбранных значений
  const handleDictionaryValueSelect = (value) => {
    if (activeQuestion) {
      setDictionaryValues(prev => ({
        ...prev,
        [activeQuestion]: value
      }));
      setActiveQuestion(null);
      setCurrentView('main');
    }
  };

  // Обработчик клика по полю ввода
  const handleFieldClick = (fieldName) => {
    setActiveField(fieldName);
  };

  // Обновление значения поля
  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Возврат к обычному состоянию при потере фокуса
  const handleFieldBlur = (fieldName) => {
    if (!fieldValues[fieldName]) {
      setActiveField(null);
    }
  };

  // Обработчик для переключения toggle кнопок
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
        <div data-layer="InputContainerDictionaryButton" data-state="pressed" className="Inputcontainerdictionarybutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="Input text" className="InputText" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{dictionaryValues[fieldName]}</div>
          </div>
          <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onClickHandler}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div data-layer="InputContainerDictionaryButton" data-state="not_pressed" className="Inputcontainerdictionarybutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
          <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}} onClick={onClickHandler}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

  // Функция рендеринга поля без кнопки
  const renderInputField = (fieldName, label) => {
    const isActive = activeField === fieldName;
    const hasValue = !!fieldValues[fieldName];

    if (isActive || hasValue) {
      // Активное состояние - с полем ввода
      return (
        <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
            <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
              <input
                type="text"
                value={fieldValues[fieldName] || ''}
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
                  color: '#071222',
                  paddingLeft: 0,
                  marginLeft: 0
                }}
              />
            </div>
          </div>
        </div>
      );
    } else {
      // Обычное состояние - только название
      return (
        <div data-layer="Input Field" data-state="not_pressed" className="InputField" onClick={() => handleFieldClick(fieldName)} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          </div>
        </div>
      );
    }
  };

  if (currentView === 'questionaryAnswer') {
    return <QuestionaryAnswer onBack={handleBackToMain} onSelect={handleDictionaryValueSelect} />;
  }

  return (
    <div data-layer="Statements" className="Statements" style={{width: 1512, height: 2680, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Back button" className="BackButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
      <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
        </svg>
      </div>
    </div>
    <div data-layer="OpenDocument button" className="OpendocumentButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
      <div data-layer="File" className="File" style={{width: 22, height: 22, left: 31, top: 32, position: 'absolute'}}>
        <div data-svg-wrapper data-layer="Frame 1321316875" className="Frame1321316875" style={{left: 3, top: 1, position: 'absolute'}}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0L16.001 6V18.001C16.0009 19.1008 15.1008 20.0008 14.001 20.001H1.99023C0.890252 20.001 0.000107007 19.1009 0 18.001L0.00976562 2C0.00980161 0.900011 0.900014 4.85053e-05 2 0H10ZM2.00293 2V18.001H14.0039V7H9.00293V2H2.00293Z" fill="black"/>
          <line x1="4.00027" y1="11.251" x2="12.0006" y2="11.251" stroke="black" strokeWidth="1.5"/>
          <line x1="4.00027" y1="15.251" x2="10.0005" y2="15.251" stroke="black" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div data-layer="Sections Right" className="SectionsRight" style={{width: 1427, alignSelf: 'stretch', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Sections" className="Sections" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div data-layer="SubHeader" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Анкета</div>
          <div data-layer="Frame 1321316872" className="Frame1321316872" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Button" className="Button" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
              <div data-layer="Chewron down" className="ChewronDown" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderRight: '1px #F8E8E8 solid'}}>
                <div data-svg-wrapper data-layer="Chewron down" className="ChewronDown" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div data-layer="Chewron up" className="ChewronUp" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
                <div data-svg-wrapper data-layer="Chewron up" className="ChewronUp" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 15.5L11 7.5L18.5 15.5" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
            <div data-layer="Button Container" className="ButtonContainer" style={{width: 390, height: 85, background: 'white', overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'center', display: 'flex'}}>
              <div data-layer="ActionButtonWithoutRounding" data-state="pressed" className="Actionbuttonwithoutrounding" onClick={() => {
                if (onSave) {
                  onSave({
                    dictionaryValues,
                    fieldValues,
                    toggleStates
                  });
                }
              }} style={{width: 390, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
                <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="Input Field" data-state={toggleStates.fillWithoutManager ? "pressed" : "not_pressed"} className="InputField" onClick={() => handleToggleClick('fillWithoutManager')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Заполнить анкету без участия Менеджера</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill={toggleStates.fillWithoutManager ? "black" : "#E0E0E0"}/>
            <circle cx={toggleStates.fillWithoutManager ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      {renderInputField('height', 'Рост застрахованного (см)')}
      {renderInputField('weight', 'Вес застрахованного (кг)')}
      <div data-layer="InputContainerToggleButton" data-state={toggleStates.answerAllNo ? "pressed" : "not_pressed"} className="Inputcontainertogglebutton" onClick={() => handleToggleClick('answerAllNo')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Ответить везде нет</div>
        </div>
        <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16" rx="8" fill={toggleStates.answerAllNo ? "black" : "#E0E0E0"}/>
            <circle cx={toggleStates.answerAllNo ? "24" : "8"} cy="8" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="MessageContainer" className="Messagecontainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, paddingRight: 20, background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Я заявляю о правдивости и достоверности следующих утверждений</div>
      </div>
      {renderDictionaryButton('q1', 'Я не подвергаюсь опасности при выполнении своих профессиональных обязанностей, в том числе: работа на высоте/под водой/под землей или работа со взрывоопасными/канцерогенными/токсичными веществами или радиацией.', () => handleOpenQuestionaryAnswer('q1'), !!dictionaryValues.q1)}
      {renderDictionaryButton('q2', 'Я не употребляю и никогда не употреблял наркотики', () => handleOpenQuestionaryAnswer('q2'), !!dictionaryValues.q2)}
      {renderDictionaryButton('q3', 'Я не употребляю алкоголь в количестве более 20 мл в день в пересчёте на чистый спирт', () => handleOpenQuestionaryAnswer('q3'), !!dictionaryValues.q3)}
      {renderDictionaryButton('q4', 'Я не выкуриваю ежедневно более 20 сигарет, включая сигары, электронные сигареты, никотиновые жевательные резинки /пластыри, трубочный /скрученный табак или другие заменители никотина', () => handleOpenQuestionaryAnswer('q4'), !!dictionaryValues.q4)}
      {renderDictionaryButton('q5', 'Я не страдаю заболеваниями, вызванными СПИДом и другими заболеваниями, связанными с вирусом иммунодефицита человека', () => handleOpenQuestionaryAnswer('q5'), !!dictionaryValues.q5)}
      {renderDictionaryButton('q6', 'Я не находился на больничном более 14 дней подряд, за исключением заболевания гриппом, и у меня нет инвалидности, связанной с состоянием здоровья, требующей сокращённого или неполного рабочего дня', () => handleOpenQuestionaryAnswer('q6'), !!dictionaryValues.q6)}
      {renderDictionaryButton('q7', 'Я не подвергался хирургическому вмешательству или госпитализации в течение последних 12 месяцев (исключения составляют: аппендэктомия, стоматологические операции, геморрой, тонзиллэктомия, прерывание беременности, операция на венах)', () => handleOpenQuestionaryAnswer('q7'), !!dictionaryValues.q7)}
      {renderDictionaryButton('q8', 'У меня нет результатов анализов или онкологических заключений, требующих дальнейшего обследования (или лечения)', () => handleOpenQuestionaryAnswer('q8'), !!dictionaryValues.q8)}
      <div data-layer="MessageContainer" className="Messagecontainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, paddingRight: 20, background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Злокачественные новообразования (рак) и трансплантация костного мозга</div>
      </div>
      {renderDictionaryButton('q9', 'Я не страдаю в настоящее время и не страдал в течение последних 10 лет онкологическими заболеваниями, включая: предраковые опухоли, доброкачественные или злокачественные опухоли кожи (включая кисты, язвы или любые новообразования), опухоли щитовидной железы, доброкачественные или злокачественные опухоли мозга, поликистоз почек, карцинома и меланома in situ, рак крови/лейкемия; и у меня не был диагностирован вирус папилломы человека, вирус Эпштейна-Барра', () => handleOpenQuestionaryAnswer('q9'), !!dictionaryValues.q9)}
      {renderDictionaryButton('q10', 'Я не страдаю заболеваниями крови и иммунной системы, включая: анемию, проблемы со свёртываемостью крови, нарушения иммунной системы; язвенный колит и болезнь Крона', () => handleOpenQuestionaryAnswer('q10'), !!dictionaryValues.q10)}
      {renderDictionaryButton('q11', 'Я не подвергался хирургическому вмешательству и госпитализации для трансплантации костного мозга', () => handleOpenQuestionaryAnswer('q11'), !!dictionaryValues.q11)}
      <div data-layer="MessageContainer" className="Messagecontainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, paddingRight: 20, background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Все операции на сердце / операции на сердце / кардиохирургия</div>
      </div>
      {renderDictionaryButton('q12', 'Я не страдаю в настоящее время и не страдал в течение последних 10 лет сердечно-сосудистыми заболеваниями, включая нарушения кровообращения (например, высокое кровяное давление), инсультом или заболеваниями сердца, включая боль в груди, шум в сердце, повышенное сердцебиение, стенокардию, инфаркт миокарда, атеросклероз, заболевания клапанов сердца, аритмию, кардиомиопатию, ишемическую болезнь сердца, сердечную недостаточность', () => handleOpenQuestionaryAnswer('q12'), !!dictionaryValues.q12)}
      {renderDictionaryButton('q13', 'У меня не было пересадки сердца', () => handleOpenQuestionaryAnswer('q13'), !!dictionaryValues.q13)}
      <div data-layer="MessageContainer" className="Messagecontainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, paddingRight: 20, background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нейрохирургия/нейрохирургические операции</div>
      </div>
      {renderDictionaryButton('q14', 'Я не страдаю в настоящее время и не страдал в течение последних 10 лет заболеваниями нервной системы и мозга, а также пороками развития, включая: эпилепсию, инсульт, паралич, рассеянный склероз, болезнь Гоше, атрофию мышц, ALS (боковой амиотрофический склероз), болезнь Паркинсона, деменцию, болезнь Альцгеймера, умственную отсталость, синдром Дауна, нарушения развития и/или роста', () => handleOpenQuestionaryAnswer('q14'), !!dictionaryValues.q14)}
      {renderDictionaryButton('q15', 'Я не страдаю в настоящее время и не страдал в течение последних 10 лет сердечно-сосудистыми заболеваниями, включая нарушения кровообращения (например, высокое кровяное давление), инсульт или заболевания сердца, включая боль в груди, шум в сердце, сердцебиение, стенокардию, инфаркт миокарда, атеросклероз, заболевания клапанов сердца, аритмию, кардиомиопатию, ишемическую болезнь сердца, сердечную недостаточность', () => handleOpenQuestionaryAnswer('q15'), !!dictionaryValues.q15)}
      <div data-layer="MessageContainer" className="Messagecontainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, paddingRight: 20, background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
        <div data-layer="Label" className="Label" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Трансплантация органов</div>
      </div>
      {renderDictionaryButton('q16', 'Я не подвергался хирургическому вмешательству и госпитализации для трансплантации органов', () => handleOpenQuestionaryAnswer('q16'), !!dictionaryValues.q16)}
      {renderDictionaryButton('q17', 'Я не страдаю заболеваниями печени, желчного пузыря и желчных протоков, включая: желтуху, гепатит, цирроз, жировой гепатоз печени, спленомегалию', () => handleOpenQuestionaryAnswer('q17'), !!dictionaryValues.q17)}
      {renderDictionaryButton('q18', 'Я не страдаю заболеваниями почек и мочевыделительной системы, в том числе: простатитом, нефритом, почечной недостаточностью в настоящее время или в прошлом', () => handleOpenQuestionaryAnswer('q18'), !!dictionaryValues.q18)}
      {renderDictionaryButton('q19', 'Я не страдаю лёгочными и системными заболеваниями, в том числе: астмой (бронхитом), хронической обструктивной болезнью лёгких, эмфиземой, туберкулёзной инфекцией в настоящем или прошлом', () => handleOpenQuestionaryAnswer('q19'), !!dictionaryValues.q19)}
      {renderDictionaryButton('q20', 'Я не страдаю в настоящее время и не страдал в течение последних 10 лет сердечно-сосудистыми заболеваниями, включая нарушения кровообращения (например, высокое кровяное давление), инсульт или заболевания сердца, включая боль в груди, шум в сердце, сердцебиение, стенокардию, инфаркт миокарда, атеросклероз, заболевания клапанов сердца, аритмию, кардиомиопатию, ишемическую болезнь сердца, сердечную недостаточность', () => handleOpenQuestionaryAnswer('q20'), !!dictionaryValues.q20)}
      {renderDictionaryButton('q21', 'У меня нет сахарного диабета', () => handleOpenQuestionaryAnswer('q21'), !!dictionaryValues.q21)}
    </div>
  </div>
  </div>
  );
};

export default Questionary;
