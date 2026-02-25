'use client';

import { useAuthStore } from '../lib/auth-store';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
        <div className="text-center mb-8">
          <User className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Not Logged In</h1>
          <p className="text-slate-600 mb-6">Create an account or log in to continue</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
            >
              Log In
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-2 bg-slate-100 text-primary rounded-lg font-semibold hover:bg-slate-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Profile</h1>

        <div className="bg-white rounded-2xl shadow-card border border-primary/10 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
              <p className="text-slate-600">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-primary/5">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-slate-600">Name</p>
                <p className="font-semibold text-primary">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-primary/5">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-semibold text-primary">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-primary/5">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-slate-600">User ID</p>
                <p className="font-semibold text-primary">#{user.id}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-card"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
