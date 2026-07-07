import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Same breakpoint as the career folder — pinning is a desktop-scroll
// pattern, and this is where things stop feeling cramped/touch-scrolly.
const STICK_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';
const STICK_VH = 0.8; // how long the section holds in place, in viewport-height units of scroll -- matched to the career folder's hang duration (LAYER_VH's hangUnits, ~0.9) so the two beats feel similar
const BAR_SPEED = 0.7; // equalizer phase advances at 70% of scroll progress, so it lags 30% behind actual scroll speed

export function initEmwhit() {
  const section = document.querySelector('[data-emwhit]');
  const bars = gsap.utils.toArray('[data-emwhit-bar]');
  if (!section || !bars.length) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress * BAR_SPEED;
        const n = bars.length - 1;

        bars.forEach((bar, i) => {
          const t = i / n;
          const envelope =
            Math.sin(t * Math.PI * 2.2 + 0.4 + p * Math.PI * 2) * 0.55 +
            Math.sin(t * Math.PI * 6 + 1.5 + p * Math.PI * 4) * 0.3 +
            Math.sin(i * 2.7 + p * Math.PI * 8) * 0.15;
          const scaleY = 0.35 + 0.65 * Math.abs(envelope);
          gsap.set(bar, { scaleY });
        });
      },
    });
  });

  mm.add(STICK_QUERY, () => {
    const navEl = document.querySelector('[data-nav]');
    const navHeight = () => navEl?.getBoundingClientRect().height ?? 0;

    gsap.set(section, { height: section.getBoundingClientRect().height });

    ScrollTrigger.create({
      trigger: section,
      start: () => 'top ' + navHeight() + 'px',
      end: () => '+=' + STICK_VH * window.innerHeight,
      pin: true,
      anticipatePin: 1,
    });
  });
}
