// Minimal interactive behavior: smooth scroll, hamburger, theme toggle, resume download

document.addEventListener('DOMContentLoaded', ()=> {
  // Smooth scroll helper
  window.scrollToSection = id => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  };

  // Hamburger menu
  const hb = document.getElementById('hamburger');
  const nav = document.getElementById('nav-links');
  hb && hb.addEventListener('click', ()=> nav.classList.toggle('show'));

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', ()=> nav.classList.remove('show'));
  });

  // Theme toggle (light/dark)
  const themeBtn = document.getElementById('theme-toggle');
  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
  if(current === 'light') document.body.classList.add('light-theme');
  updateThemeIcon();

  themeBtn && themeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    updateThemeIcon();
  });

  function updateThemeIcon(){
    if(!themeBtn) return;
    themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '<i class=\"fa-solid fa-sun\"></i>' : '<i class=\"fa-solid fa-moon\"></i>';
  }

  // Simple reveal on scroll
  const reveals = document.querySelectorAll('.glass-panel, .project-card, .achievement, .skill');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.style.opacity = 1, e.target.style.transform = 'translateY(0)';
    });
  }, {threshold:0.12});
  reveals.forEach(r=>{
    r.style.opacity = 0;
    r.style.transform = 'translateY(18px)';
    r.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(r);
  });

  // Resume download fallback (just link uses browser download)
  // No extra JS required; link in HTML points to ShivaSaini.pdf
});
