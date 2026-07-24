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
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: section, start: 'top 70%', once: true },
    });

    if (hub) tl.from(hub, { opacity: 0, duration: 0.4 }, 0);
    if (spokes.length) tl.from(spokes, { opacity: 0, duration: 0.4, stagger: 0.05 }, 0.15);
    tl.from(nodes, { opacity: 0, duration: 0.45, stagger: 0.09 }, 0.25);
    tl.from(iconRows, { y: 10, duration: 0.45, stagger: 0.09 }, 0.25);
  });
}
