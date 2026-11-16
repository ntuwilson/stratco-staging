// Site copy from the approved blueprint ("Stratco website — copy and layout rewrite").
// Anything in [square brackets] is a fact still to be confirmed: it is rendered
// with a dashed underline (see <Placeholder>) and must not be presented as final.

export type SectorKey = 'government' | 'finance' | 'programmes' | 'brands';

export const HERO = {
  label: 'Stratco · Kampala',
  headline: ['Shaping what', 'millions remember'],
  line: 'Plan it, launch it, make it remembered. Events, campaigns and digital media for institutions and brands in Uganda.',
  primary: 'Request a proposal',
  secondary: 'Watch the film',
};

export const NUMBERS: { value: string; label: string }[] = [
  { value: '500+', label: 'executives at one national conference' },
  { value: '[number]', label: 'events produced since [year]' },
  { value: '[3]', label: 'national programmes delivered since 2024' },
  { value: '2,500+', label: 'women trained in digital skills' },
  { value: '25+', label: 'districts reached' },
];

// Shown as names until written permission to show logos is confirmed
export const CLIENTS = {
  heading: 'Clients and partners',
  names: [
    'Uganda Communications Commission',
    'Ministry of ICT and National Guidance',
    'UCUSAF',
    'Penda',
    'Finance Trust Bank',
    'PSFU',
  ],
  pending: '[others with permission]',
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
      '500+ executives attended; coverage released the same day. [Add press or reach figures if available]',
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
    result: '10 districts covered in 2026. [Number of women trained, to confirm]',
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
  pending:
    '[Second quote: a client decision maker, for example a programme lead at Penda or UCC, with permission]',
};

export const CHECK = {
  heading: 'Is your next campaign ready?',
  body: 'Answer six quick questions about your goal, audience, budget and timeline. You get a score and three practical tips straight away. Free, no sign-up.',
  button: 'Check your campaign',
  questions: [
    'What is the one thing people must remember?',
    'Who exactly needs to hear it?',
    'What is your budget range?',
    'When does it need to go live?',
    'Which channels will carry it: event, TV, digital, field?',
    'How will you measure success?',
  ],
};

export const WATCH = {
  heading: 'Watch the work',
  body: 'Full films on YouTube. Behind the scenes on TikTok and Instagram.',
  channels: ['YouTube', 'TikTok', 'Instagram'],
  pending: '[links to add]',
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
