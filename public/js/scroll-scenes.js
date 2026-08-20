const clamp = (number, min = 0, max = 1) => Math.min(max, Math.max(min, number));
const scenes = [...document.querySelectorAll('[data-scroll-scene]')];
const particles = [...document.querySelectorAll('.debris')];
const prologueIntro = document.querySelector('[data-prologue-intro]');
let ticking = false;

function render() {
  const viewportHeight = innerHeight;
  if (prologueIntro) {
    const introRect = prologueIntro.getBoundingClientRect();
    const introProgress = clamp((viewportHeight - introRect.top) / (viewportHeight + introRect.height));
    const titleOpacity = clamp((introProgress - 0.12) / 0.5);
    prologueIntro.style.setProperty('--intro-progress', String(introProgress));
    prologueIntro.style.setProperty('--intro-title-opacity', String(titleOpacity));
  }
  for (const scene of scenes) {
    const rect = scene.getBoundingClientRect();
    const progress = clamp(-rect.top / (rect.height - viewportHeight));
    const sticky = scene.querySelector('.scene-sticky');
    const art = scene.querySelector('.scene-art');
    const mode = scene.dataset.mode || 'push';
    const copyOpacity = clamp(1 - Math.abs(progress - 0.5) * 2.15);
    sticky?.style.setProperty('--copy-opacity', String(copyOpacity));

    if (art) {
      const startScale = Number(scene.dataset.scale || 1.04);
      const endScale = Number(scene.dataset.scaleEnd || 1.16);
      art.style.setProperty('--scale', String(startScale + (endScale - startScale) * progress));
      art.style.setProperty('--x', `${(Number(scene.dataset.panX || 0) * progress).toFixed(2)}%`);
      art.style.setProperty('--y', `${(Number(scene.dataset.panY || 0) * progress).toFixed(2)}%`);
      art.style.setProperty('--brightness', String(0.42 + progress * 0.38));
      art.style.setProperty('--saturation', String(0.62 + progress * 0.34));
    }

    sticky?.style.setProperty('--glow', String(0.04 + progress * 0.5));
    sticky?.style.setProperty('--mist-shift', String(progress * 18));
    sticky?.style.setProperty('--mist', String(0.16 + progress * 0.22));
    if (mode === 'ritual') {
      sticky?.style.setProperty('--debris', String(clamp((progress - 0.18) * 1.8)));
      sticky?.style.setProperty('--rise', String(clamp((progress - 0.15) * 1.3)));
    }
    if (mode === 'portal') {
      sticky?.style.setProperty('--portal', String(clamp((progress - 0.2) * 1.28)));
    }
  }

  for (const [index, particle] of particles.entries()) {
    particle.style.setProperty('--dx', `${10 + (index * 17) % 85}vw`);
  }
  ticking = false;
}

function update() {
  if (!ticking) {
    requestAnimationFrame(render);
    ticking = true;
  }
}

addEventListener('scroll', update, { passive: true });
addEventListener('resize', update, { passive: true });
const revealTargets = [...document.querySelectorAll('.prose p, .silence p, .final-reveal h2, .final-reveal span')];
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  revealTargets.forEach((target) => revealObserver.observe(target));
}
render();
