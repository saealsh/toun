// ===== قائمة الموبايل =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  // ===== تأثير الهيدر عند التمرير =====
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 20px rgba(74,150,54,.08)';
      header.style.background = 'rgba(250,253,249,.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(250,253,249,.85)';
    }
  });

  // ===== كشف العناصر عند التمرير =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== أنميشن الأرقام =====
  const animateNumber = (el) => {
    const target = el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const num = parseFloat(target);
    if (isNaN(num)) return;
    
    const duration = 2000;
    const start = performance.now();
    
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = num * eased;
      
      // تنسيق الرقم
      if (num >= 1000000) {
        el.textContent = (current / 1000000).toFixed(2) + 'M' + suffix;
      } else if (num >= 1000) {
        el.textContent = (current / 1000).toFixed(1) + 'K' + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
      
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        numberObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-target]').forEach(el => numberObserver.observe(el));
});
