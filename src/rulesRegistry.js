import { DEFAULT_RULES } from './shared/constants.js';

let _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));
let _sortedCache = null;

function _updateCache() {
  _sortedCache = [..._rules.values()].sort((a, b) => b.priority - a.priority);
}
_updateCache();

export const rulesRegistry = {
  getAll: () => _sortedCache,
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
