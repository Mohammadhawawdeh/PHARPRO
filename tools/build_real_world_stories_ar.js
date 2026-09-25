const fs = require('fs');
const episodes = JSON.parse(fs.readFileSync('tools/.ar_data/real-world-stories-episodes.json', 'utf8'));

const seriesOrder = [
  ['pharma-real-world-stories', 'قصص واقعية (9)'],
  ['pharma-30-sec-training', 'تدريب 30 ثانية (5)'],
  ['real-warning-letters', 'خطابات تحذير (2)'],
  ['other', 'سلاسل أخرى (2)'],
];

function otherSeries(s) {
  return s === 'from-validation-to-innovation' || s === 'cleanroom-design';
}

const cards = episodes.map(ep => {
  const filterSeries = otherSeries(ep.series) ? 'other' : ep.series;
  const tagsHtml = ep.tags.map(t => `<span class="ep-tag">${t}</span>`).join('');
  const storyHtml = ep.storyAr.map(p => `<p>${p}</p>`).join('\n              ');
  return `          <article class="ep-card" data-series="${filterSeries}">
            <div class="ep-card-header">
              <div class="ep-meta">
                <span class="ep-series">${ep.seriesAr}</span>
                <span class="ep-badge">${ep.badge}</span>
              </div>
              <a href="${ep.ytHref}" target="_blank" rel="noopener noreferrer" class="ep-yt-btn" aria-label="شاهد على يوتيوب">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                شاهد المقطع
              </a>
            </div>
            <h2 class="ep-title">${ep.titleAr}</h2>
            <p class="ep-summary">${ep.summaryAr}</p>
            <div class="ep-tags">${tagsHtml}</div>
            <div class="ep-story">
              ${storyHtml}
            </div>
            <div class="ep-lesson">
              <span class="lesson-label">الدرس الأساسي</span>
              <p>${ep.lessonAr}</p>
            </div>
            <a href="${ep.ytHref}" target="_blank" rel="noopener noreferrer" class="ep-watch-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              شاهد الحلقة الكاملة على يوتيوب ←
            </a>
          </article>`;
}).join('\n');

const filterButtons = `
          <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true">جميع الحلقات (18)</button>
          <button class="filter-btn" data-filter="pharma-real-world-stories" role="tab" aria-selected="false">قصص واقعية (9)</button>
          <button class="filter-btn" data-filter="pharma-30-sec-training" role="tab" aria-selected="false">تدريب 30 ثانية (5)</button>
          <button class="filter-btn" data-filter="real-warning-letters" role="tab" aria-selected="false">خطابات تحذير (2)</button>
          <button class="filter-btn" data-filter="other" role="tab" aria-selected="false">سلاسل أخرى (2)</button>`;

const enUrl = 'https://pharpro.co/insights/real-world-stories/';
const arUrl = `${enUrl}ar/`;
const today = '2026-09-25';

const out = `<!DOCTYPE html>
  <html lang="ar" dir="rtl" prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>قصص واقعية من الصناعة الدوائية | PHARPRO</title>
    <meta name="description" content="قصص وحالات دوائية حقيقية مكتوبة: إخفاقات GMP، سلامة البيانات، قرارات التحقق، الدروس المستفادة وخطوات الوقاية العملية." />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href="${arUrl}" />
  <link rel="alternate" hreflang="en" href="${enUrl}" />
  <link rel="alternate" hreflang="ar" href="${arUrl}" />
  <link rel="alternate" hreflang="x-default" href="${enUrl}" />

    <meta name="author" content="محمد العواودة، شركة PHARPRO للاستشارات" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${arUrl}" />
    <meta property="og:title" content="قصص واقعية من الصناعة الدوائية | PHARPRO" />
    <meta property="og:description" content="قصص وحالات دوائية حقيقية مكتوبة: إخفاقات GMP، سلامة البيانات، قرارات التحقق، الدروس المستفادة وخطوات الوقاية العملية." />
    <meta property="og:image" content="https://pharpro.co/images/og-insights.png" />
    <meta property="og:locale" content="ar_JO" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:site_name" content="PHARPRO" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="قصص واقعية من الصناعة الدوائية | PHARPRO" />
    <meta name="twitter:description" content="قصص وحالات دوائية حقيقية مكتوبة: إخفاقات GMP، سلامة البيانات، قرارات التحقق، الدروس المستفادة." />
    <meta name="twitter:image" content="https://pharpro.co/images/og-insights.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
    <meta name="theme-color" content="#233A5E" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "${arUrl}#webpage",
      "url": "${arUrl}",
      "name": "قصص واقعية من الصناعة الدوائية - حلقات مكتوبة | PHARPRO",
      "description": "نسخ مكتوبة لحالات حقيقية من إخفاقات GMP الدوائية، وحالات سلامة البيانات، وتفكيك خطابات التحذير، وحلقات تدريبية من سلسلة PHARPRO على يوتيوب شورتس.",
      "isPartOf": { "@id": "https://pharpro.co/#website" },
      "publisher": { "@id": "https://pharpro.co/#organization" },
      "inLanguage": "ar"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "${arUrl}#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://pharpro.co/" },
        { "@type": "ListItem", "position": 2, "name": "المقالات", "item": "https://pharpro.co/insights/" },
        { "@type": "ListItem", "position": 3, "name": "قصص واقعية", "item": "${arUrl}" }
      ]
    }
  ]
}
</script>
    <style>
      :root{--burgundy:#B12C4B;--burgundy-dk:#8E1E3C;--navy:#233A5E;--ivory:#F5EEE8;--ink:#1E1E1E;--muted:#6B7A8D;--white:#FFFFFF;--border:#E8E0D8;--surface:#FAFAF8;--r-md:16px;--shadow-sm:0 1px 4px rgba(35,58,94,.06),0 4px 12px rgba(35,58,94,.04);--shadow-md:0 2px 8px rgba(35,58,94,.06),0 8px 32px rgba(35,58,94,.09);--container:1040px;--t:0.2s ease}
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:"Cairo",-apple-system,sans-serif;background:var(--ivory);color:var(--ink);line-height:1.75;direction:rtl}
      a{text-decoration:none;color:inherit}ul{list-style:none}
      .wrap{width:min(var(--container),calc(100% - 2.5rem));margin-inline:auto}
      .nav{position:sticky;top:0;z-index:900;background:rgba(245,238,232,.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(35,58,94,.08)}
      .nav-inner{height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px;direction:ltr}
      .logo{display:flex;align-items:center;font-weight:800;color:var(--navy)}
      .nav-links{display:flex;align-items:center;gap:20px;flex-direction:row-reverse}
      .nav-links a{font-size:.87rem;font-weight:500;color:var(--navy);opacity:.65}
      .nav-links a:hover,.nav-links a.active{opacity:1;color:var(--burgundy)}
      .nav-cta-btn{background:var(--burgundy);color:#fff !important;padding:8px 20px;border-radius:999px;font-weight:700;opacity:1 !important}
      .hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;color:var(--navy)}
      .mob-nav{display:none;padding:12px 0 16px;border-top:1px solid rgba(35,58,94,0.08);flex-direction:column;gap:2px;text-align:right}
      .mob-nav.open{display:flex}
      .mob-nav a{display:block;padding:10px 0;font-size:.95rem;font-weight:500;color:var(--navy);opacity:.75}
      @media(max-width:768px){.nav-links{display:none}.hamburger{display:block}}
      .page-hero{padding:56px 0 40px;border-bottom:1px solid var(--border);background:linear-gradient(135deg,#f5ece4 0%,#ede6de 100%)}
      .breadcrumb{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:.8rem;color:var(--muted);margin-bottom:20px}
      .breadcrumb a{color:var(--muted)}.breadcrumb a:hover{color:var(--navy)}
      .breadcrumb .dot{width:3px;height:3px;border-radius:50%;background:var(--muted);opacity:.4}
      .hero-eyebrow{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--burgundy);margin-bottom:12px}
      .page-hero h1{font-size:clamp(1.9rem,4vw,2.6rem);font-weight:800;color:var(--navy);margin-bottom:14px;letter-spacing:-.02em;line-height:1.3}
      .page-hero p{font-size:1rem;color:var(--muted);max-width:640px;line-height:1.85;margin-bottom:20px}
      .yt-channel-link{display:inline-flex;align-items:center;gap:8px;background:#FF0000;color:#fff;padding:10px 22px;border-radius:999px;font-size:.85rem;font-weight:700}
      .ep-count{display:inline-flex;align-items:center;gap:6px;margin-right:16px;background:rgba(35,58,94,.08);color:var(--navy);padding:9px 18px;border-radius:999px;font-size:.85rem;font-weight:600}
      .filter-section{padding:32px 0 0;background:var(--ivory)}
      .filter-tabs{display:flex;gap:8px;flex-wrap:wrap}
      .filter-btn{background:#fff;border:1.5px solid var(--border);color:var(--navy);padding:8px 20px;border-radius:999px;font-size:.83rem;font-weight:600;cursor:pointer;font-family:inherit}
      .filter-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
      .filter-btn.active{background:var(--burgundy);border-color:var(--burgundy);color:#fff}
      .episodes-section{padding:32px 0 80px}
      .ep-count-label{font-size:.82rem;color:var(--muted);margin-bottom:24px}
      .ep-count-label strong{color:var(--navy)}
      .episodes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(480px,1fr));gap:32px}
      @media(max-width:600px){.episodes-grid{grid-template-columns:1fr}}
      .ep-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r-md);padding:32px;box-shadow:var(--shadow-sm)}
      .ep-card[data-series="pharma-real-world-stories"]{border-top:3px solid var(--burgundy)}
      .ep-card[data-series="pharma-30-sec-training"]{border-top:3px solid #2563EB}
      .ep-card[data-series="real-warning-letters"]{border-top:3px solid #D97706}
      .ep-card[data-series="other"]{border-top:3px solid #059669}
      .ep-card.hidden{display:none}
      .ep-card-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px}
      .ep-meta{display:flex;flex-direction:column;gap:4px}
      .ep-series{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
      .ep-badge{display:inline-block;background:rgba(177,44,75,.1);color:var(--burgundy);font-size:.7rem;font-weight:700;padding:2px 10px;border-radius:999px;width:fit-content}
      .ep-yt-btn{display:inline-flex;align-items:center;gap:6px;background:#FF0000;color:#fff;padding:6px 14px;border-radius:999px;font-size:.75rem;font-weight:700;white-space:nowrap;flex-shrink:0}
      .ep-title{font-size:1.12rem;font-weight:800;color:var(--navy);margin-bottom:8px;line-height:1.4}
      .ep-summary{font-size:.88rem;color:var(--muted);line-height:1.75;margin-bottom:12px}
      .ep-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
      .ep-tag{font-size:.68rem;font-weight:600;background:rgba(35,58,94,.07);color:var(--navy);padding:3px 10px;border-radius:999px}
      .ep-story{font-size:.9rem;color:#374151;line-height:1.9;margin-bottom:20px}
      .ep-story p{margin-bottom:12px}.ep-story p:last-child{margin-bottom:0}
      .ep-lesson{background:linear-gradient(135deg,rgba(177,44,75,.06),rgba(177,44,75,.03));border-right:3px solid var(--burgundy);padding:16px 20px;border-radius:8px 0 0 8px;margin-bottom:20px}
      .lesson-label{display:block;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--burgundy);margin-bottom:6px}
      .ep-lesson p{font-size:.85rem;color:var(--ink);line-height:1.75;font-style:italic}
      .ep-watch-full{display:inline-flex;align-items:center;gap:6px;color:#FF0000;font-size:.82rem;font-weight:600}
      .site-footer{background:#17243A;color:rgba(255,255,255,.7);padding:30px 0}
      .foot-in{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;direction:ltr}
      .site-footer a{color:#fff}
    </style>
  </head>
  <body>
  <a class="skip-link" href="#main-content" style="position:absolute;top:-100px;right:0;z-index:9999;padding:8px 16px;background:var(--navy);color:#fff;border-radius:4px;font-size:14px">الانتقال إلى المحتوى الرئيسي</a>
  <nav class="nav" aria-label="التنقل الرئيسي">
    <div class="wrap nav-inner">
      <a href="/" class="logo" aria-label="PHARPRO">PHARPRO</a>
      <nav class="nav-links" aria-label="تنقل الموقع">
        <a href="/services/">الخدمات</a>
        <a href="/insights/">المقالات</a>
        <a href="${enUrl}" style="opacity:.6">EN</a>
        <a href="/contact/" class="nav-cta-btn">تقييم مجاني</a>
      </nav>
    </div>
  </nav>

  <main id="main-content">
    <section class="page-hero">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="مسار التصفح">
          <a href="/">الرئيسية</a>
          <span class="dot" aria-hidden="true"></span>
          <a href="/insights/">المقالات</a>
          <span class="dot" aria-hidden="true"></span>
          <span aria-current="page">قصص واقعية</span>
        </nav>
        <p class="hero-eyebrow">يوتيوب شورتس - بصيغة مكتوبة</p>
        <h1>قصص واقعية من الصناعة الدوائية</h1>
        <p>حالات حقيقية من التصنيع الدوائي - إخفاقات سلامة البيانات، وخطابات تحذير من FDA، ومفاجآت التفتيش، ودروس الامتثال - مرويّة بصيغة مكتوبة مع روابط للمقاطع الأصلية على يوتيوب. من إعداد محمد ح. العواودة، PHARPRO.</p>
        <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:4px">
          <a href="https://www.youtube.com/@MohammadHAlawawdeh/shorts" target="_blank" rel="noopener noreferrer" class="yt-channel-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            شاهد على يوتيوب
          </a>
          <span class="ep-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            18 حلقة بصيغة مكتوبة
          </span>
        </div>
      </div>
    </section>

    <section class="filter-section">
      <div class="wrap">
        <div class="filter-tabs" role="tablist" aria-label="تصفية الحلقات حسب السلسلة">${filterButtons}
        </div>
      </div>
    </section>

    <section class="episodes-section">
      <div class="wrap">
        <p class="ep-count-label"><strong id="visibleCount">18</strong> حلقة معروضة</p>
        <div class="episodes-grid" id="episodesGrid">
${cards}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap foot-in">
      <strong>PHARPRO Consultation Company</strong>
      <span>عمّان، الأردن · <a href="mailto:info@pharpro.co">info@pharpro.co</a></span>
    </div>
  </footer>

  <script>
    (function () {
      var buttons = document.querySelectorAll('.filter-btn');
      var cards = document.querySelectorAll('.ep-card');
      var countEl = document.getElementById('visibleCount');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
          btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
          var filter = btn.getAttribute('data-filter');
          var visible = 0;
          cards.forEach(function (card) {
            var match = filter === 'all' || card.getAttribute('data-series') === filter;
            card.classList.toggle('hidden', !match);
            if (match) visible++;
          });
          if (countEl) countEl.textContent = visible;
        });
      });
    })();
  </script>
  <script src="/js/analytics.js" defer></script>
  <script src="/js/lead-boost.js?v=4" defer></script>
  </body>
  </html>
`;

fs.mkdirSync('insights/real-world-stories/ar', { recursive: true });
fs.writeFileSync('insights/real-world-stories/ar/index.html', out, 'utf8');
console.log('Built insights/real-world-stories/ar/index.html (' + out.length + ' bytes)');
