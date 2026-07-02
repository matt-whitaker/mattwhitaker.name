const CONFIRM_LABEL = 'Copied!';
const CONFIRM_DURATION_MS = 2000;

// The "Say hello" CTA shows the email as its own label and copies it on
// click — no form, no send-side server, so mailto: alone isn't reliable
// (it silently no-ops for anyone without a registered mail client). The
// href stays a real mailto: link so it still degrades gracefully with
// JS off; this just intercepts the click to do something that always
// works when JS is available.
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
