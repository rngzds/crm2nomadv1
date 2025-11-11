import React from 'react';

const Statements = ({ onCreateApplication, onLogout }) => {
  const handleCreateApplication = () => {
    if (onCreateApplication) {
      onCreateApplication();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div data-layer="Sections applications" className="SectionsApplications" style={{width: 1512, height: 1436, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div data-layer="Menu" data-property-1="Menu four" className="Menu" style={{width: 85, height: 1436, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div data-layer="Sidebar" className="Sidebar" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          <div data-layer="Menu button" className="MenuButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
            <div data-layer="360" style={{left: 27, top: 33, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>360</div>
          </div>
          <button
            data-layer="Increase button" 
            className="IncreaseButton" 
            type="button"
            style={{
              width: 85, 
              height: 85, 
              position: 'relative', 
              background: 'black', 
              overflow: 'hidden', 
              borderRight: '1px #F8E8E8 solid', 
              borderLeft: 'none',
              borderTop: 'none',
              borderBottom: 'none',
              cursor: 'pointer', 
              zIndex: 10,
              userSelect: 'none',
              padding: 0,
              margin: 0,
              outline: 'none'
            }} 
            onClick={handleCreateApplication}
          >
            <div data-svg-wrapper data-layer="Plus" className="Plus" style={{left: 31, top: 32, position: 'absolute', pointerEvents: 'none'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11 3C11.5523 3 12 3 12 3V10H19C19 10 19 10.4477 19 11C19 11.5523 19 12 19 12L12 12V19C12 19 11.5523 19 11 19C10.4477 19 10 19 10 19V12L3.00004 12C3.00004 12 3 11.5523 3 11C3 10.4477 3.00004 10 3.00004 10L10 10V3C10 3 10.4477 3 11 3Z" fill="white"/>
              </svg>
            </div>
          </button>
          <div data-layer="Filter button" className="FilterButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
            <div data-svg-wrapper data-layer="filter" className="Filter" style={{left: 31.50, top: 31.50, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5768 2.80361C3.56788 2.80919 3.53999 2.817 3.51544 2.82146C3.43957 2.83485 3.30903 2.9018 3.23762 2.96539C3.09927 3.08701 3.01782 3.25102 3.0022 3.44181C2.9877 3.61475 3.0446 3.78434 3.18183 3.97513C3.21642 4.022 3.27556 4.10456 3.31461 4.16035C3.35366 4.21502 3.40387 4.28531 3.42618 4.31655C3.4485 4.34667 3.52102 4.45044 3.58796 4.54528C3.65491 4.64011 3.72743 4.74276 3.74974 4.774C3.82338 4.87442 3.98963 5.10761 4.01752 5.14889C4.04207 5.18571 4.20385 5.41555 4.29645 5.54386C4.34332 5.60857 4.38014 5.6599 4.5832 5.94553C4.66576 6.06156 4.75391 6.18764 4.77957 6.22446C4.80523 6.26128 4.84763 6.32153 4.87441 6.35835C4.90118 6.39517 4.9804 6.50563 5.04958 6.60381C5.11987 6.70199 5.18904 6.80018 5.20466 6.82249C5.22028 6.84481 5.26268 6.90394 5.29839 6.95415C5.33297 7.00324 5.39099 7.08469 5.4267 7.1349C5.46128 7.18511 5.51819 7.26433 5.55166 7.3123C5.71009 7.53768 5.7603 7.60797 5.79266 7.65037C5.81163 7.67603 5.86406 7.74967 5.90869 7.81438C5.95332 7.8791 6.00911 7.95608 6.03143 7.98732C6.05486 8.01745 6.09391 8.07324 6.11957 8.11005C6.16531 8.17588 6.20771 8.23502 6.4554 8.58424C6.60491 8.794 6.6819 8.90334 6.79347 9.06066C6.87269 9.17335 7.05456 9.42885 7.21076 9.64754C7.25539 9.71002 7.30448 9.7792 7.31898 9.80151C7.33461 9.82383 7.41159 9.93205 7.48969 10.0414C7.56779 10.1519 7.64143 10.2534 7.65147 10.269C7.74631 10.404 7.81549 10.5011 7.98396 10.7376C8.09107 10.8871 8.18703 11.021 8.19595 11.0355C8.20488 11.0489 8.27517 11.1482 8.35216 11.2564C8.42914 11.3647 8.52175 11.5019 8.55968 11.561C8.66345 11.7262 8.74266 11.9437 8.77948 12.1591C8.78729 12.2037 8.79287 13.3429 8.79734 15.4516L8.80515 18.6761L8.82858 18.7386C8.87432 18.8613 8.91226 18.9204 8.99817 19.0041C9.13875 19.1436 9.28714 19.2049 9.47682 19.2061C9.57612 19.2061 9.60625 19.2016 9.69439 19.1715C9.7948 19.1391 9.99787 19.0632 10.1318 19.0108C10.1686 18.9963 10.3069 18.9427 10.4386 18.8925C10.8983 18.7185 11.1973 18.6047 11.4427 18.5098C11.532 18.4764 11.7574 18.3893 11.9448 18.319C12.1323 18.2476 12.3577 18.1617 12.4469 18.1271C12.5362 18.0925 12.6489 18.0502 12.698 18.0323C12.8441 17.9799 12.9244 17.9363 13.0003 17.8649C13.0762 17.7935 13.1431 17.6864 13.1788 17.5771C13.1989 17.5191 13.2 17.3952 13.2067 14.8714C13.2112 13.1766 13.2179 12.2015 13.2246 12.1546C13.248 12.0073 13.2848 11.8812 13.3417 11.7552C13.3585 11.7172 13.373 11.6815 13.373 11.6771C13.373 11.6603 13.5269 11.4305 13.7188 11.1605C13.7523 11.1136 13.8204 11.0177 13.8695 10.9485C13.9186 10.8793 13.9788 10.7934 14.0034 10.7588C14.0737 10.6595 14.2254 10.4475 14.2432 10.4219C14.2522 10.4085 14.3314 10.2969 14.4184 10.1742C14.5054 10.0514 14.5869 9.9354 14.6003 9.91755C14.6137 9.89858 14.6427 9.85841 14.665 9.82717C14.6873 9.79593 14.7252 9.74349 14.7487 9.71002C14.7721 9.67655 14.8469 9.57279 14.9149 9.47795C14.9819 9.38311 15.0611 9.27154 15.0901 9.23137C15.1448 9.15104 15.2987 8.93458 15.3534 8.85871C15.3969 8.79735 15.5487 8.58313 15.6268 8.47267C15.6602 8.42469 15.7428 8.30866 15.8097 8.21382C15.8767 8.1201 15.9548 8.01075 15.9827 7.97059C16.0117 7.93042 16.0507 7.87575 16.0708 7.84786C16.0909 7.81996 16.1188 7.7798 16.1344 7.7586C16.169 7.70839 16.2081 7.6526 16.3565 7.44396C16.4234 7.35024 16.5093 7.23085 16.5461 7.17841C16.5829 7.12597 16.6276 7.06349 16.6454 7.03895C16.6633 7.0144 16.7525 6.88832 16.8429 6.76001C17.1252 6.3617 17.1486 6.32934 17.1888 6.27355C17.21 6.24454 17.3004 6.11623 17.3896 5.99016C17.4789 5.86408 17.5815 5.71903 17.6183 5.66771C17.6552 5.61638 17.7043 5.54721 17.7277 5.51485C17.7511 5.48138 17.8381 5.35865 17.9207 5.24261C18.0044 5.12546 18.0892 5.00496 18.1115 4.97484C18.1327 4.94359 18.1818 4.8733 18.222 4.81863C18.261 4.76285 18.3023 4.70594 18.3135 4.69032C18.3413 4.64904 18.6359 4.23399 18.6738 4.18266C18.6917 4.15812 18.7319 4.1001 18.7642 4.05435C18.7955 4.00861 18.8323 3.95728 18.8457 3.94166C18.8948 3.88253 18.974 3.70401 18.9907 3.6181C19.0108 3.50764 18.9974 3.34251 18.9595 3.23763C18.926 3.14837 18.839 3.02564 18.7642 2.96539C18.7352 2.94196 18.7028 2.91407 18.6928 2.90514C18.6738 2.88841 18.5611 2.84489 18.4529 2.81142C18.4005 2.79469 17.7199 2.79357 10.9942 2.79357C6.92401 2.79357 3.58573 2.79803 3.5768 2.80361Z" fill="black"/>
              </svg>
            </div>
          </div>
          <div data-layer="Search button" className="SearchButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
            <div data-svg-wrapper data-layer="Search" className="Search" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.25 19.25L13.7501 13.75M15.5833 9.16667C15.5833 12.7105 12.7105 15.5833 9.16667 15.5833C5.62284 15.5833 2.75 12.7105 2.75 9.16667C2.75 5.62284 5.62284 2.75 9.16667 2.75C12.7105 2.75 15.5833 5.62284 15.5833 9.16667Z" stroke="black" strokeWidth="1.83333" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div data-layer="Download  button" className="DownloadButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}}>
            <div data-svg-wrapper data-layer="Download" className="Download" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 18.5L5 12.5L6.41016 11.0801L10 14.6699L10 0.5L12 0.5L12 14.6699L15.5898 11.0898L17 12.5L11 18.5ZM17 21.5L5 21.5V19.5L17 19.5V21.5Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
        <div data-layer="Log-out button" className="LogOutButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}} onClick={handleLogout}>
          <div data-layer="log-out" className="LogOut" style={{width: 22, height: 22, left: 31, top: 32, position: 'absolute', overflow: 'hidden'}}>
            <div data-svg-wrapper data-layer="Frame 1321316876" className="Frame1321316876" style={{left: 2.04, top: 2.08, position: 'absolute'}}>
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.74693 0.00292778L0.623591 0.0092907L0.54087 0.0398331C0.437786 0.0780125 0.30416 0.163279 0.229074 0.238365C0.150171 0.317268 0.066177 0.450895 0.0305432 0.556524L0 0.645607V8.91137V17.1771L0.0292706 17.2611C0.1209 17.5309 0.332158 17.7307 0.604501 17.8033C0.682132 17.8249 0.915024 17.8262 4.79147 17.8262H8.89571V17.018V16.2099L5.25598 16.2036L1.61625 16.1972V8.91137V1.62554L5.25598 1.61917L8.89571 1.61281L8.89953 0.809778C8.90208 0.172188 8.89953 0.00419998 8.88681 0.00165558C8.8779 -0.000890732 7.01476 -0.000890732 4.74693 0.00292778Z" fill="black"/>
              <path d="M11.3353 4.05404C11.0261 4.36329 10.7728 4.62164 10.7728 4.62673C10.7728 4.63182 11.5491 5.41194 12.4972 6.36133C13.4466 7.30944 14.2191 8.09084 14.2153 8.09847C14.2102 8.10611 12.1574 8.10993 8.72767 8.10993C4.3409 8.10993 3.24516 8.11247 3.23626 8.1252C3.23116 8.13411 3.22607 8.48917 3.22607 8.91296C3.22607 9.50983 3.22989 9.68799 3.24262 9.70454C3.25662 9.7249 3.59387 9.72617 8.73404 9.72363C13.6019 9.71981 14.2089 9.72236 14.2089 9.7389C14.2089 9.74908 13.4364 10.5318 12.4909 11.476C11.5466 12.4203 10.7728 13.1966 10.7728 13.2005C10.7728 13.2132 11.8927 14.3267 11.908 14.3306C11.9169 14.3318 13.033 13.2234 14.3884 11.868C17.0634 9.19039 16.9056 9.35711 16.9731 9.14713C16.996 9.07459 17.0011 9.02877 16.9998 8.90532C16.9998 8.76661 16.996 8.74243 16.9603 8.64825C16.94 8.59098 16.9005 8.51081 16.8738 8.47008C16.842 8.42045 16.0122 7.58179 14.3756 5.94263C13.0279 4.59364 11.9194 3.49027 11.9118 3.49027C11.9042 3.49027 11.6458 3.74352 11.3353 4.05404Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="Application section" className="ApplicationSection" style={{flex: '1 1 0', alignSelf: 'stretch', background: 'white', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div data-layer="Container with elements" className="ContainerWithElements" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          <div data-layer="SectionsDropdown" data-state="dropdown_selected" className="Sectionsdropdown" style={{width: 1427, height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Заявления</div>
            </div>
            <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="Chewron down" className="ChewronDown" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          <div data-layer="Table of applications" className="TableOfApplications" style={{alignSelf: 'stretch', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div data-layer="Header" data-state="not_pressed" className="Header" style={{alignSelf: 'stretch', position: 'relative', background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
              <div data-layer="Container" className="Container" style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
                <div data-layer="Select button" className="SelectButton" style={{width: 85, height: 85, position: 'relative', overflow: 'hidden'}}>
                  <div data-svg-wrapper data-layer="CheckButton" data-state="not_pressed" className="Checkbutton" style={{left: 32, top: 32, position: 'absolute'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75064" y="1.75" width="18.5" height="18.5" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Номер заявления</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ИИН Страхователя</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата создания</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Продукт</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страховая сумма</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип процесса</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Статус</div>
                </div>
              </div>
              <div data-layer="Refresh button" className="RefreshButton" style={{width: 85, height: 85, left: 1342, top: 0, position: 'absolute', background: '#FBF9F9', overflow: 'hidden'}}>
                <div data-svg-wrapper data-layer="refresh" className="Refresh" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1746 5.82067C14.8454 4.4915 13.0213 3.6665 10.9954 3.6665C6.94376 3.6665 3.67126 6.94817 3.67126 10.9998C3.67126 15.0515 6.94376 18.3332 10.9954 18.3332C14.4146 18.3332 17.2654 15.9957 18.0813 12.8332H16.1746C15.4229 14.969 13.3879 16.4998 10.9954 16.4998C7.96126 16.4998 5.49543 14.034 5.49543 10.9998C5.49543 7.96567 7.96126 5.49984 10.9954 5.49984C12.5171 5.49984 13.8738 6.13234 14.8638 7.1315L11.9121 10.0832H18.3288V3.6665L16.1746 5.82067Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>
            <div data-layer="Row" data-state="pressed" className="Row" style={{alignSelf: 'stretch', position: 'relative', background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
              <div data-layer="Container" className="Container" style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
                <div data-layer="Select button" className="SelectButton" style={{width: 85, height: 85, position: 'relative', overflow: 'hidden'}}>
                  <div data-svg-wrapper data-layer="CheckButton" data-state="not_pressed" className="Checkbutton" style={{left: 32, top: 32, position: 'absolute'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75064" y="1.75" width="18.5" height="18.5" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>RZ-1234BS</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>123 123 123 123</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>20.09.2025</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Сенiм</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>800 000 ₸ </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Оформление</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Новая заявка</div>
                </div>
              </div>
              <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, left: 1342, top: 0, position: 'absolute', background: '#FBF9F9', overflow: 'hidden'}}>
                <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
            <div data-layer="Row" data-state="pressed" className="Row" style={{alignSelf: 'stretch', position: 'relative', background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
              <div data-layer="Container" className="Container" style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
                <div data-layer="Select button" className="SelectButton" style={{width: 85, height: 85, position: 'relative', overflow: 'hidden'}}>
                  <div data-svg-wrapper data-layer="CheckButton" data-state="not_pressed" className="Checkbutton" style={{left: 32, top: 32, position: 'absolute'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75064" y="1.75" width="18.5" height="18.5" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>RZ-5678AS</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>123 123 123 123</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>20.09.2025</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ГОНС</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>1 200 000 ₸ </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Оформление</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Отклонено</div>
                </div>
              </div>
              <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, left: 1342, top: 0, position: 'absolute', background: '#FBF9F9', overflow: 'hidden'}}>
                <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
            <div data-layer="Row" data-state="pressed" className="Row" style={{alignSelf: 'stretch', position: 'relative', background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
              <div data-layer="Container" className="Container" style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
                <div data-layer="Select button" className="SelectButton" style={{width: 85, height: 85, position: 'relative', overflow: 'hidden'}}>
                  <div data-svg-wrapper data-layer="CheckButton" data-state="not_pressed" className="Checkbutton" style={{left: 32, top: 32, position: 'absolute'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75064" y="1.75" width="18.5" height="18.5" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>RZ-5678AS</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>123 123 123 123</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>20.09.2025</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Пенсионный Аннуитет</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>1 200 000 ₸ </div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Оформление</div>
                </div>
                <div data-layer="Text container" className="TextContainer" style={{width: 140, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{width: 600, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Отправлено на согласование</div>
                </div>
              </div>
              <div data-layer="Open button" className="OpenButton" style={{width: 85, height: 85, left: 1342, top: 0, position: 'absolute', background: '#FBF9F9', overflow: 'hidden'}}>
                <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="Pagination" className="Pagination" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderTop: '1px #F8E8E8 solid', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Back page button" className="BackPageButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
            <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div data-layer="Page" className="Page" style={{flex: '1 1 0', height: 85, paddingLeft: 20, paddingRight: 20, paddingTop: 33, paddingBottom: 33, background: '#FBF9F9', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Label" className="Label" style={{flex: '1 1 0', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>10 из 100</div>
          </div>
          <div data-layer="Next page button" className="NextPageButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden'}}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statements;

