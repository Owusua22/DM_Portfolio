// lib/portfolioMock.ts
// Static front-end data — replaces all Supabase server fetches.
// No server, no env vars, 100% client-side. Import this anywhere instead of supabase.

export type MediaKind = 'image' | 'video';

export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  description: string;
  summary?: string;
  category: string;
  sourceType: 'case_study' | 'project' | 'design' | 'video';
  videoUrl?: string;
  projectUrl?: string;
  driveUrl?: string;
  date?: string;
  client?: string;
  year?: string;
  role?: string;
  tools?: string[];
  services?: string[];
  situation?: string;
  task?: string;
  action?: string;
  results?: string;
  result?: string;
  impactLabel?: string;
  platform?: string;
  isFeatured?: boolean;
  galleryImages: string[];
}

// ---- Static dataset showcasing Digital Marketing + Full-Stack Web Development ----
export const STATIC_PORTFOLIO: PortfolioItem[] = [
  // ==================== CASE STUDIES (Digital Marketing) ====================
  {
    id: 'cs-001',
    sourceType: 'case_study',
    image: '/assets/img/portfolio/portfolio-1.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-1.webp'],
    title: 'E-Commerce SEO Growth — +142% Organic Traffic in 5 Months',
    description: 'Technical SEO, content clusters & internal linking for a Ghanaian beauty e-commerce store.',
    summary: 'A full-funnel organic growth program that lifted organic sessions 142% and revenue 68% without increasing ad spend.',
    category: 'SEO & Content Strategy',
    client: 'Belle Ghana (E-commerce)',
    year: '2024',
    situation: 'Brand had strong products but <5% of traffic came from organic search; product pages were thin and unindexed.',
    task: 'Audit and rebuild organic acquisition: technical fixes, keyword-led content, and conversion paths.',
    action: 'Ran full technical audit (titles, meta, headings, image alt, internal links), built 22 content clusters around search intent, optimized collection pages, and created an internal linking hub.',
    results: '142% organic traffic, 68% revenue growth, 39 top-3 keyword rankings. Work owned end-to-end (research → execution → reporting).',
    result: '+142% organic traffic',
    impactLabel: '+142% organic sessions',
    services: ['SEO', 'Content Strategy', 'Analytics'],
    tools: ['Semrush', 'GA4', 'Google Search Console', 'Screaming Frog'],
    driveUrl: 'https://drive.google.com/',
    isFeatured: true,
    date: '2024-08-10',
  },
  {
    id: 'cs-002',
    sourceType: 'case_study',
    image: '/assets/img/portfolio/portfolio-2.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-2.webp', '/assets/img/portfolio/portfolio-10.webp'],
    title: 'PPC & Funnel Redesign — Cost-Per-Lead Down 38%',
    description: 'Google Ads restructure + HubSpot nurture flows for a B2B services brand.',
    summary: 'Restructured search campaigns and landing pages, then layered HubSpot email automation to halve cost-per-lead.',
    category: 'PPC & CRO',
    client: 'Cell7 AI (B2B SaaS)',
    year: '2024',
    situation: 'Paid leads were expensive and landing pages converted at 1.8%. No post-click nurture.',
    task: 'Reduce CPL, increase conversion rate, and add lead nurture without hiring extra headcount.',
    action: 'Rebuilt campaigns around intent tiers, wrote new ad copy & audience exclusions, redesigned landing pages, and built a 3-step HubSpot workflow (welcome → case study → booking).',
    results: 'CPL −38%, CVR 1.8% → 4.1%, +54 booked demos/month. Dashboard in Looker Studio for weekly optimization.',
    result: '−38% cost per lead',
    impactLabel: '−38% CPL',
    services: ['Google Ads', 'CRO', 'HubSpot Automation'],
    tools: ['Google Ads', 'HubSpot', 'GA4', 'Figma'],
    driveUrl: 'https://drive.google.com/',
    isFeatured: true,
    date: '2024-06-15',
  },
  {
    id: 'cs-003',
    sourceType: 'case_study',
    image: '/assets/img/portfolio/portfolio-4.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-4.webp'],
    title: 'Social Growth System — 0 to 12k Engaged Followers',
    description: 'Content pillars, short-form video, and community management for a women-entrepreneurs community.',
    summary: 'A repeatable content system that grew Wemomprenuer from sporadic posting to a daily calendar with 12k+ engaged followers.',
    category: 'Social Media & Community',
    client: 'Wemomprenuer',
    year: '2023',
    situation: 'Inconsistent posting, no content pillars, low save/share rate.',
    task: 'Create a content calendar and formats that drive saves, shares, and DMs.',
    action: 'Built 4 content pillars, 3 UGC video formats, weekly batch production, and a response playbook. Used Instagram Insights & TikTok Analytics to double down on winners.',
    results: '12k followers, avg. 4.2% engagement, 3 brand partnership inquiries/month.',
    result: '12k engaged followers',
    impactLabel: '12k followers',
    services: ['Social Strategy', 'UGC', 'Community Management'],
    tools: ['Meta Business Suite', 'Canva', 'CapCut', 'Notion'],
    driveUrl: 'https://drive.google.com/',
    isFeatured: false,
    date: '2023-11-20',
  },

  // ==================== PROJECTS (Full-Stack / Web Dev) ====================
  {
    id: 'proj-001',
    sourceType: 'project',
    image: '/assets/img/portfolio/portfolio-5.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-5.webp'],
    title: 'Portfolio CMS — Next.js 14 + Supabase + Storage',
    description: 'Full-stack CMS I built to manage this portfolio: role-based auth, media uploads, and live Supabase CRUD.',
    summary: 'A custom admin panel with tabbed CRUD, drag-and-drop media uploads (Supabase Storage), featured toggles, and optimistic UI. Originally server-rendered — now rebuilt as a static showcase with mock data to demonstrate architecture.',
    category: 'Full-Stack Web App',
    role: 'Full-Stack Developer (Design → Deploy)',
    tools: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind', 'Vercel'],
    projectUrl: 'https://github.com/Owusua22/DM_Portfolio',
    date: '2024-09-01',
    isFeatured: true,
  },
  {
    id: 'proj-002',
    sourceType: 'project',
    image: '/assets/img/portfolio/portfolio-7.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-7.webp'],
    title: 'SEO Audit Automation Tool — React + Node + Python',
    description: 'Internal tool that crawls a sitemap and scores titles, metas, headings, alt text and internal links.',
    summary: 'Paste a domain, get a scored audit with fixes prioritized by impact. Exports CSV for clients. Demonstrates my ability to bridge marketing expertise with engineering.',
    category: 'Marketing Tech / Full-Stack',
    role: 'Product & Full-Stack Builder',
    tools: ['React', 'Node.js', 'Python', 'Cheerio', 'Chart.js'],
    projectUrl: 'https://github.com/',
    driveUrl: 'https://drive.google.com/',
    date: '2024-07-22',
    isFeatured: true,
  },
  {
    id: 'proj-003',
    sourceType: 'project',
    image: '/assets/img/portfolio/portfolio-11.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-11.webp'],
    title: 'Analytics Dashboard — GA4 + Looker Studio + Custom API',
    description: 'Client-facing dashboard that blends GA4, Search Console and HubSpot data into one decision view.',
    summary: 'Designed the data model, built the ETL in Node, and shipped a responsive React dashboard with date comparisons and annotation markers.',
    category: 'Data & Visualization',
    role: 'Full-Stack + Analytics',
    tools: ['Next.js', 'Recharts', 'GA4 API', 'Supabase'],
    projectUrl: 'https://github.com/',
    date: '2024-05-30',
    isFeatured: false,
  },
  {
    id: 'proj-004',
    sourceType: 'project',
    image: '/assets/img/portfolio/portfolio-8.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-8.webp'],
    title: 'E-Commerce Storefront — Headless Shopify + Next.js',
    description: 'Fast, accessible storefront with static generation, cart, and checkout — SEO-first from day one.',
    summary: 'Built with Next.js static export, Shopify Storefront API, and optimistic cart. Lighthouse 98/100, fully responsive.',
    category: 'E-Commerce / Front-End',
    role: 'Front-End Developer',
    tools: ['Next.js', 'Shopify API', 'Tailwind', 'Zustand'],
    projectUrl: 'https://github.com/',
    date: '2024-03-10',
    isFeatured: false,
  },

  // ==================== DESIGN PROJECTS ====================
  {
    id: 'des-001',
    sourceType: 'design',
    image: '/assets/img/portfolio/portfolio-10.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-10.webp', '/assets/img/portfolio/portfolio-1.webp', '/assets/img/portfolio/portfolio-2.webp'],
    title: 'Brand & Social Kit — Wemomprenuer',
    description: 'Logo lockups, Instagram carousel templates, and story kits built for consistency at speed.',
    summary: 'A cohesive visual system: palette, type, iconography and 12 reusable Canva/Figma templates for daily posting.',
    category: 'Brand & Social Design',
    date: '2023-09-15',
    isFeatured: true,
  },
  {
    id: 'des-002',
    sourceType: 'design',
    image: '/assets/img/portfolio/portfolio-1.webp',
    galleryImages: ['/assets/img/portfolio/portfolio-1.webp'],
    title: 'Campaign Landing Page — Lead Magnet',
    description: 'High-converting landing page for a downloadable SEO checklist (designed in Figma, built in Next.js).',
    summary: 'Wireframed, designed, and coded the landing page. A/B tested headline + CTA, final CVR 22%.',
    category: 'UI / Landing Page',
    date: '2024-02-18',
    isFeatured: false,
  },

  // ==================== UGC VIDEOS ====================
  {
    id: 'vid-001',
    sourceType: 'video',
    image: '/assets/img/person/peron5.jpg',
    galleryImages: ['/assets/img/person/peron5.jpg'],
    title: 'UGC Product Review — Skincare Routine (TikTok)',
    description: '30s authentic review driving saves and click-through to product page. Hook → demo → CTA structure.',
    category: 'UGC Video',
    platform: 'TikTok',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    date: '2024-08-05',
    isFeatured: true,
  },
  {
    id: 'vid-002',
    sourceType: 'video',
    image: '/assets/img/person/person-f-10.webp',
    galleryImages: ['/assets/img/person/person-f-10.webp'],
    title: 'Founder Story — Behind the Brand (Reels)',
    description: 'Founder-led narrative that humanizes the brand and boosts watch time. Captions + on-screen text optimized.',
    category: 'UGC Video',
    platform: 'Instagram Reels',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    date: '2024-07-18',
    isFeatured: false,
  },
  {
    id: 'vid-003',
    sourceType: 'video',
    image: '/assets/img/person/person-m-7.webp',
    galleryImages: ['/assets/img/person/person-m-7.webp'],
    title: 'Tutorial — How to Use Our SEO Checklist (YouTube Shorts)',
    description: 'Educational short that funnels viewers to the lead magnet. Clear chapters and end screen.',
    category: 'UGC Video',
    platform: 'YouTube Shorts',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    date: '2024-06-02',
    isFeatured: false,
  },
];
