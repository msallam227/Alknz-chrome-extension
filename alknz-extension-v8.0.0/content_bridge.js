async function captureSelectedText() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) {
      showToast('No active tab found', 'error');
      return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, { type: 'CAPTURE_SELECTED_TEXT' });
    
    if (response?.selected_text) {
      state.selected_text = response.selected_text;
      document.getElementById('selected-text').value = state.selected_text;
      showToast('Selected text captured!', 'success');
    } else {
      showToast('No text selected on page', 'info');
    }
  } catch (error) {
    console.error('Error capturing selected text:', error);
    showToast('Could not capture text. Try refreshing the page.', 'error');
  }
}

async function captureFromPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) {
      showToast('No active tab found', 'error');
      return;
    }

    showToast('Capturing page...', 'info');

    const snapshot = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_SNAPSHOT' });
    
    if (snapshot?.error) {
      showToast('Unable to capture page data', 'error');
      return;
    }

    state.source_url = snapshot.url || '';
    state.source_title = snapshot.title || '';
    document.getElementById('source-url').value = state.source_url;
    document.getElementById('source-title').value = state.source_title;

    if (snapshot.selected_text) {
      state.selected_text = snapshot.selected_text;
      document.getElementById('selected-text').value = state.selected_text;
    }

    const settings = await getSettings();
    
    if (!settings.backendUrl) {
      showToast('Page captured. Configure Backend URL for AI extraction.', 'info');
      return;
    }

    const headingsArray = [];
    if (snapshot.headings?.h1) headingsArray.push(...snapshot.headings.h1);
    if (snapshot.headings?.h2) headingsArray.push(...snapshot.headings.h2);

    const requestBody = {
      source_url: snapshot.url || state.source_url,
      source_title: snapshot.title || state.source_title,
      meta_description: snapshot.meta_description || '',
      headings: headingsArray,
      visible_text: snapshot.visible_text || '',
      selected_text: snapshot.selected_text || '',
      emails_found: snapshot.emails || [],
      phones_found: snapshot.phones || [],
      page_type: state.pageType
    };

    showToast('Extracting fields...', 'info');

    // Try new v1 endpoint, fall back to legacy
    const extractEndpoint = `${settings.backendUrl}/api/v1/extract`;
    const fallbackExtract = `${settings.backendUrl}/api/extract`;
    let response = await fetch(extractEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
      body: JSON.stringify(requestBody)
    }).catch(() => null);
    if (!response || response.status === 404) {
      response = await fetch(fallbackExtract, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
        body: JSON.stringify(requestBody)
      });
    }

    const result = await response.json();

    if (!response.ok) {
      showToast(`Extraction failed: ${result.error || 'Unknown error'}`, 'error');
      return;
    }

    state.suggestions = result.data?.extracted || {};
    state.ignoredSuggestions = new Set();
    
    const autoFilled = autoFillHighMedium();
    renderSuggestions();
    
    if (autoFilled > 0) {
      showToast(`Page captured (${autoFilled} fields auto-filled)`, 'success');
    } else {
      showToast('Page captured', 'success');
    }
  } catch (error) {
    console.error('Error capturing from page:', error);
    showToast('Unable to capture page data', 'error');
  }
}

