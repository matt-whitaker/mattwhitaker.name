import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Subtle parallax for the b-roll peek: the oversized image drifts within
// its overflow-hidden window as the peek scrolls through the viewport, so
// it reads as moving slightly slower than the page. yPercent only — the
// image's centering is a `top` offset, not a transform, so GSAP owns the
// transform cleanly. Plus a one-shot fade-up for the content. Reduced-
// motion leaves everything static (peek still fully covers its window).
const PAN = 14; // yPercent travel each way; kept under the image's overhang so no edge shows

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
        { yPercent: -PAN },
        {
          yPercent: PAN,
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
