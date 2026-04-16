import { parse, removeParams, serialize } from './urlParser.js';
import { rulesRegistry } from './rulesRegistry.js';
import { getParamsToRemove } from './rulesEngine.js';

export function clean(rawUrl) {
  const urlObj = parse(rawUrl);
  if (!urlObj || urlObj.search === '') {
    return { changed: false, originalUrl: rawUrl, cleanUrl: rawUrl, removedParams: [] };
  }

  const rules = rulesRegistry.getAll();
  const toRemove = getParamsToRemove(urlObj.searchParams, rules);

  if (toRemove.length === 0) {
    return { changed: false, originalUrl: rawUrl, cleanUrl: rawUrl, removedParams: [] };
  }

  const removed = removeParams(urlObj, toRemove);
  return { changed: true, originalUrl: rawUrl, cleanUrl: serialize(urlObj), removedParams: removed };
}
