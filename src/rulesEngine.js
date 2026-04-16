export function getParamsToRemove(searchParams, rules) {
  const { exactPatterns, otherRules } = rules;
  const toRemove = [];

  for (const [key] of searchParams) {
    if (exactPatterns.has(key)) {
      toRemove.push(key);
      continue;
    }

    for (const rule of otherRules) {
      if (matches(key, rule)) {
        toRemove.push(key);
        break;
      }
    }
  }

  return toRemove;
}

function matches(key, rule) {
  switch (rule.type) {
    case 'prefix': return key.startsWith(rule.pattern);
    case 'regex':  return rule.pattern.test(key);
    default:       return false;
  }
}
