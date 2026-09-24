import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  CreditCard,
  Truck,
  Headphones,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  X,
  Phone,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { generateWhatsAppLink } from '../utils/helpers';

interface FAQSectionProps {
  language: Language;
}

type FAQCategory = 'all' | 'billing' | 'delivery' | 'support';

interface FAQItem {
  id: string;
  category: 'billing' | 'delivery' | 'support';
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  pointsEn?: string[];
  pointsBn?: string[];
  badgeEn: string;
  badgeBn: string;
}

const FAQ_DATA: FAQItem[] = [
  // 1. Subscription Billing & Payment
  {
    id: 'billing-methods',
    category: 'billing',
    badgeEn: 'Payment Options',
    badgeBn: 'পেমেন্ট মাধ্যম',
    questionEn: 'How can I pay in Bangladeshi Taka (BDT) without a dual-currency credit card?',
    questionBn: 'ডুয়েল কারেন্সি ক্রেডিট কার্ড ছাড়া আমি কীভাবে বাংলাদেশি টাকায় (BDT) পেমেন্ট করতে পারব?',
    answerEn:
      'You do not need any international credit or mastercard. We accept direct local payments through bKash Personal & Merchant, Nagad, Rocket, Corporate Bank Transfer, and local VISA/Mastercard debit cards in BDT with zero hidden foreign conversion fees.',
    answerBn:
      'আপনার কোনো আন্তর্জাতিক ক্রেডিট বা মাস্টারকার্ডের প্রয়োজন নেই। আপনি সরাসরি বিকাশ (ব্যক্তিগত ও মার্চেন্ট), নগদ, রকেট, সরাসরি ব্যাংক ট্রান্সফার এবং যেকোনো লোকাল ডেবিট কার্ডের মাধ্যমে সরাসরি বাংলাদেশি টাকায় কোনো প্রকার হিডেন বা আন্তর্জাতিক কনভার্সন ফি ছাড়াই পরিশোধ করতে পারবেন।',
    pointsEn: [
      'bKash, Nagad & Rocket instant local payment',
      'Direct Bangladesh bank account transfer for businesses',
      'Zero international markup or currency risk',
      'Official money receipt provided immediately upon confirmation',
    ],
    pointsBn: [
      'বিকাশ, নগদ ও রকেটে তাৎক্ষণিক পেমেন্ট সুবিধা',
      'ব্যবসায়ীদের জন্য সরাসরি ব্যাংক ট্রান্সফার ও কর্পোরেট ইনভয়েসিং',
      'কোনো অতিরিক্ত বৈদেশিক মুদ্রা ফি বা ডলার রেট ঝুঁকি নেই',
      'অর্ডার নিশ্চিতের সাথে সাথে অফিসিয়াল মানি রিসিট প্রদান',
    ],
  },
  {
    id: 'billing-durations',
    category: 'billing',
    badgeEn: 'Plan Duration',
    badgeBn: 'প্ল্যানের মেয়াদ',
    questionEn: 'What subscription durations are available and how do renewals work?',
    questionBn: 'কী কী মেয়াদের সাবস্ক্রিপশন প্ল্যান রয়েছে এবং রিনিউয়াল প্রক্রিয়া কীভাবে কাজ করে?',
    answerEn:
      'Depending on the tool, we provide 1-Month, 3-Month, 6-Month, 1-Year, and Lifetime/Perpetual options. Before your subscription period expires, our team sends a reminder via WhatsApp and email so you can smoothly renew without service interruption or data loss.',
    answerBn:
      'সফটওয়্যারের ধরন অনুযায়ী ১ মাস, ৩ মাস, ৬ মাস, ১ বছর এবং কিছু সফটওয়্যারের জন্য ওয়ান-টাইম/লাইফটাইম প্ল্যান রয়েছে। মেয়াদ শেষ হওয়ার ৩–৫ দিন পূর্বে আমাদের স্বয়ংক্রিয় সিস্টেম ও হোয়াটসঅ্যাপ টিম আপনাকে নোটিফিকেশন পাঠাবে, যাতে কোনো বিরতি ছাড়াই আপনি আগের অ্যাকাউন্টে রিনিউ করতে পারেন।',
    pointsEn: [
      'Flexible durations: Monthly, Semi-Annual, and Annual tiers',
      'Advance renewal reminders via WhatsApp & Email',
      'Retain existing account history and workflows seamlessly',
    ],
    pointsBn: [
      '১ মাস, ৬ মাস ও বাৎসরিক সাশ্রয়ী প্ল্যান নির্বাচন করার সুযোগ',
      'মেয়াদ শেষ হওয়ার আগেই হোয়াটসঅ্যাপ ও ইমেইলে রিমাইন্ডার',
      'কোনো হিস্ট্রি বা সেটিংস না হারিয়ে একই অ্যাকাউন্টে রিনিউয়াল',
    ],
  },
  {
    id: 'billing-invoice',
    category: 'billing',
    badgeEn: 'B2B & Corporate',
    badgeBn: 'কর্পোরেট ইনভয়েস',
    questionEn: 'Do you provide official VAT/Tax invoices for companies and agencies?',
    questionBn: 'কোম্পানি বা এজেন্সির জন্য কি অফিসিয়াল ইনভয়েস ও ভ্যাট/ট্যাক্স বিল পাওয়া যায়?',
    answerEn:
      'Yes, absolutely. For software development houses, garments buying houses, construction developers, and creative agencies, we supply formal B2B invoices with corporate billing details, payment vouchers, and official delivery documentation for business expense accounting.',
    answerBn:
      'হ্যাঁ, অবশ্যই। কর্পোরেট প্রতিষ্ঠান, গার্মেন্টস ফ্যাক্টরি, কনস্ট্রাকশন ফার্ম ও ডিজিটাল এজেন্সিগুলোর জন্য আমরা কোম্পানির নামে সিল ও সাইনযুক্ত অফিসিয়াল ট্যাক্স ইনভয়েস ও পেমেন্ট ভাউচার প্রদান করি, যা আপনার বার্ষিক অডিট ও অ্যাকাউন্টিংয়ে ব্যবহারযোগ্য।',
  },
  {
    id: 'billing-replacement',
    category: 'billing',
    badgeEn: 'Warranty & Replacement',
    badgeBn: 'ওয়ারেন্টি ও প্রতিস্থাপন',
    questionEn: 'What is your warranty and replacement policy during the subscription period?',
    questionBn: 'সাবস্ক্রিপশন চলাকালীন ওয়ারেন্টি ও অ্যাকাউন্ট রিপ্লেসমেন্ট পলিসি কী?',
    answerEn:
      'All digital software and AI seats purchased through Kyrops Digital come with a 100% Full-Duration Warranty. In the rare event of a global platform reset or access disruption, our dedicated technical desk restores access or provides a replacement account within 1 to 4 hours.',
    answerBn:
      'কাইরোপস ডিজিটাল থেকে সংগৃহীত প্রতিটি সফটওয়্যার ও এআই টুলে ১০০% ফুল-টার্ম ওয়ারেন্টি থাকে। বৈশ্বিক কোনো টেকনিক্যাল সমস্যা বা অ্যাক্সেস জটিলতা দেখা দিলে আমাদের ঢাকা সাপোর্ট ডেস্ক ১ থেকে ৪ ঘণ্টার মধ্যে অ্যাকাউন্টটি ঠিক করে দেয় অথবা সমমানের ফ্রেশ রিপ্লেসমেন্ট প্রদান করে।',
  },

  // 2. Software Delivery & Activation
  {
    id: 'delivery-speed',
    category: 'delivery',
    badgeEn: '15-60 Mins',
    badgeBn: '১৫-৬০ মিনিট',
    questionEn: 'How fast is software delivered and activated after payment?',
    questionBn: 'পেমেন্ট সম্পন্ন করার পর কত দ্রুত সফটওয়্যার ডেলিভারি ও অ্যাক্টিভেশন পাওয়া যায়?',
    answerEn:
      'Most mainstream digital tools (like ChatGPT Plus, Claude Pro, Canva Pro, CapCut, Adobe Creative Cloud, and Microsoft 365) are delivered within 15 to 60 minutes during standard business hours (9:00 AM – 11:00 PM). Specialized enterprise ERP deployments are coordinated same-day with dedicated technical onboarding.',
    answerBn:
      'সাধারণত চ্যাটজিপিটি প্লাস, ক্লড ৩.৫ সননেট, ক্যানভা প্রো, ক্যাপকাট, অ্যাডোবি ক্লাউড বা অফিস ৩৬৫ এর মতো টুলগুলো পেমেন্ট নিশ্চিতের ১৫ থেকে ৬০ মিনিটের মধ্যেই ডেলিভারি করা হয়। বিশেষায়িত এন্টারপ্রাইজ সফটওয়্যার বা ইআরপিগুলোর ক্ষেত্রে একই দিনে সেটআপ ও ওনবোর্ডিং টিম সহায়তা প্রদান করে।',
    pointsEn: [
      'Rapid delivery: Average 15 to 45 minutes',
      'Credentials delivered privately to your Email and WhatsApp',
      'Step-by-step Bengali & English setup guide included',
    ],
    pointsBn: [
      'গড়ে মাত্র ১৫ থেকে ৪৫ মিনিটের মধ্যে দ্রুততম ডেলিভারি',
      'আপনার ব্যক্তিগত ইমেইল ও হোয়াটসঅ্যাপে সম্পূর্ণ সিকিউরড তথ্য প্রদান',
      'সহজ ধাপে লগইন করার জন্য বাংলা ও ইংরেজি গাইডলাইন সংযুক্ত',
    ],
  },
  {
    id: 'delivery-method',
    category: 'delivery',
    badgeEn: 'Account Type',
    badgeBn: 'অ্যাকাউন্ট টাইপ',
    questionEn: 'How do I access the software: on my own email or a dedicated account?',
    questionBn: 'সফটওয়্যার অ্যাক্সেস কি আমার নিজের ইমেইলে দেওয়া হবে নাকি নতুন একাউন্ট প্রদান করা হবে?',
    answerEn:
      'We offer both tiers based on your preference and the specific tool: Private Email Invitation (e.g., Canva Pro, Notion, Figma, Google Workspace directly on your own existing email) or Pre-Activated High-Tier Dedicated Private Accounts (e.g., ChatGPT Plus, Midjourney, Claude) with full personal login credentials.',
    answerBn:
      'টুলের ধরন ও আপনার পছন্দ অনুযায়ী দুইভাবেই সেবা দেওয়া হয়: নিজস্ব ইমেইলে ইনভাইটেশন (যেমন: ক্যানভা প্রো, ফিগমা, নোশন বা গুগল ওয়ার্কস্পেস সরাসরি আপনার ইমেইলে অ্যাক্টিভ হবে) অথবা প্রি-অ্যাক্টিভেটেড ফ্রেশ প্রাইভেট অ্যাকাউন্ট (যেমন: চ্যাটজিপিটি, ক্লড, মিডজার্নি) সম্পূর্ণ আপনার একক ব্যবহারের জন্য সরবরাহ করা হবে।',
  },
  {
    id: 'delivery-data-privacy',
    category: 'delivery',
    badgeEn: 'Data Privacy',
    badgeBn: 'ডাটা প্রাইভেসি',
    questionEn: 'Will my projects, files, and designs remain safe and private?',
    questionBn: 'আমার কাজ, ফাইল ও প্রজেক্টের ডাটা কি সম্পূর্ণ নিরাপদ ও প্রাইভেট থাকবে?',
    answerEn:
      'Yes, 100%. We prioritize enterprise-grade confidentiality. Whether you are using Canva for client graphics, ChatGPT for research, or AutoCAD for structural designs, your files, prompts, and workspace contents belong strictly to you. No Kyrops agent accesses your workspaces.',
    answerBn:
      'হ্যাঁ, শতভাগ নিরাপদ থাকবে। আপনার ডিজাইন, ক্লায়েন্টের প্রজেক্ট, এআই প্রম্পট কিংবা কোড সম্পূর্ণ আপনার নিয়ন্ত্রণে থাকে। কাইরোপস ডিজিটাল কোনো গ্রাহকের ডেটা বা অ্যাকাউন্টের ব্যক্তিগত ফাইলে কোনো হস্তক্ষেপ করে না।',
  },
  {
    id: 'delivery-existing-renewal',
    category: 'delivery',
    badgeEn: 'Seamless Renewal',
    badgeBn: 'আগের হিস্ট্রি বহাল',
    questionEn: 'Can I renew an existing account without losing my saved history?',
    questionBn: 'আমি কি আগের অ্যাকাউন্টেই রিনিউ করতে পারব যাতে আমার হিস্ট্রি বা ডেটা মুছে না যায়?',
    answerEn:
      'In the vast majority of tools (Canva, Microsoft 365, Adobe, Google Workspace, Perplexity, etc.), renewals are directly applied to the existing user workspace, preserving all your files, folders, chat archives, and team assets without disruption.',
    answerBn:
      'অধিকাংশ সফটওয়্যারের ক্ষেত্রেই (যেমন ক্যানভা, মাইক্রোসফট ৩৬৫, অ্যাডোবি, গুগল ওয়ার্কস্পেস ইত্যাদি) সরাসরি আপনার বর্তমান অ্যাকাউন্টে মেয়াদ বৃদ্ধি করা হয়, যাতে আপনার কোনো ফাইল, ফোল্ডার, হিস্ট্রি বা টিম প্রজেক্ট নষ্ট না হয়।',
  },

  // 3. Support Services & Technical Assistance
  {
    id: 'support-contact',
    category: 'support',
    badgeEn: 'Direct Helpdesk',
    badgeBn: 'সরাসরি হেল্পডেস্ক',
    questionEn: 'How can I reach human support if I experience any technical trouble?',
    questionBn: 'কোনো টেকনিক্যাল সমস্যা হলে আমি কীভাবে সরাসরি সাপোর্ট টিমের সাথে যোগাযোগ করতে পারি?',
    answerEn:
      'You can reach our Dhaka technical desk directly via WhatsApp at +880 1969-101010, call our phone hotline, or submit an email. You will speak with knowledgeable tech personnel in Bengali or English—never an unhelpful automated bot.',
    answerBn:
      'যেকোনো সমস্যায় আমাদের ঢাকা হেল্পডেস্কের অফিসিয়াল হোয়াটসঅ্যাপ (+৮৮০ ১৯৪৬-১০১০১০) নম্বরে মেসেজ দিতে পারেন অথবা সরাসরি ফোন করতে পারেন। কোনো রোবটিক বট নয়, সরাসরি আমাদের অভিজ্ঞ টেকনিক্যাল ইঞ্জিনিয়ারদের সাথে কথা বলে দ্রুত সমাধান পাবেন।',
    pointsEn: [
      'WhatsApp Helpdesk (+880 1969-101010) with instant human replies',
      'Emergency phone call assistance for active subscriptions',
      'Screen-share support via Google Meet/AnyDesk when required',
    ],
    pointsBn: [
      'হোয়াটসঅ্যাপে তাৎক্ষণিক মানবীয় রেসপন্স (+৮৮০ ১৯৪৬-১০১০১০)',
      'জরুরি প্রয়োজনে সরাসরি ফোনকলে কথা বলে সাপোর্ট',
      'প্রয়োজনে এনিডেস্ক বা গুগল মিটে স্ক্রিন-শেয়ারের মাধ্যমে সমাধান',
    ],
  },
  {
    id: 'support-hours',
    category: 'support',
    badgeEn: '9 AM - 11 PM Daily',
    badgeBn: 'সকাল ৯টা - রাত ১১টা',
    questionEn: 'What are your operational hours for support and order delivery?',
    questionBn: 'সাপোর্ট ও সফটওয়্যার ডেলিভারির কার্যকাল ও সময়সীমা কী?',
    answerEn:
      'Our live human support desk operates 7 days a week, from 9:00 AM to 11:00 PM Bangladesh Standard Time (GMT+6), including weekends and public holidays. Automated order processing and ticket queueing run 24/7.',
    answerBn:
      'আমাদের ঢাকা সাপোর্ট টিম সপ্তাহের ৭ দিনই সকাল ৯:০০টা থেকে রাত ১১:০০টা (বাংলাদেশ সময়) পর্যন্ত সম্পূর্ণ সক্রিয় থাকে। সরকারি ছুটির দিনেও আমাদের সাপোর্ট ও ডেলিভারি সেবা নিরবচ্ছিন্নভাবে চালু থাকে।',
  },
  {
    id: 'support-industry-training',
    category: 'support',
    badgeEn: 'Onsite Training',
    badgeBn: 'অনসাইট ট্রেনিং',
    questionEn: 'Do you provide software installation and staff training for industry ERPs?',
    questionBn: 'কনস্ট্রাকশন বা গার্মেন্টস ইআরপি সফটওয়্যারের ক্ষেত্রে কি ইন্সটলেশন ও ট্রেনিং দেওয়া হয়?',
    answerEn:
      'Yes. For vertical business solutions such as Kyrops Construction ERP, RMG Garments Suite, Poultry Layer Management, and Real Estate CRM, our implementation engineers provide remote or on-site configuration, staff orientation sessions, and localized user manual handovers.',
    answerBn:
      'হ্যাঁ। কনস্ট্রাকশন ইআরপি, গার্মেন্টস মার্চেন্ডাইজিং স্যুট, পোল্ট্রি ফার্ম কিংবা রিয়েল এস্টেট সফটওয়্যারের মতো এন্টারপ্রাইজ সল্যুশনের ক্ষেত্রে আমাদের টিম ক্লাউড কনফিগারেশন, কর্মীদের হ্যান্ডস-অন প্রশিক্ষণ এবং সম্পূর্ণ বাংলায় ডকুমেন্টেশন ও গাইড প্রদান করে।',
  },
  {
    id: 'support-device-switch',
    category: 'support',
    badgeEn: 'Multi-Device',
    badgeBn: 'একাধিক ডিভাইস',
    questionEn: 'Can I use my software on both my PC/Laptop and Mobile devices?',
    questionBn: 'আমি কি একই সফটওয়্যার আমার ল্যাপটপ এবং মোবাইল দুটি ডিভাইসেই চালাতে পারব?',
    answerEn:
      'Most modern tools (like ChatGPT, Canva, CapCut, Microsoft 365, Notion, and Google Workspace) officially support simultaneous sign-ins across Windows, Mac, iOS, and Android. Certain single-seat desktop suites (like AutoCAD or specialized ERPs) are licensed per designated terminal.',
    answerBn:
      'চ্যাটজিপিটি, ক্যানভা, ক্যাপকাট, মাইক্রোসফট ৩৬৫, নোশন ও গুগল ওয়ার্কস্পেসের মতো অধিকাংশ আধুনিক টুল একই সাথে ল্যাপটপ, ডেস্কটপ ও মোবাইলে স্বচ্ছন্দে ব্যবহার করা যায়। অটোক্যাড বা কাস্টম ইআরপির মতো নির্দিষ্ট কিছু হেভিওয়্যার লাইসেন্স টার্মিনাল-ভিত্তিক পরিচালিত হয়।',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItemIds, setOpenItemIds] = useState<Record<string, boolean>>({
    'billing-methods': true, // Keep first popular question open by default for immediate engagement
    'delivery-speed': true,
  });

  const isBn = language === 'bn';

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_DATA.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItemIds(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenItemIds({});
  };

  // Filter items by category and search term
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search query filter across both languages and answers
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inQuestionEn = item.questionEn.toLowerCase().includes(query);
        const inQuestionBn = item.questionBn.toLowerCase().includes(query);
        const inAnswerEn = item.answerEn.toLowerCase().includes(query);
        const inAnswerBn = item.answerBn.toLowerCase().includes(query);
        const inBadge = item.badgeEn.toLowerCase().includes(query) || item.badgeBn.toLowerCase().includes(query);

        if (!inQuestionEn && !inQuestionBn && !inAnswerEn && !inAnswerBn && !inBadge) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: FAQ_DATA.length,
      billing: FAQ_DATA.filter((i) => i.category === 'billing').length,
      delivery: FAQ_DATA.filter((i) => i.category === 'delivery').length,
      support: FAQ_DATA.filter((i) => i.category === 'support').length,
    };
  }, []);

  const handleWhatsAppConsultation = () => {
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: isBn
        ? 'আসসালামু আলাইকুম কাইরোপস ডিজিটাল, আমার সাবস্ক্রিপশন ও সফটওয়্যার ডেলিভারি সম্পর্কিত কিছু প্রশ্ন রয়েছে।'
        : 'Hello Kyrops Digital, I have a specific question about software billing, delivery, and warranty support.',
      lang: language,
    });
    window.open(link, '_blank');
  };

  return (
    <section id="faq" className="py-24 bg-transparent border-b border-white/10 relative scroll-mt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-xs font-semibold text-purple-300 mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>{isBn ? 'স্বচ্ছ প্রশ্নোত্তর ও নির্দেশিকা' : 'Transparent Answers & Guidance'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
            {isBn ? (
              <>
                সচরাচর জিজ্ঞাসিত <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">প্রশ্ন ও উত্তর</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isBn
              ? 'সাবস্ক্রিপশন পেমেন্ট, দ্রুত সফটওয়্যার ডেলিভারি এবং সার্বক্ষণিক সাপোর্ট সেবা সংক্রান্ত আপনার সব প্রশ্নের বিস্তারিত ও স্বচ্ছ সমাধান।'
              : 'Everything you need to know about local BDT billing, 15–60 minute software provisioning, data security, and full-term warranty support.'}
          </p>
        </div>

        {/* Search Bar & Category Controls Container */}
        <div className="max-w-5xl mx-auto mb-10 space-y-5">
          {/* Real-time FAQ search input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? 'বিকাশ, ডেলিভারি সময়, রিপ্লেসমেন্ট বা সাপোর্ট নিয়ে প্রশ্ন খুঁজুন...'
                  : 'Search by keyword (e.g. bKash, delivery time, renewal, warranty, privacy)...'
              }
              className="w-full pl-12 pr-10 py-3.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs & Expand/Collapse Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeCategory === 'all'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isBn ? 'সকল প্রশ্ন' : 'All Questions'}</span>
                <span className="ml-1 text-[11px] opacity-75 font-mono">({categoryCounts.all})</span>
              </button>

              <button
                onClick={() => setActiveCategory('billing')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeCategory === 'billing'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span>{isBn ? 'পেমেন্ট ও বিলিং' : 'Subscription & Billing'}</span>
                <span className="ml-1 text-[11px] opacity-75 font-mono">({categoryCounts.billing})</span>
              </button>

              <button
                onClick={() => setActiveCategory('delivery')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeCategory === 'delivery'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'ডেলিভারি ও অ্যাক্টিভেশন' : 'Software Delivery'}</span>
                <span className="ml-1 text-[11px] opacity-75 font-mono">({categoryCounts.delivery})</span>
              </button>

              <button
                onClick={() => setActiveCategory('support')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeCategory === 'support'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? 'সাপোর্ট ও গ্যারান্টি' : 'Support & Assistance'}</span>
                <span className="ml-1 text-[11px] opacity-75 font-mono">({categoryCounts.support})</span>
              </button>
            </div>

            {/* Quick Accordion Utilities */}
            <div className="flex items-center gap-3 text-xs text-slate-400 ml-auto">
              <button
                onClick={handleExpandAll}
                className="hover:text-white underline underline-offset-4 cursor-pointer font-medium"
              >
                {isBn ? 'সবগুলো খুলুন' : 'Expand All'}
              </button>
              <span>·</span>
              <button
                onClick={handleCollapseAll}
                className="hover:text-white underline underline-offset-4 cursor-pointer font-medium"
              >
                {isBn ? 'সবগুলো বন্ধ করুন' : 'Collapse All'}
              </button>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-5xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800">
              <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white mb-1">
                {isBn ? 'কোনো প্রশ্ন পাওয়া যায়নি' : 'No matching questions found'}
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                {isBn
                  ? `"${searchQuery}" এর সাথে সম্পর্কিত কোনো তথ্য পাওয়া যায়নি। সরাসরি আমাদের হোয়াটসঅ্যাপ ডেস্কে প্রশ্ন করুন।`
                  : `We couldn't find any questions matching "${searchQuery}". Feel free to reach out directly to our human desk.`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/60 rounded-xl hover:bg-purple-900/60 cursor-pointer"
              >
                {isBn ? 'সব প্রশ্ন দেখুন' : 'View All Questions'}
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = !!openItemIds[faq.id];
              const categoryColor =
                faq.category === 'billing'
                  ? 'border-blue-500/30 text-blue-400 bg-blue-950/40'
                  : faq.category === 'delivery'
                  ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40'
                  : 'border-amber-500/30 text-amber-400 bg-amber-950/40';

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? 'bg-slate-900/90 border-purple-500/40 shadow-xl shadow-purple-950/20'
                      : 'bg-slate-900/50 hover:bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-7 py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                      {/* Topic Badge */}
                      <span
                        className={`inline-flex items-center text-[11px] font-mono px-2.5 py-0.5 rounded-full border shrink-0 ${categoryColor}`}
                      >
                        {isBn ? faq.badgeBn : faq.badgeEn}
                      </span>

                      {/* Question Text */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                        {isBn ? faq.questionBn : faq.questionEn}
                      </h3>
                    </div>

                    {/* Chevron Indicator */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? 'bg-purple-600 text-white border-purple-500 rotate-180'
                          : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-white group-hover:bg-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content Collapse */}
                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-6 pt-1 text-slate-300 border-t border-slate-800/60 animate-in fade-in slide-in-from-top-1 duration-200">
                      {/* Direct Answer Paragraph */}
                      <p className="text-sm sm:text-base leading-relaxed text-slate-300 mb-4 font-normal">
                        {isBn ? faq.answerBn : faq.answerEn}
                      </p>

                      {/* Key Takeaway Bullet Points if available */}
                      {((isBn && faq.pointsBn) || (!isBn && faq.pointsEn)) && (
                        <div className="mt-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-semibold block mb-1">
                            {isBn ? 'মূল তথ্যাবলী ও সুবিধা:' : 'Key Highlights & Verification:'}
                          </span>
                          {(isBn ? faq.pointsBn : faq.pointsEn)?.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? WhatsApp Direct Help Card */}
        <div className="max-w-5xl mx-auto mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900/90 to-blue-950/70 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{isBn ? 'ঢাকা টেকনিক্যাল টিম লাইভ' : 'Dhaka Technical Team Online'}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {isBn ? 'অন্য কোনো বিশেষ প্রশ্ন আছে?' : 'Still Have Questions? Talk to Our Engineers'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {isBn
                ? 'সফটওয়্যার অ্যাক্টিভেশন, কাস্টম এন্টারপ্রাইজ ভলিউম ডিল বা রিপ্লেসমেন্ট সহায়তা পেতে সরাসরি আমাদের টিমকে জানান।'
                : 'Need immediate custom guidance, corporate bank invoicing, or license verification? Chat directly with our Dhaka helpdesk.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppConsultation}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-102 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে প্রশ্ন করুন' : 'Ask on WhatsApp'}</span>
            </button>

            <a
              href="tel:01969101010"
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+880 1969-101010</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
