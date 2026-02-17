function setCaptureMode(mode) {
  if (!MODE_CONFIG[mode]) mode = 'person';
  state.captureMode = mode;

  // Section visibility
  const personSections = [
    document.getElementById('section-person-details'),
    document.getElementById('section-contact-relationship'),
    document.getElementById('section-investment-focus'),
    document.getElementById('section-enrichment')
  ];
  const companySection = document.getElementById('section-company-details');
  const bulkSection    = document.getElementById('section-bulk-team');

  personSections.forEach(el => { if (el) el.style.display = mode === 'person' ? '' : 'none'; });
  if (companySection) companySection.style.display = mode === 'company' ? '' : 'none';
  if (bulkSection)    bulkSection.style.display    = mode === 'bulk'    ? '' : 'none';

  // Mode banner
  const cfg = MODE_CONFIG[mode];
  const iconEl  = document.getElementById('mode-detected-icon');
  const textEl  = document.getElementById('mode-detected-text');
  if (iconEl)  iconEl.textContent  = cfg.icon;
  if (textEl)  textEl.textContent  = cfg.label;

  // Update active button state
  document.querySelectorAll('.mode-switch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // Show/hide the footer upload/save buttons (they don't apply in bulk mode)
  const footer = document.getElementById('capture-footer');
  if (footer) footer.style.display = cfg.showFooter ? '' : 'none';
}

function applyPageTypeToMode(pageType) {
  state.pageType = pageType || 'unknown';

  // Show the mode banner whenever we have a detected type
  const banner = document.getElementById('capture-mode-banner');
  if (banner) banner.style.display = '';

  if (pageType === 'team_page') {
    setCaptureMode('bulk');
    loadBulkTeamMembers();
  } else if (pageType === 'company_profile') {
    setCaptureMode('company');
  } else {
    setCaptureMode('person');
  }
}
