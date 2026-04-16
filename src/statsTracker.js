import { storageService } from './storageService.js';

export const statsTracker = {
  increment() {
    const current = storageService.get('stats') ?? { cleaned: 0 };
    storageService.set('stats', { cleaned: current.cleaned + 1 });
  },
  getCount() {
    return storageService.get('stats')?.cleaned ?? 0;
  },
};
