// Builds a standalone /ar/ page for an insight article that has NO existing
// Arabic content to extract (unlike generate_ar_insight.js). Content here is
// genuine new translation, supplied by the caller as already-translated
// Arabic strings/HTML fragments. This module only assembles the page shell
// (nav, footer, CSS, schema) - it does not translate anything itself.
const fs = require('fs');
const path = require('path');

/**
 * @param {object} d
 * @param {string} d.slug
 * @param {string} d.titleAr - short title for <title>/og:title (<=55 chars incl " | PHARPRO")
 * @param {string} d.descAr - meta description, 100-165 chars
 * @param {string} d.h1Ar - full H1 (can be longer than titleAr)
 * @param {string} d.catAr - eyebrow category label
 * @param {string} d.dateISO - YYYY-MM-DD original datePublished
 * @param {string} d.dateLabelAr - human date label e.g. "1 سبتمبر 2026"
 * @param {string} d.readTimeAr - e.g. "5 دقائق قراءة"
 * @param {string} d.bodyHtml - full Arabic article body HTML (h2/p/ul/etc), RTL-safe
 * @param {{q:string,a:string}[]} [d.faq]
 * @param {string} [d.ctaHeadingAr]
 * @param {string} [d.ctaBodyAr]
 * @param {string} [d.ctaHref]
 * @param {string} [d.ctaLabelAr]
 * @param {{href:string,label:string}[]} [d.related] - related links (hrefs unchanged, labels in Arabic)
 */
function buildPage(d) {
  const enUrl = `https://pharpro.co/insights/${d.slug}/`;
  const arUrl = `${enUrl}ar/`;
  const today = '2026-09-25';
  const ctaHeadingAr = d.ctaHeadingAr || 'هل أنت مستعد للبدء؟';
  const ctaBodyAr = d.ctaBodyAr || 'احصل على تقييم مجاني لبرنامج الامتثال لديك - بدون أي التزام.';
  const ctaHref = d.ctaHref || '/contact/';
  const ctaLabelAr = d.ctaLabelAr || 'اطلب تقييماً مجانياً';

  const faqHtml = (d.faq || []).map(f => `        <div class="faq-item"><h3>${f.q}</h3><p>${f.a}</p></div>`).join('\n');
  const relatedHtml = (d.related || []).map(r => `<li><a href="${r.href}">${r.label}</a></li>`).join('\n        ');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${d.titleAr}</title>
  <meta name="description" content="${d.descAr}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${arUrl}" />
  <link rel="alternate" hreflang="en" href="${enUrl}" />
  <link rel="alternate" hreflang="ar" href="${arUrl}" />
  <link rel="alternate" hreflang="x-default" href="${enUrl}" />
  <meta name="author" content="محمد العواودة، شركة PHARPRO للاستشارات" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${arUrl}" />
  <meta property="og:title" content="${d.titleAr}" />
  <meta property="og:description" content="${d.descAr}" />
  <meta property="og:image" content="https://pharpro.co/images/og-csv.png" />
  <meta property="og:locale" content="ar_JO" />
  <meta property="og:locale:alternate" content="en_US" />
  <meta property="og:site_name" content="PHARPRO" />
  <meta property="article:published_time" content="${d.dateISO}T09:00:00+03:00" />
  <meta property="article:modified_time" content="${today}T09:00:00+03:00" />
  <meta property="article:author" content="محمد العواودة" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${d.titleAr}" />
  <meta name="twitter:description" content="${d.descAr}" />
  <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
  <meta name="theme-color" content="#233A5E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "${arUrl}#article",
      "headline": "${d.h1Ar.replace(/"/g, '\\"')}",
      "description": "${d.descAr.replace(/"/g, '\\"')}",
      "datePublished": "${d.dateISO}",
      "dateModified": "${today}",
      "author": { "@type": "Person", "@id": "https://pharpro.co/about/mohammad-awawdeh/#person", "name": "محمد العواودة", "url": "https://pharpro.co/about/mohammad-awawdeh/", "worksFor": { "@id": "https://pharpro.co/#organization" } },
      "publisher": { "@id": "https://pharpro.co/#organization" },
      "image": { "@type": "ImageObject", "url": "https://pharpro.co/images/og-csv.png", "width": 1200, "height": 630 },
      "mainEntityOfPage": { "@id": "${arUrl}#webpage" },
      "inLanguage": "ar",
      "url": "${arUrl}"
    },
    {
      "@type": "WebPage",
      "@id": "${arUrl}#webpage",
      "url": "${arUrl}",
      "name": "${d.titleAr.replace(/"/g, '\\"')}",
      "isPartOf": { "@id": "https://pharpro.co/#website" },
      "inLanguage": "ar",
      "datePublished": "${d.dateISO}",
      "dateModified": "${today}"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://pharpro.co/" },
        { "@type": "ListItem", "position": 2, "name": "المقالات", "item": "https://pharpro.co/insights/" },
        { "@type": "ListItem", "position": 3, "name": "${d.h1Ar.replace(/"/g, '\\"')}", "item": "${arUrl}" }
      ]
    }${d.faq && d.faq.length ? `,
    {
      "@type": "FAQPage",
      "@id": "${arUrl}#faqpage",
      "mainEntity": [
${d.faq.map(f => `        { "@type": "Question", "name": "${f.q.replace(/"/g, '\\"')}", "acceptedAnswer": { "@type": "Answer", "text": "${f.a.replace(/"/g, '\\"')}" } }`).join(',\n')}
      ]
    }` : ''}
  ]
}
</script>
  <style>
    :root{--navy:#233A5E;--red:#B12C4B;--red-dk:#8E1E3C;--ivory:#F7F2ED;--ink:#1C2330;--muted:#657187;--line:#E3E8EF;--white:#fff}
    *{box-sizing:border-box}body{margin:0;font-family:"Cairo",system-ui,sans-serif;color:var(--ink);line-height:1.85;background:#fff;direction:rtl}
    a{color:inherit}
    .wrap{max-width:820px;margin:auto;padding-inline:24px}
    .site-nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);border-bottom:1px solid var(--line)}
    .nav-in{max-width:1120px;margin:auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;direction:ltr}
    .brand{font-weight:800;color:var(--red);text-decoration:none;font-size:1.25rem}
    .site-nav-links{display:flex;gap:22px;align-items:center;flex-direction:row-reverse}
    .site-nav-links a{color:var(--navy);font-size:.9rem;font-weight:600;text-decoration:none}
    .site-nav-links .cta{background:var(--red);color:#fff;padding:9px 16px;border-radius:999px}
    .article-hero{background:linear-gradient(145deg,#F7F2ED,#EEF3F8);padding:64px 24px 52px}
    .crumbs{font-size:.82rem;margin-bottom:22px;color:var(--muted)}.crumbs a{color:var(--red);text-decoration:none}
    .eyebrow{font-size:.75rem;color:var(--red);font-weight:800;text-transform:uppercase;letter-spacing:.05em}
    h1{font-size:clamp(1.9rem,4.5vw,3rem);line-height:1.3;color:var(--navy);letter-spacing:-.02em;margin:.4em 0}
    .dek{font-size:1.06rem;color:var(--muted);max-width:720px}
    .meta{font-size:.82rem;color:var(--muted);margin-top:18px}
    .article{padding:48px 24px}
    .article h2{font-size:1.45rem;line-height:1.4;color:var(--navy);margin:1.8em 0 .5em}
    .article p{margin:0 0 1.15em;color:#333}
    .article ul{list-style:disc;margin:0 0 1.15em;padding-right:22px;color:#333}
    .article ol{list-style:decimal;margin:0 0 1.15em;padding-right:22px;color:#333}
    .article li{margin-bottom:.5em}
    .article strong{color:var(--navy)}
    .callout{background:rgba(35,58,94,.05);border-right:3px solid var(--navy);border-radius:12px 0 0 12px;padding:16px 20px;margin:22px 0;font-size:.94rem}
    .faq{margin-top:44px}
    .faq-item{border-top:1px solid var(--line);padding:16px 0}
    .faq-item h3{font-weight:700;color:var(--navy);font-size:1rem;margin:0 0 6px}
    .faq-item p{color:var(--muted);margin:0;font-size:.92rem}
    .article-cta{margin:44px 0;background:var(--navy);color:#fff;border-radius:18px;padding:30px}
    .article-cta h2{color:#fff;margin:0 0 8px}
    .article-cta a{display:inline-block;margin-top:8px;background:var(--red);color:#fff;padding:11px 22px;border-radius:999px;text-decoration:none;font-weight:700}
    .seo-cluster{background:var(--ivory);padding:44px 24px}
    .seo-cluster-inner{max-width:820px;margin:auto}
    .seo-kicker{font-size:.72rem;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:.05em}
    .seo-cluster h2{font-size:1.3rem;color:var(--navy);margin:.3em 0}
    .seo-cluster ul{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:10px}
    .seo-cluster li a{display:block;background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px 16px;text-decoration:none;color:var(--navy);font-weight:600;font-size:.9rem}
    .site-footer{background:#17243A;color:rgba(255,255,255,.7);padding:30px 24px}
    .foot-in{max-width:1120px;margin:auto;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;direction:ltr}
    .site-footer a{color:#fff}
    @media(max-width:720px){.site-nav-links a:not(.cta){display:none}}
  </style>
</head>
<body>
<nav class="site-nav" aria-label="التنقل الرئيسي"><div class="nav-in"><a class="brand" href="/">PHARPRO</a><div class="site-nav-links"><a href="/services/">الخدمات</a><a href="/insights/">المقالات</a><a href="${enUrl}" style="opacity:.6">EN</a><a class="cta" href="/contact/">تقييم مجاني</a></div></div></nav>
<main id="main-content">
<header class="article-hero"><div class="wrap"><nav class="crumbs" aria-label="مسار التصفح"><a href="/">الرئيسية</a> / <a href="/insights/">المقالات</a> / ${d.catAr}</nav><p class="eyebrow">${d.catAr}</p><h1>${d.h1Ar}</h1><p class="dek">${d.descAr}</p><p class="meta">بقلم محمد العواودة · نُشر وروجع في ${d.dateLabelAr}${d.readTimeAr ? ' · ' + d.readTimeAr : ''}</p></div></header>
<article class="article"><div class="wrap">
${d.bodyHtml}
${d.faq && d.faq.length ? `<section class="faq"><h2>الأسئلة الشائعة</h2>\n${faqHtml}\n</section>` : ''}
<aside style="display:flex;gap:16px;align-items:flex-start;background:var(--ivory);border:1px solid var(--line);border-radius:16px;padding:24px;margin-top:36px"><div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--red));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0">MH</div><div><p class="seo-kicker">بقلم</p><h2 style="margin:.2em 0;font-size:1.05rem"><a href="https://www.linkedin.com/in/mohammadhawawdeh/" target="_blank" rel="noopener noreferrer">محمد العواودة</a></h2><p style="color:var(--muted);font-size:.9rem;margin:0">مؤسس PHARPRO، مستشار امتثال دوائي بخبرة تزيد على سبع سنوات في CSV وضمان الجودة وCQV والتدريب على GMP في الأردن والإمارات والسعودية ومصر.</p></div></aside>
<section class="article-cta"><h2>${ctaHeadingAr}</h2><p>${ctaBodyAr}</p><a href="${ctaHref}">${ctaLabelAr} ←</a></section>
</div></article>
${d.related && d.related.length ? `<section class="seo-cluster"><div class="seo-cluster-inner"><p class="seo-kicker">مواضيع ذات صلة</p><h2>تابع القراءة</h2><ul>
        ${relatedHtml}
</ul></div></section>` : ''}
</main>
<footer class="site-footer"><div class="foot-in"><strong>PHARPRO Consultation Company</strong><span>عمّان، الأردن · <a href="mailto:info@pharpro.co">info@pharpro.co</a></span></div></footer>
<script src="/js/analytics.js" defer></script><script src="/js/lead-boost.js?v=4" defer></script>
</body></html>
`;
}

module.exports = { buildPage };

if (require.main === module) {
  const dataPath = process.argv[2];
  if (!dataPath) { console.error('Usage: node tools/build_new_ar_insight.js <data.json>'); process.exit(1); }
  const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const outDir = path.join(__dirname, '..', 'insights', d.slug, 'ar');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), buildPage(d), 'utf8');
  console.log(`Built insights/${d.slug}/ar/index.html`);
}
