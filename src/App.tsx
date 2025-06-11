import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTenant } from './hooks/useTenant';
import AppRoutes from './routes';
import { Settings, Building, User } from 'lucide-react';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Main pages - we'll start with just placeholder components
const Dashboard = () => <div>Dashboard</div>;
const Contacts = () => <div>Contacts</div>;
const TenantSettings = () => <div>Tenant Settings</div>;
const WhiteLabel = () => <div>White Label Configuration</div>;

function App() {
  const location = useLocation();
  const { tenant, loadTenant } = useTenant();

  useEffect(() => {
    // Load tenant based on subdomain or query param
    // For development, we'll use a query param: ?tenant=acme
    const params = new URLSearchParams(location.search);
    const tenantId = params.get('tenant');
    
    if (tenantId) {
      loadTenant(tenantId);
    } else {
      // Try to detect from subdomain
      const hostname = window.location.hostname;
      const subdomainMatch = hostname.match(/^([^.]+)\./);
      
      if (subdomainMatch && subdomainMatch[1] !== 'www' && subdomainMatch[1] !== 'app') {
        loadTenant(subdomainMatch[1]);
      }
    }
  }, [location, loadTenant]);

  return (
    <div className="App">
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        {/* Main app routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          
          {/* Admin routes */}
          <Route path="/tenant-settings" element={<TenantSettings />} />
          <Route path="/white-label" element={<WhiteLabel />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;