import { STORAGE_KEY } from '../shared/constants.js';

const toggle = document.getElementById('statusToggle');
let _state = { enabled: true, userRules: [] };

async function init() {
  const data = await browser.storage.local.get(STORAGE_KEY);
  _state = data[STORAGE_KEY] ?? _state;
  toggle.checked = _state.enabled;
}

toggle.addEventListener('change', () => {
  _state.enabled = toggle.checked;
  browser.storage.local.set({ [STORAGE_KEY]: _state });
});

init();
