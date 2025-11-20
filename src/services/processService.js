import { getAccessToken } from './storageService';

const PROCESS_BASE_URL = 'https://crm-process.onrender.com/api/Statement';
const ARM_BASE_URL = 'https://crm-arm.onrender.com/api/Statement';
const DICTIONARY_BASE_URL = 'https://crm-arm.onrender.com/api/Dictionary';
const STATEMENT_BASE_URL = 'https://crm-statement.onrender.com/api';

const getTokenOrThrow = (token) => {
  const resolved = token || getAccessToken();
  if (!resolved) {
    throw new Error('Токен авторизации не найден');
  }
  return resolved;
};

const handleResponse = async (response, defaultErrorMessage) => {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }

  const errorText = await response.text();
  throw new Error(`${defaultErrorMessage}: ${response.status} ${errorText}`);
};

export const startStatementProcess = async ({ productCode, operationType = 'New' }, token) => {
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${PROCESS_BASE_URL}/start`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      productCode,
      operationType,
    }),
  });

  return handleResponse(response, 'Ошибка запуска процесса заявки');
};

export const getStatementStatus = async (processInstanceId, token) => {
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${ARM_BASE_URL}/GetStatus`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      processInstanceId,
    }),
  });

  return handleResponse(response, 'Ошибка получения статуса заявки');
};

export const getTaskClaimAvailability = async (taskId, token) => {
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${PROCESS_BASE_URL}/can-claim-task`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      taskId,
    }),
  });

  return handleResponse(response, 'Ошибка проверки возможности взять задачу');
};

export const claimTask = async (taskId, token) => {
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${PROCESS_BASE_URL}/claim-task`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      taskId,
    }),
  });

  return handleResponse(response, 'Ошибка при взятии задачи');
};

export const sendTaskDecision = async ({ taskId, decision, reasonId = null }, token) => {
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${PROCESS_BASE_URL}/send-task`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      taskId,
      decision,
      reasonId,
    }),
  });

  return handleResponse(response, 'Ошибка отправки задачи');
};

export const getRejectReasons = async (taskId, token) => {
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${DICTIONARY_BASE_URL}/GetReasons`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      taskId,
    }),
  });

  return handleResponse(response, 'Ошибка загрузки причин отказа');
};

export const getProcessInstanceDetails = async (processInstanceId, token) => {
  if (!processInstanceId) {
    throw new Error('processInstanceId не указан');
  }
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${STATEMENT_BASE_URL}/ProcessInstance/${processInstanceId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${authToken}`,
    },
  });

  return handleResponse(response, 'Ошибка получения данных процесса');
};

export const getProcessHistory = async (processInstanceId, token) => {
  if (!processInstanceId) {
    throw new Error('processInstanceId не указан');
  }
  const authToken = getTokenOrThrow(token);

  const response = await fetch(`${PROCESS_BASE_URL}/process-history/${processInstanceId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${authToken}`,
    },
  });

  return handleResponse(response, 'Ошибка получения истории процесса');
};

