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
  
  // Also save draft to server for central capture
  saveDraftToServer(payload, formData.source_url);
  
  clearForm();
  showToast('Saved to ALKNZ Address Book', 'success');
}

// Log scraped data to server (capture log - hybrid approach)
async function logScrapedDataToServer(investors, companyInfo, sourceUrls, settings) {
  try {
    if (!settings?.backendUrl || !investors || investors.length === 0) return;
    
    const scrapeSessionId = `scrape_${Date.now()}`;
    const capturedBy = settings.capturedBy || settings.userEmail || 'extension_user';
    
    // Build organization object if company info exists
    let organization = null;
    if (companyInfo && companyInfo.company_name) {
      organization = {
        org_name: companyInfo.company_name,
        website: companyInfo.company_website || null,
        linkedin_url: companyInfo.company_linkedin || null,
        emails: companyInfo.company_emails || [],
        phones: companyInfo.company_phones || [],
        hq_city: '',
        hq_country: '',
        description: companyInfo.company_description || null
      };
      
      // Try to extract city/country from address
      if (companyInfo.company_address) {
        const parts = companyInfo.company_address.split(',').map(p => p.trim());
        if (parts.length >= 2) {
          organization.hq_city = parts[parts.length - 2] || '';
          organization.hq_country = parts[parts.length - 1] || '';
        } else if (parts.length === 1) {
          organization.hq_country = parts[0];
        }
      }
    }
    
    const response = await fetch(`${settings.backendUrl}/api/capture-log/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        profiles: investors.map(inv => inv.raw_capture || inv),
        organization: organization,
        captured_by: capturedBy,
        scrape_session_id: scrapeSessionId,
        source_urls: sourceUrls
      })
    });
    
    if (response.ok) {
      console.log('Scrape data logged to server successfully');
    } else {
      console.error('Failed to log scrape data to server:', await response.text());
    }
  } catch (error) {
    console.error('Error logging scrape data to server:', error);
  }
}

// Save draft to server
async function saveDraftToServer(profile, sourceUrl) {
  try {
    const settings = await getSettings();
    if (!settings?.backendUrl) return;
    
    const response = await fetch(`${settings.backendUrl}/api/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        profile: profile,
        captured_by: settings.capturedBy || settings.userEmail || 'extension_user',
        source_urls: sourceUrl ? [sourceUrl] : []
      })
    });
    
    if (response.ok) {
      console.log('Draft saved to server');
    }
  } catch (error) {
    console.error('Error saving draft to server:', error);
  }
}

async function uploadCapture() {
  // Route based on current capture mode
  if (state.captureMode === 'company') {
    await uploadFirm();
    return;
  }

  const settings = await getSettings();

  if (!settings.backendUrl) {
    showToast('Please configure Backend URL in settings', 'error');
    return;
  }

  if (!settings.capturedBy && !settings.authToken) {
    showToast('Please log in or set your email in Settings', 'error');
    return;
  }

  const formData = getFormData();

  if (!formData.investor_name.trim()) {
    showToast('Please enter a name', 'error');
    return;
  }

  // Legacy entity_type check for backward compat (before mode controller existed)
  const isOrganization = false; // now handled by mode controller above
  
  let endpoint, requestBody;

  {
    // Upload as Person (new v1 endpoint with legacy fallback)
    endpoint = `${settings.backendUrl}/api/v1/people`;
    const payload = buildPayload(formData);
    
    // Include Deep AI enrichment if available
    // This attaches the full Deep AI search results to the payload for backend storage
    payload.include_deep_ai = hasDeepAiData();
    if (hasDeepAiData()) {
      payload.enrichment = {
        deep_ai: {
          extracted: state.deepAi.extracted,
          search_results: state.deepAi.search_results || [],
          scraped_count: state.deepAi.scraped_count || 0,
          query: state.deepAi.query || null,
          additional_urls: state.deepAi.additional_urls || [],
          merged_into_form: state.deepAi.merged_into_form || false
        }
      };
    }
    
    /*
     * Final requestBody structure (with Deep AI):
     * {
     *   capture_type: 'NEW_INVESTOR',
     *   source_url: 'https://...',
     *   source_title: 'Page Title',
     *   selected_text: '...',
     *   captured_by: 'user@example.com',
     *   confidence: 'HIGH',
     *   payload: {
     *     investor_name: '...',
     *     firm_name: '...',
     *     emails: [...],
     *     phones: [...],
     *     ... other fields ...,
     *     include_deep_ai: true,
     *     enrichment: {
     *       deep_ai: {
     *         extracted: { email, phone, linkedin, ... },
     *         search_results: [...],
     *         scraped_count: 5,
     *         query: 'John Doe VC',
     *         additional_urls: [...],
     *         merged_into_form: true/false (reflects whether user clicked Merge)
     *       }
     *     }
     *   }
     * }
     */
    
    requestBody = {
      capture_type: formData.capture_type,
      source_url: formData.source_url || 'manual-entry',
      source_title: formData.source_title || 'Manual Entry',
      selected_text: formData.selected_text,
      captured_by: settings.capturedBy,
      confidence: formData.confidence,
      page_type: state.pageType,
      payload
    };
  }

  const authHeader = settings.authToken
    ? `Bearer ${settings.authToken}`
    : (settings.apiKey ? `Bearer ${settings.apiKey}` : '');

  // Conflict check: warn if another team member already captured this person
  const linkedinUrl = formData.linkedin_url || '';
  if (linkedinUrl && settings.backendUrl) {
    try {
      const lookupUrl = `${settings.backendUrl}/api/v1/people/lookup?linkedin_url=${encodeURIComponent(linkedinUrl)}`;
      const lookupResp = await fetch(lookupUrl, {
        headers: authHeader ? { 'Authorization': authHeader } : {}
      }).catch(() => null);
      if (lookupResp?.ok) {
        const lookupData = await lookupResp.json().catch(() => ({}));
        const others = (lookupData.captured_by_others || []).filter(
          o => o.name !== settings.capturedBy
        );
        if (others.length > 0) {
          const names = others.map(o => o.name).join(', ');
          showConflictWarning(`⚠️ ${names} already captured this person. Your upload will add your version.`);
        } else {
          hideConflictWarning();
        }
      }
    } catch (_) {}
  }

  try {
    // Try new v1 endpoint first; if not found (404), fall back to legacy /api/capture
    let response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(authHeader ? { 'Authorization': authHeader } : {}) },
      body: JSON.stringify(requestBody)
    }).catch(() => null);

    if (!response || response.status === 404) {
      response = await fetch(`${settings.backendUrl}/api/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(authHeader ? { 'Authorization': authHeader } : {}) },
        body: JSON.stringify(requestBody)
      });
    }

    const result = await response.json().catch(() => ({}));

    if (response.ok && (result.success || result.id || result.action)) {
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
      hideConflictWarning();
      showToast('Investor uploaded to ALKNZ Portal', 'success');
      state.editing_local_id = null;

      // Post-upload: fetch and show recommendations + next steps
      const personId = result.id || result.person_id || null;
      if (personId && settings.backendUrl) {
        fetchAndShowRecommendations(personId, settings.backendUrl, authHeader);
        fetchAndShowNextSteps(personId, settings.backendUrl, authHeader);
      }
    } else {
      showToast(`Upload failed: ${result.error || 'Unknown error'}`, 'error');
    }
  } catch (error) {
    console.error('Upload error:', error);
    showToast(`Upload failed: ${error.message}`, 'error');
  }
}

async function fetchAndShowRecommendations(personId, backendUrl, authHeader) {
  try {
    const url = `${backendUrl}/api/v1/people/${personId}/recommendations?limit=5`;
    const resp = await fetch(url, {
      headers: authHeader ? { 'Authorization': authHeader } : {}
    });
    if (!resp.ok) return;
    const data = await resp.json().catch(() => ({}));
    const recs = data.recommendations || data || [];
    if (!Array.isArray(recs) || recs.length === 0) return;
    renderRecommendationsCard(recs);
  } catch (_) {}
}

async function fetchAndShowNextSteps(personId, backendUrl, authHeader) {
  try {
    const url = `${backendUrl}/api/v1/people/${personId}/next-steps`;
    const resp = await fetch(url, {
      headers: authHeader ? { 'Authorization': authHeader } : {}
    });
    if (!resp.ok) return;
    const data = await resp.json().catch(() => ({}));
    if (!data || !data.intro_path) return;
    renderNextStepsCard(data);
  } catch (_) {}
}

function showConflictWarning(message) {
  const bar = document.getElementById('conflict-warning-bar');
  if (bar) {
    bar.textContent = message;
    bar.style.display = 'block';
  }
}

function hideConflictWarning() {
  const bar = document.getElementById('conflict-warning-bar');
  if (bar) bar.style.display = 'none';
}

function renderRecommendationsCard(recs) {
  const section = document.getElementById('section-recommendations');
  const list    = document.getElementById('recommendations-list');
  if (!section || !list) return;

  list.innerHTML = recs.map(r => {
    const name  = escapeHtml(r.person_name  || r.name  || 'Unknown');
    const title = escapeHtml(r.job_title    || r.title || '');
    const firm  = escapeHtml(r.firm_name    || r.firm  || '');
    const liUrl = r.linkedin_url || '';
    return `
      <div class="rec-item">
        <div class="rec-info">
          <span class="rec-name">${name}</span>
          ${title || firm ? `<span class="rec-meta">${[title, firm].filter(Boolean).join(' @ ')}</span>` : ''}
        </div>
        ${liUrl ? `<a href="${escapeHtml(liUrl)}" target="_blank" class="rec-link" title="View on LinkedIn">→ LI</a>` : ''}
      </div>
    `;
  }).join('');

  section.style.display = 'block';
}

function renderNextStepsCard(data) {
  const section = document.getElementById('section-next-steps');
  if (!section) return;

  const rows = [
    { label: 'Intro path',  value: data.intro_path     },
    { label: 'Key topic',   value: data.key_topic       },
    { label: 'Reference',   value: data.reference_point },
    { label: 'Timing',      value: data.timing          }
  ].filter(r => r.value);

  section.querySelector('.next-steps-body').innerHTML = rows.map(r => `
    <div class="next-step-row">
      <span class="next-step-label">${escapeHtml(r.label)}</span>
      <span class="next-step-value">${escapeHtml(r.value)}</span>
    </div>
  `).join('');

  section.style.display = 'block';

  // Auto-collapse after 12 seconds if not hovered
  const timer = setTimeout(() => {
    section.style.display = 'none';
  }, 12000);
  section.addEventListener('mouseenter', () => clearTimeout(timer), { once: true });
}

async function uploadAcceptedCaptures() {
  const settings = await getSettings();
  
  if (!settings.backendUrl) {
    showToast('Please configure Backend URL in settings', 'error');
    return;
  }
  
  const accepted = scraperState.foundInvestors.filter(inv => inv.review_status === 'accepted');
  const org = scraperState.capturedOrganization;
  
  if (accepted.length === 0 && !org) {
    showToast('No accepted captures to upload', 'info');
    return;
  }
  
  const btn = document.getElementById('btn-upload-accepted');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
    ${t('buttons.uploading')}
  `;
  
  let successCount = 0;
  let errorCount = 0;
  
  try {
    // Upload organization first if exists
    if (org) {
      try {
        const orgResponse = await fetch(`${settings.backendUrl}/api/organizations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.apiKey}`
          },
          body: JSON.stringify({
            org_name: org.org_name,
            website: org.website,
            linkedin_url: org.linkedin_url,
            emails: org.emails || [],
            phones: org.phones || [],
            hq_city: org.hq_city,
            hq_country: org.hq_country,
            description: org.description,
            source_urls: org.source_urls || []
          })
        });
        
        if (orgResponse.ok) {
          const orgResult = await orgResponse.json();
          // Store org_id for linking investors
          scraperState.uploadedOrgId = orgResult.data?.id;
          successCount++;
        } else {
          errorCount++;
        }
      } catch (e) {
        console.error('Org upload error:', e);
        errorCount++;
      }
    }
    
    // Upload each accepted investor
    for (const inv of accepted) {
      try {
        const investorPayload = {
          investor_name: inv.name || inv.full_name,
          investor_type: inv.investor_type || inv.entity_type || 'Other',
          job_title: inv.job_title,
          firm_name: inv.firm_name || inv.organization_name,
          location_city: inv.location_city,
          location_country: inv.location_country,
          website: inv.website,
          email: (inv.emails && inv.emails[0]) || inv.email,
          phone: (inv.phones && inv.phones[0]) || inv.phone,
          whatsapp: inv.whatsapp,
          linkedin_url: inv.linkedin,
          source_url: inv.source_url || (inv.sources && inv.sources[0]),
          org_id: scraperState.uploadedOrgId || null
        };
        
        // Try v1 endpoint first; fall back to legacy
        const invHeaders = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` };
        let response = await fetch(`${settings.backendUrl}/api/v1/people`, {
          method: 'POST', headers: invHeaders, body: JSON.stringify({ ...investorPayload,
            person_name: investorPayload.investor_name, emails: investorPayload.email ? [investorPayload.email] : [],
            phones: investorPayload.phone ? [investorPayload.phone] : [] })
        }).catch(() => null);
        if (!response || response.status === 404) {
          response = await fetch(`${settings.backendUrl}/api/investors`, {
            method: 'POST', headers: invHeaders, body: JSON.stringify(investorPayload)
          });
        }
        
        if (response.ok) {
          inv.uploaded = true;
          successCount++;
        } else {
          errorCount++;
        }
      } catch (e) {
        console.error('Investor upload error:', e);
        errorCount++;
      }
    }
    
    if (successCount > 0 && errorCount === 0) {
      showToast(`${t('buttons.uploadSuccess')}: ${successCount} ${t('scraper.investors')}`, 'success');
      
      // Clear accepted captures only after ALL successful upload
      scraperState.foundInvestors = scraperState.foundInvestors.filter(inv => inv.review_status !== 'accepted');
      scraperState.capturedOrganization = null;
      scraperState.uploadedOrgId = null;
      renderAcceptedCaptures();
    } else if (successCount > 0 && errorCount > 0) {
      // Partial success - only clear successfully uploaded ones
      showToast(`${t('buttons.uploadSuccess')}: ${successCount}, ${t('buttons.uploadError')}: ${errorCount}`, 'info');
      scraperState.foundInvestors = scraperState.foundInvestors.filter(inv => !inv.uploaded);
      renderAcceptedCaptures();
    } else if (errorCount > 0) {
      showToast(`${t('buttons.uploadError')}: ${errorCount}`, 'error');
    }
    
  } catch (error) {
    console.error('Upload error:', error);
    showToast(`${t('buttons.uploadError')}: ${error.message}`, 'error');
  }
  
  btn.disabled = false;
  btn.innerHTML = originalHtml;
}

