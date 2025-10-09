import { useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  loggedIn: boolean;
  loginTime: string;
}

export const useAuth = () => {
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

  const login = (userData: { email: string; name: string }) => {
    const user = {
      email: userData.email,
      name: userData.name,
      loggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('lunex_user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('lunex_user');
    setUser(null);
  };

  const isAuthenticated = user?.loggedIn === true;

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };
};





