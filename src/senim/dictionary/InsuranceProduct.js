import React, { useState } from 'react';

const InsuranceProduct = ({ onBack, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const handleSave = () => {
    if (selectedValue && onSelect) {
      onSelect(selectedValue);
    } else if (onBack) {
      onBack();
    }
  };
  return (
    <div data-layer="Insurance program selection" className="InsuranceProgramSelection" style={{width: 1512, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  <div data-layer="Menu" data-property-1="Menu three" className="Menu" style={{height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Menu button" className="MenuButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
      <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 31, top: 32, position: 'absolute'}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  </div>
  <div data-layer="Insurance program" className="InsuranceProgram" style={{flex: '1 1 0', height: 982, background: 'white', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="SubHeader" data-type="Creating an order" className="Subheader" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Программа страхования</div>
        <div data-layer="Save button" data-state="pressed" className="SaveButton" onClick={handleSave} style={{width: 388, height: 85, background: 'black', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8.98, display: 'flex', cursor: 'pointer'}}>
          <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сохранить</div>
        </div>
      </div>
    </div>
    <div data-layer="Fields List" className="FieldsList" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div data-layer="InputContainerRadioButton" data-state={selectedValue === '«CEHIM» Бизнес 150' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleSelect('«CEHIM» Бизнес 150')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>«CEHIM» Бизнес 150 </div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-on" className="EllipseOn" style={{left: 35, top: 36, position: 'absolute'}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {selectedValue === '«CEHIM» Бизнес 150' ? (
              <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
            ) : (
              <circle cx="7" cy="7" r="6.5" stroke="black"/>
            )}
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="InputContainerRadioButton" data-state={selectedValue === '«CEHIM» Бизнес 200' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleSelect('«CEHIM» Бизнес 200')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>«CEHIM» Бизнес 200</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {selectedValue === '«CEHIM» Бизнес 200' ? (
              <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
            ) : (
              <circle cx="7" cy="7" r="6.5" stroke="black"/>
            )}
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="InputContainerRadioButton" data-state={selectedValue === '«CEHIM» Бизнес 250' ? 'pressed' : 'not_pressed'} className="Inputcontainerradiobutton" onClick={() => handleSelect('«CEHIM» Бизнес 250')} style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
        <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>«CEHIM» Бизнес 250</div>
        </div>
        <div data-layer="Radiobutton container" className="RadiobuttonContainer" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
          <div data-svg-wrapper data-layer="Ellipse-off" className="EllipseOff" style={{left: 35, top: 36, position: 'absolute'}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {selectedValue === '«CEHIM» Бизнес 250' ? (
              <circle cx="7" cy="7" r="6.5" fill="black" stroke="black"/>
            ) : (
              <circle cx="7" cy="7" r="6.5" stroke="black"/>
            )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default InsuranceProduct;