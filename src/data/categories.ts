import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'ai',
    name: 'AI Tools',
    nameBn: 'এআই টুলস',
    tagline: 'Next-Gen Intelligence',
    taglineBn: 'ভবিষ্যতের ইন্টেলিজেন্স',
    description: 'AI assistants, image, video, voice, coding and automation models curated for Bangladesh.',
    descriptionBn: 'এআই অ্যাসিস্ট্যান্ট, ইমেজ, ভিডিও, ভয়েস, কোডিং এবং অটোমেশন টুলস।',
    icon: 'Sparkles',
    accentColor: '#7C3AED', // Violet
    toolCount: 16,
    sampleTools: ['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Cursor', 'ElevenLabs']
  },
  {
    id: 'creative',
    name: 'Creative Tools',
    nameBn: 'ক্রিয়েটিভ টুলস',
    tagline: 'Design & Motion',
    taglineBn: 'ডিজাইন ও মোশন',
    description: 'Industry-standard graphics, video editing, UI/UX and 3D creative production software.',
    descriptionBn: 'গ্রাফিক্স, ভিডিও এডিটিং, ইউআই/ইউএক্স এবং থ্রিডি ক্রিয়েটিভ সফটওয়্যার স্যুট।',
    icon: 'Palette',
    accentColor: '#2563EB', // Electric Blue
    toolCount: 12,
    sampleTools: ['Adobe Creative Cloud', 'Canva Pro', 'Figma', 'CapCut Pro', 'Envato']
  },
  {
    id: 'marketing',
    name: 'Marketing & SEO',
    nameBn: 'মার্কেটিং ও এসইও',
    tagline: 'Growth & Visibility',
    taglineBn: 'গ্রোথ ও ট্রাফিক',
    description: 'High-impact SEO crawlers, social media suites, lead finders, and inbound marketing engines.',
    descriptionBn: 'হাই-ইমপ্যাক্ট এসইও ক্রলার, সোশ্যাল মিডিয়া স্যুট এবং লিড জেনারেশন টুলস।',
    icon: 'TrendingUp',
    accentColor: '#16A34A', // Emerald
    toolCount: 9,
    sampleTools: ['Semrush', 'Ahrefs', 'Buffer', 'Apollo.io', 'Surfer SEO']
  },
  {
    id: 'business',
    name: 'Business & Office',
    nameBn: 'বিজনেস ও অফিস',
    tagline: 'Operations & CRM',
    taglineBn: 'ব্যবসা ও সিআরএম',
    description: 'Cloud collaboration, CRM, modern ERP, project management, and corporate productivity.',
    descriptionBn: 'ক্লাউড কোলাবোরেশন, সিআরএম, প্রজেক্ট ম্যানেজমেন্ট এবং বিজনেস প্রোডাক্টিভিটি।',
    icon: 'Briefcase',
    accentColor: '#0284C7', // Sky Blue
    toolCount: 14,
    sampleTools: ['Microsoft 365', 'Google Workspace', 'Notion', 'HubSpot', 'ClickUp']
  },
  {
    id: 'industry',
    name: 'Industry ERP & Vertical',
    nameBn: 'ইন্ডাস্ট্রি সফটওয়্যার',
    tagline: 'Vertical Engineering',
    taglineBn: 'স্পেশালাইজড সফটওয়্যার',
    description: 'Dedicated software systems for Construction, Garments, Real Estate, Agro/Poultry, and Manufacturing.',
    descriptionBn: 'নির্মাণ, তৈরি পোশাক, রিয়েল এস্টেট, ডেইরি-পোল্ট্রি ও উৎপাদন শিল্পের সফটওয়্যার।',
    icon: 'Building2',
    accentColor: '#0F766E', // Teal
    toolCount: 10,
    sampleTools: ['Construction ERP', 'Garments ERP', 'AutoCAD', 'Revit', 'Poultry Farm ERP']
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    nameBn: 'ডেভেলপার টুলস',
    tagline: 'Code & Deploy',
    taglineBn: 'কোড ও ডেপ্লয়',
    description: 'AI code editors, Git repositories, edge hosting, cloud databases, and CI/CD pipelines.',
    descriptionBn: 'এআই কোড এডিটর, গিট রিপোজিটরি, এজ হোস্টিং এবং ক্লাউড ডাটাবেস।',
    icon: 'Code2',
    accentColor: '#4F46E5', // Indigo
    toolCount: 8,
    sampleTools: ['GitHub Copilot', 'Cursor Pro', 'Vercel', 'Supabase', 'Firebase']
  },
  {
    id: 'apis',
    name: 'APIs & Cloud',
    nameBn: 'এপিআই ও ক্লাউড',
    tagline: 'Infrastructure & Data',
    taglineBn: 'ইনফ্রাস্ট্রাকচার ও ডাটা',
    description: 'AI inference APIs, SMS/WhatsApp gateways, cloud compute, storage and verification endpoints.',
    descriptionBn: 'এআই ইনফারেন্স এপিআই, এসএমএস ও হোয়াটসঅ্যাপ গেটওয়ে এবং ক্লাউড স্টোরেজ।',
    icon: 'Cpu',
    accentColor: '#9333EA', // Purple
    toolCount: 6,
    sampleTools: ['OpenAI API', 'Cloudflare', 'AWS Credits', 'SMS Gateway BD']
  },
  {
    id: 'services',
    name: 'IT Services & Consulting',
    nameBn: 'আইটি সার্ভিস ও কনসাল্টিং',
    tagline: 'Enterprise Implementation',
    taglineBn: 'ইনস্টলেশন ও সাপোর্ট',
    description: 'Hands-on software deployment, corporate email setup, custom development, and IT troubleshooting.',
    descriptionBn: 'সফটওয়্যার সেটআপ, কর্পোরেট ইমেইল মাইগ্রেশন, কাস্টম ডেভেলপমেন্ট ও আইটি সাপোর্ট।',
    icon: 'Headphones',
    accentColor: '#E11D48', // Rose
    toolCount: 7,
    sampleTools: ['Workspace Setup', 'Custom ERP', 'API Integration', 'Cloud Migration']
  }
];
