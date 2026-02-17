(() => {
  /**
   * ALKNZ Investor Capture - Content Script
   * 
   * This script safely extracts page context and suggested investor fields.
   * All DOM reads are wrapped in try-catch to prevent crashes.
   * No scrolling, crawling, fetching, or DOM manipulation occurs.
   */

  /**
   * Safely query a selector and return text content or null
   */
  function safeQueryText(selector) {
    try {
      const el = document.querySelector(selector);
      return el?.textContent?.trim() || null;
    } catch {
      return null;
    }
  }

  /**
   * Safely query a selector and return an attribute value or null
   */
  function safeQueryAttr(selector, attr) {
    try {
      const el = document.querySelector(selector);
      return el?.getAttribute(attr)?.trim() || null;
    } catch {
      return null;
    }
  }

  /**
   * Safely query all matching selectors and return array of text content
   */
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

  /**
   * Get currently selected text on the page
   */
  function getSelectedText() {
    try {
      return window.getSelection().toString().trim();
    } catch {
      return '';
    }
  }

  /**
   * Get visible text from body (limited to avoid huge payloads)
   */
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

  /**
   * Extract all mailto and tel links from the page
   */
  function extractContactLinks() {
    const contacts = {
      emails: [],
      phones: []
    };

    try {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        const email = el.href.replace('mailto:', '').split('?')[0].trim();
        if (email && !contacts.emails.includes(email)) {
          contacts.emails.push(email);
        }
      });
    } catch { /* ignore */ }

    try {
      document.querySelectorAll('a[href^="tel:"]').forEach(el => {
        const phone = el.href.replace('tel:', '').trim();
        if (phone && !contacts.phones.includes(phone)) {
          contacts.phones.push(phone);
        }
      });
    } catch { /* ignore */ }

    return contacts;
  }

  /**
   * Get basic page information (always safe)
   */
  function getPageInfo() {
    return {
      source_url: window.location.href,
      source_title: document.title || '',
      selected_text: getSelectedText()
    };
  }

  /**
   * Extract a full page snapshot for AI processing
   */
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

  /**
   * Extract suggested fields from LinkedIn profile pages
   * All selectors are best-effort; failures return null per field
   */
  function extractLinkedInFields() {
    const fields = {
      investor_name: null,
      job_title: null,
      firm_name: null,
      location_city: null,
      location_country: null,
      email: null,
      phone: null,
      website: null,
      description: null
    };

    try {
      fields.investor_name = safeQueryText('h1.text-heading-xlarge') 
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
      const experienceCompany = safeQueryText('ul.pvs-list li:first-child span[aria-hidden="true"]')
        || safeQueryText('.experience-item .pv-entity__secondary-title');
      if (experienceCompany) {
        fields.firm_name = experienceCompany;
      }
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

  /**
   * Extract suggested fields from generic websites
   * Uses common patterns: h1, meta tags, og: tags, mailto/tel links
   */
  function extractGenericFields() {
    const fields = {
      investor_name: null,
      job_title: null,
      firm_name: null,
      location_city: null,
      location_country: null,
      email: null,
      phone: null,
      website: null,
      description: null
    };

    try {
      fields.investor_name = safeQueryText('h1')
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
        const titlePatterns = /partner|principal|director|managing|founder|ceo|cfo|investor|venture/i;
        if (titlePatterns.test(h2Text)) {
          fields.job_title = h2Text;
        }
      }
    } catch { /* ignore */ }

    const contacts = extractContactLinks();
    if (contacts.emails.length > 0) fields.email = contacts.emails[0];
    if (contacts.phones.length > 0) fields.phone = contacts.phones[0];

    try {
      fields.website = window.location.origin;
    } catch { /* ignore */ }

    return fields;
  }

  /**
   * Determine which extraction strategy to use based on hostname
   */
  function extractSuggestedFields() {
    try {
      const hostname = window.location.hostname.toLowerCase();

      if (hostname.includes('linkedin.com')) {
        return extractLinkedInFields();
      }

      return extractGenericFields();
    } catch {
      return {};
    }
  }

  /**
   * Handle CAPTURE_FROM_PAGE request
   * Returns full page context with suggested fields
   */
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

  /**
   * Message listener for popup/sidepanel communication
   */
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
    } catch (error) {
      sendResponse({ error: 'Content script error', details: error.message });
    }

    return true;
  });
})();
