import React from 'react';

// Функция рендеринга текстового поля ввода
export const renderInputField = (fieldName, label, fieldValues, activeField, handleFieldChange, handleFieldClick, handleFieldBlur, isActive = null, hasValue = null, value = null, onChange = null) => {
  const fieldValue = value !== null ? value : fieldValues[fieldName];
  const handleChange = onChange || ((e) => handleFieldChange(fieldName, e.target.value));
  
  // Если isActive и hasValue не переданы, определяем их сами
  const isFieldActive = isActive !== null ? isActive : (activeField === fieldName);
  const hasFieldValue = hasValue !== null ? hasValue : !!fieldValue;
  
  if (isFieldActive || hasFieldValue) {
    return (
      <div data-layer="InputContainerWithoutButton" data-state="pressed" className="Inputcontainerwithoutbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="LabelDefault" className="Labeldefault" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          <div data-layer="%Input text" className="InputText" style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
            <input
              type="text"
              value={fieldValue || ''}
              onChange={(e) => handleChange(e)}
              onBlur={() => handleFieldBlur && handleFieldBlur(fieldName)}
              autoFocus={isFieldActive}
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
    return (
      <div data-layer="InputContainerWithoutButton" data-state="not_pressed" className="Inputcontainerwithoutbutton" onClick={() => handleFieldClick && handleFieldClick(fieldName)} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
        </div>
      </div>
    );
  }
};

// Функция рендеринга кнопки справочника
export const renderDictionaryButton = (fieldName, label, value, onClick, showValue = true) => {
  const hasValue = !!value && showValue;
  const dataState = hasValue ? "pressed" : "not_pressed";
  
  return (
    <div data-layer="InputContainerDictionaryButton" data-state={dataState} className="Inputcontainerdictionarybutton" onClick={onClick} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
      {hasValue ? (
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{value}</div>
        </div>
      ) : (
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
        </div>
      )}
      <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
        <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Функция рендеринга поля с календарем
export const renderCalendarField = (fieldName, label, value) => {
  const hasValue = !!value;
  const dataState = hasValue ? "pressed" : "not_pressed";
  
  return (
    <div data-layer="InputContainerCalendarButton" data-state={dataState} className="Inputcontainercalendarbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
      {hasValue ? (
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{value}</div>
        </div>
      ) : (
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
        </div>
      )}
      <div data-layer="Calendar button" className="CalendarButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
        <div data-svg-wrapper data-layer="Calendar" className="Calendar" style={{left: 31, top: 32, position: 'absolute'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.33301 0.916992C7.83927 0.916992 8.24967 1.3274 8.24967 1.83366V2.75033H13.7497V1.83366C13.7497 1.3274 14.1601 0.916992 14.6663 0.916992C15.1726 0.916992 15.583 1.3274 15.583 1.83366V2.75033H17.4163C18.1457 2.75033 18.8452 3.04006 19.3609 3.55578C19.8766 4.07151 20.1663 4.77098 20.1663 5.50033V18.3337C20.1663 19.063 19.8766 19.7625 19.3609 20.2782C18.8452 20.7939 18.1457 21.0837 17.4163 21.0837H4.58301C3.85366 21.0837 3.15419 20.7939 2.63846 20.2782C2.12274 19.7625 1.83301 19.063 1.83301 18.3337V5.50033C1.83301 4.77098 2.12274 4.07151 2.63846 3.55578C3.15419 3.04006 3.85366 2.75033 4.58301 2.75033H6.41634V1.83366C6.41634 1.3274 6.82675 0.916992 7.33301 0.916992ZM6.41634 4.58366H4.58301C4.33989 4.58366 4.10673 4.68024 3.93483 4.85214C3.76292 5.02405 3.66634 5.25721 3.66634 5.50033V8.25033H18.333V5.50033C18.333 5.25721 18.2364 5.02405 18.0645 4.85214C17.8926 4.68024 17.6595 4.58366 17.4163 4.58366H15.583V5.50033C15.583 6.00659 15.1726 6.41699 14.6663 6.41699C14.1601 6.41699 13.7497 6.00659 13.7497 5.50033V4.58366H8.24967V5.50033C8.24967 6.00659 7.83927 6.41699 7.33301 6.41699C6.82675 6.41699 6.41634 6.00659 6.41634 5.50033V4.58366ZM18.333 10.0837H3.66634V18.3337C3.66634 18.5768 3.76292 18.8099 3.93483 18.9818C4.10673 19.1537 4.33989 19.2503 4.58301 19.2503H17.4163C17.6595 19.2503 17.8926 19.1537 18.0645 18.9818C18.2364 18.8099 18.333 18.5768 18.333 18.3337V10.0837Z" fill="black"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Функция рендеринга поля для прикрепления файла
export const renderAttachField = (fieldName, label, value) => {
  const hasValue = !!value;
  const dataState = hasValue ? "pressed" : "not_pressed";
  
  return (
    <div data-layer="InputContainerAttachButton" data-state={dataState} className="Inputcontainerattachbutton" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
      {hasValue ? (
        <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
          <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{value}</div>
        </div>
      ) : (
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
        </div>
      )}
      <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
        <div data-svg-wrapper data-layer="Attach" className="Attach" style={{left: 31, top: 32, position: 'absolute'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.4648 2.1888C13.7349 2.1888 13.0349 2.47875 12.5188 2.99486L4.09463 11.419C3.23451 12.2791 2.7513 13.4457 2.7513 14.6621C2.7513 15.8785 3.23451 17.045 4.09463 17.9052C4.95474 18.7653 6.12131 19.2485 7.33769 19.2485C8.55408 19.2485 9.72065 18.7653 10.5808 17.9052L19.0049 9.48099C19.3629 9.12301 19.9433 9.12301 20.3013 9.48099C20.6593 9.83897 20.6593 10.4194 20.3013 10.7774L11.8771 19.2015C10.6732 20.4055 9.04031 21.0818 7.33769 21.0818C5.63508 21.0818 4.00219 20.4055 2.79826 19.2015C1.59433 17.9976 0.917969 16.3647 0.917969 14.6621C0.917969 12.9595 1.59433 11.3266 2.79826 10.1227L11.2224 1.69849C12.0824 0.838569 13.2487 0.355469 14.4648 0.355469C15.6809 0.355469 16.8472 0.838569 17.7071 1.69849C18.5671 2.55842 19.0501 3.72472 19.0501 4.94084C19.0501 6.15696 18.5671 7.32327 17.7071 8.18319L9.27379 16.6074C8.75788 17.1233 8.05814 17.4131 7.32853 17.4131C6.59891 17.4131 5.89918 17.1233 5.38326 16.6074C4.86735 16.0914 4.57751 15.3917 4.57751 14.6621C4.57751 13.9325 4.86735 13.2327 5.38326 12.7168L13.1661 4.94311C13.5243 4.58534 14.1047 4.58568 14.4625 4.94388C14.8203 5.30207 14.8199 5.88247 14.4617 6.24024L6.67963 14.0132C6.50776 14.1853 6.41084 14.4189 6.41084 14.6621C6.41084 14.9055 6.50753 15.1389 6.67963 15.311C6.85173 15.4831 7.08514 15.5798 7.32853 15.5798C7.57191 15.5798 7.80533 15.4831 7.97743 15.311L16.4108 6.88683C16.9266 6.37075 17.2168 5.67056 17.2168 4.94084C17.2168 4.21095 16.9269 3.51096 16.4108 2.99486C15.8947 2.47875 15.1947 2.1888 14.4648 2.1888Z" fill="black"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Функция рендеринга toggle кнопки
export const renderToggleButton = (label, isPressed, onClick) => {
  return (
    <div data-layer="InputContainerToggleButton" data-state={isPressed ? "pressed" : "not_pressed"} className="Inputcontainertogglebutton" onClick={onClick} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
      <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="LabelDiv" className="Labeldiv" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{label}</div>
      </div>
      <div data-layer="Switch container" className="SwitchContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
        <div data-svg-wrapper data-layer="tui-switches" className="TuiSwitches" style={{left: 26, top: 35, position: 'absolute'}}>
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="16" rx="8" fill={isPressed ? "black" : "#E0E0E0"}/>
          <circle cx={isPressed ? "24" : "8"} cy="8" r="6" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

