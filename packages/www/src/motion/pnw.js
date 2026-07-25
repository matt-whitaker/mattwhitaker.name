import gsap from 'gsap';

// Motion for the PNW section: a vertical parallax on the image peek, and
// a fade-up reveal for the content below it.
//
// Parallax: the oversized peek image (h-160% in Pnw.astro) drifts within
// its overflow-hidden window as that window scrolls through the viewport.
// yPercent only — the image's centering is a `top` offset, not a
// transform, so GSAP owns the transform without clobbering it. Triggered
// on the peek window (not the whole tall section) so the pan happens
// while the image is actually on screen.
const SHIFT = 14; // yPercent travel each side of center; kept under the image's 30% overhang so no edge shows. Higher = faster pan.

export function initPnw() {
  const section = document.querySelector('[data-pnw]');
  if (!section) return;

  const peek = section.querySelector('[data-broll]');
  const img = section.querySelector('[data-broll-img]');
  const content = section.querySelector('[data-pnw-content]');

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    if (peek && img) {
      gsap.fromTo(
        img,
        { yPercent: -SHIFT },
        {
          yPercent: SHIFT,
          ease: 'none',
          scrollTrigger: {
            trigger: peek,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }

    if (content) {
      gsap.from(content, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        // Play once and stay put, matching every other reveal on the page.
        scrollTrigger: { trigger: content, start: 'top 80%', once: true },
      });
    }
  });
}
