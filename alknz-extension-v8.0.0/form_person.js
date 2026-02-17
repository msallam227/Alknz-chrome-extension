function getFormData() {
  // Collect multiple emails (filter empty)
  const emails = [
    document.getElementById('email-1').value,
    document.getElementById('email-2').value,
    document.getElementById('email-3').value,
    document.getElementById('email-4').value,
    document.getElementById('email-5').value
  ].filter(e => e.trim());
  
  // Collect multiple phones (filter empty)
  const phones = [
    document.getElementById('phone-1').value,
    document.getElementById('phone-2').value,
    document.getElementById('phone-3').value,
    document.getElementById('phone-4').value,
    document.getElementById('phone-5').value
  ].filter(p => p.trim());
  
  // Parse comma-separated investment fields into arrays
  const investmentSectors = document.getElementById('investment-sectors').value
    .split(',').map(s => s.trim()).filter(Boolean);
  const investmentStages = document.getElementById('investment-stages').value
    .split(',').map(s => s.trim()).filter(Boolean);
  const geographicFocus = document.getElementById('geographic-focus').value
    .split(',').map(s => s.trim()).filter(Boolean);
  
  return {
    capture_type: 'NEW_INVESTOR',
    entity_type: document.getElementById('entity-type')?.value || 'investor',
    source_url: state.source_url,
    source_title: state.source_title,
    selected_text: document.getElementById('selected-text').value,
    investor_name: document.getElementById('investor-name').value,
    investor_type: document.getElementById('investor-type').value,
    job_title: document.getElementById('job-title').value,
    firm_name: document.getElementById('firm-name').value,
    linkedin_url: document.getElementById('linkedin-url').value,
    location_city: document.getElementById('location-city').value,
    location_country: document.getElementById('location-country').value,
    website: document.getElementById('website').value,
    emails: emails,
    phones: phones,
    whatsapp: document.getElementById('whatsapp').value,
    assistant_name: document.getElementById('assistant-name').value,
    assistant_email: document.getElementById('assistant-email').value,
    relationship_strength: document.getElementById('relationship-strength').value,
    decision_role: document.getElementById('decision-role').value,
    preferred_intro_path: document.getElementById('preferred-intro-path').value,
    notes: document.getElementById('notes').value,
    confidence: document.getElementById('confidence').value,
    investment_sectors: investmentSectors,
    investment_stages: investmentStages,
    check_size_min: document.getElementById('check-size-min').value,
    check_size_max: document.getElementById('check-size-max').value,
    geographic_focus: geographicFocus
  };
}

function setFormData(data) {
  // Non-destructive autofill: only fills empty fields, never overwrites user edits
  
  // Set entity type (only if empty/default) — graceful if element removed
  if (data.entity_type) {
    const entityEl = document.getElementById('entity-type');
    if (entityEl && (!entityEl.value || entityEl.value === 'investor')) {
      entityEl.value = data.entity_type;
    }
  }
  
  // Single-value fields: only fill if empty
  setIfEmpty('investor-name', data.investor_name);
  setIfEmpty('investor-type', data.investor_type);
  setIfEmpty('linkedin-url', data.linkedin_url);
  setIfEmpty('job-title', data.job_title);
  setIfEmpty('firm-name', data.firm_name);
  setIfEmpty('location-city', data.location_city);
  setIfEmpty('location-country', data.location_country);
  setIfEmpty('website', data.website);
  
  // Emails: merge (union + dedupe)
  const incomingEmails = data.emails || (data.email ? [data.email] : []);
  if (incomingEmails.length > 0) {
    mergeEmailsIntoForm(incomingEmails);
  }
  
  // Phones: merge (union + dedupe)
  const incomingPhones = data.phones || (data.phone ? [data.phone] : []);
  if (incomingPhones.length > 0) {
    mergePhonesIntoForm(incomingPhones);
  }
  
  setIfEmpty('whatsapp', data.whatsapp);
  setIfEmpty('assistant-name', data.assistant_name);
  setIfEmpty('assistant-email', data.assistant_email);
  setIfEmpty('relationship-strength', data.relationship_strength);
  setIfEmpty('decision-role', data.decision_role);
  setIfEmpty('preferred-intro-path', data.preferred_intro_path);
  setIfEmpty('notes', data.notes);
  setIfEmpty('confidence', data.confidence);
  
  // Investment focus fields
  if (data.investment_sectors) {
    const sectors = Array.isArray(data.investment_sectors) ? data.investment_sectors.join(', ') : data.investment_sectors;
    setIfEmpty('investment-sectors', sectors);
  }
  if (data.investment_stages) {
    const stages = Array.isArray(data.investment_stages) ? data.investment_stages.join(', ') : data.investment_stages;
    setIfEmpty('investment-stages', stages);
  }
  setIfEmpty('check-size-min', data.check_size_min);
  setIfEmpty('check-size-max', data.check_size_max);
  if (data.geographic_focus) {
    const geo = Array.isArray(data.geographic_focus) ? data.geographic_focus.join(', ') : data.geographic_focus;
    setIfEmpty('geographic-focus', geo);
  }

  // Source fields: always set (these are metadata, not user edits)
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
  const entityEl = document.getElementById('entity-type');
  if (entityEl) entityEl.value = 'investor';
  document.getElementById('investor-name').value = '';
  document.getElementById('investor-type').value = '';
  document.getElementById('job-title').value = '';
  document.getElementById('firm-name').value = '';
  document.getElementById('linkedin-url').value = '';
  document.getElementById('location-city').value = '';
  document.getElementById('location-country').value = '';
  document.getElementById('website').value = '';
  
  // Clear multiple email fields
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`email-${i}`).value = '';
    document.getElementById(`phone-${i}`).value = '';
  }
  
  document.getElementById('whatsapp').value = '';
  document.getElementById('assistant-name').value = '';
  document.getElementById('assistant-email').value = '';
  document.getElementById('relationship-strength').value = '';
  document.getElementById('decision-role').value = '';
  document.getElementById('preferred-intro-path').value = '';
  document.getElementById('notes').value = '';
  document.getElementById('confidence').value = 'MEDIUM';
  document.getElementById('selected-text').value = '';
  
  // Clear investment focus fields
  document.getElementById('investment-sectors').value = '';
  document.getElementById('investment-stages').value = '';
  document.getElementById('check-size-min').value = '';
  document.getElementById('check-size-max').value = '';
  document.getElementById('geographic-focus').value = '';
  
  state.selected_text = '';
  state.editing_local_id = null;
  
  // Clear accepted captures
  scraperState.foundInvestors = scraperState.foundInvestors.filter(inv => inv.review_status !== 'accepted');
  scraperState.organizationData = null;
  
  // Clear captured organization
  scraperState.capturedOrganization = null;
  
  renderAcceptedCaptures();
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
    emails: formData.emails || [],
    phones: formData.phones || [],
    whatsapp: formData.whatsapp,
    assistant_name: formData.assistant_name,
    assistant_email: formData.assistant_email,
    relationship_strength: formData.relationship_strength,
    decision_role: formData.decision_role,
    preferred_intro_path: formData.preferred_intro_path,
    notes: formData.notes,
    investment_sectors: formData.investment_sectors || [],
    investment_stages: formData.investment_stages || [],
    check_size_min: formData.check_size_min,
    check_size_max: formData.check_size_max,
    geographic_focus: formData.geographic_focus || []
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

