export function getParamsToRemove(searchParams, rules) {
  const toRemove = [];

  for (const [key] of searchParams) {
    for (const rule of rules) {
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
    case 'exact':  return key === rule.pattern;
    case 'regex':  return rule.pattern.test(key);
    default:       return false;
  }
}
