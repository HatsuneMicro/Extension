import { STORAGE_KEY } from '../shared/constants.js';

let _cache = null;
let _writeTimer = null;

const api = globalThis.browser || globalThis.chrome;

export const storageService = {
  async load() {
    if (_cache) return _cache;
    const data = await api.storage.local.get(STORAGE_KEY);
    _cache = data[STORAGE_KEY] ?? { enabled: true, userRules: [] };
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
      api.storage.local.set({ [STORAGE_KEY]: _cache });
    }, 500);
  },
};

api.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) {
    _cache = changes[STORAGE_KEY].newValue;
  }
});
