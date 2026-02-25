'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../lib/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to login');
        setLoading(false);
        return;
      }

      // Set user in store
      setUser(data.user);

      // Redirect to home
      router.push('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-primary/10 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="https://app-cdn.appgen.com/d1d0bb23-e871-43d1-8694-ea0013947282/assets/uploaded_1772030996935_ggozep.jpeg" 
              alt="Yarehnusa Academy Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-slate-600">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-slate-800"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-slate-800"
              placeholder="Your password"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-card"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-secondary font-semibold hover:text-secondary/80">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
