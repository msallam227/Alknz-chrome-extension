const STORAGE_KEY = 'ALKNZ_ADDRESS_BOOK';
const SETTINGS_KEYS = {
  BACKEND_URL: 'ALKNZ_BACKEND_URL',
  API_KEY: 'ALKNZ_API_KEY',
  CAPTURED_BY: 'ALKNZ_CAPTURED_BY'
};

const LANG_KEY = 'ALKNZ_LANGUAGE';

const translations = {
  en: {
    header: {
      subtitle: 'Investor Intelligence'
    },
    tabs: {
      capture: 'Research',
      scraper: 'Batch',
      history: 'Saved'
    },
    sections: {
      evidence: 'Evidence Fields',
      investorDetails: 'Investor Details',
      contactRelationship: 'Contact & Relationship',
      aiSuggestions: 'AI Suggestions',
      addressBook: 'ALKNZ Address Book',
      contactIntelligence: 'Contact Intelligence',
      searchHistory: 'Search History',
      batchScraper: 'Batch Website Scraper',
      acceptedCaptures: 'Accepted Captures',
      clickToEdit: 'Click any card to load into form for editing',
      loadedToForm: 'Loaded to form - edit and save',
      investmentFocus: 'Investment Focus',
      organizationDetails: 'Organization Details'
    },
    labels: {
      sourceUrl: 'Source URL',
      sourceTitle: 'Source Title',
      selectedText: 'Selected Text',
      investorName: 'Investor Name',
      investorType: 'Investor Type',
      jobTitle: 'Job Title',
      firmName: 'Firm Name',
      city: 'City',
      country: 'Country',
      website: 'Website',
      email: 'Email',
      phone: 'Phone',
      entityType: 'Entity Type',
      whatsapp: 'WhatsApp',
      assistantName: 'Assistant Name',
      assistantEmail: 'Assistant Email',
      relationshipStrength: 'Relationship Strength',
      decisionRole: 'Decision Role',
      preferredIntroPath: 'Preferred Intro Path',
      notes: 'Notes',
      orgName: 'Organization Name',
      emails: 'Emails (comma-separated)',
      phones: 'Phones (comma-separated)',
      description: 'Description',
      linkedinUrl: 'LinkedIn URL',
      confidence: 'Confidence',
      searchQuery: 'Search Query',
      workEmail: 'Work Email',
      linkedin: 'LinkedIn',
      urlList: 'Website URLs',
      scraperFocus: 'Search Focus',
      investmentSectors: 'Sectors/Industries',
      investmentStages: 'Investment Stages',
      checkSizeMin: 'Check Size Min',
      checkSizeMax: 'Check Size Max',
      geographicFocus: 'Geographic Focus',
      orgName: 'Organization Name',
      orgWebsite: 'Website',
      orgEmails: 'Organization Emails (up to 5)',
      orgPhones: 'Organization Phones (up to 5)',
      orgCity: 'City',
      orgCountry: 'Country',
      orgLinkedIn: 'LinkedIn URL',
      orgDescription: 'Description'
    },
    placeholders: {
      autoCaptured: 'Auto-captured from page',
      selectText: 'Select text on page to capture or type manually',
      fullName: 'Full name',
      investorType: 'Angel, VC, Family Office...',
      jobTitle: 'Managing Partner',
      firmName: 'Firm or company',
      city: 'City',
      country: 'Country',
      email: 'email@example.com',
      phone: '+1 555 0100',
      assistantName: 'Assistant name',
      assistantEmail: 'assistant@example.com',
      introPath: 'Best way to get introduced',
      notes: 'Additional notes...',
      searchQuery: 'Name, LinkedIn URL, or company...',
      website: 'https://...',
      scraperUrls: 'https://example.com/team\nhttps://example.com/about\nhttps://vc-firm.com/partners'
    },
    toasts: {
      formCleared: 'Form cleared',
      evidenceCleared: 'Evidence cleared',
      contactRevealed: 'Contact info revealed!',
      draftSaved: 'Draft saved locally',
      uploadSuccess: 'Capture uploaded successfully!',
      uploadFailed: 'Upload failed',
      noSettings: 'Please configure settings first',
      selectText: 'Please select text first',
      noFields: 'No fields to map',
    },
    options: {
      select: 'Select...',
      cold: 'Cold',
      warm: 'Warm',
      direct: 'Direct',
      decisionMaker: 'Decision Maker',
      influencer: 'Influencer',
      gatekeeper: 'Gatekeeper',
      medium: 'Medium',
      low: 'Low',
      high: 'High',
      investor: 'Investor',
      organization: 'Organization'
    },
    buttons: {
      clearEvidence: 'Clear Evidence',
      acceptAll: 'Accept All (High/Medium)',
      saveDraft: 'Save Draft',
      uploadToServer: 'Upload to Server',
      uploading: 'Uploading...',
      uploadSuccess: 'Uploaded successfully',
      uploadError: 'Upload failed',
      upload: 'Upload',
      clear: 'Clear',
      capturePage: 'Capture Page',
      captureSelected: 'Capture Selected',
      smartMap: 'Smart Map',
      exportExcel: 'Export Excel',
      aiAutoFill: 'AI Auto-Fill',
      saveOrg: 'Save Org',
      uploadOrg: 'Upload Org',
      clearOrg: 'Clear Org',
      startScraper: 'Start Batch Scrape',
      close: 'Close',
      saveChanges: 'Save Changes'
    },
    messages: {
      noSuggestions: 'No suggestions yet. Click "AI Auto-Fill" to extract fields.',
      noDrafts: 'No drafts saved yet',
      noSearches: 'No searches yet. Use AI Enrichment to find contact information.',
      noFiltered: 'No investors match this filter'
    },
    table: {
      name: 'Name',
      firm: 'Firm',
      country: 'Country',
      type: 'Type',
      status: 'Status',
      created: 'Created',
      actions: 'Actions'
    },
    scraper: {
      info: 'Paste URLs to scrape for investor contacts (max 25 pages)',
      urls: 'URLs',
      crawling: 'Crawling websites...',
      foundInvestors: 'Found Potential Investors',
      noInvestors: 'No investors found. Try different URLs.',
      addedToCapture: 'Added to Capture form',
      enterUrl: 'Please enter at least one URL',
      maxUrls: 'Maximum 25 URLs allowed',
      scraping: 'Scraping...',
      startScrape: 'Start Batch Scrape',
      configError: 'Please configure Backend URL in settings',
      starting: 'Starting batch scrape',
      focus: 'Focus',
      initializing: 'Initializing Firecrawl API...',
      crawlingPages: 'Crawling websites for investor information...',
      extracting: 'AI extracting investor profiles...',
      scraped: 'Scraped',
      found: 'found',
      investors: 'investor(s)',
      companyInfo: 'Company Information',
      foundPeople: 'Found People'
    },
    drawer: {
      emailCandidates: 'Email Candidates (Predicted)',
      verifyAll: 'Verify All',
      verified: 'Verified',
      invalid: 'Invalid',
      pending: 'Pending',
      useThisEmail: 'Use this email',
      emailSelected: 'Email selected',
      companyDomain: 'Company domain',
      learnedPattern: 'Learned pattern',
      alsoCaptureOrg: 'Also capture Organization',
      orgCaptured: 'Organization captured',
      organization: 'Organization',
      reviewCapture: 'Review Capture',
      identity: 'Identity',
      contactInfo: 'Contact Information',
      location: 'Location',
      additional: 'Additional',
      linkedinUrl: 'LinkedIn URL',
      viewRawJson: 'View Raw JSON',
      accept: 'Accept & Add to Capture',
      reject: 'Reject',
      accepted: 'Investor accepted and added to Capture',
      rejected: 'Investor rejected'
    },
    scraperOptions: {
      investors: 'Investors & Partners',
      contacts: 'All Contacts',
      executives: 'Executives Only'
    },
    filters: {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      all: 'All'
    },
    selection: {
      selected: 'selected',
      selectAll: 'Select All',
      clearSelection: 'Clear',
      acceptSelected: 'Accept Selected',
      rejectSelected: 'Reject Selected',
      batchAccepted: 'investors accepted',
      batchRejected: 'investors rejected',
      duplicatesRemoved: 'duplicates removed'
    },
    entityTypes: {
      investor: 'Investor',
      teamMember: 'Team Member',
      founder: 'Founder',
      other: 'Other'
    }
  },
  ar: {
    header: {
      subtitle: 'استخبارات المستثمرين'
    },
    tabs: {
      capture: 'بحث',
      scraper: 'الدُفعة',
      history: 'المحفوظات'
    },
    sections: {
      evidence: 'حقول الأدلة',
      investorDetails: 'تفاصيل المستثمر',
      contactRelationship: 'التواصل والعلاقات',
      aiSuggestions: 'اقتراحات الذكاء الاصطناعي',
      addressBook: 'دفتر عناوين ALKNZ',
      contactIntelligence: 'استخبارات الاتصال',
      searchHistory: 'سجل البحث',
      batchScraper: 'كاشط المواقع المتعددة',
      acceptedCaptures: 'الالتقاطات المقبولة',
      clickToEdit: 'انقر على أي بطاقة لتحميلها في النموذج للتحرير',
      loadedToForm: 'تم التحميل إلى النموذج - حرر واحفظ',
      investmentFocus: 'تركيز الاستثمار',
      organizationDetails: 'تفاصيل المؤسسة'
    },
    labels: {
      sourceUrl: 'رابط المصدر',
      sourceTitle: 'عنوان المصدر',
      selectedText: 'النص المحدد',
      investorName: 'اسم المستثمر',
      investorType: 'نوع المستثمر',
      jobTitle: 'المسمى الوظيفي',
      firmName: 'اسم الشركة',
      city: 'المدينة',
      country: 'الدولة',
      website: 'الموقع الإلكتروني',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      whatsapp: 'واتساب',
      assistantName: 'اسم المساعد',
      assistantEmail: 'بريد المساعد',
      relationshipStrength: 'قوة العلاقة',
      decisionRole: 'دور القرار',
      preferredIntroPath: 'طريقة التقديم المفضلة',
      notes: 'ملاحظات',
      orgName: 'اسم المؤسسة',
      emails: 'البريد الإلكتروني (مفصولة بفواصل)',
      phones: 'الهواتف (مفصولة بفواصل)',
      description: 'الوصف',
      linkedinUrl: 'رابط لينكد إن',
      confidence: 'مستوى الثقة',
      searchQuery: 'استعلام البحث',
      workEmail: 'البريد المهني',
      linkedin: 'لينكد إن',
      urlList: 'روابط المواقع',
      scraperFocus: 'تركيز البحث',
      investmentSectors: 'القطاعات/الصناعات',
      investmentStages: 'مراحل الاستثمار',
      checkSizeMin: 'الحد الأدنى للشيك',
      checkSizeMax: 'الحد الأقصى للشيك',
      geographicFocus: 'التركيز الجغرافي',
      orgName: 'اسم المؤسسة',
      orgWebsite: 'الموقع الإلكتروني',
      orgEmails: 'بريد المؤسسة (حتى 5)',
      orgPhones: 'هواتف المؤسسة (حتى 5)',
      orgCity: 'المدينة',
      orgCountry: 'الدولة',
      orgLinkedIn: 'رابط لينكد إن',
      orgDescription: 'الوصف'
    },
    placeholders: {
      autoCaptured: 'ملتقط تلقائياً من الصفحة',
      selectText: 'حدد نصاً من الصفحة للالتقاط أو اكتب يدوياً',
      fullName: 'الاسم الكامل',
      investorType: 'مستثمر ملاك، رأس مال مخاطر، مكتب عائلي...',
      jobTitle: 'شريك إداري',
      firmName: 'الشركة أو المؤسسة',
      city: 'المدينة',
      country: 'الدولة',
      email: 'email@example.com',
      phone: '+971 55 000 0000',
      assistantName: 'اسم المساعد',
      assistantEmail: 'assistant@example.com',
      introPath: 'أفضل طريقة للتعريف',
      notes: 'ملاحظات إضافية...',
      searchQuery: 'الاسم، رابط لينكد إن، أو الشركة...',
      website: 'https://...',
      scraperUrls: 'https://example.com/team\nhttps://example.com/about\nhttps://vc-firm.com/partners'
    },
    toasts: {
      formCleared: 'تم مسح النموذج',
      evidenceCleared: 'تم مسح الأدلة',
      contactRevealed: 'تم كشف معلومات الاتصال!',
      draftSaved: 'تم حفظ المسودة محلياً',
      uploadSuccess: 'تم رفع الالتقاط بنجاح!',
      uploadFailed: 'فشل الرفع',
      noSettings: 'يرجى تكوين الإعدادات أولاً',
      selectText: 'يرجى تحديد نص أولاً',
      noFields: 'لا توجد حقول للتعيين',
      orgCleared: 'تم مسح المؤسسة',
    },
    options: {
      select: 'اختر...',
      cold: 'بارد',
      warm: 'دافئ',
      direct: 'مباشر',
      decisionMaker: 'صانع القرار',
      influencer: 'مؤثر',
      gatekeeper: 'حارس البوابة',
      medium: 'متوسط',
      low: 'منخفض',
      high: 'عالي',
      investor: 'مستثمر',
      organization: 'مؤسسة'
    },
    buttons: {
      clearEvidence: 'مسح الأدلة',
      acceptAll: 'قبول الكل (عالي/متوسط)',
      saveDraft: 'حفظ مسودة',
      uploadToServer: 'رفع إلى الخادم',
      uploading: 'جاري الرفع...',
      uploadSuccess: 'تم الرفع بنجاح',
      uploadError: 'فشل الرفع',
      upload: 'رفع',
      clear: 'مسح',
      capturePage: 'التقاط الصفحة',
      captureSelected: 'التقاط المحدد',
      smartMap: 'خريطة ذكية',
      exportExcel: 'تصدير إكسل',
      aiAutoFill: 'ملء تلقائي بالذكاء',
      saveOrg: 'حفظ المؤسسة',
      uploadOrg: 'رفع المؤسسة',
      clearOrg: 'مسح المؤسسة',
      startScraper: 'بدء الكشط المتعدد',
      close: 'إغلاق',
      saveChanges: 'حفظ التغييرات'
    },
    messages: {
      noSuggestions: 'لا توجد اقتراحات بعد. انقر على "ملء تلقائي بالذكاء" لاستخراج الحقول.',
      noDrafts: 'لا توجد مسودات محفوظة بعد',
      noSearches: 'لا توجد عمليات بحث بعد. استخدم إثراء الذكاء الاصطناعي للعثور على معلومات الاتصال.'
    },
    table: {
      name: 'الاسم',
      firm: 'الشركة',
      country: 'الدولة',
      type: 'النوع',
      status: 'الحالة',
      created: 'تاريخ الإنشاء',
      actions: 'إجراءات'
    },
    scraper: {
      info: 'الصق روابط المواقع لاستخراج بيانات المستثمرين (25 صفحة كحد أقصى)',
      urls: 'روابط',
      crawling: 'جاري فحص المواقع...',
      foundInvestors: 'تم العثور على مستثمرين محتملين',
      noInvestors: 'لم يتم العثور على مستثمرين. جرب روابط مختلفة.',
      addedToCapture: 'تمت الإضافة إلى نموذج الالتقاط',
      enterUrl: 'يرجى إدخال رابط واحد على الأقل',
      maxUrls: 'الحد الأقصى 25 رابط',
      scraping: 'جاري الكشط...',
      startScrape: 'بدء الكشط المتعدد',
      configError: 'يرجى تكوين رابط الخادم في الإعدادات',
      starting: 'بدء الكشط المتعدد',
      focus: 'التركيز',
      initializing: 'تهيئة Firecrawl API...',
      crawlingPages: 'جاري فحص المواقع للعثور على معلومات المستثمرين...',
      extracting: 'الذكاء الاصطناعي يستخرج ملفات المستثمرين...',
      scraped: 'تم فحص',
      found: 'تم العثور على',
      investors: 'مستثمر(ين)',
      companyInfo: 'معلومات الشركة'
    },
    scraperOptions: {
      investors: 'المستثمرون والشركاء',
      contacts: 'جميع جهات الاتصال',
      executives: 'التنفيذيون فقط'
    },
    drawer: {
      emailCandidates: 'بريد إلكتروني متوقع',
      verifyAll: 'تحقق من الكل',
      verified: 'موثق',
      invalid: 'غير صالح',
      pending: 'قيد الانتظار',
      useThisEmail: 'استخدم هذا البريد',
      emailSelected: 'تم اختيار البريد',
      companyDomain: 'نطاق الشركة',
      learnedPattern: 'نمط متعلم',
      alsoCaptureOrg: 'التقاط المؤسسة أيضاً',
      orgCaptured: 'تم التقاط المؤسسة',
      organization: 'مؤسسة',
      reviewCapture: 'مراجعة الالتقاط',
      identity: 'الهوية',
      contactInfo: 'معلومات الاتصال',
      location: 'الموقع',
      additional: 'إضافي',
      linkedinUrl: 'رابط لينكد إن',
      viewRawJson: 'عرض JSON الخام',
      accept: 'قبول وإضافة للالتقاط',
      reject: 'رفض',
      accepted: 'تم قبول المستثمر وإضافته للالتقاط',
      rejected: 'تم رفض المستثمر',
      pending: 'قيد الانتظار'
    },
    filters: {
      pending: 'قيد الانتظار',
      accepted: 'مقبول',
      rejected: 'مرفوض',
      all: 'الكل'
    },
    sections: {
      acceptedCaptures: 'الالتقاطات المقبولة'
    },
    messages: {
      noFiltered: 'لا يوجد مستثمرون يطابقون هذا الفلتر'
    },
    selection: {
      selected: 'محدد',
      selectAll: 'تحديد الكل',
      clearSelection: 'مسح',
      acceptSelected: 'قبول المحدد',
      rejectSelected: 'رفض المحدد',
      batchAccepted: 'مستثمرين تم قبولهم',
      batchRejected: 'مستثمرين تم رفضهم',
      duplicatesRemoved: 'تكرارات تم إزالتها'
    },
    entityTypes: {
      investor: 'مستثمر',
      teamMember: 'عضو فريق',
      founder: 'مؤسس',
      other: 'آخر'
    },
    labels: {
      entityType: 'نوع الكيان'
    },
    scraper: {
      foundPeople: 'الأشخاص المكتشفون'
    }
  }
};

let currentLanguage = 'en';

function t(key) {
  const value = getNestedValue(translations[currentLanguage], key);
  return value || getNestedValue(translations.en, key) || key;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}

function applyTranslations(lang) {
  currentLanguage = lang;
  const t = translations[lang];
  
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(t, key);
    if (value) {
      el.textContent = value;
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = getNestedValue(t, key);
    if (value) {
      el.placeholder = value;
    }
  });
  
  const langCodeEl = document.querySelector('.lang-code');
  if (langCodeEl) {
    langCodeEl.textContent = lang === 'ar' ? 'AR' : 'EN';
  }
}

async function toggleLanguage() {
  const newLang = currentLanguage === 'en' ? 'ar' : 'en';
  applyTranslations(newLang);
  
  await chrome.storage.sync.set({ [LANG_KEY]: newLang });
}

async function loadLanguagePreference() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([LANG_KEY], (result) => {
      const lang = result[LANG_KEY] || 'en';
      applyTranslations(lang);
      resolve(lang);
    });
  });
}

const state = {
  source_url: '',
  source_title: '',
  selected_text: '',
  editing_local_id: null,
  suggestions: {},
  ignoredSuggestions: new Set(),
  deepAi: {
    extracted: null,
    search_results: [],
    scraped_count: 0,
    query: null,
    additional_urls: [],
    merged_into_form: false
  },
  // Mode controller
  captureMode: 'person',          // 'person' | 'company' | 'bulk'
  pageType: 'unknown',            // detected from content script
  bulkTeamMembers: [],            // PersonStub[] from EXTRACT_TEAM_MEMBERS
  bulkSelectedIndices: new Set(), // indices of checked stubs
  bulkEnrichmentQueue: [],        // active enrichment jobs for selected people
  _enrichmentFields: null         // fields returned by inline enrichment
};

function hasDeepAiData() {
  return state.deepAi.extracted !== null && Object.keys(state.deepAi.extracted).length > 0;
}

// ---------------------------------------------------------------------------
// Mode Controller — switches the Capture tab between Person / Company / Bulk
// ---------------------------------------------------------------------------

const MODE_CONFIG = {
  person:  { icon: '🧑', label: 'Person Mode',  showFooter: true },
  company: { icon: '🏢', label: 'Company Mode', showFooter: true },
  bulk:    { icon: '👥', label: 'Team Mode',    showFooter: false }
};

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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

async function startInlineEnrichment() {
  const name     = (document.getElementById('investor-name')?.value || '').trim();
  const firm     = (document.getElementById('firm-name')?.value || '').trim();
  const linkedin = (document.getElementById('linkedin-url')?.value || '').trim();

  if (!name && !firm && !linkedin) {
    showToast('Fill in at least a name or LinkedIn URL first', 'warning');
    return;
  }

  // Expand the collapsible panel if collapsed
  const panelContent = document.getElementById('enrichment-panel-content');
  if (panelContent?.classList.contains('collapsed')) {
    panelContent.classList.remove('collapsed');
    const icon = document.getElementById('enrichment-toggle-icon');
    if (icon) icon.textContent = '▼';
  }

  const statusEl = document.getElementById('enrichment-status');
  const cardEl   = document.getElementById('enrichment-result-card');
  if (statusEl) statusEl.style.display = '';
  if (cardEl)   cardEl.style.display   = 'none';

  const query = [name, firm].filter(Boolean).join(' ') || linkedin;

  try {
    const settings = await getSettings();
    const apiBase  = settings.apiEndpoint || settings.backendUrl || '';

    let result = null;
    const tryV1 = async () => {
      const res = await fetch(`${apiBase}/api/v1/enrichment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, linkedin_url: linkedin, name, firm })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };
    const tryLegacy = async () => {
      const res = await fetch(`${apiBase}/api/deep-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, linkedin_url: linkedin, name, firm })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };

    try { result = await tryV1(); } catch { result = await tryLegacy(); }

    if (statusEl) statusEl.style.display = 'none';
    renderEnrichmentResultCard(result);
  } catch (err) {
    if (statusEl) statusEl.style.display = 'none';
    showToast('Enrichment failed: ' + err.message, 'error');
  }
}

function renderEnrichmentResultCard(result) {
  const cardEl   = document.getElementById('enrichment-result-card');
  const fieldsEl = document.getElementById('enrichment-fields-list');
  if (!cardEl || !fieldsEl) return;

  // Normalise result shape — handle both v1 and legacy response formats
  const emails = result.emails || (result.email ? [result.email] : []);
  const phones = result.phones || (result.phone ? [result.phone] : []);

  const fields = [];
  emails.forEach((e, i) => {
    if (e) fields.push({ label: i === 0 ? 'Email' : `Email ${i + 1}`, value: e, key: `email_${i}` });
  });
  phones.forEach((p, i) => {
    if (p) fields.push({ label: i === 0 ? 'Phone' : `Phone ${i + 1}`, value: p, key: `phone_${i}` });
  });
  if (result.website)          fields.push({ label: 'Website',    value: result.website,          key: 'website' });
  if (result.location_city)    fields.push({ label: 'City',       value: result.location_city,    key: 'city' });
  if (result.location_country) fields.push({ label: 'Country',    value: result.location_country, key: 'country' });
  if (result.twitter_url)      fields.push({ label: 'Twitter/X',  value: result.twitter_url,      key: 'notes_twitter' });

  if (!fields.length) {
    fieldsEl.innerHTML = '<p style="font-size:12px;color:#64748b;text-align:center;padding:8px;">No additional data found.</p>';
    cardEl.style.display = '';
    return;
  }

  // Store on state for "Apply All"
  state._enrichmentFields = fields;

  fieldsEl.innerHTML = fields.map((f, i) => `
    <div class="enrichment-field-row" data-field-idx="${i}">
      <span class="enrichment-field-label">${escapeHtml(f.label)}</span>
      <span class="enrichment-field-value">${escapeHtml(f.value)}</span>
      <button class="enrichment-apply-btn" data-field-idx="${i}" title="Apply to form">✓ Apply</button>
      <button class="enrichment-dismiss-btn" data-field-idx="${i}" title="Dismiss">✕</button>
    </div>
  `).join('');

  cardEl.style.display = '';
}

// Maps enrichment field key prefix → target form field ID(s)
function applyEnrichmentFieldByKey(key, value) {
  if (key.startsWith('email_')) {
    // Fill first empty email slot
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`email-${i}`);
      if (el && !el.value.trim()) { el.value = value; return; }
    }
    return;
  }
  if (key.startsWith('phone_')) {
    for (let i = 1; i <= 3; i++) {
      const el = document.getElementById(`phone-${i}`);
      if (el && !el.value.trim()) { el.value = value; return; }
    }
    return;
  }
  const simpleMap = { website: 'website', city: 'location-city', country: 'location-country' };
  if (simpleMap[key]) {
    const el = document.getElementById(simpleMap[key]);
    if (el && !el.value.trim()) el.value = value;
    return;
  }
  if (key === 'notes_twitter') {
    // Append to notes field
    const notesEl = document.getElementById('notes');
    if (notesEl) {
      const sep = notesEl.value.trim() ? '\n' : '';
      notesEl.value += sep + 'Twitter/X: ' + value;
    }
  }
}

function handleEnrichmentApply(idx) {
  const fields = state._enrichmentFields;
  if (!fields || !fields[idx]) return;
  applyEnrichmentFieldByKey(fields[idx].key, fields[idx].value);
  const row = document.querySelector(`.enrichment-field-row[data-field-idx="${idx}"]`);
  if (row) {
    row.style.opacity = '0.45';
    const applyBtn = row.querySelector('.enrichment-apply-btn');
    if (applyBtn) { applyBtn.textContent = '✓ Applied'; applyBtn.disabled = true; }
  }
}

function handleEnrichmentDismiss(idx) {
  const row = document.querySelector(`.enrichment-field-row[data-field-idx="${idx}"]`);
  if (row) row.remove();
}

function applyAllEnrichmentFields() {
  const fields = state._enrichmentFields;
  if (!fields) return;
  fields.forEach((_, i) => handleEnrichmentApply(i));
}

// ---------------------------------------------------------------------------
// Shared helpers for non-destructive form filling (used by Deep AI merge and scraper autofill)
function isEmptyValue(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string' && v.trim() === '') return true;
  if (Array.isArray(v) && v.length === 0) return true;
  return false;
}

function setIfEmpty(fieldId, value) {
  if (isEmptyValue(value)) return;
  const el = document.getElementById(fieldId);
  if (!el) return;
  const current = el.value;
  if (isEmptyValue(current)) {
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function unionList(existing, incoming) {
  const result = [...existing];
  const lowerSet = new Set(existing.map(e => e.toLowerCase().trim()));
  for (const item of incoming) {
    if (item && !lowerSet.has(item.toLowerCase().trim())) {
      result.push(item);
      lowerSet.add(item.toLowerCase().trim());
    }
  }
  return result;
}

function mergeEmailsIntoForm(incomingEmails) {
  const currentEmails = [];
  for (let i = 1; i <= 5; i++) {
    const val = document.getElementById(`email-${i}`).value.trim();
    if (val) currentEmails.push(val);
  }
  const merged = unionList(currentEmails, incomingEmails).slice(0, 5);
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`email-${i}`).value = merged[i-1] || '';
  }
}

function mergePhonesIntoForm(incomingPhones) {
  const currentPhones = [];
  for (let i = 1; i <= 5; i++) {
    const val = document.getElementById(`phone-${i}`).value.trim();
    if (val) currentPhones.push(val);
  }
  const merged = unionList(currentPhones, incomingPhones).slice(0, 5);
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`phone-${i}`).value = merged[i-1] || '';
  }
}

function mergeDeepAiIntoCaptureForm(extracted) {
  if (!extracted) return;
  
  // Map Deep AI fields to Capture form (fill blanks only)
  // investor_name <- extracted.name OR extracted.investor_name
  setIfEmpty('investor-name', extracted.name || extracted.investor_name);
  
  // firm_name <- extracted.firm_name OR extracted.company OR extracted.organization
  setIfEmpty('firm-name', extracted.firm_name || extracted.company || extracted.organization);
  
  // job_title <- extracted.job_title OR extracted.title OR extracted.role
  setIfEmpty('job-title', extracted.job_title || extracted.title || extracted.role);
  
  // website <- extracted.website OR extracted.domain
  setIfEmpty('website', extracted.website || extracted.domain);
  
  // linkedin_url <- extracted.linkedin OR extracted.linkedin_url
  setIfEmpty('linkedin-url', extracted.linkedin || extracted.linkedin_url);
  
  // Emails: merge into capture emails list (up to 5 slots)
  const incomingEmails = [];
  if (extracted.email) incomingEmails.push(extracted.email);
  if (Array.isArray(extracted.emails)) incomingEmails.push(...extracted.emails);
  mergeEmailsIntoForm(incomingEmails);
  
  // Phones: merge into capture phones list (up to 5 slots)
  const incomingPhones = [];
  if (extracted.phone) incomingPhones.push(extracted.phone);
  if (Array.isArray(extracted.phones)) incomingPhones.push(...extracted.phones);
  mergePhonesIntoForm(incomingPhones);
  
  // Notes: add evidence only once (with defensive null check)
  const notesEl = document.getElementById('notes');
  if (notesEl) {
    let notesVal = notesEl.value || '';
    
    // Add Deep AI evidence if not already present
    if (!notesVal.includes('[Deep AI]')) {
      const scrapedCount = state.deepAi.scraped_count || 0;
      const query = state.deepAi.query || '';
      notesVal = notesVal.trim();
      if (notesVal) notesVal += '\n\n';
      notesVal += `[Deep AI] scraped_count=${scrapedCount} query=${query}`;
    }
    
    // Add additional URLs if present and not already added
    if (state.deepAi.additional_urls && state.deepAi.additional_urls.length > 0 && !notesVal.includes('[Deep AI URLs]')) {
      notesVal += '\n\n[Deep AI URLs]\n' + state.deepAi.additional_urls.join('\n');
    }
    
    notesEl.value = notesVal;
    notesEl.dispatchEvent(new Event('input', { bubbles: true }));
  }
  
  // Mark that merge was performed
  state.deepAi.merged_into_form = true;
  
  console.log("mergeDeepAiIntoCaptureForm completed", { extracted });
}

function generateLocalId() {
  return 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([
      SETTINGS_KEYS.BACKEND_URL,
      SETTINGS_KEYS.API_KEY,
      SETTINGS_KEYS.CAPTURED_BY
    ], (result) => {
      resolve({
        backendUrl: result[SETTINGS_KEYS.BACKEND_URL] || '',
        apiKey: result[SETTINGS_KEYS.API_KEY] || '',
        capturedBy: result[SETTINGS_KEYS.CAPTURED_BY] || ''
      });
    });
  });
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

async function captureSelectedText() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) {
      showToast('No active tab found', 'error');
      return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, { type: 'CAPTURE_SELECTED_TEXT' });
    
    if (response?.selected_text) {
      state.selected_text = response.selected_text;
      document.getElementById('selected-text').value = state.selected_text;
      showToast('Selected text captured!', 'success');
    } else {
      showToast('No text selected on page', 'info');
    }
  } catch (error) {
    console.error('Error capturing selected text:', error);
    showToast('Could not capture text. Try refreshing the page.', 'error');
  }
}

async function captureFromPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) {
      showToast('No active tab found', 'error');
      return;
    }

    showToast('Capturing page...', 'info');

    const snapshot = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_SNAPSHOT' });
    
    if (snapshot?.error) {
      showToast('Unable to capture page data', 'error');
      return;
    }

    state.source_url = snapshot.url || '';
    state.source_title = snapshot.title || '';
    document.getElementById('source-url').value = state.source_url;
    document.getElementById('source-title').value = state.source_title;

    if (snapshot.selected_text) {
      state.selected_text = snapshot.selected_text;
      document.getElementById('selected-text').value = state.selected_text;
    }

    const settings = await getSettings();
    
    if (!settings.backendUrl) {
      showToast('Page captured. Configure Backend URL for AI extraction.', 'info');
      return;
    }

    const headingsArray = [];
    if (snapshot.headings?.h1) headingsArray.push(...snapshot.headings.h1);
    if (snapshot.headings?.h2) headingsArray.push(...snapshot.headings.h2);

    const requestBody = {
      source_url: snapshot.url || state.source_url,
      source_title: snapshot.title || state.source_title,
      meta_description: snapshot.meta_description || '',
      headings: headingsArray,
      visible_text: snapshot.visible_text || '',
      selected_text: snapshot.selected_text || '',
      emails_found: snapshot.emails || [],
      phones_found: snapshot.phones || [],
      page_type: state.pageType
    };

    showToast('Extracting fields...', 'info');

    // Try new v1 endpoint, fall back to legacy
    const extractEndpoint = `${settings.backendUrl}/api/v1/extract`;
    const fallbackExtract = `${settings.backendUrl}/api/extract`;
    let response = await fetch(extractEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
      body: JSON.stringify(requestBody)
    }).catch(() => null);
    if (!response || response.status === 404) {
      response = await fetch(fallbackExtract, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
        body: JSON.stringify(requestBody)
      });
    }

    const result = await response.json();

    if (!response.ok) {
      showToast(`Extraction failed: ${result.error || 'Unknown error'}`, 'error');
      return;
    }

    state.suggestions = result.data?.extracted || {};
    state.ignoredSuggestions = new Set();
    
    const autoFilled = autoFillHighMedium();
    renderSuggestions();
    
    if (autoFilled > 0) {
      showToast(`Page captured (${autoFilled} fields auto-filled)`, 'success');
    } else {
      showToast('Page captured', 'success');
    }
  } catch (error) {
    console.error('Error capturing from page:', error);
    showToast('Unable to capture page data', 'error');
  }
}

function autofillIfEmpty(fieldId, value) {
  if (!value) return;
  const field = document.getElementById(fieldId);
  if (field && !field.value.trim()) {
    field.value = value;
  }
}

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



async function getAddressBook() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] || []);
    });
  });
}

async function saveAddressBook(drafts) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: drafts }, resolve);
  });
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
    const capturedBy = settings.userEmail || 'extension_user';
    
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
        captured_by: settings.userEmail || 'extension_user',
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

// ---------------------------------------------------------------------------
// Company Mode — form data + upload
// ---------------------------------------------------------------------------

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

  if (!settings.capturedBy) {
    showToast('Please configure your email in settings', 'error');
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

  try {
    // Try new v1 endpoint first; if not found (404), fall back to legacy /api/capture
    let response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
      body: JSON.stringify(requestBody)
    }).catch(() => null);

    if (!response || response.status === 404) {
      response = await fetch(`${settings.backendUrl}/api/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
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
      showToast('Investor uploaded to ALKNZ Portal', 'success');
      state.editing_local_id = null;
    } else {
      showToast(`Upload failed: ${result.error || 'Unknown error'}`, 'error');
    }
  } catch (error) {
    console.error('Upload error:', error);
    showToast(`Upload failed: ${error.message}`, 'error');
  }
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

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function toggleAddressBook() {
  const content = document.getElementById('address-book-content');
  const icon = document.getElementById('collapse-icon');
  
  content.classList.toggle('collapsed');
  icon.classList.toggle('collapsed');
}

/**
 * Smart Map Selected Text
 * Analyzes the selected/captured text and maps it to the appropriate field
 */
async function smartMapSelectedText() {
  const selectedText = document.getElementById('selected-text').value.trim();
  
  if (!selectedText) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        const response = await chrome.tabs.sendMessage(tab.id, { type: 'CAPTURE_SELECTED_TEXT' });
        if (response?.selected_text) {
          state.selected_text = response.selected_text;
          document.getElementById('selected-text').value = response.selected_text;
          mapTextToField(response.selected_text);
          return;
        }
      }
    } catch (error) {
      console.error('Error capturing for smart map:', error);
    }
    showToast('No text selected to map', 'info');
    return;
  }
  
  mapTextToField(selectedText);
}

/**
 * Pattern matching to determine field type and fill accordingly
 */
function mapTextToField(text) {
  if (!text) return;
  
  const trimmed = text.trim();
  let mapped = false;
  let fieldName = '';

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailPattern.test(trimmed)) {
    const emailField = document.getElementById('email');
    if (!emailField.value) {
      emailField.value = trimmed;
      fieldName = 'Email';
      mapped = true;
    }
  }

  const phonePattern = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{7,}$/;
  if (!mapped && phonePattern.test(trimmed.replace(/\s/g, ''))) {
    const phoneField = document.getElementById('phone');
    if (!phoneField.value) {
      phoneField.value = trimmed;
      fieldName = 'Phone';
      mapped = true;
    }
  }

  const titlePatterns = /^(partner|principal|managing director|md|director|founder|co-founder|ceo|cfo|coo|cto|investor|venture partner|general partner|gp|limited partner|lp|associate|analyst|vice president|vp|senior|head of)/i;
  if (!mapped && titlePatterns.test(trimmed)) {
    const titleField = document.getElementById('job-title');
    if (!titleField.value) {
      titleField.value = trimmed;
      fieldName = 'Job Title';
      mapped = true;
    }
  }

  const locationPattern = /^([A-Za-z\s]+),\s*([A-Za-z\s]+)$/;
  const locationMatch = trimmed.match(locationPattern);
  if (!mapped && locationMatch) {
    const cityField = document.getElementById('location-city');
    const countryField = document.getElementById('location-country');
    if (!cityField.value && !countryField.value) {
      cityField.value = locationMatch[1].trim();
      countryField.value = locationMatch[2].trim();
      fieldName = 'Location';
      mapped = true;
    }
  }

  const websitePattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  if (!mapped && websitePattern.test(trimmed)) {
    const websiteField = document.getElementById('website');
    if (!websiteField.value) {
      websiteField.value = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      fieldName = 'Website';
      mapped = true;
    }
  }

  const firmPatterns = /(ventures|capital|partners|investments|fund|group|holdings|advisors|associates|llc|inc|ltd|corp)/i;
  if (!mapped && firmPatterns.test(trimmed) && trimmed.length < 100) {
    const firmField = document.getElementById('firm-name');
    if (!firmField.value) {
      firmField.value = trimmed;
      fieldName = 'Firm Name';
      mapped = true;
    }
  }

  const namePattern = /^[A-Z][a-z]+(\s+[A-Z][a-z]+){1,3}$/;
  if (!mapped && namePattern.test(trimmed) && trimmed.length < 50) {
    const nameField = document.getElementById('investor-name');
    if (!nameField.value) {
      nameField.value = trimmed;
      fieldName = 'Investor Name';
      mapped = true;
    }
  }

  if (mapped) {
    showToast(`Mapped to ${fieldName}`, 'success');
  } else {
    const notesField = document.getElementById('notes');
    const currentNotes = notesField.value;
    notesField.value = currentNotes ? `${currentNotes}\n${trimmed}` : trimmed;
    showToast('Added to Notes (no pattern match)', 'info');
  }
}

/**
 * AI Auto-Fill (Stub)
 * Prepares payload for AI processing - does not call backend yet
 */
async function aiAutoFill() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) {
      showToast('No active tab found', 'error');
      return;
    }

    showToast('Gathering page data...', 'info');

    const snapshot = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_SNAPSHOT' });
    
    if (snapshot?.error) {
      showToast('Could not capture page snapshot', 'error');
      return;
    }

    const settings = await getSettings();
    
    if (!settings.backendUrl) {
      showToast('Please configure Backend URL in settings', 'error');
      return;
    }

    const headingsArray = [];
    if (snapshot.headings?.h1) headingsArray.push(...snapshot.headings.h1);
    if (snapshot.headings?.h2) headingsArray.push(...snapshot.headings.h2);

    const requestBody = {
      source_url: snapshot.url || state.source_url,
      source_title: snapshot.title || state.source_title,
      meta_description: snapshot.meta_description || '',
      headings: headingsArray,
      visible_text: snapshot.visible_text || '',
      selected_text: snapshot.selected_text || ''
    };

    showToast('Extracting fields...', 'info');

    const response = await fetch(`${settings.backendUrl}/api/extract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();

    if (!response.ok) {
      showToast(`Extraction failed: ${result.error || 'Unknown error'}`, 'error');
      return;
    }

    state.suggestions = result.data?.extracted || {};
    state.ignoredSuggestions = new Set();
    
    const autoFilled = autoFillHighMedium();
    renderSuggestions();
    
    if (autoFilled > 0) {
      showToast(`AI Auto-Fill complete (${autoFilled} fields)`, 'success');
    } else {
      showToast('AI Auto-Fill complete', 'success');
    }
    
  } catch (error) {
    console.error('AI Auto-Fill error:', error);
    showToast('AI Auto-Fill failed', 'error');
  }
}

const FIELD_MAP = {
  investor_name: { id: 'investor-name', label: 'Investor Name' },
  job_title: { id: 'job-title', label: 'Job Title' },
  firm_name: { id: 'firm-name', label: 'Firm Name' },
  location_city: { id: 'location-city', label: 'City' },
  location_country: { id: 'location-country', label: 'Country' },
  website: { id: 'website', label: 'Website' },
  email: { id: 'email', label: 'Email' },
  phone: { id: 'phone', label: 'Phone' },
  whatsapp: { id: 'whatsapp', label: 'WhatsApp' },
  description: { id: 'notes', label: 'Description/Notes' },
  investor_type: { id: 'investor-type', label: 'Investor Type' }
};

function renderSuggestions() {
  const listEl = document.getElementById('suggestions-list');
  const emptyEl = document.getElementById('suggestions-empty');
  const actionsEl = document.getElementById('suggestions-actions');
  
  listEl.innerHTML = '';
  
  const validSuggestions = Object.entries(state.suggestions).filter(([key, field]) => {
    return field.value && !state.ignoredSuggestions.has(key);
  });
  
  if (validSuggestions.length === 0) {
    listEl.style.display = 'none';
    actionsEl.style.display = 'none';
    emptyEl.style.display = 'block';
    emptyEl.textContent = state.ignoredSuggestions.size > 0 
      ? 'All suggestions reviewed.' 
      : 'No suggestions yet. Click "AI Auto-Fill" to extract fields.';
    return;
  }
  
  emptyEl.style.display = 'none';
  listEl.style.display = 'flex';
  actionsEl.style.display = 'flex';
  
  validSuggestions.forEach(([key, field]) => {
    const fieldInfo = FIELD_MAP[key];
    if (!fieldInfo) return;
    
    const evidence = field.evidence ? 
      (field.evidence.length > 120 ? field.evidence.slice(0, 117) + '...' : field.evidence) : 
      'No evidence';
    
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.dataset.field = key;
    item.innerHTML = `
      <div class="suggestion-header">
        <span class="suggestion-label">${escapeHtml(fieldInfo.label)}</span>
        <span class="confidence-chip ${field.confidence.toLowerCase()}">${field.confidence}</span>
      </div>
      <div class="suggestion-value">${escapeHtml(field.value)}</div>
      <div class="suggestion-evidence" title="${escapeHtml(field.evidence || '')}">${escapeHtml(evidence)}</div>
      <div class="suggestion-buttons">
        <button class="suggestion-btn accept" data-field="${key}">Accept</button>
        <button class="suggestion-btn ignore" data-field="${key}">Ignore</button>
      </div>
    `;
    listEl.appendChild(item);
  });
  
  listEl.querySelectorAll('.suggestion-btn.accept').forEach(btn => {
    btn.addEventListener('click', () => acceptSuggestion(btn.dataset.field));
  });
  
  listEl.querySelectorAll('.suggestion-btn.ignore').forEach(btn => {
    btn.addEventListener('click', () => ignoreSuggestion(btn.dataset.field));
  });
}

function acceptSuggestion(fieldKey, skipConfirm = false) {
  const field = state.suggestions[fieldKey];
  const fieldInfo = FIELD_MAP[fieldKey];
  
  if (!field || !fieldInfo) return;
  
  const inputEl = document.getElementById(fieldInfo.id);
  if (!inputEl) return;
  
  const currentValue = inputEl.value.trim();
  
  if (currentValue && !skipConfirm) {
    const confirmed = confirm(`Replace "${currentValue}" with "${field.value}"?`);
    if (!confirmed) return;
  }
  
  inputEl.value = field.value;
  state.ignoredSuggestions.add(fieldKey);
  renderSuggestions();
  showToast(`${fieldInfo.label} accepted`, 'success');
}

function ignoreSuggestion(fieldKey) {
  state.ignoredSuggestions.add(fieldKey);
  renderSuggestions();
}

function autoFillHighMedium() {
  let filled = 0;
  
  Object.entries(state.suggestions).forEach(([key, field]) => {
    if (!field.value) return;
    if (field.confidence !== 'HIGH' && field.confidence !== 'MEDIUM') return;
    
    const fieldInfo = FIELD_MAP[key];
    if (!fieldInfo) return;
    
    const inputEl = document.getElementById(fieldInfo.id);
    if (!inputEl) return;
    
    if (!inputEl.value.trim()) {
      inputEl.value = field.value;
      state.ignoredSuggestions.add(key);
      filled++;
    }
  });
  
  return filled;
}

function acceptAllHighMedium() {
  const toAccept = Object.entries(state.suggestions).filter(([key, field]) => {
    return field.value && 
           !state.ignoredSuggestions.has(key) && 
           (field.confidence === 'HIGH' || field.confidence === 'MEDIUM');
  });
  
  if (toAccept.length === 0) {
    showToast('No high/medium suggestions to accept', 'info');
    return;
  }
  
  let accepted = 0;
  toAccept.forEach(([key, field]) => {
    const fieldInfo = FIELD_MAP[key];
    if (!fieldInfo) return;
    
    const inputEl = document.getElementById(fieldInfo.id);
    if (!inputEl) return;
    
    if (!inputEl.value.trim()) {
      inputEl.value = field.value;
      state.ignoredSuggestions.add(key);
      accepted++;
    }
  });
  
  renderSuggestions();
  showToast(`Accepted ${accepted} suggestions`, 'success');
}

function toggleSuggestions() {
  const content = document.getElementById('suggestions-content');
  const icon = document.getElementById('suggestions-collapse-icon');
  
  content.classList.toggle('collapsed');
  icon.classList.toggle('collapsed');
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });

  const footer = document.getElementById('capture-footer');
  if (footer) {
    footer.style.display = tabId === 'capture' ? 'block' : 'none';
  }
}

const deepSearchState = {
  isSearching: false,
  currentResult: null,
  history: []
};

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

async function saveSearchHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.set({ 'ALKNZ_SEARCH_HISTORY': deepSearchState.history }, resolve);
  });
}

async function loadSearchHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['ALKNZ_SEARCH_HISTORY'], (result) => {
      deepSearchState.history = result['ALKNZ_SEARCH_HISTORY'] || [];
      resolve();
    });
  });
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

const scraperState = {
  isScanning: false,
  foundInvestors: [],
  selectedInvestorIndex: null,
  currentFilter: 'pending',
  selectedIndices: new Set(),
  companyInfo: null,
  capturedOrganization: null
};

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
  document.getElementById('btn-smart-map').addEventListener('click', smartMapSelectedText);
  document.getElementById('btn-ai-autofill').addEventListener('click', aiAutoFill);
  document.getElementById('btn-accept-all').addEventListener('click', acceptAllHighMedium);
  document.getElementById('btn-clear-form').addEventListener('click', () => {
    clearForm();
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
