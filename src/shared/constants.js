export const STORAGE_KEY = 'hatsune_micro_state';
export const DNR_RULE_ID = 1;

export const DEFAULT_RULES = [
  { id: 'utm',    pattern: 'utm_',   type: 'prefix', priority: 10 },
  { id: 'fbclid', pattern: 'fbclid', type: 'exact',  priority: 10 },
  { id: 'gclid',  pattern: 'gclid',  type: 'exact',  priority: 10 },
  { id: 'msclkid',pattern: 'msclkid',type: 'exact',  priority: 10 },
  { id: 'mc_eid', pattern: 'mc_eid', type: 'exact',  priority: 10 },
  { id: 'igshid', pattern: 'igshid', type: 'exact',  priority: 10 },
];
