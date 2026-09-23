import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  Check,
  Image,
  DollarSign,
  Tag,
  List,
  Sparkles,
  Layers,
  Globe,
  Settings,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  Product,
  ProductPlan,
  CategoryId,
  IndustryId,
  AccessType,
  BillingPeriod,
  ProductBadge,
  StockStatus,
  ProductPublishStatus,
  User,
} from '../../types';
import { ProductLogo } from '../ProductLogo';
import { storageService } from '../../utils/storageService';

interface AdminProductEditorProps {
  initialProduct?: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
  currentUser: User;
}

type EditorTab =
  | 'general'
  | 'media'
  | 'pricing'
  | 'plans'
  | 'features'
  | 'categories'
  | 'seo'
  | 'bangla'
  | 'publishing';

export const AdminProductEditor: React.FC<AdminProductEditorProps> = ({
  initialProduct,
  onSave,
  onCancel,
  currentUser,
}) => {
  const isEditing = !!initialProduct;

  const [activeTab, setActiveTab] = useState<EditorTab>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Product>(() => {
    if (initialProduct) return { ...initialProduct };

    return {
      id: `tool-${Date.now().toString().slice(-4)}`,
      slug: 'new-tool',
      name: '',
      brand: '',
      category: 'ai',
      subcategory: 'Productivity & AI',
      subcategoryBn: 'প্রোডাক্টিভিটি ও এআই',
      description: '',
      descriptionBn: '',
      shortDescription: '',
      shortDescriptionBn: '',
      accentColor: '#3B82F6',
      logoUrl: '/products/logos/default-tool.svg',
      marketPrice: 500,
      officialPrice: 2000,
      currency: 'BDT',
      billingPeriod: 'Monthly',
      accessType: 'Personal',
      badge: 'NEW',
      stockStatus: 'AVAILABLE',
      status: 'published',
      supportPeriod: '30 Days Guaranteed',
      supportPeriodBn: '৩০ দিন গ্যারান্টি',
      lastVerified: new Date().toISOString().split('T')[0],
      source: 'Observed BD Marketplace Rate',
      sourceType: 'MARKETPLACE',
      verificationStatus: 'VERIFIED',
      activationTime: '15 - 30 Minutes',
      activationTimeBn: '১৫ - ৩০ মিনিট',
      whoIsItFor: 'Professionals and teams in Bangladesh',
      whoIsItForBn: 'পেশাজীবী ও টিম',
      isFeatured: false,
      features: ['Official model access', 'Fast Bangladeshi delivery', 'Direct WhatsApp support'],
      featuresBn: ['অফিসিয়াল এক্সেস', 'দ্রুত ডেলিভারি', 'হোয়াটসঅ্যাপ সাপোর্ট'],
      plans: [
        {
          id: 'plan-1',
          name: '1 Month Access',
          nameBn: '১ মাস এক্সেস',
          period: 'Monthly',
          accessType: 'Personal',
          marketPrice: 500,
          isPopular: true,
        },
      ],
    };
  });

  const availableMedia = storageService.getMedia();

  const handleFieldChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlanChange = (index: number, planField: keyof ProductPlan, value: any) => {
    const updatedPlans = [...formData.plans];
    updatedPlans[index] = { ...updatedPlans[index], [planField]: value };
    setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  const handleAddPlan = () => {
    const newPlan: ProductPlan = {
      id: `plan-${Date.now().toString().slice(-4)}`,
      name: 'Standard Subscription',
      nameBn: 'স্ট্যান্ডার্ড সাবস্ক্রিপশন',
      period: 'Monthly',
      accessType: 'Personal',
      marketPrice: formData.marketPrice || 500,
      isPopular: false,
    };
    setFormData((prev) => ({ ...prev, plans: [...prev.plans, newPlan] }));
  };

  const handleRemovePlan = (index: number) => {
    if (formData.plans.length <= 1) return;
    const updatedPlans = formData.plans.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, 'New capability specification'],
      featuresBn: [...prev.featuresBn, 'নতুন ফিচার'],
    }));
  };

  const handleUpdateFeature = (index: number, val: string, isBn: boolean) => {
    if (isBn) {
      const updated = [...formData.featuresBn];
      updated[index] = val;
      setFormData((prev) => ({ ...prev, featuresBn: updated }));
    } else {
      const updated = [...formData.features];
      updated[index] = val;
      setFormData((prev) => ({ ...prev, features: updated }));
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      featuresBn: prev.featuresBn.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveProduct(formData, currentUser);
    setSavedSuccess(true);
    setTimeout(() => {
      onSave(formData);
    }, 400);
  };

  const tabs: { id: EditorTab; label: string; icon: any }[] = [
    { id: 'general', label: 'General Info', icon: Tag },
    { id: 'media', label: 'Product Media & Logo', icon: Image },
    { id: 'pricing', label: 'Pricing & Verification', icon: DollarSign },
    { id: 'plans', label: 'Subscription Plans', icon: Layers },
    { id: 'features', label: 'Features & Capabilities', icon: List },
    { id: 'categories', label: 'Categories & Taxonomy', icon: Sparkles },
    { id: 'seo', label: 'SEO & Metadata', icon: Globe },
    { id: 'bangla', label: 'বাংলা Translations', icon: Globe },
    { id: 'publishing', label: 'Publishing Settings', icon: Settings },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved to Database' : 'Save Product Record'}</span>
          </button>
        </div>
      </div>

      {/* Editor Main Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Top Product Header Preview */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ProductLogo
              name={formData.name || 'Product'}
              brand={formData.brand || 'Brand'}
              logoUrl={formData.logoUrl}
              accentColor={formData.accentColor}
              size="lg"
            />
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {formData.name || 'Untitled Digital Tool'}
              </h2>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {formData.brand || 'Brand Name'} • /{formData.slug || 'slug'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                formData.status === 'draft'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              {formData.status || 'published'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto border-b border-slate-800 bg-slate-950/50 px-4 text-xs no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isCurrent
                    ? 'border-blue-500 text-blue-400 bg-blue-950/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Product Name (Official Branding)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g. ChatGPT Plus & Team"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand / Developer Name
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleFieldChange('brand', e.target.value)}
                    placeholder="e.g. OpenAI"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    placeholder="e.g. chatgpt"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subcategory Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => handleFieldChange('subcategory', e.target.value)}
                    placeholder="e.g. AI Language Model & Reasoning"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand Accent Hex Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                      className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Editorial Description (For Cards)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => handleFieldChange('shortDescription', e.target.value)}
                  placeholder="Concise 1-sentence value proposition..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Technical & Enterprise Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Complete product summary, architecture, and Bangladeshi access features..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Vendor Website Link
                  </label>
                  <input
                    type="url"
                    value={formData.officialWebsite || ''}
                    onChange={(e) => handleFieldChange('officialWebsite', e.target.value)}
                    placeholder="https://openai.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Promotional Badge (Optional)
                  </label>
                  <select
                    value={formData.badge || ''}
                    onChange={(e) => handleFieldChange('badge', e.target.value || undefined)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="">No Badge</option>
                    <option value="BEST SELLER">BEST SELLER</option>
                    <option value="TRENDING">TRENDING</option>
                    <option value="NEW">NEW</option>
                    <option value="POPULAR">POPULAR</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="FOR CREATORS">FOR CREATORS</option>
                    <option value="FOR TEAMS">FOR TEAMS</option>
                    <option value="LIMITED OFFER">LIMITED OFFER</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Official Brand Vector Logo
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Select a registered official vector asset or type a custom SVG/WebP URL.
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <ProductLogo
                    name={formData.name}
                    brand={formData.brand}
                    logoUrl={formData.logoUrl}
                    accentColor={formData.accentColor}
                    size="xl"
                  />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Logo Asset URL
                    </label>
                    <input
                      type="text"
                      value={formData.logoUrl || ''}
                      onChange={(e) => handleFieldChange('logoUrl', e.target.value)}
                      placeholder="/products/logos/chatgpt.svg"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                </div>

                {/* Quick picker from Media Library */}
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                    Pick from Available Media Library SVGs:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {availableMedia.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleFieldChange('logoUrl', m.url)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          formData.logoUrl === m.url
                            ? 'bg-blue-950/80 border-blue-500'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img src={m.url} alt={m.altText} className="w-7 h-7 object-contain" />
                        <span className="text-[9px] text-slate-400 truncate max-w-full font-mono">
                          {m.filename}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRICING */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/60 mb-4 text-xs text-blue-300">
                <span className="font-bold">Transparent Marketplace Pricing Rule:</span> Never present a reseller rate as an official vendor price. Always state the official reference USD/BDT price and the verified TECH NEST BD marketplace price clearly.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    TECH NEST BD Marketplace Price (BDT)
                  </label>
                  <input
                    type="number"
                    value={formData.marketPrice}
                    onChange={(e) => handleFieldChange('marketPrice', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Vendor Benchmark Price (BDT)
                  </label>
                  <input
                    type="number"
                    value={formData.officialPrice || ''}
                    onChange={(e) => handleFieldChange('officialPrice', Number(e.target.value))}
                    placeholder="e.g. 2450"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Billing Period
                  </label>
                  <select
                    value={formData.billingPeriod}
                    onChange={(e) => handleFieldChange('billingPeriod', e.target.value as BillingPeriod)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="Annual">Annual</option>
                    <option value="One-Time">One-Time</option>
                    <option value="Pay As You Go">Pay As You Go</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pricing Source Information
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => handleFieldChange('source', e.target.value)}
                    placeholder="e.g. Observed BD Marketplace Rate"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Rate Verification Status
                  </label>
                  <select
                    value={formData.verificationStatus}
                    onChange={(e) => handleFieldChange('verificationStatus', e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="MARKETPLACE_OBSERVED">MARKETPLACE_OBSERVED</option>
                    <option value="VERIFICATION_REQUIRED">VERIFICATION_REQUIRED</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PLANS */}
          {activeTab === 'plans' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Subscription Tiers & Access Modes
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define Shared, Private Email, Team, or Dedicated credentials tiers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPlan}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Plan Tier</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.plans.map((plan, pIdx) => (
                  <div
                    key={plan.id || pIdx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Tier #{pIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePlan(pIdx)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Tier Name</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => handlePlanChange(pIdx, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Bangla Name</label>
                        <input
                          type="text"
                          value={plan.nameBn}
                          onChange={(e) => handlePlanChange(pIdx, 'nameBn', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Price (BDT)</label>
                        <input
                          type="number"
                          value={plan.marketPrice}
                          onChange={(e) => handlePlanChange(pIdx, 'marketPrice', Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Access Type</label>
                        <select
                          value={plan.accessType}
                          onChange={(e) => handlePlanChange(pIdx, 'accessType', e.target.value as AccessType)}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Shared">Shared</option>
                          <option value="Team">Team</option>
                          <option value="Dedicated">Dedicated</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Key Included Features (English & Bangla)
                </h3>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Feature</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleUpdateFeature(fIdx, e.target.value, false)}
                      placeholder="English feature..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    <input
                      type="text"
                      value={formData.featuresBn[fIdx] || ''}
                      onChange={(e) => handleUpdateFeature(fIdx, e.target.value, true)}
                      placeholder="বাংলা ফিচার..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(fIdx)}
                      className="p-2 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFieldChange('category', e.target.value as CategoryId)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="ai">AI Tools</option>
                  <option value="creative">Creative & Design</option>
                  <option value="marketing">Marketing & SEO</option>
                  <option value="business">Business & Productivity</option>
                  <option value="developer">Developer & APIs</option>
                  <option value="industry">Industry Solutions & ERP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Associated Vertical / Industry (Optional)
                </label>
                <select
                  value={formData.industry || ''}
                  onChange={(e) => handleFieldChange('industry', e.target.value || undefined)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="">None / General Purpose</option>
                  <option value="construction">Construction & Real Estate</option>
                  <option value="garments">Garments & Textile</option>
                  <option value="agro_poultry">Agro & Poultry</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="healthcare">Healthcare & Diagnostic</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB: SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Custom SEO Page Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle || ''}
                  onChange={(e) => handleFieldChange('seoTitle', e.target.value)}
                  placeholder={`${formData.name} in Bangladesh | Price & Instant Access - TECH NEST BD`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.seoDescription || ''}
                  onChange={(e) => handleFieldChange('seoDescription', e.target.value)}
                  placeholder={`Get verified access to ${formData.name} in BDT with local bKash/Nagad support...`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* TAB: BANGLA */}
          {activeTab === 'bangla' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  বাংলা নাম (Bangla Name)
                </label>
                <input
                  type="text"
                  value={formData.nameBn || ''}
                  onChange={(e) => handleFieldChange('nameBn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  বাংলা সংক্ষিপ্ত বর্ণনা (Short Description Bn)
                </label>
                <input
                  type="text"
                  value={formData.shortDescriptionBn || ''}
                  onChange={(e) => handleFieldChange('shortDescriptionBn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  বাংলা বিস্তারিত বিবরণ (Full Description Bn)
                </label>
                <textarea
                  rows={4}
                  value={formData.descriptionBn || ''}
                  onChange={(e) => handleFieldChange('descriptionBn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* TAB: PUBLISHING */}
          {activeTab === 'publishing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Catalog Publishing Status
                  </label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => handleFieldChange('status', e.target.value as ProductPublishStatus)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="published">Published (Visible on Storefront)</option>
                    <option value="draft">Draft (Hidden from Public)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Stock & Availability Status
                  </label>
                  <select
                    value={formData.stockStatus}
                    onChange={(e) => handleFieldChange('stockStatus', e.target.value as StockStatus)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="COMING SOON">COMING SOON</option>
                    <option value="REQUEST QUOTE">REQUEST QUOTE</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={!!formData.isFeatured}
                  onChange={(e) => handleFieldChange('isFeatured', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featuredToggle" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Feature this product on homepage & top marketplace banner
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
