export function initScrollSpy(sectionIds) {
  const entries = sectionIds
    .map((id) => ({
      section: document.getElementById(id),
      link: document.querySelector(`.nav-links a[href="#${id}"]`)
    }))
    .filter(({ section, link }) => section && link);

  if (!entries.length) return;

  const observer = new IntersectionObserver(
    (records) => {
      records.forEach((record) => {
        if (!record.isIntersecting) return;
        entries.forEach(({ link }) => link.classList.remove('is-active'));
        const match = entries.find(({ section }) => section === record.target);
        if (match) match.link.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  entries.forEach(({ section }) => observer.observe(section));
}
