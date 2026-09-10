(() => {
  const body = document.body;
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const contactForm = document.getElementById('contactForm');
  const header = document.querySelector('.site-header');

  /*
   * Use the original Khaleej Vision artwork from assets/khaleej-vision-logo.png
   * as the source for the website lockup. The SVG filter removes the white
   * artwork background at render time while keeping the original eye/terrain/
   * building geometry. Dark details are converted to ivory for readability on
   * the navy header/footer.
   */
  function installBrandLogos() {
    const targets = document.querySelectorAll('.brand-lockup, .footer-lockup');

    targets.forEach((target, index) => {
      const filterId = `kv-real-logo-${index}`;
      const isFooter = target.classList.contains('footer-lockup');

      target.innerHTML = `
        <svg class="kv-brand-emblem" viewBox="200 145 855 515" aria-hidden="true" focusable="false">
          <defs>
            <filter id="${filterId}" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        -0.957 -3.218 -0.325 0 4.5" result="nonWhiteRaw" />
              <feComponentTransfer in="nonWhiteRaw" result="nonWhite">
                <feFuncA type="table" tableValues="0 0 0 .15 .55 .9 1 1 1 1 1" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" in2="nonWhite" operator="in" result="cutout" />

              <feColorMatrix in="SourceGraphic" type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        -0.553 -1.860 -0.188 0 1.6" result="darkMask" />
              <feFlood flood-color="#F7F4ED" result="ivory" />
              <feComposite in="ivory" in2="darkMask" operator="in" result="lightDetails" />

              <feMerge>
                <feMergeNode in="cutout" />
                <feMergeNode in="lightDetails" />
              </feMerge>
            </filter>
          </defs>
          <image href="assets/khaleej-vision-logo.png" x="0" y="0" width="1254" height="1254"
                 preserveAspectRatio="xMidYMid meet" filter="url(#${filterId})" />
        </svg>
        <span class="brand-text kv-brand-text">
          <strong><span class="kv-gold-word">KHALEEJ</span> <span>VISION</span></strong>
          <small>LAND SURVEYING &amp; ENGINEERING CONSULTANCY</small>
        </span>`;

      target.classList.add('kv-real-lockup');
      if (isFooter) target.classList.add('kv-footer-real-lockup');
    });

    if (!document.getElementById('kv-real-logo-styles')) {
      const style = document.createElement('style');
      style.id = 'kv-real-logo-styles';
      style.textContent = `
        .kv-real-lockup{
          display:inline-flex !important;
          align-items:center;
          gap:13px;
          width:auto !important;
          min-width:0;
          color:#F7F4ED;
        }
        .kv-brand-emblem{
          width:70px;
          height:58px;
          flex:0 0 70px;
          overflow:visible;
          display:block;
        }
        .kv-brand-text{
          display:flex;
          flex-direction:column;
          min-width:0;
          line-height:1;
        }
        .kv-brand-text strong{
          color:#F7F4ED !important;
          font-family:Georgia, 'Times New Roman', serif;
          font-size:21px !important;
          font-weight:600;
          letter-spacing:.045em;
          white-space:nowrap;
        }
        .kv-brand-text .kv-gold-word{color:#DDBB6A;}
        .kv-brand-text small{
          display:block !important;
          margin-top:7px;
          color:rgba(255,255,255,.56) !important;
          font-size:7px !important;
          line-height:1.2;
          letter-spacing:.12em;
          white-space:nowrap;
        }
        .kv-footer-real-lockup .kv-brand-emblem{
          width:66px;
          height:55px;
          flex-basis:66px;
        }
        .kv-footer-real-lockup .kv-brand-text strong{font-size:19px !important;}
        .kv-footer-real-lockup .kv-brand-text small{font-size:6.5px !important;}
        @media (max-width: 1180px){
          .kv-brand-emblem{width:61px;height:52px;flex-basis:61px;}
          .kv-brand-text strong{font-size:18px !important;}
          .kv-brand-text small{font-size:6.2px !important;}
        }
        @media (max-width: 620px){
          .kv-brand-emblem{width:52px;height:46px;flex-basis:52px;}
          .kv-brand-text strong{font-size:15px !important;}
          .kv-brand-text small{display:none !important;}
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