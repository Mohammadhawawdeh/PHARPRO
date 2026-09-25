const fs = require('fs');

const slugs = [
  '21-cfr-part-11-audit-trail-requirements', 'ai-validation-lifecycle-software-pharma',
  'capa-management-pharma-guide', 'cleaning-validation-maco-acceptance-criteria',
  'csv-saas-cloud-pharma', 'data-integrity-pharmaceutical-manufacturing',
  'eu-gmp-annex-11-compliance-checklist', 'fda-21-cfr-part-11-data-integrity',
  'fda-warning-letter-response', 'gamp5-risk-categories-explained',
  'gmp-gap-assessment-guide', 'gmp-training-records-compliance',
  'how-to-write-urs-computerised-system', 'iq-oq-pq-guide',
  'pharmaceutical-inspection-readiness', 'risk-assessment-computerised-systems',
  'supplier-qualification-gmp', 'thermal-mapping-pharmaceutical-warehouses',
  'validation-master-plan-guide',
];

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

for (const slug of slugs) {
  const enLoc = `https://pharpro.co/insights/${slug}/`;
  const marker = `    <loc>${enLoc}</loc>`;
  const idx = sitemap.indexOf(marker);
  if (idx === -1) { console.log(slug, 'NOT FOUND IN SITEMAP'); continue; }
  const urlBlockEnd = sitemap.indexOf('</url>', idx) + '</url>'.length;
  const arLoc = enLoc + 'ar/';
  const arBlock = `\n  <url>\n    <loc>${arLoc}</loc>\n    <lastmod>2026-09-25</lastmod>\n    <priority>0.75</priority>\n  </url>`;
  sitemap = sitemap.slice(0, urlBlockEnd) + arBlock + sitemap.slice(urlBlockEnd);

  const beforeUrl = sitemap.slice(0, idx);
  const afterMarker = sitemap.slice(idx);
  const lastmodMatch = afterMarker.match(/^ {4}<loc>[^<]*<\/loc>\n {4}<lastmod>[^<]*<\/lastmod>/);
  if (lastmodMatch) {
    const replaced = lastmodMatch[0].replace(/<lastmod>[^<]*<\/lastmod>/, '<lastmod>2026-09-25</lastmod>');
    sitemap = beforeUrl + replaced + afterMarker.slice(lastmodMatch[0].length);
  }
}

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log('done');
