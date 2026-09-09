/* Small enhancements; the portfolio content remains usable without JavaScript. */
(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const syncThemeLabel = () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    themeButton.setAttribute('aria-label', dark ? 'Use light mode' : 'Use dark mode');
    themeButton.setAttribute('aria-pressed', String(dark));
  };
  syncThemeLabel();
  themeButton.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') !== 'dark';
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (_) {
      /* Optional preference. */
    }
    syncThemeLabel();
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Disclosure navigation: closed links are hidden, with no modal scroll lock.
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('primary-nav');
  const header = document.querySelector('.site-nav');
  const mobile = window.matchMedia('(max-width: 1100px)');
  root.classList.add('js');
  let menuOpen = false;
  function setMenu(open, restoreFocus = false) {
    menuOpen = mobile.matches && open;
    navigation.hidden = mobile.matches && !menuOpen;
    menuButton.setAttribute('aria-expanded', String(menuOpen));
    menuButton.setAttribute('aria-label', menuOpen ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) menuButton.focus();
  }
  function resizeMenu() {
    const focusWouldHide = mobile.matches && navigation.contains(document.activeElement);
    setMenu(false, focusWouldHide);
  }
  resizeMenu();
  mobile.addEventListener('change', resizeMenu);
  menuButton.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      event.preventDefault();
      setMenu(false, true);
    }
  });
  document.addEventListener('click', (event) => {
    if (menuOpen && !header.contains(event.target)) setMenu(false);
  });
  document.addEventListener('focusin', (event) => {
    if (menuOpen && !header.contains(event.target)) setMenu(false);
  });
  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    setMenu(false);
    const target = document.getElementById(link.hash.slice(1));
    if (target) target.focus({ preventScroll: true });
  });

  const progress = document.getElementById('scroll-progress');
  const topButton = document.getElementById('scroll-top');
  function onScroll() {
    const total = root.scrollHeight - window.innerHeight;
    progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
    const show = window.scrollY > 480;
    // Do not hide a keyboard focused control before its action is complete.
    if (show || document.activeElement !== topButton) topButton.hidden = !show;
    topButton.classList.toggle('visible', show);
    root.classList.toggle('at-top', window.scrollY < 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  topButton.addEventListener('click', () => {
    document.querySelector('.brand').focus({ preventScroll: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    onScroll();
  });
  if ('IntersectionObserver' in window) {
    const navLinks = [...navigation.querySelectorAll('a')];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const link of navLinks) {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const sendButton = document.getElementById('send-btn');
  const success = document.getElementById('contact-success');
  const startedAt = document.getElementById('form_started_at');
  startedAt.value = String(Date.now());
  function setError(input, message) {
    const id = `${input.id}-err`;
    let error = document.getElementById(id);
    if (!error) {
      error = document.createElement('p');
      error.id = id;
      error.className = 'err';
      input.parentNode.appendChild(error);
    }
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', id);
  }
  function clearError(input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    document.getElementById(`${input.id}-err`)?.remove();
  }
  function validate() {
    const fields = [form.elements.name, form.elements.email, form.elements.message];
    const messages = [
      fields[0].value.trim().length >= 2 && fields[0].value.trim().length <= 120
        ? ''
        : 'Enter a name between 2 and 120 characters.',
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields[1].value.trim())
        ? ''
        : 'Enter a valid email address.',
      fields[2].value.trim().length >= 20 && fields[2].value.trim().length <= 2000
        ? ''
        : 'Enter a message between 20 and 2000 characters.',
    ];
    let firstInvalid;
    fields.forEach((input, index) => {
      if (messages[index]) {
        setError(input, messages[index]);
        firstInvalid ||= input;
      } else clearError(input);
    });
    return firstInvalid;
  }
  let sending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    status.textContent = '';
    const invalid = validate();
    if (invalid) {
      invalid.focus();
      return;
    }
    if (form.elements._honey.value) return;
    if (Date.now() - Number(startedAt.value) < 2500) {
      status.textContent = 'Please wait a moment, then try again.';
      return;
    }
    sending = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Sending…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Delivery service unavailable');
      const result = await response.json();
      if (result.success !== true && result.success !== 'true')
        throw new Error('Delivery not confirmed');
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus();
    } catch (_) {
      status.textContent =
        'Delivery could not be confirmed. Please try again or email diego.crisafu@gmail.com directly.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      sendButton.disabled = false;
      sendButton.textContent = 'Send message';
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
      navigator.serviceWorker.register('./sw.js').catch(() => {})
    );
  }
})();
