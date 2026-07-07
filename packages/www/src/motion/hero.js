import gsap from 'gsap';

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
