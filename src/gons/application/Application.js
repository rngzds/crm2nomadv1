import React, { useState } from 'react';
import Policyholder from './Policyholder';
import Insured from './Insured';
import Beneficiary from './Beneficiary';
import Questionary from './Questionary';
import Terms from './Terms';

const Application = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'policyholder', label: 'Страхователь', component: 'Policyholder' },
    { id: 'insured', label: 'Застрахованный', component: 'Insured' },
    { id: 'beneficiary', label: 'Выгодоприобретатель', component: 'Beneficiary' },
    { id: 'terms', label: 'Условия', component: 'Terms' },
    { id: 'questionary', label: 'Анкета', component: 'Questionary' }
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    console.log(`Opening section: ${sectionId}`);
  };

  const handleBackClick = () => {
    setActiveSection(null);
    console.log('Back button clicked');
  };

  const handleSubmitClick = () => {
    console.log('Submit button clicked');
    // Здесь можно добавить логику отправки на согласование
  };

  // Стили компонента
  const styles = {
    application: {
      width: 393,
      height: '100vh',
      minHeight: '100vh',
      background: 'white',
      overflow: 'hidden',
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      position: 'relative'
    },
    sections: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 1,
      display: 'flex'
    },
    header: {
      width: 393,
      height: 85,
      background: 'white',
      overflow: 'hidden',
      borderBottom: '1px #F8E8E8 solid',
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000
    },
    backButton: {
      width: 85,
      height: 85,
      position: 'relative',
      background: '#FBF9F9',
      overflow: 'hidden',
      border: 'none',
      cursor: 'pointer'
    },
    chevronLeft: {
      left: 32,
      top: 32,
      position: 'absolute'
    },
    title: {
      flex: '1 1 0',
      height: 85,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      display: 'flex'
    },
    screenTitle: {
      flex: '1 1 0',
      textAlign: 'center',
      color: 'black',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: '500',
      wordWrap: 'break-word'
    },
    progressContainer: {
      width: 85,
      height: 85,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      display: 'inline-flex'
    },
    list: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 1,
      display: 'flex'
    },
    inputContainerWithButton: {
      width: 393,
      height: 85,
      paddingLeft: 20,
      background: 'white',
      overflow: 'hidden',
      borderBottom: '1px #F8E8E8 solid',
      justifyContent: 'flex-start',
      alignItems: 'center',
      display: 'inline-flex',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    inputContainerWithButtonActive: {
      width: 393,
      height: 85,
      paddingLeft: 20,
      background: '#F0F0F0',
      overflow: 'hidden',
      borderBottom: '1px #F8E8E8 solid',
      justifyContent: 'flex-start',
      alignItems: 'center',
      display: 'inline-flex',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    textContainer: {
      flex: '1 1 0',
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 16,
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
      display: 'flex'
    },
    label: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      color: 'black',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: '500',
      wordWrap: 'break-word'
    },
    openButton: {
      width: 85,
      height: 85,
      position: 'relative',
      background: '#FBF9F9',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    chevronRight: {
      left: 31,
      top: 32,
      position: 'absolute'
    },
    scrollableContent: {
      width: 393,
      flex: 1,
      overflowY: 'auto',
      paddingTop: 85,
      paddingBottom: 100,
      display: 'flex',
      flexDirection: 'column'
    },
    contentList: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 1,
      display: 'flex'
    },
    buttonContainer: {
      width: 393,
      height: 100,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      background: 'white',
      borderTop: '1px #F8E8E8 solid',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      display: 'flex',
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000
    },
    submitButton: {
      width: 361,
      height: 68,
      background: '#E0E0E0',
      overflow: 'hidden',
      borderRadius: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'inline-flex',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    buttonText: {
      flex: '1 1 0',
      textAlign: 'center',
      color: 'black',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: '500',
      wordWrap: 'break-word'
    }
  };

  // Если выбрана секция "Страхователь", показываем компонент Policyholder
  if (activeSection === 'policyholder') {
    return <Policyholder onBack={handleBackClick} />;
  }

  // Если выбрана секция "Застрахованный", показываем компонент Insured
  if (activeSection === 'insured') {
    return <Insured onBack={handleBackClick} />;
  }

  // Если выбрана секция "Выгодоприобретатель", показываем компонент Beneficiary
  if (activeSection === 'beneficiary') {
    return <Beneficiary onBack={handleBackClick} />;
  }

  // Если выбрана секция "Анкета", показываем компонент Questionary
  if (activeSection === 'questionary') {
    return <Questionary onBack={handleBackClick} />;
  }

  // Если выбрана секция "Условия", показываем компонент Terms
  if (activeSection === 'terms') {
    return <Terms onBack={handleBackClick} />;
  }

  return (
    <div style={styles.application}>
      {/* Fixed Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBackClick}>
          <div style={styles.chevronLeft}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L7 10.5L15 3" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
        </button>
        <div style={styles.title}>
          <div style={styles.screenTitle}>ГОНС</div>
        </div>
        <div style={styles.progressContainer} />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollableContent}>
        <div style={styles.contentList}>
          {sections.map((section) => (
            <div 
              key={section.id}
              style={activeSection === section.id ? styles.inputContainerWithButtonActive : styles.inputContainerWithButton}
              onClick={() => handleSectionClick(section.id)}
            >
              <div style={styles.textContainer}>
                <div style={styles.label}>{section.label}</div>
              </div>
              <div style={styles.openButton}>
                <div style={styles.chevronRight}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4L15 11.5L7 19" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Footer/Button */}
      <div style={styles.buttonContainer}>
        <button style={styles.submitButton} onClick={handleSubmitClick}>
          <div style={styles.buttonText}>Отправить на согласование</div>
        </button>
      </div>
    </div>
  );
};

export default Application;