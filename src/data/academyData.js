// Edit all academy content here.
export const academy = {
  name: 'Meglev Cubing Academy',
  tagline: 'Learn. Solve. Master.',
  slogan: 'Turn Every Scramble Into a Skill!',
  location: 'Thoothukudi, Tamil Nadu, India',
  description: 'Learn, practice and master twisty puzzles with structured cubing classes designed for beginners, intermediate solvers and advanced learners.',
  about: 'Meglev Cubing Academy teaches Rubik’s Cube and twisty-puzzle solving from beginner level through intermediate and advanced levels, with daily, weekly and online classes for students and cubing enthusiasts.',
  formUrl: 'https://forms.gle/Rtw6C7FaCAkA6Qmp8', // Official Google Form registration link
  instagramUrl: 'https://www.instagram.com/meglevcubing/',
  personal: {
    name: 'Mohammed Aseel M (Personal)',
    phone: '7200898121',
    email: 'mohammedaseel429@gmail.com',
    whatsapp: '917200898121', // Personal WhatsApp
    instagramUrl: 'https://www.instagram.com/_itz_aseel_offil_/',
  },
  business: {
    phone: '7338850429',
    email: 'meglevcubingacademy@gmail.com',
    whatsapp: '917338850429', // Business/Academy WhatsApp
  },
}

export const nav = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Cubes', '#cubes'],
  ['Levels', '#levels'],
  ['Classes', '#classes'],
  ['Register', '#register'],
  ['Contact', '#contact'],
]

export const benefits = [
  ['🧠', 'Better Focus', 'Develop concentration and logical thinking.'],
  ['🎯', 'Problem Solving', 'Build structured problem-solving skills.'],
  ['⚡', 'Improve Speed', 'Learn efficient solving techniques.'],
  ['🧩', 'Master More Puzzles', 'Progress beyond the 3×3 and explore different puzzles.'],
]

export const cubes = [
  { name: '2×2', n: 2 },
  { name: '3×3', n: 3 },
  { name: '4×4', n: 4 },
  { name: '5×5', n: 5 },
  { name: '6×6', n: 6 },
  { name: '7×7', n: 7 },
  { name: 'Pyraminx', kind: 'pyraminx' },
  { name: 'Megaminx', kind: 'megaminx' },
  { name: 'Mirror Cube', kind: 'mirror' },
  { name: 'Axis Cube', kind: 'axis' },
  { name: 'Square-1', kind: 'square1' },
  { name: 'Skewb', kind: 'skewb' },
]

export const levels = [
  {
    level: 'BEGINNER',
    tag: 'Foundation',
    accent: 'green',
    borderClass: 'border-green/40 hover:border-green text-green',
    badgeClass: 'bg-green/10 text-green border-green/30',
    description: 'Build strong fundamentals and solve your first cubes with confidence.',
    slogans: ['Start simple. Build confidence. Keep solving.'],
    highlights: ['Cube notation & grip', 'Layer-by-layer method', 'First complete solve'],
  },
  {
    level: 'INTERMEDIATE',
    tag: 'Progression',
    accent: 'yellow',
    borderClass: 'border-yellow/40 hover:border-yellow text-yellow',
    badgeClass: 'bg-yellow/10 text-yellow border-yellow/30',
    description: 'Improve your solving speed, recognition and advanced techniques.',
    slogans: [
      'Turn practice into progress.',
      'Improve your lookahead.',
      'Break your personal best.',
    ],
    highlights: ['CFOP method fundamentals', 'Intuitive F2L & lookahead', '2-Look OLL & PLL algorithms'],
  },
  {
    level: 'ADVANCED',
    tag: 'Mastery',
    accent: 'orange',
    borderClass: 'border-orange/40 hover:border-orange text-orange',
    badgeClass: 'bg-orange/10 text-orange border-orange/30',
    description: 'Develop advanced solving skills, efficiency and competition-focused techniques.',
    slogans: [
      'Master advanced techniques.',
      'Refine your turning.',
      'Chase consistency, not luck.',
    ],
    highlights: ['Full OLL & PLL mastery', 'Fingertrick optimization', 'Competition readiness & inspection'],
  },
]

export const classes = [
  {
    id: 'daily',
    title: 'Daily Classes',
    description: 'Regular structured learning and practice with daily mentor guidance.',
    icon: 'CalendarDays',
    badge: 'Popular for Beginners',
    whatsappMessage: `Hello MEGLEV Cubing Academy,

I am interested in joining the Daily Cubing Classes.

I would like to know more about the class schedule, timings, fees, learning levels and registration process.

Thank you.`,
    emailSubject: 'Enquiry - Daily Cubing Classes',
    emailBody: `Hello MEGLEV Cubing Academy,

I am interested in joining the Daily Cubing Classes.

Please share the available timings, fees, class structure and registration details.

Thank you.`,
  },
  {
    id: 'weekly',
    title: 'Weekly Classes',
    description: 'Flexible weekend/weekly learning sessions tailored for busy student schedules.',
    icon: 'CalendarClock',
    badge: 'Flexible Schedule',
    whatsappMessage: `Hello MEGLEV Cubing Academy,

I am interested in joining the Weekly Cubing Classes.

I would like to know more about the available schedules, timings, fees, learning levels and registration process.

Thank you.`,
    emailSubject: 'Enquiry - Weekly Cubing Classes',
    emailBody: `Hello MEGLEV Cubing Academy,

I am interested in joining the Weekly Cubing Classes.

Please share the available schedules, timings, fees, class structure and registration details.

Thank you.`,
  },
  {
    id: 'online',
    title: 'Online Classes',
    description: 'Learn cubing remotely from anywhere with interactive live 1-on-1 and small group sessions.',
    icon: 'Video',
    badge: 'Global Access',
    whatsappMessage: `Hello MEGLEV Cubing Academy,

I am interested in joining the Online Cubing Classes.

I would like to know more about the online class schedule, timings, fees, platform used and registration process.

Thank you.`,
    emailSubject: 'Enquiry - Online Cubing Classes',
    emailBody: `Hello MEGLEV Cubing Academy,

I am interested in joining the Online Cubing Classes.

Please share the online class schedule, timings, fees, platform used and registration details.

Thank you.`,
  },
]

export const steps = [
  ['Register', 'UserPlus'],
  ['Choose Your Class', 'ListChecks'],
  ['Learn & Practice', 'BookOpen'],
  ['Improve Your Skills', 'TrendingUp'],
  ['Master More Puzzles', 'Puzzle'],
]

export const whoCanJoin = [
  'Complete beginners',
  'Students & Kids',
  'Hobby cubers',
  'Intermediate solvers',
  'Advanced learners',
  'People interested in speedcubing',
  'Anyone interested in learning twisty puzzles',
]
