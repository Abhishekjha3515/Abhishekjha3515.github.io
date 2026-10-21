/**
 * Academic Portfolio - Core JavaScript
 * Abhishek Kumar Research Website
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Default: Light / White Mode)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');

  // Always default to white mode unless the user explicitly chose dark
  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeToggleIcons(true);
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeToggleIcons(false);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleIcons(isDark);
    });
  });

  function updateThemeToggleIcons(isDark) {
    themeToggleBtns.forEach(btn => {
      btn.innerHTML = isDark 
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // 2. BibTeX Toggle
  window.toggleBibtex = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('show');
    }
  };

  // 3. Copy Code / BibTeX
  window.copyText = function(btn, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const text = target.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const origText = btn.innerText;
      btn.innerText = 'Copied!';
      setTimeout(() => {
        btn.innerText = origText;
      }, 2000);
    });
  };

  // 4. Auto-render KaTeX if available
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }

  // 5. Active Navbar Link Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.pageYOffset + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // 6. Mobile View Switch Persistence
  const mobileLink = document.getElementById('switch-to-mobile');
  if (mobileLink) {
    mobileLink.addEventListener('click', () => {
      sessionStorage.setItem('preferredView', 'mobile');
    });
  }
});
