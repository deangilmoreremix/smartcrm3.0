import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useTenant } from '../../hooks/useTenant';
import { signIn } from '../../services/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { tenant } = useTenant();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      // Success - redirect to dashboard
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: tenant?.color_scheme.primary }}>
          Welcome Back
        </h1>
        <p className="mt-2 text-gray-600">
          Sign in to your account to continue
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-100">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
              style={{ 
                focusRingColor: tenant?.color_scheme.primary + '40' // Adding transparency
              }}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
              style={{ 
                focusRingColor: tenant?.color_scheme.primary + '40'
              }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              style={{ 
                accentColor: tenant?.color_scheme.primary
              }}
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a 
              href="#" 
              className="hover:underline"
              style={{ color: tenant?.color_scheme.primary }}
            >
              Forgot password?
            </a>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: tenant?.color_scheme.primary,
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="hover:underline" 
            style={{ color: tenant?.color_scheme.primary }}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;