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

function toggleAddressBook() {
  const content = document.getElementById('address-book-content');
  const icon = document.getElementById('collapse-icon');
  
  content.classList.toggle('collapsed');
  icon.classList.toggle('collapsed');
}

function renderSearchHistory() {
  const container = document.getElementById('history-list');
  
  if (deepSearchState.history.length === 0) {
    container.innerHTML = '<div class="history-empty">No searches yet. Use Deep AI to find contact information.</div>';
    return;
  }

  container.innerHTML = deepSearchState.history.map((item, index) => {
    const initials = item.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    const date = new Date(item.revealedAt).toLocaleDateString();
    
    return `
      <div class="history-item" data-index="${index}">
        <div class="history-avatar">${initials}</div>
        <div class="history-info">
          <div class="history-name">${escapeHtml(item.name)}</div>
          <div class="history-meta">${escapeHtml(item.company)} • ${date}</div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      const historyItem = deepSearchState.history[index];
      if (historyItem) {
        // Load into Research tab's person form
        setFormData({
          investor_name: historyItem.name,
          job_title:     historyItem.title || '',
          firm_name:     historyItem.company || '',
          linkedin_url:  historyItem.linkedin || '',
          emails:        historyItem.email ? [historyItem.email] : [],
          phones:        historyItem.phone ? [historyItem.phone] : []
        });
        switchTab('capture');
        showToast(`Loaded: ${historyItem.name}`, 'success');
      }
    });
  });
}
