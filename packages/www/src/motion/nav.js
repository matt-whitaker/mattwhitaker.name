import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOP_CLASSES = ['bg-transparent', 'border-transparent'];
const SCROLLED_CLASSES = ['bg-paper/85', 'backdrop-blur-sm', 'border-ink/10'];

export function initNav() {
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('#intro');
  if (nav && hero) {
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

  // The mobile menu is a native <details> — it already opens/closes
  // without any JS. This just closes it back up after a link inside
  // is tapped, since <details> has no built-in "close on select".
  const menu = document.querySelector('[data-nav-menu]');
  if (menu) {
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.removeAttribute('open');
      });
    });
  }
}
