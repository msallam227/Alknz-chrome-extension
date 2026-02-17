document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('options-form');
  const backendUrlInput = document.getElementById('backend-url');
  const apiKeyInput = document.getElementById('api-key');
  const capturedByInput = document.getElementById('captured-by');
  const btnTest = document.getElementById('btn-test');
  const statusDiv = document.getElementById('status');

  const STORAGE_KEYS = {
    BACKEND_URL: 'ALKNZ_BACKEND_URL',
    API_KEY: 'ALKNZ_API_KEY',
    CAPTURED_BY: 'ALKNZ_CAPTURED_BY'
  };

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status show ${type}`;
  }

  function hideStatus() {
    statusDiv.className = 'status';
  }

  chrome.storage.sync.get([
    STORAGE_KEYS.BACKEND_URL,
    STORAGE_KEYS.API_KEY,
    STORAGE_KEYS.CAPTURED_BY
  ], (result) => {
    if (result[STORAGE_KEYS.BACKEND_URL]) {
      backendUrlInput.value = result[STORAGE_KEYS.BACKEND_URL];
    }
    if (result[STORAGE_KEYS.API_KEY]) {
      apiKeyInput.value = result[STORAGE_KEYS.API_KEY];
    }
    if (result[STORAGE_KEYS.CAPTURED_BY]) {
      capturedByInput.value = result[STORAGE_KEYS.CAPTURED_BY];
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const settings = {};
    settings[STORAGE_KEYS.BACKEND_URL] = backendUrlInput.value.trim().replace(/\/$/, '');
    settings[STORAGE_KEYS.API_KEY] = apiKeyInput.value.trim();
    settings[STORAGE_KEYS.CAPTURED_BY] = capturedByInput.value.trim();

    chrome.storage.sync.set(settings, () => {
      showStatus('Settings saved successfully!', 'success');
      setTimeout(hideStatus, 3000);
    });
  });

  btnTest.addEventListener('click', async () => {
    const backendUrl = backendUrlInput.value.trim().replace(/\/$/, '');
    const apiKey = apiKeyInput.value.trim();

    if (!backendUrl) {
      showStatus('Please enter a Backend URL first.', 'error');
      return;
    }

    btnTest.disabled = true;
    btnTest.textContent = 'Testing...';
    showStatus('Connecting to server...', 'info');

    try {
      const headers = {};
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(`${backendUrl}/api/metrics`, {
        method: 'GET',
        headers: headers
      });

      if (response.ok) {
        const data = await response.json();
        const investors = data.data?.total_investors ?? 0;
        const captures = data.data?.total_captures ?? 0;
        showStatus(`Connection successful! Investors: ${investors}, Captures: ${captures}`, 'success');
      } else if (response.status === 401 || response.status === 403) {
        showStatus(`Authentication failed: Invalid API key`, 'error');
      } else {
        showStatus(`Connection failed: HTTP ${response.status}`, 'error');
      }
    } catch (error) {
      showStatus(`Connection error: ${error.message}`, 'error');
    } finally {
      btnTest.disabled = false;
      btnTest.textContent = 'Test Connection';
    }
  });
});
