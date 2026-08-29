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

const homepage = read('index.html');
const dvs = read('services/dvs/index.html');
const dvsScript = read('js/dvs-growth.js');
const enhancementCss = read('css/seo-enhancements.css');
const releaseDoc = read('docs/SCALEFORWARD_RELEASE.md');
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
requireText(homepage, /Evidence before claims/, 'Homepage: approved-evidence policy is missing');
requireText(enhancementCss, /prefers-reduced-motion/, 'CSS: reduced-motion support is missing');

const publicCopy = `${homepage}\n${dvs}`;
rejectText(publicCopy, /only\s+10\s+(?:project\s+)?spots?|people\s+(?:are\s+)?viewing|live[- ]user/i, 'Copy: artificial scarcity or fabricated activity remains');
rejectText(publicCopy, /Save (?:60|132|136|200) working hours|30\s*<span>working days|528 hours/i, 'Copy: unsupported exact savings claim remains');
rejectText(publicCopy, /AI-Powered\s*·\s*FDA|fully aligned with FDA 21 CFR Part 11/i, 'Copy: absolute AI/compliance claim remains');
rejectText(homepage, /Verified Client|Join 15\+ inspection-ready clients/i, 'Homepage: unapproved client evidence remains');

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
requireText(releaseDoc, /codex\/scaleforward-human-trust/, 'Release doc: release branch is missing');
requireText(releaseDoc, /rollback/i, 'Release doc: rollback procedure is missing');
requireText(releaseDoc, /credential/i, 'Release doc: secure credential procedure is missing');
requireText(qaDoc, /Safari/i, 'QA checklist: Safari coverage is missing');
requireText(qaDoc, /Firefox/i, 'QA checklist: Firefox coverage is missing');
requireText(testDoc, /62 indexable URLs checked/i, 'Test results: site validation result is missing');
requireText(testDoc, /unknown URL \| 404/i, 'Test results: HTTP 404 result is missing');

if (errors.length) {
  console.error(`ScaleForward release validation failed with ${errors.length} issue(s):`);
  for (const issue of errors) console.error(`- ${issue}`);
  process.exit(1);
}

console.log('ScaleForward release validation passed: trust copy, forms, analytics, accessibility and deployment artifacts checked.');
