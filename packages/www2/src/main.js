import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initNav } from './motion/nav.js';
import { initHero } from './motion/hero.js';
import { initCareer } from './motion/career.js';
import { initEmwhit } from './motion/emwhit.js';
import { initProjects } from './motion/projects.js';

gsap.registerPlugin(ScrollTrigger);

initNav();
initHero();
initCareer();
initEmwhit();
initProjects();
