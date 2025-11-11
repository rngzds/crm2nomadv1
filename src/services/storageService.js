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
  INSURED_OTHER_CHILD_CHILD: 'insuredOtherChildChildData'
};

/**
 * Сохранить данные страхователя в localStorage
 * @param {Object} data - Данные страхователя
 */
export const savePolicyholderData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.POLICYHOLDER, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving policyholder data to localStorage:', error);
  }
};

/**
 * Загрузить данные страхователя из localStorage
 * @returns {Object|null} Данные страхователя или null
 */
export const loadPolicyholderData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POLICYHOLDER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading policyholder data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные застрахованного в localStorage
 * @param {Object} data - Данные застрахованного
 */
export const saveInsuredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured data to localStorage:', error);
  }
};

/**
 * Загрузить данные застрахованного из localStorage
 * @returns {Object|null} Данные застрахованного или null
 */
export const loadInsuredData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured data from localStorage:', error);
    return null;
  }
};

/**
 * Очистить данные страхователя из localStorage
 */
export const clearPolicyholderData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.POLICYHOLDER);
  } catch (error) {
    console.error('Error clearing policyholder data from localStorage:', error);
  }
};

/**
 * Очистить данные застрахованного из localStorage
 */
export const clearInsuredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED);
  } catch (error) {
    console.error('Error clearing insured data from localStorage:', error);
  }
};

/**
 * Сохранить данные "иного лица" в localStorage
 * @param {Object} data - Данные иного лица
 */
export const saveInsuredOtherPersonData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED_OTHER_PERSON, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured other person data to localStorage:', error);
  }
};

/**
 * Загрузить данные "иного лица" из localStorage
 * @returns {Object|null} Данные иного лица или null
 */
export const loadInsuredOtherPersonData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED_OTHER_PERSON);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured other person data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные "родителя/опекуна" в localStorage
 * @param {Object} data - Данные родителя/опекуна
 */
export const saveInsuredParentData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED_PARENT, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured parent data to localStorage:', error);
  }
};

/**
 * Загрузить данные "родителя/опекуна" из localStorage
 * @returns {Object|null} Данные родителя/опекуна или null
 */
export const loadInsuredParentData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED_PARENT);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured parent data from localStorage:', error);
    return null;
  }
};

/**
 * Очистить данные "иного лица" из localStorage
 */
export const clearInsuredOtherPersonData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED_OTHER_PERSON);
  } catch (error) {
    console.error('Error clearing insured other person data from localStorage:', error);
  }
};

/**
 * Очистить данные "родителя/опекуна" из localStorage
 */
export const clearInsuredParentData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED_PARENT);
  } catch (error) {
    console.error('Error clearing insured parent data from localStorage:', error);
  }
};

/**
 * Сохранить данные "страхователь является застрахованным" в localStorage
 * @param {Object} data - Данные страхователя-застрахованного
 */
export const saveInsuredPolicyholderData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED_POLICYHOLDER, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured policyholder data to localStorage:', error);
  }
};

/**
 * Загрузить данные "страхователь является застрахованным" из localStorage
 * @returns {Object|null} Данные страхователя-застрахованного или null
 */
export const loadInsuredPolicyholderData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED_POLICYHOLDER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured policyholder data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные "свой ребенок" в localStorage
 * @param {Object} data - Данные своего ребенка
 */
export const saveInsuredOwnChildData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED_OWN_CHILD, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured own child data to localStorage:', error);
  }
};

/**
 * Загрузить данные "свой ребенок" из localStorage
 * @returns {Object|null} Данные своего ребенка или null
 */
export const loadInsuredOwnChildData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED_OWN_CHILD);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured own child data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные родителя для "иной ребенок" в localStorage
 * @param {Object} data - Данные родителя для иного ребенка
 */
export const saveInsuredOtherChildParentData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED_OTHER_CHILD_PARENT, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured other child parent data to localStorage:', error);
  }
};

/**
 * Загрузить данные родителя для "иной ребенок" из localStorage
 * @returns {Object|null} Данные родителя для иного ребенка или null
 */
export const loadInsuredOtherChildParentData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED_OTHER_CHILD_PARENT);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured other child parent data from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить данные ребенка для "иной ребенок" в localStorage
 * @param {Object} data - Данные ребенка для иного ребенка
 */
export const saveInsuredOtherChildChildData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INSURED_OTHER_CHILD_CHILD, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving insured other child child data to localStorage:', error);
  }
};

/**
 * Загрузить данные ребенка для "иной ребенок" из localStorage
 * @returns {Object|null} Данные ребенка для иного ребенка или null
 */
export const loadInsuredOtherChildChildData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INSURED_OTHER_CHILD_CHILD);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading insured other child child data from localStorage:', error);
    return null;
  }
};

/**
 * Очистить данные "страхователь является застрахованным" из localStorage
 */
export const clearInsuredPolicyholderData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED_POLICYHOLDER);
  } catch (error) {
    console.error('Error clearing insured policyholder data from localStorage:', error);
  }
};

/**
 * Очистить данные "свой ребенок" из localStorage
 */
export const clearInsuredOwnChildData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED_OWN_CHILD);
  } catch (error) {
    console.error('Error clearing insured own child data from localStorage:', error);
  }
};

/**
 * Очистить данные родителя для "иной ребенок" из localStorage
 */
export const clearInsuredOtherChildParentData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED_OTHER_CHILD_PARENT);
  } catch (error) {
    console.error('Error clearing insured other child parent data from localStorage:', error);
  }
};

/**
 * Очистить данные ребенка для "иной ребенок" из localStorage
 */
export const clearInsuredOtherChildChildData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INSURED_OTHER_CHILD_CHILD);
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
    // Удаляем все ключи из STORAGE_KEYS
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('All data cleared from localStorage');
  } catch (error) {
    console.error('Error clearing all data from localStorage:', error);
  }
};

