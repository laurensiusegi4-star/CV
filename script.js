document.getElementById('year').textContent = new Date().getFullYear();
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.textContent='☰';
}));
document.getElementById('themeBtn').addEventListener('click', e => {
  document.body.classList.toggle('light');
  e.currentTarget.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});
document.getElementById('printBtn').addEventListener('click', () => window.print());
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
const dialog = document.getElementById('dialog');
document.querySelectorAll('.detail').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('dialogTitle').textContent = btn.dataset.title;
  document.getElementById('dialogInfo').textContent = btn.dataset.info;
  dialog.showModal();
}));
function closeDialog(){dialog.close();}
document.getElementById('closeDialog').addEventListener('click', closeDialog);
document.getElementById('okDialog').addEventListener('click', closeDialog);
dialog.addEventListener('click', e => {if(e.target===dialog) closeDialog();});
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  if (!name || !email || !message) return;
  document.getElementById('status').textContent = 'Membuka aplikasi email untuk menyiapkan pesan...';
  const subject = encodeURIComponent('Pesan untuk Laurensius Egi dari ' + name);
  const body = encodeURIComponent('Nama: ' + name + '\nEmail: ' + email + '\n\nPesan:\n' + message);
  window.location.href = 'mailto:laurensiusegi4@gmail.com?subject=' + subject + '&body=' + body;
});
const up = document.getElementById('up');
window.addEventListener('scroll', () => {up.style.display = window.scrollY > 400 ? 'block' : 'none';});
up.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
  }), {rootMargin:'-30% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(s => activeObserver.observe(s));
}
