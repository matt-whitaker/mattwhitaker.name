import gsap from 'gsap';

// --- Tuning knobs -----------------------------------------------------
// Breakpoint below which the pin/scrub mechanic never registers — pick
// the width where the pinned folder starts to feel cramped, not a
// stock 768/1024 value. Keep in sync with any layout assumptions below.
const DESKTOP_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';
// Mirror image of DESKTOP_QUERY (879.98, not 880, so the two never
// overlap or leave a gap) — the scroll-into-view fallback for the
// plain stacked-blocks layout below the pin breakpoint.
const MOBILE_QUERY = '(max-width: 879.98px) and (prefers-reduced-motion: no-preference)';

// Every layer gets an equal-length *hang* — the static pause before
// the next layer starts sliding in. Layers 1-3 also spend a bit of
// scroll on the slide-in itself, on top of their hang. Frontend has
// no transition (it's already open when the pin starts), so its
// segment is hang-only and ends up shorter than the others' — that's
// what keeps the pause itself feeling the same length everywhere.
// TRANSITION_UNITS is fixed (not a share of LAYER_VH) so bumping
// LAYER_VH only adds hang time, leaving the slide itself untouched.
const LAYER_VH = 1.3; // total scroll spent per layer's slide-in + hang, for layers 1-3
const TRANSITION_UNITS = 0.4; // fixed scroll spent sliding in; everything else in a layer's segment is hang

const EASE = 'none'; // scrubbed 1:1 with scroll — keep linear so trackpad/wheel deltas track exactly

// The "open folder" viewport: a fraction of the window height, capped
// so it doesn't get unwieldy on very tall viewports.
const STACK_HEIGHT_VH_RATIO = 0.72;
const STACK_HEIGHT_MAX_PX = 880;

// Skill bars grow in (scaleX 0 -> 1) once their layer has fully
// settled. This is a plain auto-playing tween (real seconds), not
// scrubbed to scroll position — it's triggered via tl.call() at the
// same positions the slide-in tweens already use, then plays out on
// its own regardless of further scrolling. A scrubbed version could
// get caught mid-tween by the tab-click handler's instant scroll jump
// (no frames animated through, so it could freeze at an arbitrary
// partial width); this can't, since once triggered it's independent
// of scroll position entirely. (A two-phase lead-in/finish version was
// also tried and looked like a stutter: two eased tweens back to back
// create a velocity mismatch at the handoff, decelerating into a
// near-stop and then restarting, even with zero time gap between them
// — one clean tween per layer avoids that too.)
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
    // The fixed nav sits above everything (z-50) — without reserving
    // its height here, the pin starts flush with the viewport top and
    // Frontend's tab renders directly underneath/behind it.
    const navEl = document.querySelector('[data-nav]');
    const navHeight = navEl?.getBoundingClientRect().height ?? 0;

    const tabHeight = tabs[0].getBoundingClientRect().height;
    const stackHeight = Math.round(
      Math.min((window.innerHeight - navHeight) * STACK_HEIGHT_VH_RATIO, STACK_HEIGHT_MAX_PX),
    );
    const transitionUnits = TRANSITION_UNITS;
    const hangUnits = LAYER_VH - transitionUnits;
    // Frontend's segment is hang-only; layers 1-3 get a full LAYER_VH
    // (transition + the same hangUnits) each.
    const totalUnits = hangUnits + (layers.length - 1) * LAYER_VH;
    // Absolute start time of each layer's segment.
    const segmentStart = layers.map((_, i) => (i === 0 ? 0 : hangUnits + (i - 1) * LAYER_VH));

    gsap.set(stack, { height: stackHeight });

    // Layer 0 starts already open — the pin's first moments show
    // Frontend at rest, not sliding in from nothing.
    gsap.set(layers[0], { position: 'absolute', inset: 0, yPercent: 0, y: 0, zIndex: 1 });
    layers.slice(1).forEach((layer, i) => {
      gsap.set(layer, { position: 'absolute', inset: 0, yPercent: 100, y: 0, zIndex: i + 2 });
    });

    const skillFillsByLayer = layers.map((layer) => layer.querySelectorAll('.skill-bar__fill'));
    skillFillsByLayer.forEach((fills) => {
      gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' });
    });

    // Plays a layer's skill-bar reveal, once — called from tl.call()
    // below at the same positions the slide-in tweens already use.
    // Guarded so re-crossing that position (e.g. scrolling back and
    // forth near the boundary) doesn't restart it.
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
        // Without this, a fast scroll/trackpad fling can carry past the
        // exact pin point before ScrollTrigger reacts, showing a one-frame
        // jump right as it engages. This makes it anticipate the pin
        // slightly early based on scroll speed/direction instead.
        anticipatePin: 1,
      },
    });

    // Frontend is already open the instant the pin engages, so its
    // bars grow right from the start of the pin.
    tl.call(playSkillReveal(0), null, 0);

    // Each layer i>=1 slides in right as its segment begins, then the
    // timeline has nothing scheduled for the rest of that segment —
    // that gap is the hang before the next layer's segment starts,
    // and it's the same length (hangUnits) as every other layer's.
    layers.slice(1).forEach((layer, i) => {
      const index = i + 1;
      tl.to(
        layer,
        { yPercent: 0, y: tabHeight * index, duration: transitionUnits },
        segmentStart[index],
      );
    });
    // Skill bars grow in right as their layer settles, once its
    // slide-in tween above finishes.
    layers.slice(1).forEach((layer, i) => {
      const index = i + 1;
      tl.call(playSkillReveal(index), null, segmentStart[index] + transitionUnits);
    });
    // Pads the timeline out to the final layer's own hang so the
    // scrub range matches totalUnits exactly (Infra gets a hang too,
    // which also keeps the pin's release from feeling lurchy).
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

  // Below the pin breakpoint, layers are plain stacked blocks in normal
  // flow — so unlike the pinned version above, each one's skill bars
  // can just grow in as it naturally scrolls into view.
  mm.add(MOBILE_QUERY, () => {
    layers.forEach((layer) => {
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
