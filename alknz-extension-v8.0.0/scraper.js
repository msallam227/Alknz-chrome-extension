async function startDeepSearch() {
  const query = document.getElementById('deep-search-query').value.trim();
  
  if (!query) {
    showToast('Please enter a name or LinkedIn URL', 'error');
    return;
  }
  
  if (deepSearchState.isSearching) return;
  deepSearchState.isSearching = true;

  const terminal = document.getElementById('deep-search-terminal');
  const results = document.getElementById('deep-search-results');
  const logsContainer = document.getElementById('terminal-logs');
  const progressBar = document.getElementById('progress-bar');
  const searchBtn = document.getElementById('btn-deep-search');
  
  searchBtn.disabled = true;
  searchBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
    Searching...
  `;
  
  terminal.style.display = 'block';
  results.style.display = 'none';
  logsContainer.innerHTML = '';
  progressBar.style.width = '0%';

  const settings = await getSettings();
  
  if (!settings.backendUrl) {
    addTerminalLog(logsContainer, '✗ Error: Please configure Backend URL in settings', 'error', progressBar, 100);
    searchBtn.disabled = false;
    searchBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>Start Deep Search`;
    deepSearchState.isSearching = false;
    return;
  }

  addTerminalLog(logsContainer, '> Initializing AI search agent...', 'info', progressBar, 10);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  addTerminalLog(logsContainer, '> Searching DuckDuckGo for relevant pages...', 'info', progressBar, 20);
  await new Promise(resolve => setTimeout(resolve, 200));

  const nameParts = query.split(' ').filter(p => p.length > 0);
  const name = query.includes('linkedin.com') ? '' : query;
  const company = nameParts.length > 2 ? nameParts.slice(Math.ceil(nameParts.length/2)).join(' ') : '';

  const additionalUrlsText = document.getElementById('deep-search-urls')?.value || '';
  const additionalUrls = additionalUrlsText
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.length > 0 && (u.startsWith('http://') || u.startsWith('https://')));

  try {
    if (additionalUrls.length > 0) {
      addTerminalLog(logsContainer, `> Found ${additionalUrls.length} additional URL(s) to scrape...`, 'info', progressBar, 35);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    addTerminalLog(logsContainer, '> Scraping web pages for contact info...', 'info', progressBar, 40);
    
    const response = await fetch(`${settings.backendUrl}/api/deep-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        name: name || query,
        company: company || null,
        additional_urls: additionalUrls
      })
    });

    addTerminalLog(logsContainer, '> Extracting contact patterns with AI...', 'info', progressBar, 60);
    await new Promise(resolve => setTimeout(resolve, 200));

    const result = await response.json();

    if (!response.ok || result.success === false) {
      addTerminalLog(logsContainer, `✗ Error: ${result.error || 'Search failed'}`, 'error', progressBar, 100);
      searchBtn.disabled = false;
      searchBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>Start Deep Search`;
      deepSearchState.isSearching = false;
      return;
    }

    addTerminalLog(logsContainer, '> Cross-referencing data sources...', 'info', progressBar, 80);
    await new Promise(resolve => setTimeout(resolve, 200));

    const extracted = result.data?.extracted || {};
    const searchResults = result.data?.search_results || [];
    const scrapedCount = result.data?.scraped_count || 0;

    state.deepAi.extracted = extracted;
    state.deepAi.search_results = searchResults;
    state.deepAi.scraped_count = scrapedCount;
    state.deepAi.query = query;
    state.deepAi.additional_urls = additionalUrls;
    state.deepAi.merged_into_form = false; // Reset on new search

    const foundItems = [
      extracted.email,
      extracted.phone,
      extracted.linkedin,
      extracted.twitter,
      extracted.website
    ].filter(Boolean).length;

    addTerminalLog(logsContainer, `✓ Scraped ${scrapedCount} pages, found ${foundItems} data points.`, 'success', progressBar, 100);
    await new Promise(resolve => setTimeout(resolve, 300));

    const displayName = extracted.firm_name ? `${name || query}` : (name || query);
    const displayTitle = extracted.job_title || 'Investor';
    const displayCompany = extracted.firm_name || company || 'Unknown Company';

    document.getElementById('deep-profile-name').textContent = displayName;
    document.getElementById('deep-profile-title').textContent = displayTitle;
    document.getElementById('deep-profile-company').textContent = displayCompany;

    const emailVal = extracted.email || null;
    const phoneVal = extracted.phone || null;
    const linkedinVal = extracted.linkedin || null;

    const emailEl = document.getElementById('result-email');
    const phoneEl = document.getElementById('result-phone');
    const linkedinEl = document.getElementById('result-linkedin');

    emailEl.className = 'result-value';
    phoneEl.className = 'result-value';
    linkedinEl.className = 'result-value';

    if (emailVal) {
      emailEl.textContent = emailVal;
      emailEl.classList.add('blurred');
    } else {
      emailEl.textContent = 'Not found';
      emailEl.classList.add('not-found');
    }

    if (phoneVal) {
      phoneEl.textContent = phoneVal;
      phoneEl.classList.add('blurred');
    } else {
      phoneEl.textContent = 'Not found';
      phoneEl.classList.add('not-found');
    }

    if (linkedinVal) {
      const linkedinUrl = linkedinVal.startsWith('http') ? linkedinVal : `https://${linkedinVal}`;
      const displayText = linkedinVal.length > 28 ? linkedinVal.substring(0, 28) + '...' : linkedinVal;
      linkedinEl.innerHTML = `<a href="${escapeHtml(linkedinUrl)}" target="_blank" title="${escapeHtml(linkedinVal)}" class="result-link">${escapeHtml(displayText)}</a>`;
      linkedinEl.classList.add('revealed');
    } else {
      linkedinEl.textContent = 'Not found';
      linkedinEl.classList.add('not-found');
    }

    const emailChip = emailEl.parentElement.querySelector('.confidence-chip');
    const phoneChip = phoneEl.parentElement.querySelector('.confidence-chip');
    const linkedinChip = linkedinEl.parentElement.querySelector('.confidence-chip');

    if (emailChip) {
      emailChip.textContent = emailVal ? (extracted.confidence === 'HIGH' ? '95%' : extracted.confidence === 'MEDIUM' ? '75%' : '50%') : '-';
      emailChip.className = 'confidence-chip ' + (emailVal ? (extracted.confidence === 'HIGH' ? 'high' : 'medium') : 'low');
    }
    if (phoneChip) {
      phoneChip.textContent = phoneVal ? (extracted.confidence === 'HIGH' ? '90%' : extracted.confidence === 'MEDIUM' ? '70%' : '45%') : '-';
      phoneChip.className = 'confidence-chip ' + (phoneVal ? (extracted.confidence === 'HIGH' ? 'high' : 'medium') : 'low');
    }
    if (linkedinChip) {
      linkedinChip.textContent = linkedinVal ? '100%' : '-';
      linkedinChip.className = 'confidence-chip ' + (linkedinVal ? 'high' : 'low');
    }

    const twitterVal = extracted.twitter || null;
    const websiteVal = extracted.website || null;
    const locationVal = (extracted.location_city || extracted.location_country) 
      ? [extracted.location_city, extracted.location_country].filter(Boolean).join(', ')
      : null;

    const twitterEl = document.getElementById('result-twitter');
    const websiteEl = document.getElementById('result-website');
    const locationEl = document.getElementById('result-location');

    if (twitterEl) {
      twitterEl.className = 'result-value';
      if (twitterVal) {
        const twitterUrl = twitterVal.startsWith('http') ? twitterVal : `https://${twitterVal}`;
        const displayText = twitterVal.length > 28 ? twitterVal.substring(0, 28) + '...' : twitterVal;
        twitterEl.innerHTML = `<a href="${escapeHtml(twitterUrl)}" target="_blank" title="${escapeHtml(twitterVal)}" class="result-link">${escapeHtml(displayText)}</a>`;
        twitterEl.classList.add('revealed');
      } else {
        twitterEl.textContent = 'Not found';
        twitterEl.classList.add('not-found');
      }
      const twitterChip = twitterEl.parentElement.querySelector('.confidence-chip');
      if (twitterChip) {
        twitterChip.textContent = twitterVal ? '100%' : '-';
        twitterChip.className = 'confidence-chip ' + (twitterVal ? 'high' : 'low');
      }
    }

    if (websiteEl) {
      websiteEl.className = 'result-value';
      if (websiteVal) {
        const websiteUrl = websiteVal.startsWith('http') ? websiteVal : `https://${websiteVal}`;
        const displayText = websiteVal.length > 28 ? websiteVal.substring(0, 28) + '...' : websiteVal;
        websiteEl.innerHTML = `<a href="${escapeHtml(websiteUrl)}" target="_blank" title="${escapeHtml(websiteVal)}" class="result-link">${escapeHtml(displayText)}</a>`;
        websiteEl.classList.add('revealed');
      } else {
        websiteEl.textContent = 'Not found';
        websiteEl.classList.add('not-found');
      }
      const websiteChip = websiteEl.parentElement.querySelector('.confidence-chip');
      if (websiteChip) {
        websiteChip.textContent = websiteVal ? '100%' : '-';
        websiteChip.className = 'confidence-chip ' + (websiteVal ? 'high' : 'low');
      }
    }

    if (locationEl) {
      locationEl.className = 'result-value';
      if (locationVal) {
        locationEl.textContent = locationVal;
        locationEl.classList.add('revealed');
      } else {
        locationEl.textContent = 'Not found';
        locationEl.classList.add('not-found');
      }
      const locationChip = locationEl.parentElement.querySelector('.confidence-chip');
      if (locationChip) {
        locationChip.textContent = locationVal ? '85%' : '-';
        locationChip.className = 'confidence-chip ' + (locationVal ? 'medium' : 'low');
      }
    }

    const connections = extracted.related_connections || [];
    const connectionsSection = document.getElementById('connections-section');
    const connectionsList = document.getElementById('connections-list');
    
    if (connections.length > 0 && connectionsSection && connectionsList) {
      connectionsSection.style.display = 'block';
      connectionsList.innerHTML = connections.slice(0, 5).map(conn => {
        const name = typeof conn === 'string' ? conn : (conn.name || conn);
        const role = typeof conn === 'object' && conn.role ? conn.role : '';
        return `<div class="connection-item">
          <div class="connection-avatar">${name.charAt(0).toUpperCase()}</div>
          <div class="connection-info">
            <div class="connection-name">${escapeHtml(name)}</div>
            ${role ? `<div class="connection-role">${escapeHtml(role)}</div>` : ''}
          </div>
        </div>`;
      }).join('');
    } else if (connectionsSection) {
      connectionsSection.style.display = 'none';
    }

    const hasSensitiveData = emailVal || phoneVal;
    if (hasSensitiveData) {
      document.getElementById('btn-reveal-contact').style.display = 'flex';
      document.getElementById('btn-add-to-capture').style.display = 'none';
    } else {
      document.getElementById('btn-reveal-contact').style.display = 'none';
      document.getElementById('btn-add-to-capture').style.display = 'flex';
    }

    deepSearchState.currentResult = {
      name: displayName,
      title: displayTitle,
      company: displayCompany,
      email: extracted.email || '',
      phone: extracted.phone || '',
      linkedin: extracted.linkedin || '',
      twitter: extracted.twitter || '',
      website: extracted.website || '',
      location_city: extracted.location_city || '',
      location_country: extracted.location_country || '',
      related_connections: extracted.related_connections || [],
      confidence: extracted.confidence || 'LOW',
      sources: extracted.sources || searchResults.map(r => r.url),
      searchedAt: new Date().toISOString()
    };

    results.style.display = 'block';
    terminal.style.display = 'none';

  } catch (error) {
    console.error('Deep search error:', error);
    addTerminalLog(logsContainer, `✗ Error: ${error.message || 'Network error'}`, 'error', progressBar, 100);
  }

  searchBtn.disabled = false;
  searchBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
    Start Deep Search
  `;
  
  deepSearchState.isSearching = false;
}

function revealContactInfo() {
  if (!deepSearchState.currentResult) return;

  document.getElementById('result-email').textContent = deepSearchState.currentResult.email;
  document.getElementById('result-phone').textContent = deepSearchState.currentResult.phone;
  document.getElementById('result-linkedin').textContent = deepSearchState.currentResult.linkedin;

  document.querySelectorAll('.result-value').forEach(el => {
    el.classList.remove('blurred');
    el.classList.add('revealed');
  });

  document.getElementById('btn-reveal-contact').style.display = 'none';
  document.getElementById('btn-add-to-capture').style.display = 'flex';

  deepSearchState.history.unshift({
    ...deepSearchState.currentResult,
    revealedAt: new Date().toISOString()
  });
  
  if (deepSearchState.history.length > 20) {
    deepSearchState.history.pop();
  }
  
  saveSearchHistory();
  renderSearchHistory();
  
  showToast(t('toasts.contactRevealed'), 'success');
}

function addToCapture() {
  // Non-destructive autofill: only fills empty fields, never overwrites user edits
  if (!deepSearchState.currentResult) return;

  const r = deepSearchState.currentResult;
  
  // Single-value fields: only fill if empty
  setIfEmpty('investor-name', r.name);
  setIfEmpty('job-title', r.title);
  setIfEmpty('firm-name', r.company);
  setIfEmpty('location-city', r.location_city);
  setIfEmpty('location-country', r.location_country);
  
  // LinkedIn/website: only fill if empty
  if (r.linkedin) {
    const linkedinUrl = r.linkedin.startsWith('http') ? r.linkedin : `https://${r.linkedin}`;
    setIfEmpty('linkedin-url', linkedinUrl);
  }
  if (r.website) {
    setIfEmpty('website', r.website);
  }
  
  // Emails: merge (union + dedupe)
  const incomingEmails = r.email ? [r.email] : [];
  if (incomingEmails.length > 0) {
    mergeEmailsIntoForm(incomingEmails);
  }
  
  // Phones: merge (union + dedupe)
  const incomingPhones = r.phone ? [r.phone] : [];
  if (incomingPhones.length > 0) {
    mergePhonesIntoForm(incomingPhones);
  }
  
  // Notes: append (never overwrite)
  let notes = '';
  if (r.twitter) notes += `Twitter: ${r.twitter}\n`;
  if (r.sources && r.sources.length > 0) {
    notes += `Sources:\n${r.sources.slice(0, 3).join('\n')}\n`;
  }
  if (r.related_connections && r.related_connections.length > 0) {
    notes += `\nRelated Connections:\n`;
    r.related_connections.forEach(conn => {
      notes += `- ${conn.name} (${conn.role}) - ${conn.relationship}\n`;
    });
  }
  if (notes) {
    const existingNotes = document.getElementById('notes').value;
    document.getElementById('notes').value = existingNotes ? `${existingNotes}\n\n${notes}` : notes;
  }
  
  // Confidence: only set if empty
  const confidenceMap = { 'HIGH': 'HIGH', 'MEDIUM': 'MEDIUM', 'LOW': 'LOW' };
  setIfEmpty('confidence', confidenceMap[r.confidence] || 'MEDIUM');

  switchTab('capture');
  showToast('Added to capture form', 'success');
}


function createOrganizationFromCompanyInfo(companyInfo, sourceUrls = []) {
  if (!companyInfo) return null;
  
  // Try to extract city/country from address
  let hqCity = '';
  let hqCountry = '';
  const address = companyInfo.company_address || '';
  if (address) {
    const parts = address.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      hqCity = parts[parts.length - 2] || '';
      hqCountry = parts[parts.length - 1] || '';
    } else if (parts.length === 1) {
      hqCountry = parts[0];
    }
  }
  
  return {
    id: `org_${Date.now()}`,
    entity_type: 'organization',
    org_name: companyInfo.company_name || '',
    website: companyInfo.company_website || '',
    emails: companyInfo.company_emails || [],
    phones: companyInfo.company_phones || [],
    linkedin_url: companyInfo.company_linkedin || '',
    hq_city: hqCity,
    hq_country: hqCountry,
    description: companyInfo.company_description || '',
    source_urls: sourceUrls,
    captured_at: new Date().toISOString(),
    review_status: 'accepted'
  };
}

// Arabic to Latin transliteration map
const arabicToLatin = {
  'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th',
  'ج': 'j', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z',
  'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
  'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'a', 'ء': '', 'ئ': 'e',
  'ؤ': 'o', 'ً': '', 'ٌ': '', 'ٍ': '', 'َ': '', 'ُ': '', 'ِ': '', 'ّ': '', 'ْ': ''
};

function transliterateArabicLocal(text) {
  if (!text) return '';
  let result = '';
  for (const char of text) {
    result += arabicToLatin[char] || char;
  }
  return result.toLowerCase().replace(/\s+/g, ' ').trim();
}

function generateEmailCandidatesLocal(fullName, domain, source = 'company_domain') {
  if (!fullName || !domain) return [];
  
  const latinName = transliterateArabicLocal(fullName);
  const parts = latinName.split(' ').filter(p => p.length > 0);
  
  if (parts.length === 0) return [];
  
  const firstName = parts[0].replace(/[^a-z]/g, '');
  const lastName = parts.length > 1 ? parts[parts.length - 1].replace(/[^a-z]/g, '') : '';
  
  if (!firstName) return [];
  
  const candidates = [
    { email: `${firstName}@${domain}`, source, confidence: 'medium', verified: null }
  ];
  
  if (lastName) {
    candidates.push(
      { email: `${firstName}.${lastName}@${domain}`, source, confidence: 'high', verified: null },
      { email: `${firstName}${lastName}@${domain}`, source, confidence: 'medium', verified: null },
      { email: `${firstName[0]}${lastName}@${domain}`, source, confidence: 'medium', verified: null },
      { email: `${firstName[0]}.${lastName}@${domain}`, source, confidence: 'low', verified: null },
      { email: `${lastName}.${firstName}@${domain}`, source, confidence: 'low', verified: null }
    );
  }
  
  const uniqueEmails = [...new Set(candidates.map(c => c.email))];
  return uniqueEmails.map(email => candidates.find(c => c.email === email));
}

function extractDomainFromCompanyInfo(companyInfo) {
  // Try company emails first
  if (companyInfo?.company_emails?.length > 0) {
    const email = companyInfo.company_emails[0];
    if (email && email.includes('@')) {
      return email.split('@')[1];
    }
  }
  // Fallback to website
  if (companyInfo?.company_website) {
    try {
      const url = new URL(companyInfo.company_website.startsWith('http') ? 
        companyInfo.company_website : `https://${companyInfo.company_website}`);
      return url.hostname.replace(/^www\./, '');
    } catch (e) {
      return null;
    }
  }
  return null;
}

function renderCompanyInfo() {
  const container = document.getElementById('company-info-container');
  const info = scraperState.companyInfo;
  
  if (!info || (!info.company_name && !info.company_emails?.length)) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'block';
  
  const emailsHtml = (info.company_emails || []).map(e => 
    `<div class="company-info-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      <a href="mailto:${escapeHtml(e)}">${escapeHtml(e)}</a>
    </div>`
  ).join('');
  
  const phonesHtml = (info.company_phones || []).map(p => 
    `<div class="company-info-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"></path></svg>
      ${escapeHtml(p)}
    </div>`
  ).join('');
  
  const addressHtml = info.company_address ? 
    `<div class="company-info-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      ${escapeHtml(info.company_address)}
    </div>` : '';
  
  const websiteHtml = info.company_website ? 
    `<div class="company-info-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      <a href="${escapeHtml(info.company_website)}" target="_blank">${escapeHtml(info.company_website)}</a>
    </div>` : '';
  
  const linkedinHtml = info.company_linkedin ? 
    `<div class="company-info-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      <a href="${escapeHtml(info.company_linkedin)}" target="_blank">LinkedIn</a>
    </div>` : '';
  
  container.innerHTML = `
    <div class="company-info-card" style="cursor: pointer;">
      <div class="company-info-header">
        <div class="company-info-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div class="company-info-name">${escapeHtml(info.company_name || t('scraper.companyInfo'))}</div>
        <div class="company-info-arrow" style="margin-left: auto; color: #64748b;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
      <div class="company-info-details">
        ${emailsHtml}
        ${phonesHtml}
        ${websiteHtml}
        ${linkedinHtml}
        ${addressHtml}
      </div>
      ${info.company_description ? `<div style="margin-top: 8px; font-size: 12px; color: #94a3b8;">${escapeHtml(info.company_description)}</div>` : ''}
    </div>
  `;
  
  // Add click handler to open org drawer
  const card = container.querySelector('.company-info-card');
  if (card) {
    card.addEventListener('click', (e) => {
      // Don't open drawer if clicking on a link
      if (e.target.tagName === 'A') return;
      openOrgDrawer();
    });
  }
}

function onCardClick(profileId) {
  try {
    const index = typeof profileId === 'number' ? profileId : parseInt(profileId);
    const investor = scraperState.foundInvestors.find(inv => inv._index === index);
    
    if (!investor) {
      console.error(`Profile not found: index=${index}`);
      showToast(t('messages.error') + ': Profile not found. Please retry.', 'error');
      return;
    }
    
    openReviewDrawer(index);
  } catch (error) {
    console.error('Error opening profile:', error);
    showToast(t('messages.error') + ': Could not open profile. Please retry.', 'error');
  }
}

function openReviewDrawer(index) {
  try {
    const investor = scraperState.foundInvestors.find(inv => inv._index === index);
    
    if (!investor) {
      console.error(`openReviewDrawer: Investor not found at index ${index}`);
      showToast(t('messages.error') + ': Profile data not found', 'error');
      return;
    }
    
    scraperState.selectedInvestorIndex = index;
    
    document.getElementById('drawer-name').value = investor.full_name || investor.name || '';
    document.getElementById('drawer-title').value = investor.job_title || '';
    document.getElementById('drawer-firm').value = investor.organization_name || investor.firm_name || '';
    document.getElementById('drawer-investor-type').value = investor.investor_type || '';
    document.getElementById('drawer-entity-type').value = investor.entity_type || 'investor';
    document.getElementById('drawer-source-url').value = (investor.source_urls && investor.source_urls[0]) || investor.source_url || '';
    document.getElementById('drawer-email').value = (investor.emails && investor.emails[0]) || investor.email || '';
    document.getElementById('drawer-phone').value = (investor.phones && investor.phones[0]) || investor.phone || '';
    document.getElementById('drawer-linkedin').value = investor.linkedin_url || investor.linkedin || '';
    document.getElementById('drawer-website').value = investor.website || '';
    document.getElementById('drawer-city').value = investor.city || investor.location_city || '';
    document.getElementById('drawer-country').value = investor.country || investor.location_country || '';
    document.getElementById('drawer-notes').value = investor.notes || '';
    document.getElementById('drawer-confidence').value = investor.confidence_score || investor.confidence || 'MEDIUM';
    
    const rawData = investor.raw_capture || investor;
    document.getElementById('drawer-raw-json').textContent = JSON.stringify(rawData, null, 2);
    document.getElementById('drawer-raw-json').style.display = 'none';
    document.getElementById('drawer-raw-toggle').classList.remove('expanded');
    
    // Handle email candidates
    const predictedSection = document.getElementById('predicted-emails-section');
    const predictedList = document.getElementById('predicted-emails-list');
    
    if (investor.email_candidates && investor.email_candidates.length > 0) {
      predictedSection.style.display = 'block';
      predictedList.innerHTML = investor.email_candidates.map((candidate, idx) => {
        const emailObj = typeof candidate === 'string' ? { email: candidate, verified: null, source: 'company_domain', confidence: 'medium' } : candidate;
        const statusClass = emailObj.verified === true ? 'verified' : 
                           emailObj.verified === false ? 'invalid' : 'pending';
        const statusText = emailObj.verified === true ? t('drawer.verified') : 
                          emailObj.verified === false ? t('drawer.invalid') : t('drawer.pending');
        const confidenceClass = emailObj.confidence || 'medium';
        const sourceLabel = emailObj.source === 'learned_pattern' ? t('drawer.learnedPattern') : 
                           emailObj.source === 'linkedin' ? 'LinkedIn' : 
                           emailObj.source === 'website' ? t('labels.website') : t('drawer.companyDomain');
        return `
          <div class="email-candidate-item" data-email="${escapeHtml(emailObj.email)}" data-idx="${idx}">
            <div class="email-candidate-main">
              <span class="email-candidate-text">${escapeHtml(emailObj.email)}</span>
              <span class="email-status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="email-candidate-meta">
              <span class="email-source">${sourceLabel}</span>
              <span class="email-confidence confidence-${confidenceClass}">${emailObj.confidence || 'medium'}</span>
              <button class="use-email-btn" data-email="${escapeHtml(emailObj.email)}">${t('drawer.useThisEmail')}</button>
            </div>
          </div>
        `;
      }).join('');
      
      // Add click handlers for "Use this email" buttons
      predictedList.querySelectorAll('.use-email-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const email = btn.dataset.email;
          document.getElementById('drawer-email').value = email;
          predictedList.querySelectorAll('.email-candidate-item').forEach(i => i.classList.remove('selected'));
          btn.closest('.email-candidate-item').classList.add('selected');
          showToast(t('drawer.emailSelected'), 'success');
        });
      });
    } else {
      predictedSection.style.display = 'none';
    }
    
    // Show org checkbox if company info exists and org not yet captured
    const orgCheckboxContainer = document.getElementById('drawer-org-checkbox-container');
    if (scraperState.companyInfo && scraperState.companyInfo.company_name && !scraperState.capturedOrganization) {
      orgCheckboxContainer.style.display = 'block';
      document.getElementById('drawer-capture-org').checked = true;
    } else {
      orgCheckboxContainer.style.display = 'none';
    }
    
    document.getElementById('review-drawer-overlay').classList.add('active');
    document.getElementById('review-drawer').classList.add('active');
    
  } catch (error) {
    console.error('Error opening review drawer:', error);
    showToast(t('messages.error') + ': Failed to load profile data', 'error');
  }
}

function closeReviewDrawer() {
  document.getElementById('review-drawer-overlay').classList.remove('active');
  document.getElementById('review-drawer').classList.remove('active');
  scraperState.selectedInvestorIndex = null;
}

function openOrgDrawer() {
  const org = scraperState.capturedOrganization || (scraperState.companyInfo ? createOrganizationFromCompanyInfo(scraperState.companyInfo, []) : null);
  
  if (!org && !scraperState.companyInfo) {
    showToast(t('messages.error') + ': No organization data', 'error');
    return;
  }
  
  // Use companyInfo if no captured org yet
  const data = org || scraperState.companyInfo;
  
  document.getElementById('org-drawer-name').value = data.org_name || data.company_name || '';
  document.getElementById('org-drawer-website').value = data.website || data.company_website || '';
  document.getElementById('org-drawer-linkedin').value = data.linkedin_url || data.company_linkedin || '';
  document.getElementById('org-drawer-emails').value = (data.emails || data.company_emails || []).join(', ');
  document.getElementById('org-drawer-phones').value = (data.phones || data.company_phones || []).join(', ');
  document.getElementById('org-drawer-city').value = data.hq_city || '';
  document.getElementById('org-drawer-country').value = data.hq_country || '';
  document.getElementById('org-drawer-description').value = data.description || data.company_description || '';
  
  // Show JSON
  const jsonData = scraperState.capturedOrganization || scraperState.companyInfo || {};
  document.getElementById('org-drawer-raw-json').textContent = JSON.stringify(jsonData, null, 2);
  document.getElementById('org-drawer-raw-json').style.display = 'none';
  
  document.getElementById('org-drawer-overlay').classList.add('active');
  document.getElementById('org-drawer').classList.add('active');
}

function closeOrgDrawer() {
  document.getElementById('org-drawer-overlay').classList.remove('active');
  document.getElementById('org-drawer').classList.remove('active');
}

function saveOrgFromDrawer() {
  // Get values from form
  const orgData = {
    id: scraperState.capturedOrganization?.id || `org_${Date.now()}`,
    entity_type: 'organization',
    org_name: document.getElementById('org-drawer-name').value,
    website: document.getElementById('org-drawer-website').value,
    linkedin_url: document.getElementById('org-drawer-linkedin').value,
    emails: document.getElementById('org-drawer-emails').value.split(',').map(e => e.trim()).filter(Boolean),
    phones: document.getElementById('org-drawer-phones').value.split(',').map(p => p.trim()).filter(Boolean),
    hq_city: document.getElementById('org-drawer-city').value,
    hq_country: document.getElementById('org-drawer-country').value,
    description: document.getElementById('org-drawer-description').value,
    source_urls: scraperState.capturedOrganization?.source_urls || [],
    captured_at: scraperState.capturedOrganization?.captured_at || new Date().toISOString(),
    review_status: 'accepted'
  };
  
  scraperState.capturedOrganization = orgData;
  
  // Also update companyInfo for merge purposes
  scraperState.companyInfo = {
    ...scraperState.companyInfo,
    company_name: orgData.org_name,
    company_website: orgData.website,
    company_linkedin: orgData.linkedin_url,
    company_emails: orgData.emails,
    company_phones: orgData.phones,
    company_description: orgData.description
  };
  
  closeOrgDrawer();
  renderAcceptedCaptures();
  showToast(t('drawer.orgCaptured'), 'success');
}

function toggleOrgRawJson() {
  const rawJsonEl = document.getElementById('org-drawer-raw-json');
  const toggleEl = document.getElementById('org-drawer-raw-toggle');
  
  if (rawJsonEl.style.display === 'none') {
    rawJsonEl.style.display = 'block';
    toggleEl.classList.add('expanded');
  } else {
    rawJsonEl.style.display = 'none';
    toggleEl.classList.remove('expanded');
  }
}

function toggleRawJson() {
  const rawJsonEl = document.getElementById('drawer-raw-json');
  const toggleEl = document.getElementById('drawer-raw-toggle');
  
  if (rawJsonEl.style.display === 'none') {
    rawJsonEl.style.display = 'block';
    toggleEl.classList.add('expanded');
  } else {
    rawJsonEl.style.display = 'none';
    toggleEl.classList.remove('expanded');
  }
}

async function verifyPredictedEmails() {
  if (scraperState.selectedInvestorIndex === null) return;
  
  const idx = scraperState.selectedInvestorIndex;
  const investor = scraperState.foundInvestors.find(inv => inv._index === idx);
  
  if (!investor || !investor.email_candidates || investor.email_candidates.length === 0) {
    showToast('No predicted emails to verify', 'info');
    return;
  }
  
  const verifyBtn = document.getElementById('verify-emails-btn');
  verifyBtn.disabled = true;
  verifyBtn.innerHTML = '<span class="email-status-badge checking">Verifying...</span>';
  
  const emails = investor.email_candidates.map(e => typeof e === 'string' ? e : e.email);
  
  try {
    const settings = await loadSettings();
    const response = await fetch(`${settings.apiEndpoint}/api/verify-emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({ emails })
    });
    
    const data = await response.json();
    
    if (data.success && data.results) {
      // Preserve source and confidence, update verified status
      investor.email_candidates = investor.email_candidates.map(candidate => {
        const result = data.results.find(r => r.email === candidate.email);
        return {
          ...candidate,
          verified: result ? result.valid : null,
          deliverable: result ? result.deliverable : null
        };
      });
      
      // Re-render the email candidates list
      const predictedList = document.getElementById('predicted-emails-list');
      predictedList.innerHTML = investor.email_candidates.map((candidate, i) => {
        const statusClass = candidate.verified === true ? 'verified' : 
                           candidate.verified === false ? 'invalid' : 'pending';
        const statusText = candidate.verified === true ? t('drawer.verified') : 
                          candidate.verified === false ? t('drawer.invalid') : t('drawer.pending');
        const confidenceClass = candidate.confidence || 'medium';
        const sourceLabel = candidate.source === 'learned_pattern' ? t('drawer.learnedPattern') : 
                           candidate.source === 'linkedin' ? 'LinkedIn' : 
                           candidate.source === 'website' ? t('labels.website') : t('drawer.companyDomain');
        return `
          <div class="email-candidate-item" data-email="${escapeHtml(candidate.email)}" data-idx="${i}">
            <div class="email-candidate-main">
              <span class="email-candidate-text">${escapeHtml(candidate.email)}</span>
              <span class="email-status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="email-candidate-meta">
              <span class="email-source">${sourceLabel}</span>
              <span class="email-confidence confidence-${confidenceClass}">${candidate.confidence || 'medium'}</span>
              <button class="use-email-btn" data-email="${escapeHtml(candidate.email)}">${t('drawer.useThisEmail')}</button>
            </div>
          </div>
        `;
      }).join('');
      
      // Re-add click handlers for "Use this email" buttons
      predictedList.querySelectorAll('.use-email-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const email = btn.dataset.email;
          document.getElementById('drawer-email').value = email;
          predictedList.querySelectorAll('.email-candidate-item').forEach(i => i.classList.remove('selected'));
          btn.closest('.email-candidate-item').classList.add('selected');
          showToast(t('drawer.emailSelected'), 'success');
        });
      });
      
      // Show summary of verification results
      const validCount = investor.email_candidates.filter(e => e.verified === true).length;
      if (validCount > 0) {
        showToast(`${validCount} verified email(s) found`, 'success');
      } else {
        showToast('No verified emails found', 'info');
      }
    }
  } catch (error) {
    console.error('Email verification error:', error);
    showToast('Verification failed', 'error');
  }
  
  verifyBtn.disabled = false;
  verifyBtn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span data-i18n="drawer.verifyAll">Verify All</span>
  `;
}

// Pattern learning - store accepted email patterns per domain
async function learnEmailPattern(email, fullName) {
  if (!email || !fullName || !email.includes('@')) return;
  
  const domain = email.split('@')[1];
  const localPart = email.split('@')[0].toLowerCase();
  const nameParts = fullName.toLowerCase().split(' ').filter(p => p.length > 0);
  
  if (nameParts.length === 0) return;
  
  const firstName = nameParts[0].replace(/[^a-z]/g, '');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].replace(/[^a-z]/g, '') : '';
  
  let pattern = 'unknown';
  
  if (localPart === firstName) {
    pattern = 'first';
  } else if (localPart === `${firstName}.${lastName}`) {
    pattern = 'first.last';
  } else if (localPart === `${firstName}${lastName}`) {
    pattern = 'firstlast';
  } else if (lastName && localPart === `${firstName[0]}${lastName}`) {
    pattern = 'flast';
  } else if (lastName && localPart === `${firstName[0]}.${lastName}`) {
    pattern = 'f.last';
  } else if (lastName && localPart === `${lastName}.${firstName}`) {
    pattern = 'last.first';
  }
  
  if (pattern !== 'unknown') {
    try {
      const stored = await new Promise(resolve => {
        chrome.storage.local.get(['ALKNZ_EMAIL_PATTERNS'], result => {
          resolve(result['ALKNZ_EMAIL_PATTERNS'] || {});
        });
      });
      
      if (!stored[domain]) {
        stored[domain] = { patterns: {}, count: 0 };
      }
      stored[domain].patterns[pattern] = (stored[domain].patterns[pattern] || 0) + 1;
      stored[domain].count++;
      
      await new Promise(resolve => {
        chrome.storage.local.set({ 'ALKNZ_EMAIL_PATTERNS': stored }, resolve);
      });
      
      console.log(`Learned email pattern: ${domain} -> ${pattern}`);
    } catch (e) {
      console.error('Error saving email pattern:', e);
    }
  }
}

function acceptFromDrawer() {
  if (scraperState.selectedInvestorIndex === null) return;
  
  const idx = scraperState.selectedInvestorIndex;
  const investorIndex = scraperState.foundInvestors.findIndex(inv => inv._index === idx);
  
  if (investorIndex === -1) {
    console.error('acceptFromDrawer: Investor not found with _index', idx);
    return;
  }
  
  const updatedName = document.getElementById('drawer-name').value;
  const updatedEmail = document.getElementById('drawer-email').value;
  const updatedPhone = document.getElementById('drawer-phone').value;
  const updatedWebsite = document.getElementById('drawer-website').value;
  const updatedCity = document.getElementById('drawer-city').value;
  const updatedCountry = document.getElementById('drawer-country').value;
  const updatedSourceUrl = document.getElementById('drawer-source-url').value;
  
  // Handle organization capture separately (no merge - keep person and org separate)
  const captureOrgCheckbox = document.getElementById('drawer-capture-org');
  if (captureOrgCheckbox && captureOrgCheckbox.checked && scraperState.companyInfo && !scraperState.capturedOrganization) {
    const sourceUrls = scraperState.foundInvestors
      .filter(inv => inv.source_urls && inv.source_urls.length > 0)
      .flatMap(inv => inv.source_urls);
    scraperState.capturedOrganization = createOrganizationFromCompanyInfo(scraperState.companyInfo, [...new Set(sourceUrls)]);
  }
  
  // Get existing investor data for emails/phones arrays
  const existingInvestor = scraperState.foundInvestors[investorIndex];
  
  // Build emails array - start with drawer value, then add existing emails
  let emails = [];
  if (updatedEmail) emails.push(updatedEmail);
  if (existingInvestor.emails) {
    existingInvestor.emails.forEach(e => {
      if (e && !emails.includes(e)) emails.push(e);
    });
  }
  
  // Build phones array - start with drawer value, then add existing phones
  let phones = [];
  if (updatedPhone) phones.push(updatedPhone);
  if (existingInvestor.phones) {
    existingInvestor.phones.forEach(p => {
      if (p && !phones.includes(p)) phones.push(p);
    });
  }
  
  // Link to organization if captured (but don't merge data)
  const org = scraperState.capturedOrganization;
  
  scraperState.foundInvestors[investorIndex] = {
    ...scraperState.foundInvestors[investorIndex],
    name: updatedName,
    full_name: updatedName,
    job_title: document.getElementById('drawer-title').value,
    firm_name: document.getElementById('drawer-firm').value,
    organization_name: document.getElementById('drawer-firm').value,
    investor_type: document.getElementById('drawer-investor-type').value,
    entity_type: document.getElementById('drawer-entity-type').value,
    source_url: updatedSourceUrl,
    source_urls: [updatedSourceUrl].filter(Boolean),
    emails: emails,
    phones: phones,
    linkedin: document.getElementById('drawer-linkedin').value,
    linkedin_url: document.getElementById('drawer-linkedin').value,
    website: updatedWebsite,
    location_city: updatedCity,
    city: updatedCity,
    location_country: updatedCountry,
    country: updatedCountry,
    notes: document.getElementById('drawer-notes').value,
    confidence: document.getElementById('drawer-confidence').value,
    confidence_score: document.getElementById('drawer-confidence').value,
    review_status: 'accepted',
    org_id: org ? org.id : null
  };
  
  // Link person to organization (reference only, no data merge)
  if (org) {
    scraperState.foundInvestors[investorIndex].org_id = org.id;
  }
  
  // Learn from accepted email pattern
  learnEmailPattern(updatedEmail, updatedName);
  
  closeReviewDrawer();
  renderScraperResults();
  renderAcceptedCaptures();
  
  // Populate Capture form with accepted investor data and switch to Capture tab
  const acceptedInvestor = scraperState.foundInvestors[investorIndex];
  setFormData({
    investor_name: acceptedInvestor.name || acceptedInvestor.full_name || '',
    investor_type: acceptedInvestor.investor_type || '',
    job_title: acceptedInvestor.job_title || '',
    firm_name: acceptedInvestor.firm_name || acceptedInvestor.organization_name || '',
    location_city: acceptedInvestor.location_city || acceptedInvestor.city || '',
    location_country: acceptedInvestor.location_country || acceptedInvestor.country || '',
    website: acceptedInvestor.website || '',
    emails: acceptedInvestor.emails || [],
    phones: acceptedInvestor.phones || [],
    whatsapp: acceptedInvestor.whatsapp || '',
    notes: acceptedInvestor.notes || '',
    confidence: acceptedInvestor.confidence || 'MEDIUM',
    source_url: acceptedInvestor.source_url || (acceptedInvestor.source_urls && acceptedInvestor.source_urls[0]) || ''
  });
  
  // Also populate org form if organization was captured
  if (scraperState.capturedOrganization) {
    setOrgFormData(scraperState.capturedOrganization);
  }
  
  // Switch to Capture tab so user can edit and save/upload
  switchTab('capture');
  showToast(t('drawer.accepted') + ' - ' + t('scraper.addedToCapture'), 'success');
}

function rejectFromDrawer() {
  if (scraperState.selectedInvestorIndex === null) return;
  
  const idx = scraperState.selectedInvestorIndex;
  const investor = scraperState.foundInvestors.find(inv => inv._index === idx);
  
  if (!investor) {
    console.error('rejectFromDrawer: Investor not found with _index', idx);
    return;
  }
  
  investor.review_status = 'rejected';
  
  closeReviewDrawer();
  renderScraperResults();
  renderAcceptedCaptures();
  showToast(t('drawer.rejected'), 'info');
}

function updateUrlCount() {
  const textarea = document.getElementById('scraper-urls');
  const counter = document.getElementById('url-count');
  const counterContainer = counter?.parentElement;
  
  if (!textarea || !counter) return;
  
  const urls = textarea.value
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.length > 0 && (u.startsWith('http://') || u.startsWith('https://')));
  
  counter.textContent = urls.length;
  
  if (counterContainer) {
    counterContainer.classList.remove('warning', 'error');
    if (urls.length > 25) {
      counterContainer.classList.add('error');
    } else if (urls.length > 20) {
      counterContainer.classList.add('warning');
    }
  }
}

function addScraperLog(container, text, type, progressBar, progress) {
  const logEl = document.createElement('div');
  logEl.className = `terminal-log ${type}`;
  logEl.textContent = text;
  container.appendChild(logEl);
  container.scrollTop = container.scrollHeight;
  if (progressBar && progress !== undefined) {
    progressBar.style.width = `${progress}%`;
  }
}

async function startBatchScraper() {
  const urlsTextarea = document.getElementById('scraper-urls');
  const focus = document.getElementById('scraper-focus')?.value || 'investors';
  
  const urls = urlsTextarea.value
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.length > 0 && (u.startsWith('http://') || u.startsWith('https://')));
  
  if (urls.length === 0) {
    showToast(t('scraper.enterUrl'), 'error');
    return;
  }
  
  if (urls.length > 25) {
    showToast(t('scraper.maxUrls'), 'error');
    return;
  }
  
  if (scraperState.isScanning) return;
  scraperState.isScanning = true;
  
  const terminal = document.getElementById('scraper-terminal');
  const results = document.getElementById('scraper-results');
  const logsContainer = document.getElementById('scraper-logs');
  const progressBar = document.getElementById('scraper-progress-bar');
  const scraperBtn = document.getElementById('btn-start-scraper');
  
  scraperBtn.disabled = true;
  scraperBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
    ${t('scraper.scraping')}
  `;
  
  terminal.style.display = 'block';
  results.style.display = 'none';
  logsContainer.innerHTML = '';
  progressBar.style.width = '0%';
  
  const settings = await getSettings();
  
  if (!settings.backendUrl) {
    addScraperLog(logsContainer, `✗ ${t('scraper.configError')}`, 'error', progressBar, 100);
    scraperBtn.disabled = false;
    scraperBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>${t('scraper.startScrape')}`;
    scraperState.isScanning = false;
    return;
  }
  
  addScraperLog(logsContainer, `> ${t('scraper.starting')} ${urls.length} URL(s)...`, 'info', progressBar, 5);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const focusLabel = focus === 'investors' ? t('scraperOptions.investors') : focus === 'executives' ? t('scraperOptions.executives') : t('scraperOptions.contacts');
  addScraperLog(logsContainer, `> ${t('scraper.focus')}: ${focusLabel}`, 'info', progressBar, 10);
  await new Promise(resolve => setTimeout(resolve, 200));
  
  addScraperLog(logsContainer, `> ${t('scraper.initializing')}`, 'info', progressBar, 15);
  
  try {
    // Try v1 endpoint first; fall back to legacy
    const scrapeBody = JSON.stringify({ urls: urls, focus: focus });
    const scrapeHeaders = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` };
    let response = await fetch(`${settings.backendUrl}/api/v1/scrape`, {
      method: 'POST', headers: scrapeHeaders, body: scrapeBody
    }).catch(() => null);
    if (!response || response.status === 404) {
      response = await fetch(`${settings.backendUrl}/api/batch-scrape`, {
        method: 'POST', headers: scrapeHeaders, body: scrapeBody
      });
    }
    
    addScraperLog(logsContainer, `> ${t('scraper.crawlingPages')}`, 'info', progressBar, 40);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const result = await response.json();
    
    if (!response.ok || result.success === false) {
      addScraperLog(logsContainer, `✗ ${result.error || 'Scraping failed'}`, 'error', progressBar, 100);
      scraperBtn.disabled = false;
      scraperBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>${t('scraper.startScrape')}`;
      scraperState.isScanning = false;
      return;
    }
    
    addScraperLog(logsContainer, `> ${t('scraper.extracting')}`, 'info', progressBar, 70);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const investors = result.data?.investors || [];
    const scrapedCount = result.data?.scraped_count || 0;
    const companyInfo = result.data?.company_info || null;
    
    addScraperLog(logsContainer, `✓ ${t('scraper.scraped')} ${scrapedCount}, ${t('scraper.found')} ${investors.length} ${t('scraper.investors')}`, 'success', progressBar, 100);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const deduped = deduplicateInvestors(investors);
    const dupesRemoved = investors.length - deduped.length;
    
    scraperState.foundInvestors = deduped.map((inv, idx) => normalizeProfile(inv, idx));
    scraperState.companyInfo = companyInfo;
    scraperState.capturedOrganization = null; // Clear old org data for new scrape
    
    // Generate email candidates on frontend for investors without emails
    const domain = extractDomainFromCompanyInfo(companyInfo);
    if (domain) {
      scraperState.foundInvestors.forEach(investor => {
        const hasEmail = investor.emails && investor.emails.length > 0 && investor.emails[0];
        const hasName = investor.full_name || investor.name;
        
        if (!hasEmail && hasName && !investor.email_candidates?.length) {
          investor.email_candidates = generateEmailCandidatesLocal(hasName, domain, 'company_domain');
        }
      });
    }
    
    scraperState.currentFilter = 'pending';
    scraperState.selectedIndices.clear();
    updateFilterTabs();
    renderCompanyInfo();
    renderScraperResults();
    
    if (dupesRemoved > 0) {
      showToast(`${dupesRemoved} ${t('selection.duplicatesRemoved')}`, 'info');
    }
    
    // Log all scraped data to server (hybrid approach - capture everything)
    logScrapedDataToServer(scraperState.foundInvestors, scraperState.companyInfo, urls, settings);
    
    terminal.style.display = 'none';
    results.style.display = 'block';
    
  } catch (error) {
    console.error('Batch scraper error:', error);
    addScraperLog(logsContainer, `✗ Error: ${error.message || 'Network error'}`, 'error', progressBar, 100);
  }
  
  scraperBtn.disabled = false;
  scraperBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    ${t('scraper.startScrape')}
  `;
  
  scraperState.isScanning = false;
}

function updateFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.filter === scraperState.currentFilter) {
      tab.classList.add('active');
    }
  });
}

function setFilter(filter) {
  scraperState.currentFilter = filter;
  scraperState.selectedIndices.clear();
  updateFilterTabs();
  renderScraperResults();
}

function getInvestorKey(inv) {
  if (inv.linkedin) return `linkedin:${inv.linkedin.toLowerCase().trim()}`;
  if (inv.source_url && inv.source_url.includes('linkedin.com')) return `linkedin:${inv.source_url.toLowerCase().trim()}`;
  
  const name = (inv.name || '').toLowerCase().trim();
  const title = (inv.job_title || '').toLowerCase().trim();
  const firm = (inv.firm_name || '').toLowerCase().trim();
  const source = (inv.source_url || '').toLowerCase().trim();
  
  return `combo:${name}|${title}|${firm}|${source}`;
}

function deduplicateInvestors(investors) {
  const seen = new Map();
  const result = [];
  
  for (const inv of investors) {
    const key = getInvestorKey(inv);
    
    if (seen.has(key)) {
      const existing = seen.get(key);
      existing.sources = existing.sources || [existing.source_url];
      if (inv.source_url && !existing.sources.includes(inv.source_url)) {
        existing.sources.push(inv.source_url);
      }
      if (!existing.email && inv.email) existing.email = inv.email;
      if (!existing.phone && inv.phone) existing.phone = inv.phone;
      if (!existing.linkedin && inv.linkedin) existing.linkedin = inv.linkedin;
      if (!existing.website && inv.website) existing.website = inv.website;
    } else {
      const copy = { ...inv, sources: [inv.source_url].filter(Boolean) };
      seen.set(key, copy);
      result.push(copy);
    }
  }
  
  return result;
}

function classifyEntityType(jobTitle, sourceUrl, firmName) {
  const title = (jobTitle || '').toLowerCase();
  const source = (sourceUrl || '').toLowerCase();
  const firm = (firmName || '').toLowerCase();
  
  const isAlknzSource = source.includes('alknzventures.com') || firm.includes('alknz');
  
  const investorKeywords = [
    'investor', 'investment', 'vc', 'venture', 'partner', 'principal', 
    'portfolio', 'fund', 'capital', 'angel', 'private equity', 'pe ',
    'managing director', 'general partner', 'limited partner', 'gp', 'lp',
    'investment manager', 'asset manager', 'wealth manager'
  ];
  
  const founderKeywords = [
    'founder', 'co-founder', 'cofounder', 'ceo', 'chief executive',
    'chairman', 'chairwoman', 'chairperson', 'president'
  ];
  
  const teamMemberKeywords = [
    'people & culture', 'people and culture', 'hr', 'human resources',
    'operations', 'admin', 'administrative', 'coordinator', 'assistant',
    'marketing', 'communications', 'pr', 'public relations', 'analyst',
    'associate', 'manager', 'director', 'head of', 'vp', 'vice president',
    'legal', 'counsel', 'finance', 'accounting', 'it', 'technology',
    'design', 'designer', 'engineer', 'developer', 'product'
  ];
  
  const hasInvestorKeyword = investorKeywords.some(k => title.includes(k));
  const hasFounderKeyword = founderKeywords.some(k => title.includes(k));
  const hasTeamMemberKeyword = teamMemberKeywords.some(k => title.includes(k));
  
  if (hasInvestorKeyword) {
    return 'investor';
  }
  
  if (hasFounderKeyword) {
    return 'founder';
  }
  
  if (isAlknzSource) {
    return 'team_member';
  }
  
  if (hasTeamMemberKeyword) {
    return 'team_member';
  }
  
  return 'other';
}

function detectLinkedIn(result) {
  if (result.linkedin) return result.linkedin;
  if (result.linkedin_url) return result.linkedin_url;
  
  const allUrls = [
    result.source_url,
    result.website,
    ...(result.sources || [])
  ].filter(Boolean);
  
  for (const url of allUrls) {
    if (url.includes('linkedin.com')) {
      return url;
    }
  }
  
  return '';
}

function mapScrapeResultToNormalized(result, index) {
  const raw = { ...result };
  
  const emails = [];
  if (raw.email) {
    if (Array.isArray(raw.email)) {
      emails.push(...raw.email.filter(Boolean));
    } else {
      emails.push(raw.email);
    }
  }
  if (raw.emails && Array.isArray(raw.emails)) {
    raw.emails.forEach(e => {
      if (e && !emails.includes(e)) emails.push(e);
    });
  }
  
  const phones = [];
  if (raw.phone) {
    if (Array.isArray(raw.phone)) {
      phones.push(...raw.phone.filter(Boolean));
    } else {
      phones.push(raw.phone);
    }
  }
  if (raw.phones && Array.isArray(raw.phones)) {
    raw.phones.forEach(p => {
      if (p && !phones.includes(p)) phones.push(p);
    });
  }
  
  const sourceUrls = [];
  if (raw.sources && Array.isArray(raw.sources)) {
    sourceUrls.push(...raw.sources.filter(Boolean));
  }
  if (raw.source_url && !sourceUrls.includes(raw.source_url)) {
    sourceUrls.unshift(raw.source_url);
  }
  if (raw.source_urls && Array.isArray(raw.source_urls)) {
    raw.source_urls.forEach(u => {
      if (u && !sourceUrls.includes(u)) sourceUrls.push(u);
    });
  }
  
  const fullName = raw.name || raw.full_name || raw.investor_name || '';
  const jobTitle = raw.job_title || raw.title || raw.role || '';
  const orgName = raw.firm_name || raw.organization_name || raw.company || raw.firm || '';
  const linkedinUrl = detectLinkedIn(raw);
  
  const entityType = raw.entity_type || classifyEntityType(jobTitle, sourceUrls[0] || '', orgName);
  
  // Handle predicted emails from server
  let predictedEmails = [];
  if (raw.email_candidates && Array.isArray(raw.email_candidates)) {
    predictedEmails = raw.email_candidates.map(e => 
      typeof e === 'string' ? { email: e, verified: null } : e
    );
  }
  
  return {
    id: `profile_${Date.now()}_${index}`,
    _index: index,
    review_status: 'pending',
    entity_type: entityType,
    
    full_name: fullName,
    job_title: jobTitle,
    organization_name: orgName,
    investor_type: raw.investor_type || '',
    
    source_urls: sourceUrls,
    linkedin_url: linkedinUrl,
    emails: emails,
    phones: phones,
    website: raw.website || '',
    
    city: raw.location_city || raw.city || '',
    country: raw.location_country || raw.country || '',
    notes: raw.notes || '',
    confidence_score: raw.confidence || raw.confidence_score || 'MEDIUM',
    captured_at: new Date().toISOString(),
    
    raw_capture: raw,
    email_candidates: predictedEmails,
    has_generic_email: raw.has_generic_email || false,
    
    name: fullName,
    email: emails[0] || '',
    phone: phones[0] || '',
    linkedin: linkedinUrl,
    firm_name: orgName,
    location_city: raw.location_city || raw.city || '',
    location_country: raw.location_country || raw.country || '',
    source_url: sourceUrls[0] || '',
    confidence: raw.confidence || raw.confidence_score || 'MEDIUM'
  };
}

function normalizeProfile(rawInvestor, index) {
  return mapScrapeResultToNormalized(rawInvestor, index);
}

function updateSelectionToolbar() {
  const toolbar = document.getElementById('selection-toolbar');
  const countEl = document.getElementById('selection-count');
  const count = scraperState.selectedIndices.size;
  
  countEl.textContent = count;
  toolbar.style.display = count > 0 ? 'flex' : 'none';
}

function toggleSelection(index, checked) {
  if (checked) {
    scraperState.selectedIndices.add(index);
  } else {
    scraperState.selectedIndices.delete(index);
  }
  
  const card = document.querySelector(`.investor-card[data-index="${index}"]`);
  if (card) {
    card.classList.toggle('selected', checked);
  }
  
  updateSelectionToolbar();
}

function selectAllVisible() {
  const filtered = scraperState.foundInvestors.filter(inv => {
    if (scraperState.currentFilter === 'all') return true;
    return inv.review_status === scraperState.currentFilter;
  });
  
  filtered.forEach(inv => {
    scraperState.selectedIndices.add(inv._index);
  });
  
  renderScraperResults();
  updateSelectionToolbar();
}

function clearSelection() {
  scraperState.selectedIndices.clear();
  renderScraperResults();
  updateSelectionToolbar();
}

function acceptSelected() {
  const count = scraperState.selectedIndices.size;
  if (count === 0) return;
  
  scraperState.selectedIndices.forEach(idx => {
    if (scraperState.foundInvestors[idx]) {
      scraperState.foundInvestors[idx].review_status = 'accepted';
    }
  });
  
  scraperState.selectedIndices.clear();
  renderScraperResults();
  renderAcceptedCaptures();
  updateSelectionToolbar();
  showToast(`${count} ${t('selection.batchAccepted')}`, 'success');
}

function rejectSelected() {
  const count = scraperState.selectedIndices.size;
  if (count === 0) return;
  
  scraperState.selectedIndices.forEach(idx => {
    if (scraperState.foundInvestors[idx]) {
      scraperState.foundInvestors[idx].review_status = 'rejected';
    }
  });
  
  scraperState.selectedIndices.clear();
  renderScraperResults();
  renderAcceptedCaptures();
  updateSelectionToolbar();
  showToast(`${count} ${t('selection.batchRejected')}`, 'info');
}

function renderScraperResults() {
  const container = document.getElementById('scraper-investors-list');
  const allInvestors = scraperState.foundInvestors;
  
  if (!allInvestors || allInvestors.length === 0) {
    container.innerHTML = `<div class="no-investors">${t('scraper.noInvestors')}</div>`;
    updateSelectionToolbar();
    return;
  }
  
  const filtered = allInvestors.filter(inv => {
    if (scraperState.currentFilter === 'all') return true;
    return inv.review_status === scraperState.currentFilter;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = `<div class="no-results-message">${t('messages.noFiltered')}</div>`;
    updateSelectionToolbar();
    return;
  }
  
  container.innerHTML = filtered.map((inv) => {
    const initial    = (inv.name || 'U').charAt(0).toUpperCase();
    const isSelected = scraperState.selectedIndices.has(inv._index);

    // Email indicator
    let emailIndicator = '<span class="email-indicator none">—</span>';
    if (inv.email) {
      const isConfirmed = inv.email_confidence === 'HIGH' || inv.email_status === 'verified';
      emailIndicator = isConfirmed
        ? `<span class="email-indicator found">📧 found</span>`
        : `<span class="email-indicator predicted">📧 predicted</span>`;
    } else if ((inv.predicted_emails || []).length > 0) {
      emailIndicator = '<span class="email-indicator predicted">📧 predicted</span>';
    }

    const statusBadge = `<span class="status-badge ${inv.review_status}">${t('filters.' + inv.review_status)}</span>`;

    // Expanded details (shown on toggle)
    const emailHtml   = inv.email     ? `<div class="batch-detail-row"><span class="batch-detail-label">Email</span><span>${escapeHtml(inv.email)}</span></div>` : '';
    const phoneHtml   = inv.phone     ? `<div class="batch-detail-row"><span class="batch-detail-label">Phone</span><span>${escapeHtml(inv.phone)}</span></div>` : '';
    const linkedinHtml = inv.linkedin ? `<div class="batch-detail-row"><span class="batch-detail-label">LinkedIn</span><a href="${escapeHtml(inv.linkedin)}" target="_blank" rel="noopener" style="color:#60a5fa;">Profile</a></div>` : '';
    const sourceHtml  = inv.source_url ? `<div class="batch-detail-row"><span class="batch-detail-label">Source</span><span style="word-break:break-all;font-size:10px;">${escapeHtml(inv.source_url)}</span></div>` : '';

    return `
      <div class="batch-result-row status-${inv.review_status}${isSelected ? ' selected' : ''}" data-index="${inv._index}">
        <div class="batch-row-main">
          <input type="checkbox" class="investor-checkbox" ${isSelected ? 'checked' : ''}>
          <div class="batch-row-avatar">${initial}</div>
          <div class="batch-row-info">
            <span class="batch-row-name">${escapeHtml(inv.name || 'Unknown')}</span>
            <span class="batch-row-title">${escapeHtml(inv.job_title || inv.firm_name || '')}</span>
          </div>
          <div class="batch-row-meta">
            ${emailIndicator}
            ${statusBadge}
          </div>
          <button class="batch-row-expand" title="Expand" aria-expanded="false">▼</button>
        </div>
        <div class="batch-row-details" style="display:none;">
          ${emailHtml}${phoneHtml}${linkedinHtml}${sourceHtml}
          <div class="batch-row-actions">
            <button class="btn btn-small btn-ghost batch-edit-btn">Edit</button>
            <button class="btn btn-small btn-success batch-accept-btn">Accept</button>
            <button class="btn btn-small btn-danger batch-reject-btn">Reject</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.batch-result-row').forEach(row => {
    const checkbox  = row.querySelector('.investor-checkbox');
    const expandBtn = row.querySelector('.batch-row-expand');
    const details   = row.querySelector('.batch-row-details');
    const index     = parseInt(row.dataset.index);

    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSelection(index, checkbox.checked);
    });

    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = details.style.display !== 'none';
      details.style.display = isOpen ? 'none' : '';
      expandBtn.textContent = isOpen ? '▼' : '▲';
      expandBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    row.querySelector('.batch-edit-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      onCardClick(index);
    });
    row.querySelector('.batch-accept-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      scraperState.foundInvestors[index].review_status = 'accepted';
      renderScraperResults();
      renderAcceptedCaptures();
    });
    row.querySelector('.batch-reject-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      scraperState.foundInvestors[index].review_status = 'rejected';
      renderScraperResults();
      renderAcceptedCaptures();
    });
  });
  
  updateSelectionToolbar();
}

function renderAcceptedCaptures() {
  const section = document.getElementById('accepted-captures-section');
  const container = document.getElementById('accepted-investors-list');
  const countEl = document.getElementById('accepted-count');
  
  const accepted = scraperState.foundInvestors.filter(inv => inv.review_status === 'accepted');
  const org = scraperState.capturedOrganization;
  
  const totalCount = accepted.length + (org ? 1 : 0);
  countEl.textContent = totalCount;
  
  if (totalCount === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  
  let html = '';
  
  // Render Organization at top if captured
  if (org) {
    html += `
      <div class="org-bundle-card">
        <div class="org-bundle-header">
          <div class="org-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="org-info">
            <div class="org-name">${escapeHtml(org.org_name || t('scraper.companyInfo'))}</div>
            <div class="org-meta">
              ${org.website ? `<span class="org-website">${escapeHtml(org.website)}</span>` : ''}
              ${org.emails && org.emails.length > 0 ? `<span class="org-email">${escapeHtml(org.emails[0])}</span>` : ''}
            </div>
          </div>
          <span class="entity-badge entity-org">${t('drawer.organization') || 'Organization'}</span>
        </div>
        ${accepted.length > 0 ? `<div class="org-people-label">${accepted.length} ${t('scraper.foundPeople') || 'people'}</div>` : ''}
      </div>
    `;
  }
  
  // Render people (linked to org or standalone)
  html += accepted.map((inv) => {
    const initial = (inv.name || 'U').charAt(0).toUpperCase();
    const linkedClass = inv.org_id ? 'linked-to-org' : '';
    
    return `
      <div class="investor-card status-accepted ${linkedClass}" data-index="${inv._index}">
        <div class="investor-header">
          <div class="investor-avatar">${initial}</div>
          <div class="investor-info">
            <div class="investor-name">${escapeHtml(inv.name || 'Unknown')}</div>
            <div class="investor-title">${escapeHtml(inv.job_title || '')}</div>
            <div class="investor-company">${escapeHtml(inv.firm_name || '')}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
  
  // Add click handler for org card - loads org data into Capture form
  const orgCard = container.querySelector('.org-bundle-card');
  if (orgCard) {
    orgCard.style.cursor = 'pointer';
    orgCard.addEventListener('click', () => {
      loadOrganizationToForm(scraperState.capturedOrganization);
    });
  }
  
  container.querySelectorAll('.investor-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      const index = parseInt(card.dataset.index);
      const investor = scraperState.foundInvestors.find(inv => inv._index === index);
      if (investor) {
        loadAcceptedInvestorToForm(investor);
      }
    });
  });
}

function loadAcceptedInvestorToForm(investor) {
  setFormData({
    investor_name: investor.name || investor.full_name || '',
    investor_type: investor.investor_type || '',
    job_title: investor.job_title || '',
    firm_name: investor.firm_name || investor.organization_name || '',
    location_city: investor.location_city || investor.city || '',
    location_country: investor.location_country || investor.country || '',
    website: investor.website || '',
    emails: investor.emails || [],
    phones: investor.phones || [],
    whatsapp: investor.whatsapp || '',
    notes: investor.notes || '',
    confidence: investor.confidence || 'MEDIUM',
    source_url: investor.source_url || (investor.source_urls && investor.source_urls[0]) || ''
  });
  
  switchTab('capture');
  showToast(t('sections.loadedToForm'), 'success');
}

function addScrapedInvestorToCapture(investor) {
  setFormData({
    investor_name: investor.name || '',
    job_title: investor.job_title || '',
    firm_name: investor.firm_name || '',
    emails: investor.emails || [],
    phones: investor.phones || [],
    website: investor.website || '',
    location_city: investor.location_city || '',
    location_country: investor.location_country || '',
    source_url: investor.source_url || '',
    investor_type: investor.investor_type || ''
  });
  
  switchTab('capture');
  showToast(t('scraper.addedToCapture'), 'success');
}


function loadOrganizationToForm(org) {
  if (!org) return;

  // Switch to Company Mode and populate the firm form
  setCaptureMode('company');
  setFirmFormData({
    org_name:     org.org_name || org.company_name || '',
    website:      org.website || '',
    linkedin_url: org.linkedin_url || '',
    hq_city:      org.hq_city || '',
    hq_country:   org.hq_country || '',
    emails:       org.emails || [],
    phones:       org.phones || [],
    description:  org.description || ''
  });
  
  switchTab('capture');
  showToast(t('sections.loadedToForm'), 'success');
}
