document.addEventListener('DOMContentLoaded', function () {
  
  // --- 1. MOBILE MENU (Robust Mobile-First Logic) ---
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  function toggleMenu(forceClose = false) {
    if (!navLinks || !hamburger) return;

    if (forceClose) {
      navLinks.classList.remove('open');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      return;
    }

    const isOpen = navLinks.classList.toggle('open');
    hamburger.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  }

  if (hamburger && navLinks) {
    // Toggle on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Close IMMEDIATELY when any link is tapped
    navLinks.addEventListener('click', function(e) {
      if (e.target.closest('a')) {
        toggleMenu(true);
      }
    });

    // Close if user taps anywhere outside the menu
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('open') && !e.target.closest('.sticky-nav')) {
        toggleMenu(true);
      }
    });
  }

  // --- 2. LANGUAGE SWITCHER ---
  const langBtns = document.querySelectorAll('.lang-btn');
  const langContents = document.querySelectorAll('.lang-content');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      langContents.forEach(content => {
        if (content.getAttribute('data-lang') === lang) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // --- 3. THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const icon = themeToggle.querySelector('i');
      const text = themeToggle.querySelector('span');
      
      if (document.body.classList.contains('dark')) {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark';
      } else {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light';
      }
    });
  }

  // --- 4. SCROLL TO TOP ---
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
