import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Scroll-scrubbed equalizer — no audio involved, bar heights just
// track scroll progress through the section. transform:scaleY only,
// so it's cheap; runs on all viewports (no breakpoint gate), only
// reduced-motion turns it off and leaves the static baked-in heights.
export function initEmwhit() {
  const section = document.querySelector('[data-emwhit]');
  const bars = gsap.utils.toArray('[data-emwhit-bar]');
  if (!section || !bars.length) return;

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        bars.forEach((bar, i) => {
          const wobble = Math.sin(p * Math.PI * 3 + i * 0.9);
          const scaleY = 0.5 + 0.5 * Math.abs(wobble);
          gsap.set(bar, { scaleY });
        });
      },
    });
  });
}
