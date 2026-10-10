import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { runInNewContext } from 'node:vm';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'style.css'), 'utf8');
const worker = readFileSync(resolve(root, 'sw.js'), 'utf8');
const behavior = readFileSync(resolve(root, 'behavior.js'), 'utf8');

test('skills prioritize Python, Java, and C++ and group web and cloud work separately', () => {
  const skills = html.slice(html.indexOf('id="skills"'), html.indexOf('id="about"'));
  const primary = skills.match(/<ul class="skill-chips skill-primary-languages"[^>]*>(.*?)<\/ul>/)[1];
  assert.deepEqual([...primary.matchAll(/<li[^>]*>([^<]+)<\/li>/g)].map(m => m[1]), ['Python', 'Java', 'C++']);
  assert.match(skills, /C# \(working knowledge\)/);
  assert.match(skills, /<h3>Web<\/h3>[\s\S]*?React[\s\S]*?JavaScript[\s\S]*?TypeScript/);
  assert.match(skills, /Cloud &amp; infrastructure[\s\S]*?Terraform/);
  assert.match(skills, /Backend &amp; APIs[\s\S]*?API integration/);
});

test('the downloadable PDF matches Diego’s supplied October 7 résumé exactly', () => {
  const digest = createHash('sha256').update(readFileSync(resolve(root, 'Diego_Resume.pdf'))).digest('hex');
  assert.equal(digest, 'b3123bb12baabd8f410f2880d860fa625b62c15afb4f51cfeeb128ce42e1d988');
});

test('the six main sections follow the approved reading order', () => {
  const sections = [...html.matchAll(/<section\s[^>]*>/g)]
    .map(match => match[0]).filter(tag => /class="[^"]*portfolio-page/.test(tag))
    .map(tag => tag.match(/id="([^"]+)"/)[1]);
  assert.deepEqual(sections, ['home', 'experience', 'projects', 'skills', 'about', 'contact']);
  assert.ok(html.indexOf('</main>') < html.indexOf('<footer'));
});

test('the original cream coffee homepage remains personal, without a featured project', () => {
  const home = html.slice(html.indexOf('id="home"'), html.indexOf('id="experience"'));
  assert.match(home, /Diego/);
  assert.match(home, /Crisafulli/);
  assert.match(home, /class="cup/);
  assert.doesNotMatch(home, /SceneBreaker|hero-aside|<em>/);
  assert.match(css, /--bg: #faf8f5/);
  assert.match(css, /font-family: 'Uncut Sans'/);
  assert.match(css, /\.hero-name-last \{ color: var\(--ink\); font-style: normal; \}/);
  assert.ok(existsSync(resolve(root, 'assets/fonts/uncut/UncutSans-Variable.woff2')));
});

test('the coffee illustration remains visible at tablet and phone widths', () => {
  const artRules = [...css.matchAll(/[^{}]*\.hero-art[^{}]*\{([^{}]*)\}/g)].map(match => match[1]);
  assert.ok(artRules.length > 0);
  for (const declarations of artRules) {
    assert.doesNotMatch(declarations, /display\s*:\s*none|visibility\s*:\s*hidden/);
  }
  assert.match(css, /\.hero-grid > \.hero-art \{ display: flex; grid-column: 1 \/ -1; justify-content: center; \}/);
  assert.match(css, /\.hero-art \.cup \{ max-width: 180px; max-height: 230px; \}/);
});

test('each employer has the requested technology set and native disclosure', () => {
  const companies = {
    mckesson: ['Python', '.NET', 'Cloud', 'Claude', 'AI'],
    cae: ['PowerShell', 'C++', 'GitHub', 'Jira', 'GitHub Copilot'],
    presagis: ['Omniverse', 'Blender', 'Machine learning', 'Unreal Engine'],
  };
  for (const [company, technologies] of Object.entries(companies)) {
    const content = html.match(new RegExp(`<article[^>]+id="experience-${company}"[\\s\\S]*?<\\/article>`))[0];
    const labels = [...content.matchAll(/<span>([^<]+)<\/span>/g)].map(match => match[1]);
    assert.deepEqual(labels, technologies);
    assert.match(content, /<details class="experience-details">/);
    assert.match(content, /<summary>View experience/);
    assert.equal((content.match(/<img /g) || []).length, technologies.length);
  }
});

test('every project has real imagery, an original identity, or a labeled system sketch', () => {
  const projects = html.slice(html.indexOf('id="projects"'), html.indexOf('id="skills"'));
  const articles = [...projects.matchAll(/<article[\s\S]*?<\/article>/g)].map(match => match[0]);
  assert.equal(articles.length, 8);
  for (const article of articles) assert.match(article, /<img\s|System sketch/);
  assert.match(projects, /Original project identity/);
  assert.match(projects, /Original mascot/);
});

test('legacy deep links reveal their containing disclosures without custom click traps', () => {
  for (const id of ['work', 'work-drift', 'work-tooling', 'work-roger', 'off-screen']) {
    assert.ok(html.includes(`id="${id}"`));
  }
  assert.match(behavior, /ancestor\.tagName === 'DETAILS'/);
  assert.match(behavior, /addEventListener\('hashchange', revealHashTarget\)/);
  assert.doesNotMatch(behavior, /getElementById\('(?:page-index|next-page|prev-page)'\)/);
});

test('SceneBreaker has a plain-language purpose and verified demo/source links', () => {
  const feature = html.match(/<article[^>]+id="scenebreaker"[\s\S]*?<\/article>/)?.[0];
  assert.ok(feature, 'Featured SceneBreaker article exists');
  assert.match(feature, /robot.*route|route.*robot/i);
  assert.match(feature, /https:\/\/scenebreaker-diego\.groovy-rose-9842\.chatgpt\.site/);
  assert.match(feature, /https:\/\/github\.com\/diegocrisafu\/ai_ui\/tree\/codex\/scenebreaker-route-lab/);
  assert.match(feature, /manual|trace/i);
  assert.match(feature, /approximation|approximate/i);
  assert.match(feature, /not.*safety/i);
});

test('all local image and stylesheet references exist', () => {
  for (const [, src] of html.matchAll(/(?:src|href)="([^"#]+\.(?:webp|jpg|png|svg|css)(?:\?[^\"]*)?)"/g)) {
    if (/^https?:/.test(src)) continue;
    assert.ok(existsSync(resolve(root, src.split('?')[0])), src);
  }
});

test('new project preview has dimensions and a meaningful alternative', () => {
  const image = html.match(/<img[^>]+src="images\/scenebreaker\.webp"[^>]*>/)?.[0];
  assert.ok(image);
  assert.match(image, /width="\d+"/);
  assert.match(image, /height="\d+"/);
  assert.match(image, /alt="[^\"]{30,}"/);
  assert.match(image, /loading="lazy"/);
});

test('page and offline cache agree on release asset versions', () => {
  const version = html.match(/style\.css\?v=([^\"]+)/)?.[1];
  assert.ok(version);
  assert.ok(html.includes(`behavior.js?v=${version}`));
  assert.ok(worker.includes(`style.css?v=${version}`));
  assert.ok(worker.includes(`behavior.js?v=${version}`));
  assert.ok(worker.includes(`portfolio-${version}`));
});

test('the type scale advances by exactly 25 percent', () => {
  const steps = [...css.matchAll(/--type-(?:small|base|[1-8]):\s*([\d.]+)rem/g)].map(m => Number(m[1]));
  assert.ok(steps.length >= 8);
  steps.slice(1).forEach((step, i) => assert.equal(step / steps[i], 1.25));
  assert.match(css, /--leading:\s*1\.5;/);
});

test('responsive project layout declares desktop, tablet and phone grids', () => {
  for (const columns of [12, 8, 4]) assert.match(css, new RegExp(`--grid-columns:\\s*${columns};`));
  assert.match(css, /repeat\(var\(--grid-columns\), minmax\(0, 1fr\)\)/);
});

test('section anchors remain unique and valid after adding the project', () => {
  const ids = [...html.matchAll(/\bid="([^\"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  const known = new Set(ids);
  for (const [, id] of html.matchAll(/href="#([^\"]+)"/g)) assert.ok(known.has(id), id);
});

test('project actions are visible before the detailed implementation copy', () => {
  const feature = html.match(/<article[^>]+id="scenebreaker"[\s\S]*?<\/article>/)[0];
  assert.ok(feature.indexOf('Try SceneBreaker</a>') < feature.indexOf('Build your scene'));
  assert.match(html, /class="btn btn-primary magnet" href="#projects"/);
  for (const project of ['SceneBreaker', 'RoomFit', 'CrowdFlow']) {
    assert.ok(html.includes(`aria-label="Try ${project} (opens in`));
    assert.ok(html.includes(`aria-label="Source code for ${project}`));
  }
});

test('scrolling remains user-controlled and progress uses a composited transform', () => {
  assert.doesNotMatch(css, /scroll-snap-type:\s*y (?:mandatory|proximity)/);
  assert.match(behavior, /progress\.style\.transform/);
  assert.doesNotMatch(behavior, /progress\.style\.width/);
});

test('contact hints survive adding, repeating and clearing a validation error', () => {
  const nodes = new Map();
  const doc = {
    getElementById: id => nodes.get(id),
    createElement: () => ({ remove() { nodes.delete(this.id); } }),
  };
  const attrs = new Map([['aria-describedby', 'message-hint']]);
  const input = {
    id: 'message',
    parentNode: { appendChild(node) { nodes.set(node.id, node); } },
    getAttribute: name => attrs.get(name) ?? null,
    setAttribute: (name, value) => attrs.set(name, value),
    removeAttribute: name => attrs.delete(name),
  };
  const functions = behavior.slice(behavior.indexOf('  function setError('), behavior.indexOf('  function validate('));
  const context = { document: doc, input };
  runInNewContext(functions + '\nsetError(input, "Too short"); setError(input, "Still too short");', context);
  assert.equal(attrs.get('aria-describedby'), 'message-hint message-err');
  assert.equal(attrs.get('aria-invalid'), 'true');
  assert.equal(nodes.size, 1);
  runInNewContext('clearError(input);', context);
  assert.equal(attrs.get('aria-describedby'), 'message-hint');
  assert.equal(attrs.has('aria-invalid'), false);
  assert.equal(nodes.size, 0);
  attrs.delete('aria-describedby');
  runInNewContext('setError(input, "Required"); clearError(input);', context);
  assert.equal(attrs.has('aria-describedby'), false);
});

test('contact retains browser validation until its custom handler is installed', () => {
  const form = html.match(/<form\b[^>]*id="contact-form"[^>]*>/)[0];
  assert.doesNotMatch(form, /novalidate/i);
  assert.ok(behavior.indexOf('form.noValidate = true') > behavior.indexOf("form.addEventListener('submit'"));
  assert.ok(behavior.indexOf('form.noValidate = true') > behavior.indexOf("sendButton.textContent = 'Send message'"));
});

test('the dark Wooly caption uses a surface with readable text contrast', () => {
  assert.match(css, /\[data-theme='dark'\] \.wooly-identity \{ background: var\(--surface\); \}/);
  const dark = css.match(/\[data-theme='dark'\] \{([^}]+)\}/)[1];
  const color = name => dark.match(new RegExp(`--${name}: (#[0-9a-f]+);`))[1];
  const luminance = hex => {
    const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const light = luminance(color('muted'));
  const bg = luminance(color('surface'));
  assert.ok((light + 0.05) / (bg + 0.05) >= 4.5);
});
