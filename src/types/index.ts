export type Language = 'en' | 'bn';

export type CategoryId = 
  | 'ai' 
  | 'creative' 
  | 'marketing' 
  | 'business' 
  | 'developer' 
  | 'apis' 
  | 'industry' 
  | 'services';

export type IndustryId =
  | 'construction'
  | 'garments'
  | 'real_estate'
  | 'agro_poultry'
  | 'manufacturing'
  | 'retail'
  | 'healthcare'
  | 'education';

export type AccessType = 'Personal' | 'Shared' | 'Team' | 'Business' | 'API' | 'Dedicated';

export type BillingPeriod = 'Monthly' | '3 Months' | '6 Months' | 'Annual' | 'One-Time' | 'Pay As You Go';

export type ProductBadge = 'BEST SELLER' | 'TRENDING' | 'NEW' | 'POPULAR' | 'BUSINESS' | 'FOR CREATORS' | 'FOR TEAMS' | 'LIMITED OFFER';

export type StockStatus = 'AVAILABLE' | 'COMING SOON' | 'REQUEST QUOTE';

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
  name: string;
  brand: string;
  category: CategoryId;
  subcategory: string;
  subcategoryBn: string;
  industry?: IndustryId;
  description: string;
  descriptionBn: string;
  shortDescription: string;
  shortDescriptionBn: string;
  iconName: string;
  accentColor: string;
  officialWebsite?: string;
  officialPrice?: number;
  marketPrice: number;
  currency: 'BDT';
  billingPeriod: BillingPeriod;
  accessType: AccessType;
  features: string[];
  featuresBn: string[];
  badge?: ProductBadge;
  stockStatus: StockStatus;
  availabilityStatus?: StockStatus;
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
