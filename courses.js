// Make My Major — Course Data & Mapping

const COURSES = {
    // Required
    "SEVI 39303": {
        title: "Entrepreneurship and New Venture Development",
        hours: 3,
        description: "The role of the entrepreneur in starting up new businesses. Identification of new venture opportunities and the evaluation of their feasibility.",
        prereq: "Junior Standing",
        groups: ["required"],
        offered: "Fall and Spring"
    },

    // Thematic Core / Group 1
    "SEVI 32303": {
        title: "Corporate Innovation",
        hours: 3,
        description: "This foundational course evaluates why companies succeed or fail at innovation through case studies and guest speakers. Students develop intrapreneur skills and learn frameworks for corporate innovation, corporate strategy, networks, and technology assessment.",
        prereq: "SEVI 20503 or ACCT 20203 or SEVI 20303",
        groups: ["thematic", "group1"],
        offered: "Spring"
    },
    "SEVI 36703": {
        title: "Social Entrepreneurship",
        hours: 3,
        description: "The course explores the notion of social entrepreneurship both as a movement and as an alternative to engage with the market economy. Students examine opening socially-focused businesses, sustainable practices, impact measurement alternatives, and conscious consumer decision-making.",
        prereq: "Junior standing",
        groups: ["thematic", "group1"],
        offered: "Fall and Spring"
    },
    "SEVI 44303": {
        title: "Small Enterprise Management",
        hours: 3,
        description: "This course addresses small enterprise opportunities and challenges, emphasizing innovation, management planning, control, financing, marketing and legal requirements. It applies management knowledge directly to small enterprise contexts.",
        prereq: "SEVI 33003 or SEVI 39303",
        groups: ["thematic", "group1"],
        offered: "Spring"
    },

    // Group 1 Only
    "SEVI 400H3": {
        title: "Honors Strategy, Innovation and Entrepreneurship Colloquium",
        hours: 3,
        description: "Colloquium that covers new developments and topics salient to entrepreneurship, innovation and strategy in businesses and nonprofit organizations.",
        prereq: "Honors standing and junior standing",
        groups: ["group1"],
        offered: "Fall"
    },
    "MGMT 41003": {
        title: "Special Topics in Management",
        hours: 3,
        description: "Explores trends, concepts, and important developments in management as they impact on organizational performance. Topics are selected by faculty each semester. May be repeated for degree credit.",
        prereq: null,
        groups: ["group1"],
        offered: "Irregular"
    },
    "MGMT 42503": {
        title: "Leadership",
        hours: 3,
        description: "This course offers a foundation for understanding and evaluating organizational leadership. It helps students develop frameworks for examining leader-follower relationships, effective leadership models, and connections to gender, ethics, and culture.",
        prereq: "MGMT 21003 or MGMT 35603",
        groups: ["group1"],
        offered: "Fall and Spring"
    },
    "MGMT 42603": {
        title: "Organizational Change and Development",
        hours: 3,
        description: "This course will develop diagnostic and intervention skills that can be applied to identifying and overcoming problems of morale and productivity in organizations. Various behavioral methods are covered.",
        prereq: "MGMT 21003 or MGMT 35603",
        groups: ["group1"],
        offered: "Fall and Spring"
    },
    "SEVI 45403": {
        title: "S.A.K.E. Product Innovation Lab",
        hours: 3,
        description: "Provides a structured stage-gate framework for new product development through a hands-on, interactive product innovation experience. Students develop skills in ideation, concept writing, consumer research, prototyping, financial profiling, and presentation.",
        prereq: "Junior standing",
        groups: ["group1"],
        offered: "Fall and Spring"
    },
    "SEVI 45803": {
        title: "International Management",
        hours: 3,
        description: "Develops an understanding of international business management and the cultural environments in which IB exists today. The course examines international business practices across selected nations and diverse cultures.",
        prereq: null,
        groups: ["group1"],
        offered: "Fall and Spring"
    },
    "MGMT 49403": {
        title: "Talent Acquisition and Management",
        hours: 3,
        description: "In-depth study of theoretical, legal, methodological, and substantive issues related to selection, performance appraisal, and development of employees. Students complete projects providing theoretical and practical staffing skills.",
        prereq: "BUSI 10303",
        groups: ["group1"],
        offered: "Fall and Spring"
    },
    "MGMT 49503": {
        title: "Organizational Rewards and Compensation",
        hours: 3,
        description: "Develops an understanding of reward systems theory and its application to the design of compensation systems. Covers theoretical, legal, and practical applications for compensation in attracting and retaining employees.",
        prereq: "BUSI 10303",
        groups: ["group1"],
        offered: "Fall and Spring"
    },
    "SEVI 49903": {
        title: "Entrepreneurship Practicum",
        hours: 3,
        description: "Hands-on management of an actual on-going business. Students will gain experience working in, making decisions about, and managing a business. Topics span accounting, economics, finance, information systems, law, logistics, management, and marketing. Entrance by application only.",
        prereq: null,
        groups: ["group1"],
        offered: "Fall, Spring and Summer"
    },

    // Group 2
    "ACCT 37203": {
        title: "Intermediate Accounting I",
        hours: 3,
        description: "This course is designed to study the theoretical basis for financial accounting concepts and principles related to financial reporting. This course emphasizes researching technical accounting pronouncements for application to external financial reporting issues.",
        prereq: "ACCT 20103 with a grade of B or better",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "ACCT 38403": {
        title: "Fundamentals of Taxation I",
        hours: 3,
        description: "Introduction to federal income taxation with a focus on individuals, including basic tax concepts, income tax principles applicable to individual taxpayers, primary tax law authorities, tax research techniques, and tax planning strategies.",
        prereq: "ACCT 20103 with a grade of B or better",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "BLAW 30303": {
        title: "Commercial Law",
        hours: 3,
        description: "A study of the laws applicable to commercial transactions. Topics covered include the common law of contracts, Articles Two (Sales) and Three (Commercial Paper) of the Uniform Commercial Code, secured transactions, suretyship, and bankruptcy.",
        prereq: null,
        groups: ["group2"],
        offered: "Spring"
    },
    "FINN 30503": {
        title: "Financial Markets and Institutions",
        hours: 3,
        description: "Role and operations of financial markets and institutions in the economy. Supply of, demand for, funds, interest rates and flow of funds analysis.",
        prereq: "ECON 21003 and ECON 22003",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "FINN 36203": {
        title: "Risk Management",
        hours: 3,
        description: "A survey of the extent and types of risk in business; ways of dealing with business risk; use of security and commodity exchanges; survey of insurance for risk bearing purposes.",
        prereq: null,
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "FINN 39303": {
        title: "Real Estate Principles",
        hours: 3,
        description: "Comprehensive, covering economics of real estate, real estate value, real estate finance, rights in real property and their transfer, public programs, policies relating to real property.",
        prereq: null,
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "FINN 41203": {
        title: "Valuing New Ventures",
        hours: 3,
        description: "Valuation methods of entrepreneurial, early-stage, and R&D finance, including term sheets, valuing full and partial stakes, preferred and participating convertible preferred stock, options, later-round investments, complex structures, R&D finance, monte carlo simulation, real options, binomial trees, and game theory.",
        prereq: "Junior Standing",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "FINN 42403": {
        title: "New Venture Finance",
        hours: 3,
        description: "Explores early-stage funding sources and the startup ecosystem, due diligence when seeking funding, and the issues that arise about governance and control when seeking funding, including a deep dive into term sheets and capitalization tables.",
        prereq: "Junior Standing",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "ISYS 22603": {
        title: "Principles of Information Systems",
        hours: 3,
        description: "This course presents the fundamental concepts used in developing information systems. It provides a framework for students to use throughout their software development coursework. Also includes management of information systems concepts.",
        prereq: "ACCT 20103, MATH 20503, and ISYS 21003",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "MKTG 35503": {
        title: "Consumer Behavior",
        hours: 3,
        description: "Analyzes consumer motivation, buying behavior, market adjustment, product innovation and adaptation. Consumer decision making is evaluated as to psychological drives, sociological concepts used by producers, channel intermediaries, consumers.",
        prereq: "MKTG 34303",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "MKTG 42303": {
        title: "Integrated Marketing Communications",
        hours: 3,
        description: "The theory, knowledge, and application relevant to the coordination of marketing communications including advertising, personal selling, sales promotion, public relations, and publicity.",
        prereq: "MKTG 34303",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "MKTG 43403": {
        title: "Selling and Sales Management",
        hours: 3,
        description: "Examines how organizations and individuals communicate value and obtain desired results through the process of personal selling and customer relationship management, along with the role of sales management.",
        prereq: "MKTG 34303",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "MKTG 44303": {
        title: "Retail Strategy",
        hours: 3,
        description: "Concentrates on planning to meet the objectives and satisfy the retail marketing concept. Attention is devoted to retail format, competition among retail institutions, determination of store location, merchandise lines, atmospherics, and levels of customer service.",
        prereq: "MKTG 34303",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "MKTG 44503": {
        title: "New Product Development",
        hours: 3,
        description: "The course is structured along the three main dimensions of new product development: designing, manufacturing, and marketing of new products. An analytical approach is taken consistent with current thinking and practice of the industry.",
        prereq: "MKTG 34303",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "MKTG 46303": {
        title: "Global Marketing",
        hours: 3,
        description: "Examines differences in global environment; how cultural considerations, political, legal, and economic conditions affect market entry strategies and marketing mix decisions; development of marketing plan for global environments.",
        prereq: "MKTG 34303",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "SCMT 36103": {
        title: "SOURCE: Procurement and Supply Management",
        hours: 3,
        description: "This course covers the critical sourcing and procurement processes: strategic sourcing, source to pay, and supplier relationship management. Additionally addresses innovative approaches to enhance sourcing contributions to supply chain integration.",
        prereq: "ECON and SCMT 21003",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "SCMT 36203": {
        title: "PLAN: Inventory and Forecasting Analytics",
        hours: 3,
        description: "This course examines inventory control and forecasting as central logistics elements. Coverage includes inventory control methods for stochastic demand and lead times with Excel implementation.",
        prereq: "ECON and SCMT 21003",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "SCMT 46503": {
        title: "Supply Chain Strategy and Change Management",
        hours: 3,
        description: "This capstone course leverages plan, source, make, deliver, customer service, and new product development capabilities to meet strategic and financial goals in demand-driven networks.",
        prereq: "SCMT 34403, SCMT 36103, and SCMT 36203",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "SEVI 20703": {
        title: "Introduction to Outdoor Recreation Industries",
        hours: 3,
        description: "Establishes a foundation for students interested in pursuing careers or starting businesses in the outdoor products and services industries. Addresses economic, cultural, health, infrastructure, diversity and ethical dimensions of outdoor industries.",
        prereq: null,
        groups: ["group2"],
        offered: "Fall, Spring and Summer"
    },
    "SEVI 42303": {
        title: "Corporate Innovation II",
        hours: 3,
        description: "This course presents product management fundamentals, allowing students to become 'the CEO of their product.' Participants develop organizational innovation ideas into practical implementations using OKRs, EPICs, and retrospectives.",
        prereq: "SEVI 32303",
        groups: ["group2"],
        offered: "Spring"
    },
    "SEVI 47003": {
        title: "Outdoor Industries Capstone Experience",
        hours: 3,
        description: "Student teams partner with outdoor recreation companies to solve real-world business problems. Teams identify, clarify and evaluate a business problem, develop solutions based on analysis and application of theory, and present findings.",
        prereq: null,
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "SEVI 47103": {
        title: "Outdoor Industries Product Innovation Studio",
        hours: 3,
        description: "This project-based course develops knowledge of product innovation and design processes in outdoor industries. Topics include design thinking, customer discovery, product management, prototyping, sustainable sourcing, and manufacturing.",
        prereq: null,
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "BUSI 300H3": {
        title: "Honors College Colloquium",
        hours: 3,
        description: "An inter-disciplinary course exploring events, concepts, and/or new developments in the field of business administration. May be repeated for up to 6 hours of degree credit.",
        prereq: "Junior or senior standing",
        groups: ["group2"],
        offered: "Fall and Spring"
    },
    "BUSI 30203": {
        title: "Sustainability in Business",
        hours: 3,
        description: "This course examines sustainable practices through four frameworks: the 1987 UN Brundtland Report (intergenerational equity), Triple-play (people, planet, profits), resource sustainability, and economic justice.",
        prereq: "Junior standing",
        groups: ["group2"],
        offered: "Irregular"
    }
};

// Interest-to-course mapping
const INTEREST_MAP = {
    start_own: ["SEVI 39303", "SEVI 44303", "SEVI 49903", "FINN 42403", "FINN 41203", "BLAW 30303"],
    products_ideas: ["SEVI 32303", "SEVI 42303", "SEVI 45403", "MKTG 44503", "SEVI 47103"],
    social_impact: ["SEVI 36703", "BUSI 30203", "SEVI 45803"],
    money_funding: ["FINN 41203", "FINN 42403", "FINN 30503", "FINN 36203", "FINN 39303", "ACCT 37203"],
    marketing: ["MKTG 35503", "MKTG 42303", "MKTG 43403", "MKTG 44303", "MKTG 44503", "MKTG 46303"],
    leadership: ["MGMT 42503", "MGMT 42603", "MGMT 49403", "MGMT 49503"],
    outdoors: ["SEVI 20703", "SEVI 47003", "SEVI 47103"],
    global: ["SEVI 45803", "MKTG 46303", "SEVI 47003"],
    operations: ["SCMT 36103", "SCMT 36203", "SCMT 46503", "FINN 36203"],
    numbers: ["ACCT 37203", "ACCT 38403", "BLAW 30303", "FINN 30503"],
    other: []
};

// Double-count mapping: courses that are REQUIRED in other majors
const DOUBLE_COUNT = {
    "Finance": ["FINN 30503"],
    "Marketing": ["MKTG 35503"],
    "Supply Chain Management": ["SCMT 36103", "SCMT 36203", "SCMT 46503"],
    "Accounting": ["ACCT 37203", "ACCT 38403"],
    "Information Systems": ["ISYS 22603"],
    "Human Resource Management": ["MGMT 49403", "MGMT 49503"]
};
