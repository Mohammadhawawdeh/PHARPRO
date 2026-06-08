/**
 * PHARPRO Lead Boost — Conversion Optimisation Layer
 * Injected globally to drive free-assessment leads from every page.
 *
 * Modules:
 *  1. Phone number in desktop nav
 *  2. Desktop floating CTA panel (scroll-triggered, all pages)
 *  3. Inline mid-article CTA box (insights articles only)
 *  4. Service-page CTA strip (service pages only)
 *  5. Lead-magnet checklist promo (insights pages, before footer)
 *  6. Contact page urgency badge
 *  7. GA4 event tracking for all CTA interactions
 */
(function () {
  'use strict';

  var CONTACT_URL = '/contact/';
  var WA_URL      = 'https://wa.me/962798565807';

  /* ── GA4 HELPER ──────────────────────────────────────────── */
  function track(action, label) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', action, { event_category: 'Lead', event_label: label });
      }
    } catch (e) {}
  }

  /* ── WA SVG ──────────────────────────────────────────────── */
  var WA_SVG = '<svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.47 2.027 7.774L.057 31.943a.5.5 0 0 0 .606.606l8.169-1.97A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.5c-2.55 0-4.94-.686-7.002-1.885l-.5-.295-5.18 1.25 1.25-5.18-.295-.5A13.437 13.437 0 0 1 2.5 16C2.5 8.544 8.544 2.5 16 2.5S29.5 8.544 29.5 16 23.456 29.5 16 29.5zm7.385-10.033c-.404-.202-2.393-1.18-2.764-1.315-.371-.135-.641-.202-.911.202-.27.404-1.044 1.315-1.28 1.585-.235.27-.471.304-.875.101-.404-.202-1.706-.629-3.251-2.007-1.202-1.073-2.014-2.398-2.25-2.802-.236-.404-.025-.623.177-.824.182-.181.404-.471.607-.707.202-.236.27-.404.404-.674.135-.27.067-.505-.034-.707-.1-.202-.91-2.194-1.246-3.003-.328-.788-.662-.681-.911-.694-.235-.011-.505-.014-.775-.014-.27 0-.707.101-1.078.505-.37.404-1.415 1.382-1.415 3.37s1.449 3.91 1.651 4.18c.202.27 2.852 4.353 6.909 6.104.966.417 1.719.666 2.306.851.969.309 1.851.265 2.548.161.777-.115 2.393-.978 2.729-1.922.336-.944.336-1.753.235-1.922-.101-.168-.37-.27-.774-.472z"/></svg>';

  /* ── STYLES ──────────────────────────────────────────────── */
  var css = [
    '@keyframes lb-fadeup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes lb-pulse{0%,100%{opacity:1}50%{opacity:.35}}',

    /* Desktop floating panel */
    '#lb-desk{position:fixed;right:20px;bottom:100px;z-index:8500;width:228px;',
    'background:#1A2540;border-radius:16px;padding:20px 18px 18px;',
    'box-shadow:0 12px 40px rgba(0,0,0,.32),0 0 0 1px rgba(255,255,255,.07);',
    'animation:lb-fadeup .4s ease;display:none;}',
    '#lb-desk.show{display:block;}',
    '#lb-desk .lb-close{position:absolute;top:8px;right:10px;background:none;border:none;',
    'color:rgba(255,255,255,.35);cursor:pointer;font-size:1.3rem;line-height:1;padding:4px 6px;}',
    '#lb-desk .lb-close:hover{color:#fff;}',
    '#lb-desk .lb-eyebrow{font-size:.68rem;font-weight:700;text-transform:uppercase;',
    'letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:6px;}',
    '#lb-desk .lb-title{font-size:.92rem;font-weight:800;color:#fff;line-height:1.25;margin-bottom:4px;}',
    '#lb-desk .lb-sub{font-size:.73rem;color:rgba(255,255,255,.45);line-height:1.45;margin-bottom:15px;}',
    '#lb-desk .lb-btn{display:block;background:#B12C4B;color:#fff;text-align:center;',
    'padding:10px 14px;border-radius:999px;font-size:.82rem;font-weight:700;',
    'text-decoration:none;margin-bottom:8px;transition:background .2s;}',
    '#lb-desk .lb-btn:hover{background:#8E1E3C;}',
    '#lb-desk .lb-wa{display:flex;align-items:center;justify-content:center;gap:6px;',
    'background:rgba(37,211,102,.1);color:#1DA851;border:1px solid rgba(37,211,102,.25);',
    'padding:9px 14px;border-radius:999px;font-size:.8rem;font-weight:600;',
    'text-decoration:none;transition:background .2s;}',
    '#lb-desk .lb-wa:hover{background:rgba(37,211,102,.2);}',
    '#lb-desk .lb-trust{margin-top:12px;font-size:.67rem;color:rgba(255,255,255,.3);text-align:center;}',

    /* Inline article CTA */
    '.lb-art-cta{margin:30px 0;background:#F3F6FB;border:1px solid #C9D4E3;',
    'border-left:4px solid #B12C4B;border-radius:12px;padding:20px 22px;',
    'display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}',
    '.lb-art-cta .lb-ac-l .lb-ac-eye{font-size:.68rem;font-weight:700;text-transform:uppercase;',
    'letter-spacing:.07em;color:#B12C4B;margin-bottom:3px;}',
    '.lb-art-cta .lb-ac-l .lb-ac-title{font-size:.95rem;font-weight:700;color:#233A5E;margin-bottom:3px;}',
    '.lb-art-cta .lb-ac-l .lb-ac-sub{font-size:.8rem;color:#6B7A8D;}',
    '.lb-art-cta .lb-ac-btns{display:flex;gap:9px;flex-wrap:wrap;flex-shrink:0;}',
    '.lb-art-cta .lb-ac-main{background:#B12C4B;color:#fff;padding:9px 20px;border-radius:999px;',
    'font-size:.82rem;font-weight:700;text-decoration:none;white-space:nowrap;}',
    '.lb-art-cta .lb-ac-main:hover{background:#8E1E3C;}',
    '.lb-art-cta .lb-ac-wa{display:flex;align-items:center;gap:5px;background:#fff;color:#1DA851;',
    'border:1.5px solid rgba(37,211,102,.3);padding:9px 16px;border-radius:999px;',
    'font-size:.82rem;font-weight:600;text-decoration:none;white-space:nowrap;}',
    '.lb-art-cta .lb-ac-wa:hover{background:rgba(37,211,102,.07);}',

    /* Service CTA strip */
    '.lb-svc-strip{background:linear-gradient(135deg,#1A2540 0%,#233A5E 100%);padding:36px 0;}',
    '.lb-svc-inner{width:min(1040px,calc(100% - 2.5rem));margin:0 auto;',
    'display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;}',
    '.lb-svc-strip .lb-sl{max-width:560px;}',
    '.lb-svc-strip .lb-sl-eye{font-size:.68rem;font-weight:700;text-transform:uppercase;',
    'letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:6px;}',
    '.lb-svc-strip .lb-sl-title{font-size:1.05rem;font-weight:800;color:#fff;margin-bottom:4px;}',
    '.lb-svc-strip .lb-sl-sub{font-size:.85rem;color:rgba(255,255,255,.5);}',
    '.lb-svc-strip .lb-sr{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0;}',
    '.lb-svc-strip .lb-sr-main{background:#B12C4B;color:#fff;padding:12px 26px;border-radius:999px;',
    'font-size:.88rem;font-weight:700;text-decoration:none;white-space:nowrap;}',
    '.lb-svc-strip .lb-sr-main:hover{background:#8E1E3C;}',
    '.lb-svc-strip .lb-sr-wa{display:flex;align-items:center;gap:7px;background:rgba(37,211,102,.12);',
    'color:#25D366;border:1.5px solid rgba(37,211,102,.28);padding:12px 22px;border-radius:999px;',
    'font-size:.88rem;font-weight:600;text-decoration:none;white-space:nowrap;}',
    '.lb-svc-strip .lb-sr-wa:hover{background:rgba(37,211,102,.22);}',

    /* Checklist promo */
    '.lb-cl-banner{background:linear-gradient(135deg,#162036 0%,#233A5E 100%);padding:52px 0;text-align:center;}',
    '.lb-cl-inner{width:min(600px,calc(100% - 2.5rem));margin:0 auto;}',
    '.lb-cl-eye{font-size:.68rem;font-weight:700;text-transform:uppercase;',
    'letter-spacing:.1em;color:rgba(255,255,255,.38);margin-bottom:10px;}',
    '.lb-cl-title{font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:10px;}',
    '.lb-cl-sub{font-size:.88rem;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:24px;}',
    '.lb-cl-btn{display:inline-block;background:#B12C4B;color:#fff;padding:12px 30px;',
    'border-radius:999px;font-size:.9rem;font-weight:700;text-decoration:none;}',
    '.lb-cl-btn:hover{background:#8E1E3C;}',
    '.lb-cl-note{font-size:.72rem;color:rgba(255,255,255,.28);margin-top:10px;}',

    /* Nav phone */
    '#lb-nav-phone{display:inline-flex;align-items:center;gap:5px;font-size:.8rem;',
    'font-weight:600;color:#233A5E;opacity:.7;text-decoration:none;',
    'border:1px solid rgba(35,58,94,.18);border-radius:999px;padding:5px 12px;}',
    '#lb-nav-phone:hover{opacity:1;border-color:rgba(35,58,94,.35);}',

    /* Contact urgency */
    '#lb-contact-badge{display:inline-flex;align-items:center;gap:8px;',
    'background:rgba(15,118,110,.08);border:1px solid rgba(15,118,110,.2);',
    'color:#0A7060;padding:6px 14px;border-radius:999px;font-size:.78rem;font-weight:700;',
    'margin-top:16px;}',
    '#lb-contact-badge .lb-dot{width:7px;height:7px;border-radius:50%;background:#0A7060;',
    'animation:lb-pulse 1.6s infinite;display:inline-block;flex-shrink:0;}',

    '@media(max-width:899px){#lb-desk{display:none!important;}}'
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── 1. PHONE IN NAV ─────────────────────────────────────── */
  function addNavPhone() {
    if (window.innerWidth < 900) return;
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks || document.getElementById('lb-nav-phone')) return;
    var a = document.createElement('a');
    a.id       = 'lb-nav-phone';
    a.href     = 'tel:+962798565807';
    a.setAttribute('aria-label', 'Call PHARPRO: +962 79 856 5807');
    a.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>+962 79 856 5807';
    a.addEventListener('click', function () { track('phone_click', 'nav'); });
    navLinks.insertBefore(a, navLinks.firstChild);
  }

  /* ── 2. DESKTOP FLOATING PANEL ───────────────────────────── */
  function injectDesktopPanel() {
    if (window.innerWidth < 900) return;
    if (document.getElementById('lb-desk')) return;
    try { if (sessionStorage.getItem('lb_desk_dismissed')) return; } catch (e) {}

    var el = document.createElement('div');
    el.id = 'lb-desk';
    el.setAttribute('role', 'complementary');
    el.setAttribute('aria-label', 'Free compliance assessment offer');
    el.innerHTML = [
      '<button class="lb-close" id="lb-desk-close" aria-label="Dismiss">&#x2715;</button>',
      '<div class="lb-eyebrow">Free Assessment</div>',
      '<div class="lb-title">Get audit-ready<br>with PHARPRO</div>',
      '<div class="lb-sub">No obligation. We\'ll review your compliance situation and give you an honest starting point.</div>',
      '<a class="lb-btn" href="' + CONTACT_URL + '" id="lb-desk-btn">Book Free Assessment &rarr;</a>',
      '<a class="lb-wa" href="' + WA_URL + '" target="_blank" rel="noopener noreferrer" id="lb-desk-wa">' + WA_SVG + 'WhatsApp Us</a>',
      '<div class="lb-trust">&#10003; Reply within 24 h &nbsp;&#10003; No sales pressure</div>'
    ].join('');
    document.body.appendChild(el);

    var dismissed = false, shown = false;
    document.getElementById('lb-desk-close').addEventListener('click', function () {
      dismissed = true;
      el.classList.remove('show');
      try { sessionStorage.setItem('lb_desk_dismissed', '1'); } catch (e) {}
    });
    document.getElementById('lb-desk-btn').addEventListener('click', function () {
      track('cta_click', 'desk_panel_assessment');
    });
    document.getElementById('lb-desk-wa').addEventListener('click', function () {
      track('whatsapp_click', 'desk_panel');
    });

    function showPanel() {
      if (dismissed || shown) return;
      shown = true;
      el.classList.add('show');
    }

    window.addEventListener('scroll', function () {
      if (dismissed) return;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total > 0.35) showPanel();
    }, { passive: true });

    setTimeout(function () { if (!dismissed && !shown) showPanel(); }, 9000);
  }

  /* ── 3. INLINE ARTICLE CTA ───────────────────────────────── */
  function injectArticleCTA() {
    var path = window.location.pathname;
    if (!path.match(/^\/insights\/[^/]+\/?$/)) return;

    /* Target the English article content only — not the hidden Arabic version */
    var body = document.querySelector('article.art-content:not(.art-ar)');
    if (!body) {
      /* Fallback chain for any articles with different markup */
      var candidates = [
        document.querySelector('.art-content'),
        document.querySelector('article'),
        document.querySelector('main .wrap')
      ];
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i]) { body = candidates[i]; break; }
      }
    }
    if (!body) return;

    var paras = body.querySelectorAll('p');
    if (paras.length < 3) return;
    var insertAfter = paras[Math.min(4, paras.length - 1)];

    var box = document.createElement('div');
    box.className = 'lb-art-cta';
    box.setAttribute('role', 'complementary');
    box.setAttribute('aria-label', 'Expert help offer');
    box.innerHTML = [
      '<div class="lb-ac-l">',
      '  <div class="lb-ac-eye">Expert Help — Free</div>',
      '  <div class="lb-ac-title">Need this applied to your systems?</div>',
      '  <div class="lb-ac-sub">PHARPRO provides a free, no-obligation compliance assessment.</div>',
      '</div>',
      '<div class="lb-ac-btns">',
      '  <a class="lb-ac-main" href="' + CONTACT_URL + '" id="lb-ac-btn">Free Assessment &rarr;</a>',
      '  <a class="lb-ac-wa" href="' + WA_URL + '" target="_blank" rel="noopener noreferrer" id="lb-ac-wa">' + WA_SVG + 'WhatsApp</a>',
      '</div>'
    ].join('');

    if (insertAfter.nextSibling) {
      body.insertBefore(box, insertAfter.nextSibling);
    } else {
      body.appendChild(box);
    }

    document.getElementById('lb-ac-btn').addEventListener('click', function () {
      track('cta_click', 'article_inline_assessment');
    });
    document.getElementById('lb-ac-wa').addEventListener('click', function () {
      track('whatsapp_click', 'article_inline');
    });
  }

  /* ── 4. SERVICE PAGE CTA STRIP ───────────────────────────── */
  function injectServiceStrip() {
    var path = window.location.pathname;
    var isService = path.match(/^\/services\/[^/]+\/?$/) || path.match(/^\/services\/training\/[^/]+\/?$/);
    var isHub = (path === '/services/' || path === '/services');
    if (!isService || isHub) return;
    if (document.querySelector('.lb-svc-strip')) return;

    var main = document.querySelector('main');
    if (!main) return;
    var sections = main.querySelectorAll('section');
    if (sections.length < 2) return;

    var strip = document.createElement('div');
    strip.className = 'lb-svc-strip';
    strip.setAttribute('role', 'complementary');
    strip.setAttribute('aria-label', 'Free assessment call to action');
    strip.innerHTML = [
      '<div class="lb-svc-inner">',
      '  <div class="lb-sl">',
      '    <div class="lb-sl-eye">Talk to a Specialist</div>',
      '    <div class="lb-sl-title">Get a free, no-obligation compliance assessment</div>',
      '    <div class="lb-sl-sub">We\'ll review your situation and tell you exactly what your programme needs — no guesswork.</div>',
      '  </div>',
      '  <div class="lb-sr">',
      '    <a class="lb-sr-main" href="' + CONTACT_URL + '" id="lb-svc-btn">Free Assessment &rarr;</a>',
      '    <a class="lb-sr-wa" href="' + WA_URL + '" target="_blank" rel="noopener noreferrer" id="lb-svc-wa">' + WA_SVG + 'WhatsApp</a>',
      '  </div>',
      '</div>'
    ].join('');

    sections[1].parentNode.insertBefore(strip, sections[1]);

    document.getElementById('lb-svc-btn').addEventListener('click', function () {
      track('cta_click', 'service_strip_assessment');
    });
    document.getElementById('lb-svc-wa').addEventListener('click', function () {
      track('whatsapp_click', 'service_strip');
    });
  }

  /* ── 5. CHECKLIST PROMO (insights pages before footer) ────── */
  function injectChecklistPromo() {
    var path = window.location.pathname;
    if (!path.includes('/insights/')) return;
    if (document.querySelector('.lb-cl-banner')) return;
    try { if (sessionStorage.getItem('lb_cl_shown')) return; } catch (e) {}

    var footer = document.querySelector('footer');
    if (!footer) return;

    var banner = document.createElement('div');
    banner.className = 'lb-cl-banner';
    banner.innerHTML = [
      '<div class="lb-cl-inner">',
      '  <div class="lb-cl-eye">Free Download</div>',
      '  <div class="lb-cl-title">GMP Compliance Checklist</div>',
      '  <div class="lb-cl-sub">A practical audit-readiness checklist used by PHARPRO consultants across the MENA region. Free PDF — no email required.</div>',
      '  <a class="lb-cl-btn" href="/resources/compliance-checklist/" id="lb-cl-btn">Download Free Checklist &rarr;</a>',
      '  <div class="lb-cl-note">Also available: Inspection Readiness Quiz &rarr; <a href="/resources/inspection-readiness-quiz/" style="color:rgba(255,255,255,.4);text-decoration:underline;">take it free</a></div>',
      '</div>'
    ].join('');

    footer.parentNode.insertBefore(banner, footer);
    try { sessionStorage.setItem('lb_cl_shown', '1'); } catch (e) {}

    document.getElementById('lb-cl-btn').addEventListener('click', function () {
      track('cta_click', 'checklist_download');
    });
  }

  /* ── 6. CONTACT PAGE URGENCY ─────────────────────────────── */
  function injectContactUrgency() {
    var path = window.location.pathname;
    if (!path.match(/^\/contact\/?$/)) return;
    if (document.getElementById('lb-contact-badge')) return;

    var anchor = document.querySelector('.page-hero p, .page-hero .lead, .page-hero h1');
    if (!anchor) return;

    var badge = document.createElement('div');
    badge.id = 'lb-contact-badge';
    badge.innerHTML = '<span class="lb-dot"></span>We typically respond within 2 business hours';
    anchor.after(badge);

    /* Also surface a direct WhatsApp option above the form */
    var formWrap = document.querySelector('.c-form-wrap, .c-form');
    if (formWrap) {
      var waBar = document.createElement('div');
      waBar.style.cssText = 'background:rgba(37,211,102,.06);border:1px solid rgba(37,211,102,.2);border-radius:10px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;';
      waBar.innerHTML = [
        '<div style="font-size:.85rem;font-weight:600;color:#1A7F37;">Prefer to message directly?</div>',
        '<a href="' + WA_URL + '" target="_blank" rel="noopener noreferrer" id="lb-c-wa" ',
        'style="display:inline-flex;align-items:center;gap:7px;background:#25D366;color:#fff;',
        'padding:8px 18px;border-radius:999px;font-size:.83rem;font-weight:700;text-decoration:none;">',
        WA_SVG, ' Chat on WhatsApp</a>'
      ].join('');
      formWrap.insertBefore(waBar, formWrap.firstChild);

      var waLink = document.getElementById('lb-c-wa');
      if (waLink) waLink.addEventListener('click', function () {
        track('whatsapp_click', 'contact_form_top');
      });
    }
  }

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    addNavPhone();
    injectDesktopPanel();
    injectArticleCTA();
    injectServiceStrip();
    injectChecklistPromo();
    injectContactUrgency();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
