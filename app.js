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
        btn.classList.remove('selected');
        selectedInterests = selectedInterests.filter(i => i !== value);
    } else {
        if (selectedInterests.length >= 3) {
            const firstValue = selectedInterests.shift();
            document.querySelector('#build-q2 .interest-btn[data-value="' + firstValue + '"]').classList.remove('selected');
        }
        btn.classList.add('selected');
        selectedInterests.push(value);
    }
    // Show/hide Other text field
    const otherField = document.getElementById('interestOtherField');
    otherField.style.display = selectedInterests.includes('other') ? 'block' : 'none';
    // Reset hint
    const hint = document.getElementById('build-q2').querySelector('.question-hint');
    if (hint) { hint.textContent = 'Pick 2-3 that resonate'; hint.style.color = ''; }
}

function toggleExploreInterest(btn) {
    const value = btn.dataset.value;
    if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        selectedExploreInterests = selectedExploreInterests.filter(i => i !== value);
    } else {
        if (selectedExploreInterests.length >= 3) {
            const firstValue = selectedExploreInterests.shift();
            document.querySelector('#explore-q2 .interest-btn[data-value="' + firstValue + '"]').classList.remove('selected');
        }
        btn.classList.add('selected');
        selectedExploreInterests.push(value);
    }
    // Show/hide Other text field
    const otherField = document.getElementById('exploreInterestOtherField');
    otherField.style.display = selectedExploreInterests.includes('other') ? 'block' : 'none';
    // Reset hint
    const hint = document.getElementById('explore-q2').querySelector('.question-hint');
    if (hint) { hint.textContent = 'Pick 2-3 that resonate'; hint.style.color = ''; }
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
        hint.textContent = 'Please pick at least 2';
        hint.style.color = '#c0392b';
        return;
    }

    const name = document.getElementById('buildName').value.trim();
    const secondaryMajor = getBuildSecondaryMajor();

    // Score courses using track-based logic
    const scores = getInterestCourses(selectedInterests);

    // Pick thematic based on dominant track
    const thematicOptions = Object.keys(COURSES).filter(c => COURSES[c].groups.includes('thematic'));
    const thematic = thematicOptions.sort((a, b) => (scores[b] || 0) - (scores[a] || 0))[0];

    // Pick Group 1 — top 3 from track-matched courses
    const group1 = Object.keys(COURSES)
        .filter(c => COURSES[c].groups.includes('group1') && c !== thematic)
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, 3);

    // Pick Group 2 — boost double-counts for secondary major
    const group2 = Object.keys(COURSES)
        .filter(c => COURSES[c].groups.includes('group2'))
        .sort((a, b) => {
            let sa = scores[a] || 0, sb = scores[b] || 0;
            if (secondaryMajor && DOUBLE_COUNT[secondaryMajor]) {
                if (DOUBLE_COUNT[secondaryMajor].includes(a)) sa += 10;
                if (DOUBLE_COUNT[secondaryMajor].includes(b)) sb += 10;
            }
            return sb - sa;
        })
        .slice(0, 3);

    // Alternatives — next best courses not already selected
    const selected = new Set([thematic, ...group1, ...group2, "SEVI 39303"]);
    const alternatives = Object.keys(COURSES)
        .filter(c => !selected.has(c) && (scores[c] || 0) > 0)
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, 3);

    // Narrative
    const narrative = buildNarrative(name, selectedInterests, secondaryMajor);

    // Render
    document.getElementById('buildResultsNarrative').innerHTML = '<p>' + narrative + '</p>';
    document.getElementById('buildResultsRequired').innerHTML = renderCourseItem('SEVI 39303', secondaryMajor);
    document.getElementById('buildResultsThematic').innerHTML = renderCourseItem(thematic, secondaryMajor);
    document.getElementById('buildResultsGroup1').innerHTML = group1.map(c => renderCourseItem(c, secondaryMajor)).join('');
    document.getElementById('buildResultsGroup2').innerHTML = group2.map(c => renderCourseItem(c, secondaryMajor)).join('');

    if (alternatives.length > 0) {
        document.getElementById('buildAlternativesSection').style.display = 'block';
        document.getElementById('buildResultsAlternatives').innerHTML = alternatives.map(c => renderCourseItem(c, secondaryMajor)).join('');
    }

    // OEI recommendations
    const oeiRecs = getOEIRecommendations(selectedInterests);
    document.getElementById('buildResultsOEI').innerHTML = oeiRecs.map(renderOEIItem).join('');

    showScreen('results-build');
}

// --- EXPLORE RESULTS ---

function generateExploreResults() {
    if (selectedExploreInterests.length < 2) {
        const hint = document.getElementById('explore-q2').querySelector('.question-hint');
        hint.textContent = 'Please pick at least 2';
        hint.style.color = '#c0392b';
        return;
    }

    const name = document.getElementById('exploreName').value.trim();
    const currentMajor = getExploreMajor();

    // Find overlapping courses
    const overlaps = (DOUBLE_COUNT[currentMajor] || []);

    // Score courses using track-based logic
    const scores = getInterestCourses(selectedExploreInterests);

    // Top recommended based on interests
    const recommended = Object.keys(COURSES)
        .filter(c => (scores[c] || 0) > 0 && c !== 'SEVI 39303')
        .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
        .slice(0, 5);

    // Build narrative
    let narrative = `Hey ${name}! Here's what adding Innovation & Entrepreneurship (SEVI) to your ${currentMajor} degree could look like.`;
    narrative += ` The SEVI major requires 24 credit hours of major-specific courses: one required course, one thematic core, and six electives split across two groups.`;

    if (overlaps.length > 0) {
        narrative += ` Great news — ${overlaps.length} course${overlaps.length > 1 ? 's' : ''} from your ${currentMajor} major can double-count toward SEVI, so you're not starting from zero.`;
    }

    // Render
    document.getElementById('exploreResultsNarrative').innerHTML = '<p>' + narrative + '</p>';

    // Overlap section
    if (overlaps.length > 0) {
        document.getElementById('exploreOverlapSection').style.display = 'block';
        document.getElementById('exploreResultsOverlap').innerHTML = overlaps.map(c => renderCourseItem(c, currentMajor)).join('');
    } else {
        document.getElementById('exploreOverlapSection').style.display = 'none';
    }

    // Core SEVI requirements
    const coreHTML = renderCourseItem('SEVI 39303', currentMajor);
    const thematicHTML = ['SEVI 32303', 'SEVI 36703', 'SEVI 44303'].map(c =>
        renderCourseItem(c, currentMajor)
    ).join('');
    document.getElementById('exploreResultsCourses').innerHTML =
        '<p class="section-hint" style="margin-bottom:8px"><strong>Required:</strong></p>' + coreHTML +
        '<p class="section-hint" style="margin-top:16px; margin-bottom:8px"><strong>Thematic Core (pick 1):</strong></p>' + thematicHTML;

    // Interest-based recommendations
    document.getElementById('exploreResultsRecommended').innerHTML = recommended.map(c => renderCourseItem(c, currentMajor)).join('');

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
    const desc = {
        start_own: "you're someone with an entrepreneurial drive who wants to build something of your own",
        products_ideas: "you're energized by the process of turning ideas into real products",
        social_impact: "making a meaningful difference in the world matters deeply to you",
        money_funding: "you want to understand the financial engine behind businesses and deals",
        marketing: "you're curious about what drives people to buy and how brands connect with customers",
        leadership: "you see yourself leading teams and shaping how organizations work",
        outdoors: "the outdoor industry is where your passion and career ambitions meet",
        global: "you're drawn to the complexity and opportunity of global business",
        operations: "you're fascinated by the systems and logistics that make businesses run",
        numbers: "you want a solid grounding in the numbers side of business — accounting, tax, and law",
        other: "you have unique interests that go beyond the typical tracks"
    };

    const careerPrep = {
        start_own: "evaluate new venture opportunities, build business plans, and navigate the early stages of launching a company",
        products_ideas: "lead product development from ideation through launch — skills that companies like P&G, startups, and innovation labs actively recruit for",
        social_impact: "build and lead mission-driven organizations, measure social impact, and make the case for sustainable business practices",
        money_funding: "speak the language of investors, evaluate deals, and understand how startups get funded — critical whether you're raising capital or deploying it",
        marketing: "understand customer behavior, build brand strategy, and communicate value — skills that translate to roles in brand management, sales, and growth",
        leadership: "manage teams, navigate organizational change, and develop talent — the foundations of general management and executive leadership",
        outdoors: "work at the intersection of business and the outdoors, from product innovation to industry partnerships — a growing sector with strong Northwest Arkansas ties",
        global: "operate across cultures and markets, navigate international business environments, and develop strategies for global expansion",
        operations: "optimize how businesses actually run — supply chains, procurement, logistics — skills in high demand across every industry",
        numbers: "read financial statements, understand tax implications, and navigate business law — a foundation that strengthens any career path"
    };

    const parts = interests.map(i => desc[i]).filter(Boolean);
    let text = 'Hey ' + name + '! Based on what you told us, it sounds like ' + parts[0];
    if (parts.length === 2) text += ', and ' + parts[1];
    else if (parts.length === 3) text += ', ' + parts[1] + ', and ' + parts[2];
    text += '.';

    // Career preparation paragraph
    const prepParts = interests.map(i => careerPrep[i]).filter(Boolean);
    if (prepParts.length > 0) {
        text += ' A major shaped like this would prepare you to ' + prepParts[0];
        if (prepParts.length === 2) text += ', and ' + prepParts[1];
        else if (prepParts.length === 3) text += '; ' + prepParts[1] + '; and ' + prepParts[2];
        text += '.';
    }

    text += ' Here\'s a set of courses we think will serve you well — they\'re tailored to your interests while keeping you on track with your SEVI major requirements.';

    if (secondaryMajor && DOUBLE_COUNT[secondaryMajor]) {
        text += ' Since you\'re also pursuing ' + secondaryMajor + ', we\'ve highlighted courses that count toward both majors so you can make the most of every credit hour.';
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

    // Clear all selections
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
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
