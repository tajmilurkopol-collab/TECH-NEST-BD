import { Language } from '../types';
import { storageService } from './storageService';

export function formatBDT(amount: number, lang: Language = 'en'): string {
  if (lang === 'bn') {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const formattedNum = (amount || 0).toLocaleString('en-US');
    const bnNum = formattedNum.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
    return `৳${bnNum}`;
  }
  return `৳${(amount || 0).toLocaleString('en-US')}`;
}

export function generateWhatsAppLink(params: {
  productName?: string;
  planName?: string;
  price?: number;
  phone?: string;
  lang?: Language;
  orderId?: string;
  customerName?: string;
  customMessage?: string;
}): string {
  const settings = storageService.getSettings();
  // Clean phone number (strip spaces, dashes, plus)
  const rawPhone = params.phone || settings.whatsappNumber || '8801969101010';
  const cleanPhone = rawPhone.replace(/\D/g, '');

  let text = '';

  if (params.customMessage) {
    text = params.customMessage;
  } else if (params.productName) {
    const orderId = params.orderId || `TNB-WA${Math.floor(1000 + Math.random() * 9000)}`;
    const priceStr = params.price ? formatBDT(params.price, params.lang || 'en') : 'Contact for Quote';
    const planStr = params.planName || 'Standard Access';
    const customerStr = params.customerName ? `\nCustomer: ${params.customerName}` : '';

    text = `Hello TECH NEST BD,
I would like to order:

Product: ${params.productName}
Plan: ${planStr}
Price: ${priceStr}
Order ID: ${orderId}${customerStr}

Please provide the next steps.`;
  } else {
    text = `Hello TECH NEST BD,
I would like to inquire about digital tools and enterprise AI solutions from your marketplace.

Please provide available options and current BDT rates.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
