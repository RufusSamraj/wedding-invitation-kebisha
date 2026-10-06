// Add your music URL here. Use a YouTube video link or a direct playable audio
// file URL (MP3, M4A, OGG, WAV, etc.). This setting is shared with all visitors.
const MUSIC_URL = '';
const weddingDate = new Date('2026-11-20T15:00:00+05:30');
const intro = document.querySelector('#intro');
const envelope = document.querySelector('.envelope');
const shell = document.querySelector('#siteShell');
const toast = document.querySelector('#toast');
const music = document.querySelector('#weddingMusic');
const musicToggle = document.querySelector('#musicToggle');
const youtubePlayer = document.querySelector('#youtubePlayer');

document.documentElement.classList.add('js');

function setMusicPlaying(playing) {
  musicToggle.classList.toggle('playing', playing);
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  musicToggle.querySelector('.music-label').textContent = playing ? 'Pause music' : 'Play music';
}

function youtubeVideoId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const youtubeHost = host === 'youtube.com' || host.endsWith('.youtube.com') ||
      host === 'youtube-nocookie.com' || host.endsWith('.youtube-nocookie.com');
    if (host === 'youtu.be') return url.pathname.slice(1).split('/')[0] || null;
    if (youtubeHost) {
      if (url.pathname === '/watch') return url.searchParams.get('v');
      return url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] || null;
    }
  } catch {
    return null;
  }
  return null;
}

function embedYouTube(value) {
  const id = youtubeVideoId(value);
  if (!id) return false;
  music.pause();
  const params = new URLSearchParams({
    autoplay: '1', controls: '1', playsinline: '1', rel: '0', enablejsapi: '1', loop: '1', playlist: id
  });
  if (location.protocol === 'https:' || location.protocol === 'http:') {
    params.set('origin', location.origin);
  }
  youtubePlayer.innerHTML = `<iframe title="Wedding music from YouTube" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params}" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  youtubePlayer.hidden = false;
  setMusicPlaying(true);
  return true;
}

async function playMusic() {
  const source = MUSIC_URL.trim();
  if (!source) return false;
  if (youtubeVideoId(source)) return embedYouTube(source);

  try {
    const parsed = new URL(source);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Invalid music URL');
  } catch {
    showToast('Add a public music URL to MUSIC_URL at the top of script.js.');
    return false;
  }

  youtubePlayer.hidden = true;
  youtubePlayer.innerHTML = '';
  music.src = source;
  music.load();
  try {
    await music.play();
    setMusicPlaying(true);
    return true;
  } catch {
    setMusicPlaying(false);
    showToast('Use a direct playable audio-file URL, or a YouTube video URL.');
    return false;
  }
}

function pauseMusic() {
  if (!youtubePlayer.hidden) {
    const frame = youtubePlayer.querySelector('iframe');
    frame?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
  }
  music.pause();
  setMusicPlaying(false);
}

document.querySelector('#openInvite').addEventListener('click', () => {
  envelope.classList.add('open');
  if (MUSIC_URL.trim()) playMusic();
  window.setTimeout(() => {
    intro.classList.add('is-opening');
    shell.classList.add('is-visible');
    shell.setAttribute('aria-hidden', 'false');
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
  }, 900);
});

musicToggle.addEventListener('click', async () => {
  if (musicToggle.getAttribute('aria-pressed') === 'true') {
    pauseMusic();
    return;
  }
  if (!MUSIC_URL.trim()) {
    showToast('Add your music URL to MUSIC_URL at the top of script.js.');
    return;
  }
  if (!youtubePlayer.hidden) {
    const frame = youtubePlayer.querySelector('iframe');
    frame?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
    setMusicPlaying(true);
    return;
  }
  await playMusic();
});

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const values = [
    ['days', Math.floor(remaining / 86400000)],
    ['hours', Math.floor((remaining % 86400000) / 3600000)],
    ['minutes', Math.floor((remaining % 3600000) / 60000)],
    ['seconds', Math.floor((remaining % 60000) / 1000)]
  ];
  document.querySelector('#countdown').innerHTML = values.map(([label, value]) =>
    `<div class="count-item"><strong>${String(value).padStart(2, '0')}</strong><span>${label}</span></div>`
  ).join('');
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

let scratchInitialized = false;
let petalRainStarted = false;
function startPetalRain() {
  if (petalRainStarted) return;
  petalRainStarted = true;
  const rain = document.querySelector('#petalRain');
  const colors = ['#fff8ed', '#f6dfd8', '#edd0c2', '#f4ead8', '#e7e2ce'];
  for (let i = 0; i < 30; i += 1) {
    const petal = document.createElement('span');
    const duration = 8 + (i * 7 % 9);
    petal.style.left = `${(i * 47 + 11) % 100}%`;
    petal.style.width = `${8 + (i * 5 % 8)}px`;
    petal.style.height = `${12 + (i * 7 % 10)}px`;
    petal.style.background = `linear-gradient(145deg, #fffdf6, ${colors[i % colors.length]} 58%, #d7b893)`;
    petal.style.setProperty('--fall-mid', `${((i * 29) % 150) - 75}px`);
    petal.style.setProperty('--fall-end', `${((i * 43 + 31) % 220) - 110}px`);
    petal.style.setProperty('--fall-mid-spin', `${180 + (i * 61 % 240)}deg`);
    petal.style.setProperty('--fall-spin', `${360 + (i * 113 % 540)}deg`);
    petal.style.setProperty('--fall-duration', `${duration}s`);
    petal.style.setProperty('--fall-delay', `-${(i * 13 % duration)}s`);
    petal.style.setProperty('--still-y', `${(i * 37 + 9) % 88}vh`);
    rain.appendChild(petal);
  }
  requestAnimationFrame(() => rain.classList.add('active'));
}

function initializeScratchCard() {
  if (scratchInitialized) return;
  const card = document.querySelector('#scratchCard');
  const canvas = document.querySelector('#scratchCanvas');
  const context = canvas.getContext('2d');
  const rect = card.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  scratchInitialized = true;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.fillStyle = '#315f91';
  context.fillRect(0, 0, rect.width, rect.height);
  for (let i = 0; i < 55; i += 1) {
    const x = ((i * 67 + 23) % 997) / 997 * rect.width;
    const y = ((i * 41 + 11) % 991) / 991 * rect.height;
    context.beginPath();
    context.fillStyle = i % 3 === 0 ? '#d6b878' : '#f3ead5';
    context.globalAlpha = i % 3 === 0 ? 0.8 : 0.42;
    context.arc(x, y, i % 5 === 0 ? 1.5 : 0.8, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;

  let scratching = false;
  function eraseAt(event) {
    const bounds = canvas.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 25, 0, Math.PI * 2);
    context.fill();
  }
  function erasedFraction() {
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const stride = 4 * 18;
    let samples = 0;
    let erased = 0;
    for (let alpha = 3; alpha < pixels.length; alpha += stride) {
      samples += 1;
      if (pixels[alpha] < 24) erased += 1;
    }
    return erased / samples;
  }
  function reveal() {
    if (card.classList.contains('is-scratched')) return;
    card.classList.add('is-scratched');
    card.setAttribute('aria-label', 'Wedding date revealed: 20 November 2026 at 3 PM');
    context.clearRect(0, 0, rect.width, rect.height);
    startPetalRain();
    const confetti = card.querySelector('.scratch-confetti');
    for (let i = 0; i < 22; i += 1) {
      const piece = document.createElement('i');
      piece.style.setProperty('--x', `${(i * 37 + 13) % 100}%`);
      piece.style.setProperty('--delay', `${(i % 7) * 45}ms`);
      piece.style.setProperty('--turn', `${(i * 67) % 360}deg`);
      confetti.appendChild(piece);
    }
  }
  card.addEventListener('pointerdown', event => {
    if (card.classList.contains('is-scratched')) return;
    event.preventDefault();
    scratching = true;
    card.setPointerCapture(event.pointerId);
    eraseAt(event);
  });
  card.addEventListener('pointermove', event => {
    if (scratching && !card.classList.contains('is-scratched')) eraseAt(event);
  });
  card.addEventListener('pointerup', () => {
    if (!scratching) return;
    scratching = false;
    if (erasedFraction() > 0.34) reveal();
  });
  card.addEventListener('pointercancel', () => { scratching = false; });
  card.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && !card.classList.contains('is-scratched')) {
      event.preventDefault();
      reveal();
    }
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 4200);
}

let revealObserver;
function enableScrollReveals() {
  const sections = document.querySelectorAll('main > section:not(.hero)');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('is-visible'));
    return;
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  sections.forEach(section => {
    section.classList.add('scroll-reveal');
    revealObserver.observe(section);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    if (link.getAttribute('href') === '#home') window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

shell.addEventListener('transitionend', event => {
  if (event.target === shell && shell.classList.contains('is-visible')) {
    enableScrollReveals();
    initializeScratchCard();
  }
});
