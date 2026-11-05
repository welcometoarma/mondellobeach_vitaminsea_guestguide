document.addEventListener('DOMContentLoaded', function () {
  
  // --- 1. MOBILE MENU (Bulletproof Mobile Fix) ---
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('open');
    if (hamburger) {
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  }

  if (hamburger && navLinks) {
    // Open/Close when clicking the hamburger button
    hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (navLinks.classList.contains('open')) {
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

    // Attach an event listener DIRECTLY to every single navigation link
    // This bypasses any mobile Safari/Chrome click-event bugs
    const allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu(); // Instantly close the menu when a link is tapped
      });
    });

    // Close menu when tapping anywhere outside the navigation area
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
      scrollTopBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
