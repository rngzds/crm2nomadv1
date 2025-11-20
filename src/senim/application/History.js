import React, { useEffect, useState } from 'react';
import { loadApplicationHistory } from '../../services/storageService';

const sanitizeValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || trimmed === '-') {
      return '';
    }
    return trimmed;
  }
  return value;
};

const formatHistoryDate = (value) => {
  if (!value) {
    return '—';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  // Добавляем 5 часов к дате
  parsed.setHours(parsed.getHours() + 5);
  return parsed.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const mapHistoryRow = (item = {}) => ({
  stage: sanitizeValue(item.stage) ||
    sanitizeValue(item.role) ||
    sanitizeValue(item.statusTitle) ||
    sanitizeValue(item.statusCode) ||
    '',
  performer: sanitizeValue(item.performer) ||
    sanitizeValue(item.executorName) ||
    sanitizeValue(item.userFullName) ||
    '',
  eventDate: sanitizeValue(item.eventDate) ||
    sanitizeValue(item.executionDate) ||
    sanitizeValue(item.factEndDate) ||
    sanitizeValue(item.dateCreated) ||
    '',
  decision: sanitizeValue(item.decision) ||
    sanitizeValue(item.status) ||
    sanitizeValue(item.decisionNameRu) ||
    '',
  comment: sanitizeValue(item.comment) || sanitizeValue(item.reason) || ''
});

const History = ({ onBack, onNext, onPrevious, applicationId }) => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    if (!applicationId) {
      return;
    }
    const data = loadApplicationHistory(applicationId);
    if (data && Array.isArray(data.items)) {
      setHistoryItems(data.items.map(mapHistoryRow));
    } else {
      setHistoryItems([]);
    }
  }, [applicationId]);

  const columns = ['Этап процесса', 'Исполнитель', 'Дата события', 'Решение', 'Комментарий'];

  return (
    <div className="HistoryApplicationPage" style={{width: 1512, height: 1436, background: 'white', overflow: 'hidden', display: 'inline-flex'}}>
      <div className="Menu" style={{width: 85, borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid'}}>
        <div className="BackButton" onClick={onBack} style={{width: 85, height: 85, cursor: 'pointer', borderBottom: '1px #F8E8E8 solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="HistoryApplication" style={{flex: 1, borderRight: '1px #F8E8E8 solid', display: 'flex', flexDirection: 'column'}}>
        <div className="Subheader" style={{height: 85, borderBottom: '1px #F8E8E8 solid', display: 'flex', alignItems: 'center'}}>
          <div style={{flex: 1, paddingLeft: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>История</div>
            <div style={{display: 'flex'}}>
              <div onClick={onNext} style={{width: 85, height: 85, cursor: 'pointer', borderRight: '1px #F8E8E8 solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <path d="M18.5 7.5L11 15.5L3.5 7.5" stroke="black" strokeWidth="2" />
                </svg>
              </div>
              <div onClick={onPrevious} style={{width: 85, height: 85, cursor: 'pointer', borderBottom: '1px #F8E8E8 solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <path d="M3.5 15.5L11 7.5L18.5 15.5" stroke="black" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'stretch'}}>
          <div style={{height: 85, paddingLeft: 40, background: '#F6F6F6', borderBottom: '1px #F8E8E8 solid', display: 'flex', gap: 20}}>
            {columns.map((title) => (
              <div key={title} style={{width: 220, display: 'flex', alignItems: 'center', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>
                {title}
              </div>
            ))}
          </div>
          {historyItems.length === 0 ? (
            <div style={{alignSelf: 'stretch', height: 200, paddingLeft: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B6D80', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>
              История пуста
            </div>
          ) : (
            historyItems.map((item, index) => (
              <div key={`${item.stage}-${index}`} style={{alignSelf: 'stretch', height: 85, paddingLeft: 40, borderBottom: '1px #F8E8E8 solid', display: 'flex', gap: 20}}>
                <div style={{width: 220, display: 'flex', alignItems: 'center', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>{item.stage || '—'}</div>
                <div style={{width: 220, display: 'flex', alignItems: 'center', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>{item.performer || '—'}</div>
                <div style={{width: 220, display: 'flex', alignItems: 'center', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>{formatHistoryDate(item.eventDate)}</div>
                <div style={{width: 220, display: 'flex', alignItems: 'center', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>{item.decision || '—'}</div>
                <div style={{width: 220, display: 'flex', alignItems: 'center', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: 500}}>{item.comment || '—'}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;

