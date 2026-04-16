const STORAGE_KEY = 'hatsune_micro_state';
let _cache = null;
let _writeTimer = null;

export const storageService = {
  async load() {
    if (_cache) return _cache;
    const data = await browser.storage.local.get(STORAGE_KEY);
    _cache = data[STORAGE_KEY] ?? { enabled: true, stats: { cleaned: 0 }, userRules: [] };
    return _cache;
  },

  get(key) {
    return _cache?.[key];
  },

  set(key, value) {
    if (!_cache) return;
    _cache[key] = value;
    clearTimeout(_writeTimer);
    _writeTimer = setTimeout(() => {
      browser.storage.local.set({ [STORAGE_KEY]: _cache });
    }, 500);
  },
};
