// ==========================================================================
// Vatsal Postiwala Portfolio — Interactive Engine & Visual Systems
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Dark / Light Mode Theme System (Matches Image 3)
  // --------------------------------------------------------------------------
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;

  // Read saved preference or default to dark
  const savedTheme = localStorage.getItem('vatsal_theme') || 'dark';
  applyTheme(savedTheme);

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
  const navLinks = document.querySelectorAll('.nav-item, .drawer-link, #brandLink');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
          // Calculate offset accounting for sticky navbar
          const navHeight = 85;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile drawer if open
          const mobileDrawer = document.getElementById('mobile-drawer');
          const mobileBtn = document.getElementById('mobile-menu-btn');
          if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
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
  // 3. Scroll Spy for Active Navigation Link
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

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
    const progressEl = document.getElementById('scroll-progress');
    if (progressEl) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressEl.style.width = pct + '%';
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Mobile Menu Drawer Toggle
  // --------------------------------------------------------------------------
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      mobileBtn.querySelector('.hamburger-bar:nth-child(2)').style.opacity = isOpen ? '0' : '1';
    });
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Cursor Glow / Spotlight
  // --------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 6. 3D Card Tilt Effect on Profile Card
  // --------------------------------------------------------------------------
  const tiltCard = document.getElementById('tilt-card');
  if (tiltCard && window.innerWidth > 992) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / (rect.height / 2)) * 6.5;
      const rotateY = (x / (rect.width / 2)) * 6.5;
      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      tiltCard.style.transition = 'transform 0.4s ease';
    });

    tiltCard.addEventListener('mouseenter', () => {
      tiltCard.style.transition = 'none';
    });
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Typewriter Role Animation
  // --------------------------------------------------------------------------
  const roles = [
    "Flutter & Firebase Mobile Engineer",
    "Creator of Anti-Phishing AI Guard",
    "NCVET & NASSCOM NSQF Level 5 Certified",
    "B.Tech CSE Undergraduate @ SIT Pune"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typeEl = document.getElementById('typewriter-text');

  function tickTypewriter() {
    if (!typeEl) return;
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      typeEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tickTypewriter, 2000);
        return;
      }
      setTimeout(tickTypewriter, 48);
    } else {
      charIdx--;
      typeEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tickTypewriter, 300);
        return;
      }
      setTimeout(tickTypewriter, 24);
    }
  }
  setTimeout(tickTypewriter, 800);

  // --------------------------------------------------------------------------
  // 8. One-Click Email Copy Helper
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyHint = document.getElementById('copyHint');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        if (copyHint) {
          copyHint.textContent = 'Copied!';
          copyHint.style.background = 'rgba(16, 185, 129, 0.25)';
          copyHint.style.color = '#34d399';
          setTimeout(() => {
            copyHint.textContent = 'Copy';
            copyHint.style.background = 'var(--bg-pill)';
            copyHint.style.color = 'var(--accent-cyan)';
          }, 2200);
        }
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Project Filtering Buttons
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#projects-grid .project-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
      });
    });
  });

  // --------------------------------------------------------------------------
  // 10. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --------------------------------------------------------------------------
  // 11. Interactive Constellation Canvas (Paused when Tab is Inactive)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;
    let mouse = { x: -1000, y: -1000 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.6 + 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw(isLight) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "rgba(2, 132, 199, 0.35)" : "rgba(34, 211, 238, 0.45)";
        ctx.fill();
      }
    }

    const count = Math.min(65, Math.floor((canvas.width * canvas.height) / 20000));
    particles = Array.from({ length: count }, () => new Particle());

    function animateParticles() {
      if (document.hidden) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = root.getAttribute('data-theme') === 'light';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(isLight);

        // Lines connecting adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 0.14 * (1 - dist / 130);
            ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connection to mouse cursor
        const mDist = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
        if (mDist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, 0.18)` : `rgba(34, 211, 238, 0.22)`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
      animId = requestAnimationFrame(animateParticles);
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) animateParticles();
      else if (animId) cancelAnimationFrame(animId);
    });

    animateParticles();
  }
});
