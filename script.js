// ==========================================================================
// Vatsal Postiwala Portfolio Interactive Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. One-Click Copy Email to Clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyHint = document.getElementById('copyHint');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        copyHint.textContent = 'Copied!';
        copyHint.style.background = 'rgba(16, 185, 129, 0.25)';
        copyHint.style.color = '#6ee7b7';
        
        setTimeout(() => {
          copyHint.textContent = 'Copy';
          copyHint.style.background = 'rgba(56, 189, 248, 0.15)';
          copyHint.style.color = '#38bdf8';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  // 2. Real-Time Ping to Anti-Phishing Cloud Backend on Render
  const liveBadge = document.querySelector('.badge-live');
  if (liveBadge) {
    fetch('https://anti-phishing-api.onrender.com/health', { method: 'GET', mode: 'cors' })
      .then(res => {
        if (res.ok) {
          liveBadge.textContent = '● Cloud API: Live & Healthy (200 OK)';
          liveBadge.style.background = 'rgba(16, 185, 129, 0.2)';
          liveBadge.style.borderColor = 'rgba(16, 185, 129, 0.5)';
        }
      })
      .catch(() => {
        liveBadge.textContent = '● Cloud API: Render Microservice';
      });
  }

  // 3. Dynamic Typewriter Role Animation
  const roles = [
    "Flutter Mobile Engineering",
    "Pre-Navigation AI Cybersecurity",
    "B.Tech CSE @ SIT Pune",
    "NCVET Level 5 Application Developer",
    "Full-Stack Cloud & Firebase Systems"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typeEl = document.getElementById("typewriterText");

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
      setTimeout(tickTypewriter, 50);
    } else {
      charIdx--;
      typeEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tickTypewriter, 350);
        return;
      }
      setTimeout(tickTypewriter, 25);
    }
  }
  setTimeout(tickTypewriter, 800);

  // 4. Scroll Progress Indicator
  const progressEl = document.getElementById("scroll-progress");
  if (progressEl) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressEl.style.width = pct + "%";
    });
  }

  // 5. Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 6. Interactive 3D Card Hover Tilt
  const photoCard = document.querySelector('.photo-card-wrap');
  if (photoCard && window.innerWidth > 992) {
    photoCard.addEventListener('mousemove', (e) => {
      const rect = photoCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / (rect.height / 2)) * 6;
      const rotateY = (x / (rect.width / 2)) * 6;
      photoCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    photoCard.addEventListener('mouseleave', () => {
      photoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      photoCard.style.transition = 'transform 0.4s ease';
    });

    photoCard.addEventListener('mouseenter', () => {
      photoCard.style.transition = 'none';
    });
  }
});
