// Notifies Bing/Yandex/Naver/Seznam.cz/Yep/Amazon of the current sitemap after a production deploy.
// Google does not support IndexNow and is unaffected by this script either way.
const fs = require('fs');
const path = require('path');

const HOST = 'pharpro.co';
const KEY = 'a6e542e4d29c797cd9d706432a08f17b7e32bcea061a1e63';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '..', 'sitemap.xml');

function extractUrls(sitemapXml) {
  const matches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return matches.map((tag) => tag.replace(/<\/?loc>/g, ''));
}

async function main() {
  const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urlList = extractUrls(sitemap);
  if (urlList.length === 0) {
    console.error('IndexNow: no URLs found in sitemap.xml, skipping submission.');
    process.exitCode = 1;
    return;
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urlList.length} URLs (status ${res.status}).`);
  } else {
    console.error(`IndexNow: submission failed (status ${res.status}).`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('IndexNow: submission errored:', err.message);
  // Non-fatal: never block a deploy on IndexNow's own availability.
  process.exitCode = 0;
});
