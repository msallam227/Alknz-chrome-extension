function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });

  const footerResearch = document.getElementById('footer-research');
  const footerSaved    = document.getElementById('footer-saved');
  if (footerResearch) footerResearch.style.display = tabId === 'capture' ? 'flex' : 'none';
  if (footerSaved)    footerSaved.style.display    = tabId === 'history' ? 'flex' : 'none';

  // Refresh Saved tab content when switching to it
  if (tabId === 'history') {
    loadAddressBook();
    renderSearchHistory();
  }
}

function addTerminalLog(container, text, type, progressBar, progress) {
  const logEl = document.createElement('div');
  logEl.className = `terminal-log ${type}`;
  logEl.textContent = text;
  container.appendChild(logEl);
  container.scrollTop = container.scrollHeight;
  if (progressBar && progress !== undefined) {
    progressBar.style.width = `${progress}%`;
  }
}


async function initSidePanel() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
      state.source_url   = tab.url || '';
      state.source_title = tab.title || '';

      document.getElementById('source-url').value   = state.source_url;
      document.getElementById('source-title').value = state.source_title;

      // Detect page type and auto-switch capture mode
      if (tab.id) {
        try {
          const ctx = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_CONTEXT' });
          if (ctx?.page_type) {
            applyPageTypeToMode(ctx.page_type);
            // Smart URL suggestion for Batch tab: pre-fill with detected company URL
            if (ctx.page_type === 'company_profile' || ctx.page_type === 'team_page') {
              const scraperUrlsEl = document.getElementById('scraper-urls');
              if (scraperUrlsEl && !scraperUrlsEl.value.trim()) {
                const companyUrl = (tab.url || '').replace(/\/people\/?.*/, '').replace(/\/$/, '');
                if (companyUrl) scraperUrlsEl.value = companyUrl;
              }
            }
            // Pre-fill company form with direct DOM extraction if on company page
            if (ctx.page_type === 'company_profile' && ctx.suggested_fields) {
              setFirmFormData({
                org_name:     ctx.suggested_fields.org_name,
                website:      ctx.suggested_fields.website,
                linkedin_url: ctx.suggested_fields.linkedin_url,
                hq_city:      ctx.suggested_fields.hq_city,
                hq_country:   ctx.suggested_fields.hq_country,
                description:  ctx.suggested_fields.description
              });
            }
            // Pre-fill person form with direct DOM extraction if on person page
            if ((ctx.page_type === 'person_profile' || ctx.page_type === 'unknown') && ctx.suggested_fields) {
              const sf = ctx.suggested_fields;
              setFormData({
                investor_name: sf.person_name || sf.investor_name,
                job_title:     sf.job_title,
                firm_name:     sf.firm_name,
                linkedin_url:  sf.linkedin_url,
                location_city: sf.location_city,
                location_country: sf.location_country,
                website:       sf.website,
                emails:        sf.email ? [sf.email] : [],
                phones:        sf.phone ? [sf.phone] : []
              });
            }
          }
        } catch {
          // Content script not injected yet (e.g., chrome:// pages) — default to person mode
          setCaptureMode('person');
        }
      }
    }
  } catch (error) {
    console.error('Error getting active tab:', error);
    setCaptureMode('person');
  }

  await loadAddressBook();
}


document.addEventListener('DOMContentLoaded', async () => {
  await loadLanguagePreference();
  
  initSidePanel();
  
  await loadSearchHistory();
  renderSearchHistory();

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  
  const langToggle = document.getElementById('btn-lang-toggle');
  if (langToggle) langToggle.addEventListener('click', toggleLanguage);

  const btnStartScraper = document.getElementById('btn-start-scraper');
  const scraperUrlsTextarea = document.getElementById('scraper-urls');
  
  if (btnStartScraper) btnStartScraper.addEventListener('click', startBatchScraper);
  if (scraperUrlsTextarea) scraperUrlsTextarea.addEventListener('input', updateUrlCount);

  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const drawerOverlay = document.getElementById('review-drawer-overlay');
  const drawerRawToggle = document.getElementById('drawer-raw-toggle');
  const btnDrawerAccept = document.getElementById('btn-drawer-accept');
  const btnDrawerReject = document.getElementById('btn-drawer-reject');
  
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeReviewDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeReviewDrawer);
  if (drawerRawToggle) drawerRawToggle.addEventListener('click', toggleRawJson);
  if (btnDrawerAccept) btnDrawerAccept.addEventListener('click', acceptFromDrawer);
  if (btnDrawerReject) btnDrawerReject.addEventListener('click', rejectFromDrawer);
  
  // Organization drawer event listeners
  const btnCloseOrgDrawer = document.getElementById('btn-close-org-drawer');
  const orgDrawerOverlay = document.getElementById('org-drawer-overlay');
  const orgDrawerRawToggle = document.getElementById('org-drawer-raw-toggle');
  const btnOrgDrawerClose = document.getElementById('btn-org-drawer-close');
  const btnOrgDrawerSave = document.getElementById('btn-org-drawer-save');
  
  if (btnCloseOrgDrawer) btnCloseOrgDrawer.addEventListener('click', closeOrgDrawer);
  if (orgDrawerOverlay) orgDrawerOverlay.addEventListener('click', closeOrgDrawer);
  if (orgDrawerRawToggle) orgDrawerRawToggle.addEventListener('click', toggleOrgRawJson);
  if (btnOrgDrawerClose) btnOrgDrawerClose.addEventListener('click', closeOrgDrawer);
  if (btnOrgDrawerSave) btnOrgDrawerSave.addEventListener('click', saveOrgFromDrawer);
  
  const verifyEmailsBtn = document.getElementById('verify-emails-btn');
  if (verifyEmailsBtn) verifyEmailsBtn.addEventListener('click', verifyPredictedEmails);

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      setFilter(tab.dataset.filter);
    });
  });

  const btnSelectAll = document.getElementById('btn-select-all');
  const btnClearSelection = document.getElementById('btn-clear-selection');
  const btnAcceptSelected = document.getElementById('btn-accept-selected');
  const btnRejectSelected = document.getElementById('btn-reject-selected');
  
  if (btnSelectAll) btnSelectAll.addEventListener('click', selectAllVisible);
  if (btnClearSelection) btnClearSelection.addEventListener('click', clearSelection);
  if (btnAcceptSelected) btnAcceptSelected.addEventListener('click', acceptSelected);
  if (btnRejectSelected) btnRejectSelected.addEventListener('click', rejectSelected);

  document.getElementById('btn-capture-text').addEventListener('click', captureSelectedText);
  document.getElementById('btn-capture-page').addEventListener('click', captureFromPage);
  document.getElementById('btn-save-draft').addEventListener('click', saveDraft);
  document.getElementById('btn-upload').addEventListener('click', uploadCapture);
  document.getElementById('btn-export').addEventListener('click', exportToExcel);
  document.getElementById('btn-accept-all').addEventListener('click', acceptAllHighMedium);
  document.getElementById('btn-clear-form').addEventListener('click', () => {
    clearForm();
    // Hide post-upload cards and conflict warning when form is cleared
    hideConflictWarning();
    const secRec  = document.getElementById('section-recommendations');
    const secNext = document.getElementById('section-next-steps');
    if (secRec)  secRec.style.display  = 'none';
    if (secNext) secNext.style.display = 'none';
    showToast(t('toasts.formCleared'), 'info');
  });
  document.getElementById('btn-clear-evidence').addEventListener('click', () => {
    document.getElementById('selected-text').value = '';
    state.selected_text = '';
    showToast(t('toasts.evidenceCleared'), 'info');
  });
  document.getElementById('address-book-toggle').addEventListener('click', toggleAddressBook);
  document.getElementById('suggestions-toggle').addEventListener('click', toggleSuggestions);

  // Collapsible form sections — Contact & Relationship, Investment Focus
  ['contact-relationship', 'investment-focus'].forEach(key => {
    const toggle = document.getElementById(`toggle-${key}`);
    const content = document.getElementById(`content-${key}`);
    const icon = toggle?.querySelector('.section-toggle-icon');
    if (toggle && content) {
      toggle.addEventListener('click', () => {
        const isCollapsed = content.classList.toggle('collapsed');
        if (icon) icon.classList.toggle('open', !isCollapsed);
      });
    }
  });

  // Mode banner — manual override buttons
  document.querySelectorAll('.mode-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode) {
        setCaptureMode(mode);
        if (mode === 'bulk') loadBulkTeamMembers();
      }
    });
  });

  // Bulk team actions
  const btnRefreshTeam = document.getElementById('btn-refresh-team');
  if (btnRefreshTeam) btnRefreshTeam.addEventListener('click', loadBulkTeamMembers);

  const btnBulkSelectAll = document.getElementById('btn-bulk-select-all');
  if (btnBulkSelectAll) btnBulkSelectAll.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#bulk-team-list .bulk-checkbox');
    checkboxes.forEach((cb, i) => {
      cb.checked = true;
      state.bulkSelectedIndices.add(parseInt(cb.dataset.index, 10));
    });
    updateBulkSelectionCount();
  });

  const btnBulkClearSel = document.getElementById('btn-bulk-clear-sel');
  if (btnBulkClearSel) btnBulkClearSel.addEventListener('click', () => {
    document.querySelectorAll('#bulk-team-list .bulk-checkbox').forEach(cb => { cb.checked = false; });
    state.bulkSelectedIndices.clear();
    updateBulkSelectionCount();
  });

  const btnBulkEnrichCapture = document.getElementById('btn-bulk-enrich-capture');
  if (btnBulkEnrichCapture) btnBulkEnrichCapture.addEventListener('click', startBulkCaptureQueue);

  // Inline Enrichment Panel (Phase 5)
  const btnInlineEnrich = document.getElementById('btn-inline-enrich');
  if (btnInlineEnrich) btnInlineEnrich.addEventListener('click', startInlineEnrichment);

  const btnEnrichDismiss = document.getElementById('btn-enrichment-dismiss');
  if (btnEnrichDismiss) btnEnrichDismiss.addEventListener('click', () => {
    const cardEl = document.getElementById('enrichment-result-card');
    if (cardEl) cardEl.style.display = 'none';
  });

  const btnApplyAll = document.getElementById('btn-apply-all-enrichment');
  if (btnApplyAll) btnApplyAll.addEventListener('click', applyAllEnrichmentFields);

  // Enrichment toggle (collapsible)
  const enrichmentToggle = document.getElementById('enrichment-toggle');
  if (enrichmentToggle) {
    enrichmentToggle.addEventListener('click', () => {
      const content = document.getElementById('enrichment-panel-content');
      const icon    = document.getElementById('enrichment-toggle-icon');
      if (!content) return;
      const isCollapsed = content.classList.toggle('collapsed');
      if (icon) icon.textContent = isCollapsed ? '▶' : '▼';
    });
  }

  // Delegated click handler for per-field Apply / Dismiss buttons in enrichment card
  document.addEventListener('click', (e) => {
    const applyBtn   = e.target.closest('.enrichment-apply-btn');
    const dismissBtn = e.target.closest('.enrichment-dismiss-btn');
    if (applyBtn) {
      const idx = parseInt(applyBtn.dataset.fieldIdx, 10);
      if (!isNaN(idx)) handleEnrichmentApply(idx);
    }
    if (dismissBtn) {
      const idx = parseInt(dismissBtn.dataset.fieldIdx, 10);
      if (!isNaN(idx)) handleEnrichmentDismiss(idx);
    }
  });
});
