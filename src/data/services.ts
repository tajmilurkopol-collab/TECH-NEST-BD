import { ITServiceItem } from '../types';

export const itServices: ITServiceItem[] = [
  {
    id: 'email-migration',
    title: 'Google Workspace & M365 Setup',
    titleBn: 'গুগল ওয়ার্কস্পেস ও এম৩৬৫ সেটআপ',
    category: 'Cloud Infrastructure',
    categoryBn: 'ক্লাউড ইনফ্রাস্ট্রাকচার',
    description: 'Stop having emails bounce or get caught in spam. Complete domain setup, DKIM, SPF, DMARC, and smooth mailbox migration.',
    descriptionBn: 'স্প্যাম ফ্রি অফিসিয়াল বিজনেস ইমেইল সেটআপ, ডিএনএস কনফিগারেশন এবং পুরাতন মেইল ব্যাকআপ মাইগ্রেশন।',
    deliverables: ['Custom domain MX/SPF/DKIM/DMARC', 'Zero-downtime mailbox sync', 'Mobile sync setup', 'Admin management training'],
    deliverablesBn: ['ডিএনএস ও এসপিএফ/ডিকিম কনফিগারেশন', 'বিনা ডাউনটাইমে সব মেইল ট্রান্সফার', 'মোবাইল আউটলুক/জিমেইল সিঙ্ক', 'অ্যাডমিন প্রশিক্ষণ'],
    priceStartingAt: 6500,
    duration: '24 - 48 Hours',
    durationBn: '২৪ - ৪৮ ঘণ্টা',
    icon: 'Mail'
  },
  {
    id: 'custom-erp-dev',
    title: 'Custom Software & Enterprise ERP',
    titleBn: 'কাস্টম সফটওয়্যার ও ইআরপি তৈরি',
    category: 'Software Engineering',
    categoryBn: 'সফটওয়্যার ইঞ্জিনিয়ারিং',
    description: 'Bespoke web applications, factory inventory systems, and private portals engineered for Bangladesh business workflows.',
    descriptionBn: 'আপনার প্রতিষ্ঠানের কাজের ধরনের সাথে মিলিয়ে নিজস্ব আধুনিক ওয়েব অ্যাপ্লিকেশন, ইনভেন্টরি ও ক্লাউড সিস্টেম।',
    deliverables: ['Requirements architecture sprint', 'React & Node.js scalable stack', 'Granular multi-role permissions', '100% full source code handover'],
    deliverablesBn: ['রিকোয়ারমেন্ট স্পেসিফিকেশন ও আর্কিটেকচার', 'রিঅ্যাক্ট ও নোড.জেএস আধুনিক কোডবেস', 'অ্যাডমিন ও ইউজার রোল পারমিশন', '১০০% সোর্স কোড হ্যান্ডওভার'],
    priceStartingAt: 45000,
    duration: '3 - 6 Weeks',
    durationBn: '৩ - ৬ সপ্তাহ',
    icon: 'Code2'
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Business API & Bot Integration',
    titleBn: 'হোয়াটসঅ্যাপ বিজনেস এপিআই ও অটোমেশন বট',
    category: 'Automation & APIs',
    categoryBn: 'অটোমেশন ও এপিআই',
    description: 'Send automated order notifications, appointment bookings, and flat installment reminders directly on WhatsApp.',
    descriptionBn: 'গ্রাহকদের স্বয়ংক্রিয় অর্ডার কনফার্মেশন, বাকি টাকার তাগাদা ও কাস্টমার সার্ভিস চ্যাটবট ইন্টিগ্রেশন।',
    deliverables: ['Official Meta WhatsApp API verification', 'Automated message templates approved', 'Database webhook integration', 'Multi-agent support dashboard'],
    deliverablesBn: ['অফিসিয়াল মেটা গ্রিন টিক ভেরিফিকেশন সহায়তা', 'মেসেজ টেমপ্লেট অনুমোদন', 'সফটওয়্যার ওয়েবহুক কানেকশন', 'কাস্টমার সাপোর্ট ড্যাশবোর্ড'],
    priceStartingAt: 12000,
    duration: '3 - 5 Days',
    durationBn: '৩ - ৫ দিন',
    icon: 'MessageSquare'
  },
  {
    id: 'cloud-security',
    title: 'Cloud Server Setup & Cyber Hardening',
    titleBn: 'ক্লাউড সার্ভার সেটআপ ও সাইবার সিকিউরিটি',
    category: 'Cybersecurity & DevOps',
    categoryBn: 'সাইবার সিকিউরিটি ও ডেভঅপস',
    description: 'VPS configuration on AWS / DigitalOcean / Hetzner, automated daily cloud snapshots, firewall hardening, and SSL enforcement.',
    descriptionBn: 'এডাব্লিউএস/ডিজিটালওশান সার্ভার সেটআপ, দৈনিক অটো ক্লাউড ব্যাকআপ এবং হ্যাকিং প্রতিরোধে ফায়ারওয়াল সিকিউরিটি।',
    deliverables: ['Linux Ubuntu server hardening', 'Automated off-site database backups', 'Cloudflare CDN & DDoS shield', 'Uptime monitoring alerts via SMS'],
    deliverablesBn: ['লিনাক্স সার্ভার সিকিউরিটি কনফিগারেশন', 'অফ-সাইট ডাটাবেস অটো ব্যাকআপ', 'ক্লাউডফ্লেয়ার ডিডিওএস প্রোটেকশন', 'সার্ভার ডাউন হলে এসএমএস এলার্ট'],
    priceStartingAt: 8500,
    duration: '24 Hours',
    durationBn: '২৪ ঘণ্টা',
    icon: 'Shield'
  },
  {
    id: 'corporate-it-support',
    title: 'Dedicated Corporate IT Support (Monthly SLA)',
    titleBn: 'কর্পোরেট আইটি সাপোর্ট ও মেইনটেন্যান্স (SLA)',
    category: 'Managed Services',
    categoryBn: 'ম্যানেজড আইটি সার্ভিস',
    description: 'Your on-demand outsourced IT department. Fast troubleshooting for computer workstations, printers, network routers, and software licensing.',
    descriptionBn: 'আপনার অফিসের সম্পূর্ণ আইটি দায়িত্ব আমাদের। পিসি, নেটওয়ার্ক, প্রিন্টার ও লাইসেন্স ব্যবস্থাপনায় সার্বক্ষণিক সাপোর্ট।',
    deliverables: ['Direct phone & WhatsApp hotline', 'Remote desktop quick fix within 15m', 'Monthly physical preventive maintenance visit', 'License audit and renewal tracking'],
    deliverablesBn: ['জরুরি ফোন ও হোয়াটসঅ্যাপ হটলাইন', '১৫ মিনিটের ভেতর রিমোট ডেস্কটপ সমাধান', 'মাসে শিডিউলড ফিজিক্যাল অফিস ভিজিট', 'সফটওয়্যার লাইসেন্সিং অডিট'],
    priceStartingAt: 15000,
    duration: 'Ongoing Monthly SLA',
    durationBn: 'মাসিক চুক্তিভিত্তিক',
    icon: 'Headphones'
  }
];
