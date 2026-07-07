import gsap from 'gsap';

// Load-time entry fade/slide-up — not scroll-triggered.
// The hidden starting state lives in CSS (.js-motion [data-hero-item],
// see style.css), set synchronously in <head> before first paint so
// there's no flash of visible content while this module script loads.
// Content stays visible by default with JS off or reduced-motion on,
// since that class is never added in either case.
export function initHero() {
  const items = gsap.utils.toArray('[data-hero-item]');
  if (!items.length) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.08,
    });
  });
}
