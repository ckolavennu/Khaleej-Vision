(() => {
  const body = document.body;
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const contactForm = document.getElementById('contactForm');
  const header = document.querySelector('.site-header');

  /*
   * Build the website lockup from the ORIGINAL logo artwork already in
   * assets/khaleej-vision-logo.png. We crop the emblem and the two wordmark
   * regions from that artwork and recolour them for the navy website chrome.
   * No replacement/recreated logo symbol is used.
   */
  function installBrandLogos() {
    const targets = document.querySelectorAll('.brand-lockup, .footer-lockup');

    targets.forEach((target, index) => {
      const goldFilter = `kv-gold-mask-${index}`;
      const ivoryFilter = `kv-ivory-mask-${index}`;
      const isFooter = target.classList.contains('footer-lockup');

      target.innerHTML = `
        <svg class="kv-original-lockup${isFooter ? ' kv-original-lockup-footer' : ''}"
             viewBox="0 0 700 150" role="img"
             aria-label="Khaleej Vision — Land Surveying & Engineering Consultancy">
          <defs>
            <filter id="${goldFilter}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        -1.2 -1.2 -1.2 0 3.55" result="nonWhite" />
              <feFlood flood-color="#DDBB6A" result="brandGold" />
              <feComposite in="brandGold" in2="nonWhite" operator="in" />
            </filter>
            <filter id="${ivoryFilter}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        -1.2 -1.2 -1.2 0 3.55" result="nonWhite" />
              <feFlood flood-color="#F7F4ED" result="brandIvory" />
              <feComposite in="brandIvory" in2="nonWhite" operator="in" />
            </filter>
          </defs>

          <!-- Original eye / terrain / building emblem crop -->
          <svg x="0" y="2" width="182" height="140" viewBox="250 180 755 580" overflow="hidden">
            <image href="assets/khaleej-vision-logo.png" x="0" y="0" width="1254" height="1254"
                   filter="url(#${goldFilter})" />
          </svg>

          <!-- Original KHALEEJ wordmark crop -->
          <svg x="202" y="31" width="251" height="75" viewBox="80 760 620 185" overflow="hidden">
            <image href="assets/khaleej-vision-logo.png" x="0" y="0" width="1254" height="1254"
                   filter="url(#${goldFilter})" />
          </svg>

          <!-- Original VISION wordmark crop -->
          <svg x="460" y="31" width="203" height="75" viewBox="680 760 500 185" overflow="hidden">
            <image href="assets/khaleej-vision-logo.png" x="0" y="0" width="1254" height="1254"
                   filter="url(#${ivoryFilter})" />
          </svg>

          <text x="205" y="130" fill="rgba(247,244,237,.72)"
                font-family="Segoe UI, Arial, sans-serif" font-size="13.5" letter-spacing="2.1">
            LAND SURVEYING &amp; ENGINEERING CONSULTANCY
          </text>
        </svg>`;

      target.classList.add('kv-cropped-original-logo');
    });

    if (!document.getElementById('kv-original-logo-styles')) {
      const style = document.createElement('style');
      style.id = 'kv-original-logo-styles';
      style.textContent = `
        .kv-cropped-original-logo {
          display:inline-flex !important;
          align-items:center;
          width:auto !important;
          min-width:0;
        }
        .kv-original-lockup {
          display:block;
          width:330px;
          max-width:35vw;
          height:auto;
          overflow:visible;
        }
        .kv-original-lockup-footer {
          width:300px;
          max-width:100%;
        }
        @media (max-width:1180px) {
          .kv-original-lockup { width:292px; max-width:32vw; }
        }
        @media (max-width:980px) {
          .kv-original-lockup { width:270px; max-width:55vw; }
        }
        @media (max-width:620px) {
          .kv-original-lockup { width:230px; max-width:65vw; }
          .kv-original-lockup-footer { width:250px; max-width:100%; }
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