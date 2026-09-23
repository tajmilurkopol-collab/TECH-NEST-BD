import React, { useState } from 'react';
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
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AdminCatalogueModal } from './components/AdminCatalogueModal';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { products as initialProducts } from './data/products';
import { categories } from './data/categories';
import { industries } from './data/industries';
import { bundles } from './data/bundles';
import { itServices } from './data/services';
import { Product, Plan, CartItem, CategoryId, Language, IndustrySolution, Bundle, ITServiceItem } from './types';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationIndustry, setConsultationIndustry] = useState<IndustrySolution | null>(null);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  React.useEffect(() => {
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
    // Add primary constituent tools
    const matched = productsList.filter((p) => bundle.toolsIncluded.some((t) => p.name.includes(t) || t.includes(p.name)));
    if (matched.length > 0) {
      matched.forEach((p) => handleAddToCart(p));
    } else {
      // Add first matching
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

  // Navigation smoothly scroll to target ID
  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle category selection from explorer or editorial
  const handleCategorySelection = (catId: CategoryId | 'all') => {
    setSelectedCategory(catId);
    handleNavigateSection('marketplace');
  };

  // Open consultation modal
  const handleOpenConsultation = (industry: IndustrySolution) => {
    setConsultationIndustry(industry);
    setIsConsultationOpen(true);
  };

  const handleServiceConsultation = (srv: ITServiceItem) => {
    const mockIndustry: IndustrySolution = {
      id: 'construction',
      name: srv.title,
      nameBn: srv.titleBn,
      tagline: srv.category,
      taglineBn: srv.categoryBn,
      headline: `Implementation & Consultation for ${srv.title}`,
      headlineBn: `${srv.titleBn} সংক্রান্ত কনসালটেশন`,
      heroBadge: 'Enterprise IT Service',
      heroBadgeBn: 'এন্টারপ্রাইজ আইটি সেবা',
      accentColor: '#2563EB',
      description: srv.description,
      descriptionBn: srv.descriptionBn,
      tools: [],
      keyBenefits: [],
      demoText: 'Request Discovery Call',
      demoTextBn: 'কনসালটেশন বুক করুন',
      phone: '01969-101010',
    };
    setConsultationIndustry(mockIndustry);
    setIsConsultationOpen(true);
  };

  // Admin catalogue simulations
  const handleUpdateProductStatus = (id: string, status: 'AVAILABLE' | 'COMING SOON' | 'REQUEST QUOTE') => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, availabilityStatus: status } : p))
    );
  };

  const handleUpdateProductPrice = (id: string, newPrice: number) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, marketPrice: newPrice } : p))
    );
  };

  const totalCartUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#050B16] text-slate-100 flex flex-col font-sans ${language === 'bn' ? 'font-bn' : ''}`}>
      {/* 3-Zone Top Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1 pb-16 sm:pb-0">
        {/* Dynamic Interactive Hero with Cursor-Floating Cards */}
        <Hero
          language={language}
          onExploreClick={() => handleNavigateSection('marketplace')}
          onBuildStackClick={() => handleNavigateSection('stack-builder')}
          onSelectProduct={(product) => setSelectedProduct(product)}
          featuredProducts={productsList}
        />

        {/* Continuous Trust Marquee */}
        <TrustMarquee language={language} />

        {/* Brand Appart-inspired Editorial Feature */}
        <BrandAppartEditorial
          language={language}
          onExploreSection={(catId) => handleCategorySelection(catId as any)}
        />

        {/* "WHAT DO YOU NEED TODAY?" Category Explorer */}
        <CategoryExplorer
          categories={categories}
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
        />

        {/* Industry Solutions (Construction, Garments, Poultry, Real Estate) */}
        <IndustryShowcase
          industries={industries}
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
          bundles={bundles}
          language={language}
          onSelectBundle={handleSelectBundle}
        />

        {/* Enterprise IT Services & Solutions */}
        <ITServices
          services={itServices}
          language={language}
          onConsultationRequest={handleServiceConsultation}
        />

        {/* How It Works & Why Us */}
        <HowItWorks language={language} />
      </main>

      {/* Enterprise Footer */}
      <Footer
        language={language}
        onNavigateSection={handleNavigateSection}
      />

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

      {isAdminOpen && (
        <AdminCatalogueModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          products={productsList}
          language={language}
          onUpdateProductStatus={handleUpdateProductStatus}
          onUpdateProductPrice={handleUpdateProductPrice}
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
