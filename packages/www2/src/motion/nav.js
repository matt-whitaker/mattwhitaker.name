import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swaps the nav's transparent/scrolled chrome once the hero has scrolled
// past. Pure classList swap (no tween), so it's cheap enough to leave on
// regardless of reduced-motion or viewport size. Swapping rather than
// just adding keeps the two states from ever fighting over the same
// CSS property (background-color, border-color) at once.
const TOP_CLASSES = ['bg-transparent', 'border-transparent'];
const SCROLLED_CLASSES = ['bg-paper/85', 'backdrop-blur-sm', 'border-ink/10'];

export function initNav() {
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('#intro');
  if (!nav || !hero) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    onToggle: (self) => {
      const [add, remove] = self.isActive
        ? [SCROLLED_CLASSES, TOP_CLASSES]
        : [TOP_CLASSES, SCROLLED_CLASSES];
      nav.classList.remove(...remove);
      nav.classList.add(...add);
    },
  });
}
