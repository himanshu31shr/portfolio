// lib/constants.ts
// Single source of truth for all resume data.
// Components must import from here — never hardcode personal data.

export const personalInfo = {
  name: 'Himanshu Shrivastava',
  title: 'Senior Full Stack Engineer',
  subtitle: 'Node.js · React · TypeScript · AWS · Accessibility',
  email: 'himanshu31shr@gmail.com',
  phone: '9981809668',
  linkedin: 'https://linkedin.com/in/himanshu31shr',
  github: 'https://github.com/himanshu31shr',
  location: 'India',
  avatar: '/images/avatar.png',
  summary:
    'Senior Full Stack Engineer and startup technology leader with 9+ years of experience building and scaling fintech, SaaS, and cloud-native platforms. Deep expertise in Node.js, React, TypeScript, Python, AWS, microservices, CI/CD automation, accessibility engineering, and AI-assisted developer workflows. Proven track record of architecting systems that scaled to 1M+ users, improving deployment speed by 50%, driving WCAG 2.1 AA compliance, and applying agentic engineering automation to improve code quality, developer productivity, and operational efficiency.',
} as const

export interface ExperienceItem {
  company: string
  role: string
  period: string
  startDate: string
  endDate: string
  isCurrent: boolean
  achievements: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Incubyte',
    role: 'Senior Software Engineer',
    period: 'Sep 2024 – Present',
    startDate: '2024-09',
    endDate: 'present',
    isCurrent: true,
    achievements: [
      'Lead full-stack development of enterprise applications using React.js, Node.js, and Python, delivering 14+ scalable features across front-end and backend systems for 3 tier-1 client engagements.',
      'Spearheaded WCAG 2.1 AA accessibility initiatives across key client projects, authoring 40+ engineering standards and reducing compliance risk by 100% for broader user segments.',
      'Shifted accessibility checks left by independently integrating ESLint accessibility rules and AI-based PR review workflows, cutting production A11y bugs by 45% earlier in the development life-cycle.',
      'Owned on-call responsibilities for production systems and helped the team adopt effective incident handling practices, reducing Mean Time to Resolution (MTTR) by 35%.',
      'Managed 3 concurrent engineering work-streams, delivering MVP and roadmap features across quarterly planning cycles while balancing short-term needs with long-term platform goals.',
      'Integrated Claude Code and GitHub Copilot into the engineering workflow, reducing boilerplate development time by 30% and accelerating complex refactoring efforts.',
      'Architected agentic AI workflows within the CI/CD pipeline to automate pull request creation and targeted code quality reviews, saving 6+ hours of manual review overhead per engineer weekly.',
    ],
  },
  {
    company: 'ByajBook',
    role: 'Co-Founder / Head of Engineering',
    period: 'Oct 2021 – Aug 2024',
    startDate: '2021-10',
    endDate: '2024-08',
    isCurrent: false,
    achievements: [
      'Architected a peer-to-peer lending platform serving 1M+ users and led the migration from a monolithic MVP to a microservices architecture using Node.js, Redis, and AWS ECS, achieving 99.9% uptime and reducing infrastructure costs by 35%.',
      'Built and led a cross-functional team of 8 engineers, QAs, and designers, introducing Agile delivery practices and bi-weekly release cycles that reduced feature time-to-market by 40%.',
      'Implemented CI/CD pipelines in Azure DevOps to automate build, test, and deployment workflows, reducing deployment time by 50% and improving release reliability.',
      'Designed ETL pipelines using Apache Airflow to unify product and application data from operational databases and Mixpanel, deploying Apache Superset dashboards that uncovered $50k+ in optimized transactional leakage.',
      'Improved platform security and reliability by implementing rate limiting, IP blocking, and request signing to mitigate DDoS risks, while integrating NewRelic to reduce critical production anomalies by 65%.',
    ],
  },
  {
    company: 'CyberInfraStructure',
    role: 'Senior Software Engineer',
    period: 'Mar 2019 – Sep 2021',
    startDate: '2019-03',
    endDate: '2021-09',
    isCurrent: false,
    achievements: [
      'Led a team of 6 engineers to build a localised real estate platform using crypto-based smart contracts for fractional property ownership, driving end-to-end delivery of a $1.2M blockchain-enabled product.',
      'Diagnosed performance bottlenecks in high-load Node.js services and optimised database indexing strategies, improving system efficiency by 40% under production workloads.',
      'Managed end-to-end SDLC for 5 international client engagements, improving delivery success rates by 30% through stronger planning, execution, and cross-functional coordination.',
      'Led development of 12+ end-to-end product modules using Node.js and Angular, owning backend and front-end implementation for scalable client-facing solutions.',
    ],
  },
  {
    company: 'DreamCyber Infoway',
    role: 'Senior Software Engineer',
    period: 'May 2017 – Feb 2019',
    startDate: '2017-05',
    endDate: '2019-02',
    isCurrent: false,
    achievements: [
      'Spearheaded the migration of 20GB+ of data from WordPress to a custom Node.js platform, engineering migration pipelines that delivered 0% data loss and reduced query latency by 60%.',
      'Independently designed and developed a marketing CRM with RBAC, drip campaigns, and funnel tracking capabilities, while optimising infrastructure usage to reduce hosting costs by 30%.',
    ],
  },
  {
    company: 'Argalon Technologies',
    role: 'Software Engineer',
    period: 'Sep 2016 – Apr 2017',
    startDate: '2016-09',
    endDate: '2017-04',
    isCurrent: false,
    achievements: [
      'Built web application features using Node.js, jQuery, Angular, and early React.js, contributing across both front-end and backend development.',
      'Developed and delivered project modules aligned with business requirements, supporting on-time feature implementation across active client work-streams.',
      'Maintained and enhanced web applications by resolving defects and supporting iterative feature improvements across the codebase.',
    ],
  },
  {
    company: 'Hyffins',
    role: 'Software Engineer',
    period: 'Nov 2015 – Aug 2016',
    startDate: '2015-11',
    endDate: '2016-08',
    isCurrent: false,
    achievements: [
      'Developed a food delivery platform using Node.js, Express, and MySQL, building scalable backend functionality to support responsive user experiences and operational workflows.',
      'Designed and implemented internal tools for delivery management and food manufacturing operations, improving workflow efficiency across internal teams.',
    ],
  },
]

export interface SkillCategory {
  name: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'Code2',
    skills: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Dart'],
  },
  {
    name: 'Frontend',
    icon: 'Monitor',
    skills: [
      'React.js',
      'Next.js',
      'Angular',
      'Angular Material',
      'Vite',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'CSS Modules',
      'Electron',
      'Redux',
      'jQuery',
    ],
  },
  {
    name: 'Testing',
    icon: 'TestTube',
    skills: ['Jest', 'React Testing Library', 'Vitest', 'Cypress', 'Playwright', 'Mocha', 'Stryker'],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      'Node.js',
      'Express.js',
      'NestJS',
      'Flask',
      'Microservices',
      'Multi-tenancy',
      'REST APIs',
      'GraphQL',
      'RabbitMQ',
      'Redis',
      'WebSockets',
      'OpenAPI',
      'Discord API',
      'WhatsApp API',
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'DynamoDB', 'Firebase', 'Supabase'],
  },
  {
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      'AWS',
      'Docker',
      'Terraform',
      'Azure DevOps',
      'GitHub Actions',
      'CI/CD',
      'nginx',
      'PM2',
      'VPC',
      'CloudFront',
      'Prettier',
      'Husky',
    ],
  },
  {
    name: 'Data & Observability',
    icon: 'BarChart3',
    skills: ['Airflow', 'Superset', 'NewRelic', 'CloudWatch', 'Datadog', 'Mixpanel', 'LaunchDarkly', 'Feature flagging'],
  },
  {
    name: 'AI Engineering',
    icon: 'Bot',
    skills: [
      'Claude Code',
      'Cursor',
      'GitHub Copilot',
      'MCP',
      'AI-based PR Review',
      'Agentic CI/CD',
      'Prompt Engineering',
      'Prompt/version management',
      'Secure AI usage guidelines',
      'RAG',
      'LangChain',
      'Google Gemini API',
    ],
  },
]

export interface ResumeDownload {
  roleLevel: string
  label: string
  file: string
  isDefault?: boolean
}

export const resumeDownloads: ResumeDownload[] = [
  {
    roleLevel: 'software_engineer',
    label: 'Software Engineer',
    file: 'software-engineer.pdf',
  },
  {
    roleLevel: 'senior_software_engineer',
    label: 'Senior Software Engineer',
    file: 'senior-software-engineer.pdf',
    isDefault: true,
  },
  {
    roleLevel: 'staff_engineer',
    label: 'Staff Engineer',
    file: 'staff-engineer.pdf',
  },
  {
    roleLevel: 'lead_engineer',
    label: 'Lead Engineer',
    file: 'lead-engineer.pdf',
  },
]

export interface ProjectItem {
  name: string
  tagline: string
  description: string
  techStack: string[]
  highlights: string[]
  metrics?: string[]
}

export const projects: ProjectItem[] = [
  {
    name: 'Credit Repair CRM',
    tagline: 'Automated credit bureau monitoring & dispute system',
    description:
      'A system to monitor credit reports of users from different bureaus and provide automated corrections.',
    techStack: ['Node.js', 'React', 'MySQL', 'RabbitMQ', 'Redis'],
    highlights: [
      'Implemented automated triggers with custom workflows to initiate defined sequences based on bureau report data.',
      'Eliminated manual work for creating workflows, automating the process for infinite user cases.',
      'Boosted sales team productivity by enabling simultaneous client management with minimal manual intervention.',
    ],
    metrics: [
      '40% reduction in manual intervention',
      '50% reduction in system load via async triggers',
      '60% increase in client handling capacity',
    ],
  },
  {
    name: 'MarketDojo',
    tagline: 'Procurement management system at scale',
    description:
      'Node.js / RoR / React-based procurement management system handling heavy front-end workloads.',
    techStack: ['React', 'Node.js', 'Ruby on Rails', 'PostgreSQL'],
    highlights: [
      'Managed customer feature requests, issue resolution, and system scaling to support heavy workloads on the front-end.',
      'Enhanced overall user experience and reduced response time by 50% through optimized front-end performance.',
    ],
    metrics: [
      '50% improvement in response time',
      'Improved user satisfaction and engagement',
    ],
  },
  {
    name: 'TourneyBot / Manager',
    tagline: 'Cross-platform Discord & WhatsApp tournament bot',
    description:
      'A cross-functional bot integrated with a tournament management system, deployed on Discord and WhatsApp.',
    techStack: ['Node.js', 'Discord.js', 'WhatsApp API', 'MongoDB'],
    highlights: [
      'Architected and deployed a chatbot integrated with a tournament management system.',
      'Developed integrations with WhatsApp and Discord, facilitating seamless user registration, verification, and communication.',
      'Implemented automated notification systems to alert users about critical events such as qualification and disqualification.',
    ],
    metrics: [
      'Real-time communication across two major platforms',
      'Automated end-to-end tournament lifecycle management',
    ],
  },
]

export interface EducationItem {
  degree: string
  institution: string
  field: string
  year: string
}

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering (B.E.)',
    institution: 'RGPV Bhopal',
    field: 'Electronics & Communication',
    year: '2014',
  },
  {
    degree: 'Class XII (CBSE)',
    institution: 'Vatsalya Sr. Sec. School, Vidisha',
    field: 'Mathematics',
    year: '',
  },
  {
    degree: 'Class X (MPBSE)',
    institution: 'Nirmal Jyoti Convent School, Bina',
    field: '',
    year: '',
  },
]

export const stats = [
  { label: 'Years Experience', value: '9+', icon: 'Calendar' },
  { label: 'Users Served', value: '1M+', icon: 'Users' },
  { label: 'Uptime Achieved', value: '99.9%', icon: 'Activity' },
  { label: 'Accessibility', value: 'WCAG 2.1 AA', icon: 'Accessibility' },
] as const

export const navLinks = [
  { label: 'Writing', href: '/blog' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const
