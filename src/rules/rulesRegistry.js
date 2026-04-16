import { DEFAULT_RULES } from '../shared/constants.js';

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
      other.push(rule);
    }
  }

  other.sort((a, b) => b.priority - a.priority);

  _cachedResult = { exactPatterns: exact, otherRules: other };

  _syncToDNR(exact, other);
}

async function _syncToDNR(exactSet, otherRules) {
  if (!api.declarativeNetRequest) return;

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
    id: 1,
    priority: 1,
    action: {
      type: 'redirect',
      redirect: {
        transform: { removeQueryParameters: paramsToStrip }
      }
    },
    condition: {
      urlFilter: '*',
      resourceTypes: ['main_frame']
    }
  };

  try {
    const existingRules = await api.declarativeNetRequest.getDynamicRules();
    const existingIds = existingRules.map(r => r.id);

    await api.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingIds,
      addRules: [rule]
    });
  } catch (e) {}
}

_updateCache();

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
  reset:  () => {
    _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));
    _updateCache();
  },
};
