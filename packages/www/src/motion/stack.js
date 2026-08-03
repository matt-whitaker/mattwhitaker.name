import gsap from 'gsap';

// Reveal for the radial stack wheel. Deliberately not pinned or
// scrubbed — this section is a fixed tableau, so it just plays once as
// it enters. Guarded by reduced-motion like every other section, so the
// wheel is fully visible at rest when motion is off.
//
// Only `opacity` is animated on [data-stack-node] and [data-stack-hub]:
// above the 880px breakpoint their centering lives in a CSS `transform`
// (translate(-50%, -50%)), and GSAP writing any transform property here
// would replace that whole declaration and knock them off their
// coordinates. Movement rides on the inner icon rows instead, which
// carry no transform of their own.
export function initStack() {
  const section = document.querySelector('[data-stack]');
  if (!section) return;

  const hub = section.querySelector('[data-stack-hub]');
  const spokes = gsap.utils.toArray('[data-stack-spoke]', section);
  const nodes = gsap.utils.toArray('[data-stack-node]', section);
  const iconRows = gsap.utils.toArray('.stack-node__icons', section);
  if (!nodes.length) return;

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    // Kept fast and started early (top 90%) so it finishes well before the
    // wheel scrolls to center — a slower/later reveal was easy to outrun.
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: section, start: 'top 90%', once: true },
    });

    if (hub) tl.from(hub, { opacity: 0, duration: 0.2 }, 0);
    if (spokes.length) tl.from(spokes, { opacity: 0, duration: 0.2, stagger: 0.02 }, 0.05);
    tl.from(nodes, { opacity: 0, duration: 0.25, stagger: 0.04 }, 0.06);
    tl.from(iconRows, { y: 10, duration: 0.25, stagger: 0.04 }, 0.06);
  });
}
