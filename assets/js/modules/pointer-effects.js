const MAGNET_STRENGTH = 0.28;
const TILT_DEGREES = 4;

function bindMagnet(element) {
  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * MAGNET_STRENGTH}px, ${y * MAGNET_STRENGTH}px)`;
  });
  element.addEventListener('mouseleave', () => { element.style.transform = ''; });
}

function bindTilt(card) {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform =
      `perspective(900px) rotateX(${-y * TILT_DEGREES}deg) rotateY(${x * TILT_DEGREES}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

export function initPointerEffects() {
  document.querySelectorAll('[data-magnetic]').forEach(bindMagnet);
  document.querySelectorAll('[data-tilt]').forEach(bindTilt);
}
