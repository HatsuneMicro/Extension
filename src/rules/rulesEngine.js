export function getParamsToRemove(urlParams, { exactPatterns, otherRules }) {
  const toRemove = new Set();

  for (const [key, _] of urlParams) {
    if (exactPatterns.has(key)) {
      toRemove.add(key);
      continue;
    }

    for (const rule of otherRules) {
      if (rule.type === 'prefix' && key.startsWith(rule.pattern)) {
        toRemove.add(key);
        break;
      }
      if (rule.type === 'regex' && rule._compiled && rule._compiled.test(key)) {
        toRemove.add(key);
        break;
      }
    }
  }

  return toRemove;
}
