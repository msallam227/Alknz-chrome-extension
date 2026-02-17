document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('options-form');
  const backendUrlInput = document.getElementById('backend-url');
  const apiKeyInput     = document.getElementById('api-key');
  const btnTest         = document.getElementById('btn-test');
  const statusDiv       = document.getElementById('status');

  const loginEmailInput    = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');
  const btnLogin           = document.getElementById('btn-login');
  const btnLogout          = document.getElementById('btn-logout');
  const loginStatusDiv     = document.getElementById('login-status');
  const loginFormSection   = document.getElementById('login-form-section');
  const loggedInSection    = document.getElementById('logged-in-section');
  const displayNameLabel   = document.getElementById('display-name-label');

  const STORAGE_KEYS = {
    BACKEND_URL: 'ALKNZ_BACKEND_URL',
    API_KEY:     'ALKNZ_API_KEY',
    AUTH_TOKEN:  'ALKNZ_AUTH_TOKEN',
    USER_ID:     'ALKNZ_USER_ID',
    USER_NAME:   'ALKNZ_USER_NAME',
    USER_EMAIL:  'ALKNZ_USER_EMAIL'
  };

  function showStatus(div, message, type) {
    div.textContent = message;
    div.className = `status show ${type}`;
  }

  function hideStatus(div) {
    div.className = 'status';
  }

  function setLoggedInState(userName, userEmail) {
    displayNameLabel.textContent = userName || userEmail;
    loggedInSection.style.display  = 'block';
    loginFormSection.style.display = 'none';
  }

  function setLoggedOutState() {
    loggedInSection.style.display  = 'none';
    loginFormSection.style.display = 'block';
    loginEmailInput.value    = '';
    loginPasswordInput.value = '';
  }

  // Load saved settings and auth state on page open
  chrome.storage.sync.get([
    STORAGE_KEYS.BACKEND_URL,
    STORAGE_KEYS.API_KEY,
    STORAGE_KEYS.AUTH_TOKEN,
    STORAGE_KEYS.USER_NAME,
    STORAGE_KEYS.USER_EMAIL
  ], (result) => {
    if (result[STORAGE_KEYS.BACKEND_URL]) backendUrlInput.value = result[STORAGE_KEYS.BACKEND_URL];
    if (result[STORAGE_KEYS.API_KEY])     apiKeyInput.value     = result[STORAGE_KEYS.API_KEY];

    if (result[STORAGE_KEYS.AUTH_TOKEN]) {
      setLoggedInState(result[STORAGE_KEYS.USER_NAME], result[STORAGE_KEYS.USER_EMAIL]);
    } else {
      setLoggedOutState();
    }
  });

  // Login
  btnLogin.addEventListener('click', async () => {
    const backendUrl = backendUrlInput.value.trim().replace(/\/$/, '');
    const email      = loginEmailInput.value.trim();
    const password   = loginPasswordInput.value;

    if (!backendUrl) {
      showStatus(loginStatusDiv, 'Please enter a Backend URL first.', 'error');
      return;
    }
    if (!email || !password) {
      showStatus(loginStatusDiv, 'Please enter your email and password.', 'error');
      return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = 'Logging in...';
    showStatus(loginStatusDiv, 'Authenticating...', 'info');

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.token) {
        chrome.storage.sync.set({
          [STORAGE_KEYS.AUTH_TOKEN]: data.token,
          [STORAGE_KEYS.USER_ID]:    data.user_id   || '',
          [STORAGE_KEYS.USER_NAME]:  data.display_name || data.name || '',
          [STORAGE_KEYS.USER_EMAIL]: email
        }, () => {
          hideStatus(loginStatusDiv);
          setLoggedInState(data.display_name || data.name || '', email);
        });
      } else {
        showStatus(loginStatusDiv, data.error || data.message || 'Login failed. Check credentials.', 'error');
      }
    } catch (err) {
      showStatus(loginStatusDiv, `Login error: ${err.message}`, 'error');
    } finally {
      btnLogin.disabled = false;
      btnLogin.textContent = 'Log In';
    }
  });

  // Logout
  btnLogout.addEventListener('click', () => {
    chrome.storage.sync.remove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_ID,
      STORAGE_KEYS.USER_NAME,
      STORAGE_KEYS.USER_EMAIL
    ], () => {
      setLoggedOutState();
    });
  });

  // Save connection settings
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const settings = {
      [STORAGE_KEYS.BACKEND_URL]: backendUrlInput.value.trim().replace(/\/$/, ''),
      [STORAGE_KEYS.API_KEY]:     apiKeyInput.value.trim()
    };
    chrome.storage.sync.set(settings, () => {
      showStatus(statusDiv, 'Settings saved!', 'success');
      setTimeout(() => hideStatus(statusDiv), 3000);
    });
  });

  // Test connection
  btnTest.addEventListener('click', async () => {
    const backendUrl = backendUrlInput.value.trim().replace(/\/$/, '');
    const apiKey     = apiKeyInput.value.trim();

    if (!backendUrl) {
      showStatus(statusDiv, 'Please enter a Backend URL first.', 'error');
      return;
    }

    btnTest.disabled = true;
    btnTest.textContent = 'Testing...';
    showStatus(statusDiv, 'Connecting to server...', 'info');

    try {
      const authToken = await new Promise(resolve =>
        chrome.storage.sync.get([STORAGE_KEYS.AUTH_TOKEN], r => resolve(r[STORAGE_KEYS.AUTH_TOKEN] || ''))
      );

      const headers = {};
      const token = authToken || apiKey;
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${backendUrl}/api/metrics`, { method: 'GET', headers });

      if (response.ok) {
        const data = await response.json();
        const investors = data.data?.total_investors ?? 0;
        const captures  = data.data?.total_captures  ?? 0;
        showStatus(statusDiv, `Connected! Investors: ${investors}, Captures: ${captures}`, 'success');
      } else if (response.status === 401 || response.status === 403) {
        showStatus(statusDiv, 'Authentication failed: Invalid credentials', 'error');
      } else {
        showStatus(statusDiv, `Connection failed: HTTP ${response.status}`, 'error');
      }
    } catch (error) {
      showStatus(statusDiv, `Connection error: ${error.message}`, 'error');
    } finally {
      btnTest.disabled = false;
      btnTest.textContent = 'Test Connection';
    }
  });
});
