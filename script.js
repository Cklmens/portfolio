// Menu mobile
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Visionneuse : clic sur une image → plein écran, flèches ← → pour naviguer
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const items = [...document.querySelectorAll('.zoom')];
let current = 0;

function show(i) {
  current = (i + items.length) % items.length;
  const el = items[current];
  lbImg.src = el.dataset.src;
  lbImg.alt = el.querySelector('img').alt;
  lbCap.textContent = el.dataset.caption || '';
}
items.forEach((el, i) => el.addEventListener('click', () => { show(i); lb.showModal(); }));
lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') lb.close(); });
document.addEventListener('keydown', e => {
  if (!lb.open) return;
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'ArrowLeft') show(current - 1);
});

// Apparition douce au défilement
const targets = document.querySelectorAll('.project-head, .cover, .project-body, .gallery, .planches, .demarche-grid, .contact .wrap');
targets.forEach(t => t.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
targets.forEach(t => io.observe(t));
