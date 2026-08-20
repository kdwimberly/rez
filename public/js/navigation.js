const path = location.pathname.replace(/\/$/, '') || '/';
const isStory = path === '/story' || path === '/prologue' || path === '/chapter-1';
const isArchive = path === '/archive' || path.startsWith('/archive/');
const current = (active) => active ? ' aria-current="page"' : '';
const storyLinks = `<a href="/prologue"${current(path === '/prologue')}><span>00</span>Prologue</a><a href="/chapter-1"${current(path === '/chapter-1')}><span>01</span>Zevora I</a>`;
const archiveLinks = `<a href="/archive#characters"><span>01</span>Characters</a><a href="/archive#environments"><span>02</span>Environments</a><a href="/archive#artifacts"><span>03</span>Artifacts</a><a href="/archive#concept-art"><span>04</span>Concept Art</a>`;
const desktopNav = `<a href="/"${current(path === '/')}>Home</a><div class="nav-group"><a class="nav-parent" href="/story"${current(isStory)}>Story <i>⌄</i></a><div class="nav-submenu"><small>Book I · Of Rune & Ruin</small>${storyLinks}</div></div><div class="nav-group"><a class="nav-parent" href="/archive"${current(isArchive)}>Archive <i>⌄</i></a><div class="nav-submenu"><small>The visual encyclopedia</small>${archiveLinks}</div></div><a href="/lore"${current(path === '/lore')}>Lore</a><a href="/about"${current(path === '/about')}>About / FAQ</a>`;
const mobileNav = `<a class="mobile-primary" href="/"${current(path === '/')}>Home</a><section class="mobile-nav-group"><a class="mobile-primary" href="/story"${current(isStory)}>Story</a><div class="mobile-submenu">${storyLinks}</div></section><section class="mobile-nav-group"><a class="mobile-primary" href="/archive"${current(isArchive)}>Archive</a><div class="mobile-submenu">${archiveLinks}</div></section><a class="mobile-primary" href="/lore"${current(path === '/lore')}>Lore</a><a class="mobile-primary" href="/about"${current(path === '/about')}>About / FAQ</a>`;
if (!document.querySelector('link[href="/styles/navigation.css"]')) document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="/styles/navigation.css">');
document.querySelectorAll('[data-site-header]').forEach((el) => {
  el.innerHTML = `<header class="site-header"><a class="brand" href="/" aria-label="REZ home">RE<span>Z</span></a><nav class="desktop-nav" aria-label="Primary">${desktopNav}</nav><button class="menu-button" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button></header><nav class="menu-panel" aria-label="Mobile navigation">${mobileNav}<small class="menu-colophon">Book I · Of Rune & Ruin<br>Water remembers. Power answers.</small></nav>`;
  const button = el.querySelector('.menu-button');
  const menu = el.querySelector('.menu-panel');
  button.addEventListener('click', () => { const open = menu.classList.toggle('open'); button.setAttribute('aria-expanded', String(open)); document.body.style.overflow = open ? 'hidden' : ''; });
});
document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());
