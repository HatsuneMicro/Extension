import { DEFAULT_RULES, STORAGE_KEY, DNR_RULE_ID } from '../shared/constants.js';
import { storageService } from '../services/storageService.js';

let _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));
let _cachedResult = { exactPatterns: new Set(), otherRules: [] };

const api = globalThis.browser || globalThis.chrome;

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
  _syncToDNR(exact, other, enabled);
}

async function _syncToDNR(exactSet, otherRules, enabled) {
  if (!api.declarativeNetRequest) return;

  try {
    const existingRules = await api.declarativeNetRequest.getDynamicRules();
    const existingIds = existingRules.map(r => r.id);


    if (!enabled) {
      if (existingIds.length > 0) {
        await api.declarativeNetRequest.updateDynamicRules({ removeRuleIds: existingIds });
      }
      return;
    }

    const paramsToStrip = [...exactSet];
    otherRules.forEach(r => {
      if (r.type === 'prefix') {
        if (r.pattern === 'utm_') {
          paramsToStrip.push('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content');
        } else {
          paramsToStrip.push(r.pattern);
        }
      }
    });

    const rule = {
      id: DNR_RULE_ID,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: { transform: { removeQueryParameters: paramsToStrip } }
      },
      condition: {
        urlFilter: '*',
        resourceTypes: ['main_frame', 'sub_frame']
      }
    };

    await api.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingIds,
      addRules: [rule]
    });
  } catch (e) { }
}

_updateCache();

api.storage.onChanged.addListener((changes, area) => {
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
