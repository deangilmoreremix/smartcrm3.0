import React, { useState, useEffect } from 'react';
import { useTenant, Tenant } from '../../contexts/TenantContext';
import { Building, Mail, Globe, User, Save } from 'lucide-react';

const TenantSettings: React.FC = () => {
  const { tenant, updateTenant, isLoading, error } = useTenant();
  const [form, setForm] = useState<Partial<Tenant>>({});
  const [success, setSuccess] = useState<boolean>(false);
  
  // Initialize form with tenant data when it loads
  useEffect(() => {
    if (tenant) {
      setForm(tenant);
    }
  }, [tenant]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      color_scheme: {
        ...prev.color_scheme,
        [name]: value
      }
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    
    try {
      await updateTenant(form);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error updating tenant:', err);
    }
  };
  
  if (!tenant) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-center text-gray-600">Loading tenant settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Tenant Settings</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
          Settings updated successfully!
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Organization Details</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name || ''}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="support_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="support_email"
                    name="support_email"
                    value={form.support_email || ''}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-1">
                  Subdomain
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="subdomain"
                    name="subdomain"
                    value={form.subdomain || ''}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Your subdomain will be: {form.subdomain || tenant.subdomain}.smartcrm.com
                </p>
              </div>
              
              <div>
                <label htmlFor="custom_domain" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Domain (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="custom_domain"
                    name="custom_domain"
                    value={form.custom_domain || ''}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                    placeholder="crm.yourdomain.com"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  You'll need to configure DNS settings to point to our servers.
                </p>
              </div>
            </div>
            
            {/* Application Settings */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Application Settings</h2>
              
              <div>
                <label htmlFor="app_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="app_name"
                    name="app_name"
                    value={form.app_name || ''}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  This will appear in the browser tab and throughout the application.
                </p>
              </div>
              
              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="tagline"
                    name="tagline"
                    value={form.tagline || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                    placeholder="Your company tagline or motto"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="logo_url"
                    name="logo_url"
                    value={form.logo_url || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                    placeholder="https://your-cdn.com/logo.png"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter a URL to your logo image (SVG or PNG recommended)
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primary" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="primary"
                      name="primary"
                      value={form.color_scheme?.primary || tenant.color_scheme.primary}
                      onChange={handleColorChange}
                      className="w-10 h-10 border-0 p-0"
                    />
                    <input
                      type="text"
                      value={form.color_scheme?.primary || tenant.color_scheme.primary}
                      onChange={handleColorChange}
                      name="primary"
                      className="ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                      style={{ 
                        focusRingColor: tenant?.color_scheme.primary + '40'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="accent" className="block text-sm font-medium text-gray-700 mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="accent"
                      name="accent"
                      value={form.color_scheme?.accent || tenant.color_scheme.accent}
                      onChange={handleColorChange}
                      className="w-10 h-10 border-0 p-0"
                    />
                    <input
                      type="text"
                      value={form.color_scheme?.accent || tenant.color_scheme.accent}
                      onChange={handleColorChange}
                      name="accent"
                      className="ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                      style={{ 
                        focusRingColor: tenant?.color_scheme.primary + '40'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: tenant?.color_scheme.primary,
                opacity: isLoading ? 0.7 : 1
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantSettings;