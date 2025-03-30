
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For fallback when Supabase is not configured
const MOCK_USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        // Try to get the session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          throw error;
        }
        
        if (session?.user) {
          // Get user metadata
          const { data: userData, error: profileError } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Error fetching user profile:', profileError);
          }
          
          setUser({
            id: session.user.id,
            name: userData?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
          });
        } else {
          // Fallback to localStorage if no session
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (error) {
              console.error('Failed to parse stored user:', error);
              localStorage.removeItem('user');
            }
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        // Fallback to localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error('Failed to parse stored user:', error);
            localStorage.removeItem('user');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try to login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Get user metadata
        const { data: userData, error: profileError } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        }
        
        const userObj = {
          id: data.user.id,
          name: userData?.name || data.user.email?.split('@')[0] || 'User',
          email: data.user.email || '',
        };
        
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        toast.success('Logged in successfully!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Fallback to mock login if Supabase is not configured
      if (error.message?.includes('not configured') || !supabase) {
        console.log('Falling back to mock login');
        const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (!foundUser) {
          toast.error('Invalid email or password');
          throw new Error('Invalid credentials');
        }
        
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success('Logged in successfully! (Mock)');
      } else {
        toast.error('Invalid email or password');
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try to sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create a profile for the user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id,
              name,
              email,
              created_at: new Date().toISOString(),
            }
          ]);
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Continue anyway, as the auth account was created
        }
        
        const userObj = {
          id: data.user.id,
          name,
          email: data.user.email || '',
        };
        
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        toast.success('Account created successfully! Please check your email to confirm your account.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Fallback to mock signup if Supabase is not configured
      if (error.message?.includes('not configured') || !supabase) {
        console.log('Falling back to mock signup');
        // Check if user already exists
        if (MOCK_USERS.some(u => u.email === email)) {
          toast.error('User already exists');
          throw new Error('User already exists');
        }
        
        // Create new user
        const newUser = {
          id: (MOCK_USERS.length + 1).toString(),
          name,
          email,
          password
        };
        
        MOCK_USERS.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success('Account created successfully! (Mock)');
      } else {
        toast.error('Failed to create account. Email might already be taken.');
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Try to logout with Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Continue with local logout even if Supabase fails
    } finally {
      // Always clear local state
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
