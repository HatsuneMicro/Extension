import { clean } from '../core/hatsuneMicro.js';
import { redirect } from './redirectController.js';
import { storageService } from '../services/storageService.js';

function handleNavigation({ tabId, url, frameId }) {
  if (frameId !== 0) return;
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
