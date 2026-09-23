import { Language } from '../types';

export function formatBDT(amount: number, lang: Language = 'en'): string {
  if (lang === 'bn') {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const formattedNum = amount.toLocaleString('en-US');
    const bnNum = formattedNum.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
    return `৳${bnNum}`;
  }
  return `৳${amount.toLocaleString('en-US')}`;
}

export function generateWhatsAppLink(params: {
  productName?: string;
  planName?: string;
  price?: number;
  phone?: string;
  lang?: Language;
  customMessage?: string;
}): string {
  const targetPhone = params.phone || '8801969101010'; // Client phone format
  let text = '';

  if (params.customMessage) {
    text = params.customMessage;
  } else if (params.productName) {
    const priceStr = params.price ? ` (${formatBDT(params.price, params.lang || 'en')})` : '';
    const planStr = params.planName ? ` - ${params.planName}` : '';
    text = `Hello Kyrops Digital, I would like to order: ${params.productName}${planStr}${priceStr}. Please provide activation details and payment instructions.`;
  } else {
    text = `Hello Kyrops Digital, I would like to inquire about digital tools and enterprise software solutions for my business in Bangladesh.`;
  }

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}
