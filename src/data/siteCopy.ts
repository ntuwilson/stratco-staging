// Site copy from the approved blueprint ("Stratco website — copy and layout rewrite").
// All copy here is confirmed. Do not add unconfirmed figures or names.

export type SectorKey = 'government' | 'finance' | 'programmes' | 'brands';

export const HERO = {
  label: 'Stratco · Kampala',
  headline: ['Shaping what', 'millions remember'],
  line: 'Plan it, launch it, make it remembered. Events, campaigns and digital media for institutions and brands in Uganda.',
  primary: 'Request a proposal',
  secondary: 'Watch the film',
};

// Shown as names until written permission to show logos is confirmed
// Partners and clients. Logos supplied by Stratco (originals kept outside the
// repo); web copies live in public/partners/. Clients without a logo file are
// listed by name only.
export const PARTNERS = {
  heading: 'Partners and clients',
  // scale evens out the visual weight of wide wordmarks and tall emblems
  logos: [
    { name: 'Uganda Communications Commission', src: '/partners/ucc.png', scale: 0.95 },
    { name: 'Ministry of ICT and National Guidance', src: '/partners/ministry-of-ict.png', scale: 1.3 },
    { name: 'Uganda Communications Universal Service and Access Fund', src: '/partners/ucusaf.png', scale: 0.95 },
    { name: 'Government of Uganda', src: '/partners/government-of-uganda.png', scale: 1.15, caption: 'Government of Uganda' },
    { name: 'The World Bank', src: '/partners/world-bank.png', scale: 1 },
    { name: 'Private Sector Foundation Uganda', src: '/partners/psfu.png', scale: 1.05 },
    { name: 'Finance Trust Bank', src: '/partners/finance-trust-bank.png', scale: 1.15 },
    { name: 'GROW Enterprises for Women', src: '/partners/grow-enterprises-for-women.png', scale: 0.85 },
    { name: 'Penda', src: '/partners/penda.png', scale: 0.68 },
  ] as { name: string; src: string; scale: number; caption?: string }[],
};

export const WHY = {
  label: 'Why we exist',
  heading: 'Make it understood. Make it remembered.',
  body: 'Every launch, campaign and event carries one message people must remember. We plan it, produce it and put it in front of the right audience.',
  points: [
    {
      title: 'Start with one message.',
      text: 'Every project begins with what people must remember and who must hear it.',
    },
    {
      title: 'Make it under one roof.',
      text: 'The same team writes, films, builds the stage and runs the broadcast.',
    },
    {
      title: 'Reach the right people.',
      text: 'Media planning and digital reach, from launch day to the last post.',
    },
  ],
};

export interface CaseCopy {
  slug: string;
  name: string;
  client: string;
  where: string;
  year: string;
  sector: SectorKey;
  figure: { value: string; label: string };
  oneLine: string;
  brief: string;
  answer: string[];
  result: string;
  quote?: { text: string; who: string };
  film?: boolean;
}

// Event case first, as the blueprint orders it
export const CASES: CaseCopy[] = [
  {
    slug: 'ucc-data-protection-2025',
    name: 'Data Protection & Privacy CEO Conference 2025',
    client:
      'Uganda Communications Commission and the Ministry of ICT and National Guidance, with the Personal Data Protection Office',
    where: 'Kampala',
    year: '2025',
    sector: 'government',
    figure: { value: '500+', label: 'executives' },
    oneLine:
      '500+ executives at one national conference. One crew staged, filmed and broadcast it live.',
    brief:
      'Bring company leaders together to understand their duties under the Data Protection and Privacy Act 2019. The message had to land with executives, not lawyers.',
    answer: [
      'Shaped the theme “Your Data, Your Right” and the campaign visuals',
      'Designed and built a three-screen LED stage and branded the venue',
      'Ran multi-camera filming with live screens in the hall',
      'Delivered photos and video for same-day press and social media',
    ],
    result:
      '500+ executives attended, with photos and video released the same day.',
  },
  {
    slug: 'digital-skilling-for-women',
    name: 'Her Digital Future',
    client:
      'Penda, implementing for UCC, UCUSAF and the Ministry of ICT and National Guidance, with Zimba Women',
    where: '25+ districts across Uganda',
    year: '2024 – 2026',
    sector: 'programmes',
    figure: { value: '2,500+', label: 'women trained' },
    oneLine:
      '2,500+ women in 25+ districts learned to use smartphones for business. Their stories, on film.',
    brief:
      'Show how women running small businesses learned to use smartphones, in their own words, so partners and funders could see the impact.',
    answer: [
      'Filmed training sessions, journeys and graduations across the districts',
      'Recorded participant and trainer testimonials',
      'Produced a programme film and short testimonial clips',
      'Photographed every stage for reports and social media',
    ],
    result:
      'Trained by 38 trainers and 53 community mobilisers over 125 days, documented on film.',
    quote: {
      text: 'We took pictures of our businesses and posted them to get customers who are far away.',
      who: 'Apoyo Ruth Hilda, Nakasongola',
    },
    film: true,
  },
  {
    slug: 'trust-empowerment-programme',
    name: 'Trust Empowerment Programme',
    client:
      'Penda, with Finance Trust Bank, PSFU, the GROW Project and the World Bank',
    where: '10 districts',
    year: '2026',
    sector: 'finance',
    figure: { value: '10', label: 'districts' },
    oneLine:
      '10 districts of financial literacy training for women, filmed and shared the same day.',
    brief:
      'Support a financial literacy programme for women entrepreneurs with clear branding and fast, credible coverage.',
    answer: [
      'Branded every venue with portable banners and backdrops',
      'Filmed sessions and interviews in each district',
      'Edited and released short clips the same day',
      'Photographed the programme for partner reports',
    ],
    result: 'Sessions covered in 10 districts in 2026, with short clips released the same day.',
  },
];

// Her Digital Future video testimonials (case page). Names and lines only
// where the clip itself shows them: Nakasongola 01 has a spoken name and
// burned-in English captions; the other two show neither, so district only.
export interface VideoTestimonial {
  key: string;
  name?: string;
  district: string;
  duration: string;
  line?: string;
  src: string;
  poster: string;
}

export const VIDEO_TESTIMONIALS = {
  label: 'In their words',
  heading: 'Women share what changed',
  intro: 'Women from Her Digital Future, in their own words.',
  items: [
    {
      key: 'nakasongola',
      name: 'Alyesiga Stidia Olga',
      district: 'Nakasongola',
      duration: '0:41',
      line: 'They have really taught us a lot how to use smartphones… to market our businesses.',
      src: '/video/testimonials/nakasongola-720.mp4',
      poster: '/video/testimonials/nakasongola-poster.jpg',
    },
    {
      key: 'bunyangabo',
      district: 'Bunyangabo',
      duration: '1:20',
      src: '/video/testimonials/bunyangabo-720.mp4',
      poster: '/video/testimonials/bunyangabo-poster.jpg',
    },
    {
      key: 'kitagwenda',
      district: 'Kitagwenda',
      duration: '0:56',
      src: '/video/testimonials/kitagwenda-720.mp4',
      poster: '/video/testimonials/kitagwenda-poster.jpg',
    },
  ] as VideoTestimonial[],
};

export const SECTORS: {
  key: SectorKey;
  name: string;
  text: string;
  /** Shown only when a case study exists to link to */
  example?: string;
  caseSlug?: string;
}[] = [
  {
    key: 'government',
    name: 'Government and regulators',
    text: 'Public awareness campaigns and national events.',
    example: 'UCC data protection conference',
    caseSlug: 'ucc-data-protection-2025',
  },
  {
    key: 'finance',
    name: 'Banks and financial services',
    text: 'Product launches, financial literacy and brand campaigns.',
    example: 'Trust Empowerment Programme with Finance Trust Bank',
    caseSlug: 'trust-empowerment-programme',
  },
  {
    key: 'programmes',
    name: 'Development programmes and funds',
    text: 'Documentaries and field coverage that show donors real results.',
    example: 'Her Digital Future',
    caseSlug: 'digital-skilling-for-women',
  },
  {
    key: 'brands',
    name: 'Corporate brands',
    text: 'TV adverts, brand identity and launch events.',
    // TODO: add a corporate brand example once a case is approved for publishing
  },
];

export const SECTORS_INTRO =
  'Organisations that need to be heard: regulators, banks, programmes and brands.';

export const SERVICES = [
  {
    title: 'Run the event',
    text: 'End to end, from strategy and planning to the live day: stage and LED screens, venue branding, photography, filming and live broadcast.',
  },
  {
    title: 'Launch the campaign',
    text: 'Strategy, adverts for TV and digital, content and media reach for companies and institutions.',
  },
  {
    title: 'Deliver the programme',
    text: 'Branding, field coverage, documentaries and reporting for projects and programmes.',
  },
];

export const STEPS = [
  {
    title: 'Brief',
    text: 'We meet your team and agree the goal, audience, budget and dates.',
  },
  {
    title: 'Plan',
    text: 'You approve the message, script and production plan before we shoot.',
  },
  {
    title: 'Produce',
    text: 'One team builds the stage, runs the event and films it; adverts and content go live on schedule.',
  },
  {
    title: 'Deliver',
    text: 'Final films, photos and reports, on time and ready to share.',
  },
];

export const TESTIMONIALS = {
  heading: 'In their words',
  quotes: [
    {
      text: 'We learnt how to use WhatsApp. We took pictures of our businesses and posted them to get customers who are far away.',
      who: 'Apoyo Ruth Hilda, participant, Nakasongola District',
    },
  ],
};

// Free campaign check: six self-assessment questions, scored 0-3 each.
// Advice only; no figures or claims about Stratco results.
export type CheckArea = 'message' | 'audience' | 'budget' | 'timeline' | 'channels' | 'measurement';

export interface CheckOption {
  label: string;
  score: number;
}

export interface CheckQuestion {
  area: CheckArea;
  areaName: string;
  question: string;
  options: CheckOption[];
  multi?: boolean;
  tip: string;
}

export const CHECK = {
  label: 'Free campaign check',
  heading: 'Is your next campaign ready?',
  body: 'Six quick questions. You get a readiness score and three practical next steps. Free, no sign-up, about a minute.',
  button: 'Check your campaign',
  questions: [
    {
      area: 'message',
      areaName: 'Message',
      question: 'Can you say the one thing people must remember in one sentence?',
      options: [
        { label: 'Yes, it’s written down', score: 3 },
        { label: 'Roughly', score: 2 },
        { label: 'Not yet', score: 0 },
      ],
      tip: 'Write the one line before anything else; every advert, banner and post should repeat it.',
    },
    {
      area: 'audience',
      areaName: 'Audience',
      question: 'Who exactly needs to hear it?',
      options: [
        { label: 'A specific group we can describe', score: 3 },
        { label: 'A broad group, like “the public”', score: 1 },
        { label: 'Not sure yet', score: 0 },
      ],
      tip: 'Name the people who decide or buy, and where they already spend time; that picks your channels for you.',
    },
    {
      area: 'budget',
      areaName: 'Budget',
      question: 'Is the budget agreed?',
      options: [
        { label: 'Approved, with a figure', score: 3 },
        { label: 'A rough range', score: 2 },
        { label: 'Not yet', score: 0 },
      ],
      tip: 'Set a working range now; it decides whether this is one strong event, a media push, or both.',
    },
    {
      area: 'timeline',
      areaName: 'Timeline',
      question: 'When does it need to go live?',
      options: [
        { label: 'More than 8 weeks away', score: 3 },
        { label: '4 to 8 weeks', score: 2 },
        { label: 'Under 4 weeks', score: 1 },
        { label: 'No date yet', score: 0 },
      ],
      tip: 'Work back from the launch date; production, branding and media bookings usually need the most lead time.',
    },
    {
      area: 'channels',
      areaName: 'Channels',
      question: 'Which channels will carry it?',
      multi: true,
      options: [
        { label: 'Event or activation', score: 0 },
        { label: 'TV or radio', score: 0 },
        { label: 'Digital and social', score: 0 },
        { label: 'Field or community', score: 0 },
        { label: 'Not decided', score: 0 },
      ],
      tip: 'Choose two or three channels that reach the same audience and let them repeat one message.',
    },
    {
      area: 'measurement',
      areaName: 'Measurement',
      question: 'How will you know it worked?',
      options: [
        { label: 'Clear targets, like reach, leads or attendance', score: 3 },
        { label: 'We’ll look at likes and views', score: 1 },
        { label: 'Haven’t decided', score: 0 },
      ],
      tip: 'Agree two or three numbers before launch, such as attendance, reach or enquiries, and how you will count them.',
    },
  ] as CheckQuestion[],
  bands: [
    { min: 80, name: 'Ready to launch', line: 'The basics are in place. The work now is execution and keeping one message everywhere.' },
    { min: 50, name: 'Nearly there', line: 'A solid start. Close the gaps below before money goes into production and media.' },
    { min: 0, name: 'Needs groundwork', line: 'Settle the essentials first; it will save budget and time later.' },
  ],
  momentumTips: [
    'Brief everyone involved with the same one-line message and the same dates.',
    'Plan what to film and photograph on the day, so content keeps working after launch.',
    'Book a short review a week after launch to check the numbers you agreed.',
  ],
};

// Social links live in src/config/social.ts; the channel line only shows
// once at least one link is set.
export const WATCH = {
  heading: 'Watch the work',
  filmTitle: 'Her Digital Future',
  filmLine: 'The programme film, in full.',
  filmLength: '2:17',
  channelsLine: 'Full films on YouTube. Behind the scenes on TikTok and Instagram.',
};

export const CONTACT = {
  heading: 'Start your next project',
  body: 'Send a short brief and we will reply within one working day with next steps.',
  reassurance:
    'We work with public institutions, banks and development programmes across Uganda. Your brief stays confidential.',
  button: 'Request a proposal',
  needs: ['Campaign', 'Film', 'Event', 'Strategy'],
  email: 'info@stratco.agency',
  phones: ['+256 772 833500', '+256 772 700708'],
  address: 'Kisakye Complex, Office 301, Bugolobi, Kampala',
};

export const WORK_PAGE = {
  heading: 'Our work',
  line: 'Campaigns, films and events, delivered for institutions across Uganda.',
  filters: [
    { key: 'all', name: 'All' },
    { key: 'government', name: 'Government' },
    { key: 'finance', name: 'Financial services' },
    { key: 'programmes', name: 'Development programmes' },
    { key: 'brands', name: 'Brands' },
  ] as { key: 'all' | SectorKey; name: string }[],
};
