export async function redirect(tabId, cleanUrl) {
  try {
    await browser.tabs.update(tabId, { url: cleanUrl, loadReplace: true });
  } catch (e) {
    console.error('[Hatsune Micro] Redirect failed:', e);
  }
}
