import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustMarquee } from './components/TrustMarquee';
import { BrandAppartEditorial } from './components/BrandAppartEditorial';
import { CategoryExplorer } from './components/CategoryExplorer';
import { Marketplace } from './components/Marketplace';
import { IndustryShowcase } from './components/IndustryShowcase';
import { StackBuilder } from './components/StackBuilder';
import { BundleMarketplace } from './components/BundleMarketplace';
import { ITServices } from './components/ITServices';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import cosmicPurpleBg from './assets/cosmic-purple-bg.jpg';

// Admin CMS imports
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPortal } from './components/admin/AdminPortal';

import {
  Product,
  Plan,
  CartItem,
  CategoryId,
  Language,
  IndustrySolution,
  Bundle,
  ITServiceItem,
  User,
  SiteSettings,
} from './types';
import { storageService, subscribeToStorageChanges } from './utils/storageService';

export function App() {
  const [language, setLanguage] = useState<Language>('en');

  // Core Data Layer from storageService
  const [productsList, setProductsList] = useState<Product[]>(() => storageService.getProducts());
  const [categoriesList, setCategoriesList] = useState(() => storageService.getCategories());
  const [industriesList, setIndustriesList] = useState(() => storageService.getIndustries());
  const [bundlesList, setBundlesList] = useState(() => storageService.getBundles());
  const [servicesList, setServicesList] = useState(() => storageService.getServices());
  const [settings, setSettings] = useState<SiteSettings>(() => storageService.getSettings());

  // Current logged in admin user
  const [currentUser, setCurrentUser] = useState<User | null>(() => storageService.getCurrentUser());

  // Routing / View Mode: 'storefront' | 'admin' | 'admin-login' | 'product-detail'
  const [viewMode, setViewMode] = useState<'storefront' | 'admin' | 'admin-login' | 'product-detail'>('storefront');
  const [dedicatedProduct, setDedicatedProduct] = useState<Product | null>(null);

  // Filters & Selected Modals
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationIndustry, setConsultationIndustry] = useState<IndustrySolution | null>(null);

  // Initial URL check (e.g. /admin or /product/chatgpt)
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;

      if (path.startsWith('/admin')) {
        const user = storageService.getCurrentUser();
        if (user) {
          setViewMode('admin');
        } else {
          setViewMode('admin-login');
        }
      } else if (path.startsWith('/product/')) {
        const slug = path.replace('/product/', '').trim();
        const found = storageService.getProductBySlug(slug);
        if (found) {
          setDedicatedProduct(found);
          setViewMode('product-detail');
        } else {
          setViewMode('storefront');
        }
      } else {
        setViewMode('storefront');
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  // Subscribe to storage modifications in real-time
  useEffect(() => {
    const unsubscribe = subscribeToStorageChanges(() => {
      setProductsList(storageService.getProducts());
      setCategoriesList(storageService.getCategories());
      setIndustriesList(storageService.getIndustries());
      setBundlesList(storageService.getBundles());
      setServicesList(storageService.getServices());
      setSettings(storageService.getSettings());
      setCurrentUser(storageService.getCurrentUser());
    });
    return unsubscribe;
  }, []);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart actions
  const handleAddToCart = (product: Product, plan?: Plan) => {
    const selectedPlan = plan || product.plans[0];
    const itemId = `${product.id}-${selectedPlan.id}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedPlan,
          quantity: 1,
        },
      ];
    });
  };

  const handleAddStackToCart = (stackProducts: Product[]) => {
    stackProducts.forEach((p) => {
      handleAddToCart(p);
    });
    setIsCartOpen(true);
  };

  const handleSelectBundle = (bundle: Bundle) => {
    const matched = productsList.filter((p) =>
      bundle.toolsIncluded.some((t) => p.name.includes(t) || t.includes(p.name))
    );
    if (matched.length > 0) {
      matched.forEach((p) => handleAddToCart(p));
    } else if (productsList.length > 0) {
      handleAddToCart(productsList[0]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  // Smooth scroll
  const handleNavigateSection = (sectionId: string) => {
    if (viewMode !== 'storefront') {
      setViewMode('storefront');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelection = (catId: CategoryId | 'all') => {
    setSelectedCategory(catId);
    handleNavigateSection('marketplace');
  };

  const handleOpenConsultation = (industry: IndustrySolution) => {
    setConsultationIndustry(industry);
    setIsConsultationOpen(true);
  };

  const handleServiceConsultation = (srv: ITServiceItem) => {
    const mockIndustry: IndustrySolution = {
      id: 'it-service',
      name: srv.title,
      nameBn: srv.titleBn,
      tagline: srv.category,
      taglineBn: srv.categoryBn,
      headline: `Implementation & SLA for ${srv.title}`,
      headlineBn: `${srv.titleBn} বাস্তবায়ন ও কনসালটেশন`,
      heroBadge: 'Enterprise IT Service',
      heroBadgeBn: 'এন্টারপ্রাইজ আইটি সেবা',
      accentColor: '#2563EB',
      description: srv.description,
      descriptionBn: srv.descriptionBn,
      tools: [],
      keyBenefits: [],
      demoText: 'Request Discovery Call',
      demoTextBn: 'কনসালটেশন বুক করুন',
      phone: settings.supportPhone || '+880 1969-101010',
    };
    setConsultationIndustry(mockIndustry);
    setIsConsultationOpen(true);
  };

  // Navigation to Admin
  const handleOpenAdminFromUI = () => {
    const user = storageService.getCurrentUser();
    if (user) {
      setViewMode('admin');
      window.history.pushState({}, '', '/admin/dashboard');
    } else {
      setViewMode('admin-login');
      window.history.pushState({}, '', '/admin/login');
    }
  };

  const handleAdminLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setViewMode('admin');
    window.history.pushState({}, '', '/admin/dashboard');
  };

  const handleAdminLogout = () => {
    storageService.logoutCurrentUser();
    setCurrentUser(null);
    setViewMode('storefront');
    window.history.pushState({}, '', '/');
  };

  const handleReturnToStorefront = () => {
    setViewMode('storefront');
    setDedicatedProduct(null);
    window.history.pushState({}, '', '/');
  };

  const handleOpenDedicatedProductPage = (prod: Product) => {
    setDedicatedProduct(prod);
    setViewMode('product-detail');
    window.history.pushState({}, '', `/product/${prod.slug || prod.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ==========================================
  // VIEW: ADMIN PORTAL
  // ==========================================
  if (viewMode === 'admin' && currentUser) {
    return (
      <AdminPortal
        currentUser={currentUser}
        onLogout={handleAdminLogout}
        onViewStorefront={handleReturnToStorefront}
        onViewProductLive={handleOpenDedicatedProductPage}
      />
    );
  }

  // ==========================================
  // VIEW: ADMIN LOGIN
  // ==========================================
  if (viewMode === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToStore={handleReturnToStorefront}
      />
    );
  }

  // ==========================================
  // VIEW: DEDICATED PRODUCT DETAIL PAGE
  // ==========================================
  if (viewMode === 'product-detail' && dedicatedProduct) {
    return (
      <div className={`min-h-screen text-slate-100 flex flex-col font-sans relative ${language === 'bn' ? 'font-bn' : ''}`}>
        {/* Cosmic Purple Nebula Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={cosmicPurpleBg}
            alt="Cosmic Nebula Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            language={language}
            onLanguageChange={setLanguage}
            cartCount={totalCartUnits}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAdmin={handleOpenAdminFromUI}
            onNavigateSection={handleNavigateSection}
          />

          <main className="flex-1">
            <ProductDetailPage
              product={dedicatedProduct}
              language={language}
              onBack={handleReturnToStorefront}
              onAddToCart={(prod, plan) => handleAddToCart(prod, plan)}
              onSelectProduct={(prod: Product) => {
                setDedicatedProduct(prod);
                window.history.pushState({}, '', `/product/${prod.slug || prod.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectBundle={handleSelectBundle}
            />
          </main>

          <Footer
            language={language}
            onNavigateSection={handleNavigateSection}
            onOpenAdmin={handleOpenAdminFromUI}
          />
        </div>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          language={language}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
          onProceedCheckout={handleProceedCheckout}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          language={language}
          onOrderSuccess={handleOrderSuccess}
        />
      </div>
    );
  }

  // ==========================================
  // VIEW: PUBLIC STOREFRONT
  // ==========================================
  return (
    <div className={`min-h-screen bg-[#0c0926] text-slate-100 flex flex-col font-sans relative ${language === 'bn' ? 'font-bn' : ''}`}>
      {/* Fixed Cosmic Purple Nebula Background for the entire page (Hero covers it with its own image) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={cosmicPurpleBg}
          alt="Cosmic Purple Nebula"
          className="w-full h-full object-cover object-top sm:object-center"
        />
      </div>

      {/* Fixed Sticky Top Global Bar (Announcement + 3-Zone Navbar) - Remains pinned at the top as customer scrolls */}
      <div className="sticky top-0 z-50 w-full shadow-2xl shadow-black/50 backdrop-blur-xl">
        {settings.announcementActive && settings.announcementBanner && (
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700 text-white py-1.5 px-4 text-center text-xs font-semibold tracking-wide border-b border-blue-600/40">
            <span>{settings.announcementBanner}</span>
          </div>
        )}

        {/* 3-Zone Top Bar */}
        <Navbar
          language={language}
          onLanguageChange={setLanguage}
          cartCount={totalCartUnits}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAdmin={handleOpenAdminFromUI}
          onNavigateSection={handleNavigateSection}
        />
      </div>

      <main className="flex-1 pb-16 sm:pb-0 relative z-10">
        {/* Dynamic Interactive Hero with Cursor-Floating Cards - Has its own custom background as it is */}
        <Hero
          language={language}
          onExploreClick={() => handleNavigateSection('marketplace')}
          onBuildStackClick={() => handleNavigateSection('stack-builder')}
          onSelectProduct={(product) => setSelectedProduct(product)}
          featuredProducts={productsList}
        />

        {/* Cosmic Purple Nebula Sections Layer (All sections except Hero) */}
        <div className="relative z-10">
          {/* Continuous Trust Marquee */}
          <TrustMarquee language={language} />

            {/* Brand Appart-inspired Editorial Feature */}
            <BrandAppartEditorial
              language={language}
              onExploreSection={(catId) => handleCategorySelection(catId as any)}
            />

            {/* "WHAT DO YOU NEED TODAY?" Category Explorer */}
            <CategoryExplorer
              categories={categoriesList}
              language={language}
              onSelectCategory={(catId) => handleCategorySelection(catId)}
            />

            {/* "TRENDING DIGITAL TOOLS" Product Marketplace */}
            <Marketplace
              products={productsList}
              language={language}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSelectProduct={(product) => setSelectedProduct(product)}
              onAddToCart={(product) => handleAddToCart(product)}
              onOpenDedicatedPage={handleOpenDedicatedProductPage}
            />

            {/* Industry Solutions (Construction, Garments, Poultry, Real Estate) */}
            <IndustryShowcase
              industries={industriesList}
              language={language}
              onOpenConsultationModal={handleOpenConsultation}
            />

            {/* Interactive "BUILD YOUR DIGITAL STACK" 3-step recommendation tool */}
            <StackBuilder
              products={productsList}
              language={language}
              onAddStackToCart={handleAddStackToCart}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />

            {/* "BUILT FOR THE WAY YOU WORK" Bundles & Single vs Bundle Advantage */}
            <BundleMarketplace
              bundles={bundlesList}
              language={language}
              onSelectBundle={handleSelectBundle}
            />

            {/* Enterprise IT Services & Solutions */}
            <ITServices
              services={servicesList}
              language={language}
              onConsultationRequest={handleServiceConsultation}
            />

            {/* How It Works & Why Us */}
            <HowItWorks language={language} />

            {/* Enterprise Footer with Legal & Trademark Notice */}
            <Footer
              language={language}
              onNavigateSection={handleNavigateSection}
              onOpenAdmin={handleOpenAdminFromUI}
            />
          </div>
      </main>

      {/* Floating WhatsApp Action and Mobile Sticky Bar */}
      <WhatsAppFloatingButton
        language={language}
        onOpenStackBuilder={() => handleNavigateSection('stack-builder')}
      />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          language={language}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenDedicatedPage={handleOpenDedicatedProductPage}
        />
      )}

      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          language={language}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
          onProceedCheckout={handleProceedCheckout}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          language={language}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={productsList}
          language={language}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      )}

      {isConsultationOpen && consultationIndustry && (
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          industry={consultationIndustry}
          language={language}
        />
      )}
    </div>
  );
}

export default App;
