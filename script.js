document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Sticky & Glassmorphism ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hamburger Menu Mobile ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '☰';
        });
    });

    // --- Scroll Reveals with Intersection Observer ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Staggered Timeline Animation ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Add a slight delay based on index
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // --- Staggered Committee Cards Animation ---
    const committeeCards = document.querySelectorAll('.committee-card');
    committeeCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // --- Parallax Effect for Pop-Art Graphics ---
    const popArtContainers = document.querySelectorAll('.pop-art-container');
    
    let isTicking = false;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (!isTicking) {
            requestAnimationFrame(() => {
                popArtContainers.forEach(container => {
                    const graphic = container.querySelector('.pop-art-graphic');
                    const shadow = container.querySelector('.pop-art-shadow');
                    
                    if (graphic && shadow && container.getBoundingClientRect().top < window.innerHeight && container.getBoundingClientRect().bottom > 0) {
                        // Subtle parallax on the graphic
                        graphic.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`;
                        // Opposite subtle parallax on the shadow
                        shadow.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
                    }
                });
                isTicking = false;
            });
            isTicking = true;
        }
    });

});
