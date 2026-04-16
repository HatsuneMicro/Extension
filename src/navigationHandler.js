import { clean } from './hatsuneMicro.js';
import { redirect } from './redirectController.js';
import { statsTracker } from './statsTracker.js';
import { storageService } from './storageService.js';

function handleNavigation({ tabId, url, frameId }) {
  if (frameId !== 0) return;
  if (!storageService.get('enabled')) return;

  const result = clean(url);
  if (!result.changed) return;

  console.log(`[Hatsune Micro] Cleaning: ${url} -> ${result.cleanUrl}`);
  redirect(tabId, result.cleanUrl);
  statsTracker.increment();
}

export function registerNavigationListener() {
  browser.webNavigation.onBeforeNavigate.addListener(handleNavigation);
  browser.webNavigation.onHistoryStateUpdated.addListener(handleNavigation);
}
