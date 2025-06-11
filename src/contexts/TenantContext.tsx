import React, { createContext, useCallback, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  custom_domain?: string;
  logo_url?: string;
  color_scheme: {
    primary: string;
    accent: string;
  };
  theme_settings?: {
    font?: string;
    borderRadius?: string;
    cardStyle?: string;
    buttonStyle?: string;
  };
  app_name?: string;
  tagline?: string;
  support_email?: string;
}

interface TenantContextType {
  tenant: Tenant | null;
  isLoading: boolean;
  error: string | null;
  loadTenant: (identifier: string) => Promise<void>;
  updateTenant: (updates: Partial<Tenant>) => Promise<void>;
}

// Default tenant config for fallback
const DEFAULT_TENANT: Tenant = {
  id: 'default',
  name: 'SmartCRM',
  subdomain: 'app',
  logo_url: '/logo.svg',
  color_scheme: {
    primary: '#4f46e5',
    accent: '#3b82f6'
  },
  theme_settings: {
    font: 'Inter, system-ui, sans-serif',
    borderRadius: 'rounded-lg',
    cardStyle: 'shadow-sm border border-gray-200',
    buttonStyle: 'rounded-md'
  },
  app_name: 'SmartCRM',
  tagline: 'AI-powered CRM',
  support_email: 'support@smartcrm.com'
};

export const TenantContext = createContext<TenantContextType>({
  tenant: DEFAULT_TENANT,
  isLoading: false,
  error: null,
  loadTenant: async () => {},
  updateTenant: async () => {}
});

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant | null>(DEFAULT_TENANT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Apply tenant theme to CSS variables
  useEffect(() => {
    if (!tenant) return;
    
    // Generate color shades based on primary and accent colors
    const applyColorToRoot = (color: string, prefix: string) => {
      // In a real app, we'd generate proper color shades
      // For now, we'll just apply the main color
      document.documentElement.style.setProperty(`--color-${prefix}-500`, color);
      
      // Simulate lighter and darker shades (in production, use a proper color library)
      document.documentElement.style.setProperty(`--color-${prefix}-50`, `${color}10`);
      document.documentElement.style.setProperty(`--color-${prefix}-100`, `${color}20`);
      document.documentElement.style.setProperty(`--color-${prefix}-200`, `${color}30`);
      document.documentElement.style.setProperty(`--color-${prefix}-300`, `${color}40`);
      document.documentElement.style.setProperty(`--color-${prefix}-400`, `${color}80`);
      document.documentElement.style.setProperty(`--color-${prefix}-600`, color);
      document.documentElement.style.setProperty(`--color-${prefix}-700`, color);
      document.documentElement.style.setProperty(`--color-${prefix}-800`, color);
      document.documentElement.style.setProperty(`--color-${prefix}-900`, color);
    };

    // Apply color scheme
    applyColorToRoot(tenant.color_scheme.primary, 'primary');
    applyColorToRoot(tenant.color_scheme.accent, 'accent');
    
    // Apply fonts
    if (tenant.theme_settings?.font) {
      document.documentElement.style.setProperty('--font-sans', tenant.theme_settings.font);
      document.documentElement.style.setProperty('--font-heading', tenant.theme_settings.font);
    }

    // Set page title and favicon
    if (tenant.app_name) {
      document.title = tenant.app_name;
    }

    // Dynamic favicon could be set here too if needed
    // const favicon = document.getElementById('favicon') as HTMLLinkElement;
    // if (favicon && tenant.favicon_url) {
    //   favicon.href = tenant.favicon_url;
    // }
  }, [tenant]);

  const loadTenant = useCallback(async (identifier: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, we'd fetch from Supabase here
      // const { data, error } = await supabase
      //   .from('tenants')
      //   .select('*')
      //   .or(`subdomain.eq.${identifier},id.eq.${identifier}`)
      //   .single();
      
      // if (error) throw error;
      // if (!data) throw new Error('Tenant not found');
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Load demo tenant data
      const mockTenant: Tenant = {
        ...DEFAULT_TENANT,
        id: identifier,
        name: identifier === 'acme' ? 'Acme Corporation' : identifier === 'globex' ? 'Globex Industries' : `${identifier.charAt(0).toUpperCase()}${identifier.slice(1)} Inc`,
        subdomain: identifier,
        color_scheme: {
          primary: identifier === 'acme' ? '#4f46e5' : identifier === 'globex' ? '#2563eb' : '#4f46e5',
          accent: identifier === 'acme' ? '#3b82f6' : identifier === 'globex' ? '#0ea5e9' : '#3b82f6'
        },
        theme_settings: {
          font: identifier === 'acme' ? 'Inter, sans-serif' : identifier === 'globex' ? 'Montserrat, sans-serif' : 'Inter, sans-serif',
          borderRadius: identifier === 'acme' ? 'rounded-lg' : identifier === 'globex' ? 'rounded-xl' : 'rounded-lg',
        },
        app_name: identifier === 'acme' ? 'Acme Sales Hub' : identifier === 'globex' ? 'Globex CRM' : `${identifier.charAt(0).toUpperCase()}${identifier.slice(1)} CRM`,
      };
      
      setTenant(mockTenant);
    } catch (err) {
      console.error('Error loading tenant:', err);
      setError(err instanceof Error ? err.message : 'Failed to load tenant');
      
      // Fall back to default tenant on error
      setTenant(DEFAULT_TENANT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTenant = useCallback(async (updates: Partial<Tenant>) => {
    if (!tenant) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, we'd update in Supabase here
      // const { data, error } = await supabase
      //   .from('tenants')
      //   .update(updates)
      //   .eq('id', tenant.id)
      //   .single();
      
      // if (error) throw error;
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local tenant state
      setTenant(current => current ? { ...current, ...updates } : null);
    } catch (err) {
      console.error('Error updating tenant:', err);
      setError(err instanceof Error ? err.message : 'Failed to update tenant');
    } finally {
      setIsLoading(false);
    }
  }, [tenant]);

  const contextValue: TenantContextType = {
    tenant,
    isLoading,
    error,
    loadTenant,
    updateTenant
  };

  return (
    <TenantContext.Provider value={contextValue}>
      {children}
    </TenantContext.Provider>
  );
};