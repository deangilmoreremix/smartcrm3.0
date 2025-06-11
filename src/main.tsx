import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TenantProvider } from './contexts/TenantContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TenantProvider>
        <App />
      </TenantProvider>
    </BrowserRouter>
  </React.StrictMode>,
);