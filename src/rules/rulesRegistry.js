import { DEFAULT_RULES, STORAGE_KEY, DNR_RULE_ID } from '../shared/constants.js';
import { storageService } from '../services/storageService.js';

let _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));
let _cachedResult = { exactPatterns: new Set(), otherRules: [] };
let _lastDnrState = '';

function _updateCache() {
  const exact = new Set();
  const other = [];

  for (const rule of _rules.values()) {
    if (rule.type === 'exact') {
      exact.add(rule.pattern);
    } else {
      const compiled = rule.type === 'regex' ? new RegExp(rule.pattern, 'i') : null;
      other.push({ ...rule, _compiled: compiled });
    }
  }

  other.sort((a, b) => b.priority - a.priority);
  _cachedResult = { exactPatterns: exact, otherRules: other };

  const enabled = storageService.get('enabled') ?? true;
  
  // Only sync to DNR if rules or enabled state actually changed
  const dnrState = JSON.stringify({
    exact: [...exact].sort(),
    other: other.map(r => ({ p: r.pattern, t: r.type, pr: r.priority })),
    enabled
  });

  if (dnrState !== _lastDnrState) {
    _lastDnrState = dnrState;
    _syncToDNR(exact, other, enabled).catch(() => {});
  }
}

async function _syncToDNR(exactSet, otherRules, enabled) {
  if (!browser.declarativeNetRequest) return;

  try {
    const existingRules = await browser.declarativeNetRequest.getDynamicRules();
    const existingIds = existingRules.map(r => r.id);

    if (!enabled) {
      if (existingIds.length > 0) {
        await browser.declarativeNetRequest.updateDynamicRules({ removeRuleIds: existingIds });
      }
      return;
    }

    const exactParams = [...exactSet];
    const regexParams = [];

    otherRules.forEach(r => {
      if (r.type === 'prefix') {
        regexParams.push(`^${r.pattern}.*`);
      } else if (r.type === 'regex') {
        regexParams.push(r.pattern);
      }
    });

    const rule = {
      id: DNR_RULE_ID,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          transform: {
            removeQueryParameters: exactParams,
            removeQueryParametersMatching: regexParams
          }
        }
      },
      condition: {
        urlFilter: '*',
        resourceTypes: ['main_frame', 'sub_frame']
      }
    };

    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingIds,
      addRules: [rule]
    });
  } catch { }
}

_updateCache();

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) {
    _updateCache();
  }
});

export const rulesRegistry = {
  getAll: () => _cachedResult,
  add: (rule) => {
    _rules.set(rule.id, rule);
    _updateCache();
  },
  remove: (id) => {
    _rules.delete(id);
    _updateCache();
  },
  reset: () => {
    _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));
    _updateCache();
  },
};
