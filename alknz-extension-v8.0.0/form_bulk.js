async function loadBulkTeamMembers() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    const response = await chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_TEAM_MEMBERS' });
    state.bulkTeamMembers     = response?.team_members || [];
    state.bulkSelectedIndices = new Set();
    renderBulkTeamList();
  } catch (err) {
    console.error('Error extracting team members:', err);
  }
}

function renderBulkTeamList() {
  const listEl   = document.getElementById('bulk-team-list');
  const countEl  = document.getElementById('bulk-team-count');
  const actionsEl = document.getElementById('bulk-team-actions');
  if (!listEl) return;

  countEl.textContent = state.bulkTeamMembers.length;

  if (state.bulkTeamMembers.length === 0) {
    listEl.innerHTML = '<div style="text-align:center; color:#64748b; font-size:13px; padding:16px;">No team members detected on this page.<br>Try scrolling down to load more, then click Refresh.</div>';
    if (actionsEl) actionsEl.style.display = 'none';
    return;
  }

  listEl.innerHTML = state.bulkTeamMembers.map((person, idx) => `
    <div class="bulk-person-row" data-index="${idx}">
      <input type="checkbox" class="bulk-checkbox" data-index="${idx}">
      ${person.profile_image_url
        ? `<img class="bulk-avatar" src="${escapeHtml(person.profile_image_url)}" onerror="this.style.display='none'" alt="">`
        : `<div class="bulk-avatar-placeholder">${escapeHtml((person.person_name || 'U').charAt(0).toUpperCase())}</div>`
      }
      <div class="bulk-person-info">
        <div class="bulk-person-name">${escapeHtml(person.person_name || 'Unknown')}</div>
        <div class="bulk-person-title">${escapeHtml(person.job_title || '')}</div>
      </div>
      ${person.linkedin_url
        ? `<a class="bulk-linkedin-link" href="${escapeHtml(person.linkedin_url)}" target="_blank" title="Open LinkedIn">LI</a>`
        : ''
      }
    </div>
  `).join('');

  // Wire checkboxes
  listEl.querySelectorAll('.bulk-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const idx = parseInt(cb.dataset.index, 10);
      if (cb.checked) state.bulkSelectedIndices.add(idx);
      else            state.bulkSelectedIndices.delete(idx);
      updateBulkSelectionCount();
    });
  });

  if (actionsEl) actionsEl.style.display = 'flex';
  updateBulkSelectionCount();
}

function updateBulkSelectionCount() {
  const countEl = document.getElementById('bulk-selected-count');
  if (countEl) countEl.textContent = state.bulkSelectedIndices.size;
}


function startBulkCaptureQueue() {
  const selectedPeople = [...state.bulkSelectedIndices]
    .map(i => state.bulkTeamMembers[i])
    .filter(Boolean);

  if (selectedPeople.length === 0) {
    showToast('Please select at least one person first', 'info');
    return;
  }

  const queueEl = document.getElementById('bulk-capture-queue');
  if (!queueEl) return;
  queueEl.style.display = 'block';

  // Detect company context from current page URL / mode banner
  const companyUrl = state.source_url && state.source_url.includes('linkedin.com/company')
    ? state.source_url.replace(/\/people\/?.*/, '').replace(/\/$/, '')
    : '';

  state.bulkEnrichmentQueue = selectedPeople.map((person, i) => ({
    ...person,
    queue_index: i,
    status: 'queued',   // queued | searching | done | error
    enrichment: null
  }));

  renderBulkQueue();
  runBulkEnrichmentQueue();
}

function renderBulkQueue() {
  const queueEl = document.getElementById('bulk-capture-queue');
  if (!queueEl) return;

  queueEl.innerHTML = state.bulkEnrichmentQueue.map((job, i) => `
    <div class="bulk-queue-card" id="bulk-queue-card-${i}">
      <div class="bulk-queue-header">
        <strong>${escapeHtml(job.person_name || 'Unknown')}</strong>
        <span class="bulk-queue-title-text">${escapeHtml(job.job_title || '')}</span>
      </div>
      <div class="bulk-queue-status bulk-queue-status--${job.status}" id="bulk-queue-status-${i}">
        ${renderQueueStatus(job)}
      </div>
      <div class="bulk-queue-actions" id="bulk-queue-actions-${i}" style="display: ${job.status === 'done' ? 'flex' : 'none'}; margin-top: 8px; gap: 6px;">
        <button class="btn btn-small btn-ghost" onclick="bulkSkipPerson(${i})">Skip</button>
        <button class="btn btn-small btn-ghost" onclick="bulkSaveDraftPerson(${i})">Save Draft</button>
        <button class="btn btn-small btn-primary" onclick="bulkUploadPerson(${i})">Upload</button>
      </div>
    </div>
  `).join('');
}

function renderQueueStatus(job) {
  if (job.status === 'queued')    return '<span style="color:#94a3b8;">⏳ Queued</span>';
  if (job.status === 'searching') return '<span style="color:#f59e0b;">🔍 Searching...</span>';
  if (job.status === 'error')     return '<span style="color:#ef4444;">⚠ Could not find contact info</span>';
  if (job.status === 'done') {
    const e = job.enrichment;
    const parts = [];
    if (e?.email)   parts.push(`📧 ${escapeHtml(e.email)}`);
    if (e?.phone)   parts.push(`📞 ${escapeHtml(e.phone)}`);
    if (!parts.length) parts.push('No contact info found');
    return `<span style="color:#10b981;">✓</span> ${parts.join(' · ')}`;
  }
  return '';
}

async function runBulkEnrichmentQueue() {
  const settings = await getSettings();
  if (!settings.backendUrl) {
    showToast('Configure Backend URL in settings first', 'error');
    return;
  }

  for (let i = 0; i < state.bulkEnrichmentQueue.length; i++) {
    const job = state.bulkEnrichmentQueue[i];
    if (job.status !== 'queued') continue;

    // Update UI to searching
    job.status = 'searching';
    updateQueueCard(i);

    try {
      const response = await fetch(`${settings.backendUrl}/api/v1/enrichment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify({
          name: job.person_name,
          company: job.firm_name || null,
          additional_urls: job.linkedin_url ? [job.linkedin_url] : []
        })
      }).catch(() => null);

      if (response?.ok) {
        const data = await response.json().catch(() => null);
        job.enrichment = data?.data?.extracted || null;
        job.status = 'done';
      } else {
        // Fallback: try old endpoint
        const fallback = await fetch(`${settings.backendUrl}/api/deep-search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
          body: JSON.stringify({ name: job.person_name, company: job.firm_name || null, additional_urls: [] })
        }).catch(() => null);
        if (fallback?.ok) {
          const data = await fallback.json().catch(() => null);
          job.enrichment = data?.data?.extracted || null;
          job.status = 'done';
        } else {
          job.status = 'error';
        }
      }
    } catch {
      job.status = 'error';
    }

    updateQueueCard(i);

    // 1-second delay between calls to avoid rate limiting
    if (i < state.bulkEnrichmentQueue.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

function updateQueueCard(i) {
  const statusEl  = document.getElementById(`bulk-queue-status-${i}`);
  const actionsEl = document.getElementById(`bulk-queue-actions-${i}`);
  const job = state.bulkEnrichmentQueue[i];
  if (!job) return;
  if (statusEl)  statusEl.innerHTML = renderQueueStatus(job);
  if (statusEl)  statusEl.className = `bulk-queue-status bulk-queue-status--${job.status}`;
  if (actionsEl) actionsEl.style.display = job.status === 'done' ? 'flex' : 'none';
}

async function bulkUploadPerson(i) {
  const job = state.bulkEnrichmentQueue[i];
  if (!job) return;
  const settings = await getSettings();
  if (!settings.backendUrl) { showToast('Configure Backend URL first', 'error'); return; }

  const payload = {
    person_name:   job.person_name,
    investor_name: job.person_name, // backward compat
    job_title:     job.job_title,
    linkedin_url:  job.linkedin_url || '',
    email:         job.enrichment?.email || '',
    phone:         job.enrichment?.phone || '',
    firm_name:     job.firm_name || '',
    firm_linkedin_url: job.linkedin_url?.includes('/company/') ? job.linkedin_url : '',
    source_url:    job.source_url || state.source_url,
    confidence:    'MEDIUM',
    captured_by:   settings.capturedBy || '',
    page_type:     'team_page'
  };

  try {
    const res = await fetch(`${settings.backendUrl}/api/v1/people`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast(`${job.person_name} uploaded!`, 'success');
      const card = document.getElementById(`bulk-queue-card-${i}`);
      if (card) card.style.opacity = '0.5';
    } else {
      showToast('Upload failed', 'error');
    }
  } catch {
    showToast('Upload failed', 'error');
  }
}

function bulkSkipPerson(i) {
  const card = document.getElementById(`bulk-queue-card-${i}`);
  if (card) card.style.display = 'none';
}

async function bulkSaveDraftPerson(i) {
  const job = state.bulkEnrichmentQueue[i];
  if (!job) return;
  const addressBook = await getAddressBook();
  const draft = {
    local_id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    capture_type: 'NEW_INVESTOR',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'LOCAL_DRAFT',
    source_url: job.source_url || state.source_url,
    source_title: state.source_title,
    confidence: 'MEDIUM',
    payload: {
      investor_name: job.person_name,
      person_name: job.person_name,
      job_title: job.job_title || '',
      linkedin_url: job.linkedin_url || '',
      emails: job.enrichment?.email ? [job.enrichment.email] : [],
      phones: job.enrichment?.phone ? [job.enrichment.phone] : [],
      firm_name: job.firm_name || ''
    }
  };
  addressBook.push(draft);
  await saveAddressBook(addressBook);
  showToast(`${job.person_name} saved as draft`, 'success');
  await loadAddressBook();
}

// ---------------------------------------------------------------------------
// Inline Enrichment Panel (Phase 5) — person mode only, replaces Deep AI tab
// ---------------------------------------------------------------------------
