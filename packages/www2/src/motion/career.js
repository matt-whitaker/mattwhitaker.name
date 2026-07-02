import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Tuning knobs -----------------------------------------------------
// Breakpoint below which the pin/scrub mechanic never registers — pick
// the width where the pinned folder starts to feel cramped, not a
// stock 768/1024 value. Keep in sync with any layout assumptions below.
const DESKTOP_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';

// Relative scroll-distance share per layer, in "one viewport height"
// units. Index 0 (Frontend) doubles as its *dwell* time — the scroll
// spent fully open before Backend starts sliding over it — which is
// how it ends up with the most scroll-distance and richest open state.
// Indexes 1-3 are each layer's slide-in *transition* distance.
const WEIGHTS = [2, 1, 1, 1];

const EASE = 'none'; // scrubbed 1:1 with scroll — keep linear so trackpad/wheel deltas track exactly

export function initCareer() {
  const section = document.querySelector('[data-career]');
  const stack = document.querySelector('[data-career-stack]');
  const availability = document.querySelector('[data-career-availability]');
  if (!section || !stack) return;

  const layers = gsap.utils.toArray('[data-layer]', stack);
  const tabs = layers.map((layer) => layer.querySelector('[data-layer-tab]'));
  if (layers.length !== 4) return;

  const mm = gsap.matchMedia();

  // Simple fade-up for the closing availability line — independent of
  // the pin, so it still plays on mobile. Guarded only by reduced-motion.
  if (availability) {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(availability, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: availability, start: 'top 85%' },
      });
    });
  }

  mm.add(DESKTOP_QUERY, () => {
    const tabHeight = tabs[0].getBoundingClientRect().height;
    const stackHeight = Math.round(Math.min(window.innerHeight * 0.62, 640));
    const totalWeight = WEIGHTS.reduce((sum, w) => sum + w, 0);

    gsap.set(stack, { height: stackHeight });

    // Layer 0 starts already open — the pin's first moments show
    // Frontend at rest, not sliding in from nothing.
    gsap.set(layers[0], { position: 'absolute', inset: 0, yPercent: 0, y: 0, zIndex: 1 });
    layers.slice(1).forEach((layer, i) => {
      gsap.set(layer, { position: 'absolute', inset: 0, yPercent: 100, y: 0, zIndex: i + 2 });
    });

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + totalWeight * window.innerHeight,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Frontend's "dwell" is just scroll distance with nothing to
    // animate, so the first real tween starts at WEIGHTS[0].
    tl.to(layers[1], { yPercent: 0, y: tabHeight, duration: WEIGHTS[1] }, WEIGHTS[0])
      .to(layers[2], { yPercent: 0, y: tabHeight * 2, duration: WEIGHTS[2] })
      .to(layers[3], { yPercent: 0, y: tabHeight * 3, duration: WEIGHTS[3] });

    const cumulativeEnd = [];
    let acc = 0;
    WEIGHTS.forEach((w) => {
      acc += w;
      cumulativeEnd.push(acc / totalWeight);
    });

    const onTabClick = (index) => () => {
      const st = tl.scrollTrigger;
      const target = st.start + cumulativeEnd[index] * (st.end - st.start);
      window.scrollTo({ top: target });
    };
    const handlers = tabs.map((tab, i) => {
      const handler = onTabClick(i);
      tab.addEventListener('click', handler);
      return handler;
    });

    return () => {
      tabs.forEach((tab, i) => tab.removeEventListener('click', handlers[i]));
    };
  });
}
