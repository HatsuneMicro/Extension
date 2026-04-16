import { storageService } from './services/storageService.js';
import { rulesRegistry } from './rules/rulesRegistry.js';
import { registerNavigationListener } from './navigation/navigationHandler.js';

async function init() {
  await storageService.load();

  const userRules = storageService.get('userRules') ?? [];
  userRules.forEach(r => rulesRegistry.add(r));

  registerNavigationListener();
}

init();
