const fs = require('fs');
const html = fs.readFileSync('insights/real-world-stories/index.html', 'utf8');
const cards = [...html.matchAll(/<article class="ep-card" data-series="([^"]*)">([\s\S]*?)<\/article>/g)];
const episodes = cards.map(([, series, body]) => {
  const badge = (body.match(/<span class="ep-badge">([^<]*)<\/span>/) || [])[1] || '';
  const ytHref = (body.match(/href="(https:\/\/youtube\.com\/shorts\/[^"]*)"/) || [])[1] || '';
  const title = (body.match(/<h2 class="ep-title">([^<]*)<\/h2>/) || [])[1] || '';
  const summary = (body.match(/<p class="ep-summary">([\s\S]*?)<\/p>/) || [])[1] || '';
  const tags = [...body.matchAll(/<span class="ep-tag">([^<]*)<\/span>/g)].map(m => m[1]);
  const storyBlock = (body.match(/<div class="ep-story">([\s\S]*?)<\/div>\s*<div class="ep-lesson">/) || [])[1] || '';
  const storyParas = [...storyBlock.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => m[1].trim());
  const lesson = (body.match(/<div class="ep-lesson">[\s\S]*?<p>([\s\S]*?)<\/p>/) || [])[1] || '';
  return { series, badge, ytHref, title, summary, tags, storyParas, lesson };
});
console.log(JSON.stringify(episodes, null, 2));
console.log('TOTAL EPISODES:', episodes.length);
