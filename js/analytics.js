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


/* Unified PHARPRO navigation — installed across legacy and current pages. */
(function () {
  'use strict';
  function installUnifiedHeader() {
    if (!document.body || document.getElementById('phx-site-header')) return;
    var currentPath = location.pathname.replace(/\/+$/, '/') || '/';
    var isArabic = document.documentElement.lang && document.documentElement.lang.toLowerCase().indexOf('ar') === 0;
    var labels = isArabic ? {
      services:'الخدمات', allServices:'كل الخدمات', csv:'CSV', cqv:'CQV والخرائط الحرارية', qa:'الجودة وتقييم الفجوات', training:'التدريب', supplier:'تأهيل الموردين',
      dvs:'PHARPRO DVS', cases:'دراسات الحالة', insights:'المقالات', resources:'الموارد', checklist:'قائمة فحص الامتثال', vendor:'قائمة تقييم DVS', quiz:'اختبار الجاهزية', about:'عن PHARPRO', contact:'تقييم مجاني', menu:'فتح القائمة'
    } : {
      services:'Services', allServices:'All services', csv:'CSV validation', cqv:'CQV & thermal mapping', qa:'QA & gap assessment', training:'Training', supplier:'Supplier qualification',
      dvs:'PHARPRO DVS', cases:'Case studies', insights:'Insights', resources:'Resources', checklist:'Compliance checklist', vendor:'DVS vendor checklist', quiz:'Readiness quiz', about:'About', contact:'Free assessment', menu:'Open menu'
    };
    function active(prefix){ return currentPath.indexOf(prefix) === 0 ? ' phx-active' : ''; }
    var css = document.createElement('style');
    css.id = 'phx-header-style';
    css.textContent = '#phx-site-header{position:sticky;top:0;z-index:9999;background:rgba(255,255,255,.97);border-bottom:1px solid #e5e9ee;box-shadow:0 2px 14px rgba(35,58,94,.05);backdrop-filter:blur(12px);font-family:Inter,system-ui,sans-serif}#phx-site-header *{box-sizing:border-box}.phx-inner{width:min(1180px,calc(100% - 32px));height:70px;margin:auto;display:flex;align-items:center;gap:22px}.phx-brand{display:flex;align-items:center;gap:9px;color:#233a5e;text-decoration:none;font-size:1.2rem;font-weight:900;letter-spacing:-.03em;white-space:nowrap}.phx-mark{width:28px;height:13px;border-radius:99px;background:linear-gradient(90deg,#233a5e 0 47%,#fff 47% 53%,#b12c4b 53%);transform:rotate(-22deg)}.phx-nav{display:flex;align-items:center;gap:4px;margin-left:auto}.phx-nav>a,.phx-drop>button{border:0;background:transparent;padding:10px 9px;color:#4a596b;text-decoration:none;font:700 .82rem/1 Inter,system-ui,sans-serif;cursor:pointer;white-space:nowrap}.phx-nav>a:hover,.phx-drop>button:hover,.phx-nav .phx-active{color:#b12c4b}.phx-drop{position:relative}.phx-drop>button:after{content:"";display:inline-block;width:6px;height:6px;margin:0 0 3px 6px;border-right:1.5px solid;border-bottom:1.5px solid;transform:rotate(45deg)}.phx-menu{position:absolute;top:calc(100% + 8px);left:0;display:none;min-width:240px;padding:8px;background:#fff;border:1px solid #e2e7ec;border-radius:13px;box-shadow:0 18px 45px rgba(35,58,94,.14)}.phx-drop:hover .phx-menu,.phx-drop:focus-within .phx-menu{display:block}.phx-menu a{display:block;padding:10px 11px;border-radius:8px;color:#435267;text-decoration:none;font-size:.82rem;font-weight:650}.phx-menu a:hover{background:#f5f7fa;color:#b12c4b}.phx-contact{margin-left:8px!important;padding:11px 16px!important;border-radius:999px;background:#b12c4b!important;color:#fff!important}.phx-toggle{display:none;margin-left:auto;border:1px solid #dce2e8;border-radius:10px;background:#fff;padding:9px;color:#233a5e}.phx-toggle span{display:block;width:20px;height:2px;margin:4px;background:currentColor}.phx-mobile{display:none;padding:6px 16px 16px;border-top:1px solid #eef1f4}.phx-mobile a,.phx-mobile summary{display:block;padding:10px 6px;color:#435267;text-decoration:none;font-weight:700;font-size:.9rem}.phx-mobile details div{padding-left:14px}.phx-mobile .phx-contact{display:inline-block;margin:8px 0 0!important}@media(max-width:1010px){.phx-nav{display:none}.phx-toggle{display:block}.phx-mobile.phx-open{display:block}.phx-inner{height:64px}}';
    document.head.appendChild(css);
    var h = document.createElement('header');
    h.id = 'phx-site-header';
    h.innerHTML = '<div class="phx-inner"><a class="phx-brand" href="/" aria-label="PHARPRO home"><span class="phx-mark" aria-hidden="true"></span><span>PHARPRO</span></a><nav class="phx-nav" aria-label="Primary navigation"><div class="phx-drop"><button type="button">'+labels.services+'</button><div class="phx-menu"><a href="/services/">'+labels.allServices+'</a><a href="/services/csv/">'+labels.csv+'</a><a href="/services/cqv/">'+labels.cqv+'</a><a href="/services/qa/">'+labels.qa+'</a><a href="/services/training/">'+labels.training+'</a><a href="/services/supplier-qualification/">'+labels.supplier+'</a></div></div><a class="'+active('/services/dvs/')+'" href="/services/dvs/">'+labels.dvs+'</a><a class="'+active('/case-studies/')+'" href="/case-studies/">'+labels.cases+'</a><a class="'+active('/insights/')+'" href="/insights/">'+labels.insights+'</a><div class="phx-drop"><button type="button">'+labels.resources+'</button><div class="phx-menu"><a href="/resources/compliance-checklist/">'+labels.checklist+'</a><a href="/resources/dvs-vendor-checklist/">'+labels.vendor+'</a><a href="/resources/inspection-readiness-quiz/">'+labels.quiz+'</a></div></div><a class="'+active('/about/')+'" href="/about/">'+labels.about+'</a><a class="phx-contact" href="/contact/">'+labels.contact+'</a></nav><button class="phx-toggle" type="button" aria-expanded="false" aria-controls="phx-mobile" aria-label="'+labels.menu+'"><span></span><span></span><span></span></button></div><nav class="phx-mobile" id="phx-mobile" aria-label="Mobile navigation"><details><summary>'+labels.services+'</summary><div><a href="/services/">'+labels.allServices+'</a><a href="/services/csv/">'+labels.csv+'</a><a href="/services/cqv/">'+labels.cqv+'</a><a href="/services/qa/">'+labels.qa+'</a><a href="/services/training/">'+labels.training+'</a><a href="/services/supplier-qualification/">'+labels.supplier+'</a></div></details><a href="/services/dvs/">'+labels.dvs+'</a><a href="/case-studies/">'+labels.cases+'</a><a href="/insights/">'+labels.insights+'</a><details><summary>'+labels.resources+'</summary><div><a href="/resources/compliance-checklist/">'+labels.checklist+'</a><a href="/resources/dvs-vendor-checklist/">'+labels.vendor+'</a><a href="/resources/inspection-readiness-quiz/">'+labels.quiz+'</a></div></details><a href="/about/">'+labels.about+'</a><a class="phx-contact" href="/contact/">'+labels.contact+'</a></nav>';
    var legacy = [];
    var direct = document.querySelectorAll('body > header.nav, body > header.top, body > nav.nav, body > nav[aria-label="Main navigation"], body > nav[aria-label="Primary navigation"]');
    for (var i=0;i<direct.length;i++) legacy.push(direct[i]);
    legacy.forEach(function(el){
      if (el.tagName === 'HEADER' && el.querySelector('h1,.hero')) {
        var oldNav = el.querySelector('.nav, nav');
        if (oldNav) oldNav.style.display='none';
      } else {
        el.style.display='none';
      }
    });
    var firstDirectNav = document.querySelector('body > nav:not([aria-label="Breadcrumb"])');
    if (firstDirectNav && !firstDirectNav.closest('#phx-site-header')) firstDirectNav.style.display='none';
    document.body.insertBefore(h, document.body.firstChild);
    var toggle=h.querySelector('.phx-toggle'), mobile=h.querySelector('.phx-mobile');
    toggle.addEventListener('click',function(){var open=mobile.classList.toggle('phx-open');toggle.setAttribute('aria-expanded',String(open));});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installUnifiedHeader);
  else installUnifiedHeader();
})();
