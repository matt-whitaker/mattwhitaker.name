import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Same breakpoint as the career folder — pinning is a desktop-scroll
// pattern, and this is where things stop feeling cramped/touch-scrolly.
const STICK_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';
const STICK_VH = 0.8; // matched to the career folder's hang duration (~0.9) so the two beats feel similar
const BAR_SPEED = 0.7; // equalizer phase lags 30% behind actual scroll speed

// Dark-background regions the nav should invert its text over as it
// scrolls past them. Add a selector here to add a region.
const NAV_INVERT_REGIONS = ['[data-stack]', '[data-emwhit]'];

export function initEmwhit() {
  const section = document.querySelector('[data-emwhit]');
  const bars = gsap.utils.toArray('[data-emwhit-bar]');
  if (!section || !bars.length) return;

  const navEl = document.querySelector('[data-nav]');
  const navHeight = () => navEl?.getBoundingClientRect().height ?? 0;

  const mm = gsap.matchMedia();

  // rootMargin shrinks the observed root to a strip the nav's own height
  // at the top of the viewport, so "intersecting" means exactly "this
  // region is under the nav." A Set tracks how many regions are under it
  // at once; the observer is recreated on resize since rootMargin can't
  // be updated on an existing one.
  const invertTargets = document.querySelectorAll('[data-nav-invert]');
  const regions = NAV_INVERT_REGIONS.map((sel) => document.querySelector(sel)).filter(Boolean);
  if (invertTargets.length && regions.length) {
    let observer;
    let resizeTimer;
    const active = new Set();

    const setInverted = (inverted) => {
      invertTargets.forEach((el) => {
        el.classList.toggle('text-paper', inverted);
        el.classList.toggle('text-ink', !inverted);
      });
    };

    const createObserver = () => {
      observer?.disconnect();
      active.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) active.add(entry.target);
            else active.delete(entry.target);
          }
          setInverted(active.size > 0);
        },
        { rootMargin: `0px 0px -${window.innerHeight - navHeight()}px 0px` },
      );
      regions.forEach((el) => observer.observe(el));
    };

    createObserver();
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createObserver, 150);
    });
  }

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
    gsap.set(section, { height: section.getBoundingClientRect().height });

    // Pins flush at the very top of the viewport (not offset by
    // navHeight) — the section is full-height and goes edge to edge,
    // including behind the nav, which now handles the handoff itself
    // by inverting to paper-white instead of the section needing to
    // stay clear of it.
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + STICK_VH * window.innerHeight,
      pin: true,
      anticipatePin: 1,
    });
  });
}
