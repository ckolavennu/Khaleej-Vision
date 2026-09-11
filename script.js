(() => {
  const body = document.body;
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const contactForm = document.getElementById('contactForm');
  const header = document.querySelector('.site-header');

  // Use the selected total-station / KV tripod logo on every page.
  function installBrandLogos() {
    const targets = document.querySelectorAll('.brand-lockup, .footer-lockup');

    targets.forEach(target => {
      target.innerHTML = `
        <img class="kv-brand-logo"
             src="assets/khaleej-vision-option3-selected-dark.png"
             alt="Khaleej Vision — Land Surveying & Engineering Consultancy">`;
      target.classList.add('kv-selected-logo-lockup');
    });

    if (!document.getElementById('kv-selected-logo-styles')) {
      const style = document.createElement('style');
      style.id = 'kv-selected-logo-styles';
      style.textContent = `
        .kv-selected-logo-lockup {
          display: inline-flex !important;
          align-items: center;
          width: auto !important;
          min-width: 0;
        }

        .kv-brand-logo {
          display: block;
          width: 330px;
          max-width: 36vw;
          height: auto;
        }

        .footer-lockup .kv-brand-logo {
          width: 300px;
          max-width: 100%;
        }

        @media (max-width: 1180px) {
          .kv-brand-logo {
            width: 292px;
            max-width: 33vw;
          }
        }

        @media (max-width: 980px) {
          .kv-brand-logo {
            width: 270px;
            max-width: 55vw;
          }
        }

        @media (max-width: 620px) {
          .kv-brand-logo {
            width: 230px;
            max-width: 68vw;
          }
          .footer-lockup .kv-brand-logo {
            width: 250px;
            max-width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  installBrandLogos();

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