import { parse, removeParams, serialize } from './urlParser.js';
import { rulesRegistry } from '../rules/rulesRegistry.js';
import { getParamsToRemove } from '../rules/rulesEngine.js';

export function clean(rawUrl) {
  if (!rawUrl.includes('?') && !rawUrl.includes('#')) {
    return { changed: false, originalUrl: rawUrl, cleanUrl: rawUrl, removedParams: [] };
  }

  const urlObj = parse(rawUrl);
  if (!urlObj) {
    return { changed: false, originalUrl: rawUrl, cleanUrl: rawUrl, removedParams: [] };
  }

  const rules = rulesRegistry.getAll();
  let removedParams = [];

  if (urlObj.search !== '') {
    const toRemove = getParamsToRemove(urlObj.searchParams, rules);
    if (toRemove.length > 0) {
      removedParams = removedParams.concat(removeParams(urlObj, toRemove));
    }
  }

  if (urlObj.hash.includes('?') || urlObj.hash.includes('=')) {
    const hashContent = urlObj.hash.startsWith('#') ? urlObj.hash.substring(1) : urlObj.hash;

    const hashParts = hashContent.split('?');
    const searchPart = hashParts.length > 1 ? hashParts[1] : (hashContent.includes('=') ? hashContent : '');

    if (searchPart) {
      const hashParams = new URLSearchParams(searchPart);
      const toRemoveFromHash = getParamsToRemove(hashParams, rules);
      
      if (toRemoveFromHash.length > 0) {
        toRemoveFromHash.forEach(p => {
          hashParams.delete(p);
          removedParams.push(`hash:${p}`);
        });
        
        const newHashSearch = hashParams.toString();
        const pathPart = hashParts[0];
        urlObj.hash = newHashSearch ? `${pathPart}?${newHashSearch}` : pathPart;
      }
    }
  }

  if (removedParams.length === 0) {
    return { changed: false, originalUrl: rawUrl, cleanUrl: rawUrl, removedParams: [] };
  }

  return { changed: true, originalUrl: rawUrl, cleanUrl: serialize(urlObj), removedParams };
}
