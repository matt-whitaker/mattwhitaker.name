import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Light staggered fade/slide-up as cards enter the viewport.
// Runs on all viewports (cards are the same grid everywhere); only
// reduced-motion turns it off, leaving cards visible at rest.
export function initProjects() {
  const cards = gsap.utils.toArray('[data-project-card]');
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
