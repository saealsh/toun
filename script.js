// ============== تطبيق الوضع الليلي مبكراً (قبل العرض) ==============
(function() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);
})();

// ============== الهيدر الموحّد ==============
const HEADER_HTML = `
<header class="site-header">
  <a href="index.html" class="brand">
    <span class="brand-mark"><img src="thunayyan.jpg" alt="ث"></span>
    <span>ثنيان خالد</span>
  </a>
  <div class="nav-wrapper">
    <nav>
      <ul class="nav-menu" id="navMenu">
        <li><a href="index.html" data-page="home">الرئيسية</a></li>
        <li><a href="about.html" data-page="about">عنّي</a></li>
        <li class="has-dropdown">
          <a href="brands.html" data-page="brands">للعلامات التجارية <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:.2rem;vertical-align:middle;display:inline-block;transform:translateY(-1px)"><polyline points="6 9 12 15 18 9"/></svg></a>
          <div class="dropdown-menu">
            <a href="brands.html#services" class="dropdown-item">
              <strong>الخدمات</strong>
              <span>أنواع التعاون التجاري</span>
            </a>
            <a href="brands.html#cases" class="dropdown-item">
              <strong>حالات دراسية</strong>
              <span>نتائج تعاونات سابقة</span>
            </a>
            <a href="brands.html#media-kit" class="dropdown-item">
              <strong>Media Kit</strong>
              <span>ملف تعريفي للحملات</span>
            </a>
            <a href="brands.html#partners" class="dropdown-item">
              <strong>شركاؤنا</strong>
              <span>العلامات التي تعاونّا معها</span>
            </a>
          </div>
        </li>
        <li><a href="calendar.html" data-page="calendar">الكالندر</a></li>
        <li><a href="contact.html" data-page="contact">تواصل</a></li>
      </ul>
    </nav>
    <a href="contact.html" class="header-cta" data-page="contact-cta">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
      احجز تعاوناً
    </a>
    <button class="theme-toggle" aria-label="تبديل الوضع">
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
    <button class="menu-toggle" aria-label="القائمة">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</header>
`;

// ============== الفوتر الموحّد ==============
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-brand-wrap">
          <span class="footer-mark"><img src="thunayyan.jpg" alt="ث"></span>
          <div>
            <div class="footer-brand">ثنيان خالد</div>
            <div class="footer-tagline">صانع محتوى ومؤثّر رقمي</div>
          </div>
        </div>
        <p class="footer-desc">منذ <span class="num">2010</span>، نوثّق اليوميات ونصنع شراكات استراتيجيّة مع علامات تجاريّة تؤمن بقوّة المحتوى الأصيل.</p>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">روابط سريعة</h4>
        <ul class="footer-links">
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="about.html">عنّي</a></li>
          <li><a href="brands.html">للعلامات التجارية</a></li>
          <li><a href="calendar.html">الكالندر <span class="footer-new">جديد</span></a></li>
          <li><a href="contact.html">تواصل معي</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">للتعاون التجاري</h4>
        <ul class="footer-links">
          <li><a href="brands.html#services">أنواع التعاون</a></li>
          <li><a href="brands.html#media-kit">حمّل Media Kit</a></li>
          <li><a href="contact.html#quote">اطلب عرض سعر</a></li>
          <li><a href="brands.html#partners">شركاؤنا</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">تواصل مباشر</h4>
        <a href="mailto:thunayyan16@gmail.com" class="footer-contact">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>thunayyan16@gmail.com</span>
        </a>
        <a href="https://api.whatsapp.com/send/?phone=966566334500" target="_blank" rel="noopener" class="footer-contact">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          <span>+966 56 633 4500</span>
        </a>
        <div class="footer-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>الخبر · المملكة العربية السعودية</span>
        </div>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <div class="footer-social">
        <a href="https://www.youtube.com/channel/UCtAUHu0stm1w5Sw_m1CaIKw" target="_blank" rel="noopener" class="social-icon-frame" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        <a href="https://www.instagram.com/thunayyan16" target="_blank" rel="noopener" class="social-icon-frame" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="https://www.tiktok.com/@tounk16" target="_blank" rel="noopener" class="social-icon-frame" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z"/></svg></a>
        <a href="https://x.com/Thunayyan16" target="_blank" rel="noopener" class="social-icon-frame" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="https://www.snapchat.com/@toun16" target="_blank" rel="noopener" class="social-icon-frame" aria-label="Snapchat"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.166 2c4.038 0 5.962 2.954 6.013 6.273.012.91 0 1.81-.077 2.692.078.046.252.103.575.103.337-.012.736-.103 1.171-.32.122-.06.272-.106.435-.106.21 0 .42.043.575.106.42.156.658.45.658.79.012.41-.353.789-1.092 1.083-.139.057-.32.117-.512.18-.633.207-1.594.519-1.85 1.122-.135.32-.082.731.156 1.225v.012c.078.18 2.014 4.434 6.18 5.118.319.052.55.343.532.665a.872.872 0 01-.046.227c-.27.633-1.402 1.097-3.466 1.42-.066.094-.135.45-.18.661-.045.21-.09.428-.156.66a.582.582 0 01-.607.426h-.024c-.135 0-.33-.024-.575-.075-.378-.075-.84-.15-1.42-.15-.34 0-.687.024-1.039.085-.681.117-1.27.532-1.949 1.018-.972.687-2.073 1.466-3.726 1.466l-.156-.005c-.045.005-.105.005-.165.005-1.654 0-2.755-.779-3.726-1.466-.681-.486-1.268-.901-1.95-1.018a6.115 6.115 0 00-1.039-.084c-.61 0-1.091.094-1.42.16-.234.046-.435.082-.575.082a.582.582 0 01-.622-.434c-.06-.221-.105-.45-.15-.66-.045-.211-.117-.563-.18-.657-2.064-.323-3.196-.787-3.466-1.42a.866.866 0 01-.046-.227.642.642 0 01.532-.665c4.166-.684 6.102-4.938 6.18-5.118v-.012c.238-.494.29-.906.156-1.225-.256-.603-1.217-.915-1.85-1.122a16.32 16.32 0 01-.512-.18c-.989-.39-1.137-.866-1.087-1.194.082-.45.706-.78 1.22-.78.151 0 .272.024.39.082.45.21.85.32 1.181.32.354 0 .55-.082.62-.121-.077-.882-.09-1.782-.077-2.692C6.204 4.954 8.128 2 12.166 2z"/></svg></a>
        <a href="https://discord.com/invite/25SVM4dC" target="_blank" rel="noopener" class="social-icon-frame" aria-label="Discord"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg></a>
      </div>
      <div class="footer-copy">© <span class="num">2026</span> ثنيان خالد · جميع الحقوق محفوظة</div>
    </div>
  </div>
</footer>
`;

// ============== الـ Sticky CTA للموبايل ==============
const MOBILE_CTA_HTML = `
<a href="contact.html" class="mobile-sticky-cta">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
  <span>احجز تعاوناً تجارياً</span>
</a>
`;

// ============== الحقن في الصفحة ==============
function injectLayout() {
  // تحديد الصفحة الحالية من body data attribute
  const currentPage = document.body.getAttribute('data-page') || '';
  
  // حقن الهيدر
  const headerSlot = document.getElementById('site-header-slot');
  if (headerSlot) {
    headerSlot.outerHTML = HEADER_HTML;
  } else if (!document.querySelector('.site-header')) {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  }
  
  // حقن الفوتر
  const footerSlot = document.getElementById('site-footer-slot');
  if (footerSlot) {
    footerSlot.outerHTML = FOOTER_HTML;
  } else if (!document.querySelector('.site-footer')) {
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  }
  
  // حقن CTA للموبايل (يظهر فقط عبر CSS عند الحاجة)
  if (currentPage !== 'contact' && !document.querySelector('.mobile-sticky-cta')) {
    document.body.insertAdjacentHTML('beforeend', MOBILE_CTA_HTML);
  }
  
  // تعليم الصفحة النشطة في القائمة
  if (currentPage) {
    document.querySelectorAll(`[data-page="${currentPage}"]`).forEach(link => {
      link.classList.add('active');
    });
  }
}

// ============== الأحداث بعد تحميل DOM ==============
document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  
  // ===== تبديل الوضع =====
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ===== قائمة الموبايل =====
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    menu.querySelectorAll('a:not(.has-dropdown > a)').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
    
    // dropdown داخل قائمة الموبايل
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 840) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  // ===== ظل الهيدر عند التمرير =====
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===== Sticky CTA - يظهر بعد scroll =====
  const stickyCta = document.querySelector('.mobile-sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ===== أنميشن الكشف عند التمرير =====
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ===== نموذج التواصل =====
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const get = (n) => contactForm.querySelector(`[name="${n}"]`)?.value || '';
        const data = {
          name: get('name'), company: get('company'),
          email: get('email'), phone: get('phone'),
          type: get('type'), budget: get('budget'),
          message: get('message'),
        };

        if (!data.name || !data.company || !data.email || !data.message) {
          showToast('يرجى تعبئة الحقول الإلزامية', 'error');
          return;
        }

        const subject = `طلب تعاون من ${data.company} — ${data.type || 'استفسار'}`;
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

        window.location.href = `mailto:thunayyan16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        showToast('تم فتح برنامج البريد لإرسال طلبك', 'success');
        setTimeout(() => contactForm.reset(), 1500);
      });
    }
  }
});

// ============== Toast ==============
function showToast(message, type = 'success') {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
