/**
 * GSAP + ScrollTrigger — hero intro, scroll reveals, staggers.
 * Skips all motion when prefers-reduced-motion: reduce.
 */
(function () {
    'use strict';

    var reduced =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var easeOut = 'power2.out';

    // Hero — load timeline
    var heroInner = document.querySelector('#hero .hero-inner');
    if (heroInner) {
        gsap.set(heroInner, { autoAlpha: 0, y: 36 });
        gsap.to(heroInner, {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: easeOut,
        });
    }

    // Hero background — subtle vertical parallax on scroll
    var hero = document.getElementById('hero');
    if (hero) {
        gsap.fromTo(
            hero,
            { backgroundPosition: '50% 0%' },
            {
                backgroundPosition: '50% 25%',
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );
    }

    function revealChildren(sectionEl, childSelector, stagger, start) {
        if (!sectionEl) return;
        var kids = sectionEl.querySelectorAll(childSelector);
        if (!kids.length) return;
        gsap.set(kids, { autoAlpha: 0, y: 48 });
        gsap.to(kids, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: stagger,
            ease: easeOut,
            scrollTrigger: {
                trigger: sectionEl,
                start: start || 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    }

    revealChildren(document.querySelector('#about'), '.about-card', 0.18);
    revealChildren(document.querySelector('#sign-up'), '.sign-up-inner > *', 0.15);

    // Testimonials — heading then stagger columns
    var testSec = document.querySelector('#testimonail');
    if (testSec) {
        var head = testSec.querySelector('.testimonail-heading');
        var cols = testSec.querySelectorAll(
            '.testimonail-card-one, .testimonail-card-two, .testimonail-card-three'
        );
        if (head) gsap.set(head, { autoAlpha: 0, y: 28 });
        if (cols.length) gsap.set(cols, { autoAlpha: 0, y: 32 });
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: testSec,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
        if (head) {
            tl.to(head, { autoAlpha: 1, y: 0, duration: 0.65, ease: easeOut });
        }
        if (cols.length) {
            tl.to(
                cols,
                { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.18, ease: easeOut },
                head ? '-=0.35' : 0
            );
        }
    }

    revealChildren(document.querySelector('#newsletter'), '.newsletter-inner > *', 0.12);

    // Sign-up button micro-interaction (pointer only)
    var signBtn = document.querySelector('.sign-up-btn');
    if (signBtn) {
        signBtn.addEventListener('mouseenter', function () {
            gsap.to(signBtn, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
        });
        signBtn.addEventListener('mouseleave', function () {
            gsap.to(signBtn, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    }
})();
