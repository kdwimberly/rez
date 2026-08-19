import { access, readFile } from 'node:fs/promises';
const routes = ['', 'story', 'prologue', 'chapter-1', 'archive', 'lore', 'about'];
const assets = ['cavern-wide.jpg','warlocks-rune.jpg','vorthas.jpg','rune-close.jpg','fissure-red.jpg'];
for (const route of routes) await access(`public/${route ? route + '/' : ''}index.html`);
for (const asset of assets) await access(`public/artwork/prologue/${asset}`);
const files = await Promise.all(routes.map(r => readFile(`public/${r ? r + '/' : ''}index.html`, 'utf8')));
if (files.some(x => /chatgpt|oaiusercontent|blob\.core/i.test(x))) throw new Error('Temporary asset URL detected');
console.log(`Checked ${routes.length} routes and permanent artwork assets: OK`);
