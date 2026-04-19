import { STORAGE_KEY } from '../shared/constants.js';

let _cache = null;
let _writeTimer = null;
let _loadPromise = null;

export const storageService = {
  load() {
    if (_cache) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = browser.storage.local.get(STORAGE_KEY).then(data => {
        _cache = data[STORAGE_KEY] ?? { enabled: true, userRules: [] };
        return _cache;
      });
    }
    return _loadPromise;
  },

  get(key) {
    return _cache?.[key];
  },

  set(key, value) {
    if (!_cache) return;
    _cache[key] = value;
    clearTimeout(_writeTimer);
    _writeTimer = setTimeout(() => {
      _writeTimer = null;
      browser.storage.local.set({ [STORAGE_KEY]: _cache });
    }, 500);
  },
};

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (_writeTimer) {
      clearTimeout(_writeTimer);
      browser.storage.local.set({ [STORAGE_KEY]: _cache });
    }
  });
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) {
    _cache = changes[STORAGE_KEY].newValue;
  }
});
