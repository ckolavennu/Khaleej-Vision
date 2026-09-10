(() => {
  const body = document.body;
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const contactForm = document.getElementById('contactForm');
  const header = document.querySelector('.site-header');

  let lang = localStorage.getItem('kvLang') || 'en';

  function applyLanguage(nextLang) {
    lang = nextLang;
    localStorage.setItem('kvLang', lang);
    const isArabic = lang === 'ar';

    html.lang = lang;
    html.dir = isArabic ? 'rtl' : 'ltr';
    body.classList.toggle('rtl', isArabic);

    if (langToggle) langToggle.textContent = isArabic ? 'English' : 'العربية';

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.innerHTML = isArabic ? el.dataset.ar : el.dataset.en;
    });

    document.querySelectorAll('option[data-en-option][data-ar-option]').forEach(opt => {
      opt.textContent = isArabic ? opt.dataset.arOption : opt.dataset.enOption;
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLanguage(lang === 'en' ? 'ar' : 'en');
    });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.getElementById('formNote');
      if (note) {
        note.textContent = lang === 'ar'
          ? 'هذا نموذج تجريبي للتصميم. سيتم ربطه بطريقة الإرسال المناسبة قبل الإطلاق.'
          : 'This is a design prototype. The form will be connected to the preferred submission method before launch.';
        note.style.color = '#DDBB6A';
      }
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 35);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  applyLanguage(lang);
})();