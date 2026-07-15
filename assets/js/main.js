import { prefersReducedMotion, hasFinePointer } from './utils/motion.js';
import { initNav } from './modules/nav.js';
import { initScrollProgress } from './modules/scroll-progress.js';
import { initScrollSpy } from './modules/scroll-spy.js';
import { initReveal } from './modules/reveal.js';
import { initPointerEffects } from './modules/pointer-effects.js';
import { initNodeGraph } from './modules/node-graph.js';

const SECTIONS = ['about', 'work', 'stack', 'contact'];

function setCurrentYear() {
  const target = document.querySelector('[data-year]');
  if (target) target.textContent = String(new Date().getFullYear());
}

function boot() {
  setCurrentYear();

  initNav({
    nav: document.querySelector('[data-nav]'),
    toggle: document.querySelector('[data-nav-toggle]'),
    links: document.querySelector('[data-nav-links]')
  });

  initScrollProgress(document.querySelector('[data-progress]'));
  initScrollSpy(SECTIONS);
  initReveal();

  if (prefersReducedMotion()) return;

  initNodeGraph(document.querySelector('[data-node-graph]'));
  if (hasFinePointer()) initPointerEffects();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
