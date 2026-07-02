import gsap from 'gsap';

// Load-time entry fade/slide-up — not scroll-triggered.
// The hidden starting state is only ever set inside the matchMedia
// branch, so content stays visible by default with JS off or with
// reduced-motion on (nothing ever hides it in the first place).
export function initHero() {
  const items = gsap.utils.toArray('[data-hero-item]');
  if (!items.length) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.set(items, { opacity: 0, y: 16 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.08,
    });
  });
}
