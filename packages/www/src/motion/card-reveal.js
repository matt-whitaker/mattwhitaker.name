import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Shared staggered fade/slide-up reveal for card-grid sections
// (Projects, Archives) as their cards enter the viewport.
export function initCardGridReveal(selector) {
  const cards = gsap.utils.toArray(selector);
  if (!cards.length) return;

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.set(cards, { opacity: 0, y: 24 });

    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.12,
        }),
    });
  });
}
