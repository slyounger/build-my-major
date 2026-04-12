// Build My Major — App Logic

let selectedBuildYear = null;
let selectedExploreYear = null;
let selectedInterests = [];
let selectedExploreInterests = [];
let currentPath = null;

// --- Screen Navigation ---

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

function startPath(path) {
    currentPath = path;
    selectedInterests = [];
    selectedExploreInterests = [];
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.rank-badge').forEach(b => b.remove());
    if (path === 'build') {
        showScreen('quiz-build');
        document.getElementById('build-q1').style.display = 'block';
        document.getElementById('build-q2').style.display = 'none';
        document.getElementById('buildProgressFill').style.width = '50%';
        document.getElementById('buildProgressText').textContent = 'Step 1 of 2';
    } else {
        showScreen('quiz-explore');
        document.getElementById('explore-q1').style.display = 'block';
        document.getElementById('explore-q2').style.display = 'none';
        document.getElementById('exploreProgressFill').style.width = '50%';
        document.getElementById('exploreProgressText').textContent = 'Step 1 of 2';
    }
}

// --- BUILD PATH Navigation ---

function buildNext(from) {
    if (from === 1) {
        const name = document.getElementById('buildName').value.trim();
        if (!name) { shakeInput('buildName'); return; }
        if (!selectedBuildYear) { return; }

        document.getElementById('build-q1').style.display = 'none';
        document.getElementById('build-q2').style.display = 'block';
        document.getElementById('buildProgressFill').style.width = '100%';
        document.getElementById('buildProgressText').textContent = 'Step 2 of 2';
    }
}

function buildBack(from) {
    if (from === 2) {
        document.getElementById('build-q2').style.display = 'none';
        document.getElementById('build-q1').style.display = 'block';
        document.getElementById('buildProgressFill').style.width = '50%';
        document.getElementById('buildProgressText').textContent = 'Step 1 of 2';
    }
}

// --- EXPLORE PATH Navigation ---

function exploreNext(from) {
    if (from === 1) {
        const name = document.getElementById('exploreName').value.trim();
        if (!name) { shakeInput('exploreName'); return; }
        const major = document.getElementById('exploreMajor').value;
        if (!major) { shakeInput('exploreMajor'); return; }
        if (major === 'other' && !document.getElementById('exploreMajorOtherText').value.trim()) {
            shakeInput('exploreMajorOtherText'); return;
        }
        if (!selectedExploreYear) { return; }

        document.getElementById('explore-q1').style.display = 'none';
        document.getElementById('explore-q2').style.display = 'block';
        document.getElementById('exploreProgressFill').style.width = '100%';
        document.getElementById('exploreProgressText').textContent = 'Step 2 of 2';
    }
}

function exploreBack(from) {
    if (from === 2) {
        document.getElementById('explore-q2').style.display = 'none';
        document.getElementById('explore-q1').style.display = 'block';
        document.getElementById('exploreProgressFill').style.width = '50%';
        document.getElementById('exploreProgressText').textContent = 'Step 1 of 2';
    }
}

// --- Selection Handlers ---

function selectSingle(btn, type) {
    btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    if (type === 'buildYear') selectedBuildYear = btn.dataset.value;
    if (type === 'exploreYear') selectedExploreYear = btn.dataset.value;
}

function toggleInterest(btn) {
    const value = btn.dataset.value;
    if (btn.classList.contains('selected')) {
        // Deselect and remove from list
        btn.classList.remove('selected');
        btn.querySelector('.rank-badge')?.remove();
        selectedInterests = selectedInterests.filter(i => i !== value);
        // Re-number remaining
        updateRankBadges('#build-q2', selectedInterests);
    } else {
        if (selectedInterests.length >= 3) {
            // Remove the last one to make room
            const lastValue = selectedInterests.pop();
            const lastBtn = document.querySelector('#build-q2 .interest-btn[data-value="' + lastValue + '"]');
            lastBtn.classList.remove('selected');
            lastBtn.querySelector('.rank-badge')?.remove();
        }
        btn.classList.add('selected');
        selectedInterests.push(value);
        updateRankBadges('#build-q2', selectedInterests);
    }
    // Show/hide Other text field
    const otherField = document.getElementById('interestOtherField');
    otherField.style.display = selectedInterests.includes('other') ? 'block' : 'none';
    // Reset hint
    const hint = document.getElementById('build-q2').querySelector('.question-hint');
    if (hint) { hint.textContent = 'Rank your top 3 — click in order of importance (1st = most important)'; hint.style.color = ''; }
}

function toggleExploreInterest(btn) {
    const value = btn.dataset.value;
    if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        btn.querySelector('.rank-badge')?.remove();
        selectedExploreInterests = selectedExploreInterests.filter(i => i !== value);
        updateRankBadges('#explore-q2', selectedExploreInterests);
    } else {
        if (selectedExploreInterests.length >= 3) {
            const lastValue = selectedExploreInterests.pop();
            const lastBtn = document.querySelector('#explore-q2 .interest-btn[data-value="' + lastValue + '"]');
            lastBtn.classList.remove('selected');
            lastBtn.querySelector('.rank-badge')?.remove();
        }
        btn.classList.add('selected');
        selectedExploreInterests.push(value);
        updateRankBadges('#explore-q2', selectedExploreInterests);
    }
    // Show/hide Other text field
    const otherField = document.getElementById('exploreInterestOtherField');
    otherField.style.display = selectedExploreInterests.includes('other') ? 'block' : 'none';
    // Reset hint
    const hint = document.getElementById('explore-q2').querySelector('.question-hint');
    if (hint) { hint.textContent = 'Rank your top 3 — click in order of importance (1st = most important)'; hint.style.color = ''; }
}

function updateRankBadges(containerSelector, interests) {
    // Remove all existing badges in container
    document.querySelectorAll(containerSelector + ' .rank-badge').forEach(b => b.remove());
    // Add new badges
    interests.forEach((value, idx) => {
        const btn = document.querySelector(containerSelector + ' .interest-btn[data-value="' + value + '"]');
        if (btn) {
            const badge = document.createElement('span');
            badge.className = 'rank-badge';
            badge.textContent = (idx + 1);
            btn.prepend(badge);
        }
    });
}

// --- Dropdown Other handlers ---

document.getElementById('buildSecondaryMajor').addEventListener('change', function() {
    document.getElementById('buildSecondaryMajorOther').style.display =
        this.value === 'other' ? 'block' : 'none';
});

document.getElementById('exploreMajor').addEventListener('change', function() {
    document.getElementById('exploreMajorOther').style.display =
        this.value === 'other' ? 'block' : 'none';
});

// --- BUILD RESULTS ---

function generateBuildResults() {
    if (selectedInterests.length < 2) {
        const hint = document.getElementById('build-q2').querySelector('.question-hint');
        hint.textContent = 'Please rank at least 2';
        hint.style.color = '#c0392b';
        return;
    }

    const name = document.getElementById('buildName').value.trim();
    const secondaryMajor = getBuildSecondaryMajor();

    // Score courses based on ranked interests
    const scores = getInterestCourses(selectedInterests);

    // Pick thematic based on #1 ranked interest
    const thematicForInterest = {
        start_own: 'SEVI 44303',
        products_ideas: 'SEVI 32303',
        social_impact: 'SEVI 36703',
        money_funding: 'SEVI 44303',
        marketing: 'SEVI 32303',
        leadership: 'SEVI 32303',
        outdoors: 'SEVI 44303',
        global: 'SEVI 36703',
        operations: 'SEVI 32303',
        numbers: 'SEVI 44303',
        other: 'SEVI 44303'
    };
    const thematic = thematicForInterest[selectedInterests[0]] || 'SEVI 44303';

    // Identify double-count courses for secondary major
    const doubleCounts = (secondaryMajor && DOUBLE_COUNT[secondaryMajor]) ? DOUBLE_COUNT[secondaryMajor] : [];

    // Pick Group 1 — force in any double-count courses, fill remaining with top track-matched
    const group1DoubleCounts = doubleCounts.filter(c => COURSES[c] && COURSES[c].groups.includes('group1') && c !== thematic);
    const group1Remaining = Object.keys(COURSES)
        .filter(c => COURSES[c].groups.includes('group1') && c !== thematic && !group1DoubleCounts.includes(c))
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, 3 - group1DoubleCounts.length);
    const group1 = [...group1DoubleCounts, ...group1Remaining];

    // Pick Group 2 — force in any double-count courses, fill remaining with top track-matched
    const group2DoubleCounts = doubleCounts.filter(c => COURSES[c] && COURSES[c].groups.includes('group2'));
    const group2Remaining = Object.keys(COURSES)
        .filter(c => COURSES[c].groups.includes('group2') && !group2DoubleCounts.includes(c))
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, Math.max(0, 3 - group2DoubleCounts.length));
    const group2 = [...group2DoubleCounts, ...group2Remaining];

    // Alternatives — next best courses not already selected
    const selected = new Set([thematic, ...group1, ...group2, "SEVI 39303"]);
    const alternatives = Object.keys(COURSES)
        .filter(c => !selected.has(c) && (scores[c] || 0) > 0)
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, 3);

    // Narrative
    const narrative = buildNarrative(name, selectedInterests, secondaryMajor);

    // Thematic core explanation
    const thematicExplanations = {
        'SEVI 44303': 'Based on your interests, Small Enterprise Management is your best thematic fit — it focuses on the practical challenges of starting and running a business.',
        'SEVI 32303': 'Based on your interests, Corporate Innovation is your best thematic fit — it focuses on how established companies innovate, fail, and succeed.',
        'SEVI 36703': 'Based on your interests, Social Entrepreneurship is your best thematic fit — it explores how to build ventures that create social value alongside economic value.'
    };

    // Render
    document.getElementById('buildResultsNarrative').innerHTML = '<p>' + narrative + '</p>';
    document.getElementById('buildResultsRequired').innerHTML = renderCourseItem('SEVI 39303', secondaryMajor);
    document.getElementById('buildThematicExplanation').textContent = thematicExplanations[thematic] || '';
    document.getElementById('buildResultsThematic').innerHTML = renderCourseItem(thematic, secondaryMajor);
    document.getElementById('buildResultsGroup1').innerHTML = group1.map(c => renderCourseItem(c, secondaryMajor)).join('');
    document.getElementById('buildResultsGroup2').innerHTML = group2.map(c => renderCourseItem(c, secondaryMajor)).join('');

    if (alternatives.length > 0) {
        document.getElementById('buildAlternativesSection').style.display = 'block';
        document.getElementById('buildResultsAlternatives').innerHTML = alternatives.map(c => renderCourseItem(c, secondaryMajor)).join('');
    }

    // Career report
    const careerReport = buildCareerReport(selectedInterests);
    document.getElementById('buildCareerReport').textContent = careerReport;

    // OEI recommendations
    const oeiRecs = getOEIRecommendations(selectedInterests);
    document.getElementById('buildResultsOEI').innerHTML = oeiRecs.map(renderOEIItem).join('');

    showScreen('results-build');
}

// --- EXPLORE RESULTS ---

function generateExploreResults() {
    if (selectedExploreInterests.length < 2) {
        const hint = document.getElementById('explore-q2').querySelector('.question-hint');
        hint.textContent = 'Please rank at least 2';
        hint.style.color = '#c0392b';
        return;
    }

    const name = document.getElementById('exploreName').value.trim();
    const currentMajor = getExploreMajor();

    // Find overlapping courses
    const overlaps = (DOUBLE_COUNT[currentMajor] || []);

    // Score courses based on ranked interests
    const scores = getInterestCourses(selectedExploreInterests);

    // Top recommended based on interests
    const recommended = Object.keys(COURSES)
        .filter(c => (scores[c] || 0) > 0 && c !== 'SEVI 39303')
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, 5);

    // Pick thematic based on #1 ranked interest
    const thematicForInterest = {
        start_own: 'SEVI 44303',
        products_ideas: 'SEVI 32303',
        social_impact: 'SEVI 36703',
        money_funding: 'SEVI 44303',
        marketing: 'SEVI 32303',
        leadership: 'SEVI 32303',
        outdoors: 'SEVI 44303',
        global: 'SEVI 36703',
        operations: 'SEVI 32303',
        numbers: 'SEVI 44303',
        other: 'SEVI 44303'
    };
    const thematic = thematicForInterest[selectedExploreInterests[0]] || 'SEVI 44303';

    const thematicExplanations = {
        'SEVI 44303': 'Small Enterprise Management — focuses on the practical challenges of starting and running a business.',
        'SEVI 32303': 'Corporate Innovation — focuses on how established companies innovate, fail, and succeed.',
        'SEVI 36703': 'Social Entrepreneurship — explores building ventures that create social value alongside economic value.'
    };

    // Build narrative using the same combo logic as Build path
    const narrative = buildNarrative(name, selectedExploreInterests, currentMajor);
    let exploreExtra = '';

    if (overlaps.length > 0) {
        exploreExtra = ' Great news — ' + overlaps.length + ' course' + (overlaps.length > 1 ? 's' : '') + ' from your ' + currentMajor + ' major can double-count toward SEVI, so you\'re not starting from zero.';
    }

    // Render
    document.getElementById('exploreResultsNarrative').innerHTML = '<p>' + narrative + exploreExtra + '</p>';

    // Overlap section
    if (overlaps.length > 0) {
        document.getElementById('exploreOverlapSection').style.display = 'block';
        document.getElementById('exploreResultsOverlap').innerHTML = overlaps.map(c => renderCourseItem(c, currentMajor)).join('');
    } else {
        document.getElementById('exploreOverlapSection').style.display = 'none';
    }

    // Core SEVI requirements — single thematic recommendation
    const coreHTML = renderCourseItem('SEVI 39303', currentMajor);
    document.getElementById('exploreResultsCourses').innerHTML =
        '<p class="section-hint" style="margin-bottom:8px"><strong>Required:</strong></p>' + coreHTML +
        '<p class="section-hint" style="margin-top:16px; margin-bottom:8px"><strong>Recommended Thematic Core:</strong> ' + (thematicExplanations[thematic] || '') + '</p>' +
        renderCourseItem(thematic, currentMajor);

    // Interest-based recommendations — filter out rotating courses and already-shown courses
    const alreadyShown = new Set(['SEVI 39303', thematic, ...overlaps]);
    const filteredRecommended = recommended.filter(c => !alreadyShown.has(c));
    document.getElementById('exploreResultsRecommended').innerHTML = filteredRecommended.map(c => renderCourseItem(c, currentMajor)).join('');

    // OEI recommendations
    const oeiRecs = getOEIRecommendations(selectedExploreInterests);
    document.getElementById('exploreResultsOEI').innerHTML = oeiRecs.map(renderOEIItem).join('');

    showScreen('results-explore');
}

// --- Helpers ---

function getBuildSecondaryMajor() {
    const val = document.getElementById('buildSecondaryMajor').value;
    if (!val || val === '') return null;
    if (val === 'other') return document.getElementById('buildSecondaryMajorOtherText').value.trim() || null;
    return val;
}

function getExploreMajor() {
    const val = document.getElementById('exploreMajor').value;
    if (val === 'other') return document.getElementById('exploreMajorOtherText').value.trim();
    return val;
}

function buildNarrative(name, interests, secondaryMajor) {
    // Build a cohesive story based on the COMBINATION of interests, not just listing them
    const comboPhrases = {
        // Two-interest combos that tell a story
        'start_own+money_funding': 'You want to build your own venture and you know that understanding money — how to raise it, manage it, and grow it — is what separates ideas that launch from ideas that stall. This course set gives you both the startup toolkit and the financial fluency to fund and sustain what you build.',
        'start_own+marketing': 'You want to build your own thing, and you get that a great product means nothing if nobody buys it. This set pairs startup fundamentals with deep marketing and consumer insight so you\'re not just building — you\'re building something people actually want.',
        'start_own+leadership': 'You want to build something of your own and lead the team that makes it happen. This course set gives you the venture-building fundamentals alongside the people skills — hiring, managing, motivating — that turn a solo idea into a real organization.',
        'start_own+global': 'You want to build a venture and you\'re thinking bigger than your backyard. This set gives you startup fundamentals with a global lens — understanding international markets, cross-cultural strategy, and how to scale beyond borders.',
        'start_own+operations': 'You want to build a business and you care about how it actually runs day to day. This set pairs venture-building with the operational backbone — supply chain, procurement, logistics — that turns a concept into a functioning company.',
        'start_own+numbers': 'You want to start something and you want to understand the numbers behind it — not just revenue, but tax implications, legal structures, and financial reporting. This is a smart, practical combination.',
        'products_ideas+marketing': 'You love the process of bringing new things to life, and you want to make sure they land with real customers. This set connects product innovation with consumer insight and brand strategy — the full pipeline from idea to market.',
        'products_ideas+leadership': 'You\'re drawn to innovation and you want to lead the teams that make it happen. This set builds your product development skills alongside organizational leadership — the combination that defines product managers and innovation leads.',
        'social_impact+global': 'You want to make a difference, and you see that as a global challenge. This set connects social entrepreneurship with international strategy — preparing you to build organizations that create impact across borders.',
        'social_impact+leadership': 'You care about impact and you want to lead organizations that deliver it. This pairs social entrepreneurship with the people and change management skills that mission-driven leaders need.',
        'marketing+global': 'You\'re fascinated by what makes people buy, and you see that playing out differently across cultures and markets. This set deepens your consumer insight while building your global marketing strategy toolkit.',
        'leadership+operations': 'You want to lead organizations and you care about how they actually work. This pairs people leadership with operational strategy — the combination that defines strong general managers.',
    };

    // Try to find a combo phrase
    let text = 'Hey ' + name + '! ';
    const key12 = interests[0] + '+' + interests[1];
    const key21 = interests[1] + '+' + interests[0];
    const comboPhrase = comboPhrases[key12] || comboPhrases[key21];

    if (comboPhrase) {
        text += comboPhrase;
        if (interests[2]) {
            const thirdDesc = {
                start_own: 'an entrepreneurial drive',
                products_ideas: 'a passion for product innovation',
                social_impact: 'a commitment to social impact',
                money_funding: 'financial acumen',
                marketing: 'marketing savvy',
                leadership: 'leadership ambitions',
                outdoors: 'a connection to the outdoor industry',
                global: 'a global perspective',
                operations: 'operational thinking',
                numbers: 'a head for numbers and legal detail',
                other: 'unique additional interests'
            };
            text += ' We\'ve also woven in courses that reflect ' + (thirdDesc[interests[2]] || 'your additional interests') + '.';
        }
    } else {
        // Fallback: build from individual descriptions
        const desc = {
            start_own: 'you want to build something of your own',
            products_ideas: 'you\'re energized by turning ideas into real products',
            social_impact: 'making a meaningful difference matters deeply to you',
            money_funding: 'you want to understand how money and deals work',
            marketing: 'you\'re curious about what drives people to buy',
            leadership: 'you see yourself leading teams and shaping organizations',
            outdoors: 'the outdoor industry is where your passion meets your career',
            global: 'you\'re drawn to global business',
            operations: 'you\'re fascinated by how things actually get done behind the scenes',
            numbers: 'you want a solid grounding in the numbers side of business',
            other: 'you have interests that go beyond the typical paths'
        };
        const parts = interests.map(i => desc[i]).filter(Boolean);
        text += 'Based on what you told us, ' + parts[0];
        if (parts.length === 2) text += ', and ' + parts[1];
        else if (parts.length === 3) text += ', ' + parts[1] + ', and ' + parts[2];
        text += '. We\'ve built a course set that brings these interests together into a coherent major.';
    }

    if (secondaryMajor && DOUBLE_COUNT[secondaryMajor]) {
        text += ' Since you\'re also pursuing ' + secondaryMajor + ', we\'ve prioritized courses that count toward both majors — maximizing every credit hour.';
    }
    return text;
}

function renderCourseItem(code, otherMajor) {
    const course = COURSES[code];
    if (!course) return '';

    let badge = '';
    if (otherMajor && DOUBLE_COUNT[otherMajor] && DOUBLE_COUNT[otherMajor].includes(code)) {
        badge = '<span class="double-count">Also counts for ' + otherMajor + '</span>';
    }

    return '<div class="course-item" onclick="showPopover(\'' + code + '\')">' +
        '<div><div class="course-code">' + code + '</div>' +
        '<div class="course-name">' + course.title + '</div></div>' +
        badge + '</div>';
}

// --- Career Report ---

function buildCareerReport(interests) {
    const careerSkills = {
        start_own: 'evaluate new venture opportunities, build a business plan, and navigate the financial and legal challenges of launching a company. You\'ll be able to walk into investor meetings, accelerator applications, or your own garage startup with a real toolkit — not just enthusiasm.',
        products_ideas: 'lead product development from concept to launch. You\'ll understand design thinking, stage-gate processes, and how to test ideas with real consumers before going to market. Companies hiring for product management, innovation labs, and R&D roles look for exactly this.',
        social_impact: 'build and lead organizations that create measurable social impact alongside economic value. Whether it\'s a nonprofit, a B-corp, or a social venture, you\'ll understand how to make the case for doing well by doing good.',
        money_funding: 'speak the language of investors and lenders. You\'ll understand term sheets, venture valuation, financial markets, and risk — whether you\'re raising capital for your own venture or analyzing deals for someone else\'s.',
        marketing: 'understand why people buy what they buy and how to reach them. From consumer psychology to brand strategy to sales management, you\'ll have the toolkit for roles in brand management, digital marketing, sales leadership, and growth.',
        leadership: 'manage teams, navigate organizational change, and build talent systems. These are the skills that define general managers and future executives — not just what you know, but how you lead people through complexity.',
        outdoors: 'work at the intersection of business and the outdoor industry — from product innovation to company partnerships. Northwest Arkansas is a hub for this, and this coursework positions you for a growing sector with real local connections.',
        global: 'operate across cultures, navigate international business environments, and build strategies for global markets. In an increasingly connected economy, this perspective sets you apart from peers who only think domestically.',
        operations: 'optimize how businesses actually run — procurement, inventory, supply chain strategy. These skills are in high demand across every industry, and the analytical thinking transfers to consulting, operations management, and logistics leadership.',
        numbers: 'read financial statements, understand tax implications, navigate contracts, and make legally informed business decisions. This practical foundation strengthens every career path and makes you a more credible voice in any room.'
    };

    let report = 'With this combination of courses, you\'ll be prepared to ';
    const skills = interests.map(i => careerSkills[i]).filter(Boolean);

    if (skills.length === 1) {
        report += skills[0];
    } else if (skills.length === 2) {
        // Lead with #1 priority, add #2
        report += skills[0] + ' You\'ll also ' + skills[1].charAt(0).toLowerCase() + skills[1].slice(1);
    } else if (skills.length === 3) {
        report += skills[0] + ' You\'ll also ' + skills[1].charAt(0).toLowerCase() + skills[1].slice(1) + ' And with your interest in ' + getInterestLabel(interests[2]) + ', you\'ll ' + skills[2].charAt(0).toLowerCase() + skills[2].slice(1);
    }

    return report;
}

function getInterestLabel(interest) {
    const labels = {
        start_own: 'building your own venture',
        products_ideas: 'product innovation',
        social_impact: 'social impact',
        money_funding: 'finance and funding',
        marketing: 'marketing',
        leadership: 'leadership',
        outdoors: 'the outdoor industry',
        global: 'global business',
        operations: 'operations',
        numbers: 'the numbers side of business'
    };
    return labels[interest] || 'your additional interests';
}

// --- Email Report ---

function emailReport() {
    const name = currentPath === 'build'
        ? document.getElementById('buildName').value.trim()
        : document.getElementById('exploreName').value.trim();

    const resultsContainer = currentPath === 'build'
        ? document.getElementById('results-build')
        : document.getElementById('results-explore');

    // Build plain text version of the report
    let body = 'Build My Major — Your Personalized SEVI Report\n';
    body += '================================================\n\n';

    // Get narrative
    const narrativeEl = resultsContainer.querySelector('.results-narrative');
    if (narrativeEl) body += narrativeEl.textContent + '\n\n';

    // Get course sections
    const sections = resultsContainer.querySelectorAll('.results-section');
    sections.forEach(section => {
        const title = section.querySelector('h3');
        if (title) body += '--- ' + title.textContent + ' ---\n';
        const items = section.querySelectorAll('.course-item');
        items.forEach(item => {
            const code = item.querySelector('.course-code');
            const courseName = item.querySelector('.course-name');
            if (code && courseName) body += code.textContent + ': ' + courseName.textContent + '\n';
        });
        // OEI items
        const oeiItems = section.querySelectorAll('.oei-item');
        oeiItems.forEach(item => {
            const oeiName = item.querySelector('.oei-name');
            if (oeiName) body += '- ' + oeiName.textContent + '\n';
        });
        // Rotating note
        const rotatingNote = section.querySelector('.rotating-note');
        if (rotatingNote) body += rotatingNote.textContent + '\n';
        // Career report
        const careerP = section.querySelector('#buildCareerReport');
        if (careerP) body += careerP.textContent + '\n';
        body += '\n';
    });

    body += '\n---\nGenerated by Build My Major | SEVI | Walton College of Business\n';

    // Open mailto
    const subject = encodeURIComponent('My SEVI Major Plan — Build My Major');
    const encodedBody = encodeURIComponent(body);
    window.location.href = 'mailto:?subject=' + subject + '&body=' + encodedBody;
}

// --- OEI Programs ---

function getOEIRecommendations(interests) {
    const scores = {};
    interests.forEach((interest, idx) => {
        const weight = interests.length - idx;
        (OEI_MAP[interest] || []).forEach(id => {
            scores[id] = (scores[id] || 0) + weight;
        });
    });

    // Return top 4 unique programs
    return Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 4);
}

// Keep OEI_MAP for direct interest-to-program mapping (not track-based)
// since OEI programs don't map cleanly to the three academic tracks

function renderOEIItem(programId) {
    const program = OEI_PROGRAMS[programId];
    if (!program) return '';

    return '<a class="oei-item" href="' + program.url + '" target="_blank">' +
        '<div class="oei-name">' + program.title + '</div>' +
        '<div class="oei-desc">' + program.description + '</div>' +
        '</a>';
}

// --- Popover ---

function showPopover(code) {
    const course = COURSES[code];
    if (!course) return;

    document.getElementById('popoverTitle').textContent = code + ': ' + course.title;
    let body = '<p>' + course.description + '</p>';
    if (course.prereq) body += '<p class="prereq"><strong>Prerequisite:</strong> ' + course.prereq + '</p>';
    body += '<p class="prereq"><strong>Typically offered:</strong> ' + course.offered + '</p>';
    document.getElementById('popoverBody').innerHTML = body;

    let overlay = document.querySelector('.popover-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'popover-overlay';
        overlay.onclick = closePopover;
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'block';
    document.getElementById('coursePopover').style.display = 'block';
}

function closePopover() {
    document.getElementById('coursePopover').style.display = 'none';
    const overlay = document.querySelector('.popover-overlay');
    if (overlay) overlay.style.display = 'none';
}

// --- Reset ---

function retakeQuiz() {
    selectedBuildYear = null;
    selectedExploreYear = null;
    selectedInterests = [];
    selectedExploreInterests = [];
    currentPath = null;

    // Clear build inputs
    document.getElementById('buildName').value = '';
    document.getElementById('buildSecondaryMajor').value = '';
    document.getElementById('buildMinors').value = '';
    document.getElementById('buildAnythingElse').value = '';
    document.getElementById('buildSecondaryMajorOther').style.display = 'none';

    // Clear explore inputs
    document.getElementById('exploreName').value = '';
    document.getElementById('exploreMajor').value = '';
    document.getElementById('exploreMajorOther').style.display = 'none';

    // Clear all selections and rank badges
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.rank-badge').forEach(b => b.remove());
    document.getElementById('interestOtherField').style.display = 'none';
    document.getElementById('exploreInterestOtherField').style.display = 'none';
    document.getElementById('buildAlternativesSection').style.display = 'none';
    document.getElementById('exploreOverlapSection').style.display = 'none';

    showScreen('intro');
}

function showSequencing() {
    alert('Course sequencing coming soon! This will map your recommended courses into a semester-by-semester plan.');
}

// --- Utility ---

function shakeInput(id) {
    const el = document.getElementById(id);
    el.style.borderColor = '#c0392b';
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
}

const style = document.createElement('style');
style.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} } .shake{animation:shake .3s ease}';
document.head.appendChild(style);
