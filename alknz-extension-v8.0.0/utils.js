function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmptyValue(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string' && v.trim() === '') return true;
  if (Array.isArray(v) && v.length === 0) return true;
  return false;
}

function setIfEmpty(fieldId, value) {
  if (isEmptyValue(value)) return;
  const el = document.getElementById(fieldId);
  if (!el) return;
  const current = el.value;
  if (isEmptyValue(current)) {
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function unionList(existing, incoming) {
  const result = [...existing];
  const lowerSet = new Set(existing.map(e => e.toLowerCase().trim()));
  for (const item of incoming) {
    if (item && !lowerSet.has(item.toLowerCase().trim())) {
      result.push(item);
      lowerSet.add(item.toLowerCase().trim());
    }
  }
  return result;
}

function mergeEmailsIntoForm(incomingEmails) {
  const currentEmails = [];
  for (let i = 1; i <= 5; i++) {
    const val = document.getElementById(`email-${i}`).value.trim();
    if (val) currentEmails.push(val);
  }
  const merged = unionList(currentEmails, incomingEmails).slice(0, 5);
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`email-${i}`).value = merged[i-1] || '';
  }
}

function mergePhonesIntoForm(incomingPhones) {
  const currentPhones = [];
  for (let i = 1; i <= 5; i++) {
    const val = document.getElementById(`phone-${i}`).value.trim();
    if (val) currentPhones.push(val);
  }
  const merged = unionList(currentPhones, incomingPhones).slice(0, 5);
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`phone-${i}`).value = merged[i-1] || '';
  }
}

function mergeDeepAiIntoCaptureForm(extracted) {
  if (!extracted) return;
  
  // Map Deep AI fields to Capture form (fill blanks only)
  // investor_name <- extracted.name OR extracted.investor_name
  setIfEmpty('investor-name', extracted.name || extracted.investor_name);
  
  // firm_name <- extracted.firm_name OR extracted.company OR extracted.organization
  setIfEmpty('firm-name', extracted.firm_name || extracted.company || extracted.organization);
  
  // job_title <- extracted.job_title OR extracted.title OR extracted.role
  setIfEmpty('job-title', extracted.job_title || extracted.title || extracted.role);
  
  // website <- extracted.website OR extracted.domain
  setIfEmpty('website', extracted.website || extracted.domain);
  
  // linkedin_url <- extracted.linkedin OR extracted.linkedin_url
  setIfEmpty('linkedin-url', extracted.linkedin || extracted.linkedin_url);
  
  // Emails: merge into capture emails list (up to 5 slots)
  const incomingEmails = [];
  if (extracted.email) incomingEmails.push(extracted.email);
  if (Array.isArray(extracted.emails)) incomingEmails.push(...extracted.emails);
  mergeEmailsIntoForm(incomingEmails);
  
  // Phones: merge into capture phones list (up to 5 slots)
  const incomingPhones = [];
  if (extracted.phone) incomingPhones.push(extracted.phone);
  if (Array.isArray(extracted.phones)) incomingPhones.push(...extracted.phones);
  mergePhonesIntoForm(incomingPhones);
  
  // Notes: add evidence only once (with defensive null check)
  const notesEl = document.getElementById('notes');
  if (notesEl) {
    let notesVal = notesEl.value || '';
    
    // Add Deep AI evidence if not already present
    if (!notesVal.includes('[Deep AI]')) {
      const scrapedCount = state.deepAi.scraped_count || 0;
      const query = state.deepAi.query || '';
      notesVal = notesVal.trim();
      if (notesVal) notesVal += '\n\n';
      notesVal += `[Deep AI] scraped_count=${scrapedCount} query=${query}`;
    }
    
    // Add additional URLs if present and not already added
    if (state.deepAi.additional_urls && state.deepAi.additional_urls.length > 0 && !notesVal.includes('[Deep AI URLs]')) {
      notesVal += '\n\n[Deep AI URLs]\n' + state.deepAi.additional_urls.join('\n');
    }
    
    notesEl.value = notesVal;
    notesEl.dispatchEvent(new Event('input', { bubbles: true }));
  }
  
  // Mark that merge was performed
  state.deepAi.merged_into_form = true;
  
  console.log("mergeDeepAiIntoCaptureForm completed", { extracted });
}

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


function autofillIfEmpty(fieldId, value) {
  if (!value) return;
  const field = document.getElementById(fieldId);
  if (field && !field.value.trim()) {
    field.value = value;
  }
}
