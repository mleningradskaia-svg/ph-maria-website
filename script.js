/* ============================================
   ART MARIA PHOTOGRAPHY — Interactions v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVIGATION OVERLAY =====
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');
    const navBackdrop = document.getElementById('navBackdrop');
    const navLinks = document.querySelectorAll('.nav-link');

    function openNav() {
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);
    navBackdrop.addEventListener('click', closeNav);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeNav();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 400);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) closeNav();
    });


    // ===== SCROLL ANIMATIONS =====
    const animEls = document.querySelectorAll('.anim-el');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

    animEls.forEach(el => observer.observe(el));


    // ===== REVIEWS CAROUSEL =====
    const track = document.getElementById('reviewsTrack');
    const slides = track.querySelectorAll('.review-slide');
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const dotsWrap = document.getElementById('reviewDots');
    let cur = 0;
    const total = slides.length;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'rev-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Review ${i + 1}`);
        dot.addEventListener('click', () => go(i));
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.rev-dot');

    function go(i) {
        cur = i;
        track.style.transform = `translateX(-${cur * 100}%)`;
        dots.forEach((d, j) => d.classList.toggle('active', j === cur));
    }

    prevBtn.addEventListener('click', () => go(cur <= 0 ? total - 1 : cur - 1));
    nextBtn.addEventListener('click', () => go(cur >= total - 1 ? 0 : cur + 1));

    // Autoplay
    let autoplay = setInterval(() => go(cur >= total - 1 ? 0 : cur + 1), 6000);
    const carousel = document.querySelector('.reviews-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => go(cur >= total - 1 ? 0 : cur + 1), 6000);
    });

    // Touch swipe
    let sx = 0;
    carousel.addEventListener('touchstart', (e) => { sx = e.changedTouches[0].screenX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const diff = sx - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) go(diff > 0 ? (cur >= total - 1 ? 0 : cur + 1) : (cur <= 0 ? total - 1 : cur - 1));
    }, { passive: true });


    // ===== CONTACT FORM =====
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-form-submit .btn-brush-text');
        const orig = btn.textContent;
        btn.textContent = 'message sent! ✨';
        setTimeout(() => { btn.textContent = orig; form.reset(); }, 3000);
    });


    // ===== NAVIGATE BUTTON SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navToggle.style.transform = y > 120 ? 'scale(0.92)' : 'scale(1)';
        navToggle.style.opacity = y > 120 ? '0.88' : '1';
    }, { passive: true });

});
