(() => {
  const body = document.body;
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const contactForm = document.getElementById('contactForm');
  let lang = 'en';

  function applyLanguage(nextLang) {
    lang = nextLang;
    const isArabic = lang === 'ar';
    html.lang = lang;
    html.dir = isArabic ? 'rtl' : 'ltr';
    body.classList.toggle('rtl', isArabic);
    langToggle.textContent = isArabic ? 'English' : 'العربية';

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.innerHTML = isArabic ? el.dataset.ar : el.dataset.en;
    });

    document.querySelectorAll('option[data-en-option][data-ar-option]').forEach(opt => {
      opt.textContent = isArabic ? opt.dataset.arOption : opt.dataset.enOption;
    });
  }

  langToggle.addEventListener('click', () => {
    applyLanguage(lang === 'en' ? 'ar' : 'en');
  });

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    note.textContent = lang === 'ar'
      ? 'هذا نموذج تجريبي للتصميم. سيتم ربط النموذج بطريقة الإرسال المناسبة قبل الإطلاق.'
      : 'This is a design prototype. The form can be connected to the preferred submission method before launch.';
    note.style.color = '#DDBB6A';
  });

  // Header background after scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    const scrolled = window.scrollY > 35;
    header.style.position = scrolled ? 'fixed' : 'absolute';
    header.style.background = scrolled ? 'rgba(7,17,28,.94)' : 'transparent';
    header.style.backdropFilter = scrolled ? 'blur(14px)' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
