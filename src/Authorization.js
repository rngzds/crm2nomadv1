import React from 'react';

const Authorization = ({ onLogin }) => {
  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div data-layer="Authorization" className="Authorization" style={{width: 1512, height: 1436, position: 'relative', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div data-layer="Container" className="Container" style={{width: 460, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 60, display: 'inline-flex'}}>
        <div data-layer="Name CRM" className="NameCrm" style={{width: 315, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'flex'}}>
          <div data-layer="Title" className="Title" style={{alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Client360</div>
          <div data-layer="Subtitle" className="Subtitle" style={{alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Система сервисного обслуживания клиента полного цикла</div>
        </div>
        <div data-layer="Form authorization" className="FormAuthorization" style={{alignSelf: 'stretch', background: '#FFFCFC', outline: '1px #F8E8E8 solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
          <div data-layer="InputPhoneNumber" data-state="pressed" className="Inputphonenumber" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
              <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Номер телефона</div>
              <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>+7 775 142 87 19</div>
            </div>
          </div>
          <div data-layer="InputPassword" data-state="pressed" className="Inputpassword" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
              <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Пароль</div>
              <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>***************</div>
            </div>
          </div>
          <div data-layer="LoginButton" data-state="pressed" className="Loginbutton" style={{alignSelf: 'stretch', height: 85, background: 'black', overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}} onClick={handleLogin}>
            <div data-layer="Button Text" className="ButtonText" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Войти</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;

