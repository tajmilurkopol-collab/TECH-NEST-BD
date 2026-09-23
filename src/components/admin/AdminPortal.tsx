import React, { useState, useEffect } from 'react';
import { User, Product } from '../../types';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminProductEditor } from './AdminProductEditor';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminOrders } from './AdminOrders';
import { AdminBundles } from './AdminBundles';
import { AdminCategories } from './AdminCategories';
import { AdminIndustries } from './AdminIndustries';
import { AdminHomepage } from './AdminHomepage';
import { AdminUsers } from './AdminUsers';
import { AdminSettings } from './AdminSettings';
import { AdminAuditLog } from './AdminAuditLog';
import { storageService, subscribeToStorageChanges } from '../../utils/storageService';

interface AdminPortalProps {
  currentUser: User;
  onLogout: () => void;
  onViewStorefront: () => void;
  onViewProductLive?: (product: Product) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  onLogout,
  onViewStorefront,
  onViewProductLive,
}) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Local state mirrored from storageService
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [orders, setOrders] = useState(() => storageService.getOrders());
  const [categories, setCategories] = useState(() => storageService.getCategories());
  const [industries, setIndustries] = useState(() => storageService.getIndustries());
  const [bundles, setBundles] = useState(() => storageService.getBundles());
  const [media, setMedia] = useState(() => storageService.getMedia());
  const [auditLogs, setAuditLogs] = useState(() => storageService.getAuditLogs());

  // Subscribe to changes across modules
  useEffect(() => {
    const unsubscribe = subscribeToStorageChanges(() => {
      setProducts(storageService.getProducts());
      setOrders(storageService.getOrders());
      setCategories(storageService.getCategories());
      setIndustries(storageService.getIndustries());
      setBundles(storageService.getBundles());
      setMedia(storageService.getMedia());
      setAuditLogs(storageService.getAuditLogs());
    });
    return unsubscribe;
  }, []);

  const missingMediaCount = products.filter(
    (p) => !p.logoUrl || p.logoUrl.trim() === ''
  ).length;

  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'new' || o.status === 'pending'
  ).length;

  const handleSelectTab = (tab: AdminTab) => {
    if (tab === 'products-add') {
      setIsAddingNewProduct(true);
      setEditingProduct(null);
      setCurrentTab('products');
    } else {
      setIsAddingNewProduct(false);
      setEditingProduct(null);
      setCurrentTab(tab);
    }
  };

  const handleOpenProductEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddingNewProduct(false);
    setCurrentTab('products');
  };

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsAddingNewProduct(true);
  };

  const handleSaveProductEditor = (saved: Product) => {
    setEditingProduct(null);
    setIsAddingNewProduct(false);
    setProducts(storageService.getProducts());
  };

  const handleCancelProductEditor = () => {
    setEditingProduct(null);
    setIsAddingNewProduct(false);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'add-product') {
      handleAddNewProduct();
      setCurrentTab('products');
    }
  };

  return (
    <div className="flex h-screen bg-[#030712] text-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        onLogout={onLogout}
        onViewStorefront={onViewStorefront}
        metrics={{
          totalProducts: products.length,
          pendingOrders: pendingOrdersCount,
          missingMediaCount,
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <AdminHeader
          currentTab={currentTab}
          currentUser={currentUser}
          onQuickAction={handleQuickAction}
          globalSearch={globalSearch}
          onGlobalSearchChange={setGlobalSearch}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#040814] pb-16">
          {/* PRODUCT EDITOR OVERLAY (When editing or adding) */}
          {(editingProduct || isAddingNewProduct) && (
            <AdminProductEditor
              initialProduct={editingProduct}
              onSave={handleSaveProductEditor}
              onCancel={handleCancelProductEditor}
              currentUser={currentUser}
            />
          )}

          {/* MAIN TAB SWITCHER */}
          {!editingProduct && !isAddingNewProduct && (
            <>
              {currentTab === 'dashboard' && (
                <AdminDashboard
                  products={products}
                  orders={orders}
                  categories={categories}
                  industries={industries}
                  bundles={bundles}
                  media={media}
                  auditLogs={auditLogs}
                  onNavigateTab={handleSelectTab}
                  onOpenProductEdit={handleOpenProductEdit}
                />
              )}

              {currentTab === 'products' && (
                <AdminProducts
                  products={products}
                  onAddNew={handleAddNewProduct}
                  onEdit={handleOpenProductEdit}
                  onViewProductLive={onViewProductLive}
                  filterMode="all"
                />
              )}

              {currentTab === 'products-drafts' && (
                <AdminProducts
                  products={products}
                  onAddNew={handleAddNewProduct}
                  onEdit={handleOpenProductEdit}
                  onViewProductLive={onViewProductLive}
                  filterMode="drafts"
                />
              )}

              {currentTab === 'products-missing-media' && (
                <AdminProducts
                  products={products}
                  onAddNew={handleAddNewProduct}
                  onEdit={handleOpenProductEdit}
                  onViewProductLive={onViewProductLive}
                  filterMode="missing-media"
                />
              )}

              {currentTab === 'categories' && (
                <AdminCategories currentUser={currentUser} />
              )}

              {currentTab === 'industries' && (
                <AdminIndustries currentUser={currentUser} />
              )}

              {currentTab === 'bundles' && (
                <AdminBundles currentUser={currentUser} />
              )}

              {currentTab === 'pricing' && (
                <AdminProducts
                  products={products}
                  onAddNew={handleAddNewProduct}
                  onEdit={handleOpenProductEdit}
                  onViewProductLive={onViewProductLive}
                  filterMode="all"
                />
              )}

              {currentTab === 'orders' && (
                <AdminOrders currentUser={currentUser} />
              )}

              {currentTab === 'customers' && (
                <AdminOrders currentUser={currentUser} />
              )}

              {currentTab === 'media' && (
                <AdminMediaLibrary currentUser={currentUser} />
              )}

              {currentTab === 'homepage' && (
                <AdminHomepage currentUser={currentUser} />
              )}

              {currentTab === 'services' && (
                <AdminCategories currentUser={currentUser} />
              )}

              {currentTab === 'languages' && (
                <AdminHomepage currentUser={currentUser} />
              )}

              {currentTab === 'users' && (
                <AdminUsers currentUser={currentUser} />
              )}

              {currentTab === 'settings' && (
                <AdminSettings currentUser={currentUser} />
              )}

              {currentTab === 'audit' && <AdminAuditLog />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
