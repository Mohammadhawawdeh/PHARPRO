/* PHARPRO consent-aware GA4 bootstrap and conversion taxonomy. */
(function () {
  'use strict';

  var measurementId = 'G-XRCV7XCWKT';
  var consentKey = 'pharpro_cookie_consent';

  function bootstrap() {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      transport_type: 'beacon',
      allow_google_signals: false,
      send_page_view: true
    });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  window.pharproTrack = function (eventName, parameters) {
    if (typeof window.gtag !== 'function') return;
    var payload = Object.assign({ page_path: window.location.pathname }, parameters || {});
    window.gtag('event', eventName, payload);
  };

  window.pharproTrackLead = function (method, placement, service, leadId) {
    window.pharproTrack('generate_lead', {
      lead_method: method || 'unknown',
      lead_placement: placement || 'unknown',
      service: service || 'general',
      lead_id: leadId || undefined
    });
  };

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
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:760px;margin:auto;padding:16px 18px;border-radius:14px;background:#17243A;color:#fff;box-shadow:0 18px 50px rgba(0,0,0,.28);font:400 .83rem/1.5 Inter,system-ui,sans-serif;display:flex;align-items:center;gap:16px;flex-wrap:wrap;';
    banner.innerHTML = '<p style="margin:0;flex:1 1 360px">We use analytics cookies to measure website performance. You can decline and continue normally. <a href="/privacy/" style="color:#fff;text-decoration:underline">Privacy notice</a>.</p><div style="display:flex;gap:8px"><button type="button" data-consent="decline" style="padding:9px 15px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:transparent;color:#fff;font-weight:700;cursor:pointer">Decline</button><button type="button" data-consent="accept" style="padding:9px 15px;border:0;border-radius:999px;background:#B12C4B;color:#fff;font-weight:800;cursor:pointer">Accept</button></div>';
    banner.addEventListener('click', function (event) {
      var action = event.target.getAttribute('data-consent');
      if (!action) return;
      localStorage.setItem(consentKey, action === 'accept' ? 'accepted' : 'declined');
      hideConsent();
      if (action === 'accept') bootstrap();
    });
    document.body.appendChild(banner);
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var placement = link.id || link.dataset.analyticsPlacement || link.dataset.ctaName || 'link';
    if (href.indexOf('wa.me') !== -1) window.pharproTrack('whatsapp_click', { placement: placement });
    else if (href.indexOf('tel:') === 0) window.pharproTrack('phone_click', { placement: placement });
    else if (href.indexOf('mailto:') === 0) window.pharproTrack('email_click', { placement: placement });
    else if (href.indexOf('calendly.com') !== -1) window.pharproTrack('calendar_click', { placement: placement });
    else if (link.matches('[data-demo-cta]')) window.pharproTrack('cta_click', { placement: placement, service: 'pharpro_dvs' });
  });

  var choice = localStorage.getItem(consentKey);
  if (choice === 'accepted') bootstrap();
  else if (!choice) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showConsent);
    else showConsent();
  }
})();
