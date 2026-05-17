 // ── NAVIGATION ──
 const sections = ['home','projects','about','contact','detail-1','detail-2','detail-3','lab'];
const navIds = ['home','projects','about','contact','lab'];

  function navigate(id) {
  sections.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.remove('active');
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.querySelectorAll('.fade-up').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  navIds.forEach(n => {
    const navEl = document.getElementById('nav-' + n);
    if (navEl) navEl.classList.remove('active');
  });

  const rootId = id.startsWith('detail') ? 'projects' : id;
  const activeNav = document.getElementById('nav-' + rootId);
  if (activeNav) activeNav.classList.add('active');
}

  // ── MOBILE MENU ──
  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }

  // ── FORM ──
  async function handleSubmit() {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();
  const status  = document.getElementById('form-status');

  if (!name || !email || !message) {
    showToast('⚠️  Completá todos los campos');
    return;
  }

  const res = await fetch('https://formspree.io/f/xdajnqoz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: name, email, mensaje: message })
  });

  if (res.ok) {
    status.style.display = 'block';
    status.style.color = '#166534';
    status.textContent = '✓ Mensaje enviado. Te respondo a la brevedad.';
    document.getElementById('form-name').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-message').value = '';
  } else {
    status.style.display = 'block';
    status.style.color = '#9a3412';
    status.textContent = '⚠️ Hubo un error. Escribime directamente a erickemmanueldorado@gmail.com';
  }
}

  // ── TOAST ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ── PREVENT DEFAULT ON HREF="#" ──
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });