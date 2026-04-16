import { DEFAULT_RULES } from '../shared/constants.js';

let _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));
let _cachedResult = { exactPatterns: new Set(), otherRules: [] };

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
