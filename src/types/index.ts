export type Language = 'en' | 'bn';

export type CategoryId = 
  | 'ai' 
  | 'creative' 
  | 'marketing' 
  | 'business' 
  | 'developer' 
  | 'apis' 
  | 'industry' 
  | 'services'
  | string;

export type IndustryId =
  | 'construction'
  | 'garments'
  | 'real_estate'
  | 'agro_poultry'
  | 'manufacturing'
  | 'retail'
  | 'healthcare'
  | 'education'
  | string;

export type AccessType = 'Personal' | 'Shared' | 'Team' | 'Business' | 'API' | 'Dedicated';

export type BillingPeriod = 'Monthly' | '3 Months' | '6 Months' | 'Annual' | 'One-Time' | 'Pay As You Go' | 'Custom';

export type ProductBadge = 'BEST SELLER' | 'TRENDING' | 'NEW' | 'POPULAR' | 'BUSINESS' | 'FOR CREATORS' | 'FOR TEAMS' | 'LIMITED OFFER';

export type StockStatus = 'AVAILABLE' | 'COMING SOON' | 'REQUEST QUOTE';

export type ProductPublishStatus = 'published' | 'draft' | 'archived';

export type SourceType = 'OFFICIAL' | 'AUTHORIZED_RESELLER' | 'MARKETPLACE' | 'AFFILIATE' | 'DEMO';

export type VerificationStatus = 'VERIFIED' | 'MARKETPLACE_OBSERVED' | 'VERIFICATION_REQUIRED';

export interface ProductPlan {
  id: string;
  name: string;
  nameBn: string;
  duration?: string;
  period: BillingPeriod;
  accessType: AccessType;
  marketPrice: number;
  price?: number;
  officialPrice?: number;
  isPopular?: boolean;
  notes?: string;
  notesBn?: string;
}

export type Plan = ProductPlan;

export interface Product {
  id: string;
  slug?: string;
  name: string;
  nameBn?: string;
  brand: string;
  brandBn?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
  gallery?: string[];
  brandLogoUrl?: string;
  category: CategoryId;
  subcategory: string;
  subcategoryBn: string;
  industry?: IndustryId;
  description: string;
  descriptionBn: string;
  shortDescription: string;
  shortDescriptionBn: string;
  longDescription?: string;
  longDescriptionBn?: string;
  iconName?: string;
  accentColor: string;
  officialWebsite?: string;
  officialProductPage?: string;
  officialPrice?: number;
  marketPrice: number;
  salePrice?: number;
  currency: 'BDT';
  billingPeriod: BillingPeriod;
  accessType: AccessType;
  features: string[];
  featuresBn: string[];
  useCases?: string[];
  useCasesBn?: string[];
  badge?: ProductBadge;
  stockStatus: StockStatus;
  availabilityStatus?: StockStatus;
  status?: ProductPublishStatus;
  supportPeriod: string;
  supportPeriodBn: string;
  lastVerified: string;
  source: string;
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
  plans: ProductPlan[];
  activationTime: string;
  activationTimeBn: string;
  activationSpeed?: string;
  whoIsItFor: string;
  whoIsItForBn: string;
  whoFor?: string;
  whoForBn?: string;
  isFeatured?: boolean;
  seoTitle?: string;
  seoTitleBn?: string;
  seoDescription?: string;
  seoDescriptionBn?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  accentColor: string;
  toolCount: number;
  sampleTools: string[];
  imageUrl?: string;
  order?: number;
}

export interface IndustrySolution {
  id: IndustryId;
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  headline: string;
  headlineBn: string;
  description: string;
  descriptionBn: string;
  heroBadge: string;
  heroBadgeBn: string;
  accentColor: string;
  tools: {
    name: string;
    role: string;
    roleBn: string;
    price: string;
    badge?: string;
  }[];
  keyBenefits: {
    title: string;
    titleBn: string;
    desc: string;
    descBn: string;
  }[];
  demoText: string;
  demoTextBn: string;
  phone: string;
  imageUrl?: string;
  icon?: string;
}

export interface Bundle {
  id: string;
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  targetAudience: string;
  targetAudienceBn: string;
  toolsIncluded: string[];
  individualTotal: number;
  bundlePrice: number;
  savings: number;
  period: BillingPeriod;
  badge: ProductBadge;
  accentColor: string;
  features: string[];
  featuresBn: string[];
  status?: ProductPublishStatus;
}

export interface ITServiceItem {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  categoryBn: string;
  description: string;
  descriptionBn: string;
  deliverables: string[];
  deliverablesBn: string[];
  priceStartingAt: number;
  duration: string;
  durationBn: string;
  icon: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedPlan: ProductPlan;
  quantity: number;
}

export type OrderStatus = 'new' | 'contacted' | 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'pending';
export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'bank' | 'cash';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  productNames: string[];
  items: {
    productId: string;
    productName: string;
    planId: string;
    planName: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  discount: number;
  netAmount: number;
  currency: 'BDT';
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trxId?: string;
  notes?: string;
  orderSource: 'direct_checkout' | 'whatsapp' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
}

export type MediaAssetType = 'logo' | 'cover' | 'gallery' | 'brand' | 'category' | 'banner';

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: MediaAssetType;
  dimensions?: string;
  sizeBytes?: number;
  usedBy: string[];
  altText: string;
  uploadedAt: string;
}

export type UserRole = 
  | 'Super Admin' 
  | 'Administrator' 
  | 'Product Manager' 
  | 'Content Editor' 
  | 'Order Manager' 
  | 'Support' 
  | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  status: 'active' | 'suspended';
  lastLogin?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  action: string;
  module: string;
  recordId?: string;
  recordName?: string;
  details: string;
  timestamp: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  officeAddress: string;
  officeHours: string;
  currency: 'BDT';
  siteTitle: string;
  siteTitleBn: string;
  tagline: string;
  taglineBn: string;
  announcementBanner: string;
  announcementActive: boolean;
  facebookUrl?: string;
  whatsappDeskActive: boolean;
  maintenanceMode: boolean;
  legalDisclaimer: string;
  legalDisclaimerBn: string;
}

export interface HomepageContent {
  heroEyebrow: string;
  heroEyebrowBn: string;
  heroLine1: string;
  heroLine1Bn: string;
  heroLine2: string;
  heroLine2Bn: string;
  heroHighlight: string;
  heroHighlightBn: string;
  heroSub: string;
  heroSubBn: string;
  heroExploreCta: string;
  heroExploreCtaBn: string;
  heroStackCta: string;
  heroStackCtaBn: string;
}
