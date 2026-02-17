(() => {
  /**
   * ALKNZ Investor Capture - Content Script
   *
   * Extracts page context and suggested investor fields using a 3-layer strategy:
   *   Layer 1 — JSON-LD structured data (most stable, survives UI redesigns)
   *   Layer 2 — DOM selectors (LinkedIn-specific or generic)
   *   Layer 3 — og:/meta tags (last resort)
   *
   * Also detects page type (person_profile / company_profile / team_page / unknown)
   * and can extract multiple people stubs from team pages.
   *
   * No scrolling, crawling, fetching, or DOM manipulation occurs.
   * All DOM reads are wrapped in try-catch.
   */

  // ---------------------------------------------------------------------------
  // Core DOM helpers
  // ---------------------------------------------------------------------------

  function safeQueryText(selector) {
    try {
      const el = document.querySelector(selector);
      return el?.textContent?.trim() || null;
    } catch {
      return null;
    }
  }

  function safeQueryAttr(selector, attr) {
    try {
      const el = document.querySelector(selector);
      return el?.getAttribute(attr)?.trim() || null;
    } catch {
      return null;
    }
  }

  function safeQueryAllText(selector, limit = 10) {
    try {
      const els = document.querySelectorAll(selector);
      const results = [];
      els.forEach((el, i) => {
        if (i < limit && el?.textContent?.trim()) {
          results.push(el.textContent.trim());
        }
      });
      return results;
    } catch {
      return [];
    }
  }

  function getSelectedText() {
    try {
      return window.getSelection().toString().trim();
    } catch {
      return '';
    }
  }

  function getVisibleText(maxLength = 20000) {
    try {
      const body = document.body;
      if (!body) return '';
      const text = body.innerText || body.textContent || '';
      return text.slice(0, maxLength).trim();
    } catch {
      return '';
    }
  }

  function extractContactLinks() {
    const contacts = { emails: [], phones: [] };
    try {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        const email = el.href.replace('mailto:', '').split('?')[0].trim();
        if (email && !contacts.emails.includes(email)) contacts.emails.push(email);
      });
    } catch { /* ignore */ }
    try {
      document.querySelectorAll('a[href^="tel:"]').forEach(el => {
        const phone = el.href.replace('tel:', '').trim();
        if (phone && !contacts.phones.includes(phone)) contacts.phones.push(phone);
      });
    } catch { /* ignore */ }
    return contacts;
  }

  function getPageInfo() {
    return {
      source_url: window.location.href,
      source_title: document.title || '',
      selected_text: getSelectedText()
    };
  }

  function extractPageSnapshot() {
    const headings = {
      h1: safeQueryAllText('h1', 5),
      h2: safeQueryAllText('h2', 10)
    };
    const contacts = extractContactLinks();
    return {
      url: window.location.href,
      title: document.title || '',
      selected_text: getSelectedText(),
      visible_text: getVisibleText(20000),
      meta_description: safeQueryAttr('meta[name="description"]', 'content')
        || safeQueryAttr('meta[property="og:description"]', 'content')
        || '',
      headings,
      emails: contacts.emails,
      phones: contacts.phones,
      og_title: safeQueryAttr('meta[property="og:title"]', 'content') || '',
      og_image: safeQueryAttr('meta[property="og:image"]', 'content') || ''
    };
  }

  // ---------------------------------------------------------------------------
  // Layer 1 — JSON-LD structured data extraction
  // ---------------------------------------------------------------------------

  /**
   * Tries to extract person or organization data from JSON-LD <script> tags.
   * Returns an object with matched fields, or null if nothing found.
   */
  function extractFromJsonLd() {
    try {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const s of scripts) {
        try {
          const raw = JSON.parse(s.textContent);
          // Handle both single objects and arrays
          const items = Array.isArray(raw) ? raw : [raw];
          for (const data of items) {
            if (data['@type'] === 'Person') {
              return {
                _source: 'jsonld_person',
                person_name: data.name || null,
                job_title: data.jobTitle || null,
                firm_name: data.worksFor?.name || null,
                firm_linkedin_url: null,
                linkedin_url: window.location.href,
                description: data.description || null,
                location_city: data.address?.addressLocality || null,
                location_country: data.address?.addressCountry || null,
                website: data.url || null
              };
            }
            if (data['@type'] === 'Organization') {
              return {
                _source: 'jsonld_org',
                org_name: data.name || null,
                website: data.url || null,
                description: data.description || null,
                hq_city: data.address?.addressLocality || null,
                hq_country: data.address?.addressCountry || null,
                linkedin_url: window.location.href
              };
            }
          }
        } catch { /* skip malformed JSON-LD block */ }
      }
    } catch { /* ignore */ }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Page type detection
  // ---------------------------------------------------------------------------

  /**
   * Count how many "person card" elements appear on the page.
   * Used to confirm generic team pages.
   */
  function countPersonCards() {
    const selectors = [
      '.team-member', '.team__member', '.member-card', '.person-card',
      '.partner-card', '.founder-card', '[class*="TeamMember"]',
      '[class*="team-member"]', '[class*="MemberCard"]', '[class*="PeopleCard"]'
    ];
    for (const sel of selectors) {
      try {
        const count = document.querySelectorAll(sel).length;
        if (count >= 2) return count;
      } catch { /* :has() and complex selectors may fail in some contexts */ }
    }
    // Fallback: li elements that each contain a heading + paragraph
    try {
      const lists = document.querySelectorAll('ul, ol');
      for (const list of lists) {
        const items = list.querySelectorAll('li');
        let withHeadingAndPara = 0;
        items.forEach(li => {
          if (li.querySelector('h2, h3, h4') && li.querySelector('p')) withHeadingAndPara++;
        });
        if (withHeadingAndPara >= 3) return withHeadingAndPara;
      }
    } catch { /* ignore */ }
    return 0;
  }

  /**
   * Detect the type of the current page.
   * Returns: 'person_profile' | 'company_profile' | 'team_page' | 'unknown'
   */
  function detectPageType() {
    try {
      const host = window.location.hostname.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      // LinkedIn — high confidence, URL-based
      if (host.includes('linkedin.com')) {
        if (/^\/in\/[^\/]+\/?$/.test(path))               return 'person_profile';
        if (path.includes('/people'))                      return 'team_page';
        if (/^\/(company|school)\/[^\/]+\/?$/.test(path)) return 'company_profile';
        if (/^\/(company|school)\//.test(path))            return 'company_profile';
      }

      // Generic sites — URL path heuristics + DOM confirmation
      const teamPaths = [
        /\/team\/?$/, /\/our-team\/?$/, /\/about\/team\/?$/,
        /\/people\/?$/, /\/partners\/?$/, /\/leadership\/?$/,
        /\/founders\/?$/, /\/management\/?$/, /\/staff\/?$/
      ];
      if (teamPaths.some(p => p.test(path)) && countPersonCards() >= 2) {
        return 'team_page';
      }

      // Person profile signals
      const ogType = safeQueryAttr('meta[property="og:type"]', 'content') || '';
      const metaDesc = (safeQueryAttr('meta[name="description"]', 'content') || '').toLowerCase();
      const bioKeywords = ['partner at', 'investor at', 'managing director', 'co-founder of', 'general partner'];
      if (ogType === 'profile' || bioKeywords.some(k => metaDesc.includes(k))) {
        return 'person_profile';
      }

      // Company/firm signals
      const firmKeywords = ['venture capital', 'vc fund', 'family office', 'investment firm', 'fund management', 'private equity'];
      if (firmKeywords.some(k => metaDesc.includes(k))) {
        return 'company_profile';
      }
    } catch { /* ignore */ }

    return 'unknown';
  }

  // ---------------------------------------------------------------------------
  // Layer 2 — LinkedIn DOM extraction (person profiles)
  // ---------------------------------------------------------------------------

  function extractLinkedInPersonFields() {
    const fields = {
      person_name: null, job_title: null, firm_name: null,
      location_city: null, location_country: null,
      email: null, phone: null, website: null, description: null
    };

    try {
      fields.person_name = safeQueryText('h1.text-heading-xlarge')
        || safeQueryText('h1[class*="top-card-layout__title"]')
        || safeQueryText('.pv-top-card--list li:first-child')
        || safeQueryText('h1');
    } catch { /* ignore */ }

    try {
      fields.job_title = safeQueryText('div.text-body-medium[data-generated-suggestion-target]')
        || safeQueryText('div[class*="top-card-layout__headline"]')
        || safeQueryText('div.pv-text-details__left-panel > div:nth-child(2)')
        || safeQueryText('.top-card-layout__headline');
    } catch { /* ignore */ }

    try {
      fields.firm_name = safeQueryText('ul.pvs-list li:first-child span[aria-hidden="true"]')
        || safeQueryText('.experience-item .pv-entity__secondary-title');
    } catch { /* ignore */ }

    try {
      const locationText = safeQueryText('span.text-body-small[class*="top-card__subline-item"]')
        || safeQueryText('div[class*="top-card-layout__first-subline"] span')
        || safeQueryText('span.pv-text-details__left-panel--locality')
        || safeQueryText('.top-card-layout__first-subline');
      if (locationText) {
        const parts = locationText.split(',').map(p => p.trim());
        if (parts.length >= 2) {
          fields.location_city = parts[0];
          fields.location_country = parts[parts.length - 1];
        } else if (parts.length === 1) {
          fields.location_city = parts[0];
        }
      }
    } catch { /* ignore */ }

    try {
      fields.description = safeQueryText('.pv-about-section .pv-about__summary-text')
        || safeQueryText('section.pv-about-section p')
        || safeQueryAttr('meta[name="description"]', 'content');
    } catch { /* ignore */ }

    const contacts = extractContactLinks();
    if (contacts.emails.length > 0) fields.email = contacts.emails[0];
    if (contacts.phones.length > 0) fields.phone = contacts.phones[0];

    return fields;
  }

  // ---------------------------------------------------------------------------
  // Layer 2 — LinkedIn DOM extraction (company pages)
  // ---------------------------------------------------------------------------

  function extractLinkedInCompanyFields() {
    return {
      _source: 'linkedin_company_dom',
      org_name: safeQueryText('h1') || null,
      description: safeQueryText('.org-top-card-summary__tagline')
        || safeQueryText('.break-words')
        || safeQueryAttr('meta[name="description"]', 'content')
        || null,
      website: safeQueryAttr('a[data-control-name="visit_company_website"]', 'href') || null,
      linkedin_url: window.location.href.split('?')[0]
    };
  }

  // ---------------------------------------------------------------------------
  // Layer 2 — Generic DOM extraction (person + company)
  // ---------------------------------------------------------------------------

  function extractGenericPersonFields() {
    const fields = {
      person_name: null, job_title: null, firm_name: null,
      location_city: null, location_country: null,
      email: null, phone: null, website: null, description: null
    };

    try {
      fields.person_name = safeQueryText('h1')
        || safeQueryAttr('meta[property="og:title"]', 'content')
        || safeQueryAttr('meta[name="title"]', 'content');
    } catch { /* ignore */ }

    try {
      fields.description = safeQueryAttr('meta[name="description"]', 'content')
        || safeQueryAttr('meta[property="og:description"]', 'content');
    } catch { /* ignore */ }

    try {
      const h2Text = safeQueryText('h2');
      if (h2Text && h2Text.length < 100) {
        if (/partner|principal|director|managing|founder|ceo|cfo|investor|venture/i.test(h2Text)) {
          fields.job_title = h2Text;
        }
      }
    } catch { /* ignore */ }

    const contacts = extractContactLinks();
    if (contacts.emails.length > 0) fields.email = contacts.emails[0];
    if (contacts.phones.length > 0) fields.phone = contacts.phones[0];

    try { fields.website = window.location.origin; } catch { /* ignore */ }

    return fields;
  }

  // ---------------------------------------------------------------------------
  // 3-layer extraction dispatcher
  // ---------------------------------------------------------------------------

  /**
   * Merges fields from source into target, only filling null/undefined values.
   */
  function mergeFields(target, source) {
    if (!source) return target;
    for (const key of Object.keys(source)) {
      if (key.startsWith('_')) continue; // skip metadata keys
      if (target[key] == null && source[key] != null) {
        target[key] = source[key];
      }
    }
    return target;
  }

  function extractSuggestedFields() {
    try {
      const host = window.location.hostname.toLowerCase();
      const pageType = detectPageType();

      // Determine which Layer 2 extractor to use
      let layer2Fields = null;
      if (host.includes('linkedin.com')) {
        if (pageType === 'company_profile') {
          layer2Fields = extractLinkedInCompanyFields();
        } else {
          // person_profile, team_page, or unknown on LinkedIn → try person fields
          layer2Fields = extractLinkedInPersonFields();
        }
      } else {
        layer2Fields = extractGenericPersonFields();
      }

      // Layer 1: JSON-LD (most stable)
      const jsonLdFields = extractFromJsonLd();

      // Layer 3: generic og/meta
      const layer3 = {
        person_name: safeQueryAttr('meta[property="og:title"]', 'content'),
        description: safeQueryAttr('meta[name="description"]', 'content')
          || safeQueryAttr('meta[property="og:description"]', 'content')
      };

      // Merge: start with JSON-LD if available, then fill gaps from DOM, then meta
      let result = {};
      if (jsonLdFields) {
        result = Object.assign({}, jsonLdFields);
        mergeFields(result, layer2Fields);
      } else {
        result = Object.assign({}, layer2Fields || {});
      }
      mergeFields(result, layer3);

      // Clean up internal metadata keys
      delete result._source;

      return result;
    } catch {
      return {};
    }
  }

  // ---------------------------------------------------------------------------
  // Bulk team member extraction
  // ---------------------------------------------------------------------------

  /**
   * Strips tracking params and normalises a LinkedIn /in/ URL.
   */
  function cleanLinkedInPersonUrl(rawHref) {
    try {
      const url = new URL(rawHref);
      const match = url.pathname.match(/\/in\/([^\/]+)/);
      if (match) return `https://www.linkedin.com/in/${match[1]}/`;
    } catch { /* ignore */ }
    return rawHref;
  }

  /**
   * Extract PersonStubs from a LinkedIn /company/X/people page.
   * Only captures what is currently visible in the DOM (user must scroll to load more).
   */
  function extractLinkedInTeamMembers() {
    const stubs = [];
    try {
      // LinkedIn renders people in a search-results grid
      const cardSelectors = [
        'li.reusable-search__result-container',
        'li[class*="EntityResultItem"]',
        '.entity-result__item',
        '[data-view-name="search-entity-result-universal-template"]'
      ];

      let cards = [];
      for (const sel of cardSelectors) {
        try {
          const found = document.querySelectorAll(sel);
          if (found.length > 0) { cards = Array.from(found); break; }
        } catch { /* try next */ }
      }

      cards.forEach(card => {
        try {
          const stub = { source_url: window.location.href };

          // Name
          const nameEl = card.querySelector('span[aria-hidden="true"]')
            || card.querySelector('.entity-result__title-text a span')
            || card.querySelector('a[data-control-name="search_srp_result"] span');
          stub.person_name = nameEl?.textContent?.trim() || null;

          // Job title
          const titleEl = card.querySelector('.entity-result__primary-subtitle')
            || card.querySelector('div[class*="entity-result__primary-subtitle"]')
            || card.querySelector('.reusable-search-simple-insight__text');
          stub.job_title = titleEl?.textContent?.trim() || null;

          // LinkedIn URL
          const linkEl = card.querySelector('a.app-aware-link[href*="/in/"]')
            || card.querySelector('a[href*="linkedin.com/in/"]')
            || card.querySelector('.entity-result__title-text a');
          stub.linkedin_url = linkEl?.href ? cleanLinkedInPersonUrl(linkEl.href) : null;

          // Avatar
          const imgEl = card.querySelector('img.presence-entity__image, img[class*="EntityPhoto"]');
          stub.profile_image_url = imgEl?.src || null;

          if (stub.person_name) stubs.push(stub);
        } catch { /* skip malformed card */ }
      });
    } catch { /* ignore */ }
    return stubs;
  }

  /**
   * Extract PersonStubs from a generic website team page.
   * Uses a 3-strategy cascade.
   */
  function extractGenericTeamMembers() {
    const stubs = [];

    // Strategy 1: Schema.org Person markup
    try {
      document.querySelectorAll('[itemtype*="schema.org/Person"]').forEach(el => {
        try {
          const stub = { source_url: window.location.href };
          stub.person_name = el.querySelector('[itemprop="name"]')?.textContent?.trim() || null;
          stub.job_title   = el.querySelector('[itemprop="jobTitle"]')?.textContent?.trim() || null;
          const linkEl     = el.querySelector('a[href*="linkedin.com/in/"]');
          stub.linkedin_url = linkEl?.href || null;
          const imgEl      = el.querySelector('img');
          stub.profile_image_url = imgEl?.src || null;
          if (stub.person_name) stubs.push(stub);
        } catch { /* skip */ }
      });
    } catch { /* ignore */ }
    if (stubs.length >= 2) return stubs;

    // Strategy 2: Common class name patterns
    const cardSelectors = [
      '.team-member', '.team__member', '.member-card', '.person-card',
      '.partner-card', '.founder-card', '[class*="TeamMember"]',
      '[class*="team-member"]', '[class*="MemberCard"]', '[class*="PeopleCard"]'
    ];
    for (const sel of cardSelectors) {
      try {
        const cards = document.querySelectorAll(sel);
        if (cards.length < 2) continue;
        cards.forEach(card => {
          try {
            const stub = { source_url: window.location.href };
            const nameEl = card.querySelector('h2, h3, h4')
              || card.querySelector('.name, [class*="name"], strong, b');
            stub.person_name = nameEl?.textContent?.trim() || null;
            const titleEl = card.querySelector('p, .title, .role, [class*="title"], [class*="role"], [class*="position"]');
            stub.job_title = titleEl?.textContent?.trim()?.slice(0, 100) || null;
            const linkEl = card.querySelector('a[href*="linkedin.com/in/"]');
            stub.linkedin_url = linkEl?.href || null;
            const imgEl = card.querySelector('img');
            stub.profile_image_url = imgEl?.src || null;
            if (stub.person_name) stubs.push(stub);
          } catch { /* skip */ }
        });
        if (stubs.length >= 2) return stubs;
      } catch { /* try next */ }
    }
    if (stubs.length >= 2) return stubs;

    // Strategy 3: Repeated <li> pattern — each li has a heading + paragraph
    try {
      const lists = document.querySelectorAll('ul, ol');
      for (const list of lists) {
        const items = list.querySelectorAll('li');
        if (items.length < 3) continue;
        const candidates = [];
        items.forEach(li => {
          const h = li.querySelector('h2, h3, h4');
          const p = li.querySelector('p');
          if (h && p) {
            const stub = { source_url: window.location.href };
            stub.person_name = h.textContent.trim();
            stub.job_title   = p.textContent.trim().slice(0, 100);
            const linkEl = li.querySelector('a[href*="linkedin.com/in/"]');
            stub.linkedin_url = linkEl?.href || null;
            const imgEl = li.querySelector('img');
            stub.profile_image_url = imgEl?.src || null;
            candidates.push(stub);
          }
        });
        if (candidates.length >= 3) return candidates;
      }
    } catch { /* ignore */ }

    return stubs;
  }

  /**
   * Dispatcher: extract team members based on current site.
   */
  function extractTeamMembers() {
    try {
      const host = window.location.hostname.toLowerCase();
      if (host.includes('linkedin.com')) {
        return extractLinkedInTeamMembers();
      }
      return extractGenericTeamMembers();
    } catch {
      return [];
    }
  }

  // ---------------------------------------------------------------------------
  // captureFromPage (existing, now uses enhanced extractSuggestedFields)
  // ---------------------------------------------------------------------------

  function captureFromPage() {
    const pageInfo = getPageInfo();
    const suggested_fields = extractSuggestedFields();
    return {
      source_url: pageInfo.source_url,
      source_title: pageInfo.source_title,
      selected_text: pageInfo.selected_text,
      suggested_fields
    };
  }

  // ---------------------------------------------------------------------------
  // Message listener
  // ---------------------------------------------------------------------------

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      if (message.type === 'CAPTURE_SELECTED_TEXT') {
        sendResponse({ selected_text: getSelectedText() });
        return true;
      }

      if (message.type === 'CAPTURE_FROM_PAGE') {
        sendResponse(captureFromPage());
        return true;
      }

      if (message.type === 'GET_PAGE_INFO') {
        sendResponse(getPageInfo());
        return true;
      }

      if (message.type === 'GET_PAGE_SNAPSHOT') {
        sendResponse(extractPageSnapshot());
        return true;
      }

      // NEW: Returns page type + basic context for the sidepanel to auto-switch modes
      if (message.type === 'GET_PAGE_CONTEXT') {
        const pageType = detectPageType();
        const suggestedFields = extractSuggestedFields();
        sendResponse({
          page_type: pageType,
          source_url: window.location.href,
          source_title: document.title || '',
          suggested_fields: suggestedFields
        });
        return true;
      }

      // NEW: Returns an array of PersonStub objects from team/people pages
      if (message.type === 'EXTRACT_TEAM_MEMBERS') {
        sendResponse({ team_members: extractTeamMembers() });
        return true;
      }

    } catch (error) {
      sendResponse({ error: 'Content script error', details: error.message });
    }

    return true;
  });
})();
