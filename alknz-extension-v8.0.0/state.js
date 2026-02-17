const STORAGE_KEY = 'ALKNZ_ADDRESS_BOOK';
const SETTINGS_KEYS = {
  BACKEND_URL:  'ALKNZ_BACKEND_URL',
  API_KEY:      'ALKNZ_API_KEY',
  CAPTURED_BY:  'ALKNZ_CAPTURED_BY',
  AUTH_TOKEN:   'ALKNZ_AUTH_TOKEN',
  USER_ID:      'ALKNZ_USER_ID',
  USER_NAME:    'ALKNZ_USER_NAME',
  USER_EMAIL:   'ALKNZ_USER_EMAIL'
};

const LANG_KEY = 'ALKNZ_LANGUAGE';

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

const deepSearchState = {
  isSearching: false,
  currentResult: null,
  history: []
};

const scraperState = {
  isScanning: false,
  foundInvestors: [],
  selectedInvestorIndex: null,
  currentFilter: 'pending',
  selectedIndices: new Set(),
  companyInfo: null,
  capturedOrganization: null
};
