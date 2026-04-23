import { storageService } from './services/storageService.js';
import { rulesRegistry } from './rules/rulesRegistry.js';
import { registerNavigationListener, initEnabled } from './navigation/navigationHandler.js';

async function init() {
  await storageService.load();
  initEnabled(storageService.get('enabled'));

  const userRules = storageService.get('userRules') ?? [];
  userRules.forEach(r => rulesRegistry.add(r));

  registerNavigationListener();
}

init();
