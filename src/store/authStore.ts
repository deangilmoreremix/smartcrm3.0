import { create } from 'zustand';
import { 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser, 
  fetchUserTenants 
} from '../services/supabaseClient';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  account_status?: 'active' | 'pending' | 'suspended';
}

interface UserTenant {
  tenantId: string;
  role: string;
  isPrimary: boolean;
  tenant: {
    id: string;
    name: string;
    subdomain: string;
    customDomain?: string;
    logoUrl?: string;
    appName?: string;
  }
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tenants: UserTenant[];
  currentTenant: UserTenant | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUserProfile: () => Promise<void>;
  loadUserTenants: () => Promise<void>;
  setCurrentTenant: (tenantId: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tenants: [],
  currentTenant: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data || !data.user) {
        throw new Error('No user data returned from login');
      }
      
      // Set user data
      set({
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
        isAuthenticated: true,
        isLoading: false
      });
      
      // Load user profile and tenants
      await get().loadUserProfile();
      await get().loadUserTenants();
      
    } catch (err) {
      console.error('Login error:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'An error occurred during login'
      });
    }
  },
  
  register: async (email, password, fullName) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data || !data.user) {
        throw new Error('No user data returned from registration');
      }
      
      // At this point, user is registered but might need email confirmation
      // We'll set the user but not isAuthenticated until they confirm their email
      set({
        user: {
          id: data.user.id,
          email: data.user.email || '',
          full_name: fullName,
        },
        isLoading: false
      });
      
    } catch (err) {
      console.error('Registration error:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'An error occurred during registration'
      });
    }
  },
  
  logout: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { error } = await signOut();
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({
        user: null,
        isAuthenticated: false,
        tenants: [],
        currentTenant: null,
        isLoading: false
      });
    } catch (err) {
      console.error('Logout error:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'An error occurred during logout'
      });
    }
  },
  
  loadUserProfile: async () => {
    const { user } = get();
    
    if (!user) return;
    
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, we'd fetch the user profile from Supabase
      // const { data, error } = await supabase
      //   .from('users')
      //   .select('*')
      //   .eq('id', user.id)
      //   .single();
      
      // if (error) throw error;
      
      // For demo purposes, we'll just use the existing user data
      set({
        isLoading: false,
        user: {
          ...user,
          full_name: user.full_name || 'Demo User',
          account_status: 'active'
        }
      });
    } catch (err) {
      console.error('Error loading user profile:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load user profile'
      });
    }
  },
  
  loadUserTenants: async () => {
    const { user } = get();
    
    if (!user) return;
    
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, we'd fetch the user's tenants from Supabase
      // const { data, error } = await fetchUserTenants(user.id);
      
      // if (error) throw error;
      
      // For demo purposes, we'll use mock data
      const mockTenants: UserTenant[] = [
        {
          tenantId: 'default',
          role: 'owner',
          isPrimary: true,
          tenant: {
            id: 'default',
            name: 'SmartCRM',
            subdomain: 'app',
            logoUrl: undefined,
            appName: 'SmartCRM'
          }
        },
        {
          tenantId: 'acme',
          role: 'admin',
          isPrimary: false,
          tenant: {
            id: 'acme',
            name: 'Acme Corp',
            subdomain: 'acme',
            logoUrl: 'https://example.com/logo-acme.png',
            appName: 'Acme Sales Hub'
          }
        },
        {
          tenantId: 'globex',
          role: 'admin',
          isPrimary: false,
          tenant: {
            id: 'globex',
            name: 'Globex Industries',
            subdomain: 'globex',
            logoUrl: 'https://example.com/logo-globex.png',
            appName: 'Globex CRM'
          }
        }
      ];
      
      // Find primary tenant or the first one
      const primaryTenant = mockTenants.find(t => t.isPrimary) || mockTenants[0];
      
      set({
        tenants: mockTenants,
        currentTenant: primaryTenant,
        isLoading: false
      });
    } catch (err) {
      console.error('Error loading user tenants:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load user tenants'
      });
    }
  },
  
  setCurrentTenant: (tenantId: string) => {
    const { tenants } = get();
    const tenant = tenants.find(t => t.tenantId === tenantId);
    
    if (tenant) {
      set({ currentTenant: tenant });
      // In a real app, we'd update this in localStorage and perhaps in the JWT claims
    }
  },
  
  clearError: () => set({ error: null })
}));