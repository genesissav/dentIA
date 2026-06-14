const parallax = document.querySelector('.paralax');
const segundaSeccion = document.querySelector('.segunda-seccion');
const cuartaSeccion = document.querySelector('.cuarta-seccion');
const heroFormulario = document.querySelector('.hero-formulario');
const heroTexto = document.querySelector('.hero-texto');
const scrollIndicator = document.querySelector('.scroll-indicator');
const footer = document.querySelector('.footer-dentia');

let isAnimating = false;

function updateParallax() {

    const scrollY = window.scrollY;
    const maxScroll = 400;
    const progress = Math.min(scrollY / maxScroll, 1);

    const scale = 1 + progress * 5;
    const opacity = 1 - progress;

    parallax.style.transform = `scale(${scale})`;
    parallax.style.opacity = opacity;

    heroFormulario.style.opacity = opacity;
    heroTexto.style.opacity = opacity;
    scrollIndicator.style.opacity = opacity;

    heroFormulario.style.transform = `translateY(${-progress * 100}px) scale(${1 - progress * 0.2})`;
    heroTexto.style.transform = `translateY(${-progress * 100}px) scale(${1 - progress * 0.1})`;
    scrollIndicator.style.transform = `translateY(${-progress * 100}px) scale(${1 - progress * 0.1})`;

   
    isAnimating = false;
}

window.addEventListener('scroll', () => {

    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(updateParallax);
    }

    const beneficiosRect = segundaSeccion.getBoundingClientRect();
    const funcionesRect = cuartaSeccion.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const alturaPantalla = window.innerHeight;

    // BENEFICIOS APARECEN
   if(
    beneficiosRect.top < alturaPantalla * 0.7 &&
    beneficiosRect.bottom > alturaPantalla * 0.3
){

    segundaSeccion.classList.add('visible');
    segundaSeccion.classList.remove('oculta');

}

// YA PASAMOS A FUNCIONES
else if(
    funcionesRect.top < alturaPantalla * 0.8
){

    segundaSeccion.classList.remove('visible');
    segundaSeccion.classList.add('oculta');

}

// ESTAMOS EN HERO
else{

    segundaSeccion.classList.remove('visible');
    segundaSeccion.classList.remove('oculta');
}
// FUNCIONES APARECEN
if(
    funcionesRect.top < alturaPantalla * 0.8 &&
    funcionesRect.bottom > alturaPantalla * 0.2
){

    cuartaSeccion.classList.add('visible');

}else{

    cuartaSeccion.classList.remove('visible');
}

// FOOTER
if(
    footerRect.top < alturaPantalla * 0.85 &&
    footerRect.bottom > alturaPantalla * 0.2
){

   footer.classList.add('footer-visible');

}else{

    footer.classList.remove('footer-visible');
}


});


/* ── SLIDER DE TARJETAS ── */
const wrapper = document.querySelector('.slider-wrapper');
const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
const cards = track.querySelectorAll('.card-funcion');
const perPage = 3;
const pages = Math.ceil(cards.length / perPage);
let current = 0;
let isDragging = false;
let startX = 0;
let currentOffset = 0;

function getOffset(page) {
    return page * wrapper.offsetWidth;
}

function goTo(page, animate = true) {
    current = Math.max(0, Math.min(page, pages - 1));
    currentOffset = getOffset(current);
    if (animate) {
        track.style.transition = 'transform 0.6s cubic-bezier(.25,.46,.45,.94)';
    } else {
        track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentOffset}px)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

/* Crear dots dinámicamente */
for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
}

/* ── DRAG CON MOUSE ── */
wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    wrapper.style.cursor = 'grabbing';
    e.preventDefault();
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    track.style.transform = `translateX(${-currentOffset + diff}px)`;
});

window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = 'grab';
    const diff = e.clientX - startX;
    if (diff < -60 && current < pages - 1) goTo(current + 1);
    else if (diff > 60 && current > 0) goTo(current - 1);
    else goTo(current);
});

/* ── TOUCH MÓVIL ── */
let touchStartX = 0;
track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50 && current < pages - 1) goTo(current + 1);
    if (diff < -50 && current > 0) goTo(current - 1);
});

/* Recalcular si cambia el tamaño de ventana */
window.addEventListener('resize', () => goTo(current, false));
EOF

