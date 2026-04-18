export const STORAGE_KEY = 'hatsune_micro_state';

/**
 * Declarative Net Request rule ID.
 * Hardcoded to 1 for the main query-cleaning rule.
 * If additional DNR rules are added in the future, allocate a separate 
 * range of IDs (e.g., 2, 3...) to avoid conflicts.
 */
export const DNR_RULE_ID = 1;

export const DEFAULT_RULES = [
  { id: 'utm',    pattern: 'utm_',   type: 'prefix', priority: 10 },
  { id: 'fbclid', pattern: 'fbclid', type: 'exact',  priority: 10 },
  { id: 'gclid',  pattern: 'gclid',  type: 'exact',  priority: 10 },
  { id: 'msclkid',pattern: 'msclkid',type: 'exact',  priority: 10 },
  { id: 'mc_eid', pattern: 'mc_eid', type: 'exact',  priority: 10 },
  { id: 'igshid', pattern: 'igshid', type: 'exact',  priority: 10 },
];
