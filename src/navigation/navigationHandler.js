import { clean } from '../core/hatsuneMicro.js';
import { redirect } from './redirectController.js';
import { storageService } from '../services/storageService.js';

const _recentlyProcessed = new Map();
const RECENT_TTL = 200;

// Periodic cleanup to prevent obsolete entries from accumulating during active browsing
setInterval(() => {
  const now = Date.now();
  for (const [key, time] of _recentlyProcessed) {
    if (now - time > RECENT_TTL) {
      _recentlyProcessed.delete(key);
    }
  }
}, 60000);

function handleNavigation({ tabId, url, frameId }) {
  if (frameId !== 0) return;

  const now = Date.now();
  if (_recentlyProcessed.has(url) && (now - _recentlyProcessed.get(url)) < RECENT_TTL) {
    return;
  }
  _recentlyProcessed.set(url, now);

  if (!storageService.get('enabled')) return;

  const result = clean(url);
  if (!result.changed) return;

  redirect(tabId, result.cleanUrl);
}

export function registerNavigationListener() {
  const filter = {
    url: [{ schemes: ['http', 'https'] }]
  };

  browser.webNavigation.onBeforeNavigate.addListener(handleNavigation, filter);
  browser.webNavigation.onHistoryStateUpdated.addListener(handleNavigation, filter);
}
