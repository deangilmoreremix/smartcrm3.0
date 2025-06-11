import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useTenant } from '../../hooks/useTenant';
import { signUp } from '../../services/supabaseClient';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { tenant } = useTenant();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) {
        throw error;
      }
      
      // Update user profile with full name
      // In a real app, this would be done via Supabase
      
      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        // Email confirmation required
        navigate('/check-email');
      } else {
        // No email confirmation required, redirect to dashboard
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: tenant?.color_scheme.primary }}>
          Create an Account
        </h1>
        <p className="mt-2 text-gray-600">
          Sign up to get started with {tenant?.app_name || 'SmartCRM'}
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-100">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
              style={{ 
                focusRingColor: tenant?.color_scheme.primary + '40'
              }}
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        
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
                focusRingColor: tenant?.color_scheme.primary + '40'
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
              autoComplete="new-password"
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
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 6 characters
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none"
              style={{ 
                focusRingColor: tenant?.color_scheme.primary + '40'
              }}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
            {isLoading ? 'Creating Account...' : 'Sign up'}
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="hover:underline" 
            style={{ color: tenant?.color_scheme.primary }}
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;