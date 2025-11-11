/**
 * Сервис для получения данных о человеке через API
 */

const API_URL = 'https://getperson.onrender.com/api/get-person';

/**
 * Получить данные о человеке по телефону и ИИН
 * @param {string} phone - Номер телефона
 * @param {string} iin - ИИН
 * @returns {Promise<Object>} Данные о человеке
 */
export const getPerson = async (phone, iin) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        iin: iin
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching person data:', error);
    throw error;
  }
};

/**
 * Преобразовать дату из ISO формата в DD.MM.YYYY
 * @param {string} isoDate - Дата в формате ISO (например, "1997-12-02T00:00:00")
 * @returns {string} Дата в формате DD.MM.YYYY
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return '';
  try {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Преобразовать пол из числового формата в текстовый
 * @param {string} genderCode - Код пола ("1" для мужского, "2" для женского)
 * @returns {string} Текст пола ("Мужской" или "Женский")
 */
export const formatGender = (genderCode) => {
  if (!genderCode) return '';
  return genderCode === '1' ? 'Мужской' : genderCode === '2' ? 'Женский' : '';
};

/**
 * Маппинг данных из API ответа в формат формы
 * @param {Object} apiData - Данные из API
 * @returns {Object} Данные в формате формы
 */
export const mapApiDataToForm = (apiData) => {
  if (!apiData) return {};

  return {
    iin: apiData.iin || '',
    phone: apiData.phone || '',
    lastName: apiData.surname || '',
    firstName: apiData.name || '',
    middleName: apiData.patronymic || '',
    birthDate: formatDate(apiData.birthdate),
    gender: formatGender(apiData.gender),
    country: apiData.country_nameru || '',
    region: apiData.region_nameru || '',
    city: apiData.district_nameru || '',
    street: apiData.street || '',
    houseNumber: apiData.building || '',
    apartmentNumber: apiData.flat || '',
    documentNumber: apiData.document_number || '',
    issueDate: formatDate(apiData.begin_date),
    expiryDate: formatDate(apiData.enddate),
    issuedBy: apiData.issueorganization_nameru || ''
  };
};

