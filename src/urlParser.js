export function parse(rawUrl) {
  try {
    return new URL(rawUrl);
  } catch {
    return null;
  }
}

export function removeParams(urlObj, paramNames) {
  const removed = [];
  for (const name of paramNames) {
    if (urlObj.searchParams.has(name)) {
      urlObj.searchParams.delete(name);
      removed.push(name);
    }
  }
  return removed;
}

export function serialize(urlObj) {
  return urlObj.toString();
}
