import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { Product, Order, User, SiteSettings, IndustrySolution } from '../types';

const ADMIN_BOOTSTRAP_EMAILS = ['tajmilur.kopol@gmail.com', 'admin@technestbd.com'];

export interface AuthUserState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAdmin: boolean;
  loading: boolean;
}

export const firebaseDbService = {
  // ==========================================
  // AUTHENTICATION
  // ==========================================
  async signInWithGoogle(): Promise<{ user: User; isAdmin: boolean }> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const isBootstrapAdmin: boolean = Boolean(
        ADMIN_BOOTSTRAP_EMAILS.includes(fbUser.email?.toLowerCase() || '') ||
        fbUser.email?.endsWith('@technestbd.com')
      );

      const appUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Authorized User',
        email: fbUser.email || '',
        role: isBootstrapAdmin ? 'Super Admin' : 'Customer',
        status: 'active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      // Ensure user profile in Firestore
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        await setDoc(
          userDocRef,
          {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Customer',
            photoURL: fbUser.photoURL || '',
            role: isBootstrapAdmin ? 'admin' : 'customer',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Could not write user profile to firestore (may require setup):', err);
      }

      // If bootstrap admin, ensure record in /admins/{uid}
      if (isBootstrapAdmin) {
        try {
          const adminDocRef = doc(db, 'admins', fbUser.uid);
          await setDoc(
            adminDocRef,
            {
              uid: fbUser.uid,
              email: fbUser.email || '',
              role: 'Super Admin',
              createdAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.warn('Could not sync admin record:', err);
        }
      }

      return { user: appUser, isAdmin: isBootstrapAdmin };
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  subscribeAuth(callback: (state: AuthUserState) => void) {
    return onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        callback({
          user: null,
          firebaseUser: null,
          isAdmin: false,
          loading: false,
        });
        return;
      }

      const isBootstrapAdmin: boolean = Boolean(
        ADMIN_BOOTSTRAP_EMAILS.includes(fbUser.email?.toLowerCase() || '') ||
        fbUser.email?.endsWith('@technestbd.com')
      );

      let isAdmin: boolean = isBootstrapAdmin;

      // Check /admins/{uid} if exists
      try {
        const adminDoc = await getDoc(doc(db, 'admins', fbUser.uid));
        if (adminDoc.exists()) {
          isAdmin = true;
        }
      } catch {
        // If not accessible or not found, fall back to email match
      }

      const appUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        email: fbUser.email || '',
        role: isAdmin ? 'Super Admin' : 'Customer',
        status: 'active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      callback({
        user: appUser,
        firebaseUser: fbUser,
        isAdmin,
        loading: false,
      });
    });
  },

  // ==========================================
  // PRODUCTS DATABASE SYNC
  // ==========================================
  async syncInitialProductsIfEmpty(initialProducts: Product[]): Promise<void> {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (snap.empty && auth.currentUser) {
        console.log('Seeding initial products to Firestore...');
        for (const p of initialProducts) {
          await setDoc(doc(db, 'products', p.id), {
            id: p.id,
            name: p.name,
            nameBn: p.nameBn || '',
            brand: p.brand || '',
            category: p.category,
            subcategory: p.subcategory || '',
            marketPrice: p.marketPrice,
            officialPrice: p.officialPrice || p.marketPrice * 1.5,
            description: p.description || '',
            status: p.status || 'published',
            updatedAt: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.warn('Product check/seed note:', err);
    }
  },

  subscribeProducts(callback: (products: Product[]) => void) {
    const colRef = collection(db, 'products');
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Product[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Product);
          });
          callback(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'products');
      }
    );
  },

  async saveProduct(product: Product): Promise<void> {
    try {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${product.id}`);
    }
  },

  // ==========================================
  // ORDERS DATABASE
  // ==========================================
  async createOrder(order: Order): Promise<void> {
    try {
      const orderRef = doc(db, 'orders', order.id);
      await setDoc(orderRef, {
        id: order.id,
        orderNumber: order.orderNumber,
        userId: auth.currentUser?.uid || null,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        customerCompany: order.customerCompany || '',
        productNames: order.productNames || [],
        subtotal: order.totalAmount,
        discount: order.discount,
        total: order.netAmount,
        totalAmount: order.totalAmount,
        netAmount: order.netAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus || 'pending',
        status: order.status,
        orderSource: order.orderSource || 'direct_checkout',
        createdAt: order.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `orders/${order.id}`);
    }
  },

  async getUserOrders(userId?: string): Promise<Order[]> {
    try {
      const targetUid = userId || auth.currentUser?.uid;
      if (!targetUid) return [];

      const q = query(collection(db, 'orders'), where('userId', '==', targetUid));
      const snap = await getDocs(q);
      const orders: Order[] = [];
      snap.forEach((d) => orders.push(d.data() as Order));
      return orders;
    } catch (error) {
      console.warn('Could not fetch user orders from Firestore, fallback to local:', error);
      return [];
    }
  },

  // ==========================================
  // CONSULTATIONS & DISCOVERY LEADS
  // ==========================================
  async submitConsultation(inquiry: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    industryId: string;
  }): Promise<void> {
    try {
      await setDoc(doc(db, 'consultations', inquiry.id), {
        ...inquiry,
        status: 'new',
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `consultations/${inquiry.id}`);
    }
  },

  // ==========================================
  // SITE SETTINGS
  // ==========================================
  async saveSiteSettings(settings: SiteSettings): Promise<void> {
    try {
      await setDoc(doc(db, 'site_settings', 'global'), {
        ...settings,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'site_settings/global');
    }
  },
};
