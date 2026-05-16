// === NAWIGACJA ===

// Mobilne menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Zamknij menu po kliknięciu w link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Scrollowanie - efekt nawigacji
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === PŁYNNE SCROLLOWANIE ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === PRZYCISK SCROLL TO TOP ===
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === ANIMACJE PRZY SCROLLU ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Obserwuj elementy, które mają być animowane
const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .process-step');
animatedElements.forEach(el => {
    observer.observe(el);
});

// === STATYSTYKI - ANIMACJA LICZNIKÓW ===
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.textContent.includes('%');
    const hasPlus = element.textContent.includes('+');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
        }
    }, 16);
}

// Uruchom animację liczników gdy sekcja hero jest widoczna
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Animuj tylko jeśli zawiera liczbę
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number) && number > 0) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// === AKTYWNY LINK W NAWIGACJI ===
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// === CONSOLE INFO ===
console.log('%c🔧 RAVBEND - Gięcie z Precyzją', 'font-size: 20px; font-weight: bold; color: #e30613;');
console.log('%cTwój Partner w Obróbce Blach', 'font-size: 14px; color: #1a1a1a;');
console.log('%c📞 +48 726 246 185 | ✉️ ravbend@o2.pl', 'font-size: 12px;');
console.log('%c📍 Polny Młyn 2B, 21-132 Kamionka', 'font-size: 12px;');
