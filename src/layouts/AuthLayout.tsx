import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTenant } from '../hooks/useTenant';
import { Building } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { tenant } = useTenant();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              {tenant?.logo_url ? (
                <img src={tenant.logo_url} alt={tenant.name} className="h-8 w-auto" />
              ) : (
                <Building className="h-8 w-8" style={{ color: tenant?.color_scheme.primary }} />
              )}
              <span 
                className="ml-2 font-semibold text-xl"
                style={{ color: tenant?.color_scheme.primary }}
              >
                {tenant?.app_name || 'SmartCRM'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>

      <footer className="py-4 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tenant?.name ? `© ${new Date().getFullYear()} ${tenant.name}` : '© 2025 SmartCRM'}
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;