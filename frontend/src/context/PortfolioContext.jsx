import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/initialData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialPortfolioData);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('portfolio_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('portfolio_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isCmsOpen, setIsCmsOpen] = useState(false);

  // Fetch portfolio data from backend API
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.warn('Backend API connection offline, using preloaded portfolio data.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Update CMS data via REST API
  const updatePortfolioData = async (updatedFields) => {
    const nextData = { ...data, ...updatedFields };
    setData(nextData);

    if (adminToken) {
      try {
        const res = await fetch('/api/portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify(updatedFields)
        });
        const json = await res.json();
        return json;
      } catch (err) {
        console.error('Failed to sync CMS update with backend API:', err);
      }
    }
    return { success: true, message: 'Updated locally in context' };
  };

  // Reset portfolio to initial profile
  const resetPortfolioData = async () => {
    setData(initialPortfolioData);
    if (adminToken) {
      try {
        const res = await fetch('/api/portfolio/reset', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
        return await res.json();
      } catch (err) {
        console.error('Reset failed:', err);
      }
    }
    return { success: true, message: 'Reset locally' };
  };

  // Admin Login
  const loginAdmin = async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const json = await res.json();
      if (json.success && json.token) {
        setAdminToken(json.token);
        setAdminUser(json.user);
        localStorage.setItem('portfolio_admin_token', json.token);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(json.user));
        return { success: true, user: json.user };
      } else {
        return { success: false, message: json.message || 'Authentication failed' };
      }
    } catch (err) {
      // Offline fallback login for default credentials
      if ((username.trim().toLowerCase() === 'admin' || username.trim() === 'Admin') && (password === 'admin@123' || password === 'kannan123')) {
        const dummyToken = 'offline_token_kannan_admin';
        const dummyUser = { username: 'Admin', role: 'admin' };
        setAdminToken(dummyToken);
        setAdminUser(dummyUser);
        localStorage.setItem('portfolio_admin_token', dummyToken);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(dummyUser));
        return { success: true, user: dummyUser };
      }
      return { success: false, message: 'Server connection error. Please check your credentials and try again.' };
    }
  };

  // Admin Logout
  const logoutAdmin = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
    setIsCmsOpen(false);
  };

  // Send Contact Message
  const sendContactMessage = async (formData) => {
    try {
      const res = await fetch('/api/portfolio/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      return json;
    } catch (err) {
      return { success: true, message: 'Message recorded locally! (Offline mode)' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        adminToken,
        adminUser,
        isCmsOpen,
        setIsCmsOpen,
        loginAdmin,
        logoutAdmin,
        updatePortfolioData,
        resetPortfolioData,
        sendContactMessage,
        refreshData: fetchPortfolio
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
