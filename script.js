// ===== SMOOTH SCROLL NA # ODKAZY =====
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

// ===== ZVÝRAZNĚNÍ AKTIVNÍHO MENU PŘI SCROLLU =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav-link');
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    
    if (rect.top <= 150 && rect.bottom >= 150) {
      // Odstraň .current ze všech
      sections.forEach(s => s.classList.remove('current'));
      // Přidej na aktuální
      section.classList.add('current');
      
      // Update menu
      const id = section.getAttribute('id');
      links.forEach(l => l.classList.remove('active'));
      document.querySelector(`a[href="#${id}"]`)?.classList.add('active');
    }
  });
});

// ===== INTERSECTION OBSERVER - ANIMACE PRVKŮ KDYŽ JSOU VIDITELNÉ =====

function initAnimations() {
  // Vyber všechny prvky s atributem data-animate
  const observerElements = document.querySelectorAll('[data-animate]');
  
  // Konfigurační objekt pro observer
  const observerOptions = {
    threshold: 0.2,        // Aktivuj když je 20% prvku viditelné
    rootMargin: '0px 0px -50px 0px'  // Počkat až na dolní část prvku
  };
  
  // Vytvoř Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Prvek je viditelný - přidej animační třídu
        const animationType = entry.target.getAttribute('data-animate');
        entry.target.classList.add(animationType);
        
        // Pokud je .skill-card, přidej i stagger efekt
        if (entry.target.classList.contains('skill-card')) {
          const staggerIndex = Array.from(document.querySelectorAll('.skill-card')).indexOf(entry.target);
          entry.target.classList.add(`animate-stagger-${staggerIndex % 6 + 1}`);
        }
        
        // Když je prvek animován, přestane se sledovat
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Sleduj všechny prvky
  observerElements.forEach(element => observer.observe(element));
}

// Spusť animace když je dokument načten
document.addEventListener('DOMContentLoaded', initAnimations);
// ===== VYLEPŠENÝ PORTFOLIO FILTER =====

function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Aktivní tlačítko
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Počítadlo pro stagger efekt
      let visibleIndex = 0;
      
      portfolioCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || cardCategory === filterValue;
        
        if (shouldShow) {
          // Zobraz kartu s postupným zpožděním
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, visibleIndex * 100); // Každá karta o 100ms později
          
          visibleIndex++;
        } else {
          // Skryj kartu
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initPortfolioFilter);