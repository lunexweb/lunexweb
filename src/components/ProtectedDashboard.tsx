import React, { useState, useEffect } from 'react';
import { Auth } from './Auth';
import CEODashboard from './CEODashboard';
import { Button } from '@/components/ui/button';
import { LogOut, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface User {
  email: string;
  name: string;
  loggedIn: boolean;
  loginTime: string;
}

export const ProtectedDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('lunex_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('lunex_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser({
      email: userData.email,
      name: userData.name,
      loggedIn: true,
      loginTime: new Date().toISOString()
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('lunex_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Dashboard Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 sm:py-6 gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Lunex Team Dashboard
                  </h1>
                  <div className="text-xs sm:text-sm text-slate-500 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Welcome back, {user.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 bg-white hover:bg-green-50 border-slate-200 hover:border-green-300 text-slate-700 hover:text-green-700 w-full sm:w-auto"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-slate-50 rounded-lg w-full sm:w-auto">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white hover:bg-red-50 border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-700 w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CEODashboard />
      </motion.div>
    </div>
  );
};
