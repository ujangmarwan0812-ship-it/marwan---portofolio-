‎// Auto-update year di footer
‎document.getElementById('year').textContent = new Date().getFullYear();
‎
‎// Form kontak simulasi
‎const form = document.getElementById('contactForm');
‎const msg = document.getElementById('formMsg');
‎
‎form && form.addEventListener('submit', e => {
‎  e.preventDefault();
‎  msg.textContent = 'Terima kasih, pesan terkirim (simulasi).';
‎  form.reset();
‎});
‎
‎
‎---