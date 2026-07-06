/* ============================================
   SHADOWFORGE — MAIN JAVASCRIPT
   Started: Day 25
   ============================================ */

/* ── WAIT FOR PAGE TO FULLY LOAD ── */
document.addEventListener('DOMContentLoaded', () => {

    console.log('⚡ ShadowForge JavaScript loaded');

    /* ────────────────────────────────────────
       1. HAMBURGER MENU
       Opens and closes mobile navigation
    ──────────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {

            // Toggle the open class on both elements
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');

            // Update aria label for accessibility
            const isOpen = navLinks.classList.contains('open');
            hamburger.setAttribute(
                'aria-label',
                isOpen ? 'Close navigation menu' : 'Open navigation menu'
            );

        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const clickedOutside =
                !hamburger.contains(event.target) &&
                !navLinks.contains(event.target);

            if (clickedOutside) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });
    }

    /* ────────────────────────────────────────
    2. ACTIVE NAV LINK
    Highlights the current page in the nav
    ──────────────────────────────────────── */
    const currentPage = window.location.pathname.split('/').pop();
    const navAnchors = document.querySelectorAll('#nav-links a');

    navAnchors.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.style.color = 'var(--neon-cyan)';
            link.style.textShadow = '0 0 10px var(--neon-cyan)';
        }
    });

    /* ────────────────────────────────────────
    3. XP BAR ANIMATION
    XP bars from 0 to their value
    ──────────────────────────────────────── */
    const xpFills = document.querySelectorAll('.xp-bar-fill, .xp-fill');

    xpFills.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetWidth;
        }, 300);
    });

    /* ────────────────────────────────────────
    4. TOPIC PROGRESS BAR ANIMATION
    Same animation for topic progress bars
    ──────────────────────────────────────── */
    const progressFills = document.querySelectorAll('.topic-progress-fill');

    progressFills.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.transition = 'width 1s ease';
            bar.style.width = targetWidth;
        }, 500);
    });

    /* ────────────────────────────────────────
    5. COURSE CARD HOVER SOUND FEEDBACK
    Visual pulse on card enter
    ──────────────────────────────────────── */
    const courseCards = document.querySelectorAll(
        '.course-card:not(.coming-soon)'
    );

    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'var(--transition-base)';
        });
    });

    /* ────────────────────────────────────────
        6. SMOOTH SCROLL FOR ANCHOR LINKS
    ──────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(
                anchor.getAttribute('href')
            );
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ────────────────────────────────────────
    7. CONSOLE WELCOME MESSAGE
    Because every great platform has one
    ──────────────────────────────────────── */
    console.log('%c⚡ SHADOWFORGE', 'color: #00d4ff; font-size: 24px; font-weight: 900; font-family: monospace;');
    console.log('%cForge Your Knowledge', 'color: #7a9bb5; font-size: 14px; font-family: monospace;');
    console.log('%cBuilt by King', 'color: #3a5570; font-size: 12px; font-family: monospace;');
    console.log('Current page:',window.location.pathname);

});