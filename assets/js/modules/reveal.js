export function initReveal(selector = '.reveal') {
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (records) => {
      records.forEach((record) => {
        if (!record.isIntersecting) return;
        record.target.classList.add('in');
        observer.unobserve(record.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${(index % 4) * 0.06}s`;
    observer.observe(target);
  });
}
