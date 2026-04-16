import { DEFAULT_RULES } from './shared/constants.js';

let _rules = new Map(DEFAULT_RULES.map(r => [r.id, r]));

export const rulesRegistry = {
  getAll: () => [..._rules.values()].sort((a, b) => b.priority - a.priority),
  add:    (rule) => _rules.set(rule.id, rule),
  remove: (id)   => _rules.delete(id),
  reset:  ()     => { _rules = new Map(DEFAULT_RULES.map(r => [r.id, r])); },
};
