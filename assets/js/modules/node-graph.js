const LINK_DISTANCE = 132;
const REPEL_RADIUS = 150;
const MAX_NODES = 64;
const AREA_PER_NODE = 20000;
const OFFSCREEN = -9999;

export function initNodeGraph(canvas) {
  if (!canvas || !canvas.parentElement) return;

  const context = canvas.getContext('2d');
  const host = canvas.parentElement;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const pointer = { x: OFFSCREEN, y: OFFSCREEN };

  let nodes = [];
  let width = 0;
  let height = 0;
  let frame = null;

  function resize() {
    width = host.offsetWidth;
    height = host.offsetHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(MAX_NODES, Math.floor((width * height) / AREA_PER_NODE));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function step(node) {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    const dx = node.x - pointer.x;
    const dy = node.y - pointer.y;
    const distance = Math.hypot(dx, dy);
    if (distance < REPEL_RADIUS && distance > 0) {
      const force = ((REPEL_RADIUS - distance) / REPEL_RADIUS) * 0.6;
      node.x += (dx / distance) * force;
      node.y += (dy / distance) * force;
    }
    return distance;
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      const pointerDistance = step(node);

      for (let j = i + 1; j < nodes.length; j += 1) {
        const other = nodes[j];
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance >= LINK_DISTANCE) continue;
        context.strokeStyle = `rgba(91, 157, 255, ${(1 - distance / LINK_DISTANCE) * 0.22})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }

      context.fillStyle = pointerDistance < REPEL_RADIUS
        ? 'rgba(134, 183, 255, 0.9)'
        : 'rgba(91, 157, 255, 0.5)';
      context.beginPath();
      context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      context.fill();
    }

    frame = requestAnimationFrame(draw);
  }

  function start() {
    if (frame === null) frame = requestAnimationFrame(draw);
  }

  function stop() {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  }

  host.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });
  host.addEventListener('mouseleave', () => {
    pointer.x = OFFSCREEN;
    pointer.y = OFFSCREEN;
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  new IntersectionObserver((records) => {
    records.forEach((record) => (record.isIntersecting ? start() : stop()));
  }).observe(host);

  resize();
  start();
}
