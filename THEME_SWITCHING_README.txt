KHALEEJ VISION THEME SYSTEM
==========================

Available themes:
- theme-sky-sand
- theme-champagne
- theme-modern-greige

EASIEST WAY TO SWITCH
---------------------
Open script.js and change:

const SITE_THEME =
  'theme-sky-sand';

To either:

const SITE_THEME =
  'theme-champagne';

or:

const SITE_THEME =
  'theme-modern-greige';

QUICK BROWSER TESTING
---------------------
Open DevTools Console and run:

setKhaleejTheme('theme-sky-sand')
setKhaleejTheme('theme-champagne')
setKhaleejTheme('theme-modern-greige')

ADDING A NEW THEME LATER
------------------------
1. Add a new body.theme-your-name { ...variables... } block near the top of styles.css.
2. Add 'theme-your-name' to AVAILABLE_SITE_THEMES in script.js.
3. Switch SITE_THEME to it.

No changes to hero-photo.css, about-page.css or team-page.css are needed for future themes, because those files now use the generic body.theme-active selector.
