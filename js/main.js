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
   SHADOWFORGE DATA STRUCTURE
   Day 27 — Complete course and topic data
   This is the single source of truth for
   all platform content.
   ============================================ */

const SHADOWFORGE_DATA = {

    /* ────────────────────────────────────────
       COURSES
    ──────────────────────────────────────── */
    courses: [
        {
            id: 'microeconomics',
            name: 'Microeconomics',
            icon: '📈',
            status: 'active',
            subjectColor: 'var(--subject-micro-color)',
            description: 'Master how markets, prices, and decisions work.',
            rank: 'Scholar',
            rankClass: 'rank-badge-scholar',
            level: 3,
            topics: [
                {
                    id: 'intro-economics',
                    title: 'Introduction to Economics',
                    status: 'completed',
                    xpReward: 100,
                    xpEarned: 100
                },
                {
                    id: 'scarcity-choice',
                    title: 'Scarcity & Choice',
                    status: 'completed',
                    xpReward: 120,
                    xpEarned: 120
                },
                {
                    id: 'opportunity-cost',
                    title: 'Opportunity Cost',
                    status: 'completed',
                    xpReward: 100,
                    xpEarned: 100
                },
                {
                    id: 'production-possibilities',
                    title: 'Production Possibilities',
                    status: 'completed',
                    xpReward: 150,
                    xpEarned: 150
                },
                {
                    id: 'demand-supply',
                    title: 'Demand & Supply',
                    status: 'active',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'price-elasticity',
                    title: 'Price Elasticity',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'consumer-behaviour',
                    title: 'Consumer Behaviour',
                    status: 'locked',
                    xpReward: 220,
                    xpEarned: 0
                },
                {
                    id: 'market-structures',
                    title: 'Market Structures',
                    status: 'locked',
                    xpReward: 240,
                    xpEarned: 0
                },
                {
                    id: 'market-failure',
                    title: 'Market Failure',
                    status: 'locked',
                    xpReward: 260,
                    xpEarned: 0
                },
                {
                    id: 'government-intervention',
                    title: 'Government Intervention',
                    status: 'locked',
                    xpReward: 280,
                    xpEarned: 0
                }
            ]
        },
        {
            id: 'statistics',
            name: 'Statistics',
            icon: '📊',
            status: 'active',
            subjectColor: 'var(--subject-stats-color)',
            description: 'Understand data, probability, and statistical thinking.',
            rank: 'Apprentice',
            rankClass: 'rank-badge-apprentice',
            level: 1,
            topics: [
                {
                    id: 'intro-statistics',
                    title: 'Introduction to Statistics',
                    status: 'completed',
                    xpReward: 100,
                    xpEarned: 100
                },
                {
                    id: 'data-types',
                    title: 'Types of Data',
                    status: 'locked',
                    xpReward: 120,
                    xpEarned: 0
                },
                {
                    id: 'central-tendency',
                    title: 'Measures of Central Tendency',
                    status: 'locked',
                    xpReward: 150,
                    xpEarned: 0
                },
                {
                    id: 'dispersion',
                    title: 'Measures of Dispersion',
                    status: 'locked',
                    xpReward: 150,
                    xpEarned: 0
                },
                {
                    id: 'probability',
                    title: 'Introduction to Probability',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'distributions',
                    title: 'Probability Distributions',
                    status: 'locked',
                    xpReward: 220,
                    xpEarned: 0
                },
                {
                    id: 'sampling',
                    title: 'Sampling Methods',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'hypothesis-testing',
                    title: 'Hypothesis Testing',
                    status: 'locked',
                    xpReward: 250,
                    xpEarned: 0
                },
                {
                    id: 'correlation',
                    title: 'Correlation & Regression',
                    status: 'locked',
                    xpReward: 260,
                    xpEarned: 0
                },
                {
                    id: 'chi-square',
                    title: 'Chi-Square Tests',
                    status: 'locked',
                    xpReward: 280,
                    xpEarned: 0
                },
                {
                    id: 'statistical-inference',
                    title: 'Statistical Inference',
                    status: 'locked',
                    xpReward: 300,
                    xpEarned: 0
                },
                {
                    id: 'data-presentation',
                    title: 'Data Presentation',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                }
            ]
        },
        {
            id: 'financial-accounting',
            name: 'Financial Accounting',
            icon: '💼',
            status: 'active',
            subjectColor: 'var(--subject-accounting-color)',
            description: 'Learn to record, report, and analyse financial data.',
            rank: 'Apprentice',
            rankClass: 'rank-badge-apprentice',
            level: 1,
            topics: [
                {
                    id: 'intro-accounting',
                    title: 'Introduction to Accounting',
                    status: 'active',
                    xpReward: 100,
                    xpEarned: 0
                },
                {
                    id: 'accounting-equation',
                    title: 'The Accounting Equation',
                    status: 'locked',
                    xpReward: 120,
                    xpEarned: 0
                },
                {
                    id: 'double-entry',
                    title: 'Double Entry Bookkeeping',
                    status: 'locked',
                    xpReward: 150,
                    xpEarned: 0
                },
                {
                    id: 'trial-balance',
                    title: 'Trial Balance',
                    status: 'locked',
                    xpReward: 160,
                    xpEarned: 0
                },
                {
                    id: 'income-statement',
                    title: 'Income Statement',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'balance-sheet',
                    title: 'Balance Sheet',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'cash-flow',
                    title: 'Cash Flow Statement',
                    status: 'locked',
                    xpReward: 220,
                    xpEarned: 0
                },
                {
                    id: 'depreciation',
                    title: 'Depreciation',
                    status: 'locked',
                    xpReward: 180,
                    xpEarned: 0
                }
            ]
        },
        {
            id: 'business-law',
            name: 'Business Law',
            icon: '⚖️',
            status: 'active',
            subjectColor: 'var(--subject-law-color)',
            description: 'Understand the legal framework of business operations.',
            rank: 'Apprentice',
            rankClass: 'rank-badge-apprentice',
            level: 1,
            topics: [
                {
                    id: 'intro-law',
                    title: 'Introduction to Business Law',
                    status: 'active',
                    xpReward: 100,
                    xpEarned: 0
                },
                {
                    id: 'contract-law',
                    title: 'Contract Law',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'law-of-tort',
                    title: 'Law of Tort',
                    status: 'locked',
                    xpReward: 180,
                    xpEarned: 0
                },
                {
                    id: 'company-law',
                    title: 'Company Law',
                    status: 'locked',
                    xpReward: 220,
                    xpEarned: 0
                },
                {
                    id: 'employment-law',
                    title: 'Employment Law',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'intellectual-property',
                    title: 'Intellectual Property',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'consumer-protection',
                    title: 'Consumer Protection Law',
                    status: 'locked',
                    xpReward: 180,
                    xpEarned: 0
                },
                {
                    id: 'dispute-resolution',
                    title: 'Dispute Resolution',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'international-trade-law',
                    title: 'International Trade Law',
                    status: 'locked',
                    xpReward: 250,
                    xpEarned: 0
                }
            ]
        },
        {
            id: 'org-behavior',
            name: 'Organizational Behavior',
            icon: '🏢',
            status: 'active',
            subjectColor: 'var(--subject-org-color)',
            description: 'Understand how people and groups behave in organisations.',
            rank: 'Apprentice',
            rankClass: 'rank-badge-apprentice',
            level: 1,
            topics: [
                {
                    id: 'intro-org',
                    title: 'Introduction to OB',
                    status: 'active',
                    xpReward: 100,
                    xpEarned: 0
                },
                {
                    id: 'individual-behaviour',
                    title: 'Individual Behaviour',
                    status: 'locked',
                    xpReward: 150,
                    xpEarned: 0
                },
                {
                    id: 'motivation',
                    title: 'Motivation Theories',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'group-dynamics',
                    title: 'Group Dynamics',
                    status: 'locked',
                    xpReward: 180,
                    xpEarned: 0
                },
                {
                    id: 'leadership',
                    title: 'Leadership Styles',
                    status: 'locked',
                    xpReward: 220,
                    xpEarned: 0
                },
                {
                    id: 'organisational-culture',
                    title: 'Organisational Culture',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                },
                {
                    id: 'conflict-management',
                    title: 'Conflict Management',
                    status: 'locked',
                    xpReward: 200,
                    xpEarned: 0
                }
            ]
        }
    ],

    /* ────────────────────────────────────────
       COMING SOON COURSES
    ──────────────────────────────────────── */
    comingSoon: [
        {
            id: 'macroeconomics',
            name: 'Macroeconomics',
            icon: '📉',
            status: 'coming-soon'
        },
        {
            id: 'research-methods',
            name: 'Research Methods',
            icon: '🔬',
            status: 'coming-soon'
        },
        {
            id: 'corporate-finance',
            name: 'Corporate Finance',
            icon: '💹',
            status: 'coming-soon'
        }
    ]
};

/* ────────────────────────────────────────
   HELPER FUNCTIONS
   Useful operations on the data
──────────────────────────────────────── */

// Get a course by its ID
function getCourse(courseId) {
    return SHADOWFORGE_DATA.courses.find(c => c.id === courseId);
}

// Get progress percentage for a course
function getCourseProgress(courseId) {
    const course = getCourse(courseId);
    if (!course) return 0;

    const completed = course.topics.filter(
        t => t.status === 'completed'
    ).length;

    return Math.round((completed / course.topics.length) * 100);
}

// Get total XP earned across all courses
function getTotalXPEarned() {
    return SHADOWFORGE_DATA.courses.reduce((total, course) => {
        const courseXP = course.topics.reduce((sum, topic) => {
            return sum + topic.xpEarned;
        }, 0);
        return total + courseXP;
    }, 0);
}

// Get total completed topics across all courses
function getTotalCompletedTopics() {
    return SHADOWFORGE_DATA.courses.reduce((total, course) => {
        return total + course.topics.filter(
            t => t.status === 'completed'
        ).length;
    }, 0);
}

// Get the active topic for a course
function getActiveTopic(courseId) {
    const course = getCourse(courseId);
    if (!course) return null;
    return course.topics.find(t => t.status === 'active');
}

// Mark a topic as complete and unlock the next one
function completeTopic(courseId, topicId) {
    const course = getCourse(courseId);
    if (!course) return;

    const topicIndex = course.topics.findIndex(t => t.id === topicId);
    if (topicIndex === -1) return;

    // Mark current topic complete
    course.topics[topicIndex].status = 'completed';
    course.topics[topicIndex].xpEarned =
        course.topics[topicIndex].xpReward;

    // Unlock next topic if it exists
    if (topicIndex + 1 < course.topics.length) {
        course.topics[topicIndex + 1].status = 'active';
    }

    // Award XP
    const xpEarned = course.topics[topicIndex].xpReward;
    addXP(xpEarned, `Completed: ${course.topics[topicIndex].title}`);

    console.log(`✅ Topic complete: ${course.topics[topicIndex].title}`);
    console.log(`🔓 Unlocked: ${course.topics[topicIndex + 1]?.title}`);
}


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