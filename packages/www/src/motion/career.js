import gsap from 'gsap';

// 880px, not a stock 768/1024 — the width where the pinned folder starts
// feeling cramped. MOBILE_QUERY mirrors it at 879.98 so the two never
// overlap or gap.
const DESKTOP_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';
const MOBILE_QUERY = '(max-width: 879.98px) and (prefers-reduced-motion: no-preference)';

// Every layer gets an equal-length hang (the pause before the next layer
// slides in). Layers 1-3 also spend TRANSITION_UNITS sliding in, on top
// of the hang; Frontend has no transition, so its segment is hang-only.
// TRANSITION_UNITS is fixed rather than a share of LAYER_VH so bumping
// LAYER_VH only adds hang time, leaving the slide itself untouched.
const LAYER_VH = 1.3;
const TRANSITION_UNITS = 0.4;

const EASE = 'none'; // linear, so trackpad/wheel deltas track exactly

const STACK_HEIGHT_VH_RATIO = 0.72;
const STACK_HEIGHT_MAX_PX = 880;

// Skill-bar reveals are plain auto-playing tweens fired via tl.call(),
// not scrubbed to scroll position — a scrubbed version could get caught
// mid-tween by the tab-click handler's instant scroll jump and freeze at
// an arbitrary width. A two-phase lead-in/finish version was also tried
// and produced a visible stutter (velocity mismatch at the tween handoff).
const SKILL_GROW_DURATION = 0.32;
const SKILL_GROW_STAGGER = 0.04;

export function initCareer() {
  const section = document.querySelector('[data-career]');
  const stack = document.querySelector('[data-career-stack]');
  const availability = document.querySelector('[data-career-availability]');
  if (!section || !stack) return;

  const layers = gsap.utils.toArray('[data-layer]', stack);
  const tabs = layers.map((layer) => layer.querySelector('[data-layer-tab]'));
  if (layers.length !== 4) return;

  const mm = gsap.matchMedia();

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
    // Reserve the fixed nav's height, or the pin starts flush with the
    // viewport top and Frontend's tab renders behind it (nav is z-50).
    const navEl = document.querySelector('[data-nav]');
    const navHeight = navEl?.getBoundingClientRect().height ?? 0;

    const tabHeight = tabs[0].getBoundingClientRect().height;
    const stackHeight = Math.round(
      Math.min((window.innerHeight - navHeight) * STACK_HEIGHT_VH_RATIO, STACK_HEIGHT_MAX_PX),
    );
    const transitionUnits = TRANSITION_UNITS;
    const hangUnits = LAYER_VH - transitionUnits;
    const totalUnits = hangUnits + (layers.length - 1) * LAYER_VH;
    const segmentStart = layers.map((_, i) => (i === 0 ? 0 : hangUnits + (i - 1) * LAYER_VH));

    gsap.set(stack, { height: stackHeight });

    gsap.set(layers[0], { position: 'absolute', inset: 0, yPercent: 0, y: 0, zIndex: 1 });
    layers.slice(1).forEach((layer, i) => {
      gsap.set(layer, { position: 'absolute', inset: 0, yPercent: 100, y: 0, zIndex: i + 2 });
    });

    const skillFillsByLayer = layers.map((layer) => layer.querySelectorAll('.skill-bar__fill'));
    skillFillsByLayer.forEach((fills) => {
      gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' });
    });

    // Guarded so re-crossing a trigger position (e.g. scrolling back and
    // forth near a boundary) doesn't replay it.
    const revealedLayers = new Set();
    const playSkillReveal = (index) => () => {
      if (revealedLayers.has(index)) return;
      revealedLayers.add(index);
      gsap.to(skillFillsByLayer[index], {
        scaleX: 1,
        duration: SKILL_GROW_DURATION,
        stagger: SKILL_GROW_STAGGER,
        ease: 'power2.out',
      });
    };

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: {
        trigger: section,
        start: () => 'top ' + (navEl?.getBoundingClientRect().height ?? 0) + 'px',
        end: () => '+=' + totalUnits * window.innerHeight,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        // Anticipates the pin slightly early based on scroll speed, or a
        // fast fling can carry past the exact pin point before
        // ScrollTrigger reacts, producing a one-frame jump as it engages.
        anticipatePin: 1,
      },
    });

    tl.call(playSkillReveal(0), null, 0);

    layers.slice(1).forEach((layer, i) => {
      const index = i + 1;
      tl.to(
        layer,
        { yPercent: 0, y: tabHeight * index, duration: transitionUnits },
        segmentStart[index],
      );
    });
    layers.slice(1).forEach((layer, i) => {
      const index = i + 1;
      tl.call(playSkillReveal(index), null, segmentStart[index] + transitionUnits);
    });
    // Pads the timeline to totalUnits so the scrub range matches exactly
    // (Infra gets a hang too, keeping the pin's release from feeling lurchy).
    tl.set({}, {}, totalUnits);

    const cumulativeEnd = layers.map((_, i) => {
      const settledAt = i === 0 ? 0 : segmentStart[i] + transitionUnits;
      return settledAt / totalUnits;
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

  // matchMedia reverts all sets/tweens below when crossing back above the
  // breakpoint, so nothing is left invisible on desktop.
  mm.add(MOBILE_QUERY, () => {
    layers.forEach((layer) => {
      // Block children, not just <p>, so the archetype list and chip row
      // fade in too (a `.career-layer__body p` selector missed them).
      const textEls = [...layer.querySelectorAll('.career-focus > *')].filter(Boolean);
      if (textEls.length) {
        gsap.from(textEls, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: layer, start: 'top 80%', once: true },
        });
      }

      const list = layer.querySelector('.skill-bars');
      const fills = layer.querySelectorAll('.skill-bar__fill');
      if (!list || !fills.length) return;
      gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' });
      gsap.to(fills, {
        scaleX: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: list, start: 'top 85%' },
      });
    });
  });
}
