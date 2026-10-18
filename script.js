// ==========================================================================
// Vatsal Postiwala Portfolio — Executive Engineering Interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Dark / Light Mode Theme System
  // --------------------------------------------------------------------------
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;

  // Read saved preference or detect system preference
  const savedTheme = localStorage.getItem('vatsal_theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      root.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const target = current === 'light' ? 'dark' : 'light';
      applyTheme(target);
      localStorage.setItem('vatsal_theme', target);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Smooth Navigation & Accurate Scroll-to-Section
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-item, .drawer-link, #brandLink, .hero-cta-group a[href^="#"]');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBtn = document.getElementById('mobile-menu-btn');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          const navHeight = 68;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile drawer if open
          if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            if (mobileBtn) {
              mobileBtn.setAttribute('aria-expanded', 'false');
              resetHamburger();
            }
          }

          // Update active link
          document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
          const matchingNavItem = document.querySelector(`.nav-item[href="#${targetId}"]`);
          if (matchingNavItem) matchingNavItem.classList.add('active');
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Scroll Spy for Active Navigation Link & Progress Bar
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const progressEl = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        }
      });
    }

    // Scroll progress bar
    if (progressEl) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressEl.style.width = pct + '%';
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Mobile Menu Drawer Toggle
  // --------------------------------------------------------------------------
  function resetHamburger() {
    if (!mobileBtn) return;
    const bars = mobileBtn.querySelectorAll('.hamburger-bar');
    if (bars.length >= 3) {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  }

  function activateHamburger() {
    if (!mobileBtn) return;
    const bars = mobileBtn.querySelectorAll('.hamburger-bar');
    if (bars.length >= 3) {
      bars[0].style.transform = 'translateY(6px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    }
  }

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        activateHamburger();
      } else {
        resetHamburger();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        resetHamburger();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        resetHamburger();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. One-Click Email Copy Helper
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyHint = document.getElementById('copyHint');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'vatsalposty01@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        if (copyHint) {
          const originalText = copyHint.textContent;
          copyHint.textContent = 'Copied!';
          copyHint.style.color = '#38bdf8';
          setTimeout(() => {
            copyHint.textContent = originalText;
            copyHint.style.color = '';
          }, 2000);
        }
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        if (copyHint) {
          copyHint.textContent = 'Copied!';
          setTimeout(() => {
            copyHint.textContent = 'Copy Email';
          }, 2000);
        }
      }
    });
  }
});
