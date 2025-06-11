import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Admin pages
import TenantSettings from '../pages/Admin/TenantSettings';
import WhiteLabel from '../pages/Admin/WhiteLabel';

// App pages
import Dashboard from '../pages/Dashboard';
import Contacts from '../pages/Contacts';
import Settings from '../pages/Settings';

const AppRoutes: React.FC = () => {
  return (
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
        <Route path="/settings" element={<Settings />} />
        
        {/* Admin routes - only accessible by tenant admin users */}
        <Route path="/tenant-settings" element={<TenantSettings />} />
        <Route path="/white-label" element={<WhiteLabel />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;