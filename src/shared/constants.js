import { DEFAULT_RULES } from './rules.js';

export { DEFAULT_RULES };
export const STORAGE_KEY = 'hatsune_micro_state';

/**
 * Declarative Net Request rule ID.
 * Hardcoded to 1 for the main query-cleaning rule.
 * If additional DNR rules are added in the future, allocate a separate 
 * range of IDs (e.g., 2, 3...) to avoid conflicts.
 */
export const DNR_RULE_ID = 1;
