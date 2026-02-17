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
