/**
 * Сервис для работы с localStorage
 */

const STORAGE_KEYS = {
  POLICYHOLDER: 'policyholderData',
  INSURED: 'insuredData',
  INSURED_OTHER_PERSON: 'insuredOtherPersonData',
  INSURED_PARENT: 'insuredParentData',
  INSURED_POLICYHOLDER: 'insuredPolicyholderData',
  INSURED_OWN_CHILD: 'insuredOwnChildData',
  INSURED_OTHER_CHILD_PARENT: 'insuredOtherChildParentData',
  INSURED_OTHER_CHILD_CHILD: 'insuredOtherChildChildData',
  CURRENT_APPLICATION_ID: 'currentApplicationId',
  APPLICATION_HISTORY: 'applicationHistory',
  APPLICATION_BENEFICIARY: 'applicationBeneficiary',
  INSURED_CURRENT_VIEW_HISTORY: 'insuredCurrentViewHistory',
  GLOBAL_APPLICATION_DATA: 'globalApplicationData',
  APPLICATION_METADATA: 'applicationMetadata',
  APPLICATION_DATA_BY_NUMBER: 'applicationDataByNumber', // Данные заявки по номеру
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
};

/**
 * Генерировать UUID для заявки
 * @returns {string} UUID заявки
 */
export const generateApplicationId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

/**
 * Получить ключ localStorage с префиксом applicationId
 * @param {string} applicationId - ID заявки
 * @param {string} key - Базовый ключ
 * @returns {string} Ключ с префиксом
 */
export const getApplicationKey = (applicationId, key) => {
  if (!applicationId) {
    return key;
  }
  return `application_${applicationId}_${key}`;
};

/**
 * Установить текущий ID заявки
 * @param {string} id - ID заявки
 */
export const setCurrentApplicationId = (id) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_APPLICATION_ID, id);
  } catch (error) {
    console.error('Error setting current application ID:', error);
  }
};

/**
 * Получить текущий ID заявки
 * @returns {string|null} ID заявки или null
 */
export const getCurrentApplicationId = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_APPLICATION_ID);
  } catch (error) {
    console.error('Error getting current application ID:', error);
    return null;
  }
};

/**
 * Очистить данные конкретной заявки
 * @param {string} applicationId - ID заявки
 */
export const clearApplicationData = (applicationId) => {
  if (!applicationId) return;
  
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.CURRENT_APPLICATION_ID) {
        const prefixedKey = getApplicationKey(applicationId, key);
        localStorage.removeItem(prefixedKey);
      }
    });
  } catch (error) {
    console.error('Error clearing application data:', error);
  }
};

/**
 * Сохранить данные страхователя в localStorage
 * @param {Object} data - Данные страхователя
 * @param {string} applicationId - ID заявки (опционально)
 */
export const savePolicyholderData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.POLICYHOLDER);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving policyholder data to localStorage:', error);
  }
};

/**
 * Загрузить данные страхователя из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные страхователя или null
 */
export const loadPolicyholderData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.POLICYHOLDER);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading policyholder data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные застрахованного в localStorage
 * @param {Object} data - Данные застрахованного
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured data to localStorage:', error);
  }
};

/**
 * Загрузить данные застрахованного из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные застрахованного или null
 */
export const loadInsuredData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured data from localStorage:', error);
    return null;
  }
};

/**
 * Очистить данные страхователя из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearPolicyholderData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.POLICYHOLDER);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing policyholder data from localStorage:', error);
  }
};

/**
 * Очистить данные застрахованного из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured data from localStorage:', error);
  }
};

/**
 * Сохранить данные "иного лица" в localStorage
 * @param {Object} data - Данные иного лица
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredOtherPersonData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_PERSON);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured other person data to localStorage:', error);
  }
};

/**
 * Загрузить данные "иного лица" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные иного лица или null
 */
export const loadInsuredOtherPersonData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_PERSON);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured other person data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные "родителя/опекуна" в localStorage
 * @param {Object} data - Данные родителя/опекуна
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredParentData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_PARENT);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured parent data to localStorage:', error);
  }
};

/**
 * Загрузить данные "родителя/опекуна" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные родителя/опекуна или null
 */
export const loadInsuredParentData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_PARENT);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured parent data from localStorage:', error);
    return null;
  }
};

/**
 * Очистить данные "иного лица" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredOtherPersonData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_PERSON);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured other person data from localStorage:', error);
  }
};

/**
 * Очистить данные "родителя/опекуна" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredParentData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_PARENT);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured parent data from localStorage:', error);
  }
};

/**
 * Сохранить данные "страхователь является застрахованным" в localStorage
 * @param {Object} data - Данные страхователя-застрахованного
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredPolicyholderData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_POLICYHOLDER);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured policyholder data to localStorage:', error);
  }
};

/**
 * Загрузить данные "страхователь является застрахованным" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные страхователя-застрахованного или null
 */
export const loadInsuredPolicyholderData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_POLICYHOLDER);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured policyholder data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные "свой ребенок" в localStorage
 * @param {Object} data - Данные своего ребенка
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredOwnChildData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OWN_CHILD);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured own child data to localStorage:', error);
  }
};

/**
 * Загрузить данные "свой ребенок" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные своего ребенка или null
 */
export const loadInsuredOwnChildData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OWN_CHILD);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured own child data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные родителя для "иной ребенок" в localStorage
 * @param {Object} data - Данные родителя для иного ребенка
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredOtherChildParentData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_CHILD_PARENT);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured other child parent data to localStorage:', error);
  }
};

/**
 * Загрузить данные родителя для "иной ребенок" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные родителя для иного ребенка или null
 */
export const loadInsuredOtherChildParentData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_CHILD_PARENT);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured other child parent data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные ребенка для "иной ребенок" в localStorage
 * @param {Object} data - Данные ребенка для иного ребенка
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredOtherChildChildData = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_CHILD_CHILD);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured other child child data to localStorage:', error);
  }
};

/**
 * Загрузить данные ребенка для "иной ребенок" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные ребенка для иного ребенка или null
 */
export const loadInsuredOtherChildChildData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_CHILD_CHILD);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured other child child data from localStorage:', error);
    return null;
  }
};

/**
 * Очистить данные "страхователь является застрахованным" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredPolicyholderData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_POLICYHOLDER);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured policyholder data from localStorage:', error);
  }
};

/**
 * Очистить данные "свой ребенок" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredOwnChildData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OWN_CHILD);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured own child data from localStorage:', error);
  }
};

/**
 * Очистить данные родителя для "иной ребенок" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredOtherChildParentData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_CHILD_PARENT);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured other child parent data from localStorage:', error);
  }
};

/**
 * Очистить данные ребенка для "иной ребенок" из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 */
export const clearInsuredOtherChildChildData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_OTHER_CHILD_CHILD);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing insured other child child data from localStorage:', error);
  }
};

/**
 * Очистить все данные из localStorage (хард ресет)
 * Удаляет все ключи, связанные с приложением
 */
export const clearAllData = () => {
  try {
    // Удаляем все ключи из STORAGE_KEYS (включая токены)
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    // Также удаляем все ключи с префиксом application_
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('application_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('All data cleared from localStorage');
  } catch (error) {
    console.error('Error clearing all data from localStorage:', error);
  }
};

/**
 * Сохранить данные истории заявки
 * @param {Object} data - Данные истории (дата/время, статус)
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveApplicationHistory = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.APPLICATION_HISTORY);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving application history to localStorage:', error);
  }
};

/**
 * Загрузить данные истории заявки
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные истории или null
 */
export const loadApplicationHistory = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.APPLICATION_HISTORY);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading application history from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные выгодоприобретателя
 * @param {Object} data - Данные выгодоприобретателя
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveApplicationBeneficiary = (data, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.APPLICATION_BENEFICIARY);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving application beneficiary to localStorage:', error);
  }
};

/**
 * Загрузить данные выгодоприобретателя
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Данные выгодоприобретателя или null
 */
export const loadApplicationBeneficiary = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.APPLICATION_BENEFICIARY);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading application beneficiary from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить историю currentView застрахованного в localStorage (массив JSON)
 * @param {string} currentView - Текущий view для сохранения
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveInsuredCurrentViewHistory = (currentView, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_CURRENT_VIEW_HISTORY);
    // Загружаем существующий массив или создаем новый
    const existingData = localStorage.getItem(key);
    let viewHistory = existingData ? JSON.parse(existingData) : [];
    
    // Проверяем, что это массив
    if (!Array.isArray(viewHistory)) {
      viewHistory = [];
    }
    
    // Добавляем новый currentView в массив (с timestamp для отслеживания)
    const viewEntry = {
      view: currentView,
      timestamp: new Date().toISOString()
    };
    
    viewHistory.push(viewEntry);
    
    // Сохраняем обновленный массив
    localStorage.setItem(key, JSON.stringify(viewHistory));
    console.log('💾 [INSURED CURRENT VIEW HISTORY] Сохранено:', viewHistory);
  } catch (error) {
    console.error('Error saving insured current view history to localStorage:', error);
  }
};

/**
 * Загрузить историю currentView застрахованного из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Array} Массив истории currentView или пустой массив
 */
export const loadInsuredCurrentViewHistory = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.INSURED_CURRENT_VIEW_HISTORY);
    const data = localStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data);
      // Проверяем, что это массив
      if (Array.isArray(parsed)) {
        console.log('📖 [INSURED CURRENT VIEW HISTORY] Загружено:', parsed);
        return parsed;
      }
    }
    return [];
  } catch (error) {
    console.error('Error loading insured current view history from localStorage:', error);
    return [];
  }
};

/**
 * Загрузить глобальные данные заявки из localStorage
 * @param {string} applicationId - ID заявки (опционально)
 * @returns {Object|null} Глобальные данные заявки или null
 */
export const loadGlobalApplicationData = (applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.GLOBAL_APPLICATION_DATA);
    const data = localStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data);
      console.log('📖 [GLOBAL APPLICATION DATA] Загружено:', JSON.parse(JSON.stringify(parsed)));
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Error loading global application data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить глобальные данные заявки в localStorage
 * @param {Object} globalData - Глобальные данные заявки
 * @param {string} applicationId - ID заявки (опционально)
 */
export const saveGlobalApplicationData = (globalData, applicationId = null) => {
  try {
    const key = getApplicationKey(applicationId || getCurrentApplicationId(), STORAGE_KEYS.GLOBAL_APPLICATION_DATA);
    // Загружаем существующие данные или создаем новую структуру
    const existingData = loadGlobalApplicationData(applicationId || getCurrentApplicationId()) || {};
    
    // Объединяем существующие данные с новыми
    const updatedData = {
      ...existingData,
      ...globalData
    };
    
    localStorage.setItem(key, JSON.stringify(updatedData));
    console.log('💾 [GLOBAL APPLICATION DATA] Сохранено:', JSON.parse(JSON.stringify(updatedData)));
  } catch (error) {
    console.error('Error saving global application data to localStorage:', error);
  }
};

/**
 * Обновить секцию в глобальных данных заявки
 * @param {string} section - Название секции (Policyholder, Insured, Terms, Questionary)
 * @param {Object} sectionData - Данные секции
 * @param {string} applicationId - ID заявки (опционально)
 */
export const updateGlobalApplicationSection = (section, sectionData, applicationId = null) => {
  try {
    const globalData = loadGlobalApplicationData(applicationId || getCurrentApplicationId()) || {};
    globalData[section] = sectionData;
    saveGlobalApplicationData(globalData, applicationId || getCurrentApplicationId());
  } catch (error) {
    console.error(`Error updating global application section ${section}:`, error);
  }
};

/**
 * Сохранить метаданные заявки
 * @param {string} applicationId - ID заявки
 * @param {Object} metadata - Метаданные заявки (product, createdAt, policyholderIin, status)
 */
export const saveApplicationMetadata = (applicationId, metadata) => {
  if (!applicationId) return;
  
  try {
    const key = getApplicationKey(applicationId, STORAGE_KEYS.APPLICATION_METADATA);
    const metadataToSave = {
      applicationId,
      product: metadata.product || null,
      createdAt: metadata.createdAt || new Date().toISOString(),
      policyholderIin: metadata.policyholderIin || '',
      status: metadata.status || 'Черновик',
      ...metadata
    };
    localStorage.setItem(key, JSON.stringify(metadataToSave));
    console.log('💾 [APPLICATION METADATA] Сохранено:', metadataToSave);
  } catch (error) {
    console.error('Error saving application metadata:', error);
  }
};

/**
 * Загрузить метаданные заявки
 * @param {string} applicationId - ID заявки
 * @returns {Object|null} Метаданные заявки или null
 */
export const loadApplicationMetadata = (applicationId) => {
  if (!applicationId) return null;
  
  try {
    const key = getApplicationKey(applicationId, STORAGE_KEYS.APPLICATION_METADATA);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading application metadata:', error);
    return null;
  }
};

/**
 * Получить список всех заявок
 * @returns {Array} Массив объектов с метаданными заявок
 */
export const getAllApplications = () => {
  try {
    const applications = [];
    const applicationIds = new Set();
    
    // Проходим по всем ключам localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('application_')) {
        // Извлекаем applicationId из ключа
        // Формат: application_{applicationId}_{storageKey}
        // Находим последнее подчеркивание, которое отделяет applicationId от storageKey
        const lastUnderscoreIndex = key.lastIndexOf('_');
        if (lastUnderscoreIndex > 12) { // 'application_'.length = 12
          const applicationId = key.substring(12, lastUnderscoreIndex);
          if (applicationId) {
            applicationIds.add(applicationId);
          }
        }
      }
    }
    
    // Загружаем метаданные для каждой заявки
    applicationIds.forEach(applicationId => {
      const metadata = loadApplicationMetadata(applicationId);
      if (metadata) {
        applications.push(metadata);
      } else {
        // Если метаданных нет, создаем базовые
        applications.push({
          applicationId,
          product: null,
          createdAt: new Date().toISOString(),
          policyholderIin: '',
          status: 'Черновик'
        });
      }
    });
    
    // Сортируем по дате создания (новые сверху)
    applications.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting all applications:', error);
    return [];
  }
};

/**
 * Удалить заявку и все её данные
 * @param {string} applicationId - ID заявки
 */
export const deleteApplication = (applicationId) => {
  if (!applicationId) return;
  
  try {
    const keysToRemove = [];
    
    // Находим все ключи, связанные с этой заявкой
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`application_${applicationId}_`)) {
        keysToRemove.push(key);
      }
    }
    
    // Удаляем все найденные ключи
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log(`🗑️ [APPLICATION] Удалена заявка ${applicationId}`);
  } catch (error) {
    console.error('Error deleting application:', error);
  }
};

/**
 * Сохранить access token в localStorage
 * @param {string} token - Access token
 */
export const saveAccessToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    console.log('💾 [AUTH] Access token сохранен');
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

/**
 * Получить access token из localStorage
 * @returns {string|null} Access token или null
 */
export const getAccessToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

/**
 * Сохранить refresh token в localStorage
 * @param {string} token - Refresh token
 */
export const saveRefreshToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    console.log('💾 [AUTH] Refresh token сохранен');
  } catch (error) {
    console.error('Error saving refresh token:', error);
  }
};

/**
 * Получить refresh token из localStorage
 * @returns {string|null} Refresh token или null
 */
export const getRefreshToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

/**
 * Очистить токены из localStorage
 */
export const clearTokens = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    console.log('🗑️ [AUTH] Токены очищены');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

/**
 * Сохранить все данные заявки по номеру заявки
 * @param {string} applicationNumber - Номер заявки
 * @param {string} applicationId - ID заявки (processId)
 * @param {Object} allData - Все данные заявки
 */
export const saveApplicationDataByNumber = (applicationNumber, applicationId, allData) => {
  if (!applicationNumber || !applicationId) return;
  
  try {
    const key = `${STORAGE_KEYS.APPLICATION_DATA_BY_NUMBER}_${applicationNumber}`;
    const dataToSave = {
      applicationNumber,
      applicationId,
      savedAt: new Date().toISOString(),
      ...allData
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
    console.log('💾 [APPLICATION DATA BY NUMBER] Сохранено для номера:', applicationNumber);
  } catch (error) {
    console.error('Error saving application data by number:', error);
  }
};

/**
 * Загрузить все данные заявки по номеру заявки
 * @param {string} applicationNumber - Номер заявки
 * @returns {Object|null} Все данные заявки или null
 */
export const loadApplicationDataByNumber = (applicationNumber) => {
  if (!applicationNumber) return null;
  
  try {
    const key = `${STORAGE_KEYS.APPLICATION_DATA_BY_NUMBER}_${applicationNumber}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading application data by number:', error);
    return null;
  }
};

/**
 * Получить applicationId по номеру заявки
 * @param {string} applicationNumber - Номер заявки
 * @returns {string|null} ID заявки или null
 */
export const getApplicationIdByNumber = (applicationNumber) => {
  const data = loadApplicationDataByNumber(applicationNumber);
  return data?.applicationId || null;
};

