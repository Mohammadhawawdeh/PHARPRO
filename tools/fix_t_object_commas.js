// Repairs a real production bug: several insight articles' inline `const T = {...}`
// i18n object literals are missing commas between properties, which throws a
// SyntaxError in the browser and silently breaks that page's language toggle,
// hamburger menu, and sticky CTA scripts (anything after the broken statement).
const fs = require('fs');

const slugs = process.argv.slice(2);
if (slugs.length === 0) {
  console.error('Usage: node tools/fix_t_object_commas.js <slug> [<slug> ...]');
  process.exit(1);
}

for (const slug of slugs) {
  const p = `insights/${slug}/index.html`;
  let html = fs.readFileSync(p, 'utf8');
  const tMatch = html.match(/const T = \{[\s\S]*?\n\};/);
  if (!tMatch) { console.log(`${slug}: NO T BLOCK`); continue; }
  const block = tMatch[0];
  const fixed = block.replace(/("(?:[^"\\]|\\.)*")(\r?\n\s*)(")/g, (m, val, ws, nextQuote) => val + ',' + ws + nextQuote);
  if (fixed === block) { console.log(`${slug}: no change made`); continue; }
  html = html.replace(block, fixed);
  fs.writeFileSync(p, html, 'utf8');
  try {
    new Function('return ' + fixed.replace(/;$/, ''))();
    console.log(`${slug}: fixed, now valid JS`);
  } catch (e) {
    console.log(`${slug}: still broken after fix:`, e.message);
  }
}
