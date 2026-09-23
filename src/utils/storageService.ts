import {
  Product,
  Category,
  IndustrySolution,
  Bundle,
  Order,
  Customer,
  MediaItem,
  User,
  AuditLogEntry,
  SiteSettings,
  HomepageContent,
  UserRole,
} from '../types';

import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { industries as initialIndustries } from '../data/industries';
import { bundles as initialBundles } from '../data/bundles';
import { itServices as initialServices } from '../data/services';
import { ITServiceItem } from '../types';

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'technest_products_v2',
  CATEGORIES: 'technest_categories_v2',
  INDUSTRIES: 'technest_industries_v2',
  BUNDLES: 'technest_bundles_v2',
  ORDERS: 'technest_orders_v2',
  CUSTOMERS: 'technest_customers_v2',
  MEDIA: 'technest_media_v2',
  USERS: 'technest_users_v2',
  AUDIT: 'technest_audit_v2',
  SETTINGS: 'technest_settings_v2',
  HOMEPAGE: 'technest_homepage_v2',
  AUTH_SESSION: 'technest_auth_session_v2',
};

// Initial Site Settings
const defaultSettings: SiteSettings = {
  whatsappNumber: '+8801969101010',
  supportPhone: '+880 1969-101010',
  supportEmail: 'support@technestbd.com',
  officeAddress: 'Level 8, Concord Tower, Panthapath, Dhaka-1205, Bangladesh',
  officeHours: 'Saturday - Thursday: 10:00 AM - 10:00 PM',
  currency: 'BDT',
  siteTitle: 'TECH NEST BD | Premier Digital Tools & AI Marketplace',
  siteTitleBn: 'টেক নেস্ট বিডি | ডিজিটাল টুলস ও এআই মার্কেটপ্লেস',
  tagline: 'DIGITAL TOOLS & AI',
  taglineBn: 'ডিজিটাল টুলস ও এআই',
  announcementBanner: '🚀 Ramadan & Spring Special: Up to 40% Off on Developer & AI Bundles with bKash/Nagad Instant Delivery',
  announcementActive: true,
  facebookUrl: 'https://facebook.com/technestbd',
  whatsappDeskActive: true,
  maintenanceMode: false,
  legalDisclaimer: 'Product names, logos and trademarks belong to their respective owners. TECH NEST BD is an independent marketplace and software service provider unless explicitly stated.',
  legalDisclaimerBn: 'সকল প্রোডাক্টের নাম, লোগো এবং ট্রেডমার্ক তাদের নিজ নিজ স্বত্বাধিকারীর নিজস্ব সম্পত্তি। স্পষ্টভাবে উল্লেখ না থাকলে টেক নেস্ট বিডি একটি স্বাধীন মার্কেটপ্লেস ও সফটওয়্যার সার্ভিস প্রোভাইডার।',
};

// Initial Homepage Content
const defaultHomepage: HomepageContent = {
  heroEyebrow: 'PREMIER BANGLADESH SOFTWARE & CLOUD DESK',
  heroEyebrowBn: 'বাংলাদেশ ডিজিটাল সফটওয়্যার ও ক্লাউড ডেস্ক',
  heroLine1: 'The Digital Tools & AI Platform',
  heroLine1Bn: 'ডিজিটাল টুলস ও এআই প্ল্যাটফর্ম',
  heroLine2: 'for Bangladesh Enterprise.',
  heroLine2Bn: 'আধুনিক ব্যবসা ও ক্রিয়েটরদের জন্য।',
  heroHighlight: 'Real Credentials. Local BDT bKash/Nagad.',
  heroHighlightBn: 'রিয়েল ক্রেডেনশিয়ালস। বিকাশ ও নগদে সহজ পেমেন্ট।',
  heroSub: 'Eliminate international card hurdles. Access verified AI models, creative suites, SEO platforms, and industry ERPs backed by immediate Dhaka engineering support.',
  heroSubBn: 'আন্তর্জাতিক ক্রেডিট কার্ডের ঝামেলা ছাড়াই প্রিমিয়াম এআই, ক্রিয়েটিভ সফটওয়্যার এবং লোকাল ইন্ডাস্ট্রি ইআরপি অ্যাক্টিভ করুন সাথে সাথে।',
  heroExploreCta: 'Explore 30+ Tools',
  heroExploreCtaBn: 'টুলস ব্রাউজ করুন',
  heroStackCta: 'Build Your Stack',
  heroStackCtaBn: 'স্ট্যাক তৈরি করুন',
};

// Initial Default Users
const defaultUsers: User[] = [
  {
    id: 'user-super-admin',
    name: 'Tajmilur Rahman',
    email: 'admin@technestbd.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-prod-mgr',
    name: 'Tanvir Hossain',
    email: 'manager@technestbd.com',
    role: 'Product Manager',
    status: 'active',
    lastLogin: '2026-09-21T10:15:00Z',
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'user-order-mgr',
    name: 'Ayesha Siddika',
    email: 'orders@technestbd.com',
    role: 'Order Manager',
    status: 'active',
    lastLogin: '2026-09-22T14:30:00Z',
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'user-editor',
    name: 'Kamrul Hasan',
    email: 'editor@technestbd.com',
    role: 'Content Editor',
    status: 'active',
    lastLogin: '2026-09-20T08:00:00Z',
    createdAt: '2026-03-10T00:00:00Z',
  },
];

// Initial Seed Orders
const defaultOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'TNB-9041',
    customerName: 'Ashrafuzzaman Kabir',
    customerEmail: 'ashraf@creativefirm.bd',
    customerPhone: '01712-445566',
    customerCompany: 'Apex Digital Agency',
    productNames: ['ChatGPT Plus & Team', 'Canva Pro Enterprise'],
    items: [
      {
        productId: 'chatgpt-plus',
        productName: 'ChatGPT Plus & Team',
        planId: 'cg-1m-shared',
        planName: '1 Month Shared',
        price: 450,
        quantity: 1,
      },
      {
        productId: 'canva-pro',
        productName: 'Canva Pro Enterprise',
        planId: 'canva-1y-brand',
        planName: '1 Year Brand Team',
        price: 550,
        quantity: 1,
      },
    ],
    totalAmount: 1000,
    discount: 100,
    netAmount: 900,
    currency: 'BDT',
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    status: 'completed',
    trxId: 'BK9021884392',
    notes: 'Activated on client Gmail and confirmed via WhatsApp.',
    orderSource: 'direct_checkout',
    createdAt: '2026-09-22T16:20:00Z',
    updatedAt: '2026-09-22T16:45:00Z',
  },
  {
    id: 'ord-1002',
    orderNumber: 'TNB-9042',
    customerName: 'Saiful Islam',
    customerEmail: 'saiful.arch@gmail.com',
    customerPhone: '01819-223344',
    customerCompany: 'Studio Arch Dhaka',
    productNames: ['Midjourney v6.1'],
    items: [
      {
        productId: 'midjourney-pro',
        productName: 'Midjourney v6.1',
        planId: 'mj-1m-basic',
        planName: '1 Month Standard Shared',
        price: 650,
        quantity: 1,
      },
    ],
    totalAmount: 650,
    discount: 0,
    netAmount: 650,
    currency: 'BDT',
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    status: 'processing',
    trxId: 'NG77102948',
    notes: 'Discord channel invite sent.',
    orderSource: 'whatsapp',
    createdAt: '2026-09-23T11:10:00Z',
    updatedAt: '2026-09-23T11:30:00Z',
  },
  {
    id: 'ord-1003',
    orderNumber: 'TNB-9043',
    customerName: 'Mehedi Hasan',
    customerEmail: 'mehedi@devkraft.com',
    customerPhone: '01911-889900',
    customerCompany: 'DevKraft Solutions',
    productNames: ['Cursor AI Pro Editor'],
    items: [
      {
        productId: 'cursor-pro',
        productName: 'Cursor AI Pro Editor',
        planId: 'cur-1m-shared',
        planName: '1 Month Access Account',
        price: 950,
        quantity: 2,
      },
    ],
    totalAmount: 1900,
    discount: 0,
    netAmount: 1900,
    currency: 'BDT',
    paymentMethod: 'bkash',
    paymentStatus: 'pending',
    status: 'new',
    notes: 'Awaiting customer TrxID verification.',
    orderSource: 'direct_checkout',
    createdAt: '2026-09-23T13:45:00Z',
    updatedAt: '2026-09-23T13:45:00Z',
  },
];

// Initial Customers
const defaultCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ashrafuzzaman Kabir',
    email: 'ashraf@creativefirm.bd',
    phone: '01712-445566',
    company: 'Apex Digital Agency',
    totalOrders: 4,
    totalSpend: 4200,
    lastOrderDate: '2026-09-22',
    status: 'active',
  },
  {
    id: 'cust-2',
    name: 'Saiful Islam',
    email: 'saiful.arch@gmail.com',
    phone: '01819-223344',
    company: 'Studio Arch Dhaka',
    totalOrders: 2,
    totalSpend: 1300,
    lastOrderDate: '2026-09-23',
    status: 'active',
  },
  {
    id: 'cust-3',
    name: 'Mehedi Hasan',
    email: 'mehedi@devkraft.com',
    phone: '01911-889900',
    company: 'DevKraft Solutions',
    totalOrders: 1,
    totalSpend: 1900,
    lastOrderDate: '2026-09-23',
    status: 'active',
  },
];

// Seed Media Library items
const seedLogos: { name: string; file: string; tool: string }[] = [
  { name: 'ChatGPT / OpenAI', file: 'chatgpt.svg', tool: 'chatgpt-plus' },
  { name: 'Anthropic Claude', file: 'claude.svg', tool: 'claude-pro' },
  { name: 'Google Gemini', file: 'gemini.svg', tool: 'gemini-advanced' },
  { name: 'Canva Pro', file: 'canva.svg', tool: 'canva-pro' },
  { name: 'Adobe Photoshop', file: 'photoshop.svg', tool: 'photoshop' },
  { name: 'Adobe Illustrator', file: 'illustrator.svg', tool: 'illustrator' },
  { name: 'Adobe Creative Cloud', file: 'creative-cloud.svg', tool: 'adobe-master-collection' },
  { name: 'CapCut Video Pro', file: 'capcut.svg', tool: 'capcut-pro' },
  { name: 'Figma Design', file: 'figma.svg', tool: 'figma-pro' },
  { name: 'Notion Workspace', file: 'notion.svg', tool: 'notion-plus' },
  { name: 'Google Workspace', file: 'google-workspace.svg', tool: 'google-workspace-biz' },
  { name: 'Microsoft 365', file: 'microsoft-365.svg', tool: 'office-365-family' },
  { name: 'Grammarly Premium', file: 'grammarly.svg', tool: 'grammarly-premium' },
  { name: 'HubSpot CRM', file: 'hubspot.svg', tool: 'hubspot-starter' },
  { name: 'Semrush Guru', file: 'semrush.svg', tool: 'semrush-guru' },
  { name: 'Ahrefs Standard', file: 'ahrefs.svg', tool: 'ahrefs-standard' },
  { name: 'Shopify Growth', file: 'shopify.svg', tool: 'shopify-growth' },
  { name: 'Midjourney v6.1', file: 'midjourney.svg', tool: 'midjourney-pro' },
  { name: 'GitHub Copilot', file: 'github.svg', tool: 'github-copilot' },
  { name: 'Slack Pro', file: 'slack.svg', tool: 'slack-pro' },
  { name: 'Zoom Enterprise', file: 'zoom.svg', tool: 'zoom-pro' },
  { name: 'Zapier Automation', file: 'zapier.svg', tool: 'zapier-starter' },
  { name: 'Make Platform', file: 'make.svg', tool: 'make-pro' },
  { name: 'Vercel Pro', file: 'vercel.svg', tool: 'vercel-pro' },
  { name: 'Jasper AI Writer', file: 'jasper.svg', tool: 'jasper-ai' },
  { name: 'WordPress Managed', file: 'wordpress.svg', tool: 'wordpress-hosting' },
  { name: 'Cursor AI Editor', file: 'cursor.svg', tool: 'cursor-pro' },
  { name: 'Perplexity Pro', file: 'perplexity.svg', tool: 'perplexity-pro' },
  { name: 'ElevenLabs Voice', file: 'elevenlabs.svg', tool: 'elevenlabs-creator' },
  { name: 'Civil & Construction ERP', file: 'construction-erp.svg', tool: 'construction-erp-suite' },
  { name: 'Garments & Apparel ERP', file: 'garments-erp.svg', tool: 'garments-order-erp' },
  { name: 'Real Estate Smart CRM', file: 'real-estate-crm.svg', tool: 'real-estate-crm-prop' },
  { name: 'Agro & Poultry ERP', file: 'poultry-erp.svg', tool: 'poultry-feed-erp' },
  { name: 'Cybersecurity Shield', file: 'cybersecurity.svg', tool: 'cybersecurity-bundle' },
  { name: 'Cloud API Gateway', file: 'cloud-api.svg', tool: 'cloud-api-suite' },
];

const defaultMedia: MediaItem[] = seedLogos.map((item, index) => ({
  id: `media-${index + 1}`,
  filename: item.file,
  url: `/products/logos/${item.file}`,
  type: 'logo',
  dimensions: '512 x 512',
  sizeBytes: 1420,
  usedBy: [item.tool],
  altText: `${item.name} Official Vector Logo`,
  uploadedAt: '2026-09-20T00:00:00Z',
}));

// Initial Audit Logs
const defaultAudit: AuditLogEntry[] = [
  {
    id: 'log-1',
    userName: 'Tajmilur Rahman',
    userEmail: 'admin@technestbd.com',
    action: 'SYSTEM_BOOTSTRAP',
    module: 'System',
    details: 'Initial catalog seeded with 30+ tools, verified official logos, and pricing database.',
    timestamp: '2026-09-20T10:00:00Z',
  },
  {
    id: 'log-2',
    userName: 'Tanvir Hossain',
    userEmail: 'manager@technestbd.com',
    action: 'PRICE_UPDATE',
    module: 'Products',
    recordId: 'chatgpt-plus',
    recordName: 'ChatGPT Plus & Team',
    details: 'Updated market rate to BDT 450/mo with shared thread protection.',
    timestamp: '2026-09-21T12:30:00Z',
  },
];

// Enrich seed products with slug and logoUrl
function prepareEnrichedProducts(rawProducts: Product[]): Product[] {
  const logoMap: Record<string, string> = {
    'chatgpt-plus': '/products/logos/chatgpt.svg',
    'claude-pro': '/products/logos/claude.svg',
    'midjourney-pro': '/products/logos/midjourney.svg',
    'elevenlabs-creator': '/products/logos/elevenlabs.svg',
    'cursor-pro': '/products/logos/cursor.svg',
    'perplexity-pro': '/products/logos/perplexity.svg',
    'canva-pro': '/products/logos/canva.svg',
    'adobe-master-collection': '/products/logos/creative-cloud.svg',
    'photoshop': '/products/logos/photoshop.svg',
    'illustrator': '/products/logos/illustrator.svg',
    'capcut-pro': '/products/logos/capcut.svg',
    'figma-pro': '/products/logos/figma.svg',
    'notion-plus': '/products/logos/notion.svg',
    'google-workspace-biz': '/products/logos/google-workspace.svg',
    'office-365-family': '/products/logos/microsoft-365.svg',
    'grammarly-premium': '/products/logos/grammarly.svg',
    'hubspot-starter': '/products/logos/hubspot.svg',
    'semrush-guru': '/products/logos/semrush.svg',
    'ahrefs-standard': '/products/logos/ahrefs.svg',
    'shopify-growth': '/products/logos/shopify.svg',
    'github-copilot': '/products/logos/github.svg',
    'slack-pro': '/products/logos/slack.svg',
    'zoom-pro': '/products/logos/zoom.svg',
    'zapier-starter': '/products/logos/zapier.svg',
    'make-pro': '/products/logos/make.svg',
    'vercel-pro': '/products/logos/vercel.svg',
    'jasper-ai': '/products/logos/jasper.svg',
    'wordpress-hosting': '/products/logos/wordpress.svg',
    'construction-erp-suite': '/products/logos/construction-erp.svg',
    'garments-order-erp': '/products/logos/garments-erp.svg',
    'real-estate-crm-prop': '/products/logos/real-estate-crm.svg',
    'poultry-feed-erp': '/products/logos/poultry-erp.svg',
  };

  return rawProducts.map((p) => {
    const slug = p.id.replace(/-plus|-pro|-starter|-guru|-standard|-growth|-suite|-editor|-creator|-prop/g, '');
    const logoUrl = p.logoUrl || logoMap[p.id] || `/products/logos/${slug}.svg`;
    return {
      ...p,
      slug: p.slug || slug,
      logoUrl,
      status: p.status || 'published',
      createdAt: p.createdAt || '2026-09-01T00:00:00Z',
      updatedAt: p.updatedAt || '2026-09-20T00:00:00Z',
    };
  });
}

// Event listeners for reactive state synchronization
type ChangeListener = () => void;
const listeners: Set<ChangeListener> = new Set();

export const subscribeToStorageChanges = (listener: ChangeListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifySubscribers = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Storage listener error:', e);
    }
  });
};

// Safe localStorage wrapper
function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`[StorageService] Failed to read ${key}:`, e);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifySubscribers();
  } catch (e) {
    console.error(`[StorageService] Failed to write ${key}:`, e);
  }
}

// Main Storage Service API
export const storageService = {
  // PRODUCTS
  getProducts(): Product[] {
    const stored = getStoredItem<Product[] | null>(STORAGE_KEYS.PRODUCTS, null);
    if (!stored || stored.length === 0) {
      const enriched = prepareEnrichedProducts(initialProducts);
      setStoredItem(STORAGE_KEYS.PRODUCTS, enriched);
      return enriched;
    }
    return stored;
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  },

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug || p.id === slug);
  },

  saveProduct(product: Product, user?: User): void {
    const products = this.getProducts();
    const existingIndex = products.findIndex((p) => p.id === product.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      products[existingIndex] = { ...product, updatedAt: now };
      this.logAudit({
        userName: user?.name || 'Admin User',
        userEmail: user?.email || 'admin@technestbd.com',
        action: 'UPDATE_PRODUCT',
        module: 'Products',
        recordId: product.id,
        recordName: product.name,
        details: `Updated product "${product.name}" (${product.brand}). Status: ${product.status || 'published'}`,
      });
    } else {
      const newProduct = {
        ...product,
        createdAt: now,
        updatedAt: now,
      };
      products.unshift(newProduct);
      this.logAudit({
        userName: user?.name || 'Admin User',
        userEmail: user?.email || 'admin@technestbd.com',
        action: 'CREATE_PRODUCT',
        module: 'Products',
        recordId: product.id,
        recordName: product.name,
        details: `Created new product "${product.name}" in category ${product.category}.`,
      });
    }
    setStoredItem(STORAGE_KEYS.PRODUCTS, products);
  },

  deleteProduct(id: string, user?: User): boolean {
    const products = this.getProducts();
    const target = products.find((p) => p.id === id);
    if (!target) return false;

    const filtered = products.filter((p) => p.id !== id);
    setStoredItem(STORAGE_KEYS.PRODUCTS, filtered);

    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'DELETE_PRODUCT',
      module: 'Products',
      recordId: id,
      recordName: target.name,
      details: `Deleted product "${target.name}" from catalog.`,
    });
    return true;
  },

  duplicateProduct(id: string, user?: User): Product | null {
    const target = this.getProductById(id);
    if (!target) return null;

    const newId = `${target.id}-copy-${Date.now().toString().slice(-4)}`;
    const duplicated: Product = {
      ...target,
      id: newId,
      slug: `${target.slug}-copy`,
      name: `${target.name} (Copy)`,
      nameBn: target.nameBn ? `${target.nameBn} (কপি)` : undefined,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.saveProduct(duplicated, user);
    return duplicated;
  },

  // CATEGORIES
  getCategories(): Category[] {
    return getStoredItem<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  saveCategory(category: Category, user?: User): void {
    const categories = this.getCategories();
    const idx = categories.findIndex((c) => c.id === category.id);
    if (idx >= 0) {
      categories[idx] = category;
    } else {
      categories.push(category);
    }
    setStoredItem(STORAGE_KEYS.CATEGORIES, categories);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: idx >= 0 ? 'UPDATE_CATEGORY' : 'CREATE_CATEGORY',
      module: 'Categories',
      recordId: category.id,
      recordName: category.name,
      details: `Saved category "${category.name}".`,
    });
  },

  deleteCategory(id: string, user?: User): void {
    const categories = this.getCategories().filter((c) => c.id !== id);
    setStoredItem(STORAGE_KEYS.CATEGORIES, categories);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'DELETE_CATEGORY',
      module: 'Categories',
      recordId: id,
      details: `Deleted category "${id}".`,
    });
  },

  // INDUSTRIES
  getIndustries(): IndustrySolution[] {
    return getStoredItem<IndustrySolution[]>(STORAGE_KEYS.INDUSTRIES, initialIndustries);
  },

  saveIndustry(industry: IndustrySolution, user?: User): void {
    const list = this.getIndustries();
    const idx = list.findIndex((i) => i.id === industry.id);
    if (idx >= 0) {
      list[idx] = industry;
    } else {
      list.push(industry);
    }
    setStoredItem(STORAGE_KEYS.INDUSTRIES, list);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: idx >= 0 ? 'UPDATE_INDUSTRY' : 'CREATE_INDUSTRY',
      module: 'Industries',
      recordId: industry.id,
      recordName: industry.name,
      details: `Saved industry solution "${industry.name}".`,
    });
  },

  // BUNDLES
  getBundles(): Bundle[] {
    return getStoredItem<Bundle[]>(STORAGE_KEYS.BUNDLES, initialBundles);
  },

  saveBundle(bundle: Bundle, user?: User): void {
    const list = this.getBundles();
    const idx = list.findIndex((b) => b.id === bundle.id);
    if (idx >= 0) {
      list[idx] = bundle;
    } else {
      list.push(bundle);
    }
    setStoredItem(STORAGE_KEYS.BUNDLES, list);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: idx >= 0 ? 'UPDATE_BUNDLE' : 'CREATE_BUNDLE',
      module: 'Bundles',
      recordId: bundle.id,
      recordName: bundle.name,
      details: `Saved bundle "${bundle.name}". Price: BDT ${bundle.bundlePrice}`,
    });
  },

  deleteBundle(id: string, user?: User): void {
    const list = this.getBundles().filter((b) => b.id !== id);
    setStoredItem(STORAGE_KEYS.BUNDLES, list);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'DELETE_BUNDLE',
      module: 'Bundles',
      recordId: id,
      details: `Deleted bundle "${id}".`,
    });
  },

  // ORDERS
  getOrders(): Order[] {
    return getStoredItem<Order[]>(STORAGE_KEYS.ORDERS, defaultOrders);
  },

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const orders = this.getOrders();
    const orderNumber = `TNB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    setStoredItem(STORAGE_KEYS.ORDERS, orders);

    // Sync or create Customer
    this.syncCustomerFromOrder(newOrder);

    this.logAudit({
      userName: 'Public Storefront',
      userEmail: newOrder.customerEmail,
      action: 'NEW_ORDER',
      module: 'Orders',
      recordId: newOrder.id,
      recordName: orderNumber,
      details: `Received order ${orderNumber} for ${newOrder.customerName}. Net: BDT ${newOrder.netAmount}. Method: ${newOrder.paymentMethod}`,
    });

    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order['status'], paymentStatus?: Order['paymentStatus'], notes?: string, user?: User): void {
    const orders = this.getOrders();
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx >= 0) {
      orders[idx].status = status;
      if (paymentStatus) orders[idx].paymentStatus = paymentStatus;
      if (notes) orders[idx].notes = notes;
      orders[idx].updatedAt = new Date().toISOString();
      setStoredItem(STORAGE_KEYS.ORDERS, orders);

      this.logAudit({
        userName: user?.name || 'Admin User',
        userEmail: user?.email || 'admin@technestbd.com',
        action: 'UPDATE_ORDER_STATUS',
        module: 'Orders',
        recordId: orderId,
        recordName: orders[idx].orderNumber,
        details: `Updated order ${orders[idx].orderNumber} status to "${status}" (Payment: ${orders[idx].paymentStatus}).`,
      });
    }
  },

  // CUSTOMERS
  getCustomers(): Customer[] {
    return getStoredItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, defaultCustomers);
  },

  syncCustomerFromOrder(order: Order): void {
    const customers = this.getCustomers();
    const existing = customers.find(
      (c) => c.email.toLowerCase() === order.customerEmail.toLowerCase() || c.phone === order.customerPhone
    );

    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpend += order.netAmount;
      existing.lastOrderDate = new Date().toISOString().split('T')[0];
      if (order.customerCompany && !existing.company) {
        existing.company = order.customerCompany;
      }
    } else {
      customers.unshift({
        id: `cust-${Date.now()}`,
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        company: order.customerCompany,
        totalOrders: 1,
        totalSpend: order.netAmount,
        lastOrderDate: new Date().toISOString().split('T')[0],
        status: 'active',
      });
    }
    setStoredItem(STORAGE_KEYS.CUSTOMERS, customers);
  },

  // MEDIA LIBRARY
  getMedia(): MediaItem[] {
    return getStoredItem<MediaItem[]>(STORAGE_KEYS.MEDIA, defaultMedia);
  },

  addMediaItem(media: Omit<MediaItem, 'id' | 'uploadedAt'>, user?: User): MediaItem {
    const list = this.getMedia();
    const newItem: MediaItem = {
      ...media,
      id: `media-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    list.unshift(newItem);
    setStoredItem(STORAGE_KEYS.MEDIA, list);

    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'UPLOAD_MEDIA',
      module: 'Media',
      recordId: newItem.id,
      recordName: newItem.filename,
      details: `Uploaded asset "${newItem.filename}" (${newItem.type}).`,
    });
    return newItem;
  },

  deleteMediaItem(id: string, user?: User): { success: boolean; message?: string } {
    const list = this.getMedia();
    const target = list.find((m) => m.id === id);
    if (!target) return { success: false, message: 'Media not found' };

    if (target.usedBy && target.usedBy.length > 0) {
      return {
        success: false,
        message: `Asset is currently linked to product: ${target.usedBy.join(', ')}. Replace product media first.`,
      };
    }

    const filtered = list.filter((m) => m.id !== id);
    setStoredItem(STORAGE_KEYS.MEDIA, filtered);

    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'DELETE_MEDIA',
      module: 'Media',
      recordId: id,
      recordName: target.filename,
      details: `Deleted asset "${target.filename}".`,
    });
    return { success: true };
  },

  // USERS & ROLES
  getUsers(): User[] {
    return getStoredItem<User[]>(STORAGE_KEYS.USERS, defaultUsers);
  },

  saveUser(userData: User, actor?: User): void {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === userData.id);
    if (idx >= 0) {
      users[idx] = userData;
    } else {
      users.push(userData);
    }
    setStoredItem(STORAGE_KEYS.USERS, users);
    this.logAudit({
      userName: actor?.name || 'Admin',
      userEmail: actor?.email || 'admin@technestbd.com',
      action: idx >= 0 ? 'UPDATE_USER' : 'CREATE_USER',
      module: 'Users',
      recordId: userData.id,
      recordName: userData.name,
      details: `Configured user ${userData.email} with role "${userData.role}".`,
    });
  },

  // AUDIT LOG
  getAuditLogs(): AuditLogEntry[] {
    return getStoredItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT, defaultAudit);
  },

  logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newEntry);
    // Keep max 500 entries in local audit log
    if (logs.length > 500) logs.pop();
    setStoredItem(STORAGE_KEYS.AUDIT, logs);
  },

  // SETTINGS
  getSettings(): SiteSettings {
    return getStoredItem<SiteSettings>(STORAGE_KEYS.SETTINGS, defaultSettings);
  },

  saveSettings(settings: SiteSettings, user?: User): void {
    setStoredItem(STORAGE_KEYS.SETTINGS, settings);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'UPDATE_SETTINGS',
      module: 'Settings',
      details: `Updated platform settings (WhatsApp: ${settings.whatsappNumber}, Announcement: ${settings.announcementActive ? 'Enabled' : 'Disabled'}).`,
    });
  },

  // HOMEPAGE
  getHomepageContent(): HomepageContent {
    return getStoredItem<HomepageContent>(STORAGE_KEYS.HOMEPAGE, defaultHomepage);
  },

  saveHomepageContent(content: HomepageContent, user?: User): void {
    setStoredItem(STORAGE_KEYS.HOMEPAGE, content);
    this.logAudit({
      userName: user?.name || 'Admin User',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'UPDATE_HOMEPAGE',
      module: 'Homepage',
      details: `Updated homepage headline and call-to-actions.`,
    });
  },

  // AUTHENTICATION SESSION
  getCurrentUser(): User | null {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      if (!session) return null;
      return JSON.parse(session) as User;
    } catch {
      return null;
    }
  },

  login(email: string, role?: UserRole): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!matched) {
      // Allow fallback login with demo admin
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('technest')) {
        const adminUser = users[0];
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(adminUser));
        this.logAudit({
          userName: adminUser.name,
          userEmail: adminUser.email,
          action: 'ADMIN_LOGIN',
          module: 'Auth',
          details: 'Admin logged into CMS console.',
        });
        return { success: true, user: adminUser };
      }
      return { success: false, error: 'Unrecognized admin credentials. Please use admin@technestbd.com' };
    }

    if (matched.status === 'suspended') {
      return { success: false, error: 'This administrative account has been suspended.' };
    }

    const updatedUser = {
      ...matched,
      role: role || matched.role,
      lastLogin: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(updatedUser));
    this.saveUser(updatedUser);

    this.logAudit({
      userName: updatedUser.name,
      userEmail: updatedUser.email,
      action: 'ADMIN_LOGIN',
      module: 'Auth',
      details: `User ${updatedUser.name} (${updatedUser.role}) logged in.`,
    });

    return { success: true, user: updatedUser };
  },

  logout(): void {
    const user = this.getCurrentUser();
    if (user) {
      this.logAudit({
        userName: user.name,
        userEmail: user.email,
        action: 'ADMIN_LOGOUT',
        module: 'Auth',
        details: `User ${user.name} logged out.`,
      });
    }
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    notifySubscribers();
  },

  logoutCurrentUser(): void {
    this.logout();
  },

  getServices(): ITServiceItem[] {
    return initialServices;
  },

  // FACTORY RESET (Seed restoration)
  resetToFactoryDefaults(user?: User): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.INDUSTRIES);
    localStorage.removeItem(STORAGE_KEYS.BUNDLES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.HOMEPAGE);

    // Re-initialize
    this.getProducts();
    this.getCategories();
    this.getIndustries();
    this.getBundles();
    this.getOrders();
    this.getCustomers();
    this.getMedia();
    this.getUsers();
    this.getSettings();
    this.getHomepageContent();

    this.logAudit({
      userName: user?.name || 'Admin',
      userEmail: user?.email || 'admin@technestbd.com',
      action: 'FACTORY_RESET',
      module: 'System',
      details: 'Restored all catalogue and media databases to default factory seeds.',
    });
    notifySubscribers();
  },
};
