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


/* Unified PHARPRO navigation — isolated, navy and responsive. */
(function () {
  'use strict';
  function installUnifiedHeader() {
    if (!document.body || document.getElementById('phx-site-header')) return;
    var path = location.pathname.replace(/\/+$/, '/') || '/';
    var arabicPage = /^\/services\/dvs\/ar\//.test(path) || (document.documentElement.lang || '').toLowerCase().indexOf('ar') === 0;
    var L = arabicPage ? {
      services:'الخدمات', all:'جميع الخدمات', csv:'التحقق من الأنظمة المحوسبة', cqv:'التأهيل والخرائط الحرارية', qa:'الجودة وتقييم الفجوات', training:'التدريب', supplier:'تأهيل الموردين',
      dvs:'PHARPRO DVS', cases:'دراسات الحالة', insights:'المقالات', resources:'الموارد', checklist:'قائمة فحص الامتثال', vendor:'تقييم أنظمة DVS', quiz:'اختبار الجاهزية', about:'عن PHARPRO', contact:'تقييم مجاني', menu:'فتح القائمة', lang:'English', langUrl:'/services/dvs/'
    } : {
      services:'Services', all:'All services', csv:'CSV validation', cqv:'CQV & thermal mapping', qa:'QA & gap assessment', training:'Training', supplier:'Supplier qualification',
      dvs:'PHARPRO DVS', cases:'Case studies', insights:'Insights', resources:'Resources', checklist:'Compliance checklist', vendor:'DVS vendor checklist', quiz:'Readiness quiz', about:'About', contact:'Free assessment', menu:'Open menu', lang:'عربي', langUrl:'/ar/'
    };
    function active(prefix) { return path.indexOf(prefix) === 0 ? ' phx-active' : ''; }
    var style = document.createElement('style');
    style.id = 'phx-header-style';
    style.textContent = '#phx-site-header{all:initial;display:block!important;position:sticky!important;top:0!important;z-index:2147483000!important;width:100%!important;background:#233a5e!important;border-bottom:3px solid #b12c4b!important;box-shadow:0 6px 22px rgba(12,26,47,.18)!important;font-family:Inter,Arial,sans-serif!important;direction:ltr!important;text-align:left!important;color:#fff!important}#phx-site-header *{box-sizing:border-box!important}#phx-site-header .phx-inner{width:min(1200px,calc(100% - 32px))!important;height:68px!important;margin:0 auto!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:0!important;direction:ltr!important;text-align:left!important}#phx-site-header .phx-brand{display:flex!important;align-items:center!important;gap:9px!important;flex:0 0 auto!important;color:#fff!important;text-decoration:none!important;font:900 1.18rem/1 Inter,Arial,sans-serif!important;letter-spacing:-.03em!important;white-space:nowrap!important}#phx-site-header .phx-mark{display:block!important;width:29px!important;height:14px!important;border-radius:99px!important;background:linear-gradient(90deg,#fff 0 46%,#233a5e 46% 54%,#b12c4b 54%)!important;border:1px solid rgba(255,255,255,.55)!important;transform:rotate(-22deg)!important}#phx-site-header .phx-nav{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;margin:0 0 0 22px!important;padding:0!important;direction:ltr!important;text-align:left!important}#phx-site-header .phx-nav>a,#phx-site-header .phx-drop>button{display:block!important;margin:0!important;border:0!important;background:transparent!important;padding:11px 8px!important;color:rgba(255,255,255,.88)!important;text-decoration:none!important;text-transform:none!important;letter-spacing:0!important;font:700 .79rem/1 Inter,Arial,sans-serif!important;cursor:pointer!important;white-space:nowrap!important;text-align:left!important}#phx-site-header .phx-nav>a:hover,#phx-site-header .phx-drop>button:hover,#phx-site-header .phx-nav .phx-active{color:#fff!important;background:rgba(255,255,255,.09)!important;border-radius:8px!important}#phx-site-header .phx-drop{display:block!important;position:relative!important;margin:0!important;padding:0!important}#phx-site-header .phx-drop>button:after{content:""!important;display:inline-block!important;width:6px!important;height:6px!important;margin:0 0 3px 6px!important;border:0!important;border-right:1.5px solid currentColor!important;border-bottom:1.5px solid currentColor!important;transform:rotate(45deg)!important}#phx-site-header .phx-menu{display:none!important;position:absolute!important;top:calc(100% + 8px)!important;left:0!important;right:auto!important;min-width:245px!important;margin:0!important;padding:8px!important;background:#fff!important;border:1px solid #dce2e8!important;border-radius:13px!important;box-shadow:0 18px 45px rgba(12,26,47,.22)!important;direction:ltr!important;text-align:left!important}#phx-site-header .phx-drop:hover .phx-menu,#phx-site-header .phx-drop:focus-within .phx-menu{display:block!important}#phx-site-header .phx-menu a{display:block!important;margin:0!important;padding:11px!important;border-radius:8px!important;background:transparent!important;color:#35465d!important;text-decoration:none!important;font:650 .82rem/1.25 Inter,Arial,sans-serif!important;text-align:left!important;white-space:normal!important}#phx-site-header .phx-menu a:hover{background:#f1f4f7!important;color:#b12c4b!important}#phx-site-header .phx-actions{display:flex!important;align-items:center!important;gap:8px!important;margin-left:auto!important;flex:0 0 auto!important}#phx-site-header .phx-lang{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:52px!important;padding:10px 12px!important;border:1px solid rgba(255,255,255,.42)!important;border-radius:999px!important;color:#fff!important;background:transparent!important;text-decoration:none!important;font:800 .8rem/1 Inter,Arial,sans-serif!important}#phx-site-header .phx-contact{display:inline-flex!important;align-items:center!important;justify-content:center!important;padding:11px 15px!important;border-radius:999px!important;background:#b12c4b!important;color:#fff!important;text-decoration:none!important;font:800 .79rem/1 Inter,Arial,sans-serif!important;white-space:nowrap!important}#phx-site-header .phx-toggle{display:none!important;margin-left:auto!important;border:1px solid rgba(255,255,255,.4)!important;border-radius:9px!important;background:transparent!important;padding:7px!important;color:#fff!important}#phx-site-header .phx-toggle span{display:block!important;width:20px!important;height:2px!important;margin:4px!important;background:#fff!important}#phx-site-header .phx-mobile{display:none!important;margin:0!important;padding:8px 18px 18px!important;border-top:1px solid rgba(255,255,255,.13)!important;background:#233a5e!important;direction:ltr!important;text-align:left!important}#phx-site-header .phx-mobile a,#phx-site-header .phx-mobile summary{display:block!important;margin:0!important;padding:11px 6px!important;color:#fff!important;background:transparent!important;text-decoration:none!important;font:700 .9rem/1.25 Inter,Arial,sans-serif!important;text-align:left!important;cursor:pointer!important}#phx-site-header .phx-mobile details{margin:0!important;padding:0!important}#phx-site-header .phx-mobile details div{padding-left:15px!important}#phx-site-header .phx-mobile .phx-lang,#phx-site-header .phx-mobile .phx-contact{display:inline-flex!important;margin:10px 8px 0 0!important;padding:11px 16px!important}#phx-site-header.phx-ar,#phx-site-header.phx-ar .phx-mobile{direction:rtl!important;text-align:right!important}#phx-site-header.phx-ar .phx-inner{direction:rtl!important}#phx-site-header.phx-ar .phx-nav{direction:rtl!important;margin:0 22px 0 0!important}#phx-site-header.phx-ar .phx-actions{margin-right:auto!important;margin-left:0!important}@media(max-width:1120px){#phx-site-header .phx-nav,#phx-site-header .phx-actions{display:none!important}#phx-site-header .phx-toggle{display:block!important}#phx-site-header .phx-mobile.phx-open{display:block!important}#phx-site-header .phx-inner{height:62px!important}}';
    document.head.appendChild(style);
    var h = document.createElement('header');
    h.id = 'phx-site-header';
    if (arabicPage) h.className = 'phx-ar';
    h.innerHTML = '<div class="phx-inner"><a class="phx-brand" href="/" aria-label="PHARPRO home"><span class="phx-mark" aria-hidden="true"></span><span>PHARPRO</span></a><nav class="phx-nav" aria-label="Primary navigation"><div class="phx-drop"><button type="button">'+L.services+'</button><div class="phx-menu"><a href="/services/">'+L.all+'</a><a href="/services/csv/">'+L.csv+'</a><a href="/services/cqv/">'+L.cqv+'</a><a href="/services/qa/">'+L.qa+'</a><a href="/services/training/">'+L.training+'</a><a href="/services/supplier-qualification/">'+L.supplier+'</a></div></div><a class="'+active('/services/dvs/')+'" href="/services/dvs/">'+L.dvs+'</a><a class="'+active('/case-studies/')+'" href="/case-studies/">'+L.cases+'</a><a class="'+active('/insights/')+'" href="/insights/">'+L.insights+'</a><div class="phx-drop"><button type="button">'+L.resources+'</button><div class="phx-menu"><a href="/resources/compliance-checklist/">'+L.checklist+'</a><a href="/resources/dvs-vendor-checklist/">'+L.vendor+'</a><a href="/resources/inspection-readiness-quiz/">'+L.quiz+'</a></div></div><a class="'+active('/about/')+'" href="/about/">'+L.about+'</a></nav><div class="phx-actions"><a class="phx-lang" href="'+L.langUrl+'" hreflang="'+(arabicPage?'en':'ar')+'">'+L.lang+'</a><a class="phx-contact" href="/contact/">'+L.contact+'</a></div><button class="phx-toggle" type="button" aria-expanded="false" aria-controls="phx-mobile" aria-label="'+L.menu+'"><span></span><span></span><span></span></button></div><nav class="phx-mobile" id="phx-mobile" aria-label="Mobile navigation"><details><summary>'+L.services+'</summary><div><a href="/services/">'+L.all+'</a><a href="/services/csv/">'+L.csv+'</a><a href="/services/cqv/">'+L.cqv+'</a><a href="/services/qa/">'+L.qa+'</a><a href="/services/training/">'+L.training+'</a><a href="/services/supplier-qualification/">'+L.supplier+'</a></div></details><a href="/services/dvs/">'+L.dvs+'</a><a href="/case-studies/">'+L.cases+'</a><a href="/insights/">'+L.insights+'</a><details><summary>'+L.resources+'</summary><div><a href="/resources/compliance-checklist/">'+L.checklist+'</a><a href="/resources/dvs-vendor-checklist/">'+L.vendor+'</a><a href="/resources/inspection-readiness-quiz/">'+L.quiz+'</a></div></details><a href="/about/">'+L.about+'</a><a class="phx-lang" href="'+L.langUrl+'" hreflang="'+(arabicPage?'en':'ar')+'">'+L.lang+'</a><a class="phx-contact" href="/contact/">'+L.contact+'</a></nav>';
    var legacy = document.querySelectorAll('body > header.nav, body > header.top, body > nav.nav, body > nav[aria-label="Main navigation"], body > nav[aria-label="Primary navigation"]');
    Array.prototype.forEach.call(legacy, function (el) {
      if (el.tagName === 'HEADER' && el.querySelector('h1,.hero')) {
        var oldNav = el.querySelector('.nav, nav');
        if (oldNav) oldNav.style.setProperty('display','none','important');
      } else {
        el.style.setProperty('display','none','important');
      }
    });
    var firstNav = document.querySelector('body > nav:not([aria-label="Breadcrumb"])');
    if (firstNav && firstNav.querySelector('a[href*="/services/"]')) firstNav.style.setProperty('display','none','important');
    document.body.insertBefore(h, document.body.firstChild);
    var toggle = h.querySelector('.phx-toggle'), mobile = h.querySelector('.phx-mobile');
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('phx-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installUnifiedHeader);
  else installUnifiedHeader();
})();
