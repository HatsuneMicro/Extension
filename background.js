import { storageService } from './src/storageService.js';
import { rulesRegistry } from './src/rulesRegistry.js';
import { registerNavigationListener } from './src/navigationHandler.js';

async function init() {
  await storageService.load();

  const userRules = storageService.get('userRules') ?? [];
  userRules.forEach(r => rulesRegistry.add(r));

  registerNavigationListener();
}

init();
