/*  ⚬────────────────────✧────────────────────⚬
                 GALAXY BACKGROUND
    ⚬────────────────────✧────────────────────⚬ */
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initGalaxy(); });

let stars = [];
let galaxyClouds = [];

function initGalaxy() {
    stars = [];

    // ∘₊✧── Pixel Stars ──✧₊∘
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() < 0.8 ? 1 : Math.random() < 0.5 ? 2 : 3,
            brightness: Math.random(),
            twinkleSpeed: 0.01 + Math.random() * 0.03,
            twinkleOffset: Math.random() * Math.PI * 2,
            color: Math.random() < 0.35 ? '#f4a0c8' 
                : Math.random() < 0.35 ? '#ffcce0' 
                : Math.random() < 0.2 ? '#ffe0ee' 
                : '#fff0f7',
        });
    }

    // ∘₊✧── Clouds ──✧₊∘ 
    galaxyClouds = [
        { x: canvas.width * 0.2,  y: canvas.height * 0.3,  r: 160, color: 'rgba(232,107,170,0.10)' },
        { x: canvas.width * 0.8,  y: canvas.height * 0.5,  r: 140, color: 'rgba(255,182,210,0.09)' },
        { x: canvas.width * 0.5,  y: canvas.height * 0.75, r: 190, color: 'rgba(212,104,154,0.08)' },
        { x: canvas.width * 0.15, y: canvas.height * 0.8,  r: 120, color: 'rgba(255,204,224,0.07)' },
        { x: canvas.width * 0.75, y: canvas.height * 0.15, r: 130, color: 'rgba(244,160,200,0.08)' },
      ];
}

let frame = 0;
function drawGalaxy() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    galaxyClouds.forEach( c => {
        const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        gradient.addColorStop(0, c.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
    });

    stars.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        const alpha = 0.3 + 0.7 * twinkle * s.brightness;
        ctx.globalAlpha = alpha; ctx.fillStyle = s.color;
        const px = Math.floor(s.x), py = Math.floor(s.y);
        ctx.fillRect(px, py, s.size, s.size);
        if (s.size >= 2 && twinkle > 0.8) {
        ctx.globalAlpha = alpha * 0.4;
        ctx.fillRect(px - s.size, py, s.size * 3, 1);
        ctx.fillRect(px, py - s.size, 1, s.size * 3);
        }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawGalaxy);
}
initGalaxy();
drawGalaxy();


/*┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*/


/*  ⚬────────────────────✧────────────────────⚬
         ICON STATE (before -> after click)
    ⚬────────────────────✧────────────────────⚬ */
function markVisited(btnId) {
    document.getElementById(btnId).classList.add('visited');
}

/*  ⚬────────────────────✧────────────────────⚬
                    MODAL LOGIC
    ⚬────────────────────✧────────────────────⚬ */
function openModal(id) {
    document.getElementById(id).classList.add('open');
    if (id === 'album-modal') {
        renderAlbum();
    }
}

function closeModal(id){
    document.getElementById(id).classList.remove('open');
}

// For clicking outside the modal to close
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
        }
    });
});

// For clicking ESC to close everything
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        document.getElementById('card-reveal').classList.remove('open');
        document.getElementById('lightbox').classList.remove('open');
    }
})


/*┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*/


/*  ⚬────────────────────✧────────────────────⚬
                 PHOTO ALBUM DATA
    Fill in with your photos below!
    Format: {src: 'path/to/photo.jpg', caption: 'text', year: 2022 }
    - Feel free to change the years to your desired years
    ⚬────────────────────✧────────────────────⚬ */
let albumPhotos = {
    2022: [
        { src: './assets/album/2022/test_1.jpeg', caption: 'a starry night ⊹ ࣪ ˖', year: 2022 },
        { src: '', caption: '', year: 2022 },
    ],
    2023: [
        { src: './assets/album/2023/test_2.jpeg', caption: 'pretty sunset ୭ ˚.', year: 2023 },
        { src: '', caption: '', year: 2023 },
    ],
    2024: [
        { src: './assets/album/2024/test_3.jpeg', caption: 'so pretty ˚˖𓍢ִ໋❀', year: 2024 },
        { src: '', caption: '', year: 2024 },
    ],
    2025: [
        { src: './assets/album/2025/test_4.jpeg', caption: 'a clear sky ༄', year: 2025 },
        { src: '', caption: '', year: 2025 },

    ],
    'present ᢉ𐭩': [
        { src: '', caption: '', year: 2026 },
    ],
};

// Photos saved from blind box pulls (populated at runtime)
let gachaAlbumPhotos = [];

function renderAlbum () {
    const body = document.getElementById('album-body');
    body.innerHTML = '';

    // ∘₊✧── Yearly Section ──✧₊∘
    Object.keys(albumPhotos).forEach(year => {
        const photos = albumPhotos[year];
        const section = document.createElement('div');
        section.className = 'album-year-section';
        section.innerHTML = `<div class="album-year-title">${year}</div>`;

        const grid = document.createElement('div');
        grid.className = 'photo-grid';

        photos.forEach(photo => {
            const slot = document.createElement('div');

            if (photo.src) {
                slot.className = 'photo-slot';
                const img = document.createElement('img');
                img.src = photo.src;
                img.onclick = () => openLightbox(photo.src, photo.caption);
                slot.appendChild(img);
            } else {
                slot.className = 'photo-slot empty';
                slot.title = photo.caption || 'add a photo';
            }

            grid.appendChild(slot);
        });

        section.appendChild(grid);
        body.appendChild(section);
    });

    // ∘₊✧── Blind Box Section (Gacha) ──✧₊∘
    if (gachaAlbumPhotos.length > 0) { 
        const section = document.createElement('div');
        section.className = 'album-year-section';
        section.innerHTML = `<div class="album-year-title">pulled memories ✦</div>`;

        const gachaGrid = document.createElement('div');  
        gachaGrid.className = 'photo-grid';

        gachaAlbumPhotos.forEach(photo => {
            const slot = document.createElement('div');
            slot.className = 'photo-slot gacha-memory';

            if (photo.src) {
                const img = document.createElement('img');
                img.src = photo.src;
                img.onclick = () => openLightbox(photo.src, photo.caption);
                slot.appendChild(img);

            } else {
                const emoji = document.createElement('span');
                emoji.textContent = photo.emoji || '✦';
                emoji.style.fontSize = '36px';
                slot.appendChild(emoji);
            }

            gachaGrid.appendChild(slot);  
        });

        section.appendChild(gachaGrid);
        body.appendChild(section);
    }
};


/*┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*/


/*  ⚬───────────────────────✧───────────────────────⚬
               BLIND BOX DATA (GACHA)
    Fill in with your gacha cards below!
    - src: path to your image file
    - caption: text show on the card
    - placeholder: text shown if no image is provided
    - tiers: 'common' | 'rare' | 'legendary'

    Tip: leave src empty and fill in placeholder if you 
    want the card to show text insetad of an image
    ⚬───────────────────────✧───────────────────────⚬ */
const GACHA_POOL = [
    {placeholder:'⌞ ⌝', tier:'common', src: './assets/gacha/gacha_1.jpeg', caption: 'guitar cat!!'},
    {placeholder:'⌞ ⌝', tier:'common', src: '', caption: ''},
    {placeholder:'⌞ ⌝', tier:'common', src: '', caption: ''},
    {placeholder:'⌞ ⌝', tier:'common', src: '', caption: ''},

    {placeholder:'⌞ ⌝', tier:'rare', src: './assets/gacha/gacha_2.jpeg', caption: 'strawberry puff!!'},
    {placeholder:'⌞ ⌝', tier:'rare', src: '', caption: ''},
    {placeholder:'⌞ ⌝', tier:'rare', src: '', caption: ''},
    {placeholder:'⌞ ⌝', tier:'rare', src: '', caption: ''},
    
    {placeholder:'⌞ ⌝', tier:'legendary', src: './assets/gacha/gacha_3.jpeg', caption: 'strawberry cake!!'},
    {placeholder:'⌞ ⌝', tier:'legendary', src: '', caption: ''},
];

// ∘₊✧── Adjust weights below to change pull rates (must add up to 100) ──✧₊∘
const TIER_WEIGHTS = {common: 65, rare: 28, legendary: 7};

let canPull = true;
let currentPulledCard = null;

function weightedRandom(){
    const total = Object.values(TIER_WEIGHTS).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const [tier, weight] of Object.entries(TIER_WEIGHTS)) {
        r -= weight;
        if (r <= 0) return tier;
    }
    return 'common';
}

function startPull() {
    if (!canPull) return;
    canPull = false;

    const orb = document.getElementById('gacha-orb');
    orb.classList.add('disabled');
    orb.querySelector('.gacha-orb-text').textContent = 'pulling── ᵎᵎ✦';
    document.getElementById('pulls-display').textContent = 'selecting a card .ᐟ.ᐟ';
    orb.style.animation = 'none';

    setTimeout(() => {
        const tier = weightedRandom();
        const pool = GACHA_POOL.filter(c => c.tier === tier);
        const card = pool[Math.floor(Math.random() * pool.length)];
        currentPulledCard = card;
    
        setTimeout(() => showCardReveal(card, tier), 200);
      }, 300);
}

// Only reveals the tier once the card is flipped
function showCardReveal(card, tier){
    document.getElementById('reveal-card').classList.remove('flipped');
    document.getElementById('card-front-face').className = `card-face card-front ${tier}`;

    // ∘₊✧── Card Image ──✧₊∘
    const imageArea = document.getElementById('card-image-area');
    imageArea.innerHTML = '<div class="card-holographic"></div>';
    if (card.src) {
        const img = document.createElement('img');
        img.src = card.src;
        imageArea.prepend(img);
    } else {
        const placeholderEl = document.createElement('span');
        placeholderEl.textContent = card.placeholder;
        placeholderEl.style.fontSize = '64px';
        imageArea.prepend(placeholderEl);
    }

    // ∘₊✧── Gacha Caption ──✧₊∘
    document.getElementById('card-label').textContent = card.caption;

    // ∘₊✧── Overlay ──✧₊∘
    document.getElementById('card-reveal').classList.add('open');
    document.getElementById('card-actions').style.display = 'none';
    document.getElementById('card-instruction').style.display = 'block';
}

function flipCard() {
    const card = document.getElementById('reveal-card');
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        document.getElementById('card-instruction').style.display = 'none';
        
        setTimeout(() => {
            const tier = document.getElementById('card-front-face').classList[2];

            // ∘₊✧── Tier Badge Text ──✧₊∘
            const tierText = {
                common: '˗ˏˋ ꒰ common ꒱ ˎˊ˗',
                rare: '⋆ ˚｡ ⋆୨ rare ୧⋆ ˚｡ ⋆',
                legendary: '˚₊‧꒰ა legendary ໒꒱ ‧₊˚',
            };
            document.getElementById('card-tier-text').textContent = tierText[tier];

            const ann = document.getElementById('tier-announcement');
            const annText   = { common: '˗ˏˋ ꒰ a common card! ꒱ ˎˊ˗', rare: '⋆ ˚｡ ⋆୨ a rare card! ୧⋆ ˚｡ ⋆', legendary: '˚₊‧꒰ა a legendary card!! ໒꒱ ‧₊˚' };
            const annColors = { common: 'var(--common)', rare: 'var(--rare)', legendary: 'var(--gold)' };
            ann.textContent = annText[tier];
            ann.style.color = annColors[tier];
            ann.style.opacity = '1';

            // ∘₊✧── Sparkles for Rare / Legendary ──✧₊∘
            if (tier !== 'common') spawnSparkles(tier);

            document.getElementById('card-actions').style.display = 'flex';
        }, 400);
    }
}

// ∘₊✧── Sparkles ──✧₊∘
function spawnSparkles(tier) {
    const container = document.getElementById('sparkle-container');
    container.innerHTML = '';
    
    const count   = tier === 'legendary' ? 25 : 12;
    const symbols = tier === 'legendary' ? ['.𖥔 ݁ ˖','✶⋆.˚','*ੈ✩‧₊˚','⊹ ࣪ ˖','⋆˙⟡'] : ['✦','★','⟢'];
    const colors  = tier === 'legendary'
        ? ['#ffb3d1','#ffd0e4','#fff0f7','#f4a0c8']
        : ['#d4689a','#f5c6dc','#e86baa'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
        const sp           = document.createElement('div');
        sp.className       = 'sparkle';
        sp.textContent     = symbols[Math.floor(Math.random() * symbols.length)];
        sp.style.left      = Math.random() * 100 + 'vw';
        sp.style.top       = '-20px';
        sp.style.color     = colors[Math.floor(Math.random() * colors.length)];
        sp.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
        sp.style.animationDelay   = '0s';
        container.appendChild(sp);
        setTimeout(() => sp.remove(), 3000);
        }, i * 80);
    }
}

function saveToAlbum(){
    if (!currentPulledCard) return;
    gachaAlbumPhotos.push({...currentPulledCard});
    closeReveal();
    
    const display = document.getElementById('pulls-display');
    display.textContent = '⋆˚✰ saved to album ݁˖⭑.ᐟ'
    setTimeout(() => {
        display.textContent = 'pulls are available!';
        resetGacha();
    }, 2000);
}

function closeReveal() {
    document.getElementById('card-reveal').classList.remove('open');
    resetGacha();
}

function resetGacha() {
    canPull = true;
    const orb = document.getElementById('gacha-orb');
    orb.classList.remove('disabled');
    orb.querySelector('.gacha-orb-text').textContent = 'tap to\npull!';
    orb.style.animation = 'orbPulse 3s ease-in-out infinite';
    document.getElementById('pulls-display').textContent = 'pulls are available!';
    document.getElementById('tier-announcement').style.opacity = '0';
}


/*┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*/


/*  ⚬────────────────────✧────────────────────⚬
                 ALBUM LIGHT BOX
    ⚬────────────────────✧────────────────────⚬ */
let lightboxPhotos = []; // Adds photos in order
let lightboxIndex = 0; // The one that is currently showing

function buildLightboxList() {
    lightboxPhotos = [];
    // ∘₊✧── Add yearly photos ──✧₊∘
    Object.keys(albumPhotos).forEach(year => {
        albumPhotos[year].forEach(photo => {
            if(photo.src) lightboxPhotos.push({ src: photo.src, caption: photo.caption });
        });
    });

    // ∘₊✧── Add gacha photos cards ──✧₊∘
    gachaAlbumPhotos.forEach(photo => {
        if(photo.src) lightboxPhotos.push({ src: photo.src, caption: photo.caption });
    });
}

function openLightbox(src, caption) {
    if (!src) return;
    buildLightboxList();
    // ∘₊✧── Finds the index of the clicked photo ──✧₊∘
    lightboxIndex = lightboxPhotos.findIndex(p => p.src === src);
    showLightboxPhoto(lightboxIndex);
    document.getElementById('lightbox').classList.add('open');
}

function showLightboxPhoto(index) {
    const photo = lightboxPhotos[index];
    document.getElementById('lightbox-img').src = photo.src;
    document.getElementById('lightbox-caption').textContent = photo.caption || '';
    document.querySelector('.lightbox-caption-box').style.display = photo.caption ? 'block' : 'none';
}

function lightboxNext() {
    lightboxIndex = (lightboxIndex + 1) % lightboxPhotos.length;
    showLightboxPhoto(lightboxIndex);
}

function lightboxPrev() {
    lightboxIndex = (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length;
    showLightboxPhoto(lightboxIndex);
}

function closeLightbox(){
    document.getElementById('lightbox').classList.remove('open');
}

// ∘₊✧── Arrow Buttons ──✧₊∘
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        document.getElementById('lightbox').classList.remove('open');
    }
    if (document.getElementById('lightbox').classList.contains('open')) {
        if (e.key === 'ArrowRight') lightboxNext();
        if (e.key === 'ArrowLeft')  lightboxPrev();
    }
});