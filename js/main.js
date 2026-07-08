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
    console.log('Current page:', window.location.pathname);

});

/* ============================================
   SHADOWFORGE XP SYSTEM
   Day 26 — Rank calculation, XP tracking,
   UI updates
   ============================================ */

/* ────────────────────────────────────────
   XP CONFIGURATION
   Single place to adjust all XP values
──────────────────────────────────────── */
const XP_CONFIG = {
    ranks: [
        {
            name: 'Apprentice',
            minXP: 0,
            maxXP: 499,
            icon: '⚔️',
            color: 'var(--rank-apprentice-color)'
        },
        {
            name: 'Scholar',
            minXP: 500,
            maxXP: 1999,
            icon: '📚',
            color: 'var(--rank-scholar-color)'
        },
        {
            name: 'Expert',
            minXP: 2000,
            maxXP: 4999,
            icon: '🔬',
            color: 'var(--rank-expert-color)'
        },
        {
            name: 'Master',
            minXP: 5000,
            maxXP: Infinity,
            icon: '👑',
            color: 'var(--rank-master-color)'
        }
    ],

    xpRewards: {
        completeQuiz: 200,
        perfectQuiz: 50,        // bonus for 100% score
        dailyStreak: 25,        // bonus per streak day
        firstAttempt: 30,       // bonus for passing first try
        completeTopic: 100
    }
};

/* ────────────────────────────────────────
   STUDENT DATA
   In real app this comes from the database.
   For now we store it here.
──────────────────────────────────────── */
const studentData = {
    name: 'King',
    xp: 1240,
    streak: 7,
    bestStreak: 14,
    completedTopics: ['intro-economics', 'scarcity-choice',
        'opportunity-cost', 'production-possibilities'],
    currentSubject: 'microeconomics',
    currentTopic: 'demand-supply'
};

/* ────────────────────────────────────────
   FUNCTION: getRank
   Takes XP number, returns rank object
──────────────────────────────────────── */
function getRank(xp) {
    for (let i = XP_CONFIG.ranks.length - 1; i >= 0; i--) {
        if (xp >= XP_CONFIG.ranks[i].minXP) {
            return XP_CONFIG.ranks[i];
        }
    }
    return XP_CONFIG.ranks[0];
}

/* ────────────────────────────────────────
   FUNCTION: getXPProgress
   Returns progress within current rank
   as a percentage
──────────────────────────────────────── */
function getXPProgress(xp) {
    const currentRank = getRank(xp);
    const nextRankIndex = XP_CONFIG.ranks.indexOf(currentRank) + 1;

    // If Master rank — already at maximum
    if (nextRankIndex >= XP_CONFIG.ranks.length) {
        return {
            percentage: 100,
            current: xp,
            needed: 0,
            nextRank: null
        };
    }

    const nextRank = XP_CONFIG.ranks[nextRankIndex];
    const xpIntoRank = xp - currentRank.minXP;
    const xpNeededForRank = nextRank.minXP - currentRank.minXP;
    const percentage = Math.round((xpIntoRank / xpNeededForRank) * 100);

    return {
        percentage: percentage,
        current: xp,
        needed: nextRank.minXP - xp,
        nextRank: nextRank
    };
}

/* ────────────────────────────────────────
   FUNCTION: addXP
   Adds XP to student, checks for rank up
──────────────────────────────────────── */
function addXP(amount, reason = 'Completed activity') {
    const oldRank = getRank(studentData.xp);
    studentData.xp += amount;
    const newRank = getRank(studentData.xp);

    console.log(`⚡ +${amount} XP — ${reason}`);
    console.log(`Total XP: ${studentData.xp}`);

    // Check if rank increased
    if (newRank.name !== oldRank.name) {
        console.log(`🏆 RANK UP! ${oldRank.name} → ${newRank.name}`);
        showRankUpBanner(newRank);
    }

    // Update the UI
    updateXPDisplay();
    showXPToast(amount);

    return studentData.xp;
}

/* ────────────────────────────────────────
   FUNCTION: updateXPDisplay
   Updates all XP related elements on page
──────────────────────────────────────── */
function updateXPDisplay() {
    const progress = getXPProgress(studentData.xp);
    const currentRank = getRank(studentData.xp);

    // Update XP bar fill
    const xpFill = document.querySelector('.xp-bar-fill, .xp-fill');
    if (xpFill) {
        xpFill.style.width = progress.percentage + '%';
    }

    // Update XP value display
    const xpValue = document.querySelector('.xp-progress-value');
    if (xpValue) {
        xpValue.textContent =
            `${studentData.xp.toLocaleString()} / ` +
            `${progress.nextRank
                ? progress.nextRank.minXP.toLocaleString()
                : '∞'} XP`;
    }

    // Update rank name
    const rankName = document.querySelector('.rank-name');
    if (rankName) {
        rankName.textContent = currentRank.name.toUpperCase();
        rankName.style.color = currentRank.color;
    }

    // Update rank next label
    const rankNext = document.querySelector('.rank-next');
    if (rankNext && progress.nextRank) {
        rankNext.textContent =
            `Next: ${progress.nextRank.name} — ${progress.needed} XP away`;
    }

    // Update XP hint
    const xpHint = document.querySelector('.xp-progress-footer span:last-child');
    if (xpHint && progress.nextRank) {
        xpHint.textContent = `${progress.needed} XP to ${progress.nextRank.name}`;
    }

    // Update stat card XP
    const statXP = document.querySelector('.stat-card-value');
    if (statXP) {
        statXP.textContent = studentData.xp.toLocaleString();
    }

    console.log(`📊 Rank: ${currentRank.name} | Progress: ${progress.percentage}%`);
}

/* ────────────────────────────────────────
   FUNCTION: showXPToast
   Shows a temporary XP gain notification
──────────────────────────────────────── */
function showXPToast(amount) {
    // Remove any existing toast
    const existingToast = document.querySelector('.xp-toast');
    if (existingToast) existingToast.remove();

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.innerHTML = `
    <span class="xp-toast-icon">⚡</span>
    <span class="xp-toast-amount">+${amount} XP</span>
  `;

    document.body.appendChild(toast);

    // Remove after 2.5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/* ────────────────────────────────────────
   FUNCTION: showRankUpBanner
   Shows celebration when rank increases
──────────────────────────────────────── */
function showRankUpBanner(newRank) {
    // Remove existing banner
    const existing = document.querySelector('.level-up-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'level-up-banner';
    banner.innerHTML = `
    <span class="level-up-icon">${newRank.icon}</span>
    <div class="level-up-label">Rank Unlocked</div>
    <div class="level-up-rank">${newRank.name.toUpperCase()}</div>
    <p class="level-up-desc">
      You have reached ${newRank.name} rank.
      Keep forging your knowledge.
    </p>
    <button class="btn-primary" onclick="this.closest('.level-up-banner').remove()">
      ⚡ Continue
    </button>
  `;

    document.body.appendChild(banner);
}

/* ────────────────────────────────────────
   FUNCTION: updateStreakDisplay
   Updates streak counter on dashboard
──────────────────────────────────────── */
function updateStreakDisplay() {
    const streakCount = document.querySelector('.streak-count');
    if (streakCount) {
        streakCount.textContent = studentData.streak;
    }

    const streakBest = document.querySelector('.streak-best div:first-child');
    if (streakBest) {
        streakBest.textContent = `Best: ${studentData.bestStreak} days`;
    }

    // Update streak stat card
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const icon = card.querySelector('.stat-card-icon');
        const value = card.querySelector('.stat-card-value');
        if (icon && icon.textContent === '🔥' && value) {
            value.textContent = studentData.streak;
        }
    });
}

/* ────────────────────────────────────────
   INITIALISE ON PAGE LOAD
──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    // Update all displays with current student data
    updateXPDisplay();
    updateStreakDisplay();

    // Test the system — remove this in production
    console.log('📊 Student Data:', studentData);
    console.log('🏆 Current Rank:', getRank(studentData.xp));
    console.log('📈 XP Progress:', getXPProgress(studentData.xp));

});