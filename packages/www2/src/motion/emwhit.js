import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Same breakpoint as the career folder — pinning is a desktop-scroll
// pattern, and this is where things stop feeling cramped/touch-scrolly.
const STICK_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';
const STICK_VH = 0.5; // how long the section holds in place, in viewport-height units of scroll

export function initEmwhit() {
  const section = document.querySelector('[data-emwhit]');
  const bars = gsap.utils.toArray('[data-emwhit-bar]');
  if (!section || !bars.length) return;

  const mm = gsap.matchMedia();

  // Scroll-scrubbed equalizer — no audio involved, bar heights just
  // track scroll progress through the section. transform:scaleY only,
  // so it's cheap; runs on all viewports (no breakpoint gate), only
  // reduced-motion turns it off and leaves the static baked-in heights.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const n = bars.length - 1;
        // Same three-term shape as the baked-in static heights (see
        // emwhit.ejs) — a slow wave for the broad clumps, a medium one
        // for shape within them, a fast/low-amplitude one for jitter —
        // but phase-shifted by scroll progress instead of by bar index.
        // The clumps drift and breathe as you scroll, rather than each
        // bar oscillating independently of its neighbors.
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

  // A brief pin/hold as the section reaches the top — the same beat
  // each career layer gets, just once, since this section isn't
  // staged into layers. Reserves the nav's height the same way the
  // career pin does, so it doesn't merge with the fixed nav either.
  mm.add(STICK_QUERY, () => {
    const navEl = document.querySelector('[data-nav]');
    const navHeight = () => navEl?.getBoundingClientRect().height ?? 0;

    // min-h-screen is a CSS min-height, which isn't reliably preserved
    // once the pin flips this section to position:fixed — that was
    // collapsing the equalizer row. Lock the rendered height explicitly
    // first, same pattern the career folder already uses for its stack.
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
