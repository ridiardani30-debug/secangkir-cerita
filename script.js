// Custom smooth scrolling dengan durasi yang lebih lambat dan halus
function smoothScrollTo(target) {
    const start = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - start;
    const duration = 1200; // 1.2 detik untuk scroll yang lebih smooth
    const startTime = performance.now();

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        window.scrollTo(0, start + distance * easeProgress);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target);
        }
    });
});

// Parallax effect untuk ornamen dan elemen saat scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax untuk hero section - pergerakan yang lebih terlihat
    const heroOrnaments = document.querySelector('.hero-ornaments');
    if (heroOrnaments) {
        heroOrnaments.style.transform = `translateY(${scrollY * 0.65}px)`;
    }

    // Parallax untuk section ornaments - pergerakan yang lebih signifikan
    const sectionOrnaments = document.querySelectorAll('.section-ornaments');
    sectionOrnaments.forEach((ornament, index) => {
        const speed = 0.5 + (index * 0.1);
        ornament.style.transform = `translateY(${scrollY * speed}px)`;
    });

    // Parallax untuk hero-media - pergerakan minimal agar tidak menutupi text
    const heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
        const heroRect = heroMedia.getBoundingClientRect();
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            const offset = (window.innerHeight - heroRect.top) * 0.08;
            heroMedia.style.transform = `translateY(${offset}px)`;
        }
    }

    // Parallax untuk about-media - pergerakan yang lebih terlihat
    const aboutMedia = document.querySelector('.about-media');
    if (aboutMedia) {
        const aboutRect = aboutMedia.getBoundingClientRect();
        if (aboutRect.top < window.innerHeight && aboutRect.bottom > 0) {
            const offset = (window.innerHeight - aboutRect.top) * 0.22;
            aboutMedia.style.transform = `translateY(${offset}px)`;
        }
    }
});

// Animasi saat scroll - fade in dan slide up untuk sections
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});