const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ignoreDirs = new Set(['node_modules', '.git']);
const errors = [];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (ignoreDirs.has(name)) continue;
    const target = path.join(dir, name);
    const stat = fs.statSync(target);
    if (stat.isDirectory()) walk(target, out);
    else if (name.endsWith('.html')) out.push(target);
  }
  return out;
}

function match(html, regex) {
  const found = html.match(regex);
  return found ? found[1].replace(/\s+/g, ' ').trim() : '';
}

function metaContent(html, name) {
  for (const found of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = found[0];
    const nameMatch = tag.match(/\bname\s*=\s*(["'])(.*?)\1/i);
    if (!nameMatch || nameMatch[2].toLowerCase() !== name.toLowerCase()) continue;
    const contentMatch = tag.match(/\bcontent\s*=\s*(["'])([\s\S]*?)\1/i);
    return contentMatch ? contentMatch[2].replace(/\s+/g, ' ').trim() : '';
  }
  return '';
}

function localUrl(file) {
  if (path.basename(file) !== 'index.html') return null;
  const dir = path.relative(root, path.dirname(file)).replaceAll(path.sep, '/');
  return dir ? `/${dir}/` : '/';
}

function localTargetExists(urlPath) {
  if (!urlPath || !urlPath.startsWith('/')) return true;
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]).replace(/^\/+/, '');
  const direct = path.join(root, clean);
  return fs.existsSync(direct) || fs.existsSync(path.join(direct, 'index.html')) || fs.existsSync(`${direct}.html`);
}

const redirectSources = new Set([
  '/services/digital/',
  '/insights/capa-management-pharmaceutical/',
  '/insights/inspection-readiness-guide/',
  '/insights/gmp-training-july-2026/',
  '/insights/csv-training-august-2026/',
  '/insights/csv-training-pharma-june-2026/',
  '/register/gmp-training-july-2026/'
]);

const indexableUrls = new Set();
const pageLinks = new Map();
for (const file of walk(root)) {
  const rel = path.relative(root, file).replaceAll(path.sep, '/');
  const html = fs.readFileSync(file, 'utf8');
  const title = match(html, /<title>([\s\S]*?)<\/title>/i);
  const description = metaContent(html, 'description');
  const robots = metaContent(html, 'robots');
  const canonical = match(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)/i);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const url = localUrl(file);
  const indexable = !robots.includes('noindex') && !rel.startsWith('google') && rel !== '404.html';

  if (!title && !rel.startsWith('google')) errors.push(`${rel}: missing title`);
  if (indexable && (title.length < 20 || title.length > 65)) errors.push(`${rel}: title length ${title.length}`);
  if (indexable && (description.length < 100 || description.length > 165)) errors.push(`${rel}: description length ${description.length}`);
  if (indexable && h1Count !== 1) errors.push(`${rel}: expected one H1, found ${h1Count}`);
  if (indexable && !canonical) errors.push(`${rel}: missing canonical`);
  if (indexable && url && canonical === `https://pharpro.co${url}`) indexableUrls.add(url);
  if (/aggregateRating|"review"\s*:/.test(html)) errors.push(`${rel}: unsupported review/rating schema`);

  for (const block of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(block[1]);
      const nodes = data && Array.isArray(data['@graph']) ? data['@graph'] : [data];
      for (const node of nodes) {
        const reviewed = node && node.itemReviewed;
        if (node && node['@type'] === 'Review' && reviewed && String(reviewed['@id'] || '').endsWith('#service')) {
          errors.push(`${rel}: unsupported Review schema for Service`);
        }
        if (node && node['@type'] === 'EducationEvent' && (!node.startDate || !node.location)) {
          errors.push(`${rel}: EducationEvent missing required date or location`);
        }
      }
    }
    catch (error) { errors.push(`${rel}: invalid JSON-LD (${error.message})`); }
  }

  const discovered = new Set();
  for (const link of html.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)) {
    const href = link[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|#)/i.test(href)) continue;
    const pathname = href.split(/[?#]/)[0];
    if (!localTargetExists(pathname) && !redirectSources.has(pathname.endsWith('/') ? pathname : `${pathname}/`)) {
      errors.push(`${rel}: broken internal link ${href}`);
    }
    if (indexable && url) {
      const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
      discovered.add(normalized);
    }
  }
  if (indexable && url) pageLinks.set(url, discovered);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>https:\/\/pharpro\.co([^<]*)<\/loc>/g)].map((m) => m[1] || '/'));
for (const url of indexableUrls) if (!sitemapUrls.has(url)) errors.push(`sitemap: missing ${url}`);
for (const url of sitemapUrls) if (!indexableUrls.has(url)) errors.push(`sitemap: non-indexable or missing ${url}`);
for (const source of redirectSources) if (sitemapUrls.has(source)) errors.push(`sitemap: redirect source included ${source}`);

const incoming = new Map([...indexableUrls].map((url) => [url, 0]));
for (const [source, targets] of pageLinks) {
  if (!indexableUrls.has(source)) continue;
  for (const target of targets) if (incoming.has(target)) incoming.set(target, incoming.get(target) + 1);
}
for (const [url, count] of incoming) {
  if (url !== '/' && count === 0) errors.push(`${url}: orphan indexable page`);
}

const server = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
if (!server.includes('res.status(404).sendFile')) errors.push('server.js: missing real 404 response');

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} issue(s):`);
  for (const issue of errors) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Site validation passed: ${indexableUrls.size} indexable URLs checked.`);
