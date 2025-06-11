import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Tenant API
export const fetchTenant = async (identifier: string) => {
  try {
    // Try subdomain first
    let { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('subdomain', identifier)
      .single();
    
    // If not found by subdomain, try ID
    if (error || !data) {
      const result = await supabase
        .from('tenants')
        .select('*')
        .eq('id', identifier)
        .single();
        
      data = result.data;
      error = result.error;
    }
    
    return { data, error };
  } catch (err) {
    console.error('Error fetching tenant:', err);
    return { data: null, error: err };
  }
};

export const updateTenant = async (id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', id)
      .single();
    
    return { data, error };
  } catch (err) {
    console.error('Error updating tenant:', err);
    return { data: null, error: err };
  }
};

// User-Tenant relationship
export const fetchUserTenants = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_tenant_roles')
      .select(`
        id,
        role,
        is_primary,
        tenants:tenant_id (
          id, 
          name, 
          subdomain, 
          custom_domain,
          logo_url,
          color_scheme,
          theme_settings,
          app_name
        )
      `)
      .eq('user_id', userId);
    
    return { data, error };
  } catch (err) {
    console.error('Error fetching user tenants:', err);
    return { data: null, error: err };
  }
};