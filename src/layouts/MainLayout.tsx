import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTenant } from '../hooks/useTenant';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Building,
  Palette,
  User
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tenant } = useTenant();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigation = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Contacts', path: '/contacts', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  // Admin-only navigation items
  const adminNavigation = [
    { name: 'Tenant Settings', path: '/tenant-settings', icon: <Building size={20} /> },
    { name: 'White Label', path: '/white-label', icon: <Palette size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link 
              to="/" 
              className="flex items-center font-semibold text-xl text-primary-600"
              style={{
                color: tenant?.color_scheme.primary
              }}
            >
              {tenant?.logo_url ? (
                <img src={tenant.logo_url} alt={tenant.name} className="h-8 w-auto mr-2" />
              ) : (
                <Building className="h-6 w-6 mr-2" />
              )}
              {tenant?.app_name || 'SmartCRM'}
            </Link>
            <button
              className="lg:hidden p-2 text-gray-500 rounded-md hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: isActive(item.path) ? tenant?.color_scheme.primary : undefined,
                      color: isActive(item.path) ? 'white' : undefined
                    }}
                  >
                    <span className="w-5 mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Admin section */}
            <div className="mt-8">
              <div className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Admin
              </div>
              <ul className="space-y-1">
                {adminNavigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: isActive(item.path) ? tenant?.color_scheme.primary : undefined,
                        color: isActive(item.path) ? 'white' : undefined
                      }}
                    >
                      <span className="w-5 mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4">
            <button
              className="lg:hidden p-2 text-gray-500 rounded-md hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>{tenant?.name || 'Default Tenant'}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {/* Dropdown for tenant switching would go here */}
              </div>

              <div className="ml-4 relative">
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <User size={14} />
                  </div>
                </button>
                {/* User dropdown would go here */}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;