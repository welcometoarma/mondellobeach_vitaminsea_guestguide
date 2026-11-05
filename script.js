/* ============================================================
   Vitamin Sea – Guest Guide · Full JavaScript
   Handles:
   - Language switching (EN / IT / DE / FR / SK)
   - Light / dark theme toggle
   - Mobile navigation open/close
   - Close mobile menu after any section link is clicked
   - Close mobile menu when clicking outside / Escape / resize
   - Scroll-to-top button
   - Saves language & theme in localStorage
   ============================================================ */

(function () {
  'use strict';

  const LANG_KEY = 'vitamin-sea-lang';
  const THEME_KEY = 'vitamin-sea-theme';
  const SUPPORTED_LANGS = ['en', 'it', 'de', 'fr', 'sk'];

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        /* ignore private mode / blocked storage */
      }
    }
  };

  /* ==========================================================
     LANGUAGE SWITCHER
     ========================================================== */
  function initLanguage() {
    const buttons = document.querySelectorAll('.lang-btn[data-lang]');
    const contents = document.querySelectorAll('.lang-content[data-lang]');

    if (!buttons.length && !contents.length) return;

    function applyLanguage(lang) {
      if (!SUPPORTED_LANGS.includes(lang)) {
        lang = 'en';
      }

      contents.forEach(function (el) {
        el.classList.toggle('active', el.dataset.lang === lang);
      });

      buttons.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      document.documentElement.lang = lang;
      storage.set(LANG_KEY, lang);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.dataset.lang);
      });
    });

    let saved = storage.get(LANG_KEY);
    if (!saved || !SUPPORTED_LANGS.includes(saved)) {
      saved = 'en';
    }

    applyLanguage(saved);
  }

  /* ==========================================================
     THEME TOGGLE
     ========================================================== */
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;

    function applyTheme(dark) {
      body.classList.toggle('dark', dark);

      if (!toggle) return;

      const icon = toggle.querySelector('i');
      const label = toggle.querySelector('span');

      if (icon) {
        icon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
      }

      if (label) {
        label.textContent = dark ? 'Dark' : 'Light';
      }
    }

    const saved = storage.get(THEME_KEY);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialDark = saved
      ? saved === 'dark'
      : prefersDark;

    applyTheme(initialDark);

    if (toggle) {
      toggle.addEventListener('click', function () {
        const dark = !body.classList.contains('dark');
        applyTheme(dark);
        storage.set(THEME_KEY, dark ? 'dark' : 'light');
      });
    }
  }

  /* ==========================================================
     MOBILE MENU
     ========================================================== */
  function initMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');

    if (!navLinks || !hamburger) return;

    function setMenu(open) {
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-times', open);
      }
    }

    function closeMenu() {
      setMenu(false);
    }

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navLinks');

    /* Toggle menu */
    hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setMenu(!navLinks.classList.contains('open'));
    });

    /* Close menu after clicking ANY navigation link */
    navLinks.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;

      closeMenu();

      if (
        document.activeElement &&
        typeof document.activeElement.blur === 'function'
      ) {
        document.activeElement.blur();
      }
    });

    /* Close menu when clicking outside the navigation */
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('open')) return;
      if (e.target.closest('.sticky-nav')) return;
      closeMenu();
    });

    /* Close menu with Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });

    /* Close menu when hash changes (back/forward, deep links) */
    window.addEventListener('hashchange', closeMenu);

    /* Close menu when hamburger is no longer visible (desktop resize) */
    let rafId = null;

    window.addEventListener('resize', function () {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(function () {
        const display = window.getComputedStyle(hamburger).display;

        if (display === 'none' && navLinks.classList.contains('open')) {
          closeMenu();
        }
      });
    });
  }

  /* ==========================================================
     SCROLL TO TOP
     ========================================================== */
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    function update() {
      if (window.scrollY > 400) {
        btn.style.display = 'flex';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      } else {
        btn.style.display = 'none';
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================
     INIT
     ========================================================== */
  function init() {
    initLanguage();
    initTheme();
    initMobileMenu();
    initScrollTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();