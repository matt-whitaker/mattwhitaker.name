import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pinned parallax reveal for the PNW section (desktop only). The b-roll
// fills the viewport and pins; the content panel starts just below the
// viewport and slides up to the top over the pinned scroll. Because the
// content is an opaque panel shorter than the viewport, sliding it up
// transitions the visible photo from its top (content covering the
// bottom) to its bottom (content covering the top) — i.e. it uncovers
// the bottom of the picture. When the content reaches the top the pin
// releases and everything scrolls on.
//
// Same breakpoint as the career/emwhit pins. Below it (or reduced-motion)
// nothing here runs and the markup stays a plain stacked image + content.
const DESKTOP_QUERY = '(min-width: 880px) and (prefers-reduced-motion: no-preference)';
const START_VH = 50; // where the content panel starts, in vh from the stage top — 50 = it comes in over the lower half alongside the b-roll (rather than the photo showing alone first)
const CONTENT_VH = 55; // content panel height, in vh
const SLIDE_VH = 1; // scroll spent on the content slide itself, in viewport-height units
const BUFFER_VH = 0.6; // held (pinned, nothing moving) before AND after the slide, so the pin/unpin don't feel abrupt

export function initPnw() {
  const section = document.querySelector('[data-pnw]');
  const stage = section?.querySelector('[data-pnw-stage]');
  const imgTop = section?.querySelector('[data-broll-top]');
  const imgBottom = section?.querySelector('[data-broll-bottom]');
  const content = section?.querySelector('[data-pnw-content]');
  if (!section || !stage || !imgTop || !imgBottom || !content) return;

  gsap.matchMedia().add(DESKTOP_QUERY, () => {
    // Promote to the pinned layout: the stage fills the viewport with the
    // top photo in its top half and the bottom photo in its bottom half;
    // the content panel is pulled out of flow to sit over the lower half.
    // All reverted automatically when crossing back below the breakpoint.
    gsap.set(stage, { height: '100vh' });
    gsap.set(imgTop, { position: 'absolute', top: 0, left: 0, right: 0, height: START_VH + 'vh' });
    gsap.set(imgBottom, { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 - START_VH + 'vh' });
    gsap.set(content, {
      position: 'absolute',
      left: 0,
      right: 0,
      top: START_VH + 'vh',
      height: CONTENT_VH + 'vh',
      zIndex: 10,
    });

    // Total pinned scroll = a buffer, then the slide, then a buffer. The
    // holds at each end keep the pin from engaging/releasing the instant
    // the content starts/stops moving.
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => '+=' + (SLIDE_VH + 2 * BUFFER_VH) * window.innerHeight,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    // Slide the content up by START_VH (from covering the lower half to
    // flush with the stage top, uncovering the bottom photo) — starting
    // after the lead buffer.
    tl.to(content, { y: () => -window.innerHeight * (START_VH / 100), duration: SLIDE_VH }, BUFFER_VH);
    // Pad the timeline out to the trailing buffer so the pin holds after
    // the slide finishes.
    tl.set({}, {}, SLIDE_VH + 2 * BUFFER_VH);
  });
}
