/**
 * Footer year, mobile nav toggle, ScrollTrigger.refresh on resize.
 */
(function () {
    'use strict';

    var DESKTOP_MIN = 992;

    function debounce(fn, ms) {
        var t;
        return function () {
            clearTimeout(t);
            var args = arguments;
            t = setTimeout(function () {
                fn.apply(null, args);
            }, ms);
        };
    }

    // Copyright year
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    // Mobile navigation
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');

    function isDesktop() {
        return window.matchMedia('(min-width: ' + DESKTOP_MIN + 'px)').matches;
    }

    function setNavOpen(open) {
        if (!header || !toggle || !nav) return;
        header.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        // Lock scroll when full-screen menu is open (mobile)
        if (!isDesktop()) {
            document.documentElement.style.overflow = open ? 'hidden' : '';
            document.body.style.overflow = open ? 'hidden' : '';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
    }

    function closeNavIfDesktop() {
        if (isDesktop()) {
            setNavOpen(false);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
    }

    if (toggle && nav && header) {
        toggle.addEventListener('click', function () {
            var open = !header.classList.contains('nav-open');
            setNavOpen(open);
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setNavOpen(false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setNavOpen(false);
        });
    }

    window.addEventListener(
        'resize',
        debounce(function () {
            closeNavIfDesktop();
            if (typeof window.ScrollTrigger !== 'undefined') {
                window.ScrollTrigger.refresh();
            }
        }, 200)
    );

    window.addEventListener('orientationchange', function () {
        setTimeout(function () {
            if (typeof window.ScrollTrigger !== 'undefined') {
                window.ScrollTrigger.refresh();
            }
        }, 300);
    });
})();
