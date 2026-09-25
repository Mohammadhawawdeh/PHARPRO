const fs = require('fs');

const slugs = process.argv.slice(2);
if (slugs.length === 0) { console.error('Usage: node tools/add_ar_sitemap_entries2.js <slug> [<slug> ...]'); process.exit(1); }

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

for (const slug of slugs) {
  const enLoc = `https://pharpro.co/insights/${slug}/`;
  if (sitemap.includes(`<loc>${enLoc}ar/</loc>`)) { console.log(slug, 'ar already in sitemap'); continue; }

  // Multi-line pretty-printed format: "    <loc>...</loc>" on its own line.
  const multilineMarker = `    <loc>${enLoc}</loc>`;
  let idx = sitemap.indexOf(multilineMarker);
  if (idx !== -1) {
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
    console.log(slug, 'added (multiline format)');
    continue;
  }

  // Single-line format: "  <url><loc>...</loc><lastmod>...</lastmod>...</url>"
  const singleLineRegex = new RegExp(`  <url><loc>${enLoc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>[^\\n]*</url>`);
  const m = sitemap.match(singleLineRegex);
  if (!m) { console.log(slug, 'NOT FOUND IN SITEMAP'); continue; }
  const arLoc = enLoc + 'ar/';
  const arLine = `  <url><loc>${arLoc}</loc><lastmod>2026-09-25</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>`;
  const updatedEnLine = m[0].replace(/<lastmod>[^<]*<\/lastmod>/, '<lastmod>2026-09-25</lastmod>');
  sitemap = sitemap.replace(m[0], updatedEnLine + '\n' + arLine);
  console.log(slug, 'added (single-line format)');
}

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
