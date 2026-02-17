async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([
      SETTINGS_KEYS.BACKEND_URL,
      SETTINGS_KEYS.API_KEY,
      SETTINGS_KEYS.CAPTURED_BY,
      SETTINGS_KEYS.AUTH_TOKEN,
      SETTINGS_KEYS.USER_ID,
      SETTINGS_KEYS.USER_NAME,
      SETTINGS_KEYS.USER_EMAIL
    ], (result) => {
      const authToken  = result[SETTINGS_KEYS.AUTH_TOKEN]  || '';
      const userName   = result[SETTINGS_KEYS.USER_NAME]   || '';
      const userEmail  = result[SETTINGS_KEYS.USER_EMAIL]  || '';
      const capturedBy = result[SETTINGS_KEYS.CAPTURED_BY] || '';
      resolve({
        backendUrl:  result[SETTINGS_KEYS.BACKEND_URL] || '',
        apiKey:      result[SETTINGS_KEYS.API_KEY]     || '',
        capturedBy:  authToken ? (userName || userEmail) : capturedBy,
        authToken,
        userId:      result[SETTINGS_KEYS.USER_ID] || '',
        userName,
        userEmail
      });
    });
  });
}

async function getUserInfo() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([
      SETTINGS_KEYS.AUTH_TOKEN,
      SETTINGS_KEYS.USER_ID,
      SETTINGS_KEYS.USER_NAME,
      SETTINGS_KEYS.USER_EMAIL
    ], (result) => {
      resolve({
        authToken: result[SETTINGS_KEYS.AUTH_TOKEN] || '',
        userId:    result[SETTINGS_KEYS.USER_ID]    || '',
        userName:  result[SETTINGS_KEYS.USER_NAME]  || '',
        userEmail: result[SETTINGS_KEYS.USER_EMAIL] || ''
      });
    });
  });
}

async function saveUserInfo({ authToken, userId, userName, userEmail }) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({
      [SETTINGS_KEYS.AUTH_TOKEN]: authToken,
      [SETTINGS_KEYS.USER_ID]:    userId,
      [SETTINGS_KEYS.USER_NAME]:  userName,
      [SETTINGS_KEYS.USER_EMAIL]: userEmail
    }, resolve);
  });
}

async function clearAuth() {
  return new Promise((resolve) => {
    chrome.storage.sync.remove([
      SETTINGS_KEYS.AUTH_TOKEN,
      SETTINGS_KEYS.USER_ID,
      SETTINGS_KEYS.USER_NAME,
      SETTINGS_KEYS.USER_EMAIL
    ], resolve);
  });
}

async function getAddressBook() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] || []);
    });
  });
}

async function saveAddressBook(drafts) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: drafts }, resolve);
  });
}

async function saveSearchHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.set({ 'ALKNZ_SEARCH_HISTORY': deepSearchState.history }, resolve);
  });
}

async function loadSearchHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['ALKNZ_SEARCH_HISTORY'], (result) => {
      deepSearchState.history = result['ALKNZ_SEARCH_HISTORY'] || [];
      resolve();
    });
  });
}

