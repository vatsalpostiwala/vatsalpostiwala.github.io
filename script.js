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
        // Fallback gracefully without throwing UI errors
        liveBadge.textContent = '● Cloud API: Render Microservice';
      });
  }

  // 3. Subtle Card Tilt & Mouse Tracking Effect on Featured Card
  const featuredCard = document.querySelector('.featured-card');
  if (featuredCard && window.innerWidth > 992) {
    featuredCard.addEventListener('mousemove', (e) => {
      const rect = featuredCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      
      featuredCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    featuredCard.addEventListener('mouseleave', () => {
      featuredCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      featuredCard.style.transition = 'transform 0.5s ease';
    });

    featuredCard.addEventListener('mouseenter', () => {
      featuredCard.style.transition = 'none';
    });
  }
});
