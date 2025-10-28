/* ====== Helpers ====== */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

/* ====== Year Auto-update ====== */
const yearEl = qs('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ====== Theme Toggle (dark/light) ====== */
const themeToggle = qs('#theme-toggle');
themeToggle && themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '🌞' : '🌙';
  // Optional: persist preference
  try { localStorage.setItem('marwan_theme', isLight ? 'light' : 'dark'); } catch(e){}
});
// restore theme
try {
  const saved = localStorage.getItem('marwan_theme');
  if(saved === 'light') document.body.classList.add('light-mode'), themeToggle && (themeToggle.textContent='🌞');
} catch(e){}

/* ====== Parallax background movement ======
   If user adds a 'parallax-bg.jpg' file it will be used as extra layer.
   Otherwise the CSS gradient simulates galaxy effect.
*/
const hero = qs('.hero');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  if(hero){
    // move background positions for subtle parallax
    hero.style.backgroundPosition = `center ${-sc * 0.08}px, center ${-sc * 0.03}px, center`;
  }

  // show scroll-top button
  const st = qs('#scrollTop');
  if(st) st.style.display = (sc > 300) ? 'block' : 'none';
});

/* ====== Scroll reveal (add .visible when element in view) ====== */
const revealTargets = qsa('.reveal-left, .reveal-right, .reveal-up, .reveal-card');
function revealOnScroll(){
  const offset = window.innerHeight * 0.85;
  revealTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < offset) el.classList.add('visible');
  });
}
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

/* ====== Smooth anchor scroll ====== */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const target = qs(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* ====== Scroll to top ====== */
const scrollTopBtn = qs('#scrollTop');
scrollTopBtn && scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

/* ====== Contact form (popup + simulation) ====== */
const form = qs('#contactForm');
const formMsg = qs('#formMsg');
const popup = qs('#popup');
const popupClose = qs('#popupClose');
const popupOk = qs('#popupOk');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    // collect data (not sent anywhere - simulation)
    const data = new FormData(form);
    const name = data.get('name') || '';
    // show popup
    if(popup){
      popup.style.display = 'flex';
      // set message optionally
      const p = popup.querySelector('p');
      if(p) p.textContent = `Terima kasih ${name ? name : ''}! Pesanmu sudah dikirim (simulasi).`;
    }
    form.reset();
    if(formMsg) formMsg.textContent = 'Pesan terkirim (simulasi).';
  });
}
if(popupClose) popupClose.addEventListener('click', ()=> popup.style.display='none');
if(popupOk) popupOk.addEventListener('click', ()=> popup.style.display='none');

/* ====== Small: reset button ====== */
const resetBtn = qs('#resetBtn');
resetBtn && resetBtn.addEventListener('click', () => {
  form && form.reset();
  formMsg && (formMsg.textContent = '');
});

/* ====== Accessibility: close popup on Esc ====== */
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && popup && popup.style.display === 'flex') popup.style.display = 'none';
});
