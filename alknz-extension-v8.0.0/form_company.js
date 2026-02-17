function getFirmFormData() {
  const orgEmails = [
    document.getElementById('org-email-1')?.value || '',
    document.getElementById('org-email-2')?.value || '',
    document.getElementById('org-email-3')?.value || '',
    document.getElementById('org-email-4')?.value || '',
    document.getElementById('org-email-5')?.value || ''
  ].filter(e => e.trim());

  const orgPhones = [
    document.getElementById('org-phone-1')?.value || '',
    document.getElementById('org-phone-2')?.value || '',
    document.getElementById('org-phone-3')?.value || ''
  ].filter(p => p.trim());

  const orgSectors = (document.getElementById('org-investment-sectors')?.value || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const orgStages = (document.getElementById('org-investment-stages')?.value || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const orgGeo = (document.getElementById('org-geographic-focus')?.value || '')
    .split(',').map(s => s.trim()).filter(Boolean);

  return {
    org_name:             document.getElementById('org-name')?.value?.trim() || '',
    org_type:             document.getElementById('org-type')?.value?.trim() || '',
    website:              document.getElementById('org-website')?.value?.trim() || '',
    linkedin_url:         document.getElementById('org-linkedin-url')?.value?.trim() || '',
    emails:               orgEmails,
    phones:               orgPhones,
    hq_city:              document.getElementById('org-hq-city')?.value?.trim() || '',
    hq_country:           document.getElementById('org-hq-country')?.value?.trim() || '',
    description:          document.getElementById('org-description')?.value?.trim() || '',
    investment_sectors:   orgSectors,
    investment_stages:    orgStages,
    check_size_min:       document.getElementById('org-check-size-min')?.value?.trim() || '',
    check_size_max:       document.getElementById('org-check-size-max')?.value?.trim() || '',
    geographic_focus:     orgGeo,
    notes:                document.getElementById('org-notes')?.value?.trim() || ''
  };
}

function setFirmFormData(data) {
  if (!data) return;
  const set = (id, val) => {
    if (!val) return;
    const el = document.getElementById(id);
    if (el && !el.value) el.value = val;
  };
  set('org-name', data.org_name);
  set('org-type', data.org_type);
  set('org-website', data.website || data.org_website);
  set('org-linkedin-url', data.linkedin_url || data.org_linkedin_url);
  set('org-hq-city', data.hq_city);
  set('org-hq-country', data.hq_country);
  set('org-description', data.description);
  set('org-check-size-min', data.check_size_min);
  set('org-check-size-max', data.check_size_max);
  if (data.investment_sectors) {
    set('org-investment-sectors', Array.isArray(data.investment_sectors) ? data.investment_sectors.join(', ') : data.investment_sectors);
  }
  if (data.investment_stages) {
    set('org-investment-stages', Array.isArray(data.investment_stages) ? data.investment_stages.join(', ') : data.investment_stages);
  }
  if (data.geographic_focus) {
    set('org-geographic-focus', Array.isArray(data.geographic_focus) ? data.geographic_focus.join(', ') : data.geographic_focus);
  }
  // Emails
  if (data.emails?.length) {
    data.emails.slice(0, 5).forEach((email, i) => {
      const el = document.getElementById(`org-email-${i + 1}`);
      if (el && !el.value) el.value = email;
    });
  }
  // Phones
  if (data.phones?.length) {
    data.phones.slice(0, 3).forEach((phone, i) => {
      const el = document.getElementById(`org-phone-${i + 1}`);
      if (el && !el.value) el.value = phone;
    });
  }
}

async function uploadFirm() {
  const settings = await getSettings();
  if (!settings.backendUrl) {
    showToast('Please configure Backend URL in settings', 'error');
    return;
  }

  const firmData = getFirmFormData();
  if (!firmData.org_name) {
    showToast('Please enter an organization name', 'error');
    return;
  }

  const requestBody = {
    org_name:           firmData.org_name,
    org_type:           firmData.org_type,
    website:            firmData.website,
    linkedin_url:       firmData.linkedin_url,
    emails:             firmData.emails,
    phones:             firmData.phones,
    hq_city:            firmData.hq_city,
    hq_country:         firmData.hq_country,
    description:        firmData.description,
    investment_sectors: firmData.investment_sectors,
    investment_stages:  firmData.investment_stages,
    check_size_min:     firmData.check_size_min,
    check_size_max:     firmData.check_size_max,
    geographic_focus:   firmData.geographic_focus,
    notes:              firmData.notes,
    source_urls:        state.source_url ? [state.source_url] : [],
    captured_by:        settings.capturedBy || '',
    captured_at:        new Date().toISOString()
  };

  try {
    // Try new v1 endpoint first, fall back to legacy
    const endpoint = `${settings.backendUrl}/api/v1/companies`;
    const fallbackEndpoint = `${settings.backendUrl}/api/organizations`;

    let response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
      body: JSON.stringify(requestBody)
    }).catch(() => null);

    if (!response || response.status === 404) {
      response = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
        body: JSON.stringify(requestBody)
      });
    }

    if (response.ok) {
      showToast(`${firmData.org_name} uploaded to ALKNZ Portal`, 'success');
    } else {
      const result = await response.json().catch(() => ({}));
      showToast(`Upload failed: ${result.error || 'Unknown error'}`, 'error');
    }
  } catch (error) {
    showToast(`Upload failed: ${error.message}`, 'error');
  }
}
