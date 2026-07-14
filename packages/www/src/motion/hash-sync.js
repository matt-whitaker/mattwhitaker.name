import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Keeps the URL hash "live" against scroll position, in both directions:
//
//  - Scrollspy: as a section reaches (or pins across) the viewport's
//    vertical center, the hash updates to it via replaceState — no
//    history spam, no scroll side effects. Back at the top (first
//    section), the hash is stripped so the resting URL stays clean.
//  - Deep links: loading /#music native-jumps before the career pin's
//    multi-viewport spacer exists, so the browser lands in the wrong
//    place once GSAP shifts the layout. After full load (pins built,
//    images sized), we re-scroll to where the target actually ended up.
//
// Section detection is an IntersectionObserver against the viewport
// center line, not a ScrollTrigger start/end range — same reasoning as
// the nav invert in emwhit.js: precomputed scroll-pixel ranges drift
// out of sync with pinned layout, live geometry can't. Exactly one
// section sits under the center line at a time, and a pinned section
// keeps covering it for its whole pinned span, which is precisely the
// "reached or pinned" semantic we want.
export function initHashSync() {
  // Homepage only — detail pages share components (SocialFooter's
  // #contact section) but shouldn't grow hashes while scrolling.
  const hero = document.querySelector('[data-hero]');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!hero || !sections.length) return;

  // Captured before the observer's initial callback can overwrite it.
  const deepLinkId = window.location.hash.slice(1);
  const baseUrl = () => window.location.pathname + window.location.search;

  let current = null;
  const setHash = (id) => {
    if (id === current) return;
    current = id;
    history.replaceState(null, '', id === sections[0].id ? baseUrl() : baseUrl() + '#' + id);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setHash(entry.target.id);
      }
    },
    // Collapse the observation root to a single line 30% down the
    // viewport — an incoming section claims the hash once it crosses
    // the upper third, which reads quicker than waiting for center.
    // The two percentages must sum to 100 so it stays a line (exactly
    // one section active at a time, no overlap or dead zones).
    { rootMargin: '-30% 0px -70% 0px' },
  );
  sections.forEach((section) => observer.observe(section));

  // Short final sections (contact) may never reach the center line on
  // tall viewports — scrolled to the very bottom, credit the last one.
  window.addEventListener(
    'scroll',
    () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setHash(sections[sections.length - 1].id);
      }
    },
    { passive: true },
  );

  if (!deepLinkId) return;

  const jumpToDeepLink = () => {
    const el = document.getElementById(deepLinkId);
    if (!el) return;

    // Pinned sections land at their pin's engage point; everything
    // else at its own top, less the fixed nav's height so headings
    // don't start underneath it.
    const pinned = ScrollTrigger.getAll().find((st) => st.pin === el);
    const navHeight = document.querySelector('[data-nav]')?.getBoundingClientRect().height ?? 0;
    const top = pinned
      ? pinned.start
      : Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight);

    // 'instant' also bypasses the html { scroll-smooth } rule — a slow
    // animated crawl to a deep link would just delay the content.
    window.scrollTo({ top, behavior: 'instant' });
  };

  // window load, not init time: ScrollTrigger does its own final
  // refresh at load (fonts/images settled), and pin positions are only
  // trustworthy after it. The rAF puts us after that refresh.
  if (document.readyState === 'complete') {
    requestAnimationFrame(jumpToDeepLink);
  } else {
    window.addEventListener('load', () => requestAnimationFrame(jumpToDeepLink), { once: true });
  }
}
