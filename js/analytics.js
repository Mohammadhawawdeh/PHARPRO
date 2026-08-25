/* PHARPRO analytics bootstrap and consistent lead taxonomy. */
(function () {
  'use strict';

  var id = 'G-XRCV7XCWKT';
  var consentKey = 'pharpro_cookie_consent';

  function bootstrap() {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { transport_type: 'beacon' });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  function hideConsent() {
    var banner = document.getElementById('pharpro-consent');
    if (banner) banner.remove();
  }

  function showConsent() {
    if (document.getElementById('pharpro-consent')) return;
    var banner = document.createElement('div');
    banner.id = 'pharpro-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics cookie consent');
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:720px;margin:auto;padding:16px 18px;border-radius:14px;background:#17243A;color:#fff;box-shadow:0 18px 50px rgba(0,0,0,.28);font:400 .83rem/1.5 Inter,system-ui,sans-serif;display:flex;align-items:center;gap:16px;flex-wrap:wrap;';
    banner.innerHTML = '<p style="margin:0;flex:1 1 340px">We use analytics cookies to understand site performance and improve PHARPRO content. You can decline and continue normally.</p><div style="display:flex;gap:8px"><button type="button" data-consent="decline" style="padding:9px 15px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:transparent;color:#fff;font-weight:700;cursor:pointer">Decline</button><button type="button" data-consent="accept" style="padding:9px 15px;border:0;border-radius:999px;background:#B12C4B;color:#fff;font-weight:800;cursor:pointer">Accept</button></div>';
    banner.addEventListener('click', function (event) {
      var action = event.target.getAttribute('data-consent');
      if (!action) return;
      localStorage.setItem(consentKey, action === 'accept' ? 'accepted' : 'declined');
      hideConsent();
      if (action === 'accept') bootstrap();
    });
    document.body.appendChild(banner);
  }

  window.pharproTrackLead = function (method, placement, service) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'generate_lead', {
      lead_method: method || 'unknown',
      lead_placement: placement || 'unknown',
      service: service || 'general',
      page_path: window.location.pathname
    });
  };

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var placement = link.id || link.dataset.analyticsPlacement || 'link';
    if (link.id.indexOf('lb-') === 0 || link.closest('[id^="lb-"]')) return;
    if (href.indexOf('wa.me') !== -1) window.pharproTrackLead('whatsapp', placement);
    else if (href.indexOf('tel:') === 0) window.pharproTrackLead('phone', placement);
    else if (href.indexOf('mailto:') === 0) window.pharproTrackLead('email', placement);
    else if (href.indexOf('calendly.com') !== -1) window.pharproTrackLead('calendly', placement);
  });

  var choice = localStorage.getItem(consentKey);
  if (choice === 'accepted') bootstrap();
  else if (!choice) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showConsent);
    else showConsent();
  }
})();
