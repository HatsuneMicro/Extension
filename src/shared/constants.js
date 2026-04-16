export const PARAM_PREFIXES = ['utm_', 'fbclid', 'gclid', 'mc_', 'ref', 'source'];

export const DEFAULT_RULES = [
  { id: 'utm',    pattern: 'utm_',   type: 'prefix', priority: 10 },
  { id: 'fbclid', pattern: 'fbclid', type: 'exact',  priority: 10 },
  { id: 'gclid',  pattern: 'gclid',  type: 'exact',  priority: 10 },
  { id: 'mc_eid', pattern: 'mc_',    type: 'prefix', priority: 10 },
  { id: 'yclid',  pattern: 'yclid',  type: 'exact',  priority: 10 },
  { id: 'msclkid',pattern: 'msclkid',type: 'exact',  priority: 10 },
];
