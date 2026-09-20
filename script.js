(() => {

  /* =======================================================
     CORE PAGE REFERENCES
     ======================================================= */

  const body =
    document.body;

  const html =
    document.documentElement;

  const langToggle =
    document.getElementById('langToggle');

  const menuToggle =
    document.getElementById('menuToggle');

  const mobileMenu =
    document.getElementById('mobileMenu');

  const contactForm =
    document.getElementById('contactForm');

  const header =
    document.querySelector('.site-header');


  /* =======================================================
     SITE COLOR THEME
     ======================================================= */

  /*
    DEFAULT THEME

    Change this one line to switch the entire site:

      'theme-sky-sand'
      'theme-champagne'
      'theme-modern-greige'

    If a page already has one of those classes directly on
    <body>, that HTML class takes priority over this default.
  */

  const SITE_THEME =
    'theme-champagne';


  const AVAILABLE_SITE_THEMES = [
    'theme-sky-sand',
    'theme-champagne',
    'theme-modern-greige'
  ];


  function applySiteTheme(themeName = SITE_THEME) {

    const declaredTheme =
      AVAILABLE_SITE_THEMES.find(
        theme =>
          body.classList.contains(theme)
      );


    /*
      A theme explicitly written into the page's <body>
      class wins over the JavaScript default.
    */

    if (declaredTheme) {

      body.classList.add(
        'theme-active'
      );

      return declaredTheme;
    }


    if (
      !AVAILABLE_SITE_THEMES.includes(themeName)
    ) {

      console.warn(
        `Unknown Khaleej Vision theme: ${themeName}`
      );

      return null;
    }


    body.classList.add(
      'theme-active',
      themeName
    );


    return themeName;

  }


  /*
    Handy while testing in DevTools:

      setKhaleejTheme('theme-sky-sand')
      setKhaleejTheme('theme-champagne')
      setKhaleejTheme('theme-modern-greige')
  */

  window.setKhaleejTheme =
    function (themeName) {

      if (
        !AVAILABLE_SITE_THEMES.includes(themeName)
      ) {

        console.warn(
          `Unknown Khaleej Vision theme: ${themeName}`
        );

        return;

      }


      body.classList.remove(
        ...AVAILABLE_SITE_THEMES
      );


      body.classList.add(
        'theme-active',
        themeName
      );

    };


  applySiteTheme();



  /* =======================================================
     KHALEEJ VISION BRAND LOGO
     ======================================================= */

  /*
    Replace the temporary inline SVG/text lockup with the
    selected Khaleej Vision logo image.

    Sizing is intentionally NOT controlled here anymore.
    styles.css is now the single source of truth for header
    and footer logo dimensions.
  */

  function installBrandLogos() {

    const targets =
      document.querySelectorAll(
        '.brand-lockup, .footer-lockup'
      );


    targets.forEach(target => {

      target.innerHTML = `
        <img
          class="kv-brand-logo"
          src="assets/khaleej-vision-option3-selected-dark.png"
          alt="Khaleej Vision — Land Surveying & Engineering Consultancy"
        >
      `;


      target.classList.add(
        'kv-selected-logo-lockup'
      );

    });

  }


  installBrandLogos();



  /* =======================================================
     LANGUAGE SYSTEM
     ======================================================= */

  let lang =
    localStorage.getItem('kvLang') || 'en';



  function applyLanguage(nextLang) {

    lang =
      nextLang;


    localStorage.setItem(
      'kvLang',
      lang
    );


    const isArabic =
      lang === 'ar';


    html.lang =
      lang;


    html.dir =
      isArabic
        ? 'rtl'
        : 'ltr';


    body.classList.toggle(
      'rtl',
      isArabic
    );


    if (langToggle) {

      langToggle.textContent =
        isArabic
          ? 'English'
          : 'العربية';

    }


    /*
      Only elements carrying BOTH data-en and data-ar
      participate in language switching.

      The Oman intro intentionally has neither, so:
      عُمان
      أرض الفرص

      always remain Arabic.
    */

    document
      .querySelectorAll(
        '[data-en][data-ar]'
      )
      .forEach(el => {

        el.innerHTML =
          isArabic
            ? el.dataset.ar
            : el.dataset.en;

      });



    document
      .querySelectorAll(
        'option[data-en-option][data-ar-option]'
      )
      .forEach(opt => {

        opt.textContent =
          isArabic
            ? opt.dataset.arOption
            : opt.dataset.enOption;

      });

  }



  if (langToggle) {

    langToggle.addEventListener(
      'click',
      () => {

        applyLanguage(
          lang === 'en'
            ? 'ar'
            : 'en'
        );

      }
    );

  }



  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (
    menuToggle &&
    mobileMenu
  ) {

    menuToggle.addEventListener(
      'click',
      () => {

        mobileMenu
          .classList
          .toggle('open');


        const isOpen =
          mobileMenu
            .classList
            .contains('open');


        menuToggle.setAttribute(
          'aria-label',
          isOpen
            ? 'Close menu'
            : 'Open menu'
        );

      }
    );



    mobileMenu
      .querySelectorAll('a')
      .forEach(a => {

        a.addEventListener(
          'click',
          () => {

            mobileMenu
              .classList
              .remove('open');

          }
        );

      });

  }



  /* =======================================================
     CONTACT FORM PROTOTYPE
     ======================================================= */

  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();


        const note =
          document.getElementById(
            'formNote'
          );


        if (note) {

          note.textContent =
            lang === 'ar'

              ? 'هذا نموذج تجريبي للتصميم. سيتم ربطه بطريقة الإرسال المناسبة قبل الإطلاق.'

              : 'This is a design prototype. The form will be connected to the preferred submission method before launch.';


          note.style.color =
            'var(--gold-light)';

        }

      }
    );

  }



  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  const onScroll = () => {

    if (!header) {
      return;
    }


    header.classList.toggle(
      'scrolled',
      window.scrollY > 35
    );

  };


  window.addEventListener(
    'scroll',
    onScroll,
    {
      passive:true
    }
  );


  onScroll();



  /* =======================================================
     OPENING OMAN INTRO
     ======================================================= */

  function setupOpeningIntro() {

    const intro =
      document.getElementById(
        'kvIntro'
      );


    /*
      Other pages do not contain #kvIntro,
      so the animation only runs on index.html.
    */

    if (!intro) {
      return;
    }


    const INTRO_KEY =
      'khaleejVisionIntroSeen';



    /*
      Development helper:

      index.html?intro=1

      forces the intro to replay even if the current browser
      session has already viewed it.
    */

    const params =
      new URLSearchParams(
        window.location.search
      );


    const forceIntro =
      params.get('intro') === '1';



    let hasSeenIntro =
      false;


    try {

      hasSeenIntro =
        sessionStorage.getItem(
          INTRO_KEY
        ) === 'true';

    } catch (error) {

      /*
        Some restrictive browser modes can block storage.
        In that case the intro is allowed to run normally.
      */

      hasSeenIntro =
        false;

    }



    /*
      Already viewed in this tab/session.
    */

    if (
      hasSeenIntro &&
      !forceIntro
    ) {

      intro.remove();

      html.classList.remove(
        'kv-intro-skip'
      );

      return;

    }



    /*
      Page underneath cannot scroll during intro.
    */

    body.classList.add(
      'intro-active'
    );



    /*
      Mark it as seen for this browser session.
    */

    try {

      sessionStorage.setItem(
        INTRO_KEY,
        'true'
      );

    } catch (error) {

      /*
        Ignore storage errors.
      */

    }



    /*
      Respect reduced-motion preferences.
    */

    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;



    const leaveDelay =
      reduceMotion
        ? 700
        : 3000;



    const removeDelay =
      reduceMotion
        ? 1000
        : 3900;



    let leaveTimer;

    let removeTimer;

    let introFinished =
      false;



    /* -------------------------------------------------------
       Finish / skip sequence
       ------------------------------------------------------- */

    function leaveIntro() {

      if (introFinished) {
        return;
      }


      introFinished =
        true;


      window.clearTimeout(
        leaveTimer
      );


      window.clearTimeout(
        removeTimer
      );


      intro.classList.add(
        'is-leaving'
      );


      body.classList.remove(
        'intro-active'
      );


      /*
        Remove overlay completely once fade transition ends.
      */

      window.setTimeout(
        () => {

          if (intro.isConnected) {

            intro.remove();

          }

        },
        reduceMotion
          ? 260
          : 900
      );

    }



    /* -------------------------------------------------------
       Automatic exit
       ------------------------------------------------------- */

    leaveTimer =
      window.setTimeout(
        () => {

          intro.classList.add(
            'is-leaving'
          );


          body.classList.remove(
            'intro-active'
          );

        },
        leaveDelay
      );



    removeTimer =
      window.setTimeout(
        () => {

          introFinished =
            true;


          if (intro.isConnected) {

            intro.remove();

          }


          body.classList.remove(
            'intro-active'
          );

        },
        removeDelay
      );



    /* -------------------------------------------------------
       Escape skips animation
       ------------------------------------------------------- */

    const escapeHandler =
      (event) => {

        if (
          event.key !== 'Escape'
        ) {
          return;
        }


        leaveIntro();


        document.removeEventListener(
          'keydown',
          escapeHandler
        );

      };


    document.addEventListener(
      'keydown',
      escapeHandler
    );



    /*
      Clicking/tapping anywhere also skips the sequence.

      Since this is only a short brand intro, there is no
      visible skip button cluttering the composition.
    */

    intro.addEventListener(
      'click',
      leaveIntro,
      {
        once:true
      }
    );

  }



  /* =======================================================
     INITIALISE PAGE
     ======================================================= */

  applyLanguage(
    lang
  );


  setupOpeningIntro();

})();