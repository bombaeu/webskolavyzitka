// Hladký scroll na # odkazy
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Zvýraznění aktivního menu položky při scrollu
window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const section = document.querySelector(href);
    
    if (section) {
      const rect = section.getBoundingClientRect();
      
      // Pokud je sekce viditelná - přidej .active
      if (rect.top <= 100 && rect.bottom >= 100) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});