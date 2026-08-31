const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];

function read(relativePath) {
  const target = path.join(root, relativePath);
  if (!fs.existsSync(target)) {
    errors.push(`${relativePath}: missing release artifact`);
    return '';
  }
  return fs.readFileSync(target, 'utf8');
}

function requireText(source, pattern, message) {
  if (!pattern.test(source)) errors.push(message);
}

function rejectText(source, pattern, message) {
  if (pattern.test(source)) errors.push(message);
}

function collectHtml(directory) {
  const chunks = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) chunks.push(...collectHtml(target));
    else if (entry.name.endsWith('.html')) chunks.push(fs.readFileSync(target, 'utf8'));
  }
  return chunks;
}

function collectHtmlFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectHtmlFiles(target));
    else if (entry.name.endsWith('.html')) files.push(target);
  }
  return files;
}

const homepage = read('index.html');
const dvs = read('services/dvs/index.html');
const projects = read('projects/index.html');
const dvsScript = read('js/dvs-growth.js');
const enhancementCss = read('css/seo-enhancements.css');
const releaseDoc = read('docs/VERIFIED_EVIDENCE_RELEASE.md');
const qaDoc = read('docs/QA_CHECKLIST.md');
const testDoc = read('docs/TEST_RESULTS.md');
const stagingConfig = read('wrangler.staging.jsonc');

requireText(dvs, /id="dvs-fit-form"/, 'DVS: missing low-friction fit-check form');
requireText(dvs, /free 10-minute fit check/i, 'DVS: missing 10-minute fit-check proposition');
requireText(dvs, /ceo_photo\.webp[^>]+width="240"[^>]+height="240"/i, 'DVS: founder image lacks stable dimensions');
requireText(dvs, /mailto:info@pharpro\.co/, 'DVS: missing direct email path');
requireText(dvs, /linkedin\.com\/in\/mohammadhawawdeh/, 'DVS: missing founder LinkedIn path');
requireText(dvs, /name="access_key"/, 'DVS: Web3Forms access key is not integrated');
requireText(dvs, /href="\/privacy\/"/, 'DVS: form privacy notice is missing');
requireText(dvsScript, /dvs_fit_check/, 'DVS JS: fit-check analytics event is missing');
requireText(dvsScript, /await submitWeb3Form\(data\)[\s\S]+trackLead/, 'DVS JS: lead event must occur after a successful response');
requireText(dvsScript, /event\.origin !== 'https:\/\/calendly\.com'/, 'DVS JS: Calendly message origin is not restricted');
requireText(homepage, /founder-intro-section/, 'Homepage: founder-led section is missing');
requireText(homepage, /Verified delivery record/, 'Homepage: verified-delivery section is missing');
requireText(homepage, /href="\/projects\/"/, 'Homepage: project record is not linked');
requireText(projects, /<strong>12<\/strong><span>completed engagements/i, 'Projects: verified completed-engagement count is missing');
requireText(projects, /<strong>2<\/strong><span>active projects/i, 'Projects: verified active-project count is missing');
requireText(projects, /Founder experience before PHARPRO/i, 'Projects: employment experience is not separated from PHARPRO delivery');
requireText(enhancementCss, /prefers-reduced-motion/, 'CSS: reduced-motion support is missing');

const publicCopy = `${homepage}\n${dvs}\n${projects}`;
const allPublicCopy = collectHtml(root).join('\n');
rejectText(publicCopy, /only\s+10\s+(?:project\s+)?spots?|people\s+(?:are\s+)?viewing|live[- ]user/i, 'Copy: artificial scarcity or fabricated activity remains');
rejectText(publicCopy, /Save (?:60|132|136|200) working hours|30\s*<span>working days|528 hours/i, 'Copy: unsupported exact savings claim remains');
rejectText(publicCopy, /10\+ years|22\+ projects|15\+ active clients|12\+ clients served/i, 'Copy: unsupported business figure remains');
rejectText(publicCopy, /AI-Powered\s*·\s*FDA|fully aligned with FDA 21 CFR Part 11/i, 'Copy: absolute AI/compliance claim remains');
rejectText(homepage, /Verified Client|Join 15\+ inspection-ready clients/i, 'Homepage: unapproved client evidence remains');
rejectText(allPublicCopy, /5 out of 5 stars|What our clients say|Previous participant/i, 'Site: unapproved testimonial or rating copy remains');
rejectText(allPublicCopy, /10\+ years|22\+ projects|15\+ active clients|12\+ clients served|200\+ projects/i, 'Site: unsupported business figure remains');
rejectText(allPublicCopy, /Trusted by pharma teams in 7\+ countries|teams? (?:in|from) (?:MENA|the MENA region).{0,60}(?:use|using) DVS/i, 'Site: unsupported DVS adoption claim remains');
rejectText(allPublicCopy, /Cut validation time by 60%|60[–-]75%|three weeks to four days|3 أسابيع.{0,20}4 أيام/i, 'Site: unsupported DVS time-saving claim remains');
rejectText(allPublicCopy, /limited (?:demo )?slots? this week|مواعيد العروض التجريبية محدودة هذا الأسبوع/i, 'Site: artificial demo scarcity remains');
rejectText(allPublicCopy, /limited slots?|spots? remaining|people (?:are )?viewing|live[- ]users?/i, 'Site: unsupported scarcity or activity copy remains');

for (const htmlPath of collectHtmlFiles(root)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (/name="access_key"/.test(html) && !/href="\/privacy\/"/.test(html)) {
    errors.push(`${path.relative(root, htmlPath)}: Web3Forms page is missing a privacy notice`);
  }
}

for (const [relativePath, html] of [['index.html', homepage], ['services/dvs/index.html', dvs]]) {
  for (const block of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(block[1]); }
    catch (error) { errors.push(`${relativePath}: invalid JSON-LD (${error.message})`); }
  }
}

try {
  const config = JSON.parse(stagingConfig);
  if (config.name !== 'pharpro-staging') errors.push('wrangler.staging.jsonc: staging worker name is not isolated');
  if (!config.assets || config.assets.directory !== '.') errors.push('wrangler.staging.jsonc: static asset directory is missing');
} catch (error) {
  errors.push(`wrangler.staging.jsonc: invalid JSON (${error.message})`);
}

requireText(releaseDoc, /https:\/\/github\.com\/Mohammadhawawdeh\/PHARPRO\.git/, 'Release doc: repository link is missing');
requireText(releaseDoc, /codex\/verified-evidence-human-trust/, 'Release doc: release branch is missing');
requireText(releaseDoc, /rollback/i, 'Release doc: rollback procedure is missing');
requireText(releaseDoc, /credential/i, 'Release doc: secure credential procedure is missing');
requireText(qaDoc, /Safari/i, 'QA checklist: Safari coverage is missing');
requireText(qaDoc, /Firefox/i, 'QA checklist: Firefox coverage is missing');
requireText(testDoc, /\d+ indexable URLs checked/i, 'Test results: site validation result is missing');
requireText(testDoc, /unknown URL \| 404/i, 'Test results: HTTP 404 result is missing');

if (errors.length) {
  console.error(`Verified Evidence release validation failed with ${errors.length} issue(s):`);
  for (const issue of errors) console.error(`- ${issue}`);
  process.exit(1);
}

console.log('Verified Evidence release validation passed: trust copy, forms, analytics, accessibility and deployment artifacts checked.');
