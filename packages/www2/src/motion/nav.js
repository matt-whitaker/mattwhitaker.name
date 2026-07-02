import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Toggles the nav's "scrolled" chrome once the hero has scrolled past.
// Pure class toggle (no tween), so it's cheap enough to leave on
// regardless of reduced-motion or viewport size.
export function initNav() {
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('#intro');
  if (!nav || !hero) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    onToggle: (self) => {
      nav.classList.toggle('is-scrolled', self.isActive);
    },
  });
}
