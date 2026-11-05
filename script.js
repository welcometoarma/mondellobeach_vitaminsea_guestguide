document.addEventListener('DOMContentLoaded', function () {
  // --- 1. MOBILE MENU LOGIC ---
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const allLinks = document.querySelectorAll('.nav-link');

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('open');
    if (hamburger) {
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  }

  if (hamburger && navLinks) {
    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        navLinks.classList.add('open');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        }
      }
    });

    // Close menu IMMEDIATELY when ANY link is clicked
    allLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking anywhere outside the navbar
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && !e.target.closest('.sticky-nav')) {
        closeMenu();
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
      if (window.scrollY > 400) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
