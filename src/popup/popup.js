import { STORAGE_KEY } from '../shared/constants.js';

const toggle = document.getElementById('statusToggle');

async function initState() {
  const data = await browser.storage.local.get(STORAGE_KEY);
  const state = data[STORAGE_KEY] || { enabled: true };
  toggle.checked = state.enabled;
}

toggle.addEventListener('change', async () => {
  const data = await browser.storage.local.get(STORAGE_KEY);
  const state = data[STORAGE_KEY] || { enabled: true, userRules: [] };

  state.enabled = toggle.checked;

  await browser.storage.local.set({ [STORAGE_KEY]: state });
});

initState();
