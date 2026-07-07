const CONFIRM_LABEL = 'Copied!';
const CONFIRM_DURATION_MS = 2000;

export function initContactCopy() {
  const link = document.querySelector('[data-copy-email]');
  const label = link?.querySelector('[data-copy-email-label]');
  if (!link || !label || !navigator.clipboard) return;

  const originalLabel = label.textContent;
  let resetTimer;

  link.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(link.dataset.email);
    } catch {
      // Clipboard write blocked (permissions, non-secure context) —
      // fall through to whatever mailto: would have done anyway.
      window.location.href = link.href;
      return;
    }

    label.textContent = CONFIRM_LABEL;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      label.textContent = originalLabel;
    }, CONFIRM_DURATION_MS);
  });
}
