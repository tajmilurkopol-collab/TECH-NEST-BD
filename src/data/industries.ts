import { IndustrySolution } from '../types';

export const industries: IndustrySolution[] = [
  {
    id: 'construction',
    name: 'Construction & Civil Engineering',
    nameBn: 'নির্মাণ ও সিভিল ইঞ্জিনিয়ারিং',
    tagline: 'Plan. Design. Build. Track. Manage.',
    taglineBn: 'পরিকল্পনা · ডিজাইন · নির্মাণ · ট্র্যাকিং · ব্যবস্থাপনা',
    headline: 'BUILT FOR BANGLADESH CONSTRUCTION.',
    headlineBn: 'এক টাকার হিসাব ও মিস হবে না — ২০ বছরের অভিজ্ঞতায় তৈরি সফটওয়্যার',
    heroBadge: '20+ Years Construction Tech Experience',
    heroBadgeBn: '২০ বছরের প্রযুক্তিগত অভিজ্ঞতা',
    description: 'Transform site operations, eliminate material loss, and control subcontractor billing with Bangladesh-tailored engineering tools and cloud ERP.',
    descriptionBn: 'আপনার নির্মাণ ব্যবসার প্রতিটি ধাপ এখন আরও সহজ, স্মার্ট ও কার্যকর। রড-সিমেন্টের অপচয় রোধ, সাবকন্ট্রাক্টর পরিমাপ বই (MB) ও সাইট ডিপিআর এক সফটওয়্যারে।',
    accentColor: '#16A34A', // Emerald green
    tools: [
      { name: 'Kyrops Construction ERP', role: 'Site Management & BOQ', roleBn: 'সাইট ব্যবস্থাপনা ও বিওকিউ', price: '৳১৮,৫০০ / মাস', badge: 'Flagship' },
      { name: 'Autodesk AutoCAD & Revit', role: '2D Drafting & 3D BIM', roleBn: 'টু-ডি ড্রাফটিং ও থ্রিডি বিআইএম', price: '৳১,৬৫০ / বছর', badge: 'Official License' },
      { name: 'Oracle Primavera P6', role: 'Mega Scheduling & CPM', roleBn: 'মেগা শিডিউলিং ও সিএমপি', price: '৳৩,২০০ লাইফটাইম' },
      { name: 'Microsoft Project & 365', role: 'Gantt Tracking & Office', roleBn: 'গ্যান্ট ট্র্যাকিং ও অফিস', price: '৳১,৮৫০ / বছর' }
    ],
    keyBenefits: [
      { title: 'No Budget Misses', titleBn: 'এক টাকার হিসাব ও মিস হবে না', desc: 'Real-time BOQ and unit rate breakdown with raw material price fluctuation controls.', descBn: 'কাঁচামালের দর ওঠানামা ও নিখুঁত বিওকিউ এস্টিমেশন হিসাব।' },
      { title: 'Daily Progress via Mobile (DPR)', titleBn: 'ছবি সহ দৈনিক সাইট রিপোর্ট (DPR)', desc: 'Site engineers upload geo-tagged photos and daily labor attendance right from mobile.', descBn: 'সাইট ইঞ্জিনিয়ার সরাসরি মোবাইল থেকে কাজের ছবি ও হাজিরা সাবমিট করবেন।' },
      { title: 'Subcontractor Measurement Book', titleBn: 'সাবকন্ট্রাক্টর এমবি ও বিলিং অনুমোদন', desc: 'Direct digital measurement entry, deduction rules, and automated IPC generation.', descBn: 'ডিজিটাল মাপের খাতা, কাটছাঁট নিয়ম ও আইপিসি বিল অনুমোদন।' },
      { title: 'Dedicated Support & On-Site Training', titleBn: 'ডেডিকেটেড অন-সাইট ট্রেইনিং ও সাপোর্ট', desc: 'Our civil software consultants train your site engineers and project managers on location.', descBn: 'আমাদের ইঞ্জিনিয়াররা আপনার সাইটে এসে প্রজেক্ট টিমকে সরাসরি প্রশিক্ষণ দেবে।' }
    ],
    demoText: 'Book Free Live Demo with Construction Consultant',
    demoTextBn: 'ফ্রি লাইভ ডেমো দেখতে অ্যাপয়েন্টমেন্ট বুক করুন',
    phone: '01969-101010'
  },
  {
    id: 'garments',
    name: 'Garments & Textile RMG',
    nameBn: 'গার্মেন্টস ও টেক্সটাইল শিল্প',
    tagline: 'Order. Production. Stock. Delivery. Accounts.',
    taglineBn: 'অর্ডার · প্রোডাকশন · স্টক · ডেলিভারি · হিসাব',
    headline: 'POWER YOUR APPAREL FACTORY.',
    headlineBn: 'গার্মেন্টস এর সব হিসাব এখন এক সফটওয়্যারে',
    heroBadge: 'BGMEA Standard Compliance Architecture',
    heroBadgeBn: 'বিজিএমইএ কমপ্লায়েন্স স্ট্যান্ডার্ড',
    description: 'All-in-one RMG software for apparel manufacturing: merchandising tech packs, fabric consumption, cutting/sewing floor efficiency, export LC documentation, and compliant payroll.',
    descriptionBn: 'অর্ডার, কাটিং, সুইং লাইন ট্র্যাকিং, মার্চেন্ডাইজিং ও বায়ার কমপ্লায়েন্স — এক সফটওয়্যারে পুরো কারখানা পরিচালনা।',
    accentColor: '#B91C1C', // Textile red
    tools: [
      { name: 'Garments Apparel ERP', role: 'Floor & Merchandising', roleBn: 'ফ্লোর ও মার্চেন্ডাইজিং', price: '৳২৪,০০০ / মাস', badge: 'Flagship' },
      { name: 'Adobe Creative Cloud', role: 'Fashion & Pattern Design', roleBn: 'ফ্যাশন ও টেক প্যাক ডিজাইন', price: '৳১,১৫০ / মাস' },
      { name: 'Google Workspace', role: 'Buyer Email & Tech Packs', roleBn: 'বায়ার ইমেইল ও ড্রাইভ', price: '৳৪৯০ / ইউজার' },
      { name: 'Biometric Labour Law Payroll', role: 'Compliance & Wages', roleBn: 'শ্রম আইন ও বেতন কাঠামো', price: 'অন্তর্ভুক্ত' }
    ],
    keyBenefits: [
      { title: 'Precise Yarn & Fabric Consumption', titleBn: 'সুতা ও কাপড়ের নিখুঁত হিসাব', desc: 'Eliminate over-ordering with automated consumption algorithms based on buyer tech packs.', descBn: 'বায়ারের টেক প্যাক অনুযায়ী অপচয় কমিয়ে সঠিক কাপড় ক্রয়ের নিশ্চয়তা।' },
      { title: 'Hourly Line Balancing Dashboard', titleBn: 'ঘণ্টাভিত্তিক সুইং লাইন আউটপুট', desc: 'Real-time digital dashboard on cutting room and sewing lines showing hourly efficiency.', descBn: 'ফ্লোরের সুইং লাইনের আউটপুট ও এফিশিয়েন্সি লাইভ মনিটরিং।' },
      { title: 'Commercial Export Documentation', titleBn: 'এক্সপোর্ট এলসি ও কমার্শিয়াল ইনভয়েস', desc: 'Generate PI, Commercial Invoice, Packing List, and Export LC documents in seconds.', descBn: 'পিআই, প্যাকিং লিস্ট ও কমার্শিয়াল পেপার এক ক্লিকে প্রিন্ট।' },
      { title: 'Labour Law 2006 Compliant Payroll', titleBn: 'শ্রম আইন অনুযায়ী বায়োমেট্রিক পে-রোল', desc: 'Handles overtime, festival bonuses, deductions, and compliant payslip printouts.', descBn: 'ওভারটাইম ও ফেস্টিভাল বোনাস সহ নির্ভরযোগ্য পে-রোল ব্যবস্থা।' }
    ],
    demoText: 'Request Live Factory Demo with RMG Specialist',
    demoTextBn: 'ফ্যাক্টরি ডেমো দেখতে ফ্রি অ্যাপয়েন্টমেন্ট নিন',
    phone: '01969-101010'
  },
  {
    id: 'agro_poultry',
    name: 'Poultry & Layer Farm',
    nameBn: 'পোল্ট্রি ও লেয়ার খামার',
    tagline: 'Batch. Feed. Yield. Medicine. Profit.',
    taglineBn: 'ব্যাচ · খাদ্য · ডিম উৎপাদন · মেডিসিন · লাভ',
    headline: 'SMART LIVESTOCK & LAYER ERP.',
    headlineBn: 'এক সফটওয়্যারেই পুরো লেয়ার খামারের হিসাব',
    heroBadge: 'Veterinary & Feed Formula Engine',
    heroBadgeBn: 'স্মার্ট খামার ও ফিড ফর্মুলা ইঞ্জিন',
    description: 'Track daily egg production, feed consumption ratios, vaccine alerts, and wholesale dealer credit ledgers on a single bilingual mobile and desktop dashboard.',
    descriptionBn: 'ডিম উৎপাদন, খাদ্য খরচ, মেডিসিন সিডিউল, ডিলার বাকি ও দৈনিক নিট আয় — আপনার পুরো পোল্ট্রি খামার পরিচালনা করুন সহজে।',
    accentColor: '#D97706', // Agro amber
    tools: [
      { name: 'Smart Poultry Layer ERP', role: 'Egg & Feed Formulation', roleBn: 'ডিম ও খাদ্য হিসাব', price: '৳৪,৫০০ / মাস', badge: 'Flagship' },
      { name: 'SMS Vaccination Dispatcher', role: 'Daily Worker Reminders', roleBn: 'টিকা ও ওষুধের এসএমএস', price: '৳০.৩৫ / এসএমএস' },
      { name: 'Dealer Accounting & Khata', role: 'Credit Ledger & Invoices', roleBn: 'পাইকারি ডিলার খাতা', price: 'অন্তর্ভুক্ত' }
    ],
    keyBenefits: [
      { title: 'Daily Egg Yield & Rejections', titleBn: 'শেড অনুযায়ী দৈনিক ডিম উৎপাদন', desc: 'Compare laying percentages across sheds and age batches to spot health dips instantly.', descBn: 'শেড অনুযায়ী ডিম উৎপাদনের শতকরা হার ও ড্রপ পর্যবেক্ষণ।' },
      { title: 'Feed Conversion Ratio (FCR)', titleBn: 'খাদ্য খরচ ও এফসিআর হিসাব', desc: 'Monitor gram-per-bird intake against egg production to optimize feeding budgets.', descBn: 'পাখির খাদ্য গ্রহণ ও ডিম উৎপাদনের তুলনা করে অপচয় কমানো।' },
      { title: 'Automated Vaccination Calendar', titleBn: 'টিকা ও ওষুধের অটো এসএমএস সিডিউল', desc: 'Never miss a vaccine cycle; automated SMS alerts send directly to your farm manager.', descBn: 'ভ্যাকসিন ও কৃমিনাশকের দিন স্বয়ংক্রিয় এলার্ট নোটিফিকেশন।' }
    ],
    demoText: 'Schedule Farm Management Demonstration',
    demoTextBn: 'খামার সফটওয়্যারের ফ্রি লাইভ ডেমো দেখুন',
    phone: '01969-101010'
  },
  {
    id: 'real_estate',
    name: 'Real Estate & Properties',
    nameBn: 'রিয়েল এস্টেট ও প্রোপার্টিজ',
    tagline: 'Inventory. Installments. Leads. Bookings.',
    taglineBn: 'ইনভেন্টরি · কিস্তি · লিড · বুকিং',
    headline: 'THE DIGITAL STACK FOR REAL ESTATE.',
    headlineBn: 'রিয়েল এস্টেট ডেভেলপারদের পূর্ণাঙ্গ সেলস ও বুকিং সফটওয়্যার',
    heroBadge: 'Apartment & Plot CRM Engine',
    heroBadgeBn: 'ফ্ল্যাট ও প্লট সেলস সিআরএম',
    description: 'Keep track of every available flat, floor plan, buyer installment schedule, commission payouts, and Facebook leads in one synchronized database.',
    descriptionBn: 'ফ্ল্যাট ইনভেন্টরি, কিস্তির শিডিউল, ক্লায়েন্ট ফলো-আপ ও সেলস টিমের পারফরম্যান্স পর্যবেক্ষণ এক জায়গায়।',
    accentColor: '#0284C7',
    tools: [
      { name: 'Real Estate Developer CRM', role: 'Flat Inventory & CRM', roleBn: 'ফ্ল্যাট ইনভেন্টরি ও সিআরএম', price: '৳১৫,০০০ / মাস', badge: 'Flagship' },
      { name: 'WhatsApp Business API Bot', role: 'Instant Flat Brochure Bot', roleBn: 'হোয়াটসঅ্যাপ ব্রোশিয়ার বট', price: '৳২,২০০ / মাস' },
      { name: 'Adobe Creative Cloud', role: 'Brochure & 3D Render', roleBn: 'ব্রোশিয়ার ও ৩ডি রেন্ডার', price: '৳১,১৫০ / মাস' }
    ],
    keyBenefits: [
      { title: 'Live Flat Inventory Matrix', titleBn: 'লাইভ ফ্ল্যাট ইনভেন্টরি ম্যাট্রিক্স', desc: 'Color-coded building grid showing Booked, Sold, Available, and Reserved units in real-time.', descBn: 'কোন ফ্ল্যাট বিক্রি বা বুকিং হয়েছে তা রিয়েল-টাইম দেখার গ্রিড।' },
      { title: 'Automated Installment SMS Due Reminders', titleBn: 'কিস্তির স্বয়ংক্রিয় এসএমএস রিমাইন্ডার', desc: 'Send customized payment notices with bank deposit instructions automatically every month.', descBn: 'ক্লায়েন্টদের প্রতি মাসের কিস্তির তারিখের আগে স্বয়ংক্রিয় তাগাদা এসএমএস।' }
    ],
    demoText: 'Schedule Real Estate Stack Consultation',
    demoTextBn: 'রিয়েল এস্টেট সফটওয়্যারের ফ্রি কনসালটেশন নিন',
    phone: '01969-101010'
  }
];
