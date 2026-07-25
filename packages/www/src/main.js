import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initNav } from './motion/nav.js';
import { initHero } from './motion/hero.js';
import { initStack } from './motion/stack.js';
import { initCareer } from './motion/career.js';
import { initPnw } from './motion/pnw.js';
import { initEmwhit } from './motion/emwhit.js';
import { initProjects } from './motion/projects.js';
import { initArchives } from './motion/archive.js';
import { initContactCopy } from './motion/contact.js';
import { initHashSync } from './motion/hash-sync.js';

gsap.registerPlugin(ScrollTrigger);

initNav();
initHero();
initStack();
initCareer();
initPnw();
initEmwhit();
initProjects();
initArchives();
initContactCopy();
// Last: its deep-link jump reads pin positions the inits above create.
initHashSync();
