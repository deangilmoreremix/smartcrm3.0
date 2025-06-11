import React, { useState, useEffect } from 'react';
import { useTenant, Tenant } from '../../contexts/TenantContext';
import { Palette, Type, Save, Layout, Settings, Sliders, Layers, Pencil } from 'lucide-react';

const WhiteLabel: React.FC = () => {
  const { tenant, updateTenant, isLoading, error } = useTenant();
  const [form, setForm] = useState<Partial<Tenant>>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'branding' | 'interface' | 'preview'>('branding');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Initialize form with tenant data when it loads
  useEffect(() => {
    if (tenant) {
      setForm(tenant);
    }
  }, [tenant]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        ...(prev.color_scheme || {}),
        [name]: value
      }
    }));
  };
  
  const handleThemeSettingChange = (name: string, value: string) => {
    setForm(prev => ({
      ...prev,
      theme_settings: {
        ...(prev.theme_settings || {}),
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-center text-gray-600">Loading white label settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-2">White Label Configuration</h1>
      <p className="text-gray-600 mb-6">Customize the look and feel of your application</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
          White label settings updated successfully!
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('branding')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'branding'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              style={{
                borderColor: activeTab === 'branding' ? tenant.color_scheme.primary : 'transparent',
                color: activeTab === 'branding' ? tenant.color_scheme.primary : undefined
              }}
            >
              <Palette className="inline-block h-5 w-5 mr-2" />
              Branding
            </button>
            
            <button
              onClick={() => setActiveTab('interface')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'interface'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              style={{
                borderColor: activeTab === 'interface' ? tenant.color_scheme.primary : 'transparent',
                color: activeTab === 'interface' ? tenant.color_scheme.primary : undefined
              }}
            >
              <Layout className="inline-block h-5 w-5 mr-2" />
              Interface
            </button>
            
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'preview'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              style={{
                borderColor: activeTab === 'preview' ? tenant.color_scheme.primary : 'transparent',
                color: activeTab === 'preview' ? tenant.color_scheme.primary : undefined
              }}
            >
              <Pencil className="inline-block h-5 w-5 mr-2" />
              Preview
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="app_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Application Name
                  </label>
                  <input
                    type="text"
                    id="app_name"
                    name="app_name"
                    value={form.app_name || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
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
                  />
                </div>
                
                <div>
                  <label htmlFor="support_email" className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    id="support_email"
                    name="support_email"
                    value={form.support_email || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                    style={{ 
                      focusRingColor: tenant?.color_scheme.primary + '40'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
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
                  placeholder="https://yourdomain.com/logo.png"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a URL to your logo image. SVG or PNG with transparent background recommended.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Color Scheme</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className="mt-1 text-xs text-gray-500">
                      Used for primary buttons, links, and active states
                    </p>
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
                    <p className="mt-1 text-xs text-gray-500">
                      Used for secondary elements, highlights, and accents
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Color Palette Preview</h4>
                  <div className="flex space-x-2">
                    <div 
                      className="h-8 w-8 rounded"
                      style={{ backgroundColor: form.color_scheme?.primary || tenant.color_scheme.primary }}
                    ></div>
                    <div 
                      className="h-8 w-8 rounded"
                      style={{ backgroundColor: form.color_scheme?.accent || tenant.color_scheme.accent }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'interface' && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium mb-4">Typography</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Family
                    </label>
                    <select
                      value={form.theme_settings?.font || 'Inter, sans-serif'}
                      onChange={(e) => handleThemeSettingChange('font', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                      style={{ 
                        focusRingColor: tenant?.color_scheme.primary + '40'
                      }}
                    >
                      <option value="Inter, sans-serif">Inter (Modern Sans-serif)</option>
                      <option value="Montserrat, sans-serif">Montserrat (Contemporary)</option>
                      <option value="Roboto, sans-serif">Roboto (Clean & Readable)</option>
                      <option value="Poppins, sans-serif">Poppins (Geometric Sans-serif)</option>
                      <option value="'Source Serif Pro', serif">Source Serif Pro (Elegant Serif)</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Border Radius Style
                      </label>
                      <select
                        value={form.theme_settings?.borderRadius || 'rounded-md'}
                        onChange={(e) => handleThemeSettingChange('borderRadius', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                        style={{ 
                          focusRingColor: tenant?.color_scheme.primary + '40'
                        }}
                      >
                        <option value="rounded-none">Square Corners</option>
                        <option value="rounded-sm">Slightly Rounded</option>
                        <option value="rounded-md">Medium Rounded</option>
                        <option value="rounded-lg">Large Rounded</option>
                        <option value="rounded-xl">Extra Large Rounded</option>
                        <option value="rounded-full">Fully Rounded</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Style
                      </label>
                      <select
                        value={form.theme_settings?.buttonStyle || 'default'}
                        onChange={(e) => handleThemeSettingChange('buttonStyle', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                        style={{ 
                          focusRingColor: tenant?.color_scheme.primary + '40'
                        }}
                      >
                        <option value="default">Default</option>
                        <option value="solid">Solid</option>
                        <option value="outline">Outline</option>
                        <option value="soft">Soft</option>
                        <option value="minimal">Minimal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Layout & Components</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Style
                    </label>
                    <select
                      value={form.theme_settings?.cardStyle || 'default'}
                      onChange={(e) => handleThemeSettingChange('cardStyle', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
                      style={{ 
                        focusRingColor: tenant?.color_scheme.primary + '40'
                      }}
                    >
                      <option value="default">Default (Light shadow, subtle border)</option>
                      <option value="flat">Flat (No shadow, border only)</option>
                      <option value="raised">Raised (Prominent shadow)</option>
                      <option value="outlined">Outlined (Stronger border)</option>
                      <option value="minimal">Minimal (Very subtle separation)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Preview</h3>
                
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('desktop')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      previewMode === 'desktop' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    style={{
                      backgroundColor: previewMode === 'desktop' ? tenant.color_scheme.primary : undefined,
                    }}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mobile')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      previewMode === 'mobile' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    style={{
                      backgroundColor: previewMode === 'mobile' ? tenant.color_scheme.primary : undefined,
                    }}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              
              <div className={`border rounded-lg overflow-hidden ${
                previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
              }`}>
                {/* Preview header */}
                <div 
                  className="p-4 border-b flex items-center justify-between"
                  style={{
                    backgroundColor: form.color_scheme?.primary || tenant.color_scheme.primary,
                    color: 'white'
                  }}
                >
                  <div className="flex items-center">
                    {form.logo_url ? (
                      <img src={form.logo_url} alt="Logo" className="h-8 w-auto mr-2" />
                    ) : (
                      <Building className="h-6 w-6 mr-2" />
                    )}
                    <span className="font-semibold">{form.app_name || tenant.app_name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Settings size={16} />
                    {previewMode === 'desktop' && (
                      <>
                        <Sliders size={16} />
                        <Layers size={16} />
                      </>
                    )}
                  </div>
                </div>
                
                {/* Preview content */}
                <div className="p-4 bg-gray-50">
                  <div className="mb-4">
                    <h4 className="font-medium text-lg mb-2" style={{
                      fontFamily: form.theme_settings?.font || tenant.theme_settings?.font || 'Inter, sans-serif'
                    }}>
                      Sample Dashboard
                    </h4>
                    <p className="text-sm text-gray-600" style={{
                      fontFamily: form.theme_settings?.font || tenant.theme_settings?.font || 'Inter, sans-serif'
                    }}>
                      This is a preview of your white-labeled application.
                    </p>
                  </div>
                  
                  {/* Sample card */}
                  <div className={`bg-white p-4 rounded shadow-sm border border-gray-200 mb-4`} style={{
                    borderRadius: form.theme_settings?.borderRadius === 'rounded-none' ? '0' : 
                      form.theme_settings?.borderRadius === 'rounded-sm' ? '0.125rem' :
                      form.theme_settings?.borderRadius === 'rounded-md' ? '0.375rem' :
                      form.theme_settings?.borderRadius === 'rounded-lg' ? '0.5rem' :
                      form.theme_settings?.borderRadius === 'rounded-xl' ? '0.75rem' :
                      form.theme_settings?.borderRadius === 'rounded-full' ? '9999px' : '0.375rem'
                  }}>
                    <h5 className="font-medium mb-2" style={{
                      color: form.color_scheme?.primary || tenant.color_scheme.primary,
                      fontFamily: form.theme_settings?.font || tenant.theme_settings?.font || 'Inter, sans-serif'
                    }}>
                      Recent Activity
                    </h5>
                    <p className="text-sm text-gray-600 mb-3" style={{
                      fontFamily: form.theme_settings?.font || tenant.theme_settings?.font || 'Inter, sans-serif'
                    }}>
                      Your recent activity will appear here.
                    </p>
                    <button 
                      className="px-3 py-1.5 text-sm rounded"
                      style={{
                        backgroundColor: form.color_scheme?.primary || tenant.color_scheme.primary,
                        color: 'white',
                        borderRadius: form.theme_settings?.borderRadius === 'rounded-none' ? '0' : 
                          form.theme_settings?.borderRadius === 'rounded-sm' ? '0.125rem' :
                          form.theme_settings?.borderRadius === 'rounded-md' ? '0.375rem' :
                          form.theme_settings?.borderRadius === 'rounded-lg' ? '0.5rem' :
                          form.theme_settings?.borderRadius === 'rounded-xl' ? '0.75rem' :
                          form.theme_settings?.borderRadius === 'rounded-full' ? '9999px' : '0.375rem'
                      }}
                    >
                      View All
                    </button>
                  </div>
                  
                  {/* Sample form field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{
                      fontFamily: form.theme_settings?.font || tenant.theme_settings?.font || 'Inter, sans-serif'
                    }}>
                      Sample Input
                    </label>
                    <input
                      type="text"
                      className="block w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:outline-none"
                      style={{ 
                        borderRadius: form.theme_settings?.borderRadius === 'rounded-none' ? '0' : 
                          form.theme_settings?.borderRadius === 'rounded-sm' ? '0.125rem' :
                          form.theme_settings?.borderRadius === 'rounded-md' ? '0.375rem' :
                          form.theme_settings?.borderRadius === 'rounded-lg' ? '0.5rem' :
                          form.theme_settings?.borderRadius === 'rounded-xl' ? '0.75rem' :
                          form.theme_settings?.borderRadius === 'rounded-full' ? '9999px' : '0.375rem',
                        focusRingColor: (form.color_scheme?.primary || tenant.color_scheme.primary) + '40'
                      }}
                      placeholder="Enter some text..."
                      readOnly
                    />
                  </div>
                  
                  {/* Sample button row */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1.5 text-sm"
                      style={{
                        backgroundColor: form.color_scheme?.primary || tenant.color_scheme.primary,
                        color: 'white',
                        borderRadius: form.theme_settings?.borderRadius === 'rounded-none' ? '0' : 
                          form.theme_settings?.borderRadius === 'rounded-sm' ? '0.125rem' :
                          form.theme_settings?.borderRadius === 'rounded-md' ? '0.375rem' :
                          form.theme_settings?.borderRadius === 'rounded-lg' ? '0.5rem' :
                          form.theme_settings?.borderRadius === 'rounded-xl' ? '0.75rem' :
                          form.theme_settings?.borderRadius === 'rounded-full' ? '9999px' : '0.375rem'
                      }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm bg-white border"
                      style={{
                        color: form.color_scheme?.primary || tenant.color_scheme.primary,
                        borderColor: form.color_scheme?.primary || tenant.color_scheme.primary,
                        borderRadius: form.theme_settings?.borderRadius === 'rounded-none' ? '0' : 
                          form.theme_settings?.borderRadius === 'rounded-sm' ? '0.125rem' :
                          form.theme_settings?.borderRadius === 'rounded-md' ? '0.375rem' :
                          form.theme_settings?.borderRadius === 'rounded-lg' ? '0.5rem' :
                          form.theme_settings?.borderRadius === 'rounded-xl' ? '0.75rem' :
                          form.theme_settings?.borderRadius === 'rounded-full' ? '9999px' : '0.375rem'
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Preview Notes</h4>
                <p className="text-sm text-gray-700">
                  This preview shows how your white-labeled application will look to your users. The actual appearance may vary slightly depending on the specific screens and components.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Changes to the white label settings will be applied in real-time to all users of your tenant.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-6 border-t border-gray-200">
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
              {isLoading ? 'Saving...' : 'Save White Label Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhiteLabel;