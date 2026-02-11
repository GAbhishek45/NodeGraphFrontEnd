'use client';

import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // <--- 1. IMPORT TOAST

interface User {
  id: string;
  email: string;
  name: string;
  credits?: number; // Added optional credits based on previous context
}

// Updated Interface to match your Provider value
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refectchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const refectchUser = async () => {
    // Optional: Don't set full page loading for a background refetch
    // setIsLoading(true); 
    try {
        let res = await axios.get('/api/refetch');
        console.log("Response", res);
        // setUser(res.data); // Uncomment when API is ready
    } catch (error) {
        console.error("Refetch failed", error);
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Dismiss any existing toasts to prevent clutter
    toast.dismiss(); 

    try {
      if (!email || !password) {
        throw new Error('Email and password required');
      }

      const res = await axios.post('/api/auth/login', { email, password });

      console.log("Login Success:", res.data);

      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      // ✅ SUCCESS TOAST
      toast.success('Welcome back!'); 

    } catch (error: any) {
      const serverMessage =
        error.response?.data?.message || 
        error.response?.data?.error ||   
        error.message ||                 
        "Login failed";

      console.log("Login Error:", serverMessage);

      // ❌ ERROR TOAST
      toast.error(serverMessage);

      // We still re-throw the error in case the UI component needs to shake a form or stop a redirect
      throw new Error(serverMessage);

    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    toast.dismiss();

    try {
      if (!email || !password || !name) {
        throw new Error('All fields required');
      }

      console.log("signupreq")
      const res = await axios.post('/api/auth/signup', { email, password, name });

      console.log("Response from signup:", res.data);

      // Note: We don't log them in yet because they need to verify OTP
      
      // ✅ SUCCESS TOAST
      // Using a longer duration because this is an important instruction
      toast.success(res.data.message || 'Signup successful! Check your email.', {
        duration: 5000,
        icon: '📧',
      });

    } catch (error: any) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Signup failed";

      console.log("Signup Error:", serverMessage);

      // ❌ ERROR TOAST
      toast.error(serverMessage);

      throw new Error(serverMessage);

    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optional: Call logout API to clear cookie
    // axios.post('/api/auth/logout'); 
    
    // ✅ LOGOUT TOAST
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, refectchUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}