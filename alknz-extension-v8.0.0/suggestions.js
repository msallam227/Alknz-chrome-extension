async function smartMapSelectedText() {
  const selectedText = document.getElementById('selected-text').value.trim();
  
  if (!selectedText) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        const response = await chrome.tabs.sendMessage(tab.id, { type: 'CAPTURE_SELECTED_TEXT' });
        if (response?.selected_text) {
          state.selected_text = response.selected_text;
          document.getElementById('selected-text').value = response.selected_text;
          mapTextToField(response.selected_text);
          return;
        }
      }
    } catch (error) {
      console.error('Error capturing for smart map:', error);
    }
    showToast('No text selected to map', 'info');
    return;
  }
  
  mapTextToField(selectedText);
}

/**
 * Pattern matching to determine field type and fill accordingly
 */
function mapTextToField(text) {
  if (!text) return;
  
  const trimmed = text.trim();
  let mapped = false;
  let fieldName = '';

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailPattern.test(trimmed)) {
    const emailField = document.getElementById('email');
    if (!emailField.value) {
      emailField.value = trimmed;
      fieldName = 'Email';
      mapped = true;
    }
  }

  const phonePattern = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{7,}$/;
  if (!mapped && phonePattern.test(trimmed.replace(/\s/g, ''))) {
    const phoneField = document.getElementById('phone');
    if (!phoneField.value) {
      phoneField.value = trimmed;
      fieldName = 'Phone';
      mapped = true;
    }
  }

  const titlePatterns = /^(partner|principal|managing director|md|director|founder|co-founder|ceo|cfo|coo|cto|investor|venture partner|general partner|gp|limited partner|lp|associate|analyst|vice president|vp|senior|head of)/i;
  if (!mapped && titlePatterns.test(trimmed)) {
    const titleField = document.getElementById('job-title');
    if (!titleField.value) {
      titleField.value = trimmed;
      fieldName = 'Job Title';
      mapped = true;
    }
  }

  const locationPattern = /^([A-Za-z\s]+),\s*([A-Za-z\s]+)$/;
  const locationMatch = trimmed.match(locationPattern);
  if (!mapped && locationMatch) {
    const cityField = document.getElementById('location-city');
    const countryField = document.getElementById('location-country');
    if (!cityField.value && !countryField.value) {
      cityField.value = locationMatch[1].trim();
      countryField.value = locationMatch[2].trim();
      fieldName = 'Location';
      mapped = true;
    }
  }

  const websitePattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  if (!mapped && websitePattern.test(trimmed)) {
    const websiteField = document.getElementById('website');
    if (!websiteField.value) {
      websiteField.value = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      fieldName = 'Website';
      mapped = true;
    }
  }

  const firmPatterns = /(ventures|capital|partners|investments|fund|group|holdings|advisors|associates|llc|inc|ltd|corp)/i;
  if (!mapped && firmPatterns.test(trimmed) && trimmed.length < 100) {
    const firmField = document.getElementById('firm-name');
    if (!firmField.value) {
      firmField.value = trimmed;
      fieldName = 'Firm Name';
      mapped = true;
    }
  }

  const namePattern = /^[A-Z][a-z]+(\s+[A-Z][a-z]+){1,3}$/;
  if (!mapped && namePattern.test(trimmed) && trimmed.length < 50) {
    const nameField = document.getElementById('investor-name');
    if (!nameField.value) {
      nameField.value = trimmed;
      fieldName = 'Investor Name';
      mapped = true;
    }
  }

  if (mapped) {
    showToast(`Mapped to ${fieldName}`, 'success');
  } else {
    const notesField = document.getElementById('notes');
    const currentNotes = notesField.value;
    notesField.value = currentNotes ? `${currentNotes}\n${trimmed}` : trimmed;
    showToast('Added to Notes (no pattern match)', 'info');
  }
}

/**
 * AI Auto-Fill (Stub)
 * Prepares payload for AI processing - does not call backend yet
 */
async function aiAutoFill() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) {
      showToast('No active tab found', 'error');
      return;
    }

    showToast('Gathering page data...', 'info');

    const snapshot = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_SNAPSHOT' });
    
    if (snapshot?.error) {
      showToast('Could not capture page snapshot', 'error');
      return;
    }

    const settings = await getSettings();
    
    if (!settings.backendUrl) {
      showToast('Please configure Backend URL in settings', 'error');
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
      selected_text: snapshot.selected_text || ''
    };

    showToast('Extracting fields...', 'info');

    const response = await fetch(`${settings.backendUrl}/api/extract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

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
      showToast(`AI Auto-Fill complete (${autoFilled} fields)`, 'success');
    } else {
      showToast('AI Auto-Fill complete', 'success');
    }
    
  } catch (error) {
    console.error('AI Auto-Fill error:', error);
    showToast('AI Auto-Fill failed', 'error');
  }
}

const FIELD_MAP = {
  investor_name: { id: 'investor-name', label: 'Investor Name' },
  job_title: { id: 'job-title', label: 'Job Title' },
  firm_name: { id: 'firm-name', label: 'Firm Name' },
  location_city: { id: 'location-city', label: 'City' },
  location_country: { id: 'location-country', label: 'Country' },
  website: { id: 'website', label: 'Website' },
  email: { id: 'email', label: 'Email' },
  phone: { id: 'phone', label: 'Phone' },
  whatsapp: { id: 'whatsapp', label: 'WhatsApp' },
  description: { id: 'notes', label: 'Description/Notes' },
  investor_type: { id: 'investor-type', label: 'Investor Type' }
};

function renderSuggestions() {
  const listEl = document.getElementById('suggestions-list');
  const emptyEl = document.getElementById('suggestions-empty');
  const actionsEl = document.getElementById('suggestions-actions');
  
  listEl.innerHTML = '';
  
  const validSuggestions = Object.entries(state.suggestions).filter(([key, field]) => {
    return field.value && !state.ignoredSuggestions.has(key);
  });
  
  if (validSuggestions.length === 0) {
    listEl.style.display = 'none';
    actionsEl.style.display = 'none';
    emptyEl.style.display = 'block';
    emptyEl.textContent = state.ignoredSuggestions.size > 0 
      ? 'All suggestions reviewed.' 
      : 'No suggestions yet. Click "AI Auto-Fill" to extract fields.';
    return;
  }
  
  emptyEl.style.display = 'none';
  listEl.style.display = 'flex';
  actionsEl.style.display = 'flex';
  
  validSuggestions.forEach(([key, field]) => {
    const fieldInfo = FIELD_MAP[key];
    if (!fieldInfo) return;
    
    const evidence = field.evidence ? 
      (field.evidence.length > 120 ? field.evidence.slice(0, 117) + '...' : field.evidence) : 
      'No evidence';
    
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.dataset.field = key;
    item.innerHTML = `
      <div class="suggestion-header">
        <span class="suggestion-label">${escapeHtml(fieldInfo.label)}</span>
        <span class="confidence-chip ${field.confidence.toLowerCase()}">${field.confidence}</span>
      </div>
      <div class="suggestion-value">${escapeHtml(field.value)}</div>
      <div class="suggestion-evidence" title="${escapeHtml(field.evidence || '')}">${escapeHtml(evidence)}</div>
      <div class="suggestion-buttons">
        <button class="suggestion-btn accept" data-field="${key}">Accept</button>
        <button class="suggestion-btn ignore" data-field="${key}">Ignore</button>
      </div>
    `;
    listEl.appendChild(item);
  });
  
  listEl.querySelectorAll('.suggestion-btn.accept').forEach(btn => {
    btn.addEventListener('click', () => acceptSuggestion(btn.dataset.field));
  });
  
  listEl.querySelectorAll('.suggestion-btn.ignore').forEach(btn => {
    btn.addEventListener('click', () => ignoreSuggestion(btn.dataset.field));
  });
}

function acceptSuggestion(fieldKey, skipConfirm = false) {
  const field = state.suggestions[fieldKey];
  const fieldInfo = FIELD_MAP[fieldKey];
  
  if (!field || !fieldInfo) return;
  
  const inputEl = document.getElementById(fieldInfo.id);
  if (!inputEl) return;
  
  const currentValue = inputEl.value.trim();
  
  if (currentValue && !skipConfirm) {
    const confirmed = confirm(`Replace "${currentValue}" with "${field.value}"?`);
    if (!confirmed) return;
  }
  
  inputEl.value = field.value;
  state.ignoredSuggestions.add(fieldKey);
  renderSuggestions();
  showToast(`${fieldInfo.label} accepted`, 'success');
}

function ignoreSuggestion(fieldKey) {
  state.ignoredSuggestions.add(fieldKey);
  renderSuggestions();
}

function autoFillHighMedium() {
  let filled = 0;
  
  Object.entries(state.suggestions).forEach(([key, field]) => {
    if (!field.value) return;
    if (field.confidence !== 'HIGH' && field.confidence !== 'MEDIUM') return;
    
    const fieldInfo = FIELD_MAP[key];
    if (!fieldInfo) return;
    
    const inputEl = document.getElementById(fieldInfo.id);
    if (!inputEl) return;
    
    if (!inputEl.value.trim()) {
      inputEl.value = field.value;
      state.ignoredSuggestions.add(key);
      filled++;
    }
  });
  
  return filled;
}

function acceptAllHighMedium() {
  const toAccept = Object.entries(state.suggestions).filter(([key, field]) => {
    return field.value && 
           !state.ignoredSuggestions.has(key) && 
           (field.confidence === 'HIGH' || field.confidence === 'MEDIUM');
  });
  
  if (toAccept.length === 0) {
    showToast('No high/medium suggestions to accept', 'info');
    return;
  }
  
  let accepted = 0;
  toAccept.forEach(([key, field]) => {
    const fieldInfo = FIELD_MAP[key];
    if (!fieldInfo) return;
    
    const inputEl = document.getElementById(fieldInfo.id);
    if (!inputEl) return;
    
    if (!inputEl.value.trim()) {
      inputEl.value = field.value;
      state.ignoredSuggestions.add(key);
      accepted++;
    }
  });
  
  renderSuggestions();
  showToast(`Accepted ${accepted} suggestions`, 'success');
}

function toggleSuggestions() {
  const content = document.getElementById('suggestions-content');
  const icon = document.getElementById('suggestions-collapse-icon');
  
  content.classList.toggle('collapsed');
  icon.classList.toggle('collapsed');
}

