Khaleej Vision — header and footer logo fix (local review first)

1. Place BOTH PNG files in the project's assets/ folder:
   - khaleej-vision-logo-header-horizontal.png
   - khaleej-vision-logo-footer-light.png

2. In EVERY .html page, replace the current header logo image's src with:
   assets/khaleej-vision-logo-header-horizontal.png
   Keep or set class="kv-brand-logo" and useful alt="Khaleej Vision — Engineering Consultancy".

3. In EVERY .html page, replace the footer logo image's src with:
   assets/khaleej-vision-logo-footer-light.png
   Keep or set class="kv-brand-logo" and useful alt="Khaleej Vision — Engineering Consultancy".

4. Copy the full contents of khaleej-vision-logo-fix.css to the END of styles.css.
   Do NOT replace all of styles.css. These rules override old !important widths.

5. Refresh local preview and test desktop/tablet/mobile before pushing to main.
   No remote GitHub files have been changed.

The new header version arranges the exact supplied graphic and original wordmark side-by-side without stretching either. The footer version keeps the original stacked composition, but uses warm-white text to be legible on dark backgrounds. Neither file adds a background.
