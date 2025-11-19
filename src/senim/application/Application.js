import React, { useState, useEffect, useRef, useCallback } from 'react';
import Policyholder from './Policyholder';
import Insured from './Insured/Insured';
import Beneficiary from './Beneficiary';
import Terms from './Terms';
import Questionary from './Questionary';
import History from './History';
import { loadApplicationHistory, loadApplicationBeneficiary, loadApplicationMetadata, saveApplicationMetadata, loadGlobalApplicationData, loadPolicyholderData, loadInsuredData, updateGlobalApplicationSection, getAccessToken, saveApplicationDataByNumber, loadApplicationDataByNumber, getApplicationKey } from '../../services/storageService';
import { claimTask, sendTaskDecision, getRejectReasons } from '../../services/processService';

const Application = ({ selectedProduct, applicationId, onBack, processState, onProcessStateRefresh }) => {
  const [currentView, setCurrentView] = useState('main');
  const [policyholderData, setPolicyholderData] = useState(null);
  const [insuredData, setInsuredData] = useState(null);
  const [termsData, setTermsData] = useState(null);
  const [questionaryData, setQuestionaryData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [applicationNumber, setApplicationNumber] = useState(null);
  const [isClaimingTask, setIsClaimingTask] = useState(false);
  const [isSendingTask, setIsSendingTask] = useState(false);
  const [isRejectingTask, setIsRejectingTask] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [isReasonsModalOpen, setIsReasonsModalOpen] = useState(false);
  const [reasonsLoading, setReasonsLoading] = useState(false);
  const [processError, setProcessError] = useState(null);
  const processStateRequestedRef = useRef(false);

  // Загружаем данные истории и выгодоприобретателя при монтировании
  useEffect(() => {
    if (applicationId) {
      // Загружаем данные из API и localStorage параллельно для оптимизации
      const loadData = async () => {
        // Загружаем метаданные синхронно (быстро)
        const existingMetadata = loadApplicationMetadata(applicationId);
        if (!existingMetadata) {
          saveApplicationMetadata(applicationId, {
            product: selectedProduct || null,
            createdAt: new Date().toISOString(),
            policyholderIin: '',
            status: 'Черновик'
          });
        } else {
          // Загружаем номер заявления из метаданных
          if (existingMetadata.number) {
            setApplicationNumber(existingMetadata.number);
            
            // ПРИОРИТЕТ: Загружаем данные по номеру заявки (номер постоянный, ID могут меняться)
            const dataByNumber = loadApplicationDataByNumber(existingMetadata.number);
            if (dataByNumber) {
              // Если данные найдены по номеру, используем их (независимо от applicationId)
              if (dataByNumber.policyholder) {
                updateGlobalApplicationSection('Policyholder', dataByNumber.policyholder, applicationId);
              }
              if (dataByNumber.insured) {
                updateGlobalApplicationSection('Insured', dataByNumber.insured, applicationId);
              }
              if (dataByNumber.beneficiary) {
                // Сохраняем данные выгодоприобретателя
                const beneficiaryKey = getApplicationKey(applicationId, 'applicationBeneficiary');
                localStorage.setItem(beneficiaryKey, JSON.stringify(dataByNumber.beneficiary));
              }
              if (dataByNumber.history) {
                const historyKey = getApplicationKey(applicationId, 'applicationHistory');
                localStorage.setItem(historyKey, JSON.stringify(dataByNumber.history));
              }
              if (dataByNumber.terms) {
                updateGlobalApplicationSection('Terms', dataByNumber.terms, applicationId);
              }
              if (dataByNumber.questionary) {
                updateGlobalApplicationSection('Questionary', dataByNumber.questionary, applicationId);
              }
            }
          }
          
          if (selectedProduct && existingMetadata.product !== selectedProduct) {
            // Обновляем продукт в метаданных, если он изменился
            saveApplicationMetadata(applicationId, {
              ...existingMetadata,
              product: selectedProduct
            });
          }
        }

        // Загружаем локальные данные синхронно (быстро, без await)
        // ПРИОРИТЕТ: Если данные уже загружены по номеру заявки выше, используем их
        // Иначе пытаемся загрузить по applicationId, затем по processId
        const processId = existingMetadata?.processId;
        let globalData = loadGlobalApplicationData(applicationId);
        let loadedHistory = loadApplicationHistory(applicationId);
        let loadedBeneficiary = loadApplicationBeneficiary(applicationId);
        let loadedPolicyholder = globalData?.Policyholder || loadPolicyholderData(applicationId);
        let loadedInsured = globalData?.Insured || loadInsuredData(applicationId);
        
        // Если данных нет и processId отличается от applicationId, пытаемся загрузить по processId
        if (processId && processId !== applicationId) {
          if (!globalData || !globalData.Policyholder) {
            const processGlobalData = loadGlobalApplicationData(processId);
            if (processGlobalData) {
              globalData = processGlobalData;
              loadedPolicyholder = processGlobalData.Policyholder || loadPolicyholderData(processId);
              loadedInsured = processGlobalData.Insured || loadInsuredData(processId);
            }
          }
          if (!loadedHistory) {
            loadedHistory = loadApplicationHistory(processId);
          }
          if (!loadedBeneficiary) {
            loadedBeneficiary = loadApplicationBeneficiary(processId);
          }
        }

        // Устанавливаем данные из localStorage сразу
        if (loadedHistory) {
          setHistoryData(loadedHistory);
        } else {
          setHistoryData({ dateTime: '', status: '' });
        }
        
        if (loadedBeneficiary) {
          setBeneficiaryData(loadedBeneficiary);
        } else {
          // Устанавливаем значения по умолчанию для выгодоприобретателя
          setBeneficiaryData({ 
            name: 'Madanes Advanced Healthcare Services Ltd.', 
            residencyType: 'не резидент' 
          });
        }
        
        if (loadedPolicyholder && (loadedPolicyholder.iin || loadedPolicyholder.name || loadedPolicyholder.surname)) {
          setPolicyholderData(loadedPolicyholder);
        }
        
        if (loadedInsured && (loadedInsured.iin || loadedInsured.lastName || loadedInsured.firstName || loadedInsured.middleName || 
            loadedInsured.surname || loadedInsured.name || loadedInsured.patronymic)) {
          setInsuredData(loadedInsured);
        }

      };

      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId, selectedProduct]);

  useEffect(() => {
    if (!processState && applicationId && onProcessStateRefresh && !processStateRequestedRef.current) {
      processStateRequestedRef.current = true;
      onProcessStateRefresh(applicationId);
    }
  }, [applicationId, onProcessStateRefresh, processState]);

  useEffect(() => {
    processStateRequestedRef.current = false;
  }, [applicationId]);

  // Функция для сбора всех данных заявки
  const collectAllApplicationData = useCallback(() => {
    const globalData = loadGlobalApplicationData(applicationId);
    const metadata = loadApplicationMetadata(applicationId);
    
    return {
      metadata: metadata || {},
      policyholder: globalData?.Policyholder || policyholderData || null,
      insured: globalData?.Insured || insuredData || null,
      beneficiary: beneficiaryData || null,
      history: historyData || null,
      terms: termsData || null,
      questionary: questionaryData || null,
      processState: processState || null,
      applicationId: applicationId // Сохраняем applicationId для связи
    };
  }, [applicationId, policyholderData, insuredData, beneficiaryData, historyData, termsData, questionaryData, processState]);
  
  // Функция для сохранения данных по номеру заявки
  const saveDataByNumber = useCallback(() => {
    if (!applicationNumber) {
      // Пытаемся получить номер из метаданных
      const metadata = loadApplicationMetadata(applicationId);
      if (metadata?.number) {
        const allData = collectAllApplicationData();
        saveApplicationDataByNumber(metadata.number, applicationId, allData);
      }
    } else {
      const allData = collectAllApplicationData();
      saveApplicationDataByNumber(applicationNumber, applicationId, allData);
    }
  }, [applicationNumber, applicationId, collectAllApplicationData]);

  // Автоматическое сохранение всех данных по номеру заявки при любых изменениях
  useEffect(() => {
    if (applicationId) {
      // Небольшая задержка, чтобы избежать сохранения во время начальной загрузки
      const timer = setTimeout(() => {
        saveDataByNumber();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [applicationId, saveDataByNumber]);

  // Прокрутка наверх при изменении view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleBackToMain = () => {
    setCurrentView('main');
    // Перезагружаем данные при возврате на главный экран
    if (applicationId) {
      const globalData = loadGlobalApplicationData(applicationId);
      let loadedPolicyholder = null;
      
      if (globalData && globalData.Policyholder) {
        loadedPolicyholder = globalData.Policyholder;
      } else {
        loadedPolicyholder = loadPolicyholderData(applicationId);
      }
      
      if (loadedPolicyholder && (loadedPolicyholder.iin || loadedPolicyholder.name || loadedPolicyholder.surname)) {
        setPolicyholderData(loadedPolicyholder);
      }

      let loadedInsured = null;
      if (globalData && globalData.Insured) {
        loadedInsured = globalData.Insured;
      } else {
        loadedInsured = loadInsuredData(applicationId);
      }
      
      if (loadedInsured && (loadedInsured.iin || loadedInsured.lastName || loadedInsured.firstName || loadedInsured.middleName || 
          loadedInsured.surname || loadedInsured.name || loadedInsured.patronymic)) {
        setInsuredData(loadedInsured);
      }
    }
  };
  
  const handleBackToProduct = () => {
    if (onBack) {
      onBack();
    }
  };
  const handleOpenPolicyholder = () => setCurrentView('policyholder');
  const handleOpenInsured = () => setCurrentView('insured');
  const handleOpenTerms = () => setCurrentView('terms');
  const handleOpenQuestionary = () => setCurrentView('questionary');
  const handleViewFullHistory = () => setCurrentView('history');

  // Порядок разделов для навигации
  const sections = ['history', 'policyholder', 'insured', 'beneficiary', 'terms', 'questionary'];
  
  // Навигация к следующему разделу
  const handleNextSection = (currentSection) => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentView(sections[currentIndex + 1]);
    }
  };
  
  // Навигация к предыдущему разделу
  const handlePreviousSection = (currentSection) => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentView(sections[currentIndex - 1]);
    }
  };

  // Функция для сохранения данных заявки в API
  const saveApplicationToAPI = async (section, data) => {
    if (!applicationId) return;
    
    try {
      const token = getAccessToken();
      if (!token) {
        console.log('Токен не найден, сохраняем только локально');
        return;
      }

      console.log('Сохраняем данные заявки в API:', section, applicationId);
      
      // Загружаем текущие глобальные данные
      const globalData = loadGlobalApplicationData(applicationId) || {};
      
      // Обновляем секцию
      globalData[section] = data;
      
      // Сохраняем в API
      // Обычно используется PUT или PATCH запрос
      const response = await fetch(`https://crm-arm.onrender.com/api/Statement/${applicationId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(globalData),
      });

      if (response.ok) {
        console.log('Данные заявки успешно сохранены в API');
      } else {
        console.error('Ошибка сохранения данных заявки в API:', response.status);
      }
    } catch (error) {
      console.error('Ошибка сохранения данных заявки в API:', error);
      // Продолжаем работу, данные сохранены локально
    }
  };

  const handleInsuredSave = (data) => {
    // Сохраняем все данные (включая fullData для восстановления)
    setInsuredData(data);
    // Сохраняем в глобальное хранилище
    if (applicationId) {
      updateGlobalApplicationSection('Insured', data, applicationId);
      // Сохраняем в API
      saveApplicationToAPI('Insured', data);
      
      // Сохраняем все данные по номеру заявки
      saveDataByNumber();
    }
  };

  const handlePolicyholderSave = (data) => {
    setPolicyholderData(data);
    // Сохраняем в глобальное хранилище
    if (applicationId) {
      updateGlobalApplicationSection('Policyholder', data, applicationId);
      
      // Обновляем метаданные заявки с ИИН страхователя
      const existingMetadata = loadApplicationMetadata(applicationId) || {};
      if (data.iin && existingMetadata.policyholderIin !== data.iin) {
        saveApplicationMetadata(applicationId, {
          ...existingMetadata,
          policyholderIin: data.iin
        });
        console.log('ИИН страхователя сохранен в метаданные:', data.iin);
      }
      
      // Сохраняем в API
      saveApplicationToAPI('Policyholder', data);
      
      // Сохраняем все данные по номеру заявки
      saveDataByNumber();
    }
  };

  const handleTermsSave = (data) => {
    setTermsData(data);
    // Сохраняем в глобальное хранилище
    if (applicationId) {
      updateGlobalApplicationSection('Terms', data, applicationId);
      // Сохраняем в API
      saveApplicationToAPI('Terms', data);
      
      // Сохраняем все данные по номеру заявки
      saveDataByNumber();
    }
  };

  const handleQuestionarySave = (data) => {
    setQuestionaryData(data);
    // Сохраняем в глобальное хранилище
    if (applicationId) {
      updateGlobalApplicationSection('Questionary', data, applicationId);
      // Сохраняем в API
      saveApplicationToAPI('Questionary', data);
      
      // Сохраняем все данные по номеру заявки
      saveDataByNumber();
    }
  };

  const getInsuranceAmount = (insuranceProduct) => {
    if (!insuranceProduct) {
      return null;
    }
    // Извлекаем число из названия программы (например, "«CEHIM» Бизнес 150" → 150)
    const match = insuranceProduct.match(/(\d+)/);
    if (match) {
      const amount = parseInt(match[1], 10);
      return `${amount} 000 USD`;
    }
    return null;
  };

  const currentTaskId = processState?.taskId || null;
  const canClaimTaskNow = Boolean(processState?.canClaim && currentTaskId);
  // Кнопки должны быть активны, если taskId есть и canClaim = false (задача уже наша)
  // isDecisionDisabled = true только если нет taskId, идет отправка/отклонение, ИЛИ задача еще не взята (canClaim = true)
  const isDecisionDisabled = !currentTaskId || isSendingTask || isRejectingTask || canClaimTaskNow;
  

  const refreshProcessState = async () => {
    if (onProcessStateRefresh && applicationId) {
      await onProcessStateRefresh(applicationId);
    }
  };

  const handleClaimTask = async () => {
    if (!currentTaskId) return;
    try {
      setProcessError(null);
      setIsClaimingTask(true);
      await claimTask(currentTaskId);
      await refreshProcessState();
    } catch (error) {
      console.error('Ошибка при взятии задачи:', error);
      setProcessError(error.message || 'Не удалось взять задачу');
      alert(error.message || 'Не удалось взять задачу');
    } finally {
      setIsClaimingTask(false);
    }
  };

  const handleSendForApproval = async () => {
    if (isDecisionDisabled) return;
    try {
      setProcessError(null);
      setIsSendingTask(true);
      
      // Сохраняем все данные по номеру заявки перед отправкой
      saveDataByNumber();
      
      await sendTaskDecision({ taskId: currentTaskId, decision: true, reasonId: null });
      await refreshProcessState();
      alert('Задача отправлена на согласование');
      
      // Возвращаемся к списку заявлений после успешной отправки
      if (onBack) {
        onBack();
      }
    } catch (error) {
      console.error('Ошибка отправки задачи:', error);
      setProcessError(error.message || 'Не удалось отправить задачу');
      alert(error.message || 'Не удалось отправить задачу');
    } finally {
      setIsSendingTask(false);
    }
  };

  const handleRejectClick = async () => {
    if (isDecisionDisabled) return;
    try {
      setProcessError(null);
      setReasonsLoading(true);
      const reasonsResponse = await getRejectReasons(currentTaskId);
      setReasons(Array.isArray(reasonsResponse) ? reasonsResponse : []);
      setSelectedReasonId(reasonsResponse?.[0]?.id || null);
      setIsReasonsModalOpen(true);
    } catch (error) {
      console.error('Ошибка загрузки причин отказа:', error);
      setProcessError(error.message || 'Не удалось загрузить причины отказа');
      alert(error.message || 'Не удалось загрузить причины отказа');
    } finally {
      setReasonsLoading(false);
    }
  };

  const handleCloseReasonsModal = () => {
    setIsReasonsModalOpen(false);
    setSelectedReasonId(null);
  };

  const handleConfirmReject = async () => {
    if (!selectedReasonId || !currentTaskId) {
      alert('Выберите причину отказа');
      return;
    }

    try {
      setProcessError(null);
      setIsRejectingTask(true);
      
      // Сохраняем все данные по номеру заявки перед отклонением
      saveDataByNumber();
      
      await sendTaskDecision({ taskId: currentTaskId, decision: false, reasonId: selectedReasonId });
      handleCloseReasonsModal();
      await refreshProcessState();
      alert('Задача отклонена');
      
      // Возвращаемся к списку заявлений после успешного отклонения
      if (onBack) {
        onBack();
      }
    } catch (error) {
      console.error('Ошибка при отклонении задачи:', error);
      setProcessError(error.message || 'Не удалось отклонить задачу');
      alert(error.message || 'Не удалось отклонить задачу');
    } finally {
      setIsRejectingTask(false);
    }
  };

  if (currentView === 'history') {
    return <History onBack={handleBackToMain} onNext={() => handleNextSection('history')} onPrevious={() => handlePreviousSection('history')} applicationId={applicationId} />;
  }

  if (currentView === 'policyholder') {
    return <Policyholder onBack={handleBackToMain} onSave={handlePolicyholderSave} onNext={() => handleNextSection('policyholder')} onPrevious={() => handlePreviousSection('policyholder')} applicationId={applicationId} />;
  }

  if (currentView === 'insured') {
    return <Insured onBack={handleBackToMain} policyholderData={policyholderData} onSave={handleInsuredSave} onNext={() => handleNextSection('insured')} onPrevious={() => handlePreviousSection('insured')} applicationId={applicationId} savedInsuredData={insuredData} />;
  }

  if (currentView === 'beneficiary') {
    return <Beneficiary onBack={handleBackToMain} onNext={() => handleNextSection('beneficiary')} onPrevious={() => handlePreviousSection('beneficiary')} applicationId={applicationId} />;
  }

  if (currentView === 'terms') {
    return <Terms onBack={handleBackToMain} onSave={handleTermsSave} onNext={() => handleNextSection('terms')} onPrevious={() => handlePreviousSection('terms')} applicationId={applicationId} />;
  }

  if (currentView === 'questionary') {
    return <Questionary onBack={handleBackToMain} onSave={handleQuestionarySave} onNext={() => handleNextSection('questionary')} onPrevious={() => handlePreviousSection('questionary')} applicationId={applicationId} />;
  }

  return (
    <div data-layer="Statements details" className="StatementsDetails" style={{width: 1512, background: 'white', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  <div data-layer="Menu" data-property-1="Menu one" className="Menu" style={{width: 85, height: 982, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="Back button" className="BackButton" style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid'}} onClick={handleBackToProduct}>
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
          <line x1="4.00024" y1="11.2505" x2="12.0006" y2="11.2505" stroke="black" strokeWidth="1.5"/>
          <line x1="4.00024" y1="15.2507" x2="10.0005" y2="15.2507" stroke="black" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div data-layer="Statements details" className="StatementsDetails" style={{flex: '1 1 0', alignSelf: 'stretch', overflow: 'hidden', borderRight: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
    <div data-layer="SubHeader" data-type="OrderHeader" className="Subheader" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
      <div data-layer="Frame 1321316873" className="Frame1321316873" style={{flex: '1 1 0', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div data-layer="Screen Title" className="ScreenTitle" style={{flex: '1 1 auto', height: 12, textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Заявление № {applicationNumber || (applicationId ? applicationId.substring(0, 8) : '')}</div>
      </div>
      <div data-layer="Button Container" className="ButtonContainer" style={{flex: '0 0 777px', height: 85, background: 'white', overflow: 'hidden', borderLeft: '1px #F8E8E8 solid', justifyContent: 'flex-end', alignItems: 'center', display: 'flex', gap: 16, paddingRight: 16}}>
        {processError && (
          <div style={{color: '#d32f2f', fontSize: 14, fontFamily: 'Inter', fontWeight: 500, marginRight: 12}}>
            {processError}
          </div>
        )}
        {canClaimTaskNow ? (
          <div
            data-layer="Claim button"
            className="ClaimButton"
            style={{
              width: 388.5,
              height: 85,
              background: isClaimingTask ? '#666' : '#000',
              opacity: isClaimingTask ? 0.7 : 1,
              overflow: 'hidden',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              cursor: isClaimingTask ? 'wait' : 'pointer',
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight: 500
            }}
            onClick={isClaimingTask ? undefined : handleClaimTask}
          >
            <div style={{flex: 1, textAlign: 'center'}}>
              {isClaimingTask ? 'Берем задачу...' : 'Взять задачу'}
            </div>
          </div>
        ) : (
          <>
            <div
              data-layer="Reject button"
              className="RejectButton"
              style={{
                width: 388.5,
                height: 85,
                overflow: 'hidden',
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'flex',
                cursor: isDecisionDisabled ? 'not-allowed' : 'pointer',
                opacity: isDecisionDisabled ? 0.5 : 1,
                color: 'black',
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: 500
              }}
              onClick={isDecisionDisabled ? undefined : handleRejectClick}
            >
              <div style={{flex: 1, textAlign: 'center'}}>
                {isRejectingTask ? 'Отклоняем...' : 'Отклонить'}
              </div>
            </div>
            <div
              data-layer="Send button for approval"
              className="SendButtonForApproval"
              style={{
                width: 388.5,
                height: 85,
                background: isDecisionDisabled ? '#666' : 'black',
                overflow: 'hidden',
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'flex',
                cursor: isDecisionDisabled ? 'not-allowed' : 'pointer',
                opacity: isDecisionDisabled ? 0.7 : 1,
                color: 'white',
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: 500
              }}
              onClick={isDecisionDisabled ? undefined : handleSendForApproval}
            >
              <div style={{flex: 1, textAlign: 'center'}}>
                {isSendingTask ? 'Отправляем...' : 'Отправить на согласование'}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <div data-layer="Application data section" className="ApplicationDataSection" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
      <div data-layer="Сounterparty History" data-state="pressed" className="OunterpartyHistory" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div data-layer="Sections History" className="SectionsHistory" style={{width: 1427, height: 85, paddingLeft: 20, background: '#FCFCFC', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>История</div>
          </div>
          <div data-layer="Open button" className="OpenButton" onClick={handleViewFullHistory} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
  {isReasonsModalOpen && (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
      onClick={handleCloseReasonsModal}
    >
      <div
        style={{
          width: 420,
          maxWidth: '90%',
          background: 'white',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{fontFamily: 'Inter', fontSize: 18, fontWeight: 600}}>
          Выберите причину отказа
        </div>
        <div style={{fontFamily: 'Inter', fontSize: 14, color: '#6B6D80'}}>
          Причина будет отправлена вместе с решением по задаче
        </div>
        <div style={{maxHeight: 240, overflowY: 'auto', border: '1px solid #F0F0F0', borderRadius: 8, padding: 8}}>
          {reasonsLoading ? (
            <div style={{padding: 16, textAlign: 'center'}}>Загрузка...</div>
          ) : reasons.length ? (
            reasons.map((reason) => (
              <label
                key={reason.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderBottom: '1px solid #F5F5F5',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="reject-reason"
                  checked={selectedReasonId === reason.id}
                  onChange={() => setSelectedReasonId(reason.id)}
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontFamily: 'Inter', fontSize: 14, fontWeight: 500}}>
                    {reason.nameRu || `Причина ${reason.code}`}
                  </span>
                  {reason.isReject === false && (
                    <span style={{fontFamily: 'Inter', fontSize: 12, color: '#6B6D80'}}>
                      Возврат на доработку
                    </span>
                  )}
                </div>
              </label>
            ))
          ) : (
            <div style={{padding: 16, textAlign: 'center'}}>Причины недоступны</div>
          )}
        </div>
        <div style={{display: 'flex', gap: 12, justifyContent: 'flex-end'}}>
          <button
            onClick={handleCloseReasonsModal}
            style={{
              minWidth: 120,
              height: 40,
              borderRadius: 8,
              border: '1px solid #E0E0E0',
              background: 'white',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontSize: 14
            }}
          >
            Отмена
          </button>
          <button
            onClick={handleConfirmReject}
            disabled={isRejectingTask || !selectedReasonId}
            style={{
              minWidth: 160,
              height: 40,
              borderRadius: 8,
              border: 'none',
              background: isRejectingTask || !selectedReasonId ? '#999' : 'black',
              color: 'white',
              cursor: isRejectingTask || !selectedReasonId ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: 500,
              opacity: isRejectingTask || !selectedReasonId ? 0.7 : 1
            }}
          >
            {isRejectingTask ? 'Отклоняем...' : 'Подтвердить'}
          </button>
        </div>
      </div>
    </div>
  )}
        <div data-layer="Info container" data-state="pressed" className="InfoContainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Дата и время</div>
            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{historyData?.dateTime || ''}</div>
          </div>
        </div>
        <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Статус</div>
            <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{historyData?.status || ''}</div>
          </div>
        </div>
      </div>
      <div data-layer="Сounterparty Policyholder" data-state={policyholderData ? "pressed" : "not_pressed"} className="OunterpartyPolicyholder" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div data-layer="Sections Policyholder" className="SectionsPolicyholder" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: '#FCFCFC', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страхователь</div>
          </div>
          <div data-layer="Open button" className="OpenButton" onClick={handleOpenPolicyholder} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
        {policyholderData ? (
          <>
            <div data-layer="Info 'ФИО'" data-state="pressed" className="Info" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
              <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ФИО</div>
                <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
                  {[policyholderData.surname || policyholderData.lastName, policyholderData.name || policyholderData.firstName, policyholderData.patronymic || policyholderData.middleName].filter(Boolean).join(' ') || ''}
                </div>
              </div>
            </div>
            {policyholderData.iin && (
              <div data-layer="Info 'ИИН'" data-state="pressed" className="Info" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ИИН</div>
                  <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{policyholderData.iin}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div data-layer="Info container" className="InfoContainer" style={{alignSelf: 'stretch', height: 169, paddingTop: 6, paddingBottom: 40, paddingLeft: 564, paddingRight: 564, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Info logo" className="InfoLogo" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_373_647)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.916504 11C0.916504 5.43095 5.43083 0.916626 10.9998 0.916626C16.5688 0.916626 21.0832 5.43095 21.0832 11C21.0832 16.569 16.5688 21.0833 10.9998 21.0833C5.43083 21.0833 0.916504 16.569 0.916504 11ZM10.9998 2.74996C6.44335 2.74996 2.74984 6.44347 2.74984 11C2.74984 15.5564 6.44335 19.25 10.9998 19.25C15.5563 19.25 19.2498 15.5564 19.2498 11C19.2498 6.44347 15.5563 2.74996 10.9998 2.74996ZM10.074 7.33329C10.074 6.82703 10.4844 6.41663 10.9907 6.41663H10.9998C11.5061 6.41663 11.9165 6.82703 11.9165 7.33329C11.9165 7.83955 11.5061 8.24996 10.9998 8.24996H10.9907C10.4844 8.24996 10.074 7.83955 10.074 7.33329ZM10.9998 10.0833C11.5061 10.0833 11.9165 10.4937 11.9165 11V14.6666C11.9165 15.1729 11.5061 15.5833 10.9998 15.5833C10.4936 15.5833 10.0832 15.1729 10.0832 14.6666V11C10.0832 10.4937 10.4936 10.0833 10.9998 10.0833Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_373_647">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>
            </div>
            <div data-layer="Нажмите на поле страхователь, чтобы заполнить данные" style={{width: 309, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нажмите на поле страхователь, чтобы заполнить данные</div>
          </div>
        )}
      </div>
      <div data-layer="Сounterparty Insured" data-state={insuredData ? "pressed" : "not_pressed"} className="OunterpartyInsured" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div data-layer="Sections Insured" className="SectionsInsured" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: '#FCFCFC', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Застрахованный</div>
          </div>
          <div data-layer="Open button" className="OpenButton" onClick={handleOpenInsured} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
        {insuredData ? (
          <>
            <div data-layer="Info 'ФИО'" data-state="pressed" className="Info" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
              <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ФИО</div>
                <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>
                  {[insuredData.surname || insuredData.lastName, insuredData.name || insuredData.firstName, insuredData.patronymic || insuredData.middleName].filter(Boolean).join(' ') || ''}
                </div>
              </div>
            </div>
            {insuredData.iin && (
              <div data-layer="Info 'ИИН'" data-state="pressed" className="Info" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>ИИН</div>
                  <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{insuredData.iin}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div data-layer="Info container" className="InfoContainer" style={{alignSelf: 'stretch', height: 169, paddingTop: 6, paddingBottom: 40, paddingLeft: 564, paddingRight: 564, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Info logo" className="InfoLogo" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_373_1495)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.916504 11C0.916504 5.43101 5.43083 0.916687 10.9998 0.916687C16.5688 0.916687 21.0832 5.43101 21.0832 11C21.0832 16.569 16.5688 21.0834 10.9998 21.0834C5.43083 21.0834 0.916504 16.569 0.916504 11ZM10.9998 2.75002C6.44335 2.75002 2.74984 6.44353 2.74984 11C2.74984 15.5565 6.44335 19.25 10.9998 19.25C15.5563 19.25 19.2498 15.5565 19.2498 11C19.2498 6.44353 15.5563 2.75002 10.9998 2.75002ZM10.074 7.33335C10.074 6.82709 10.4844 6.41669 10.9907 6.41669H10.9998C11.5061 6.41669 11.9165 6.82709 11.9165 7.33335C11.9165 7.83962 11.5061 8.25002 10.9998 8.25002H10.9907C10.4844 8.25002 10.074 7.83962 10.074 7.33335ZM10.9998 10.0834C11.5061 10.0834 11.9165 10.4938 11.9165 11V14.6667C11.9165 15.1729 11.5061 15.5834 10.9998 15.5834C10.4936 15.5834 10.0832 15.1729 10.0832 14.6667V11C10.0832 10.4938 10.4936 10.0834 10.9998 10.0834Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_373_1495">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>
            </div>
            <div data-layer="Нажмите на поле страхователь, чтобы заполнить данные" style={{width: 309, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нажмите на поле застрахованный, чтобы заполнить данные</div>
          </div>
        )}
      </div>
      <div data-layer="Сounterparty Beneficiary" data-state="pressed" className="OunterpartyBeneficiary" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div data-layer="Sections Beneficiary" className="SectionsBeneficiary" style={{width: 1427, height: 85, paddingLeft: 20, background: '#FCFCFC', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Выгодоприобретатель</div>
          </div>
        </div>
        <div data-layer="Info container" data-state="pressed" className="InfoContainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Наименование </div>
            <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{beneficiaryData?.name || ''}</div>
          </div>
        </div>
        <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Тип резидентства</div>
            <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{beneficiaryData?.residencyType || ''}</div>
          </div>
        </div>
      </div>
      <div data-layer="Insurance conditions" data-state={termsData ? "pressed" : "not_pressed"} className="InsuranceConditions" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div data-layer="Sections Insurance conditions" className="SectionsInsuranceConditions" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: '#FCFCFC', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Условия</div>
          </div>
          <div data-layer="Open button" className="OpenButton" onClick={handleOpenTerms} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
        {termsData ? (
          <>
            {getInsuranceAmount(termsData.insuranceProduct) && (
              <div data-layer="Info container" data-state="pressed" className="InfoContainer" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="Label" className="Label" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Страховая сумма</div>
                  <div data-layer="Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{getInsuranceAmount(termsData.insuranceProduct)}</div>
                </div>
              </div>
            )}
            {termsData.insuranceProduct && (
              <div data-layer="Input Field" data-state="pressed" className="InputField" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div data-layer="Text field container" className="TextFieldContainer" style={{flex: '1 1 0', height: 85, paddingTop: 20, paddingBottom: 20, paddingRight: 16, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                  <div data-layer="LabelDefault" className="Labeldefault" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B6D80', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Программа страхования</div>
                  <div data-layer="%Input text" className="InputText" style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#071222', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>{termsData.insuranceProduct}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div data-layer="Info container" className="InfoContainer" style={{alignSelf: 'stretch', height: 169, paddingTop: 6, paddingBottom: 40, paddingLeft: 564, paddingRight: 564, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Info logo" className="InfoLogo" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_373_843)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.916504 11C0.916504 5.43098 5.43083 0.916656 10.9998 0.916656C16.5688 0.916656 21.0832 5.43098 21.0832 11C21.0832 16.569 16.5688 21.0833 10.9998 21.0833C5.43083 21.0833 0.916504 16.569 0.916504 11ZM10.9998 2.74999C6.44335 2.74999 2.74984 6.4435 2.74984 11C2.74984 15.5565 6.44335 19.25 10.9998 19.25C15.5563 19.25 19.2498 15.5565 19.2498 11C19.2498 6.4435 15.5563 2.74999 10.9998 2.74999ZM10.074 7.33332C10.074 6.82706 10.4844 6.41666 10.9907 6.41666H10.9998C11.5061 6.41666 11.9165 6.82706 11.9165 7.33332C11.9165 7.83958 11.5061 8.24999 10.9998 8.24999H10.9907C10.4844 8.24999 10.074 7.83958 10.074 7.33332ZM10.9998 10.0833C11.5061 10.0833 11.9165 10.4937 11.9165 11V14.6667C11.9165 15.1729 11.5061 15.5833 10.9998 15.5833C10.4936 15.5833 10.0832 15.1729 10.0832 14.6667V11C10.0832 10.4937 10.4936 10.0833 10.9998 10.0833Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_373_843">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>
            </div>
            <div data-layer="Нажмите на поле страхователь, чтобы заполнить данные" style={{width: 309, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нажмите на поле условия, чтобы заполнить данные</div>
          </div>
        )}
      </div>
      <div data-layer="Health questions" data-state={questionaryData ? "pressed" : "not_pressed"} className="HealthQuestions" style={{alignSelf: 'stretch', background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div data-layer="Sections Health questions" className="SectionsHealthQuestions" style={{alignSelf: 'stretch', height: 85, paddingLeft: 20, background: '#FCFCFC', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-layer="Text container" className="TextContainer" style={{flex: '1 1 0', paddingTop: 20, paddingBottom: 20, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div data-layer="LabelDiv" className="Labeldiv" style={{flex: '1 1 0', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Анкета</div>
          </div>
          <div data-layer="Open button" className="OpenButton" onClick={handleOpenQuestionary} style={{width: 85, height: 85, position: 'relative', background: '#FBF9F9', overflow: 'hidden', cursor: 'pointer'}}>
            <div data-svg-wrapper data-layer="Chewron right" className="ChewronRight" style={{left: 31, top: 32, position: 'absolute'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
        {questionaryData ? (
          <>
            {/* Здесь можно добавить отображение данных анкеты, если нужно */}
          </>
        ) : (
          <div data-layer="Info container" className="InfoContainer" style={{alignSelf: 'stretch', height: 169, paddingTop: 6, paddingBottom: 40, paddingLeft: 564, paddingRight: 564, background: 'white', overflow: 'hidden', borderBottom: '1px #F8E8E8 solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div data-layer="Info logo" className="InfoLogo" style={{width: 85, height: 85, position: 'relative', background: 'white', overflow: 'hidden'}}>
              <div data-svg-wrapper data-layer="Info" className="Info" style={{left: 31, top: 32, position: 'absolute'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_373_1383)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.916504 11C0.916504 5.43099 5.43083 0.916672 10.9998 0.916672C16.5688 0.916672 21.0832 5.43099 21.0832 11C21.0832 16.569 16.5688 21.0833 10.9998 21.0833C5.43083 21.0833 0.916504 16.569 0.916504 11ZM10.9998 2.75001C6.44335 2.75001 2.74984 6.44352 2.74984 11C2.74984 15.5565 6.44335 19.25 10.9998 19.25C15.5563 19.25 19.2498 15.5565 19.2498 11C19.2498 6.44352 15.5563 2.75001 10.9998 2.75001ZM10.074 7.33334C10.074 6.82708 10.4844 6.41667 10.9907 6.41667H10.9998C11.5061 6.41667 11.9165 6.82708 11.9165 7.33334C11.9165 7.8396 11.5061 8.25001 10.9998 8.25001H10.9907C10.4844 8.25001 10.074 7.8396 10.074 7.33334ZM10.9998 10.0833C11.5061 10.0833 11.9165 10.4937 11.9165 11V14.6667C11.9165 15.1729 11.5061 15.5833 10.9998 15.5833C10.4936 15.5833 10.0832 15.1729 10.0832 14.6667V11C10.0832 10.4937 10.4936 10.0833 10.9998 10.0833Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_373_1383">
                <rect width="22" height="22" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>
            </div>
            <div data-layer="Нажмите на поле страхователь, чтобы заполнить данные" style={{width: 309, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Нажмите на поле анкета, чтобы заполнить данные</div>
          </div>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

export default Application;
