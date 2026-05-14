// ============== الوضع الليلي / النهاري ==============
(function() {
  // قراءة التفضيل المحفوظ
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);
})();

document.addEventListener('DOMContentLoaded', () => {
  
  // ============== تبديل الوضع ==============
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ============== قائمة الموبايل ==============
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  // ============== تأثير الهيدر عند التمرير ==============
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 50) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = scroll;
  });

  // ============== أنميشن الكشف عند التمرير ==============
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ============== أنميشن الأرقام ==============
  const animateNumber = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0');
    if (isNaN(target)) return;
    
    const duration = 2000;
    const start = performance.now();
    
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      
      // تنسيق الرقم
      let display;
      if (target >= 1000000) {
        display = (current / 1000000).toFixed(2) + 'M';
      } else if (target >= 1000) {
        display = (current / 1000).toFixed(decimals || 1) + 'K';
      } else {
        display = Math.floor(current).toLocaleString('en-US');
      }
      
      el.textContent = display + suffix;
      
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

  // ============== نموذج التواصل ==============
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const data = {
        name: contactForm.querySelector('[name="name"]').value,
        company: contactForm.querySelector('[name="company"]').value,
        email: contactForm.querySelector('[name="email"]').value,
        phone: contactForm.querySelector('[name="phone"]').value,
        type: contactForm.querySelector('[name="type"]').value,
        budget: contactForm.querySelector('[name="budget"]').value,
        message: contactForm.querySelector('[name="message"]').value,
      };

      if (!data.name || !data.company || !data.email || !data.message) {
        showToast('يرجى تعبئة الحقول الإلزامية', 'error');
        return;
      }

      // فتح البريد الإلكتروني مع البيانات
      const subject = `طلب تعاون من ${data.company} - ${data.type || 'غير محدد'}`;
      const body = `الاسم: ${data.name}
الشركة / العلامة التجارية: ${data.company}
البريد الإلكتروني: ${data.email}
رقم الجوال: ${data.phone || 'غير محدد'}
نوع التعاون: ${data.type || 'غير محدد'}
الميزانية التقريبية: ${data.budget || 'غير محدد'}

تفاصيل المشروع:
${data.message}

---
أُرسلت هذه الرسالة من موقع ثنيان خالد`;

      const mailtoLink = `mailto:thunayyan16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      showToast('تم فتح برنامج البريد لإرسال طلبك', 'success');
      setTimeout(() => contactForm.reset(), 1500);
    });
  }
});

// ============== Toast ==============
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 50%;
    transform: translateX(50%) translateY(20px);
    background: var(--accent);
    color: var(--bg);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: .92rem;
    z-index: 9999;
    opacity: 0;
    transition: all .3s ease;
    box-shadow: var(--shadow-lg);
    max-width: 90%;
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(50%) translateY(0)';
  }, 10);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
