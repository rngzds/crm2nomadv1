import React, { useState, useEffect } from 'react';
import { loadApplicationHistory } from '../../services/storageService';

const History = ({ onBack, onNext, onPrevious, applicationId }) => {
  const [historyItems, setHistoryItems] = useState([]);

  // Загружаем данные истории при монтировании
  useEffect(() => {
    if (applicationId) {
      const loaded = loadApplicationHistory(applicationId);
      if (loaded && loaded.items) {
        setHistoryItems(loaded.items);
      } else {
        // Инициализируем пустым массивом
        setHistoryItems([]);
      }
    }
  }, [applicationId]);
  return (
    <div data-layer="History application page" className="HistoryApplicationPage" style={{width: 1512, height: 1436, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div data-layer="Back button" className="BackButton" onClick={onBack} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
          <div data-svg-wrapper data-layer="Chewron left" className="ChewronLeft" style={{left: 32, top: 32, position: 'absolute'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div data-layer="History application" className="HistoryApplication" style={{flex: '1 1 0', alignSelf: 'stretch', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div data-layer="SubHeader" data-type="SectionApplication" className="Subheader" style={{alignSelf: 'stretch', height: 85, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Title" className="Title" style={{flex: '1 1 0', height: 85, paddingLeft: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>История</div>
            <div data-layer="Button container" className="ButtonContainer" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
              <div data-layer="Application section transition buttons" className="ApplicationSectionTransitionButtons" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
                <div data-layer="Next Button" className="NextButton" onClick={onNext} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', cursor: 'pointer'}}>
                  <div data-svg-wrapper data-layer="Chewron down" className="ChewronDown" style={{left: 31, top: 32, position: 'absolute'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                <div data-layer="Previous Button" className="PreviousButton" onClick={onPrevious} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', cursor: 'pointer'}}>
                  <div data-svg-wrapper data-layer="Chewron up" className="ChewronUp" style={{left: 31, top: 32, position: 'absolute'}}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 15.5L11 7.5L18.5 15.5" stroke="black" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="Table of applications" className="TableOfApplications" style={{alignSelf: 'stretch', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          <div data-layer="TableContainerHistoryApplication" data-state="not_pressed" className="Tablecontainerhistoryapplication" style={{alignSelf: 'stretch', height: 85, paddingLeft: 40, position: 'relative', background: '#F6F6F6', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div data-layer="Container" className="Container" style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
              <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Роль</div>
              </div>
              <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ФИО исполнителя</div>
              </div>
              <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата исполнения</div>
              </div>
              <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Статус заявления</div>
              </div>
              <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Комментарий</div>
              </div>
            </div>
            <div data-layer="Refresh button" className="RefreshButton" style={{width: 85, height: 85, left: 1342, top: 0, position: 'absolute', background: '#FBF9F9', overflow: 'hidden', borderRight: '1px #F8E8E8 solid'}}>
              <div data-svg-wrapper data-layer="refresh" className="Refresh" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1752 5.82091C14.846 4.49175 13.0219 3.66675 10.996 3.66675C6.94437 3.66675 3.67188 6.94841 3.67188 11.0001C3.67188 15.0517 6.94437 18.3334 10.996 18.3334C14.4152 18.3334 17.266 15.9959 18.0819 12.8334H16.1752C15.4235 14.9692 13.3885 16.5001 10.996 16.5001C7.96187 16.5001 5.49604 14.0342 5.49604 11.0001C5.49604 7.96591 7.96187 5.50008 10.996 5.50008C12.5177 5.50008 13.8744 6.13258 14.8644 7.13175L11.9127 10.0834H18.3294V3.66675L16.1752 5.82091Z" fill="black"/>
                </svg>
              </div>
            </div>
          </div>
          {/* TODO: Список истории будет загружаться из API */}
          {historyItems.length === 0 ? (
            <div data-layer="Empty state" className="EmptyState" style={{alignSelf: 'stretch', height: 200, paddingLeft: 40, background: 'white', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>История пуста</div>
            </div>
          ) : (
            historyItems.map((item, index) => (
              <div key={index} data-layer="TableContainerHistoryApplication" data-state="pressed" className="Tablecontainerhistoryapplication" style={{alignSelf: 'stretch', height: 85, paddingLeft: 40, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                <div data-layer="Container" className="Container" style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
                  <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{item.role || ''}</div>
                  </div>
                  <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{item.executorName || ''}</div>
                  </div>
                  <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{item.executionDate || ''}</div>
                  </div>
                  <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{item.status || ''}</div>
                  </div>
                  <div data-layer="Text container" className="TextContainer" style={{width: 220, height: 19, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                    <div data-layer="Label" className="Label" style={{width: 300, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{item.comment || ''}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
