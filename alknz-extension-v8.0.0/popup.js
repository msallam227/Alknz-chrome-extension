const STORAGE_KEY = 'ALKNZ_ADDRESS_BOOK';
const SETTINGS_KEYS = {
  BACKEND_URL: 'ALKNZ_BACKEND_URL',
  API_KEY: 'ALKNZ_API_KEY',
  CAPTURED_BY: 'ALKNZ_CAPTURED_BY'
};

const state = {
  source_url: '',
  source_title: '',
  selected_text: '',
  editing_local_id: null,
  suggestions: {},
  ignoredSuggestions: new Set()
};

function generateLocalId() {
  return 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([
      SETTINGS_KEYS.BACKEND_URL,
      SETTINGS_KEYS.API_KEY,
      SETTINGS_KEYS.CAPTURED_BY
    ], (result) => {
      resolve({
        backendUrl: result[SETTINGS_KEYS.BACKEND_URL] || '',
        apiKey: result[SETTINGS_KEYS.API_KEY] || '',
        capturedBy: result[SETTINGS_KEYS.CAPTURED_BY] || ''
      });
    });
  });
}

async function initPopup() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab) {
      state.source_url = tab.url || '';
      state.source_title = tab.title || '';
      
      document.getElementById('source-url').value = state.source_url;
      document.getElementById('source-title').value = state.source_title;
    }
  } catch (error) {
    console.error('Error getting active tab:', error);
    showToast('Could not get page information', 'error');
  }

  await loadAddressBook();
}

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
      phones_found: snapshot.phones || []
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
      showToast(`Page captured (${autoFilled} fields auto-filled)`, 'success');
    } else {
      showToast('Page captured', 'success');
    }
  } catch (error) {
    console.error('Error capturing from page:', error);
    showToast('Unable to capture page data', 'error');
  }
}

function autofillIfEmpty(fieldId, value) {
  if (!value) return;
  const field = document.getElementById(fieldId);
  if (field && !field.value.trim()) {
    field.value = value;
  }
}

function getFormData() {
  return {
    capture_type: 'NEW_INVESTOR',
    source_url: state.source_url,
    source_title: state.source_title,
    selected_text: document.getElementById('selected-text').value,
    investor_name: document.getElementById('investor-name').value,
    investor_type: document.getElementById('investor-type').value,
    job_title: document.getElementById('job-title').value,
    firm_name: document.getElementById('firm-name').value,
    location_city: document.getElementById('location-city').value,
    location_country: document.getElementById('location-country').value,
    website: document.getElementById('website').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    whatsapp: document.getElementById('whatsapp').value,
    assistant_name: document.getElementById('assistant-name').value,
    assistant_email: document.getElementById('assistant-email').value,
    relationship_strength: document.getElementById('relationship-strength').value,
    decision_role: document.getElementById('decision-role').value,
    preferred_intro_path: document.getElementById('preferred-intro-path').value,
    notes: document.getElementById('notes').value,
    confidence: document.getElementById('confidence').value
  };
}

function setFormData(data) {
  if (data.investor_name) document.getElementById('investor-name').value = data.investor_name;
  if (data.investor_type) document.getElementById('investor-type').value = data.investor_type;
  if (data.job_title) document.getElementById('job-title').value = data.job_title;
  if (data.firm_name) document.getElementById('firm-name').value = data.firm_name;
  if (data.location_city) document.getElementById('location-city').value = data.location_city;
  if (data.location_country) document.getElementById('location-country').value = data.location_country;
  if (data.website) document.getElementById('website').value = data.website;
  if (data.email) document.getElementById('email').value = data.email;
  if (data.phone) document.getElementById('phone').value = data.phone;
  if (data.whatsapp) document.getElementById('whatsapp').value = data.whatsapp;
  if (data.assistant_name) document.getElementById('assistant-name').value = data.assistant_name;
  if (data.assistant_email) document.getElementById('assistant-email').value = data.assistant_email;
  if (data.relationship_strength) document.getElementById('relationship-strength').value = data.relationship_strength;
  if (data.decision_role) document.getElementById('decision-role').value = data.decision_role;
  if (data.preferred_intro_path) document.getElementById('preferred-intro-path').value = data.preferred_intro_path;
  if (data.notes) document.getElementById('notes').value = data.notes;
  if (data.confidence) document.getElementById('confidence').value = data.confidence;

  if (data.source_url) {
    state.source_url = data.source_url;
    document.getElementById('source-url').value = data.source_url;
  }
  if (data.source_title) {
    state.source_title = data.source_title;
    document.getElementById('source-title').value = data.source_title;
  }
  if (data.selected_text) {
    state.selected_text = data.selected_text;
    document.getElementById('selected-text').value = data.selected_text;
  }
}

function clearForm() {
  document.getElementById('investor-name').value = '';
  document.getElementById('investor-type').value = '';
  document.getElementById('job-title').value = '';
  document.getElementById('firm-name').value = '';
  document.getElementById('location-city').value = '';
  document.getElementById('location-country').value = '';
  document.getElementById('website').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('whatsapp').value = '';
  document.getElementById('assistant-name').value = '';
  document.getElementById('assistant-email').value = '';
  document.getElementById('relationship-strength').value = '';
  document.getElementById('decision-role').value = '';
  document.getElementById('preferred-intro-path').value = '';
  document.getElementById('notes').value = '';
  document.getElementById('confidence').value = 'MEDIUM';
  document.getElementById('selected-text').value = '';
  state.selected_text = '';
  state.editing_local_id = null;
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

function buildPayload(formData) {
  const payload = {
    investor_name: formData.investor_name,
    investor_type: formData.investor_type,
    job_title: formData.job_title,
    firm_name: formData.firm_name,
    location_city: formData.location_city,
    location_country: formData.location_country,
    website: formData.website,
    email: formData.email,
    phone: formData.phone,
    whatsapp: formData.whatsapp,
    assistant_name: formData.assistant_name,
    assistant_email: formData.assistant_email,
    relationship_strength: formData.relationship_strength,
    decision_role: formData.decision_role,
    preferred_intro_path: formData.preferred_intro_path,
    notes: formData.notes
  };

  if (formData.capture_type === 'RELATIONSHIP') {
    payload.source_person_name = formData.assistant_name;
    payload.source_person_role = formData.assistant_email;
    payload.relationship_type = formData.relationship_strength;
    payload.strength = formData.relationship_strength === 'Direct' ? 'STRONG' : 
                       formData.relationship_strength === 'Warm' ? 'MEDIUM' : 'WEAK';
    payload.intro_confidence = formData.confidence;
    payload.context_notes = formData.notes;
    payload.evidence_url = formData.source_url;
  }

  return payload;
}

async function saveDraft() {
  const formData = getFormData();
  
  if (!formData.investor_name.trim()) {
    showToast('Please enter an investor name', 'error');
    return;
  }

  const drafts = await getAddressBook();
  const now = new Date().toISOString();
  const payload = buildPayload(formData);

  if (state.editing_local_id) {
    const index = drafts.findIndex(d => d.local_id === state.editing_local_id);
    if (index !== -1) {
      drafts[index] = {
        ...drafts[index],
        updated_at: now,
        capture_type: formData.capture_type,
        source_url: formData.source_url,
        source_title: formData.source_title,
        selected_text: formData.selected_text,
        confidence: formData.confidence,
        payload
      };
    }
  } else {
    const newDraft = {
      local_id: generateLocalId(),
      capture_type: formData.capture_type,
      created_at: now,
      updated_at: now,
      status: 'LOCAL_DRAFT',
      source_url: formData.source_url,
      source_title: formData.source_title,
      selected_text: formData.selected_text,
      confidence: formData.confidence,
      payload
    };
    drafts.unshift(newDraft);
  }

  await saveAddressBook(drafts);
  await loadAddressBook();
  
  clearForm();
  showToast('Saved to ALKNZ Address Book', 'success');
}

async function uploadCapture() {
  const settings = await getSettings();
  
  if (!settings.backendUrl) {
    showToast('Please configure Backend URL in settings', 'error');
    return;
  }
  
  if (!settings.capturedBy) {
    showToast('Please configure your email in settings', 'error');
    return;
  }

  const formData = getFormData();
  
  if (!formData.investor_name.trim() && formData.capture_type === 'NEW_INVESTOR') {
    showToast('Please enter an investor name', 'error');
    return;
  }

  const payload = buildPayload(formData);

  const requestBody = {
    capture_type: formData.capture_type,
    source_url: formData.source_url || 'manual-entry',
    source_title: formData.source_title || 'Manual Entry',
    selected_text: formData.selected_text,
    captured_by: settings.capturedBy,
    confidence: formData.confidence,
    payload
  };

  try {
    const response = await fetch(`${settings.backendUrl}/api/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      if (state.editing_local_id) {
        const drafts = await getAddressBook();
        const index = drafts.findIndex(d => d.local_id === state.editing_local_id);
        if (index !== -1) {
          drafts[index].status = 'UPLOADED';
          drafts[index].uploaded_at = new Date().toISOString();
          await saveAddressBook(drafts);
          await loadAddressBook();
        }
      }
      
      showToast('Uploaded to ALKNZ Portal', 'success');
      state.editing_local_id = null;
    } else {
      showToast(`Upload failed: ${result.error || 'Unknown error'}`, 'error');
    }
  } catch (error) {
    console.error('Upload error:', error);
    showToast(`Upload failed: ${error.message}`, 'error');
  }
}

async function exportToExcel() {
  const drafts = await getAddressBook();
  
  if (drafts.length === 0) {
    showToast('No drafts to export', 'info');
    return;
  }

  const titleRow = ['ALKNZ Ventures — Address Book Export'];
  
  const headers = [
    'Investor Name', 'Investor Type', 'Job Title', 'Firm', 'City', 'Country',
    'Website', 'Email', 'Phone', 'WhatsApp', 'Relationship Strength',
    'Decision Role', 'Preferred Intro Path', 'Notes', 'Confidence',
    'Source URL', 'Created At', 'Status'
  ];

  const dataRows = drafts.map(draft => [
    draft.payload?.investor_name || '',
    draft.payload?.investor_type || '',
    draft.payload?.job_title || '',
    draft.payload?.firm_name || '',
    draft.payload?.location_city || '',
    draft.payload?.location_country || '',
    draft.payload?.website || '',
    draft.payload?.email || '',
    draft.payload?.phone || '',
    draft.payload?.whatsapp || '',
    draft.payload?.relationship_strength || '',
    draft.payload?.decision_role || '',
    draft.payload?.preferred_intro_path || '',
    draft.payload?.notes || '',
    draft.confidence || '',
    draft.source_url || '',
    draft.created_at ? new Date(draft.created_at).toLocaleString() : '',
    draft.status || ''
  ]);

  const wsData = [titleRow, [], headers, ...dataRows];

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 20 }, { wch: 15 }, { wch: 18 }, { wch: 20 }, { wch: 12 }, { wch: 12 },
    { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 18 },
    { wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 10 },
    { wch: 35 }, { wch: 18 }, { wch: 10 }
  ];

  ws['!autofilter'] = { ref: `A3:R${3 + dataRows.length}` };

  ws['!freeze'] = { xSplit: 0, ySplit: 3 };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'ALKNZ Address Book');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  const url = URL.createObjectURL(blob);
  const filename = `ALKNZ_Address_Book_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  chrome.downloads.download({
    url: url,
    filename: filename,
    saveAs: true
  }, () => {
    URL.revokeObjectURL(url);
    showToast('Excel file downloaded', 'success');
  });
}

async function loadAddressBook() {
  const drafts = await getAddressBook();
  const tbody = document.getElementById('address-book-body');
  const table = document.getElementById('address-book-table');
  const emptyMsg = document.getElementById('address-book-empty');

  tbody.innerHTML = '';

  if (drafts.length === 0) {
    table.style.display = 'none';
    emptyMsg.style.display = 'block';
    return;
  }

  table.style.display = 'table';
  emptyMsg.style.display = 'none';

  drafts.forEach((draft) => {
    const row = document.createElement('tr');
    const createdDate = new Date(draft.created_at).toLocaleDateString();
    const statusClass = draft.status === 'UPLOADED' ? 'uploaded' : 'local';
    const statusLabel = draft.status === 'UPLOADED' ? 'Uploaded' : 'Draft';

    row.innerHTML = `
      <td>${escapeHtml(draft.payload?.investor_name || '-')}</td>
      <td>${escapeHtml(draft.payload?.firm_name || '-')}</td>
      <td>${escapeHtml(draft.payload?.location_country || '-')}</td>
      <td>${escapeHtml(draft.capture_type || '-')}</td>
      <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
      <td>${createdDate}</td>
      <td>
        <button class="action-btn edit" data-id="${draft.local_id}" title="Edit">Edit</button>
        <button class="action-btn delete" data-id="${draft.local_id}" title="Delete">Del</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll('.action-btn.edit').forEach(btn => {
    btn.addEventListener('click', () => editDraft(btn.dataset.id));
  });

  tbody.querySelectorAll('.action-btn.delete').forEach(btn => {
    btn.addEventListener('click', () => deleteDraft(btn.dataset.id));
  });
}

async function editDraft(localId) {
  const drafts = await getAddressBook();
  const draft = drafts.find(d => d.local_id === localId);
  
  if (!draft) {
    showToast('Draft not found', 'error');
    return;
  }

  state.editing_local_id = localId;

  setFormData({
    capture_type: draft.capture_type,
    source_url: draft.source_url,
    source_title: draft.source_title,
    selected_text: draft.selected_text,
    confidence: draft.confidence,
    ...draft.payload
  });

  showToast('Draft loaded for editing', 'info');
  
  document.querySelector('.main').scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteDraft(localId) {
  const drafts = await getAddressBook();
  const filtered = drafts.filter(d => d.local_id !== localId);
  
  await saveAddressBook(filtered);
  await loadAddressBook();
  
  if (state.editing_local_id === localId) {
    state.editing_local_id = null;
  }
  
  showToast('Draft deleted', 'success');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function toggleAddressBook() {
  const content = document.getElementById('address-book-content');
  const icon = document.getElementById('collapse-icon');
  
  content.classList.toggle('collapsed');
  icon.classList.toggle('collapsed');
}

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

document.addEventListener('DOMContentLoaded', () => {
  initPopup();

  document.getElementById('btn-capture-text').addEventListener('click', captureSelectedText);
  document.getElementById('btn-capture-page').addEventListener('click', captureFromPage);
  document.getElementById('btn-save-draft').addEventListener('click', saveDraft);
  document.getElementById('btn-upload').addEventListener('click', uploadCapture);
  document.getElementById('btn-export').addEventListener('click', exportToExcel);
  document.getElementById('btn-smart-map').addEventListener('click', smartMapSelectedText);
  document.getElementById('btn-ai-autofill').addEventListener('click', aiAutoFill);
  document.getElementById('btn-accept-all').addEventListener('click', acceptAllHighMedium);
  document.getElementById('btn-clear-form').addEventListener('click', () => {
    clearForm();
    showToast('Form cleared', 'info');
  });
  document.getElementById('btn-clear-evidence').addEventListener('click', () => {
    document.getElementById('selected-text').value = '';
    state.selected_text = '';
    showToast('Evidence cleared', 'info');
  });
  document.getElementById('address-book-toggle').addEventListener('click', toggleAddressBook);
  document.getElementById('suggestions-toggle').addEventListener('click', toggleSuggestions);
});
