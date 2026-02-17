async function startInlineEnrichment() {
  const name     = (document.getElementById('investor-name')?.value || '').trim();
  const firm     = (document.getElementById('firm-name')?.value || '').trim();
  const linkedin = (document.getElementById('linkedin-url')?.value || '').trim();

  if (!name && !firm && !linkedin) {
    showToast('Fill in at least a name or LinkedIn URL first', 'warning');
    return;
  }

  // Expand the collapsible panel if collapsed
  const panelContent = document.getElementById('enrichment-panel-content');
  if (panelContent?.classList.contains('collapsed')) {
    panelContent.classList.remove('collapsed');
    const icon = document.getElementById('enrichment-toggle-icon');
    if (icon) icon.textContent = '▼';
  }

  const statusEl = document.getElementById('enrichment-status');
  const cardEl   = document.getElementById('enrichment-result-card');
  if (statusEl) statusEl.style.display = '';
  if (cardEl)   cardEl.style.display   = 'none';

  const query = [name, firm].filter(Boolean).join(' ') || linkedin;

  try {
    const settings = await getSettings();
    const apiBase  = settings.apiEndpoint || settings.backendUrl || '';

    let result = null;
    const tryV1 = async () => {
      const res = await fetch(`${apiBase}/api/v1/enrichment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, linkedin_url: linkedin, name, firm })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };
    const tryLegacy = async () => {
      const res = await fetch(`${apiBase}/api/deep-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, linkedin_url: linkedin, name, firm })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };

    try { result = await tryV1(); } catch { result = await tryLegacy(); }

    if (statusEl) statusEl.style.display = 'none';
    renderEnrichmentResultCard(result);
  } catch (err) {
    if (statusEl) statusEl.style.display = 'none';
    showToast('Enrichment failed: ' + err.message, 'error');
  }
}

function renderEnrichmentResultCard(result) {
  const cardEl   = document.getElementById('enrichment-result-card');
  const fieldsEl = document.getElementById('enrichment-fields-list');
  if (!cardEl || !fieldsEl) return;

  // Normalise result shape — handle both v1 and legacy response formats
  const emails = result.emails || (result.email ? [result.email] : []);
  const phones = result.phones || (result.phone ? [result.phone] : []);

  const fields = [];
  emails.forEach((e, i) => {
    if (e) fields.push({ label: i === 0 ? 'Email' : `Email ${i + 1}`, value: e, key: `email_${i}` });
  });
  phones.forEach((p, i) => {
    if (p) fields.push({ label: i === 0 ? 'Phone' : `Phone ${i + 1}`, value: p, key: `phone_${i}` });
  });
  if (result.website)          fields.push({ label: 'Website',    value: result.website,          key: 'website' });
  if (result.location_city)    fields.push({ label: 'City',       value: result.location_city,    key: 'city' });
  if (result.location_country) fields.push({ label: 'Country',    value: result.location_country, key: 'country' });
  if (result.twitter_url)      fields.push({ label: 'Twitter/X',  value: result.twitter_url,      key: 'notes_twitter' });

  if (!fields.length) {
    fieldsEl.innerHTML = '<p style="font-size:12px;color:#64748b;text-align:center;padding:8px;">No additional data found.</p>';
    cardEl.style.display = '';
    return;
  }

  // Store on state for "Apply All"
  state._enrichmentFields = fields;

  fieldsEl.innerHTML = fields.map((f, i) => `
    <div class="enrichment-field-row" data-field-idx="${i}">
      <span class="enrichment-field-label">${escapeHtml(f.label)}</span>
      <span class="enrichment-field-value">${escapeHtml(f.value)}</span>
      <button class="enrichment-apply-btn" data-field-idx="${i}" title="Apply to form">✓ Apply</button>
      <button class="enrichment-dismiss-btn" data-field-idx="${i}" title="Dismiss">✕</button>
    </div>
  `).join('');

  cardEl.style.display = '';
}

// Maps enrichment field key prefix → target form field ID(s)
function applyEnrichmentFieldByKey(key, value) {
  if (key.startsWith('email_')) {
    // Fill first empty email slot
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`email-${i}`);
      if (el && !el.value.trim()) { el.value = value; return; }
    }
    return;
  }
  if (key.startsWith('phone_')) {
    for (let i = 1; i <= 3; i++) {
      const el = document.getElementById(`phone-${i}`);
      if (el && !el.value.trim()) { el.value = value; return; }
    }
    return;
  }
  const simpleMap = { website: 'website', city: 'location-city', country: 'location-country' };
  if (simpleMap[key]) {
    const el = document.getElementById(simpleMap[key]);
    if (el && !el.value.trim()) el.value = value;
    return;
  }
  if (key === 'notes_twitter') {
    // Append to notes field
    const notesEl = document.getElementById('notes');
    if (notesEl) {
      const sep = notesEl.value.trim() ? '\n' : '';
      notesEl.value += sep + 'Twitter/X: ' + value;
    }
  }
}

function handleEnrichmentApply(idx) {
  const fields = state._enrichmentFields;
  if (!fields || !fields[idx]) return;
  applyEnrichmentFieldByKey(fields[idx].key, fields[idx].value);
  const row = document.querySelector(`.enrichment-field-row[data-field-idx="${idx}"]`);
  if (row) {
    row.style.opacity = '0.45';
    const applyBtn = row.querySelector('.enrichment-apply-btn');
    if (applyBtn) { applyBtn.textContent = '✓ Applied'; applyBtn.disabled = true; }
  }
}

function handleEnrichmentDismiss(idx) {
  const row = document.querySelector(`.enrichment-field-row[data-field-idx="${idx}"]`);
  if (row) row.remove();
}

function applyAllEnrichmentFields() {
  const fields = state._enrichmentFields;
  if (!fields) return;
  fields.forEach((_, i) => handleEnrichmentApply(i));
}

// ---------------------------------------------------------------------------
