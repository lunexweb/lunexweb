import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail, Home, Shield, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthProps {
  onLogin: (user: { email: string; name: string }) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Simple authentication - you can change these credentials
  const validCredentials = [
    { email: 'admin@lunexweb.com', password: 'lunex2024', name: 'Admin User' },
    { email: 'team@lunexweb.com', password: 'team2024', name: 'Team Member' },
    { email: 'ceo@lunexweb.com', password: 'ceo2024', name: 'CEO' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simple credential check
      const user = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (user) {
        // Store user session
        localStorage.setItem('lunex_user', JSON.stringify({
          email: user.email,
          name: user.name,
          loggedIn: true,
          loginTime: new Date().toISOString()
        }));

        toast({
          title: "🎉 Welcome back!",
          description: `Successfully logged in as ${user.name}`,
        });

        onLogin(user);
      } else {
        toast({
          title: "❌ Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex relative overflow-hidden">
      {/* Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759895212/path-digital-tR0jvlsmCuQ-unsplash_fhujqe.jpg')`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-slate-900/70 to-slate-900/80"></div>
          
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h1 className="text-3xl font-bold">Lunexweb</h1>
              </div>
              
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Premium Web
                <span className="block text-green-400">Development</span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-md">
                Access your exclusive dashboard and manage your digital empire with cutting-edge tools and insights.
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-slate-300">Secure Access</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-slate-300">Enterprise Grade</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">

        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dnnwvmh3n/image/upload/v1759895212/path-digital-tR0jvlsmCuQ-unsplash_fhujqe.jpg')`
            }}
          ></div>
          <div className="absolute inset-0 bg-slate-900/90"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8 pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </CardTitle>
                <p className="text-slate-600 text-lg">
                  Sign in to your dashboard
                </p>
              </motion.div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                onSubmit={handleLogin} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-12 h-14 bg-white/80 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-lg transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-12 pr-12 h-14 bg-white/80 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-lg transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </Button>
                </motion.div>
              </motion.form>

            </CardContent>
          </Card>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-4 text-center"
          >
            <Link to="/">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
