import { prefersReducedMotion } from '../utils/motion.js';

export function initGallery() {
  const root = document.querySelector('[data-gallery-lightbox]');
  const strips = document.querySelectorAll('[data-gallery]');
  if (!root || !strips.length) return;

  const frame = root.querySelector('[data-gallery-frame]');
  const img = root.querySelector('[data-gallery-img]');
  const titleEl = root.querySelector('[data-gallery-title]');
  const descEl = root.querySelector('[data-gallery-desc]');
  const currentEl = root.querySelector('[data-gallery-current]');
  const totalEl = root.querySelector('[data-gallery-total]');
  const fnameEl = root.querySelector('[data-gallery-fname]');
  const filmstrip = root.querySelector('[data-gallery-filmstrip]');
  const prevBtn = root.querySelector('[data-gallery-prev]');
  const nextBtn = root.querySelector('[data-gallery-next]');
  const supportsVT = typeof document.startViewTransition === 'function';

  let items = [];
  let index = 0;
  let lastFocused = null;
  let filmButtons = [];

  function collectItems(container) {
    return Array.from(container.querySelectorAll('.gallery-thumb')).map((btn) => {
      const thumbImg = btn.querySelector('img');
      return {
        full: btn.dataset.full,
        thumb: thumbImg.currentSrc || thumbImg.src,
        title: btn.dataset.title || '',
        desc: btn.dataset.desc || '',
        w: thumbImg.width,
        h: thumbImg.height
      };
    });
  }

  function buildFilmstrip() {
    filmstrip.textContent = '';
    filmButtons = items.map((item, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'lb-film-item';
      b.setAttribute('aria-label', item.title || `Image ${i + 1}`);
      const im = document.createElement('img');
      im.src = item.thumb;
      im.alt = '';
      im.loading = 'lazy';
      im.decoding = 'async';
      b.appendChild(im);
      b.addEventListener('click', () => goTo(i));
      filmstrip.appendChild(b);
      return b;
    });
  }

  function preload(i) {
    const item = items[(i + items.length) % items.length];
    if (item) new Image().src = item.full;
  }

  function applyIndex(newIndex) {
    const item = items[newIndex];
    if (!item) return;
    frame.classList.remove('is-zoomed');
    img.src = item.full;
    img.alt = item.title ? `Capture d'écran, ${item.title}` : '';
    if (item.w) img.width = item.w;
    if (item.h) img.height = item.h;
    titleEl.textContent = item.title;
    descEl.textContent = item.desc;
    currentEl.textContent = String(newIndex + 1);
    filmButtons.forEach((b, i) => b.classList.toggle('is-active', i === newIndex));
    const activeThumb = filmButtons[newIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    }
    index = newIndex;
    preload(newIndex + 1);
    preload(newIndex - 1);
  }

  function goTo(newIndex) {
    if (!items.length) return;
    const wrapped = (newIndex + items.length) % items.length;
    if (wrapped === index && root.classList.contains('is-open')) return;
    if (!supportsVT || prefersReducedMotion()) {
      applyIndex(wrapped);
    } else {
      document.startViewTransition(() => applyIndex(wrapped));
    }
  }

  function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('lb-lock');
  }

  function unlockScroll() {
    document.body.classList.remove('lb-lock');
    document.body.style.paddingRight = '';
  }

  function open(container, startIndex, trigger) {
    items = collectItems(container);
    if (!items.length) return;
    lastFocused = trigger || document.activeElement;
    fnameEl.textContent = `${container.dataset.gallery}.gallery`;
    totalEl.textContent = String(items.length);
    buildFilmstrip();
    applyIndex(startIndex);
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    if ('inert' in root) root.inert = false;
    lockScroll();
    window.requestAnimationFrame(() => {
      const closeBtn = root.querySelector('.lb-close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function close() {
    if (!root.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    if ('inert' in root) root.inert = true;
    unlockScroll();
    frame.classList.remove('is-zoomed');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function toggleZoom(event) {
    const willZoom = !frame.classList.contains('is-zoomed');
    const rect = img.getBoundingClientRect();
    const px = rect.width ? (event.clientX - rect.left) / rect.width : 0.5;
    const py = rect.height ? (event.clientY - rect.top) / rect.height : 0.5;
    frame.classList.toggle('is-zoomed', willZoom);
    if (willZoom) {
      requestAnimationFrame(() => {
        frame.scrollLeft = Math.max(0, frame.scrollWidth * px - frame.clientWidth / 2);
        frame.scrollTop = Math.max(0, frame.scrollHeight * py - frame.clientHeight / 2);
      });
    }
  }

  strips.forEach((container) => {
    container.addEventListener('click', (event) => {
      const btn = event.target.closest('.gallery-thumb');
      if (!btn || !container.contains(btn)) return;
      const all = Array.from(container.querySelectorAll('.gallery-thumb'));
      open(container, all.indexOf(btn), btn);
    });
  });

  root.querySelectorAll('[data-gallery-close]').forEach((el) => el.addEventListener('click', close));
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  img.addEventListener('click', toggleZoom);

  document.addEventListener('keydown', (event) => {
    if (!root.classList.contains('is-open')) return;
    if (event.key === 'Escape') { close(); return; }
    if (event.key === 'ArrowRight') { next(); return; }
    if (event.key === 'ArrowLeft') { prev(); return; }
    if (event.key === 'Tab') {
      const focusables = Array.from(root.querySelectorAll('button')).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  let touchStartX = null;
  root.addEventListener('touchstart', (event) => {
    touchStartX = frame.classList.contains('is-zoomed') ? null : event.touches[0].clientX;
  }, { passive: true });
  root.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx > 0 ? prev() : next(); }
    touchStartX = null;
  }, { passive: true });
}
